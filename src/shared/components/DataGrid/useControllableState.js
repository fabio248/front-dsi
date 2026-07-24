import { useCallback, useState } from 'react';

/**
 * Permite que una porción del estado de la tabla viva dentro del hook
 * (no controlada) o que la posea el producto / la URL / el servidor (controlada).
 *
 * Si `value` viene definido, el hook no guarda nada: solo notifica el cambio.
 * TanStack Table entrega updaters (un valor o una función), así que se resuelven
 * aquí para que quien controla el estado siempre reciba un valor plano.
 */
export function useControllableState(value, onChange, defaultValue) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (updater) => {
      const nextValue =
        typeof updater === 'function' ? updater(currentValue) : updater;

      if (!isControlled) setInternalValue(nextValue);

      onChange?.(nextValue);
    },
    [currentValue, isControlled, onChange]
  );

  return [currentValue, handleChange];
}
