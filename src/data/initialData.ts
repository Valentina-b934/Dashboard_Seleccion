import { Task, RiskInfo, RequirementInfo, Holiday, ToolEvaluation } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    prioridad: 'Media',
    actividad: 'Arranque y confirmación de licencias (cotización real)',
    responsable: 'Dirección',
    dependencias: [],
    duracion: '1 sem',
    semanas: 'S1-S1',
    startWeek: 1,
    endWeek: 1,
    fechas: '2026-11-09 a 2026-11-13',
    startDate: '2026-11-09',
    endDate: '2026-11-13',
    estado: 'Pendiente',
    riesgoRequisito: 'R5 (12)',
    riesgos: ['R5 (12)'],
    requisitos: [],
    descripcionDetallada: 'Formalización del kick-off institucional, adquisición y validación formal de las licencias de Azure DevOps (Azure DevOps Services / Basic / Test Plans) según el presupuesto aprobado para UTS.',
    entregables: [
      'Acta de inicio firmada por Dirección y Vicerrectoría',
      'Factura y confirmación de suscripción Azure DevOps',
      'Asignación formal de recursos y comités'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 2,
    prioridad: 'Media',
    actividad: 'Configurar Azure DevOps; roles y permisos (Azure AD)',
    responsable: 'Responsable de seguridad',
    dependencias: [1],
    duracion: '1 sem',
    semanas: 'S2-S2',
    startWeek: 2,
    endWeek: 2,
    fechas: '2026-11-17 a 2026-11-20',
    startDate: '2026-11-17',
    endDate: '2026-11-20',
    estado: 'Pendiente',
    riesgoRequisito: 'R6 (10) · RNF-01',
    riesgos: ['R6 (10)'],
    requisitos: ['RNF-01'],
    descripcionDetallada: 'Federación de identidades mediante Azure Active Directory institucional (Microsoft Entra ID de UTS). Definición de grupos de seguridad, permisos por proyecto y matriz RBAC.',
    entregables: [
      'Organización de Azure DevOps conectada a Azure AD institucional',
      'Matriz de roles y grupos de acceso (RBAC) aprobada',
      'Políticas de autenticación MFA configuradas'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 3,
    prioridad: 'Media',
    actividad: 'Configurar Azure Boards (solicitudes y mantenimientos)',
    responsable: 'Líder técnico',
    dependencias: [2],
    duracion: '1 sem',
    semanas: 'S3-S3',
    startWeek: 3,
    endWeek: 3,
    fechas: '2026-11-23 a 2026-11-27',
    startDate: '2026-11-23',
    endDate: '2026-11-27',
    estado: 'Pendiente',
    riesgoRequisito: 'R1 (16) · RF-01 · RF-02 · RF-03 · RF-05',
    riesgos: ['R1 (16)'],
    requisitos: ['RF-01', 'RF-02', 'RF-03', 'RF-05'],
    descripcionDetallada: 'Parametrización de los tableros Kanban y Scrum en Azure Boards para gestionar solicitudes de cambio, incidentes y mantenimientos de los sistemas UTS (Atena, Academusoft, Gestión Documental).',
    entregables: [
      'Plantilla de procesos adaptada a la metodología UTS (Epic, Feature, User Story, Bug)',
      'Flujos de trabajo personalizados con estados de aprobación',
      'Dashboards y consultas de seguimiento para líderes'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 4,
    prioridad: 'Baja',
    actividad: 'Migrar repositorios y catálogo de sistemas (Azure Repos)',
    responsable: 'Responsable técnico',
    dependencias: [2],
    duracion: '1 sem',
    semanas: 'S3-S3',
    startWeek: 3,
    endWeek: 3,
    fechas: '2026-11-23 a 2026-11-27',
    startDate: '2026-11-23',
    endDate: '2026-11-27',
    estado: 'Pendiente',
    riesgoRequisito: 'R11 (9) · RNF-05',
    riesgos: ['R11 (9)'],
    requisitos: ['RNF-05'],
    descripcionDetallada: 'Migración controlada de código fuente a repositorios Git en Azure Repos, preservando historial de commits, tags y ramas principales de los sistemas académicos y administrativos UTS.',
    entregables: [
      'Repositorios Git creados con políticas de ramas (Branch Policies)',
      'Revisión de pull requests obligatoria con revisores asignados',
      'Catálogo de servicios y módulos inventariado'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 5,
    prioridad: 'Alta',
    actividad: 'Integración y pruebas tempranas GD/Atena–Academusoft',
    responsable: 'Líder técnico',
    dependencias: [2],
    duracion: '2 sem',
    semanas: 'S3-S4',
    startWeek: 3,
    endWeek: 4,
    fechas: '2026-11-23 a 2026-12-04',
    startDate: '2026-11-23',
    endDate: '2026-12-04',
    estado: 'Pendiente',
    riesgoRequisito: 'R2 (20) · RNF-03',
    riesgos: ['R2 (20)'],
    requisitos: ['RNF-03'],
    descripcionDetallada: 'Pruebas de conectividad, sincronización de datos y webhooks entre los sistemas de Gestión Documental, Atena y el sistema misional Academusoft en el ecosistema UTS.',
    entregables: [
      'Conectores e interfaces API validadas',
      'Informe de interoperabilidad y latencias',
      'Registro de pruebas de integración temprana'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 6,
    prioridad: 'Alta',
    actividad: 'Configurar Pipelines (CI/CD) y Test Plans',
    responsable: 'Líder de calidad',
    dependencias: [3, 4],
    duracion: '1 sem',
    semanas: 'S4-S4',
    startWeek: 4,
    endWeek: 4,
    fechas: '2026-11-30 a 2026-12-04',
    startDate: '2026-11-30',
    endDate: '2026-12-04',
    estado: 'Pendiente',
    riesgoRequisito: 'R3 (20) · R8 (8) · RF-04 · RF-06',
    riesgos: ['R3 (20)', 'R8 (8)'],
    requisitos: ['RF-04', 'RF-06'],
    descripcionDetallada: 'Construcción automatizada mediante YAML pipelines de integración y entrega continua (CI/CD) con puertas de calidad (SonarQube/pruebas unitarias) y planes de pruebas estructurados en Test Plans.',
    entregables: [
      'Pipelines CI/CD automatizados para ambientes de Staging y Producción',
      'Estrategia de despliegue con aprobaciones manuales requeridas',
      'Suites de pruebas manuales y automatizadas en Azure Test Plans'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 7,
    prioridad: 'Media',
    actividad: 'Capacitación a líderes funcionales y técnicos',
    responsable: 'Proveedor',
    dependencias: [3],
    duracion: '1 sem',
    semanas: 'S4-S4',
    startWeek: 4,
    endWeek: 4,
    fechas: '2026-11-30 a 2026-12-04',
    startDate: '2026-11-30',
    endDate: '2026-12-04',
    estado: 'Pendiente',
    riesgoRequisito: 'R7 (12) · R4 (9) · RNF-04',
    riesgos: ['R7 (12)', 'R4 (9)'],
    requisitos: ['RNF-04'],
    descripcionDetallada: 'Talleres prácticos dirigidos a ingenieros de desarrollo, administradores de TI y líderes de dependencias usuarias sobre gestión ágil, flujos de trabajo y buenas prácticas DevOps.',
    entregables: [
      'Sesiones grabadas y material pedagógico entregado',
      'Listas de asistencia y evaluaciones de satisfacción > 85%',
      'Certificados de participación a líderes UTS'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 8,
    prioridad: 'Baja',
    actividad: 'Elaborar manual de usuario y guía del procedimiento',
    responsable: 'Líder de TI',
    dependencias: [3],
    duracion: '2 sem',
    semanas: 'S4-S5',
    startWeek: 4,
    endWeek: 5,
    fechas: '2026-11-30 a 2026-12-11',
    startDate: '2026-11-30',
    endDate: '2026-12-11',
    estado: 'Pendiente',
    riesgoRequisito: 'R12 (8)',
    riesgos: ['R12 (8)'],
    requisitos: [],
    descripcionDetallada: 'Redacción y estandarización del procedimiento institucional de desarrollo de software y gestión del ciclo de vida (ALM) en UTS, con guías paso a paso para el usuario final.',
    entregables: [
      'Manual de usuario de Azure Boards y Repos para UTS',
      'Guía técnica de mantenimiento y administración de Azure DevOps',
      'Procedimiento institucional de gestión de cambios publicado'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 9,
    prioridad: 'Baja',
    actividad: 'Piloto con usuarios y pruebas de usabilidad',
    responsable: 'Líder funcional',
    dependencias: [6, 7],
    duracion: '1 sem',
    semanas: 'S5-S5',
    startWeek: 5,
    endWeek: 5,
    fechas: '2026-12-07 a 2026-12-11',
    startDate: '2026-12-07',
    endDate: '2026-12-11',
    estado: 'Pendiente',
    riesgoRequisito: 'R4 (9) · RNF-04',
    riesgos: ['R4 (9)'],
    requisitos: ['RNF-04'],
    descripcionDetallada: 'Prueba piloto en entorno real con un grupo representativo de coordinadores de programa y desarrolladores para validar la fluidez de creación y seguimiento de requerimientos.',
    entregables: [
      'Encuestas SUS (System Usability Scale) con puntaje > 75',
      'Matriz de hallazgos de usabilidad y correcciones aplicadas',
      'Acta de visto bueno de la prueba piloto'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 10,
    prioridad: 'Media',
    actividad: 'Pruebas de seguridad y acceso por rol',
    responsable: 'Responsable de seguridad',
    dependencias: [6],
    duracion: '1 sem',
    semanas: 'S5-S5',
    startWeek: 5,
    endWeek: 5,
    fechas: '2026-12-07 a 2026-12-11',
    startDate: '2026-12-07',
    endDate: '2026-12-11',
    estado: 'Pendiente',
    riesgoRequisito: 'R6 (10) · RNF-01',
    riesgos: ['R6 (10)'],
    requisitos: ['RNF-01'],
    descripcionDetallada: 'Auditoría exhaustiva de seguridad, permisos de lectura/escritura en repositorios, políticas de protección de ramas y aislamiento de variables secretas en pipelines.',
    entregables: [
      'Informe de pentesting y análisis estático de seguridad (SAST)',
      'Verificación de acceso por rol sin privilegios residuales',
      'Aprobación formal del Oficial de Seguridad de la Información UTS'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 11,
    prioridad: 'Alta',
    actividad: 'Pruebas de carga y concurrencia',
    responsable: 'Líder técnico',
    dependencias: [5, 10],
    duracion: '1 sem',
    semanas: 'S6-S6',
    startWeek: 6,
    endWeek: 6,
    fechas: '2026-12-14 a 2026-12-18',
    startDate: '2026-12-14',
    endDate: '2026-12-18',
    estado: 'Pendiente',
    riesgoRequisito: 'R2 (20) · R10 (6) · RNF-03 · RNF-06',
    riesgos: ['R2 (20)', 'R10 (6)'],
    requisitos: ['RNF-03', 'RNF-06'],
    descripcionDetallada: 'Simulación de alta concurrencia de desarrolladores y llamadas API contra Academusoft y Atena, comprobando tiempos de respuesta (< 2 segundos) y estabilidad bajo pico de transacciones.',
    entregables: [
      'Reporte de pruebas de estrés (JMeter / k6 / Azure Load Testing)',
      'Curvas de latencia y tasas de error con carga máxima',
      'Certificación de rendimiento para Go-Live'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 12,
    prioridad: 'Alta',
    actividad: 'Despliegue en producción con aprobación documentada',
    responsable: 'Responsable técnico',
    dependencias: [8, 9, 10, 11],
    duracion: '1 sem',
    semanas: 'S7-S7',
    startWeek: 7,
    endWeek: 7,
    fechas: '2026-12-21 a 2026-12-24',
    startDate: '2026-12-21',
    endDate: '2026-12-24',
    estado: 'Pendiente',
    riesgoRequisito: 'R3 (20) · R8 (8) · RF-06',
    riesgos: ['R3 (20)', 'R8 (8)'],
    requisitos: ['RF-06'],
    descripcionDetallada: 'Ejecución del corte a producción (Go-Live el 24/12/2026). Traspaso oficial del ciclo de vida del software de UTS a Azure DevOps con visto bueno del Comité de Cambios (CAB).',
    entregables: [
      'Acta de despliegue a producción firmada',
      'Plataforma operando en régimen 100% oficial para desarrollo UTS',
      'Plan de contingencia y rollback validado'
    ],
    progresoPorcentaje: 0
  },
  {
    id: 13,
    prioridad: 'Media',
    actividad: 'Soporte post-implementación y monitoreo de disponibilidad',
    responsable: 'Líder de TI',
    dependencias: [12],
    duracion: '1 sem',
    semanas: 'S8-S8',
    startWeek: 8,
    endWeek: 8,
    fechas: '2026-12-28 a 2026-12-31',
    startDate: '2026-12-28',
    endDate: '2026-12-31',
    estado: 'Pendiente',
    riesgoRequisito: 'R9 (12) · RNF-02',
    riesgos: ['R9 (12)'],
    requisitos: ['RNF-02'],
    descripcionDetallada: 'Monitoreo de hiperatención (hypercare), resolución de incidencias tempranas post-despliegue y verificación de disponibilidad 99.9% para alcanzar el Hito de Aceptación Final en S8.',
    entregables: [
      'Dashboard de disponibilidad y SLA institucional',
      'Registro de incidentes atendidos en periodo de garantía',
      'Acta de Aceptación Definitiva del Proyecto en Semana 8'
    ],
    progresoPorcentaje: 0
  }
];

export const RISKS_CATALOG: RiskInfo[] = [
  {
    code: 'R1',
    severidad: 16,
    nombre: 'Desalineación de procesos ágiles y flujos de trabajo',
    descripcion: 'Riesgo de que la parametrización de Azure Boards no refleje con exactitud la realidad operativa de los requerimientos y mantenimientos de la UTS.',
    impacto: 'Alto',
    mitigacion: 'Definición conjunta con líderes técnicos y funcionales de estados y flujos antes de la parametrización.'
  },
  {
    code: 'R2',
    severidad: 20,
    nombre: 'Fallas o latencia en integración con sistemas legados (Academusoft/Atena)',
    descripcion: 'Dificultades técnicas en webhooks o interfaces con Academusoft y el sistema de gestión documental, generando bloqueos en pipelines o sincronización.',
    impacto: 'Crítico',
    mitigacion: 'Pruebas tempranas desde Semana 3 (2 semanas de duración) y validación de carga en Semana 6.'
  },
  {
    code: 'R3',
    severidad: 20,
    nombre: 'Errores en scripts de despliegue continuo (CI/CD) a producción',
    descripcion: 'Riesgo de fallos en el despliegue automático que puedan comprometer la estabilidad de los ambientes de producción o provocar tiempos de inactividad no programados.',
    impacto: 'Crítico',
    mitigacion: 'Aprobaciones manuales obligatorias de CAB, pruebas automáticas en Staging y plan de rollback formal.'
  },
  {
    code: 'R4',
    severidad: 9,
    nombre: 'Baja adopción o resistencia al cambio por parte de usuarios finales',
    descripcion: 'Resistencia del personal administrativo o docentes involucrados en gestión de software al cambiar su método de reporte tradicional.',
    impacto: 'Medio',
    mitigacion: 'Capacitaciones prácticas en S4 y prueba piloto controlada con usuarios en S5.'
  },
  {
    code: 'R5',
    severidad: 12,
    nombre: 'Demoras en cotización y aprobación presupuestal de licencias',
    descripcion: 'Retrasos en la contratación formal de suscripciones de Microsoft Azure DevOps que paralicen el inicio efectivo del proyecto.',
    impacto: 'Medio',
    mitigacion: 'Gestión prioritaria en Semana 1 directamente con la Dirección Institucional.'
  },
  {
    code: 'R6',
    severidad: 10,
    nombre: 'Vulnerabilidades en permisos y autenticación de usuarios',
    descripcion: 'Asignación incorrecta de privilegios en Azure DevOps o fallos en la integración con el Azure Active Directory institucional.',
    impacto: 'Medio',
    mitigacion: 'Auditoría y pruebas de seguridad dedicadas por rol en Semana 5 por el Responsable de Seguridad.'
  },
  {
    code: 'R7',
    severidad: 12,
    nombre: 'Falta de disponibilidad o experiencia deficiente del proveedor en capacitación',
    descripcion: 'Que el proveedor no adapte los contenidos pedagógicos a las necesidades específicas de la arquitectura tecnológica de UTS.',
    impacto: 'Medio',
    mitigacion: 'Revisión y aprobación previa del temario de capacitación con el Líder de TI.'
  },
  {
    code: 'R8',
    severidad: 8,
    nombre: 'Inconsistencia en la documentación y criterios de aceptación',
    descripcion: 'Falta de criterios unificados para considerar una entrega como lista para despliegue.',
    impacto: 'Bajo',
    mitigacion: 'Estandarización de checklists de Definition of Done (DoD) y planes de pruebas.'
  },
  {
    code: 'R9',
    severidad: 12,
    nombre: 'Incidencias críticas post Go-Live no atendidas oportunamente',
    descripcion: 'Acumulación de dudas o bugs tras el despliegue que afecten la operación regular del ciclo de vida de desarrollo.',
    impacto: 'Medio',
    mitigacion: 'Fase de soporte intensivo (hypercare) y monitoreo en Semana 8 hasta la firma del Hito de Aceptación.'
  },
  {
    code: 'R10',
    severidad: 6,
    nombre: 'Sobrecarga de servidores durante picos de sincronización',
    descripcion: 'Consumo excesivo de ancho de banda o CPU durante ejecuciones concurrentes de builds y pruebas.',
    impacto: 'Bajo',
    mitigacion: 'Configuración de agentes auto-hospedados (Self-hosted) o agentes en la nube con escalamiento elástico.'
  },
  {
    code: 'R11',
    severidad: 9,
    nombre: 'Pérdida de historial o ramas durante la migración de repositorios',
    descripcion: 'Inconvenientes técnicos al transferir repositorios existentes hacia Azure Repos.',
    impacto: 'Medio',
    mitigacion: 'Backups completos de repositorios previos y validación con hashes Git.'
  },
  {
    code: 'R12',
    severidad: 8,
    nombre: 'Manuales desactualizados o poco intuitivos',
    descripcion: 'Guías de usuario difíciles de consultar por los líderes y desarrolladores.',
    impacto: 'Bajo',
    mitigacion: 'Redacción de guías interactivas con capturas y videos breves en la wiki institucional.'
  }
];

export const REQUIREMENTS_CATALOG: RequirementInfo[] = [
  {
    code: 'RF-01',
    tipo: 'RF',
    nombre: 'Gestión centralizada de solicitudes de cambio',
    descripcion: 'El sistema debe permitir la creación, clasificación, priorización y asignación de requerimientos de software de las dependencias UTS.'
  },
  {
    code: 'RF-02',
    tipo: 'RF',
    nombre: 'Seguimiento visual de mantenimientos correctivos y evolutivos',
    descripcion: 'Tableros Kanban/Scrum interactivos para visualizar el estado del backlog y sprints de trabajo.'
  },
  {
    code: 'RF-03',
    tipo: 'RF',
    nombre: 'Trazabilidad completa requerimiento-código-despliegue',
    descripcion: 'Vinculación de cada commit, pull request y pipeline con la tarjeta de trabajo de Azure Boards.'
  },
  {
    code: 'RF-04',
    tipo: 'RF',
    nombre: 'Automatización de compilación y pruebas (CI)',
    descripcion: 'Ejecución automática de suites de pruebas unitarias y análisis de calidad al generar Pull Requests.'
  },
  {
    code: 'RF-05',
    tipo: 'RF',
    nombre: 'Reportes e indicadores gerenciales en tiempo real',
    descripcion: 'Dashboards integrados para Dirección y Líderes con métricas de velocidad, tiempos de resolución y burndown charts.'
  },
  {
    code: 'RF-06',
    tipo: 'RF',
    nombre: 'Control de despliegues y aprobaciones (CD)',
    descripcion: 'Flujo de liberación estructurado con compuertas de aprobación electrónica antes de pasar a producción.'
  },
  {
    code: 'RNF-01',
    tipo: 'RNF',
    nombre: 'Seguridad y autenticación unificada (Azure AD)',
    descripcion: 'Integración transparente con Microsoft Entra ID institucional y cumplimiento de políticas de doble factor (MFA).'
  },
  {
    code: 'RNF-02',
    tipo: 'RNF',
    nombre: 'Alta disponibilidad y resiliencia (99.9%)',
    descripcion: 'Disponibilidad garantizada mediante SLA de Azure DevOps Services y redundancia geográfica.'
  },
  {
    code: 'RNF-03',
    tipo: 'RNF',
    nombre: 'Interoperabilidad con sistemas legados (Academusoft / Atena)',
    descripcion: 'Soporte de comunicación REST API y webhooks con los sistemas académicos institucionales.'
  },
  {
    code: 'RNF-04',
    tipo: 'RNF',
    nombre: 'Usabilidad y adopción institucional',
    descripcion: 'Curva de aprendizaje optimizada y documentación en español orientada a los roles específicos de UTS.'
  },
  {
    code: 'RNF-05',
    tipo: 'RNF',
    nombre: 'Rendimiento en control de versiones Git',
    descripcion: 'Tiempos de clonado y subida inferiores a 30 segundos para repositorios de hasta 5GB.'
  },
  {
    code: 'RNF-06',
    tipo: 'RNF',
    nombre: 'Concurrencia y escalabilidad de pipelines',
    descripcion: 'Capacidad para soportar hasta 10 compilaciones y pruebas simultáneas sin degradación.'
  }
];

export const HOLIDAYS_COLOMBIA: Holiday[] = [
  { fecha: '2026-11-16', nombre: 'Día de Todos los Santos (trasladado)', impactoSemana: 'Semana 2 (inicia el martes 17-nov)' },
  { fecha: '2026-12-08', nombre: 'Día de la Inmaculada Concepción', impactoSemana: 'Semana 5 (martes no laborable)' },
  { fecha: '2026-12-25', nombre: 'Navidad', impactoSemana: 'Semana 7 (Go-Live programado el 24-dic antes de Navidad)' },
  { fecha: '2027-01-01', nombre: 'Año Nuevo', impactoSemana: 'Cierre del proyecto / Hito final en S8 (31-dic)' },
  { fecha: '2027-01-11', nombre: 'Día de los Reyes Magos', impactoSemana: 'Fase de operación continua' },
  { fecha: '2027-03-22', nombre: 'Día de San José', impactoSemana: 'Seguimiento trimestral Q1' },
  { fecha: '2027-03-25', nombre: 'Jueves Santo', impactoSemana: 'Semana Santa 2027' },
  { fecha: '2027-03-26', nombre: 'Viernes Santo', impactoSemana: 'Semana Santa 2027' }
];

export const TOOL_EVALUATIONS: ToolEvaluation[] = [
  {
    nombre: 'Azure DevOps',
    puntaje: 4.10,
    seleccionada: true,
    costoRelativo: 'Optimizado con convenio educativo Microsoft UTS',
    fortalezas: [
      'Integración nativa directa con Azure Active Directory (Office 365 institucional UTS)',
      'Suite completa unificada: Boards, Repos, Pipelines, Test Plans y Artifacts',
      'Excelente gobernanza empresarial, auditoría y trazabilidad integral',
      'Pipelines YAML robustos y compatibilidad con sistemas legados on-premise mediante agentes'
    ],
    desventajas: [
      'Curva de parametrización inicial en organizaciones complejas',
      'Costo adicional por usuarios de Test Plans si se requieren licencias completas'
    ]
  },
  {
    nombre: 'GitLab',
    puntaje: 3.90,
    seleccionada: false,
    costoRelativo: 'Medio-Alto (versión SaaS Premium o self-hosted)',
    fortalezas: [
      'Potente motor de CI/CD integrado en un solo repositorio',
      'Comunidad de código abierto activa y opciones auto-hospedadas',
      'Buena integración con Kubernetes y contenedores Docker'
    ],
    desventajas: [
      'Módulo de gestión de requerimientos (Issue Boards) menos avanzado que Azure Boards para metodologías híbridas',
      'Menor sinergia con el ecosistema Microsoft previamente contratado en la UTS'
    ]
  },
  {
    nombre: 'Jira + Confluence',
    puntaje: 3.50,
    seleccionada: false,
    costoRelativo: 'Alto (licenciamiento por usuario independiente)',
    fortalezas: [
      'Estándar tradicional de la industria en gestión de incidentes y tickets',
      'Ecosistema muy maduro de plugins en Atlassian Marketplace',
      'Documentación colaborativa excelente con Confluence'
    ],
    desventajas: [
      'Requiere herramientas externas adicionales para repositorios y CI/CD (Bitbucket o GitHub), encareciendo la solución',
      'Mayor complejidad de administración y fragmentación de la información técnica'
    ]
  }
];

export const WEEKS_METADATA = [
  { id: 1, label: 'S1', range: '09/11 - 13/11', focus: 'Kick-off & Licenciamiento' },
  { id: 2, label: 'S2', range: '17/11 - 20/11', focus: 'Azure DevOps & Azure AD (16-nov festivo)' },
  { id: 3, label: 'S3', range: '23/11 - 27/11', focus: 'Boards, Repos & Atena/Academusoft' },
  { id: 4, label: 'S4', range: '30/11 - 04/12', focus: 'CI/CD, Capacitación & Manuales' },
  { id: 5, label: 'S5', range: '07/12 - 11/12', focus: 'Piloto & Seguridad (08-dic festivo)' },
  { id: 6, label: 'S6', range: '14/12 - 18/12', focus: 'Pruebas de Carga & Concurrencia' },
  { id: 7, label: 'S7', range: '21/12 - 24/12', focus: '🚀 Despliegue Go-Live (24-dic)' },
  { id: 8, label: 'S8', range: '28/12 - 31/12', focus: '🏁 Hito de Aceptación & Soporte' }
];
