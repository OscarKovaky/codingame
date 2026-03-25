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

1. Instala dependencias.
2. Compila Angular con configuración `render` (`baseHref: /`).
3. Dispara un deploy hook de Render si existe el secreto `RENDER_DEPLOY_HOOK_URL`.

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
