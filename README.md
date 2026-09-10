# Precio Inbox — Frontend

Catálogo digital para negocios locales. Los dueños crean su catálogo,
suben productos con fotos y precio, y comparten una URL pública que
sus clientes pueden ver y usar para pedir directo por WhatsApp.

Este repositorio es el frontend (React + Vite). El backend vive en un
repositorio separado (FastAPI + PostgreSQL).

Producción: [precioinbox.com](https://precioinbox.com)

## Flujo principal

- **Público**: `/catalogo/:slug` muestra el catálogo de un negocio,
  `/productos/:productId` muestra el detalle de un producto con botón
  de "Pedir por WhatsApp".
- **Dueño del negocio**: `/registro` y `/login` para crear cuenta,
  `/panel` para administrar el catálogo, `/productos` para dar de
  alta y editar productos.

## Stack

- React 19 + React Router 7
- Vite
- CSS plano con variables de diseño (sin framework de UI), en
  `src/index.css` (tokens) y `src/App.css` (componentes)

## Desarrollo local

```bash
npm install
npm run dev
```

Requiere una variable de entorno `VITE_API_BASE_URL` apuntando al
backend (ver `.env.example`).

```bash
npm run build    # build de producción
npm run lint      # eslint
```
