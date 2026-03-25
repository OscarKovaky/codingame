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

## Estructura

- `src/app/app.component.ts`: layout principal y lógica Three.js.
- `src/app/app.component.html`: hero y secciones dinámicas.
- `src/app/app.component.css`: estilos de componentes.
