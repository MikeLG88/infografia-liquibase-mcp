# Infografías de Arquitectura: Liquibase y MCP

Aplicación web construida con React + Vite para explicar de forma visual e interactiva dos temas clave de arquitectura moderna:

- Liquibase para gestión de cambios en bases de datos.
- MCP (Model Context Protocol) para integración desacoplada con capacidades de IA.

El proyecto presenta conceptos, buenas prácticas, anti-patrones, flujos y ejemplos de uso orientados a contexto empresarial.

## Tabla de contenido

- Descripción general
- Stack tecnológico
- Requisitos previos
- Instalación y ejecución local
- Scripts disponibles
- Estructura del proyecto
- Flujo funcional de la app
- Personalización rápida
- Build y despliegue
- Troubleshooting
- Próximas mejoras sugeridas

## Descripción general

La interfaz inicia con una pantalla de selección con dos rutas:

- Sección Liquibase
- Sección MCP

Cada sección incluye:

- Problema que resuelve
- Diagrama de flujo o arquitectura
- Prácticas recomendadas
- Anti-patrones
- Ejemplo real
- Resumen de calidad, despliegue y riesgos

Toda la navegación ocurre en una sola vista usando estado local de React.

## Stack tecnológico

- React 19
- React DOM 19
- Vite 8
- TypeScript 6 (disponible en el proyecto por configuración y utilidades)
- JavaScript (JSX) para los componentes actuales

## Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- Node.js 20 LTS o superior (recomendado)
- npm 10 o superior

Puedes validar versiones con:

```bash
node -v
npm -v
```

## Instalación y ejecución local

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre la URL que muestra Vite en consola (normalmente `http://localhost:5173`).

## Scripts disponibles

En `package.json` se encuentran estos scripts:

- `npm run dev`: levanta la app en modo desarrollo.
- `npm run build`: ejecuta chequeo de TypeScript (`tsc`) y luego genera build de producción con Vite.
- `npm run preview`: sirve localmente el build generado para validación previa a despliegue.

## Estructura del proyecto

```text
vite-project/
	index.html
	package.json
	tsconfig.json
	public/
	src/
		App.jsx
		counter.ts
		index.css
		main.jsx
		README.md
		style.css
		assets/
		components/
			ui/
				button.jsx
				card.jsx
```

Archivos clave:

- `src/main.jsx`: punto de entrada de React.
- `src/App.jsx`: componente principal con toda la lógica de navegación por secciones.
- `src/index.css`: estilos globales activos mínimos.
- `index.html`: documento base con el contenedor `#root`.

Nota:

- `src/style.css`, `src/counter.ts` y componentes en `src/components/ui/` parecen venir de plantillas o pruebas y actualmente no participan en el render principal.

## Flujo funcional de la app

El estado `section` controla qué bloque se muestra:

- `home`: pantalla inicial con opciones Liquibase/MCP.
- `liquibase`: contenido completo de la infografía de Liquibase.
- `mcp`: contenido completo de la infografía de MCP.

Los botones y tarjetas cambian el valor del estado para navegar entre vistas sin routing externo.

## Personalización rápida

### Cambiar textos de contenido

Edita directamente `src/App.jsx` en las tarjetas (`Card`) de cada sección.

### Cambiar estilos globales

Modifica `src/index.css` para fuentes, márgenes base y ajustes globales.

### Ajustar metadatos de la página

En `index.html` puedes cambiar:

- `<title>` de la pestaña
- idioma (`lang`)
- favicon

## Build y despliegue

1. Genera artefactos de producción:

```bash
npm run build
```

2. Se creará la carpeta `dist/` con archivos estáticos listos para publicar.

3. Opciones comunes de despliegue:

- Netlify
- Vercel
- GitHub Pages
- Servidor estático corporativo (Nginx/Apache)

4. Validación previa recomendada:

```bash
npm run preview
```

## Troubleshooting

### La app no inicia

- Verifica versión de Node.js.
- Elimina `node_modules` y `package-lock.json` y reinstala:

```bash
rm -rf node_modules package-lock.json
npm install
```

En Windows PowerShell puedes usar:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### El puerto 5173 está en uso

Ejecuta Vite en otro puerto:

```bash
npm run dev -- --port 5174
```

### El build falla por TypeScript

El script de build ejecuta `tsc` antes de Vite. Revisa errores en archivos `.ts` o configuración de `tsconfig.json`.

## Próximas mejoras sugeridas

- Migrar estilos inline a un sistema de estilos modular (CSS Modules o Tailwind).
- Separar cada sección (Liquibase/MCP) en componentes independientes para facilitar mantenimiento.
- Agregar pruebas de UI con Vitest + Testing Library.
- Incorporar internacionalización si se requiere contenido multi-idioma.
- Publicar un pipeline CI/CD con validación automática de build.

---

Si este repositorio evoluciona, mantén este README actualizado para reflejar scripts, estructura y convenciones vigentes.