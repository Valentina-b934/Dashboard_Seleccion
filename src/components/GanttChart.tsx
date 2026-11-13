import React, { useState } from 'react';
import { Task, Priority } from '../types';
import { WEEKS_METADATA } from '../data/initialData';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Flag,
  Rocket,
  Info,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface GanttChartProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  selectedTaskId?: number | null;
}

export const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  onSelectTask,
  selectedTaskId
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('Todas');
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);

  // Filter tasks based on priority selection
  const filteredTasks = tasks.filter((task) => {
    if (filterPriority === 'Todas') return true;
    return task.prioridad === filterPriority;
  });

  // Priority color mapping according to specs:
  // Alta = rojo, Media = ámbar, Baja = verde
  const getPriorityBarClass = (prioridad: Priority) => {
    switch (prioridad) {
      case 'Alta':
        return 'bg-red-500 hover:bg-red-600 text-white border-red-600';
      case 'Media':
        return 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600';
      case 'Baja':
        return 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getPriorityBadgeClass = (prioridad: Priority) => {
    switch (prioridad) {
      case 'Alta':
        return 'text-red-700 bg-red-50 border border-red-200';
      case 'Media':
        return 'text-amber-800 bg-amber-50 border border-amber-200';
      case 'Baja':
        return 'text-emerald-800 bg-emerald-50 border border-emerald-200';
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'Completado':
        return <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />;
      case 'En curso':
        return <Clock className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />;
      case 'Retrasado':
        return <AlertCircle className="w-3.5 h-3.5 text-white shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
      {/* Header controls & legend */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              Cronograma de Implementación (Gantt Semanal S1 - S8)
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline">
              · 9 nov 2026 a 31 dic 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Haz clic en cualquier barra o fila para ver dependencias, riesgos y requisitos detallados.
          </p>
        </div>

        {/* Legend and filter */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Priority Legend */}
          <div className="flex items-center gap-3 bg-white px-2.5 py-1.5 rounded-md border border-slate-200">
            <span className="text-slate-500 font-medium">Prioridad:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-red-500"></span>
              <span className="text-slate-700">Alta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
              <span className="text-slate-700">Media</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
              <span className="text-slate-700">Baja</span>
            </div>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-md border border-slate-200">
            {['Todas', 'Alta', 'Media', 'Baja'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  filterPriority === p
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Gantt Timeline Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[980px]">
          {/* Timeline Header (Weeks S1 to S8 + Milestones) */}
          <div className="grid grid-cols-12 bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-700">
            {/* Left label column */}
            <div className="col-span-4 p-3 border-r border-slate-200 flex items-center justify-between">
              <span>Actividad y Responsable</span>
              <span className="text-[11px] font-normal text-slate-500">Duración</span>
            </div>

            {/* 8 Week columns (each spans 1 of remaining 8 parts => total 8 cols out of 12) */}
            <div className="col-span-8 grid grid-cols-8 relative">
              {WEEKS_METADATA.map((week) => (
                <div
                  key={week.id}
                  className={`p-2 border-r border-slate-200 text-center relative ${
                    week.id === 7
                      ? 'bg-amber-50/60'
                      : week.id === 8
                      ? 'bg-sky-50/60'
                      : ''
                  }`}
                >
                  <div className="font-bold text-slate-900 flex items-center justify-center gap-1">
                    <span>{week.label}</span>
                    {week.id === 7 && <Rocket className="w-3 h-3 text-amber-600 inline" />}
                    {week.id === 8 && <Flag className="w-3 h-3 text-sky-600 inline" />}
                  </div>
                  <div className="text-[10px] text-slate-500 font-normal truncate">
                    {week.range}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones indicator banner */}
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-[11px] py-1">
            <div className="col-span-4 px-3 text-slate-500 italic">
              Festivos Colombia omitidos: 16-nov, 8-dic, 25-dic
            </div>
            <div className="col-span-8 grid grid-cols-8 relative">
              <div className="col-start-7 col-span-1 px-1">
                <div className="bg-amber-100 text-amber-900 border border-amber-300 rounded px-1.5 py-0.5 text-[10px] font-bold text-center truncate shadow-xs">
                  🚀 Go-Live 24/12
                </div>
              </div>
              <div className="col-start-8 col-span-1 px-1">
                <div className="bg-sky-100 text-sky-900 border border-sky-300 rounded px-1.5 py-0.5 text-[10px] font-bold text-center truncate shadow-xs">
                  🏁 Hito Aceptación
                </div>
              </div>
            </div>
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => {
              const isSelected = selectedTaskId === task.id;
              const isHighlighted = highlightedTaskId === task.id;

              // Calculate Gantt bar column position (1-indexed relative to the 8 week grid)
              const startCol = task.startWeek;
              const spanCols = task.endWeek - task.startWeek + 1;

              return (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  onMouseEnter={() => setHighlightedTaskId(task.id)}
                  onMouseLeave={() => setHighlightedTaskId(null)}
                  className={`grid grid-cols-12 text-xs transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-sky-50/70 border-l-2 border-l-sky-600'
                      : isHighlighted
                      ? 'bg-slate-50'
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* Task details column */}
                  <div className="col-span-4 p-2.5 border-r border-slate-200 flex items-center justify-between gap-2 overflow-hidden">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-700 w-5 shrink-0 text-right">
                          {task.id}.
                        </span>
                        <span
                          className={`font-semibold truncate ${
                            isSelected ? 'text-sky-900' : 'text-slate-900'
                          }`}
                          title={task.actividad}
                        >
                          {task.actividad}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 ml-6">
                        <span className="truncate">{task.responsable}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-400">{task.semanas}</span>
                        {task.dependencias.length > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-slate-400">
                              dep: {task.dependencias.join(',')}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="font-mono text-[11px] text-slate-500 block">
                        {task.duracion}
                      </span>
                    </div>
                  </div>

                  {/* 8-Week timeline cells */}
                  <div className="col-span-8 grid grid-cols-8 relative py-2 px-1 items-center">
                    {/* Vertical guidelines for weeks */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
                      <div
                        key={w}
                        className={`absolute top-0 bottom-0 border-r ${
                          w === 7
                            ? 'border-amber-200/80'
                            : w === 8
                            ? 'border-sky-200/80'
                            : 'border-slate-100'
                        }`}
                        style={{ left: `${(w / 8) * 100}%` }}
                      />
                    ))}

                    {/* Go-Live vertical marker line in Week 7 */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400/70 z-0 pointer-events-none"
                      style={{ left: `${(7 / 8) * 100}%` }}
                      title="Límite Go-Live: 24 de diciembre de 2026"
                    />

                    {/* Gantt Bar element */}
                    <div
                      className="relative z-10 h-7 flex items-center"
                      style={{
                        gridColumnStart: startCol,
                        gridColumnEnd: `span ${spanCols}`
                      }}
                    >
                      <div
                        className={`w-full h-6 rounded px-2 flex items-center justify-between text-[11px] font-medium shadow-xs border transition-transform duration-150 ${getPriorityBarClass(
                          task.prioridad
                        )} ${isHighlighted ? 'scale-[1.02]' : ''}`}
                        title={`${task.actividad}\nFechas: ${task.fechas}\nEstado: ${task.estado}\nResponsable: ${task.responsable}`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {getStatusIcon(task.estado)}
                          <span className="truncate">{task.actividad}</span>
                        </div>
                        <span className="text-[10px] opacity-90 font-mono shrink-0 ml-1">
                          {task.estado === 'Completado'
                            ? 'Listo'
                            : task.estado === 'En curso'
                            ? 'En curso'
                            : task.estado === 'Retrasado'
                            ? 'Demora'
                            : task.duracion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer summary bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-800">
            <Rocket className="w-3.5 h-3.5 text-amber-600" />
            <strong>Go-Live:</strong> Semana 7 (24/12/2026 - Fin de despliegue)
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 text-sky-800">
            <Flag className="w-3.5 h-3.5 text-sky-600" />
            <strong>Hito de Aceptación:</strong> Semana 8 (31/12/2026)
          </span>
        </div>
        <div className="text-slate-400">
          Mostrando {filteredTasks.length} de {tasks.length} actividades
        </div>
      </div>
    </div>
  );
};
