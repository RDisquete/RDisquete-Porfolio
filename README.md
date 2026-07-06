# 💿 RDISQUETE | Portfolio Web
### "De la lente al código: Prensando interfaces de alta fidelidad."

Portfolio personal de **Rafael Dorado (RDisquete)** — Frontend Developer especializado en React, TypeScript y diseño de alto impacto. Aplico el rigor visual de mi trayectoria como fotógrafo profesional al desarrollo de software moderno.

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # Desarrollo en http://localhost:5173
npm run build     # Producción en dist/
npm test          # Suite de tests (Vitest)
```

## 📂 Estructura

```
src/
├── components/     # Componentes reutilizables
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectModal.tsx
│   ├── ProyectosHome.tsx
│   ├── Sobremi.tsx
│   ├── Manifesto.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   └── ScrollToTop.tsx
├── pages/          # Páginas del router
│   ├── Home.tsx
│   ├── Proyectos.tsx
│   ├── Conoceme.tsx
│   └── Contacto.tsx
├── hooks/          # Custom hooks
│   └── useTranslatedProjects.ts
├── data/           # Datos de proyectos
│   ├── projectsData.tsx
│   └── projectKeys.ts
├── i18n/           # Traducciones ES/EN
│   ├── index.ts
│   ├── es.json
│   └── en.json
└── App.tsx
```

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Lenguaje:** TypeScript (strict)
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Traducciones:** i18next + react-i18next
- **Testing:** Vitest + Testing Library
- **Backend:** Supabase (auth, RLS, Realtime)
- **Mobile:** React Native + Expo (skyRESERVE)

## 🧪 Testing

Suite de tests con Vitest y Testing Library (tests co-localizados junto a cada componente/página):

- `src/components/Header.test.tsx`
- `src/App.test.tsx`
- `src/pages/Home.test.tsx`
- `src/pages/Proyectos.test.tsx`
- `src/pages/Contacto.test.tsx`
- `src/pages/Conoceme.test.tsx`

```bash
npm test          # Ejecutar tests
npm run coverage  # Cobertura
```

## 🎨 Decisiones Técnicas

1. **Arquitectura de componentes:** Header, HeroSection, ProjectCard, ProjectModal, ProyectosHome, etc. — cada uno con responsabilidad única, tipado estricto y tests asociados.
2. **Estética grunge/retro:** Texturas dinámicas (`paperproject.webp`, `abstract-crumpled.webp`) que aportan profundidad visual sin sacrificar velocidad de carga.
3. **Narrativa "Cara A / Cara B":** Metáfora musical aplicada a la organización del portfolio — los proyectos se clasifican como `First Press`, `Remastered` o `Bootleg` según su peso técnico.
4. **i18n ES/EN:** Traducción completa con `react-i18next`, usando `<Trans>` con named tags y `components` prop para preservar elementos estilizados.
5. **Semántica y accesibilidad:** Roles ARIA, etiquetas `aria-label`, jerarquía de headings, navegación por teclado.
6. **Testing:** 6 suites que cubren componentes, páginas y flujos de navegación — ejecutadas en CI para evitar regresiones.

## 📬 Contacto

- **Web:** [rdisquete.es](https://rdisquete.es)
- **LinkedIn:** [linkedin.com/in/rafael-dorado-zamoro/](https://www.linkedin.com/in/rafael-dorado-zamoro/)
- **Email:** rafael.doradozamoro@gmail.com
- **GitHub:** [github.com/RDisquete](https://github.com/RDisquete)

---

*Hecho con cabezonería y mucho café.*
