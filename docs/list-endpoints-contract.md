# Contrato de endpoints paginados (`/users`, `/pets`)

Contrato para servir tablas de datos (TanStack Table) con **paginación, orden y
filtrado en servidor**.

- Alcance: `GET /users` y `GET /pets`.
- Forma genérica: `/products` y `/bills` ya comparten el mismo sobre de
  respuesta y pueden adoptarlo después sin tocar el frontend.
- **Todos los parámetros nuevos son opcionales.** Las llamadas actuales
  (`?page=1&limit=5`, `?search=ana&page=1&limit=4`) deben seguir funcionando
  igual, porque `/pets`, `/products` y `/bills` aún usan scroll infinito.

---

## 1. Request — parámetros comunes

| Param       | Tipo   | Default | Reglas |
|-------------|--------|---------|--------|
| `page`      | int    | `1`     | `>= 1`. Base 1 (no base 0). |
| `limit`     | int    | `10`    | `>= 1`, **máximo `100`**. |
| `search`    | string | —       | Se recorta (`trim`). Vacío después del trim = no filtrar. |
| `sortBy`    | enum   | ver §4/§5 | Fuera de la lista blanca → `400`. |
| `sortOrder` | enum   | `asc`   | `asc` \| `desc`. Fuera → `400`. |

> El `default limit` cambia de `5`/`4` a `10`, pero como el frontend **siempre**
> enviará `limit` explícito, el default solo aplica a llamadas heredadas.
> Si prefieres no tocarlo, deja `5` y avísame: es un one-liner en el frontend.

### Reglas de orden (importantes)

1. **`sortBy` es lista blanca por endpoint.** Nunca interpolar el valor crudo en
   el `ORDER BY`. Un valor no permitido devuelve `400`, no se ignora en silencio.
2. **Desempate estable obligatorio:** el `ORDER BY` siempre termina en `id ASC`.
   Sin esto, dos filas con el mismo `role` (o el mismo `name`) pueden aparecer
   duplicadas o desaparecer al cambiar de página.
3. **Texto: orden case-insensitive** (`LOWER(col)` o colación `*_ci`). Si no,
   `Zulma` sale antes que `ana`.
4. **Nulos al final** (`NULLS LAST`) en *ambas* direcciones. Muchos usuarios no
   tienen `dui`, `direction` ni `phone`; ordenar por esas columnas no debería
   llenar la primera página de celdas vacías.

### Reglas de filtrado

- Los filtros se combinan entre sí con **AND**, y también con `search`.
- Los filtros multi-valor aceptan **CSV**: `role=client,admin` → `IN (...)`.
  Un solo valor (`role=client`) es el mismo caso con un elemento.
- Los rangos de fecha son **inclusivos** en ambos extremos.
- Un filtro ausente o con string vacío = no se aplica.

---

## 2. Response — sobre común

Se **mantienen** los campos actuales (`data`, `totalItems`, `hasNextPage`,
`nextPage`) y se **agregan** tres. Nada se quita ni se renombra.

```jsonc
{
  "data": [ /* … */ ],

  // ya existen — no tocar, los usan los 4 listados con scroll infinito
  "totalItems": 137,
  "hasNextPage": true,
  "nextPage": 2,

  // nuevos — los necesita el data grid
  "page": 1,        // página devuelta (eco del request, ya normalizada)
  "limit": 10,      // tamaño de página aplicado (ya capado a 100)
  "totalPages": 14  // ceil(totalItems / limit); 0 si totalItems === 0
}
```

`totalPages` es el que permite pintar «Página 3 de 14» y saltar a la última.
Sin ese dato el grid solo puede ofrecer anterior/siguiente.

### Casos borde

| Caso | Comportamiento esperado |
|---|---|
| `page` > `totalPages` | `200` con `data: []`. **No** `404`, **no** clamp silencioso a la última página. |
| Sin resultados | `200`, `data: []`, `totalItems: 0`, `totalPages: 0`, `hasNextPage: false`, `nextPage: null`. |
| `hasNextPage: false` | `nextPage` debe ser `null` (hoy a veces viene `undefined`; el frontend lo tolera, pero fijemos `null`). |
| `totalItems` | Es el total **después** de aplicar `search` y filtros, no el total de la tabla. |

