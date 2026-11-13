import React, { useMemo } from 'react';
import { Task, Priority, TaskStatus } from '../types';
import { WEEKS_METADATA } from '../data/initialData';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Layers,
  TrendingUp
} from 'lucide-react';

interface ChartsSectionProps {
  tasks: Task[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ tasks }) => {
  // 1. Actividades por Responsable
  const responsableData = useMemo(() => {
    const counts: Record<string, { total: number; completadas: number }> = {};

    tasks.forEach((t) => {
      if (!counts[t.responsable]) {
        counts[t.responsable] = { total: 0, completadas: 0 };
      }
      counts[t.responsable].total += 1;
      if (t.estado === 'Completado') {
        counts[t.responsable].completadas += 1;
      }
    });

    return Object.entries(counts)
      .map(([responsable, data]) => ({
        responsable,
        total: data.total,
        completadas: data.completadas,
        pendientes: data.total - data.completadas
      }))
      .sort((a, b) => b.total - a.total);
  }, [tasks]);

  // 2. Actividades por Prioridad
  const priorityData = useMemo(() => {
    const counts: Record<Priority, number> = { Alta: 0, Media: 0, Baja: 0 };
    tasks.forEach((t) => {
      counts[t.prioridad] = (counts[t.prioridad] || 0) + 1;
    });

    return [
      { name: 'Alta', value: counts.Alta, color: '#ef4444' },
      { name: 'Media', value: counts.Media, color: '#f59e0b' },
      { name: 'Baja', value: counts.Baja, color: '#10b981' }
    ];
  }, [tasks]);

  // 3. Actividades por Estado
  const statusData = useMemo(() => {
    const counts: Record<TaskStatus, number> = {
      Pendiente: 0,
      'En curso': 0,
      Completado: 0,
      Retrasado: 0
    };

    tasks.forEach((t) => {
      counts[t.estado] = (counts[t.estado] || 0) + 1;
    });

    return [
      { name: 'Completado', value: counts['Completado'], color: '#10b981' },
      { name: 'En curso', value: counts['En curso'], color: '#0284c7' },
      { name: 'Pendiente', value: counts['Pendiente'], color: '#94a3b8' },
      { name: 'Retrasado', value: counts['Retrasado'], color: '#ef4444' }
    ].filter((item) => item.value > 0);
  }, [tasks]);

  // 4. Carga de actividades por semana (S1 a S8)
  const workloadByWeekData = useMemo(() => {
    return WEEKS_METADATA.map((w) => {
      const activeInWeek = tasks.filter(
        (t) => w.id >= t.startWeek && w.id <= t.endWeek
      );

      const alta = activeInWeek.filter((t) => t.prioridad === 'Alta').length;
      const media = activeInWeek.filter((t) => t.prioridad === 'Media').length;
      const baja = activeInWeek.filter((t) => t.prioridad === 'Baja').length;

      return {
        semana: w.label,
        nombre: `${w.label} (${w.range})`,
        total: activeInWeek.length,
        Alta: alta,
        Media: media,
        Baja: baja,
        hito: w.id === 7 ? 'Go-Live' : w.id === 8 ? 'Aceptación' : undefined
      };
    });
  }, [tasks]);

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded shadow-lg text-xs space-y-1">
          <p className="font-semibold text-slate-200">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color || '#fff' }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top row: 2 charts (Carga Semanal + Responsable) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Carga de Actividades por Semana (S1-S8) */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-sky-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Carga de Actividades por Semana (S1 - S8)
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Volumen de tareas concurrentes por semana, desglosado por prioridad.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Pico en S4 (4 tareas)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workloadByWeekData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="semana" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  iconSize={10}
                />
                <Bar
                  dataKey="Alta"
                  stackId="a"
                  fill="#ef4444"
                  name="Alta Prioridad"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="Media"
                  stackId="a"
                  fill="#f59e0b"
                  name="Media Prioridad"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="Baja"
                  stackId="a"
                  fill="#10b981"
                  name="Baja Prioridad"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Actividades por Responsable */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Actividades por Responsable
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribución del esfuerzo de los roles del proyecto UTS.
              </p>
            </div>
            <span className="text-[11px] text-slate-500">
              {responsableData.length} roles asignados
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responsableData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 45, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis
                  type="category"
                  dataKey="responsable"
                  tick={{ fontSize: 10, fill: '#334155' }}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="total"
                  fill="#0284c7"
                  name="Total Actividades"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row: 2 charts (Por Prioridad + Por Estado) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 3: Actividades por Prioridad */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Actividades por Prioridad
              </h4>
              <p className="text-xs text-slate-500">
                Distribución de impacto y criticidad técnica.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2.5 text-xs">
              {priorityData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 tabular-nums">
                      {item.value} tareas
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({Math.round((item.value / tasks.length) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 4: Actividades por Estado */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Estado Actual del Proyecto
              </h4>
              <p className="text-xs text-slate-500">
                Proporción de actividades según avance operativo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`status-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs">
              {statusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 tabular-nums">
                      {item.value}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({Math.round((item.value / tasks.length) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
