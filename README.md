# Himanshu Singh Dangi — Developer Portfolio

A modern, high-performance developer portfolio showcasing full-stack engineering, interactive UI architecture, and featured software projects. Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and Lenis smooth scrolling.

---

## Live Deployment

- **Production URL**: [https://himanshusinghdangi.vercel.app/](https://himanshusinghdangi.vercel.app/)
- **Source Code**: [https://github.com/HimanshuSingh213/PortFolio](https://github.com/HimanshuSingh213/PortFolio)

---

## Core Features and Architecture

- **Lenis Physics-Based Smooth Scrolling**: Intercepts wheel and gesture events to produce fluid, frame-synchronized kinetic scrolling with zero input lag.
- **Interactive Tech Stack Capability Matrix**: Dual-state vector SVG icons that transition from subtle monochrome into official brand color palettes on interaction.
- **Collision-Free Responsive Layout**: Dynamic grid and flexbox structure engineered to maintain proper spacing across mobile, tablet, and widescreen viewports.
- **Real-Time GitHub Activity Integration**: Live contribution sheet visualizing commit history and activity streams directly from GitHub.
- **Modular Component Decomposition**: Structured architecture separating concerns into isolated layers (`common`, `layout`, and `sections`).
- **Production Performance**: Sub-second fast refresh and optimized asset chunking powered by Vite.

---

## Technical Capabilities and Stack

### 01 Frontend Architecture
- **JavaScript (ES6+)** — Modern ECMAScript features and asynchronous patterns.
- **TypeScript** — Strict type safety, interfaces, and compile-time correctness.
- **React.js** — Component composition, custom hooks, and React 19 architecture.
- **Next.js** — App Router, Server Components, and optimized rendering strategies.
- **Tailwind CSS (v4)** — Utility-first design systems and custom token management.
- **Framer Motion** — Physics-based spring animations, gesture handling, and layout transitions.
- **Zustand** — Lightweight, unopinionated client-side state management.
- **Recharts** — Dynamic SVG-based charting and interactive data visualization.

### 02 Backend, Data and Services
- **Node.js** — Asynchronous event-driven JavaScript runtime.
- **Express.js** — RESTful API architecture, routing, and custom middleware pipelines.
- **Python** — Scripting, data transformation, and algorithmic analysis.
- **MongoDB** — NoSQL document storage and Mongoose schema modeling.
- **AI and LLM Integration** — Google Gemini API and Groq SDK fast inference integrations.
- **Auth.js / NextAuth.js** — OAuth providers, JWT session handling, and route protection.
- **Zod** — Strict runtime schema validation and static type inference.
- **Nodemailer** — Transactional email automation and SMTP dispatching.

---

## Project Structure

```
├── public/                     # Static assets and project imagery
├── src/
│   ├── assets/                 # SVGs and vector assets
│   ├── Components/
│   │   ├── common/             # Reusable UI components (TextCarousel, PatternSelector)
│   │   ├── layout/             # Layout primitives (MagneticDock, Preloader, Footer)
│   │   ├── sections/           # Modular page sections
│   │   │   ├── Hero.jsx        # Hero profile and introductory headline
│   │   │   ├── About.jsx       # Biography and academic/professional background
│   │   │   ├── TechStack.jsx   # Interactive capability and tech stack grid
│   │   │   ├── ProjectsSection.jsx # Paginated featured projects showcase
│   │   │   ├── GithubActivity.jsx  # Live GitHub contribution heatmap
│   │   │   └── ContactSection.jsx  # Contact channels and social endpoints
│   │   └── Himanshu.jsx        # Main orchestrator component
│   ├── data/
│   │   └── projects.js         # Structured project metadata
│   ├── App.jsx                 # Root application wrapper
│   ├── main.jsx                # Application entrypoint
│   └── index.css               # Global stylesheets, fonts, and dark scrollbar rules
├── index.html                  # HTML entrypoint
├── vite.config.js              # Vite bundler configuration
└── package.json                # Project dependencies and lifecycle scripts
```

---

## Author

**Himanshu Singh Dangi**
- GitHub: [HimanshuSingh213](https://github.com/HimanshuSingh213)
- Twitter / X: [@HimanshuS_213](https://x.com/HimanshuS_213)
- LinkedIn: [Himanshu Singh](https://linkedin.com/in/himanshusingh213)

---

## License

This project is licensed under the MIT License.
