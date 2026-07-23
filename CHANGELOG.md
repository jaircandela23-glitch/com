# Changelog

## Rediseño profesional (sin neón) + eliminación de LoveMotion

**Colores:** se reemplazó el dorado brillante + efectos de glow neón por
una paleta profesional más sobria:
- Acento principal: bronce/dorado apagado `#B8933D` (antes `#D4AF37` con
  halos de luz).
- Fondos: grafito/azul-negro profundo (`#0A0D12`, `#0E121A`, `#121721`).
- Se eliminaron TODAS las sombras "glow" (`--gw`, `--gw2`, `--gs`,
  `--gs2` ahora son sombras oscuras suaves, no halos de luz).
- Se quitaron los `text-shadow` de neón (título hero, contador de cupos,
  headers de sección, íconos) — 12 instancias.

**Tipografía:** se cambió `Orbitron` (fuente "sci-fi/gamer") por
`Space Grotesk` en títulos, y `Rajdhani` (condensada tipo HUD) por
`DM Sans` en el cuerpo de texto. Se quitó `Cormorant Garamond` (no se
usaba fuera de LoveMotion). El `<link>` de Google Fonts se limpió para
cargar solo lo necesario.

**Efectos eliminados** (más "cyberpunk" que "profesional"):
- Cursor personalizado con anillo brillante siguiendo el mouse.
- Canvas de partículas conectadas de fondo.
- Línea de escaneo animada (`scanMove`) sobre el hero.
- Animación de parpadeo (`glow`) en el título principal — ahora usa un
  degradado sutil y estático con una transición de color suave.

**LoveMotion — eliminado por completo:**
- Se quitó la tarjeta "LoveMotion" de la sección "Ecosistema Nexum" en
  el home (abría `lovemotion-FINAL.html`, un archivo que no forma parte
  de este repo).
- Se eliminó la página muerta `<div id="p-lovemotion">` (nunca estaba
  enlazada al router SPA — no aparecía en el mapa `pages` de
  `js/main.js`, así que no era alcanzable navegando el sitio).
- Se borró `js/lovemotion.js` y su `<script>`.
- Se eliminó el bloque completo de CSS exclusivo de LoveMotion
  (~500 líneas al final de `styles.css`): tenía su propio `:root` que
  redeclaraba `--bg` globalmente, lo cual pisaba silenciosamente el
  fondo del sitio completo. Al borrarlo también se corrige ese
  problema de raíz.
- Se actualizó el meta `description` (ya no menciona LoveMotion).

## [Fix anterior] — Bug estructural en p-home (ver commit previo)

El `</div>` de cierre de `p-home` estaba mal ubicado (después de
LoveMotion en vez de antes). Se corrigió el orden; documentado en el
commit anterior de este changelog.