---

## 3. Errores

Formato estándar de NestJS `ValidationPipe` (`400 Bad Request`):

```json
{
  "statusCode": 400,
  "message": ["sortBy must be one of the following values: firstName, lastName, ..."],
  "error": "Bad Request"
}
```

Deben dar `400`: `sortBy` fuera de la lista blanca, `sortOrder` distinto de
`asc`/`desc`, `page`/`limit` no numéricos o `< 1`, fecha con formato inválido,
`role`/`gender` fuera del enum.

---

## 4. `GET /users`

### `sortBy` permitidos

```
firstName | lastName | email | role | dui | birthday | createdAt
```

### Filtros

| Param          | Tipo        | Ejemplo                  | Semántica |
|----------------|-------------|--------------------------|-----------|
| `search`       | string      | `search=ana`             | Case-insensitive, `LIKE %…%` sobre `firstName`, `lastName`, `email`, `dui`, `phone`. **Confirmar** que estos son los campos que cubre hoy. |
| `role`         | CSV enum    | `role=client`            | Valores: `client`, `admin`. |
| `birthdayFrom` | ISO date    | `birthdayFrom=1990-01-01`| `birthday >= valor`. |
| `birthdayTo`   | ISO date    | `birthdayTo=2000-12-31`  | `birthday <= valor`. |

### Ejemplo

```http
GET /users?page=2&limit=10&sortBy=lastName&sortOrder=asc&search=ana&role=client
```

---

## 5. `GET /pets`

### `sortBy` permitidos

```
name | raza | color | gender | birthday | createdAt | specie | owner
```

`specie` ordena por `specie.name` y `owner` por `user.firstName, user.lastName`
— ambos requieren `JOIN`. Si prefieres dejarlos para una segunda fase, quítalos
de la lista blanca y el frontend marca esas dos columnas como no ordenables;
dime cuál prefieres.

### Filtros

| Param          | Tipo      | Ejemplo                   | Semántica |
|----------------|-----------|---------------------------|-----------|
| `search`       | string    | `search=firulais`         | Case-insensitive sobre `name`, `raza`, `color`. **Confirmar** cobertura actual. |
| `specieId`     | CSV int   | `specieId=1,3`            | `specie.id IN (...)`. |
| `gender`       | CSV enum  | `gender=macho`            | Valores: `macho`, `hembra` (tal como los guarda el form hoy). |
| `pedigree`     | boolean   | `pedigree=true`           | `true`/`false`. |
| `isHaveTatto`  | boolean   | `isHaveTatto=false`       | Nombre de campo actual de la entidad (con el typo). Ver §7. |
| `userId`       | int       | `userId=42`               | Mascotas de un dueño. |
| `birthdayFrom` | ISO date  | `birthdayFrom=2020-01-01` | Inclusivo. |
| `birthdayTo`   | ISO date  | `birthdayTo=2024-12-31`   | Inclusivo. |

### Ejemplo

```http
GET /pets?page=1&limit=25&sortBy=name&sortOrder=asc&specieId=1,3&gender=macho
```

---

## 6. `birthday` — resuelto, no hace falta migrar

Se verificó contra `dsi-nest-backend/prisma/schema.prisma`:

```prisma
birthday  DateTime?
createdAt DateTime  @default(now()) @map("created_at")
```

`birthday` **ya es una columna de fecha real**, no un `VARCHAR` con
`dd/MM/yyyy`. Es decir que `sortBy=birthday` ordena cronológicamente y
`birthdayFrom`/`birthdayTo` funcionan como rango sin ningún cambio de esquema.
Queda descartado el bloqueante que estaba anotado aquí.

Ojo con el formato de salida: `UserResponseDto` transforma `birthday` con
`toLocaleDateString('es-SV')`, así que en la respuesta **no viaja como ISO**
sino como `d/M/yyyy` (sin cero a la izquierda). La tabla tolera ambos formatos,
pero conviene saberlo antes de comparar fechas en el cliente.

### `createdAt` no se está devolviendo

