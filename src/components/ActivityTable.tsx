import React, { useState, useMemo } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  CircleDashed,
  ExternalLink,
  ChevronDown,
  ArrowUpDown,
  X
} from 'lucide-react';

interface ActivityTableProps {
  tasks: Task[];
  onUpdateStatus: (taskId: number, newStatus: TaskStatus) => void;
  onSelectTask: (task: Task) => void;
  selectedTaskId?: number | null;
  externalStatusFilter?: string | null;
  onClearExternalFilter?: () => void;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  tasks,
  onUpdateStatus,
  onSelectTask,
  selectedTaskId,
  externalStatusFilter,
  onClearExternalFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('Todas');
  const [responsableFilter, setResponsableFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState(externalStatusFilter || 'Todos');
  const [sortBy, setSortBy] = useState<'id' | 'prioridad' | 'startWeek' | 'estado'>('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Synchronize when external filter is clicked from KPI card
  React.useEffect(() => {
    if (externalStatusFilter) {
      setStatusFilter(externalStatusFilter);
    }
  }, [externalStatusFilter]);

  // Unique list of responsables for dropdown
  const uniqueResponsables = useMemo(() => {
    const set = new Set(tasks.map((t) => t.responsable));
    return ['Todos', ...Array.from(set)];
  }, [tasks]);

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search term matching
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          const matchesText =
            task.actividad.toLowerCase().includes(term) ||
            task.responsable.toLowerCase().includes(term) ||
            task.riesgoRequisito.toLowerCase().includes(term) ||
            task.fechas.toLowerCase().includes(term) ||
            String(task.id) === term.trim();
          if (!matchesText) return false;
        }

        // Priority filter
        if (priorityFilter !== 'Todas' && task.prioridad !== priorityFilter) {
          return false;
        }

        // Responsable filter
        if (responsableFilter !== 'Todos' && task.responsable !== responsableFilter) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'Todos' && task.estado !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let valA: any = a[sortBy];
        let valB: any = b[sortBy];

        if (sortBy === 'prioridad') {
          const priorityWeights: Record<Priority, number> = { Alta: 3, Media: 2, Baja: 1 };
          valA = priorityWeights[a.prioridad];
          valB = priorityWeights[b.prioridad];
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [tasks, searchTerm, priorityFilter, responsableFilter, statusFilter, sortBy, sortAsc]);

  const handleSort = (field: 'id' | 'prioridad' | 'startWeek' | 'estado') => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  const getPriorityBadge = (prioridad: Priority) => {
    switch (prioridad) {
      case 'Alta':
        return (
          <span className="inline-flex items-center text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            Alta
          </span>
        );
      case 'Media':
        return (
          <span className="inline-flex items-center text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Media
          </span>
        );
      case 'Baja':
        return (
          <span className="inline-flex items-center text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            Baja
          </span>
        );
    }
  };

  const getStatusColor = (estado: TaskStatus) => {
    switch (estado) {
      case 'Completado':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 focus:ring-emerald-400';
      case 'En curso':
        return 'text-sky-700 bg-sky-50 border-sky-200 focus:ring-sky-400 font-medium';
      case 'Retrasado':
        return 'text-rose-700 bg-rose-50 border-rose-300 focus:ring-rose-400 font-semibold';
      case 'Pendiente':
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200 focus:ring-slate-400';
    }
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    priorityFilter !== 'Todas' ||
    responsableFilter !== 'Todos' ||
    statusFilter !== 'Todos';

  const clearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('Todas');
    setResponsableFilter('Todos');
    setStatusFilter('Todos');
    if (onClearExternalFilter) onClearExternalFilter();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
      {/* Table Toolbar & Filters */}
      <div className="p-4 border-b border-slate-200 space-y-3 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Matriz de Seguimiento de Actividades
            </h3>
            <p className="text-xs text-slate-500">
              Edita el desplegable de estado en cualquier fila para recalcular métricas y gráficos en vivo.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por actividad, riesgo o rol..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-800 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter selects row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-medium">Filtros:</span>
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1">
            <label className="text-slate-500 text-[11px]">Prioridad:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="py-1 px-2 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="Todas">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          {/* Responsable filter */}
          <div className="flex items-center gap-1">
            <label className="text-slate-500 text-[11px]">Responsable:</label>
            <select
              value={responsableFilter}
              onChange={(e) => setResponsableFilter(e.target.value)}
              className="py-1 px-2 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 max-w-[180px] truncate"
            >
              {uniqueResponsables.map((resp) => (
                <option key={resp} value={resp}>
                  {resp}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            <label className="text-slate-500 text-[11px]">Estado:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1 px-2 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="Todos">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En curso">En curso</option>
              <option value="Completado">Completado</option>
              <option value="Retrasado">Retrasado</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded transition-colors ml-auto"
            >
              <X className="w-3 h-3" />
              <span>Limpiar filtros</span>
            </button>
          )}

          <span className="text-[11px] text-slate-500 ml-auto">
            {filteredTasks.length} de {tasks.length} actividades
          </span>
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs divide-y divide-slate-200">
          <thead className="bg-slate-100/70 text-slate-700 font-semibold select-none">
            <tr>
              <th
                onClick={() => handleSort('id')}
                className="py-2.5 px-3 w-12 cursor-pointer hover:bg-slate-200/60"
              >
                <div className="flex items-center gap-1">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('prioridad')}
                className="py-2.5 px-3 w-20 cursor-pointer hover:bg-slate-200/60"
              >
                <div className="flex items-center gap-1">
                  <span>Prioridad</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 min-w-[240px]">Actividad</th>
              <th className="py-2.5 px-3 min-w-[140px]">Responsable</th>
              <th className="py-2.5 px-3 w-24">Dependencias</th>
              <th
                onClick={() => handleSort('startWeek')}
                className="py-2.5 px-3 w-28 cursor-pointer hover:bg-slate-200/60"
              >
                <div className="flex items-center gap-1">
                  <span>Semanas / Dur.</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 min-w-[160px]">Fechas Programadas</th>
              <th
                onClick={() => handleSort('estado')}
                className="py-2.5 px-3 w-36 cursor-pointer hover:bg-slate-200/60"
              >
                <div className="flex items-center gap-1">
                  <span>Estado (Editable)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 min-w-[170px]">Riesgos / Requisitos</th>
              <th className="py-2.5 px-3 w-16 text-center">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500">
                  No se encontraron actividades con los filtros seleccionados.
                  <button
                    onClick={clearFilters}
                    className="block mx-auto mt-2 text-xs font-semibold text-sky-600 hover:underline"
                  >
                    Restablecer filtros
                  </button>
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => {
                const isSelected = selectedTaskId === task.id;

                return (
                  <tr
                    key={task.id}
                    className={`transition-colors hover:bg-slate-50/80 ${
                      isSelected ? 'bg-sky-50/60' : ''
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-600">
                      #{task.id}
                    </td>

                    {/* Prioridad */}
                    <td className="py-3 px-3">{getPriorityBadge(task.prioridad)}</td>

                    {/* Actividad */}
                    <td className="py-3 px-3 font-medium text-slate-900">
                      <button
                        onClick={() => onSelectTask(task)}
                        className="text-left hover:text-sky-700 transition-colors cursor-pointer group flex items-start gap-1.5"
                      >
                        <span className="group-hover:underline">{task.actividad}</span>
                      </button>
                    </td>

                    {/* Responsable */}
                    <td className="py-3 px-3 text-slate-700">
                      <span className="truncate block" title={task.responsable}>
                        {task.responsable}
                      </span>
                    </td>

                    {/* Dependencias */}
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {task.dependencias.length === 0 ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          dep: {task.dependencias.join(', ')}
                        </span>
                      )}
                    </td>

                    {/* Duración y Semanas */}
                    <td className="py-3 px-3 text-slate-600">
                      <div className="font-mono font-medium text-slate-800">
                        {task.semanas}
                      </div>
                      <div className="text-[11px] text-slate-400">{task.duracion}</div>
                    </td>

                    {/* Fechas */}
                    <td className="py-3 px-3 text-[11px] text-slate-600 font-mono">
                      {task.fechas}
                    </td>

                    {/* Estado (Desplegable interactivo directo) */}
                    <td className="py-2.5 px-3">
                      <select
                        value={task.estado}
                        onChange={(e) =>
                          onUpdateStatus(task.id, e.target.value as TaskStatus)
                        }
                        className={`text-xs rounded-md py-1.5 px-2 border font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 ${getStatusColor(
                          task.estado
                        )}`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En curso">En curso</option>
                        <option value="Completado">Completado</option>
                        <option value="Retrasado">Retrasado</option>
                      </select>
                    </td>

                    {/* Riesgos / Requisitos */}
                    <td className="py-3 px-3 text-[11px] text-slate-600">
                      <div className="truncate max-w-[220px]" title={task.riesgoRequisito}>
                        {task.riesgoRequisito}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onSelectTask(task)}
                        className="p-1 rounded text-slate-400 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                        title="Ver detalle completo de la actividad"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div>
          <span>Tip: </span>
          <span className="text-slate-600">
            Puedes cambiar el estado de cualquier actividad para observar el recálculo inmediato de los KPIs y gráficos de carga.
          </span>
        </div>
      </div>
    </div>
  );
};
