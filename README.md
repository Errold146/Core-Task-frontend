# Core Task Web (Frontend)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

Aplicacion web para gestionar proyectos y tareas, conectada a la API de Core Task con autenticacion completa.

## Tabla de contenido

- [Resumen](#resumen)
- [Stack tecnico](#stack-tecnico)
- [Requisitos](#requisitos)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Rutas](#rutas)
- [Gestion de estado y datos](#gestion-de-estado-y-datos)
- [Autenticacion](#autenticacion)
- [Estructura](#estructura)
- [Flujo de trabajo recomendado](#flujo-de-trabajo-recomendado)
- [Despliegue](#despliegue)

## Resumen

Este frontend permite:

- Registrar usuarios, confirmar cuenta por email y hacer login.
- Recuperar password con codigo de un solo uso enviado por email.
- Crear, editar y eliminar proyectos (eliminacion con confirmacion de password).
- Crear, editar y eliminar tareas por proyecto.
- Cambiar estado de tareas con **Drag & Drop** al estilo kanban (usando `@dnd-kit/react`) con actualizacion optimista.
- Agregar, ver y eliminar notas en cada tarea desde un panel lateral dentro del modal de tarea.
- Gestionar el equipo del proyecto: buscar colaboradores por email, agregar y eliminar miembros.
- Ver y editar el perfil del usuario (nombre, email, password).
- Ver feedback de acciones y errores con toasts (Sonner).

## Stack tecnico

- React 19 + TypeScript
- Vite 8
- Tailwind CSS (con tokens de diseño personalizados: `gris-*`, `azul-*`, `verde-*`)
- React Router v7
- TanStack Query v5 (cache, actualizacion optimista, invalidacion)
- Axios (con interceptor que inyecta JWT en cada peticion)
- React Hook Form v7
- Zod (validacion de esquemas de respuesta de la API)
- Headless UI v2 (Dialog, Transition, Menu)
- Heroicons v2
- Sonner (toasts)
- **@dnd-kit/react** v0.4 (DnD kanban — DragDropProvider, useDraggable, useDroppable, DragOverlay)

## Requisitos

- Node.js 18+
- npm 9+
- Backend de Core Task corriendo y accesible

## Instalacion

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env` en la raiz de frontend (ver ejemplo abajo).

3. Levantar entorno local:

```bash
npm run dev
```

App local por defecto:

- `http://localhost:5173`

## Variables de entorno

Crear `.env` en frontend con:

```env
VITE_API_URL=http://localhost:4000/api
```

Descripcion:

- `VITE_API_URL`: URL base del backend consumida por Axios.

## Scripts

- `npm run dev`: servidor de desarrollo de Vite.
- `npm run build`: build de produccion.
- `npm run preview`: previsualizar build local.
- `npm run lint`: ejecutar ESLint.

## Rutas

### Rutas protegidas (requieren sesion activa)

| Ruta | Vista | Descripcion |
|---|---|---|
| `/` | `DashboardView` | Lista de proyectos del usuario |
| `/projects/create` | `CreateProjectView` | Formulario para crear proyecto |
| `/projects/:projectId` | `ProjectsDetailsView` | Tablero kanban con las tareas del proyecto |
| `/projects/:projectId/edit` | `EditProjectView` | Formulario para editar proyecto |
| `/projects/:projectId/team` | `ProjectTeamView` | Gestion del equipo del proyecto |
| `/profile` | `ProfileView` | Ver y editar datos del perfil |
| `/profile/change-password` | `ChangePasswordView` | Cambiar password desde el perfil |

### Rutas de autenticacion

| Ruta | Vista | Descripcion |
|---|---|---|
| `/auth/login` | `LoginView` | Inicio de sesion |
| `/auth/register` | `RegisterView` | Registro de nueva cuenta |
| `/auth/confirm-account` | `ConfirmAccountView` | Confirmacion de cuenta con codigo |
| `/auth/new-code` | `RequestNewCodeView` | Solicitar nuevo codigo de confirmacion |
| `/auth/forgot-password` | `ForgotPasswordView` | Solicitar recuperacion de password |
| `/auth/new-password` | `NewPasswordView` | Ingresar codigo y definir nuevo password |

## Gestion de estado y datos

- TanStack Query gestiona cache, refetch e invalidacion en todas las operaciones.
- Actualizacion optimista en el DnD kanban: el estado de la tarea se mueve visualmente de inmediato y se revierte si el servidor devuelve error.
- Patron URL-state para modales: las URL del tipo `?viewTask=id`, `?deleteProject=id` controlan que modal esta abierto, lo que hace los modales enlazables y funcionales con el boton Atras del navegador.
- `QueryClientProvider` y `ReactQueryDevtools` estan configurados en `src/main.tsx`.

## Autenticacion

- El JWT recibido al hacer login se almacena en `localStorage`.
- Axios adjunta automaticamente el token en el header `Authorization: Bearer <token>` para todas las peticiones al backend.
- El hook `useAuth` consulta `/api/auth/user` y provee el usuario autenticado a los componentes.
- El `AppLayout` actua como guardia de ruta: redirige a `/auth/login` si el usuario no esta autenticado.
- El `NavMenu` muestra el nombre del usuario y permite cerrar sesion limpiando el token de `localStorage`.

## Estructura

```text
src/
  api/
    AuthAPI.ts          <- llamadas a /api/auth/*
    NoteAPI.ts          <- llamadas a notas por tarea
    ProfileAPI.ts       <- perfil y check-password
    ProjectAPI.ts
    TaskAPI.ts
    TeamAPI.ts          <- gestion de equipo
  components/
    AuthHeading.tsx
    ErrorMessage.tsx
    Footer.tsx
    Heading.tsx
    Logo.tsx
    NavMenu.tsx
    Spinner.tsx
    auth/
      NewPasswordForm.tsx
      NewPasswordToken.tsx
    notes/
      AddNotesForm.tsx       <- formulario de nueva nota
      NotesList.tsx          <- lista de notas con boton eliminar
      NotesPanel.tsx         <- panel lateral de notas en modal de tarea
    profile/
      ProfileForm.tsx        <- formulario de edicion de perfil
      Tabs.tsx               <- tabs entre perfil y cambio de password
    projects/
      DeleteProjectModal.tsx <- modal con confirmacion de password
      EditProjectForm.tsx
      ProjectForm.tsx
    tasks/
      AddTaskModal.tsx
      EditTaskData.tsx
      EditTaskModal.tsx
      TaskCard.tsx           <- card arrastrable con grip de DnD
      TaskForm.tsx
      TaskModalDetails.tsx
      TasksList.tsx          <- tablero kanban con columnas soltables
    team/
      AddMemberForm.tsx      <- busqueda y seleccion de miembro
      AddMemberModal.tsx
      SearchResult.tsx
  hooks/
    useAuth.ts
  layouts/
    AppLayout.tsx            <- layout protegido con guardia de auth
    AuthLayout.tsx
    ProfileLayout.tsx        <- layout con tabs de perfil
  lib/
    axios.ts                 <- instancia con JWT en header
    taskStatus.ts
  type/
    index.ts
  utils/
    index.ts
    policies.ts              <- helpers de autorizacion (manager/member)
  views/
    DashboardView.tsx
    NotFoundView.tsx
    auth/
      ConfirmAccountView.tsx
      ForgotPasswordView.tsx
      LoginView.tsx
      NewPasswordView.tsx
      RegisterView.tsx
      RequestNewCodeView.tsx
    Profile/
      ChangePasswordView.tsx
      ProfileView.tsx
    projects/
      CreateProjectView.tsx
      EditProjectView.tsx
      ProjectsDetailsView.tsx
      ProjectTeamView.tsx    <- gestion del equipo del proyecto
  router.tsx
  main.tsx
```

## Flujo de trabajo recomendado

1. Inicia primero el backend con `npm run dev` (puerto 4000 por defecto).
2. Inicia el frontend con `npm run dev` (puerto 5173 por defecto).
3. Verifica que `VITE_API_URL` en `.env` apunte a la URL correcta del backend.
4. Regístrate en `/auth/register`, confirma la cuenta con el codigo recibido por email.
5. Inicia sesion en `/auth/login` para acceder al dashboard.
6. Crea un proyecto, agrega tareas y arrastralas entre columnas para cambiar su estado.
7. Abre una tarea para agregar notas o ver el historial de comentarios.
8. En la vista de equipo del proyecto puedes buscar colaboradores por email y agregarlos.
9. Si despliegas por separado, actualiza `VITE_API_URL` en el proveedor de frontend con la URL publica del backend.

## Despliegue

Para desplegar en produccion (SPA estatica):

1. Elige un proveedor para SPAs (Vercel, Netlify, Cloudflare Pages, etc.).
2. Configura `VITE_API_URL` en las variables de entorno del proveedor, apuntando a la URL publica del backend.
3. El comando de build es `npm run build` y el directorio de salida es `dist/`.
4. Si usas React Router con rutas del lado del cliente, configura el proveedor para redirigir todas las rutas a `index.html` (rewrite rule `/* → /index.html`).
5. No subas `.env` al repositorio — usa siempre las variables de entorno del panel del proveedor.

## ✉️ Contacto

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github&style=flat-square)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin&style=flat-square)](https://linkedin.com/in/errold-núñez-sánchez)
[![Email](https://img.shields.io/badge/Email-errold222@gmail.com-D14836?logo=gmail&style=flat-square)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+506_7802_7211-25D366?logo=whatsapp&logoColor=white&style=flat-square)](https://wa.me/50678027211)