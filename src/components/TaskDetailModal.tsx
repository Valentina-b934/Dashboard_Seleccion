import React from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { RISKS_CATALOG, REQUIREMENTS_CATALOG } from '../data/initialData';
import {
  X,
  Calendar,
  User,
  GitBranch,
  ShieldAlert,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Layers
} from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  allTasks: Task[];
  onClose: () => void;
  onUpdateStatus: (taskId: number, newStatus: TaskStatus) => void;
  onSelectAnotherTask: (task: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  allTasks,
  onClose,
  onUpdateStatus,
  onSelectAnotherTask
}) => {
  if (!task) return null;

  // Resolve dependencies
  const predecessorTasks = allTasks.filter((t) => task.dependencias.includes(t.id));
  const successorsTasks = allTasks.filter((t) => t.dependencias.includes(task.id));

  // Resolve risks info
  const resolvedRisks = task.riesgos.map((riskCodeWithSev) => {
    // e.g. "R1 (16)" -> code "R1"
    const match = riskCodeWithSev.match(/R\d+/);
    const code = match ? match[0] : riskCodeWithSev;
    const found = RISKS_CATALOG.find((r) => r.code === code);
    return {
      raw: riskCodeWithSev,
      code,
      info: found
    };
  });

  // Resolve requirements info
  const resolvedRequirements = task.requisitos.map((reqCode) => {
    const found = REQUIREMENTS_CATALOG.find((r) => r.code === reqCode);
    return {
      code: reqCode,
      info: found
    };
  });

  // Next / Previous navigation
  const currentIndex = allTasks.findIndex((t) => t.id === task.id);
  const prevTask = currentIndex > 0 ? allTasks[currentIndex - 1] : null;
  const nextTask = currentIndex < allTasks.length - 1 ? allTasks[currentIndex + 1] : null;

  const getPriorityBadge = (prioridad: Priority) => {
    switch (prioridad) {
      case 'Alta':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'Media':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Baja':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                Actividad #{task.id}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded border ${getPriorityBadge(
                  task.prioridad
                )}`}
              >
                Prioridad {task.prioridad}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {task.semanas} ({task.duracion})
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {task.actividad}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Status & Key Meta Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            {/* Estado Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Estado Actual
              </label>
              <select
                value={task.estado}
                onChange={(e) => onUpdateStatus(task.id, e.target.value as TaskStatus)}
                className="w-full text-xs font-semibold py-1.5 px-2 rounded border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En curso">En curso</option>
                <option value="Completado">Completado</option>
                <option value="Retrasado">Retrasado</option>
              </select>
            </div>

            {/* Responsable */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Responsable
              </label>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800 pt-1">
                <User className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="truncate">{task.responsable}</span>
              </div>
            </div>

            {/* Fechas */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Fechas Programadas
              </label>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 pt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{task.fechas}</span>
              </div>
            </div>
          </div>

          {/* Detailed description */}
          {task.descripcionDetallada && (
            <div>
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                Descripción del Alcance
              </h4>
              <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                {task.descripcionDetallada}
              </p>
            </div>
          )}

          {/* Dependencies breakdown */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <GitBranch className="w-4 h-4 text-sky-600" />
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                Flujo de Dependencias
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Predecessors */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                  Predecesoras Necesarias ({predecessorTasks.length}):
                </span>
                {predecessorTasks.length === 0 ? (
                  <p className="text-slate-400 italic text-xs">
                    Sin dependencias (Actividad de inicio directo).
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {predecessorTasks.map((pred) => (
                      <div
                        key={pred.id}
                        onClick={() => onSelectAnotherTask(pred)}
                        className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 hover:border-sky-300 cursor-pointer text-xs transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono font-bold text-slate-500">
                            #{pred.id}
                          </span>
                          <span className="truncate text-slate-800">{pred.actividad}</span>
                        </div>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-medium shrink-0 ${
                            pred.estado === 'Completado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {pred.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Successors */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                  Actividades que dependen de esta ({successorsTasks.length}):
                </span>
                {successorsTasks.length === 0 ? (
                  <p className="text-slate-400 italic text-xs">
                    Última fase de la cadena o actividad terminal.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {successorsTasks.map((succ) => (
                      <div
                        key={succ.id}
                        onClick={() => onSelectAnotherTask(succ)}
                        className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 hover:border-sky-300 cursor-pointer text-xs transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono font-bold text-slate-500">
                            #{succ.id}
                          </span>
                          <span className="truncate text-slate-800">{succ.actividad}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Risks & Mitigation section */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                Gestión de Riesgos Asociados ({task.riesgos.length})
              </h4>
            </div>

            {resolvedRisks.length === 0 ? (
              <p className="text-slate-400 text-xs">Sin riesgos críticos catalogados.</p>
            ) : (
              <div className="space-y-2">
                {resolvedRisks.map(({ raw, code, info }) => (
                  <div
                    key={raw}
                    className="p-3 rounded-lg border border-amber-200/80 bg-amber-50/40 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                          {raw}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {info ? info.nombre : 'Riesgo del proyecto'}
                        </span>
                      </div>
                      {info && (
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            info.impacto === 'Crítico'
                              ? 'bg-rose-100 text-rose-800'
                              : info.impacto === 'Alto'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          Impacto: {info.impacto} (Severidad: {info.severidad})
                        </span>
                      )}
                    </div>
                    {info && (
                      <>
                        <p className="text-slate-600 text-xs">{info.descripcion}</p>
                        <p className="text-slate-700 text-[11px] pt-1">
                          <strong className="text-amber-900">Mitigación UTS:</strong>{' '}
                          {info.mitigacion}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Requirements (RF & RNF) */}
          {resolvedRequirements.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <FileCheck2 className="w-4 h-4 text-sky-600" />
                <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                  Requisitos de Ingeniería Cumplidos ({resolvedRequirements.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {resolvedRequirements.map(({ code, info }) => (
                  <div
                    key={code}
                    className="p-2.5 rounded border border-slate-200 bg-white text-xs"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                          code.startsWith('RF')
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {code}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {info ? info.nombre : code}
                      </span>
                    </div>
                    {info && <p className="text-slate-600 text-[11px]">{info.descripcion}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          {task.entregables && task.entregables.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-2">
                Entregables Formales Verificables
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {task.entregables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer with Previous / Next navigation */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {prevTask && (
              <button
                onClick={() => onSelectAnotherTask(prevTask)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">#{prevTask.id}</span> Anterior
              </button>
            )}
            {nextTask && (
              <button
                onClick={() => onSelectAnotherTask(nextTask)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              >
                Siguiente <span className="hidden sm:inline">#{nextTask.id}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
};
