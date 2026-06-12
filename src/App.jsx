import { useState } from "react";

export default function App() {
  const [section, setSection] = useState("home");

  const Box = (text) => (
    <div style={{
      padding: "10px 15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "white"
    }}>
      {text}
    </div>
  );

  const Arrow = () => <span style={{ margin: "0 10px" }}>➡️</span>;

  const Card = ({ title, icon, children }) => (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ display: "flex", gap: "10px", color: "#0b3d91" }}>
        <span>{icon}</span>
        {title}
      </h3>
      <div style={{ marginTop: "10px", lineHeight: "1.6" }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto", background: "#f4f6f8", fontFamily: "Arial" }}>

      <h1 style={{ textAlign: "center" }}>🏦 Arquitectura – Liquibase & MCP</h1>

      {/* HOME */}
      {section === "home" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
          <div onClick={() => setSection("liquibase")} style={{ cursor: "pointer", padding: "30px", background: "#0b3d91", color: "white", borderRadius: "12px" }}>
            <h2>🗄️ Liquibase</h2>
            <p>Control de cambios en BD</p>
          </div>

          <div onClick={() => setSection("mcp")} style={{ cursor: "pointer", padding: "30px", background: "#34a853", color: "white", borderRadius: "12px" }}>
            <h2>🤖 MCP</h2>
            <p>Arquitectura AI-ready</p>
          </div>
        </div>
      )}

      {/* ==================== LIQUIBASE ==================== */}
      {section === "liquibase" && (
        <>
          <h1>🗄️ Liquibase</h1>

          <Card icon="⚠️" title="¿Qué problema resuelve?">
            <ul>
              <li>Descontrol de scripts SQL entre ambientes</li>
              <li>Errores manuales en despliegues</li>
              <li>Falta de trazabilidad</li>
              <li>Inconsistencia entre dev / test / prod</li>
            </ul>
          </Card>

          {/* 🔥 DIAGRAMA */}
          <Card icon="📊" title="Flujo (Pipeline)">
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              {Box("Developer")}
              <Arrow />
              {Box("SQL Scripts")}
              <Arrow />
              {Box("Changelog")}
              <Arrow />
              {Box("Git")}
              <Arrow />
              {Box("CI/CD")}
              <Arrow />
              {Box("Database")}
            </div>
          </Card>

          <Card icon="⚙️" title="¿Cómo lo usamos hoy?">
            <ul>
              <li>Scripts organizados por ticket (YYYYMM_JIRA)</li>
              <li>Uso de partial-changelog.yml</li>
              <li>Integración en main-changelog.yml</li>
              <li>Ejecución automática vía pipeline</li>
              <li>Registro en DATABASECHANGELOG</li>
            </ul>
          </Card>

          <Card icon="✅" title="Buenas prácticas">
            <ul>
              <li>Scripts idempotentes (IF EXISTS)</li>
              <li>Un changeset por cambio</li>
              <li>No modificar scripts ejecutados</li>
              <li>Uso de contexts (dev/test/prod)</li>
              <li>Deploy solo vía CI/CD</li>
              <li>Uso de variables seguras</li>
              <li>Validación previa (validate / status)</li>
            </ul>
          </Card>

          <Card icon="❌" title="Anti-patrones">
            <ul>
              <li>Ejecutar SQL manual en PROD</li>
              <li>Modificar cambios ya ejecutados</li>
              <li>No versionar en repositorio</li>
              <li>No definir rollback</li>
              <li>Credenciales en código</li>
            </ul>
          </Card>

          <Card icon="📌" title="Ejemplo real">
            Crear tabla → script → changelog → pipeline →
            ejecución → registro automático en BD
          </Card>

          <Card icon="📊" title="Calidad / Deploy / Riesgos">
            <ul>
              <li><b>✅ Calidad:</b> consistencia entre entornos</li>
              <li><b>🚀 Deploy:</b> automatización total</li>
              <li><b>⚠️ Riesgo:</b> rollback + auditoría</li>
            </ul>
          </Card>

          <button onClick={() => setSection("home")}>⬅ Volver</button>
        </>
      )}

      {/* ==================== MCP ==================== */}
      {section === "mcp" && (
        <>
          <h1>🤖 MCP</h1>

          <Card icon="⚠️" title="¿Qué problema resuelve?">
            <ul>
              <li>Alta complejidad en integración con IA</li>
              <li>Acoplamiento cliente-backend</li>
              <li>Mal manejo de contexto</li>
            </ul>
          </Card>

          {/* 🔥 DIAGRAMA */}
          <Card icon="📊" title="Arquitectura MCP">
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              {Box("Usuario")}
              <Arrow />
              {Box("LLM")}
              <Arrow />
              {Box("MCP Server")}
              <Arrow />
              {Box("Tools")}
              <Arrow />
              {Box("Backend")}
            </div>
          </Card>

          <Card icon="⚙️" title="¿Cómo lo usamos hoy?">
            <ul>
              <li>Tools invocadas automáticamente</li>
              <li>Resources como contexto controlado</li>
              <li>Prompts estandarizados</li>
              <li>Uso de Streamable HTTP</li>
            </ul>
          </Card>

          <Card icon="✅" title="Buenas prácticas">
            <ul>
              <li>Separar Tools / Resources / Prompts</li>
              <li>Uso de Streamable HTTP</li>
              <li>No mantener sesiones persistentes</li>
              <li>Optimizar tamaño del contexto</li>
              <li>Diseño desacoplado</li>
              <li>Trazabilidad por operación</li>
            </ul>
          </Card>

          <Card icon="❌" title="Anti-patrones">
            <ul>
              <li>Uso de SSE en alta concurrencia</li>
              <li>Sobrecargar contexto</li>
              <li>No controlar acceso a recursos</li>
              <li>Lógica en cliente o modelo</li>
            </ul>
          </Card>

          <Card icon="📌" title="Ejemplo real">
            Usuario → modelo → tool → backend →
            respuesta enriquecida
          </Card>

          <Card icon="📊" title="Calidad / Deploy / Riesgos">
            <ul>
              <li><b>✅ Calidad:</b> respuestas consistentes</li>
              <li><b>🚀 Deploy:</b> escalable cloud</li>
              <li><b>⚠️ Riesgo:</b> control de acceso</li>
            </ul>
          </Card>

          <button onClick={() => setSection("home")}>⬅ Volver</button>
        </>
      )}

    </div>
  );
}