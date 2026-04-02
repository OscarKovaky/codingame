# Portafolio Angular standalone

Portafolio personal con Angular standalone, Three.js para el hero y una base de chatbot pensada para funcionar en GitHub Pages sin exponer secretos en frontend.

## Correr local

```bash
npm ci
npm start
```

La app queda disponible en `http://localhost:4200/`.

## Build

Build local estándar:

```bash
npm run build
```

Build pensado para GitHub Pages:

```bash
npm run build:pages
```

Si tu repositorio no se llama `codingame`, puedes sobreescribir el `base-href` sin tocar código:

```bash
npm run build:pages -- --base-href "/NOMBRE_DEL_REPO/"
```

## Publicar en GitHub Pages

1. Activa GitHub Pages en el repositorio usando `GitHub Actions` como source.
2. Haz push a `main`.
3. El workflow compila en producción usando el nombre real del repositorio como `base-href`.
4. Durante el build se copia `index.html` a `404.html` para que GitHub Pages soporte la experiencia SPA en subpath.
5. El artifact generado se despliega automáticamente.

## Chatbot en modo estático

Lo que sí funciona en GitHub Pages:

- Widget flotante moderno y responsive.
- Historial con persistencia en `localStorage`.
- Respuestas por FAQs e intents locales.
- Botones rápidos para cotización, servicios, trabajos y WhatsApp.
- Captura básica de lead: nombre, negocio/proyecto y necesidad.
- Fallback automático a modo local si no existe endpoint externo.

Limitaciones del modo estático:

- No usa IA real.
- No sincroniza conversaciones entre dispositivos.
- No guarda leads en servidor.
- No puede consultar datos externos en tiempo real.

## Conectar un backend real después

La arquitectura ya deja dos adaptadores:

- `LocalFaqChatAdapter`: demo 100% estática compatible con Pages.
- `ExternalApiChatAdapter`: punto de integración para backend real.

Para conectar un backend:

1. Configura `externalEndpoint` en `src/environments/environment.production.ts`.
2. Cambia `mode` a `external` o deja `auto` para usar el endpoint cuando exista.
3. Implementa el backend para recibir `message`, `lead` e `history` y responder con el contrato del adapter.
4. Mantén cualquier token o credencial únicamente en backend. No se debe exponer ninguna API key en Angular.
