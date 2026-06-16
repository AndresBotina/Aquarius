<!-- ====== HEADER ====== -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=0:0b1026,100:22d3ee&text=Aquarius&fontColor=ffffff&descFontColor=ffffff&fontSize=70&animation=fadeIn&fontAlignY=38&desc=Andres%20Botina&descAlignY=58&descSize=18" width="100%" />

<a href="https://github.com/AndresBotina">
  <img src="https://readme-typing-svg.demolab.com?font=Space+Mono&weight=600&size=22&duration=3500&pause=800&color=ffffff&center=true&vCenter=true&width=600&lines=Backend+%C2%B7+IA+%C2%B7+Automatizaci%C3%B3n;Sitio+en+construcci%C3%B3n+%E2%9A%A1" alt="typing" />
</a>

<br/><br/>

![Status](https://img.shields.io/badge/estado-en%20construcci%C3%B3n-06B6D4?style=for-the-badge)
![Fase](https://img.shields.io/badge/fase-1%20%C2%B7%20teaser-6366F1?style=for-the-badge)
![Licencia](https://img.shields.io/badge/licencia-MIT-1C1C1C?style=for-the-badge)

</div>

<br/>

## Sobre el proyecto

**Aquarius** es mi portafolio personal: un sitio para mostrar mi trabajo en **backend, IA y automatización** a reclutadores y clientes. La idea no es lucirme con frontend, sino comunicar que construyo **sistemas listos para producción**.

Por ahora vive en su **Fase 1**: un *teaser* dinámico de "en construcción". Una secuencia de frases animadas que cierra sobre un botón de contacto persistente, todo sobre un fondo vivo de la **constelación de Acuario** — luceros con titileo suave y líneas que se re-trazan entre puntos.

<br/>

## 🛠️ Stack

<div align="center">

![Astro](https://img.shields.io/badge/Astro%206-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript%20strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS%20nativo-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

Sin Tailwind ni React por ahora — se incorporan en Fase 2, cuando haya trabajo real que los justifique. Tipografías: **Space Grotesk** (sans) y **Space Mono** (mono).

<br/>

## 📂 Estructura

```text
src/
├── styles/        # design tokens + estilos globales
├── data/          # datos tipados (aquarius.ts, phases, contact)
├── scripts/       # lógica de animación (constellation, intro)
├── components/    # componentes Astro (IntroSequence, Constellation)
├── layouts/       # BaseLayout
└── pages/         # index.astro
```

Cada capa con una sola responsabilidad: la forma de la constelación vive como coordenadas en `data/`, la animación en `scripts/`, y los componentes solo orquestan.

<br/>

## 🚀 Desarrollo

```bash
# instalar dependencias
npm install

# servidor de desarrollo  →  http://localhost:4321
npm run dev

# build de producción
npm run build

# previsualizar el build
npm run preview
```

<br/>

## 🗺️ Roadmap

| Fase | Contenido | Estado |
|------|-----------|:------:|
| **1 · Teaser** | Landing "en construcción": secuencia animada + botón WhatsApp + fondo constelación | 🔵 En curso |
| **2 · Portafolio** | Case studies (IA, automatización, backend), React como islas (filtro de proyectos, command-palette, demos de agentes embebidas) | ⚪ Planeado |
| **3 · Infra** | Tailwind, blog MDX, sitemap, RSS, OG images automáticas, analytics, deploy en Cloudflare/Vercel, dominio propio | ⚪ Planeado |

<br/>

<div align="center">

**Andres Botina** · Backend / IA / Automatización · Medellín 🇨🇴

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AndresBotina)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:cacbotina@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/573227513539)

<img src="https://capsule-render.vercel.app/api?type=waving&height=120&color=0:22d3ee,100:0b1026&section=footer" width="100%" />

</div>