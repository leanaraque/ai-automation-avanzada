# Semana 1: ¿Qué es en realidad la ciberseguridad?

> **Documento interno del profesor** (no se comparte con los estudiantes).
> Revisado y corregido: formato de tablas y diagramas, datos del caso Equifax, alineación con el entregable oficial de la plataforma y tuteo neutro.

## Metadata del módulo

- **Curso:** Diplomatura en Ciberseguridad (V2)
- **Semana:** 1 de 7 (Clases 1 y 2)
- **Núcleo temático:** Activos, amenazas, vulnerabilidades, riesgo, tríada CIA, taxonomía de atacantes y anatomía del phishing.
- **Entregable asociado:** Reporte de riesgos domésticos (CIA).
- **Objetivo:** construir una mentalidad analítica defensiva que diferencie con precisión las debilidades propias de un sistema (vulnerabilidades) de los peligros externos (amenazas) y de su impacto.

---

## 1. Los cimientos: activos, amenazas, vulnerabilidades y riesgos

### 1.1. El activo

Un **activo** es cualquier elemento, tangible o intangible, que tiene valor para una persona u organización y que, por eso, justifica medidas de protección.

- **Naturaleza:** la seguridad no existe en el vacío; existe para proteger un activo. Un sistema aislado, sin datos ni uso, no tiene valor que proteger.
- **Ejemplos cotidianos y corporativos:**
  - Cuentas de correo e identidad (llaves maestras para recuperar otras cuentas).
  - Aplicaciones bancarias y credenciales financieras.
  - Bases de datos de clientes, propiedad intelectual y archivos en la nube.
  - Privacidad de las comunicaciones y metadatos personales.

### 1.2. La amenaza

Una **amenaza** es cualquier circunstancia, actor o evento con capacidad potencial de explotar una vulnerabilidad y provocar daño, pérdida o interrupción de un activo.

- **Propiedad clave:** suele ser **externa** y estar **fuera del control** del defensor. No podemos impedir que existan actores maliciosos, pero sí monitorear y anticipar sus vectores.
- **Tipos de amenazas:**
  - **Cibercriminales:** buscan lucro mediante estafas, robo de datos o secuestro de información.
  - **Software malicioso (malware):** ransomware, spyware, troyanos, *wipers*.
  - **Accidentales o humanas:** errores no intencionales (borrado involuntario, fallas de configuración puntuales).
  - **Ambientales y físicas:** inundaciones, incendios, cortes eléctricos.

#### Anatomía de un vector común: correo de phishing

```
De:      Soporte BancoSeguro <seguridad@banc0seguro-soporte.com>   <-- (1) Dominio falso (typosquatting)
Asunto:  URGENTE: tu cuenta será bloqueada en 24 hs                <-- (2) Urgencia artificial
Cuerpo:
Estimado cliente:                                                  <-- (3) Saludo genérico
Detectamos un acceso sospechoso. Para evitar el bloqueo definitivo,
verifica tus datos ahora mismo:
  http://bit.ly/verifica-tu-cuenta                                 <-- (4) URL acortada u ofuscada
Si no respondes hoy, perderás el acceso a tus fondos.              <-- (5) Presión emocional
```

**Heurística de detección rápida:**

1. **Dominio del remitente:** verificar que coincida exactamente con el oficial (atención a caracteres parecidos y subdominios confusos).
2. **Urgencia temporal artificial:** busca decisiones impulsivas antes de que la víctima verifique.
3. **Ausencia de personalización:** el atacante masivo no conoce el nombre asociado al correo (el *spear phishing* sí lo usa).
4. **Enlaces sospechosos:** inspección pasiva del enlace (pasar el mouse sin hacer clic) para ver el destino real.
5. **Regla de defensa:** ante **dos o más** indicadores, no interactuar y validar solo por canales oficiales independientes.

### 1.3. La vulnerabilidad

Una **vulnerabilidad** es una debilidad presente en el diseño, la implementación, la configuración o la gestión de un sistema, proceso o comportamiento humano, que una amenaza puede aprovechar.