`createdAt` sí está en la lista blanca de `sortBy` (`find-all-user.args.ts:15`)
y Prisma ordena por él, pero `UserResponseDto` lo marca `@Exclude()`, así que el
valor nunca llega al cliente. El efecto es confuso: la columna ordena bien y a
la vez se ve vacía. Para exponerlo:

```ts
// src/users/dto/response/user.response.ts
@Expose()          // antes: @ApiHideProperty() @Exclude()
createdAt: string;
```

Los índices sugeridos en §7 tampoco hacen falta para `role` ni `lastName`: el
esquema ya trae `@@index([role])` y `@@index([lastName])`.

### Ojo con el tipo de fecha al formatear

`birthday` y `createdAt` son ambos `DateTime` pero se muestran distinto:

- **`birthday`** tiene semántica de *día* (medianoche UTC). Se recorta la parte
  de fecha del ISO. Convertirlo a hora local en El Salvador (UTC-6) correría el
  cumpleaños al día anterior.
- **`createdAt`** es un *instante* real. Ese sí se convierte a zona local: un
  registro creado a las 02:00 UTC ocurrió el día anterior en hora local, y
  recortar el ISO mostraría la fecha equivocada.

---

## 7. Notas menores

- `isHaveTatto` está escrito así en la entidad y en el payload de creación
  (`User.api.jsx:166`, `Pets.api.jsx:96`). **No lo renombres como parte de este
  cambio** — cambiar el nombre del filtro y el de la entidad a la vez rompe el
  alta de mascotas. Si quieres corregir el typo, va en un PR aparte.
- El `limit=4` que hoy se aplica solo cuando hay `search` en `/users`
  (`User.api.jsx:45`) parece accidental. El frontend dejará de mandar ese caso
  especial y enviará siempre el `limit` que elija el usuario.
- Índices sugeridos para que el orden no degrade: `users(role)`,
  `users(last_name)`, `pets(specie_id)`, `pets(user_id)`. El `LIKE %…%` de
  `search` no usa índice; si `totalItems` crece mucho, ahí conviene full-text.

---

## 8. Cómo lo consume el frontend

Mapeo directo del estado de TanStack Table a query params:

| Estado de la tabla        | Query param                          |
|---------------------------|--------------------------------------|
| `pagination.pageIndex`    | `page = pageIndex + 1`               |
| `pagination.pageSize`     | `limit`                              |
| `sorting[0].id`           | `sortBy`                             |
| `sorting[0].desc`         | `sortOrder = desc ? 'desc' : 'asc'`  |
| `globalFilter`            | `search` (con debounce de 500 ms)    |
| `columnFilters`           | `role`, `gender`, `specieId`, …      |

Y de la respuesta al grid:

| Respuesta    | Opción de la tabla |
|--------------|--------------------|
| `totalPages` | `pageCount`        |
| `totalItems` | `rowCount`         |

La tabla corre con `manualPagination`, `manualSorting` y `manualFiltering` en
`true`: el servidor es la única fuente de verdad y el cliente no reordena ni
refiltra lo que recibe.

**Consecuencia en el frontend:** `useUser` pasa de `useInfiniteQuery` a un
`useQuery` normal, con la query key incluyendo todos los parámetros. El sobre
conserva `hasNextPage`/`nextPage` para los listados que siguen con scroll
infinito, así que ese cambio es aislado y no toca `/products` ni `/bills`.

---

## 9. Checklist de implementación

- [ ] DTO de query con validación + lista blanca de `sortBy` por endpoint
- [ ] `limit` capado a 100
- [ ] `ORDER BY … , id ASC` (desempate estable)
- [ ] Orden de texto case-insensitive y `NULLS LAST`
- [ ] Filtros combinados con AND, CSV en los multi-valor, rangos inclusivos
- [ ] `page`, `limit`, `totalPages` agregados al sobre
- [ ] `nextPage: null` cuando `hasNextPage` es `false`
- [ ] `page` fuera de rango → `200` con `data: []`
- [ ] Retrocompatible: sin params nuevos, la respuesta es la de hoy
- [ ] Decidido el punto §6 (`birthday`)
