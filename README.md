# Portafolio en Angular + Three.js

Migración base de un portafolio a Angular standalone con integración de Three.js para el hero principal.

## Ejecutar

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Levanta el servidor:
   ```bash
   npm run start
   ```

## Deploy en GitHub Pages

Para publicar en `https://oscarkovaky.github.io/codingame/`, compila con configuración de producción (incluye `baseHref` para `/codingame/`):

```bash
npm run build
```

## Pipeline para Render

Se agregó una pipeline de GitHub Actions en `.github/workflows/render-deploy.yml` que:

1. En cada `pull_request` hacia `main`, instala dependencias y compila Angular con configuración `render` (`baseHref: /`) para validar la integración.
2. En cada `push` a `main`, vuelve a compilar y dispara el deploy hook de Render.
3. Requiere el secreto `RENDER_DEPLOY_HOOK_URL` para garantizar despliegue automático en cada integración a `main`.

Para probar localmente el build que usa Render:

```bash
npm run build:render
```

También se incluye `render.yaml` para crear el servicio estático en Render usando:

- `buildCommand`: `npm install && npm run build:render`
- `staticPublishPath`: `dist/portafolio-angular-three/browser`

## Estructura

- `src/app/app.component.ts`: layout principal y lógica Three.js.
- `src/app/app.component.html`: hero y secciones dinámicas.
- `src/app/app.component.css`: estilos de componentes.