- **Distinción crítica:** la vulnerabilidad **no es el incidente ni el ataque**; es la falla que existe antes del ataque (la "puerta sin cerrojo").
- **Manifestaciones habituales:**
  - Credenciales débiles, predecibles o reutilizadas.
  - Falta de parches en sistemas, servicios o librerías.
  - Ausencia de autenticación multifactor (MFA).
  - Falta de formación del personal frente a engaños.
  - Permisos mal configurados (por ejemplo, almacenamiento en la nube con acceso público).

> **Criterio para clase:** el **hábito** inseguro o la **falta de formación** son vulnerabilidades; el **evento** accidental (alguien borra por error) es una amenaza accidental.

### 1.4. El riesgo y su modelo conceptual

El **riesgo** es la probabilidad estimada de que una amenaza concreta explote con éxito una vulnerabilidad específica, combinada con el impacto adverso sobre uno o más activos.

```
            +---------------------------------+
            |            AMENAZA              |
            |  (entidad o peligro potencial)  |
            +----------------+----------------+
                             |  busca / explota
                             v
            +----------------+----------------+
            |         VULNERABILIDAD          |
            |  (debilidad o falla intrínseca) |
            +----------------+----------------+
                             |  si se materializa
                             v
+---------------------------------------------------------+
|                          RIESGO                         |
|   Probabilidad × Impacto (daño causado sobre el ACTIVO) |
+---------------------------------------------------------+
```

- **Implicación operacional:**
  - Si la amenaza existe pero la vulnerabilidad fue mitigada (parche, cifrado, MFA), el riesgo baja drásticamente.
  - No es posible eliminar todas las amenazas de internet; la gestión de seguridad concentra recursos en **reducir vulnerabilidades**.
- **Respuestas posibles ante un riesgo:** mitigar (aplicar controles), transferir (seguros), evitar (dejar de usar el servicio) o aceptar (cuando proteger cuesta más que el daño).

### 1.5. Caso de estudio: brecha de Equifax (2017)

| Dimensión | Detalle |
|---|---|
| **Activo** | Datos personales y financieros de unos **147 millones** de consumidores. |
| **Vulnerabilidad** | Falla de ejecución remota de código en Apache Struts (**CVE-2017-5638**). El parche se publicó en **marzo de 2017**, pero no se instaló en un servidor de producción. |
| **Amenaza** | Atacantes que escaneaban internet buscando servidores sin actualizar. Ingresaron en **mayo de 2017**. |
| **Detección y anuncio** | Tráfico sospechoso detectado el **29 de julio de 2017**; anuncio público en **septiembre de 2017**. |
| **Impacto** | Robo masivo de identidades, acuerdos y multas que superaron los 500 millones de dólares, renuncias ejecutivas y daño reputacional. |
| **Lección** | No hacía falta neutralizar a los atacantes: bastaba con cerrar a tiempo la vulnerabilidad conocida. |

### 1.6. Analogía: hogar vs. entorno digital

| Concepto | En el mundo físico (la casa) | En el ciberespacio |
|---|---|---|
| **Activo** | Bienes, joyas, documentos, la familia | Archivos, bases de datos, credenciales, saldo bancario, identidad |
| **Amenaza** | Un ladrón que recorre el barrio | Un grupo criminal o una botnet que escanea servicios y prueba contraseñas |
| **Vulnerabilidad** | Ventana trasera rota o puerta sin traba | Contraseña simple ("123456"), sistema sin actualizar, falta de MFA |
| **Riesgo** | Probabilidad de que el ladrón encuentre la ventana y robe | Probabilidad de que el atacante encuentre la debilidad y cause daño |

### 1.7. Errores y mitos frecuentes

