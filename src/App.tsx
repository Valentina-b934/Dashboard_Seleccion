import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from './types';
import { INITIAL_TASKS } from './data/initialData';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { GanttChart } from './components/GanttChart';
import { ActivityTable } from './components/ActivityTable';
import { ChartsSection } from './components/ChartsSection';
import { TaskDetailModal } from './components/TaskDetailModal';
import { EvaluationAndHolidaysModal } from './components/EvaluationAndHolidaysModal';
import { RisksView } from './components/RisksView';
import {
  Calendar,
  Rocket,
  Flag,
  Award,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

const STORAGE_KEY = 'uts_azure_devops_tasks_v1';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading saved tasks:', e);
    }
    return INITIAL_TASKS;
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState<boolean>(false);
  const [tableStatusFilter, setTableStatusFilter] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  }, [tasks]);

  // Update task status directly
  const handleUpdateStatus = (taskId: number, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, estado: newStatus } : t))
    );

    // If modal is open for this task, keep it updated
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, estado: newStatus } : null));
    }
  };

  // Reset to original data
  const handleReset = () => {
    if (
      window.confirm(
        '¿Deseas restablecer todas las actividades a su estado inicial programado?'
      )
    ) {
      setTasks(INITIAL_TASKS);
      localStorage.removeItem(STORAGE_KEY);
      if (selectedTask) {
        const resetItem = INITIAL_TASKS.find((t) => t.id === selectedTask.id);
        if (resetItem) setSelectedTask(resetItem);
      }
    }
  };

  // Export tasks as CSV
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Prioridad',
      'Actividad',
      'Responsable',
      'Dependencias',
      'Duracion',
      'Semanas',
      'Fechas',
      'Estado',
      'Riesgos_Requisitos'
    ];

    const rows = tasks.map((t) => [
      t.id,
      t.prioridad,
      `"${t.actividad.replace(/"/g, '""')}"`,
      `"${t.responsable.replace(/"/g, '""')}"`,
      `"dep:${t.dependencias.length > 0 ? t.dependencias.join(',') : '—'}"`,
      t.duracion,
      t.semanas,
      `"${t.fechas}"`,
      t.estado,
      `"${t.riesgoRequisito.replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cronograma_azure_devops_uts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter table by clicking on a KPI card
  const handleFilterStatusFromKPI = (status: string) => {
    setTableStatusFilter(status);
    setActiveTab('table');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Top Bar following contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        onExport={handleExportCSV}
        onOpenEvaluation={() => setIsEvaluationOpen(true)}
      />

      {/* Institutional Context Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  Unidades Tecnológicas de Santander (UTS)
                </span>
                <span>·</span>
                <span>Dirección de Tecnologías de la Información</span>
                <span>·</span>
                <span>Vigencia 2026</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Cronograma de Implementación · Azure DevOps Services
              </h1>
              <p className="text-xs text-slate-600 max-w-3xl">
                Planificación operativa oficial en 8 semanas (S1 a S8). Despliegue de herramientas ALM, integración con Academusoft y Atena, automatización de pipelines y adopción institucional.
              </p>
            </div>

            {/* Decision & Milestone Highlights */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsEvaluationOpen(true)}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-sky-200 bg-sky-50/70 hover:bg-sky-100/70 transition-colors text-left"
              >
                <Award className="w-5 h-5 text-sky-700 shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-sky-900">
                    Alternativa Seleccionada
                  </div>
                  <div className="text-xs font-semibold text-sky-700 font-mono">
                    Azure DevOps: 4,10/5
                  </div>
                  <div className="text-[10px] text-slate-500">
                    GitLab (3,90) · Jira (3,50)
                  </div>
                </div>
              </button>

              <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/60 text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900">
                  <Rocket className="w-4 h-4 text-amber-600" />
                  <span>Go-Live Producción</span>
                </div>
                <div className="text-xs font-semibold text-amber-800 font-mono">
                  24/12/2026 · S7
                </div>
                <div className="text-[10px] text-slate-500">
                  Hito Aceptación: S8 (31/12)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Cards (Always visible as strategic dashboard anchor) */}
        <KPICards tasks={tasks} onFilterStatus={handleFilterStatusFromKPI} />

        {/* Tab 1: Overview (KPIs + Gantt + Quick Summary of Activities & Load) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Interactive Gantt Chart */}
            <GanttChart
              tasks={tasks}
              onSelectTask={setSelectedTask}
              selectedTaskId={selectedTask?.id}
            />

            {/* 2-Column Split: Summary Table Preview + Workload Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <ActivityTable
                  tasks={tasks}
                  onUpdateStatus={handleUpdateStatus}
                  onSelectTask={setSelectedTask}
                  selectedTaskId={selectedTask?.id}
                  externalStatusFilter={tableStatusFilter}
                  onClearExternalFilter={() => setTableStatusFilter(null)}
                />
              </div>

              <div className="lg:col-span-5">
                <ChartsSection tasks={tasks} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Gantt View */}
        {activeTab === 'gantt' && (
          <div className="space-y-6">
            <GanttChart
              tasks={tasks}
              onSelectTask={setSelectedTask}
              selectedTaskId={selectedTask?.id}
            />

            {/* Additional Timeline Insights */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Estructura del Cronograma y Ruta Crítica
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                El cronograma de 8 semanas está articulado de forma secuencial y paralela para mitigar los riesgos de integración temprana (R2) y despliegue a producción (R3):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Fase 1: Preparación (S1-S2)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Licenciamiento oficial y configuración de roles federados con Azure Active Directory (Microsoft Entra ID).
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Fase 2: Construcción (S3-S4)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Boards, Repos, inicio de integración con Academusoft/Atena y pipelines CI/CD automatizados.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Fase 3: Validación (S5-S6)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Piloto con coordinadores, auditoría de seguridad y pruebas de carga/concurrencia de alta exigencia.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Fase 4: Go-Live & Cierre (S7-S8)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Despliegue a producción el 24/12/2026, hypercare de soporte y firma del hito de aceptación en S8.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Activity Table */}
        {activeTab === 'table' && (
          <ActivityTable
            tasks={tasks}
            onUpdateStatus={handleUpdateStatus}
            onSelectTask={setSelectedTask}
            selectedTaskId={selectedTask?.id}
            externalStatusFilter={tableStatusFilter}
            onClearExternalFilter={() => setTableStatusFilter(null)}
          />
        )}

        {/* Tab 4: Analytics & Charts */}
        {activeTab === 'charts' && <ChartsSection tasks={tasks} />}

        {/* Tab 5: Risks & Holidays */}
        {activeTab === 'risks' && (
          <RisksView tasks={tasks} onSelectTask={setSelectedTask} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <span>Proyecto de Implementación Tecnológica · </span>
            <span className="font-semibold text-slate-700">
              Unidades Tecnológicas de Santander (UTS)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Inicio: 09-nov-2026</span>
            <span>·</span>
            <span>Go-Live: 24-dic-2026</span>
            <span>·</span>
            <span>Aceptación: S8</span>
          </div>
        </div>
      </footer>

      {/* Modal: Activity Detail Panel */}
      <TaskDetailModal
        task={selectedTask}
        allTasks={tasks}
        onClose={() => setSelectedTask(null)}
        onUpdateStatus={handleUpdateStatus}
        onSelectAnotherTask={setSelectedTask}
      />

      {/* Modal: Evaluation & Holidays */}
      <EvaluationAndHolidaysModal
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
      />
    </div>
  );
}
