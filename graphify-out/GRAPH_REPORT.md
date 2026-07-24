# Graph Report - front-dsi  (2026-07-24)

## Corpus Check
- 250 files · ~242,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 945 nodes · 1779 edges · 92 communities (53 shown, 39 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad25b517`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- index.jsx
- useAuth
- ProductItem.jsx
- CreateUserModal
- clinical-sheet.factory.ts
- package.json
- AdminUsersPage
- Contrato de endpoints paginados (`/users`, `/pets`)
- AdminDashboardPage
- package.json
- UserDetailsPage
- PerfilUserAndPets.jsx
- Alerta
- auth.fixture.ts
- PetsPage
- GenerateMedicalHistoryForm.jsx
- MedicalSeeForm.jsx
- CompletePerfilPets.jsx
- Auth.api.jsx
- AgendarCita.jsx
- ApiAuth
- MedicalHistoryForm
- FactureItem.jsx
- index.jsx
- users.page.ts
- ListeredAppointByEmail.jsx
- Pets
- Basic.modal.jsx
- pet.factory.ts
- pet-details.page.ts
- PetsItem.jsx
- PetsForm.jsx
- MedicalHistoryForm.jsx
- UserItem.jsx
- Login.jsx
- UserRowActions.jsx
- dependencies
- UserListItem
- PetDetailsPage
- TestingTesina UI E2E Tests
- Registro.jsx
- GeneratePdfApi
- ListeredPets.jsx
- MedicalHistory.jsx
- UserForm.jsx
- manage-pet.spec.ts
- .getAccessToken
- HealthCertificatePdfForm.jsx
- PetsAllItems.jsx
- AuthContext.jsx
- Users.jsx
- UsePet.js
- main.jsx
- ConsentSurgeryPdfForm.jsx
- date-fns
- @emotion/react
- @emotion/styled
- @fontsource/roboto
- formik-material-ui
- genk-step-progress-bar
- jwt-decode
- jwt-decoder
- lodash
- @mui/icons-material
- @mui/material
- @mui/x-date-pickers
- @mui/x-date-pickers-pro
- react-dom
- react-dropzone
- react-icons
- react-infinite-scroll-component
- react-input-mask
- react-number-format
- react-router-dom
- @react-spring/web
- react-text-mask
- styled-components
- @supabase/auth-helpers-react
- @supabase/supabase-js
- @tanstack/react-query
- @tanstack/react-query-devtools
- @tanstack/react-table
- unsplash-js
- @vercel/speed-insights
- yup
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `ApiAuth` - 46 edges
2. `useAuth()` - 28 edges
3. `AdminUsersPage` - 27 edges
4. `CreateUserModal` - 26 edges
5. `Pets` - 23 edges
6. `UserApi` - 17 edges
7. `Alerta()` - 17 edges
8. `AdminDashboardPage` - 15 edges
9. `DatepickerComponent` - 13 edges
10. `Sidebar` - 13 edges

## Surprising Connections (you probably didn't know these)
- `MedicalHistoryForm()` --references--> `react`  [EXTRACTED]
  src/components/Vet_components/MedicalHistory/MedicalHistoryForm/MedicalHistoryForm.jsx → package.json
- `Modal_delete()` --references--> `react`  [EXTRACTED]
  src/shared/modal_delete/Modal_delete.jsx → package.json
- `Basic_modal()` --references--> `react`  [EXTRACTED]
  src/shared/Modal_register_petAndClient/Basic.modal.jsx → package.json
- `Clients_Layouts()` --references--> `react`  [EXTRACTED]
  src/layouts/Clients_Layouts/Clients_Layouts.jsx → package.json
- `Users_Layouts()` --references--> `react`  [EXTRACTED]
  src/layouts/Users_Layouts/Users_Layouts.jsx → package.json

## Import Cycles
- 3-file cycle: `src/components/Vet_components/Pets_crud/PetsAllItems/PetsAllItems.jsx -> src/components/Vet_components/Pets_crud/index.jsx -> src/components/Vet_components/Pets_crud/PetsAllItems/index.jsx -> src/components/Vet_components/Pets_crud/PetsAllItems/PetsAllItems.jsx`
- 3-file cycle: `src/shared/Modal_register_petAndClient/Basic.modal.jsx -> src/shared/index.jsx -> src/shared/Modal_register_petAndClient/index.jsx -> src/shared/Modal_register_petAndClient/Basic.modal.jsx`
- 5-file cycle: `src/components/Vet_components/Pets_crud/PetsForm.jsx -> src/shared/index.jsx -> src/shared/Modal_register_petAndClient/index.jsx -> src/shared/Modal_register_petAndClient/Basic.modal.jsx -> src/components/Vet_components/Pets_crud/index.jsx -> src/components/Vet_components/Pets_crud/PetsForm.jsx`

## Communities (92 total, 39 thin omitted)

### Community 0 - "index.jsx"
Cohesion: 0.06
Nodes (46): a11yProps(), authController, ListFacture(), a11yProps(), apiAuthController, DEFAULT_COLUMN_VISIBILITY, DEFAULT_SORTING, getPetRowId() (+38 more)

### Community 1 - "useAuth"
Cohesion: 0.05
Nodes (30): react, react, Logout(), theme, ProtectedRoute(), useAuth(), Clients_Layouts(), Users_Layouts() (+22 more)

### Community 2 - "ProductItem.jsx"
Cohesion: 0.07
Nodes (24): BillsApi, Product, FactureForm(), FactureFormFields(), productController, userController, initialValuesBills, validateBillsCreateSchema (+16 more)

### Community 3 - "CreateUserModal"
Cohesion: 0.07
Nodes (4): CreateUserModal, NewUser, DatepickerComponent, DatepickerOptions

### Community 4 - "clinical-sheet.factory.ts"
Cohesion: 0.10
Nodes (12): makeAnamnesisData(), makeDiagnosisData(), makePhysicalExamData(), AnamnesisData, AnamnesisStep, CreateClinicalSheetModal, DiagnosisData, DiagnosisStep (+4 more)

### Community 5 - "package.json"
Cohesion: 0.08
Nodes (23): devDependencies, @playwright/test, @types/react, @types/react-dom, vite, @vitejs/plugin-react, wait-on, @playwright/test (+15 more)

### Community 7 - "Contrato de endpoints paginados (`/users`, `/pets`)"
Cohesion: 0.09
Nodes (21): 1. Request — parámetros comunes, 2. Response — sobre común, 3. Errores, 4. `GET /users`, 5. `GET /pets`, 6. `birthday` — resuelto, no hace falta migrar, 7. Notas menores, 8. Cómo lo consume el frontend (+13 more)

### Community 9 - "package.json"
Cohesion: 0.10
Nodes (20): dotenv, author, dependencies, @faker-js/faker, description, devDependencies, dotenv, @playwright/test (+12 more)

### Community 10 - "UserDetailsPage"
Cohesion: 0.12
Nodes (6): OwnerDetails, OwnerDetailsCard, PetDetails, PetListItem, PetsListCard, UserDetailsPage

### Community 11 - "PerfilUserAndPets.jsx"
Cohesion: 0.15
Nodes (11): HistoryAndAnneasis(), PerfilPets(), apiAuthController, petsController, apiAuthController, petsController, BackButton(), Breadcrumbs() (+3 more)

### Community 12 - "Alerta"
Cohesion: 0.18
Nodes (11): ChangePassInitialData(), ChangePasswordValidation(), ForgotPassInitialData(), ForgotPasswordValidation(), authController, ForgotPassword(), authController, ChangePassword() (+3 more)

### Community 13 - "auth.fixture.ts"
Cohesion: 0.20
Nodes (8): test, TestFixtures, WorkerFixtures, LoginPage, AppRoutes, test, RequiredEnvKey, requireEnv()

### Community 15 - "GenerateMedicalHistoryForm.jsx"
Cohesion: 0.20
Nodes (10): DewormingFields(), initialValuesMedicalHistoryPdf, validateMedicalHistoryPdfSchema, GenerateMedicalHistoryFields(), authController, generatePdfController, petController, HeatFields() (+2 more)

### Community 16 - "MedicalSeeForm.jsx"
Cohesion: 0.17
Nodes (8): Files, authController, filesController, MedicalHistoryPhysicalExamTextFields(), authController, filesController, MedicalSeeForm(), Modal_delete()

### Community 17 - "CompletePerfilPets.jsx"
Cohesion: 0.16
Nodes (10): a11yProps(), apiAuthController, generatePdfController, petsController, defaultTheme, PetMedicalHistorySurgicalIntervations(), defaultTheme, PetMedicalHistoryTreatments() (+2 more)

### Community 18 - "Auth.api.jsx"
Cohesion: 0.31
Nodes (5): typeDocument, config, configApiBackend, configJwt, supabase

### Community 19 - "AgendarCita.jsx"
Cohesion: 0.21
Nodes (8): ApiCitas, AgendarCita(), appointmentController, authController, userController, initialValues, typesAppointments, validationSchemaRegister

### Community 20 - "ApiAuth"
Cohesion: 0.21
Nodes (3): ApiAuth, AuthProvider(), Login()

### Community 21 - "MedicalHistoryForm"
Cohesion: 0.16
Nodes (4): PetsMedicalHistories, MedicalHistoryForm(), initialPetValues(), validationSchemaPetRegister()

### Community 22 - "FactureItem.jsx"
Cohesion: 0.16
Nodes (5): defaultTheme, generatePdfController, FactureSeeData(), Modal_verInfoFacture(), style

### Community 23 - "index.jsx"
Cohesion: 0.14
Nodes (5): Modal_create_pet(), style, Modal_Facture(), style, style

### Community 24 - "users.page.ts"
Cohesion: 0.24
Nodes (7): UserActionIcon, SidebarItem, SidebarOptions, adminSidebarItems, clientSidebarItems, AdminRouteKey, AppRoutesDefinition

### Community 25 - "ListeredAppointByEmail.jsx"
Cohesion: 0.21
Nodes (6): AppoinmentsItems(), apiAuthController, apiCitaController, ListeredAppointByEmail(), decoderToken(), hasExpiredToken()

### Community 26 - "Pets"
Cohesion: 0.19
Nodes (7): Pets, authController, petController, PetsForm(), authController, defaultTheme, petController

### Community 27 - "Basic.modal.jsx"
Cohesion: 0.15
Nodes (11): UserFormTextFields(), authController, Backdrop, blue, Fade, grey, steps, StyledBackdrop (+3 more)

### Community 28 - "pet.factory.ts"
Cohesion: 0.26
Nodes (7): makeNewPet(), MakeNewPetOptions, makeNewUser(), MakeNewUserOptions, Specie, NewUser, formatDDMMYYYY()

### Community 29 - "pet-details.page.ts"
Cohesion: 0.24
Nodes (5): ModalMode, PetFormModal, Pet, PetDetailsTab, PetGeneralInfo

### Community 30 - "PetsItem.jsx"
Cohesion: 0.20
Nodes (6): PetsItem(), userController, FactureItem(), useModal(), modalStyle, SharedModal()

### Community 31 - "PetsForm.jsx"
Cohesion: 0.25
Nodes (8): Species, authController, PetFormTextFields(), petsController, specieController, initialPetValues(), validationSchemaPetRegister(), Basic_modal()

### Community 32 - "MedicalHistoryForm.jsx"
Cohesion: 0.27
Nodes (6): MedicalHistoryFormAnamnesisTextFields(), MedicalHistoryFormDiagnosticTextFields(), authController, medicalHistoryController, petsController, steps

### Community 33 - "UserItem.jsx"
Cohesion: 0.22
Nodes (5): UserApi, authController, defaultTheme, userController, UserItem()

### Community 34 - "Login.jsx"
Cohesion: 0.24
Nodes (3): initialData(), LoginFormvalidations(), authLoginController

### Community 35 - "UserRowActions.jsx"
Cohesion: 0.31
Nodes (7): authController, defaultTheme, userController, UserRowActions(), ROLE_LABEL, SORTABLE_USER_FIELDS, usersColumns

### Community 36 - "dependencies"
Cohesion: 0.22
Nodes (9): axios, dayjs, formik, dependencies, axios, dayjs, formik, @vercel/analytics (+1 more)

### Community 39 - "TestingTesina UI E2E Tests"
Cohesion: 0.22
Nodes (8): Continuous Integration, Development Tips, Getting Started, Prerequisites, Project Structure, TestingTesina UI E2E Tests, Troubleshooting, Useful Commands

### Community 40 - "Registro.jsx"
Cohesion: 0.36
Nodes (5): initialData(), RegisterFormvalidations(), authController, Registro(), Copyright()

### Community 43 - "ListeredPets.jsx"
Cohesion: 0.25
Nodes (3): apiAuthController, ListeredPets(), petsController

### Community 44 - "MedicalHistory.jsx"
Cohesion: 0.29
Nodes (4): defaultTheme, PetMedicalHistory(), Modal_verInfoClientAndPet(), style

### Community 45 - "UserForm.jsx"
Cohesion: 0.43
Nodes (5): authControl, userControl, UserForm(), initialValues(), validationSchemaRegister()

### Community 46 - "manage-pet.spec.ts"
Cohesion: 0.43
Nodes (3): COLUMN_BY_FIELD, PetDetails, getRandomNumber()

### Community 47 - ".getAccessToken"
Cohesion: 0.38
Nodes (4): GenerateMedicalHistoryForm(), PetsAllItems(), PetRowActions(), GenerateMedicalHistory()

### Community 48 - "HealthCertificatePdfForm.jsx"
Cohesion: 0.43
Nodes (4): HealthCertificationPdfForm(), initialValuesHealthCertificatePdf, validateHealthCertificatePdfSchema, HealthCertificationPdfFields()

### Community 49 - "PetsAllItems.jsx"
Cohesion: 0.33
Nodes (3): authController, defaultTheme, petController

### Community 50 - "AuthContext.jsx"
Cohesion: 0.40
Nodes (3): AuthContext, authController, userController

### Community 52 - "UsePet.js"
Cohesion: 0.40
Nodes (3): EMPTY_PETS, petsController, usePet()

### Community 53 - "main.jsx"
Cohesion: 0.40
Nodes (4): App(), queryClient, supabase, theme

### Community 54 - "ConsentSurgeryPdfForm.jsx"
Cohesion: 0.60
Nodes (3): ConsentSurgeryPdfForm(), generatePdfApi, validateConsentSurgeryPdfSchema()

## Knowledge Gaps
- **215 isolated node(s):** `MakeNewPetOptions`, `MakeNewUserOptions`, `TestFixtures`, `WorkerFixtures`, `ModalMode` (+210 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `useAuth`, `package.json`, `date-fns`, `@emotion/react`, `@emotion/styled`, `@fontsource/roboto`, `formik-material-ui`, `genk-step-progress-bar`, `jwt-decode`, `jwt-decoder`, `lodash`, `@mui/icons-material`, `@mui/material`, `@mui/x-date-pickers`, `@mui/x-date-pickers-pro`, `react-dom`, `react-dropzone`, `react-icons`, `react-infinite-scroll-component`, `react-input-mask`, `react-number-format`, `react-router-dom`, `@react-spring/web`, `react-text-mask`, `styled-components`, `@supabase/auth-helpers-react`, `@supabase/supabase-js`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `@tanstack/react-table`, `unsplash-js`, `@vercel/speed-insights`, `yup`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `react` connect `useAuth` to `MedicalSeeForm.jsx`, `dependencies`, `MedicalHistoryForm`, `PetsForm.jsx`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `ApiAuth` connect `ApiAuth` to `index.jsx`, `ProductItem.jsx`, `PerfilUserAndPets.jsx`, `Alerta`, `GenerateMedicalHistoryForm.jsx`, `MedicalSeeForm.jsx`, `CompletePerfilPets.jsx`, `Auth.api.jsx`, `AgendarCita.jsx`, `ListeredAppointByEmail.jsx`, `Pets`, `Basic.modal.jsx`, `PetsForm.jsx`, `MedicalHistoryForm.jsx`, `UserItem.jsx`, `Login.jsx`, `UserRowActions.jsx`, `Registro.jsx`, `ListeredPets.jsx`, `UserForm.jsx`, `.getAccessToken`, `PetsAllItems.jsx`, `AuthContext.jsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `MakeNewPetOptions`, `MakeNewUserOptions`, `TestFixtures` to the rest of the system?**
  _215 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.056338028169014086 - nodes in this community are weakly interconnected._
- **Should `useAuth` be split into smaller, more focused modules?**
  _Cohesion score 0.054244306418219465 - nodes in this community are weakly interconnected._
- **Should `ProductItem.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06763285024154589 - nodes in this community are weakly interconnected._