1. **"Si nunca sufrí un incidente, mi riesgo es nulo":** confunde riesgo con incidente. La vulnerabilidad sigue abierta aunque nadie la haya descubierto todavía.
2. **"El usuario es el único eslabón débil":** el factor humano es recurrente (según el Verizon DBIR 2026, el **62%** de las brechas involucró el elemento humano, frente al 60% del informe 2025), pero muchas brechas nacen de software sin parchear o configuraciones inseguras.
3. **Confundir amenaza con ataque:** la amenaza es la capacidad potencial; el ataque es su ejecución deliberada.

---

## 2. La tríada CIA y el ecosistema de atacantes

### 2.1. Los tres pilares

```
                    CONFIDENCIALIDAD
               (acceso solo a autorizados)
                         /   \
                        /     \
                       /  CIA  \
                      /         \
                     /___________\
          INTEGRIDAD               DISPONIBILIDAD
   (exactitud y no alteración)   (acceso continuo y oportuno)
```

| Pilar | Definición | Controles | Violación tipo |
|---|---|---|---|
| **Confidencialidad** | La información no se divulga a personas, entidades o procesos no autorizados. | Cifrado en reposo y en tránsito (BitLocker, VeraCrypt, TLS), listas de control de acceso, MFA. | Filtración de una base de usuarios; espionaje de correos. |
| **Integridad** | Exactitud, completitud y validez de la información; prevención de modificaciones no autorizadas o accidentales. | Funciones hash (SHA-256), firmas digitales, control de versiones, registros de auditoría inmutables. | Alteración de un saldo o del destinatario de una transferencia. |
| **Disponibilidad** | Acceso oportuno y confiable para usuarios autorizados cuando lo necesitan. | Backups probados, redundancia, balanceo de carga, mitigación DDoS, planes de continuidad (BCP/DRP). | DDoS; ransomware que cifra archivos. |

> Un mismo incidente puede afectar varios pilares: el ransomware de **doble extorsión** afecta disponibilidad (cifra) y confidencialidad (roba y amenaza con publicar).

### 2.2. Taxonomía de atacantes

| Perfil | Motivación | Sofisticación | Modus operandi |
|---|---|---|---|
| **Script kiddies** | Ego, curiosidad, reconocimiento | Baja (herramientas de terceros) | Escaneos masivos, desfiguración de sitios |
| **Hacktivistas** | Ideológica, política o social | Media, variable | Filtraciones (*doxing*), DDoS a portales |
| **Cibercriminales** | Beneficio económico | Media-alta (organizados como "crimen como servicio") | Ransomware, fraude, robo de tarjetas, Business Email Compromise (BEC) |
| **Amenaza interna (insider)** | Venganza, dinero, espionaje o negligencia | Variable (con privilegios legítimos) | Exfiltración por USB, borrado de respaldos, abuso de permisos |
| **Estado-nación / APT** | Geopolítica, espionaje, sabotaje | Máxima (financiación estatal, *0-days*) | Intrusiones silenciosas y persistentes durante meses o años |

### 2.3. Cuestionario con análisis de respuestas

1. **Alteración no autorizada de saldos bancarios, sin transferir dinero** → **Integridad**. La confidencialidad protege el secreto, no la exactitud; la disponibilidad no se afecta (el sistema sigue respondiendo); la autenticación es un mecanismo, no un pilar.
2. **E-commerce caído por tráfico simulado masivo** → **Disponibilidad**. Un DDoS no necesariamente roba ni modifica: agota recursos.
3. **Atacantes que despliegan ransomware y exigen rescate** → **Cibercriminales** (motivación económica).
4. **Mecanismos para resguardar la confidencialidad** → **cifrado** y **control de acceso robusto (MFA, contraseñas fuertes)**. Distractores: backups (disponibilidad) y firmas digitales (integridad y no repudio).
5. **Colaborador que copia registros a un USB antes de irse** → **Amenaza interna**.
6. **Infiltración silenciosa de largo plazo en infraestructura estatal** → **APT**.

---

## 3. Síntesis del módulo (podcast de consolidación)

En el diálogo entre **Alex** y la **Dra. Martina** se formalizan tres ideas:

1. **La ciberseguridad es un proceso dinámico**, no un software que se instala: es un ciclo continuo de evaluación de riesgos.
2. **Los ataques son automatizados e indiscriminados.** La creencia de "no soy nadie importante" es falsa: las herramientas escanean masivamente y atacan a quien tenga la vulnerabilidad, sin importar quién sea.
3. **La tríada CIA es un marco analítico universal:** todo incidente puede descomponerse según el pilar degradado.

---

## 4. Actividad práctica: Reporte de riesgos domésticos (CIA)

### 4.1. Enunciado oficial (plataforma)

1. Selecciona 3 activos digitales de tu vida diaria (ejemplo: e-mail, aplicación de banco, red social, fotos en la nube).
2. Para cada uno, escribe una oración que explique por qué es importante proteger su Confidencialidad, su Integridad y su Disponibilidad.
3. Identifica una vulnerabilidad para cada activo (¿qué estás haciendo mal o qué le falta a tu configuración?).
4. Identifica una amenaza externa que podría aprovechar esa vulnerabilidad.
5. Organiza la información en un documento claro (tabla o párrafos con subtítulos).
6. Guarda el archivo como `Reporte_CIA_Apellido_Nombre` y súbelo a la plataforma.

### 4.2. Ficha del entregable

| Campo | Especificación |
|---|---|
| Nombre del archivo | `Reporte_CIA_Apellido_Nombre.pdf` (o `.docx`) |
| Extensión | 2 a 4 páginas |
| Estructura mínima | Inventario de 3 activos, análisis CIA por activo, 1 vulnerabilidad interna y 1 amenaza externa coherentes por activo |
| Opcional (sugerido por la PPT) | Probabilidad/impacto y una mitigación por vulnerabilidad |

### 4.3. Plantilla modelo (referencia para corregir)

```markdown
# Reporte de Riesgos Domésticos (CIA)
**Autor:** [Nombre y Apellido]
**Fecha:** [Fecha]
**Curso:** Diplomatura en Ciberseguridad

## Activo 1: Cuenta principal de correo (Gmail)

### Análisis CIA
- **Confidencialidad:** si un tercero lee mis correos, vería resúmenes bancarios y
  los enlaces para restablecer mis otras cuentas.
- **Integridad:** si un atacante crea reglas de reenvío o modifica mensajes, podría
  suplantarme ante mis contactos.
- **Disponibilidad:** si pierdo el acceso, no puedo recuperar mis servicios críticos.

### Evaluación de riesgo
- **Vulnerabilidad interna:** contraseña reutilizada en otros sitios y sin MFA.
- **Amenaza externa:** credential stuffing o phishing masivo con credenciales filtradas.
- **Escenario:** un programa prueba mi contraseña filtrada, entra y toma control de
  mis cuentas secundarias.
- **(Opcional) Probabilidad / Impacto:** alta / alto → crítico.
- **(Opcional) Mitigación:** contraseña única y MFA con app autenticadora.

## Activo 2: Aplicación de banca móvil
...

## Activo 3: Router Wi-Fi doméstico
...

## Matriz resumen de riesgos

| Activo | Pilar CIA crítico | Vulnerabilidad | Amenaza externa |
|---|---|---|---|
| Gmail principal | Confidencialidad / Integridad | Clave reutilizada, sin MFA | Cibercriminales (credential stuffing) |
| Banca móvil | Confidencialidad / Disponibilidad | Celular sin bloqueo | Robo físico / malware bancario |
| Router doméstico | Integridad / Disponibilidad | Clave admin de fábrica (`admin:admin`) | Botnets que prueban claves por defecto |
```

### 4.4. Checklist de validación

- [ ] Entre 2 y 4 páginas, legibles y ordenadas.
- [ ] Mínimo 3 activos digitales claramente definidos.
- [ ] C, I y D explicadas concretamente para cada activo.
- [ ] 1 vulnerabilidad (interna) y 1 amenaza (externa) por activo, sin confundir los términos.
- [ ] Archivo nombrado `Reporte_CIA_Apellido_Nombre`.
