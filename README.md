# Core Task Web (Frontend)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

Aplicacion web para gestionar proyectos y tareas, conectada a la API de Core Task.

## Tabla de contenido

- [Resumen](#resumen)
- [Stack tecnico](#stack-tecnico)
- [Requisitos](#requisitos)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Rutas](#rutas)
- [Gestion de estado y datos](#gestion-de-estado-y-datos)
- [Estructura](#estructura)
- [Flujo de trabajo recomendado](#flujo-de-trabajo-recomendado)
- [Despliegue](#despliegue)

## Resumen

Este frontend permite:

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

- `/`: dashboard de proyectos.
- `/projects/create`: crear proyecto.
- `/projects/:projectId`: detalle del proyecto y tareas.
- `/projects/:projectId/edit`: editar proyecto.

## Gestion de estado y datos

- Se usa TanStack Query para consultas, cache e invalidacion.
- Se aplica actualizacion optimista en acciones clave de tareas para reflejar cambios en el DOM al instante.
- Al finalizar mutaciones se invalida cache para confirmar datos reales del backend.
- `QueryClientProvider` y `ReactQueryDevtools` estan configurados en `src/main.tsx`.

## Estructura

```text
src/
  api/
    ProjectAPI.ts
    TaskAPI.ts
  components/
    projects/
    tasks/
  layouts/
    AppLayout.tsx
  lib/
    axios.ts
    taskStatus.ts
  type/
    index.ts
  views/
    DashboardView.tsx
    projects/
  router.tsx
  main.tsx
```

## Flujo de trabajo recomendado

1. Inicia primero el backend.
2. Inicia el frontend con `npm run dev`.
3. Verifica que `VITE_API_URL` apunte a la URL correcta del backend.
4. Si despliegas por separado, actualiza las variables de entorno en cada plataforma.

## Despliegue

Para separar frontend y backend en proveedores distintos:

1. Deploy del backend (por ejemplo Render, Railway, Fly.io).
2. Deploy del frontend (por ejemplo Vercel, Netlify, Cloudflare Pages).
3. Configura en frontend `VITE_API_URL` con la URL publica del backend.
4. Configura en backend `FRONTEND_URL` con la URL publica del frontend para CORS.

Con eso la integracion entre ambos repositorios queda desacoplada y lista para produccion.

## ✉️ Contacto

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github&style=flat-square)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin&style=flat-square)](https://linkedin.com/in/errold-núñez-sánchez)
[![Email](https://img.shields.io/badge/Email-errold222@gmail.com-D14836?logo=gmail&style=flat-square)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+506_7802_7211-25D366?logo=whatsapp&logoColor=white&style=flat-square)](https://wa.me/50678027211)