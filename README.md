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
- Crear, editar y eliminar proyectos.
- Crear, editar y eliminar tareas por proyecto.
- Cambiar estado de tareas con actualizacion inmediata en DOM.
- Ver feedback de acciones y errores con toasts.

## Stack tecnico

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Headless UI + Heroicons + Sonner

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
| `/projects/:projectId` | `ProjectsDetailsView` | Detalle del proyecto y sus tareas |
| `/projects/:projectId/edit` | `EditProjectView` | Formulario para editar proyecto |

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

- Se usa TanStack Query para consultas, cache e invalidacion.
- Se aplica actualizacion optimista en acciones clave de tareas para reflejar cambios en el DOM al instante.
- Al finalizar mutaciones se invalida cache para confirmar datos reales del backend.
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
    AuthAPI.ts          <- llamadas a /api/auth/* (nuevo)
    ProjectAPI.ts
    TaskAPI.ts
  components/
    AuthHeading.tsx     <- heading para paginas de auth (nuevo)
    ErrorMessage.tsx
    Heading.tsx
    Logo.tsx
    NavMenu.tsx         <- menu de navegacion con datos de usuario (nuevo)
    Spinner.tsx
    auth/
      NewPasswordForm.tsx    <- formulario nuevo password (nuevo)
      NewPasswordToken.tsx   <- ingreso de token de recuperacion (nuevo)
    projects/
      EditProjectForm.tsx
      ProjectForm.tsx
    tasks/
      AddTaskModal.tsx
      EditTaskData.tsx
      EditTaskModal.tsx
      TaskCard.tsx
      TaskForm.tsx
      TaskModalDetails.tsx
      TasksList.tsx
  hooks/
    useAuth.ts          <- hook para obtener usuario autenticado (nuevo)
  layouts/
    AppLayout.tsx       <- layout protegido con guardia de auth (actualizado)
    AuthLayout.tsx      <- layout para paginas publicas de auth (nuevo)
  lib/
    axios.ts            <- instancia de Axios con token en header (actualizado)
    taskStatus.ts
  type/
    index.ts
  utils/
    index.ts
  views/
    DashboardView.tsx
    auth/
      ConfirmAccountView.tsx    <- (nuevo)
      ForgotPasswordView.tsx    <- (nuevo)
      LoginView.tsx             <- (nuevo)
      NewPasswordView.tsx       <- (nuevo)
      RegisterView.tsx          <- (nuevo)
      RequestNewCodeView.tsx    <- (nuevo)
    projects/
      CreateProjectView.tsx
      EditProjectView.tsx
      ProjectsDetailsView.tsx
  router.tsx            <- rutas de auth agregadas (actualizado)
  main.tsx
```

## Flujo de trabajo recomendado

1. Inicia primero el backend.
2. Inicia el frontend con `npm run dev`.
3. Verifica que `VITE_API_URL` apunte a la URL correcta del backend.
4. Regístrate en `/auth/register`, confirma la cuenta con el codigo recibido por email.
5. Inicia sesion en `/auth/login` para acceder al dashboard.
6. Si despliegas por separado, actualiza las variables de entorno en cada plataforma.

## Despliegue

Para separar frontend y backend en proveedores distintos:

1. Deploy del backend (por ejemplo Render, Railway, Fly.io).
2. Deploy del frontend (por ejemplo Vercel, Netlify, Cloudflare Pages).
3. Configura en frontend `VITE_API_URL` con la URL publica del backend.
4. Configura en backend `FRONTEND_URL` con la URL publica del frontend para CORS y links de email.

Con eso la integracion entre ambos repositorios queda desacoplada y lista para produccion.

## ✉️ Contacto

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github&style=flat-square)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin&style=flat-square)](https://linkedin.com/in/errold-núñez-sánchez)
[![Email](https://img.shields.io/badge/Email-errold222@gmail.com-D14836?logo=gmail&style=flat-square)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+506_7802_7211-25D366?logo=whatsapp&logoColor=white&style=flat-square)](https://wa.me/50678027211)