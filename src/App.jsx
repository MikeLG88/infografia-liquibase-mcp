import { useState } from "react";

export default function App() {
  const [section, setSection] = useState("home");
  const [subsection, setSubsection] = useState(null);

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
      <div style={{ marginTop: "10px", lineHeight: "1.6", fontSize: "14px" }}>
        {children}
      </div>
    </div>
  );

  const TabButton = ({ label, isActive, onClick }) => (
    <button onClick={onClick} style={{
      padding: "10px 20px",
      margin: "5px",
      background: isActive ? "#0b3d91" : "#e0e0e0",
      color: isActive ? "white" : "black",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: isActive ? "bold" : "normal"
    }}>
      {label}
    </button>
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

          <Card icon="💡" title="Definición">
            Liquibase es una herramienta de control de versiones para bases de datos que permite gestionar cambios estructurales de forma automatizada, auditable y repetible entre ambientes de desarrollo, pruebas y producción.
            <br /><br />
            <strong>Analogía:</strong> Así como Git controla cambios en el código fuente, Liquibase controla cambios en la estructura de la base de datos.
          </Card>

          <Card icon="⚠️" title="Problemas que resuelve">
            <strong>Sin versionamiento estructurado:</strong>
            <ul>
              <li>Ambientes inconsistentes (Dev ≠ QA ≠ Prod)</li>
              <li>Scripts ejecutados en distinto orden</li>
              <li>Cambios olvidados entre ambientes</li>
              <li>Falta de trazabilidad completa</li>
              <li>Dificultad para revertir cambios</li>
              <li>Dependencia de conocimiento individual</li>
            </ul>
            <strong>Riesgos evitados:</strong> Pérdida de sincronización, errores humanos, ejecución duplicada, cambios no documentados, fallas por dependencias no identificadas, problemas de auditoría y cumplimiento.
          </Card>

          <Card icon="📊" title="Cómo funciona">
            <strong>Flujo de ejecución:</strong>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
              {Box("Developer crea ChangeSet")}
              <Arrow />
              {Box("Git")}
              <Arrow />
              {Box("Pipeline CI/CD")}
              <Arrow />
              {Box("Liquibase")}
              <Arrow />
              {Box("BD")}
            </div>
            <br />
            <strong>Control interno:</strong> Liquibase mantiene una tabla DATABASECHANGELOG donde registra:
            <ul>
              <li>Qué cambios fueron ejecutados</li>
              <li>Cuándo fueron ejecutados</li>
              <li>Quién los creó</li>
              <li>En qué orden se aplicaron</li>
              <li>Checksum para detectar modificaciones</li>
            </ul>
            De esta forma evita ejecuciones duplicadas y mantiene consistencia entre ambientes.
          </Card>

          <Card icon="⚙️" title="Cómo lo usamos en la organización">
            <ul>
              <li>El desarrollador crea un ChangeSet (SQL versionado)</li>
              <li>El archivo se almacena en Git con el código</li>
              <li>Durante el despliegue: Liquibase valida cambios pendientes</li>
              <li>Ejecuta únicamente los no aplicados (idempotente)</li>
              <li>Registra automáticamente la ejecución en DATABASECHANGELOG</li>
              <li>El ambiente queda alineado con la versión del código desplegado</li>
            </ul>
          </Card>

          <Card icon="✅" title="Buenas prácticas (expandidas)">
            <ol>
              <li><strong>Un ChangeSet por cambio funcional:</strong> Cada cambio debe tener una única responsabilidad (Correcto: crear tabla. Incorrecto: crear 10 tablas en un ChangeSet)</li>
              <li><strong>Nunca modificar ChangeSets ejecutados:</strong> Una vez ejecutado en cualquier ambiente debe considerarse inmutable. Los cambios posteriores generan nuevos ChangeSets</li>
              <li><strong>Nomenclatura descriptiva:</strong> Ejemplo: 202406_001_crear_tabla_cliente.xml (Evitar: 001.xml)</li>
              <li><strong>Implementar Rollback:</strong> Permite recuperación rápida ante errores durante despliegues</li>
              <li><strong>Cambios pequeños y atómicos:</strong> Facilita revisiones de código, auditoría y recuperación ante errores</li>
              <li><strong>Versionar junto con el código:</strong> Los cambios de BD deben viajar en el mismo repositorio y ciclo de liberación</li>
              <li><strong>Validar en ambientes inferiores:</strong> Todo ChangeSet debe ejecutarse previamente en DEV y QA antes de producción</li>
            </ol>
          </Card>

          <Card icon="❌" title="Anti-patrones y errores">
            <ul>
              <li><strong>Modificar ChangeSets históricos:</strong> Provoca errores de checksum y pérdida de trazabilidad</li>
              <li><strong>Ejecutar SQL manual en producción:</strong> Genera diferencias entre ambientes y elimina trazabilidad</li>
              <li><strong>Agrupar demasiados cambios:</strong> Incrementa complejidad y riesgo de despliegue</li>
              <li><strong>No definir Rollback:</strong> Ante una falla, la recuperación se vuelve lenta y riesgosa</li>
              <li><strong>Mezclar datos masivos con cambios estructurales:</strong> Liquibase no debe usarse como ETL</li>
              <li><strong>Saltarse ambientes:</strong> Aplicar directamente en producción aumenta riesgo operativo</li>
            </ul>
          </Card>

          <Card icon="📌" title="Ejemplo real: Clasificación de clientes VIP">
            <strong>Requerimiento:</strong> Agregar clasificación de clientes VIP<br /><br />
            <strong>Solución con Liquibase:</strong>
            <ul>
              <li>Crear ChangeSet que agrega columna tipo_cliente (VARCHAR, DEFAULT 'NORMAL')</li>
              <li>Versionar en Git</li>
              <li>Pipeline ejecuta automáticamente en DEV</li>
              <li>Validar en QA</li>
              <li>Desplegar a Producción</li>
            </ul>
            <strong>Resultado:</strong> Todos los ambientes poseen exactamente la misma estructura, en el mismo momento, sin intervención manual.
          </Card>

          <Card icon="📊" title="Impacto en Calidad, Deploy y Riesgos">
            <strong>✅ Calidad:</strong>
            <ul>
              <li>Ambientes consistentes</li>
              <li>Menos defectos por diferencias estructurales</li>
              <li>Mayor trazabilidad</li>
            </ul>
            <strong>🚀 Deploy:</strong>
            <ul>
              <li>Automatización completa de migraciones</li>
              <li>Integración natural con CI/CD</li>
              <li>Menor intervención manual</li>
            </ul>
            <strong>⚠️ Riesgos mitigados:</strong>
            <ul>
              <li>Reduce errores humanos</li>
              <li>Facilita recuperación mediante rollback</li>
              <li>Proporciona auditoría completa</li>
            </ul>
            <strong>💼 Negocio:</strong> Menor tiempo de despliegue, menos incidentes productivos, mayor estabilidad operacional, mayor velocidad de entrega.
          </Card>

          <button onClick={() => setSection("home")} style={{ padding: "10px 20px", background: "#0b3d91", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>⬅ Volver</button>
        </>
      )}

      {/* ==================== MCP ==================== */}
      {section === "mcp" && (
        <>
          <h1>🤖 MCP (Model Context Protocol)</h1>

          <Card icon="💡" title="Definición">
            MCP (Model Context Protocol) es un estándar abierto que permite conectar modelos de inteligencia artificial con herramientas, sistemas, APIs, bases de datos y repositorios de conocimiento mediante una interfaz común.
            <br /><br />
            <strong>Objetivo:</strong> Desacoplar el modelo de IA de las integraciones específicas de negocio.
          </Card>

          <Card icon="⚠️" title="Problemas que resuelve">
            <strong>Enfoque tradicional (antes de MCP):</strong>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
              {Box("ChatGPT → Integración 1 → ERP")}
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
              {Box("Claude → Integración 2 → ERP")}
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
              {Box("Gemini → Integración 3 → ERP")}
            </div>
            <br />
            <strong>Problemas generados:</strong>
            <ul>
              <li>Duplicación masiva de desarrollo</li>
              <li>Mayor mantenimiento (múltiples integraciones)</li>
              <li>Acoplamiento tecnológico fuerte</li>
              <li>Costos elevados de integración</li>
              <li>Difícil reemplazo de modelos</li>
            </ul>
            <strong>Con MCP (solución):</strong>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
              {Box("Cualquier modelo IA")}
              <Arrow />
              {Box("MCP")}
              <Arrow />
              {Box("Sistema corporativo")}
            </div>
            Una única integración estándar que cualquier modelo puede usar.
          </Card>

          <Card icon="🔗" title="MCP vs APIs tradicionales">
            <strong>API Tradicional:</strong> Resuelve comunicación entre sistemas (App ↔ Sistema)
            <br /><br />
            <strong>MCP:</strong> Resuelve comunicación estandarizada entre IA y sistemas (Modelo IA ↔ Herramienta/API/Sistema)
            <br /><br />
            <strong>Diferencia clave:</strong> El modelo no necesita conocer detalles internos de cada integración. Se enfoca en razonar. Las herramientas se enfocan en ejecutar operaciones.
          </Card>

          <Card icon="📊" title="Cómo funciona">
            <strong>Arquitectura de flujo:</strong>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "10px", flexDirection: "column", gap: "10px" }}>
              <div>Usuario ↓</div>
              <div>Modelo IA (razonamiento) ↓</div>
              <div>Cliente MCP (traductor) ↓</div>
              <div>Servidor MCP (ejecutor) ↓</div>
              <div>Herramientas especializadas ↓</div>
              <div>Sistemas corporativos (BD, APIs, ERPs)</div>
            </div>
            <br />
            <strong>Las herramientas MCP pueden exponer:</strong>
            <ul>
              <li>Consultas SQL seguras y controladas</li>
              <li>APIs específicas de negocio</li>
              <li>Documentación técnica</li>
              <li>Acceso a archivos con permisos</li>
              <li>Integración con ERP/CRM</li>
              <li>Sistemas de autenticación</li>
            </ul>
          </Card>

          <Card icon="⚙️" title="Casos de uso hoy en la organización">
            <ul>
              <li><strong>Consultas sobre bases de datos:</strong> Sin escribir SQL</li>
              <li><strong>Búsqueda en documentación técnica:</strong> RAG (Retrieval-Augmented Generation)</li>
              <li><strong>Consultas operativas:</strong> "¿Cuántos movimientos ayer?"</li>
              <li><strong>Automatización de soporte:</strong> Respuestas basadas en datos reales</li>
              <li><strong>Asistentes internos corporativos:</strong> Acceso controlado a información</li>
            </ul>
            <strong>Ejemplo:</strong> Usuario pregunta "¿Cuántos movimientos fueron procesados ayer?" → IA invoca herramienta MCP → Consulta BD segura → Resultado en lenguaje natural
          </Card>

          <Card icon="✅" title="Buenas prácticas (expandidas)">
            <ol>
              <li><strong>Principio de mínimo privilegio:</strong> La IA solo accede a recursos estrictamente necesarios</li>
              <li><strong>Separar lectura y escritura:</strong> Herramientas distintas para consulta (readonly) y modificación (write)</li>
              <li><strong>Implementar auditoría completa:</strong> Registrar: usuario, solicitud, herramienta utilizada, resultado obtenido, timestamp</li>
              <li><strong>Validar entradas y salidas:</strong> No confiar completamente en contenido generado por la IA</li>
              <li><strong>Versionar herramientas MCP:</strong> Permite evolución controlada y compatibilidad</li>
              <li><strong>Aplicar controles de autorización:</strong> La IA debe respetar permisos corporativos del usuario</li>
              <li><strong>Diseñar herramientas específicas:</strong> Preferir obtenerClientesActivos() en lugar de ejecutarSQLLibre()</li>
            </ol>
          </Card>

          <Card icon="❌" title="Anti-patrones y errores críticos">
            <ul>
              <li><strong>Exponer bases de datos completas:</strong> Incrementa riesgos de seguridad y fuga de información</li>
              <li><strong>Permitir SQL arbitrario:</strong> Puede provocar corrupción de datos o problemas de seguridad</li>
              <li><strong>No registrar actividad:</strong> Impide auditoría y análisis de incidentes</li>
              <li><strong>Herramientas demasiado genéricas:</strong> Generan comportamientos impredecibles</li>
              <li><strong>Exponer secretos al modelo:</strong> Tokens, contraseñas y credenciales NUNCA deben formar parte del contexto</li>
              <li><strong>Falta de control de permisos:</strong> Permite acceso indebido a información sensible</li>
            </ul>
          </Card>

          <Card icon="📌" title="Ejemplo real: Asistente de Operaciones">
            <strong>Escenario:</strong> Asistente interno para operaciones
            <br /><br />
            <strong>Pregunta del usuario:</strong> "¿Cuántas transacciones rechazadas hubo ayer?"
            <br /><br />
            <strong>Flujo con MCP:</strong>
            <ol>
              <li>Usuario envía pregunta en lenguaje natural</li>
              <li>Modelo IA interpreta la intención</li>
              <li>Invoca herramienta MCP: obtenerTransaccionesRechazadas(fecha)</li>
              <li>Herramienta ejecuta consulta SQL segura en SQL Server</li>
              <li>Devuelve resultado estructurado</li>
              <li>IA formatea respuesta amigable al usuario</li>
            </ol>
            <strong>Resultado:</strong> Sin que el usuario conozca SQL ni la estructura de la base de datos, obtiene información precisa y en contexto.
          </Card>

          <Card icon="📊" title="Impacto en Testing, IA y Riesgos">
            <strong>✅ Testing:</strong>
            <ul>
              <li>Facilita pruebas aisladas de herramientas</li>
              <li>Permite simulación sin sistemas reales</li>
              <li>Reduce dependencia de ambientes de producción</li>
            </ul>
            <strong>🤖 IA - Mejoras:</strong>
            <ul>
              <li>Acceso controlado a información corporativa</li>
              <li>Mayor precisión en respuestas (datos reales vs. alucinación)</li>
              <li>Menor alucinación por falta de contexto</li>
              <li>Respuestas verificables y auditables</li>
            </ul>
            <strong>⚠️ Riesgos de mala implementación:</strong>
            <ul>
              <li>Fuga de información sensible</li>
              <li>Escalamiento indebido de privilegios</li>
              <li>Ejecución de operaciones críticas sin autorización</li>
              <li>Dependencia de herramientas mal diseñadas</li>
            </ul>
            <strong>💼 Negocio:</strong> Menor costo de integración, mayor reutilización tecnológica, implementación rápida de asistentes inteligentes, menor dependencia de proveedores específicos de IA.
          </Card>

          <button onClick={() => setSection("home")} style={{ padding: "10px 20px", background: "#34a853", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>⬅ Volver</button>
        </>
      )}

    </div>
  );
}