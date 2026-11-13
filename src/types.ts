export type Priority = 'Alta' | 'Media' | 'Baja';

export type TaskStatus = 'Pendiente' | 'En curso' | 'Completado' | 'Retrasado';

export interface Task {
  id: number;
  prioridad: Priority;
  actividad: string;
  responsable: string;
  dependencias: number[]; // array of task IDs
  duracion: string; // e.g. "1 sem" or "2 sem"
  semanas: string; // e.g. "S1-S1", "S3-S4"
  startWeek: number; // 1 to 8
  endWeek: number; // 1 to 8
  fechas: string; // e.g. "2026-11-09 a 2026-11-13"
  startDate: string;
  endDate: string;
  estado: TaskStatus;
  riesgoRequisito: string; // raw string e.g. "R1 (16) · RF-01 · RF-02..."
  riesgos: string[]; // parsed codes e.g. ["R1 (16)"]
  requisitos: string[]; // parsed codes e.g. ["RF-01", "RF-02"]
  descripcionDetallada?: string;
  entregables?: string[];
  progresoPorcentaje?: number;
}

export interface RiskInfo {
  code: string;
  severidad: number;
  nombre: string;
  descripcion: string;
  impacto: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
  mitigacion: string;
}

export interface RequirementInfo {
  code: string;
  tipo: 'RF' | 'RNF';
  nombre: string;
  descripcion: string;
}

export interface Holiday {
  fecha: string;
  nombre: string;
  impactoSemana: string;
}

export interface ToolEvaluation {
  nombre: string;
  puntaje: number;
  seleccionada: boolean;
  fortalezas: string[];
  desventajas: string[];
  costoRelativo: string;
}
