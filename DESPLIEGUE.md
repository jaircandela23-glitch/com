# Cómo publicar NEXUM (gratis, sin comprar dominio)

## Opción recomendada: Vercel
1. Sube esta carpeta a un repositorio de GitHub (puede ser **privado**, es gratis).
2. Entra a vercel.com → "Add New Project" → conecta tu cuenta de GitHub → elige el repositorio.
3. Framework: "Other" (es HTML estático). Deja todo por defecto y dale "Deploy".
4. En minutos tendrás una URL tipo `nexum.vercel.app`. Cada vez que subas cambios a GitHub, se actualiza sola.
5. Más adelante, cuando tengas presupuesto, puedes conectar un dominio propio (ej. nexum.pe) desde el panel de Vercel sin volver a subir nada.

## Sobre "hacerla privada"
- El repositorio de GitHub puede quedar **privado** (el código fuente no lo ve nadie) aunque el sitio publicado sea visible por su link.
- Si quieres que la web en sí no aparezca en Google mientras la terminas, puedo agregar una etiqueta `noindex` (ya incluida por defecto, revisa `<head>` si quieres cambiarlo).
- Si necesitas que solo entre quien tenga una contraseña, eso requiere un paso extra (protección con contraseña en Vercel, disponible en plan pago, o un script simple de acceso). Avísame si lo quieres y lo agrego.

## Alternativa: GitHub Pages
- Gratis también, pero el repositorio debe ser público para que funcione en el plan gratuito de GitHub.
- Ideal solo si no te importa que el código fuente sea visible.

## Firebase
- Útil si en el futuro quieres una base de datos real detrás del sitio (por ejemplo, guardar leads o historial del bot). Para una web informativa como esta, Vercel es más simple.
