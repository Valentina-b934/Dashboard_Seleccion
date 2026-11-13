import React from 'react';
import {
  ListChecks,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CalendarDays,
  Rocket
} from 'lucide-react';
import { Task } from '../types';

interface KPICardsProps {
  tasks: Task[];
  onFilterStatus?: (status: string) => void;
}

export const KPICards: React.FC<KPICardsProps> = ({ tasks, onFilterStatus }) => {
  const total = tasks.length;
  const completadas = tasks.filter((t) => t.estado === 'Completado').length;
  const enCurso = tasks.filter((t) => t.estado === 'En curso').length;
  const retrasadas = tasks.filter((t) => t.estado === 'Retrasado').length;
  const pendientes = tasks.filter((t) => t.estado === 'Pendiente').length;

  const pctCompletado = total > 0 ? Math.round((completadas / total) * 100) : 0;

  // Calculation for Days to Go-Live (2026-12-24)
  const goLiveDate = new Date('2026-12-24T23:59:59');
  const projectStartDate = new Date('2026-11-09T00:00:00');
  
  // Using current simulation date or real system date
  const now = new Date();
  // Difference in calendar days to 24/12/2026
  const diffTime = goLiveDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Total span from start to Go-Live
  const totalDaysToProjectGoLive = Math.round((goLiveDate.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Total Actividades */}
      <div
        onClick={() => onFilterStatus && onFilterStatus('Todos')}
        className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-slate-300 transition-colors cursor-pointer group"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Total Actividades</span>
          <ListChecks className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {total}
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
          <span>{pendientes} pendientes</span>
        </div>
      </div>

      {/* 2. % Completado */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">% Completado</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {pctCompletado}%
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${pctCompletado}%` }}
          />
        </div>
      </div>

      {/* 3. En Curso */}
      <div
        onClick={() => onFilterStatus && onFilterStatus('En curso')}
        className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-blue-300 transition-colors cursor-pointer group"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">En Curso</span>
          <Clock className="w-4 h-4 text-sky-500 group-hover:text-sky-600 transition-colors" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-sky-700 tabular-nums">
          {enCurso}
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          <span>{enCurso === 1 ? '1 activa ahora' : `${enCurso} activas ahora`}</span>
        </div>
      </div>

      {/* 4. Retrasadas */}
      <div
        onClick={() => onFilterStatus && onFilterStatus('Retrasado')}
        className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-rose-300 transition-colors cursor-pointer group"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Retrasadas</span>
          <AlertTriangle
            className={`w-4 h-4 ${
              retrasadas > 0 ? 'text-rose-500' : 'text-slate-300'
            }`}
          />
        </div>
        <div
          className={`text-2xl font-bold tracking-tight tabular-nums ${
            retrasadas > 0 ? 'text-rose-600' : 'text-slate-900'
          }`}
        >
          {retrasadas}
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          <span>{retrasadas > 0 ? 'Requieren atención' : 'Sin demoras'}</span>
        </div>
      </div>

      {/* 5. Semanas Totales */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Semanas Totales</span>
          <CalendarDays className="w-4 h-4 text-slate-400" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          8 <span className="text-xs font-normal text-slate-500">sem</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1 truncate">
          <span>S1 a S8 (Hito final)</span>
        </div>
      </div>

      {/* 6. Días al Go-Live */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Días al Go-Live</span>
          <Rocket className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {diffDays > 0 ? (
            <>
              {diffDays} <span className="text-xs font-normal text-slate-500">días</span>
            </>
          ) : diffDays === 0 ? (
            <span className="text-emerald-600 text-lg">¡Hoy!</span>
          ) : (
            <span className="text-xs font-medium text-emerald-600">Completado</span>
          )}
        </div>
        <div className="text-[11px] text-slate-500 mt-1 truncate" title="Meta: 24/12/2026 (Semana 7)">
          <span>24/12/2026 · S7</span>
        </div>
      </div>
    </div>
  );
};
