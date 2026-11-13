import React from 'react';
import { Calendar, Download, RotateCcw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onReset: () => void;
  onExport: () => void;
  onOpenEvaluation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  onExport,
  onOpenEvaluation
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded bg-sky-600 flex items-center justify-center text-white font-bold text-sm">
              UTS
            </div>
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('overview');
              }}
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors"
            >
              Cronograma Azure DevOps UTS
            </a>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'overview'
                  ? 'border-sky-600 text-sky-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Vista General
            </button>
            <button
              onClick={() => setActiveTab('gantt')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'gantt'
                  ? 'border-sky-600 text-sky-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Diagrama de Gantt
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'table'
                  ? 'border-sky-600 text-sky-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Matriz de Actividades
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'charts'
                  ? 'border-sky-600 text-sky-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Analítica y Carga
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'risks'
                  ? 'border-sky-600 text-sky-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Riesgos y Festivos
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenEvaluation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-md hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0"
              title="Ver justificación técnica y puntaje frente a GitLab y Jira"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Eval. Alternativas (4,10/5)</span>
            </button>

            <button
              onClick={onExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              title="Exportar actividades en CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden lg:inline">Exportar CSV</span>
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-transparent rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Restablecer estados originales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reiniciar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden border-t border-slate-200 px-4 py-2 flex items-center justify-between overflow-x-auto gap-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('gantt')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'gantt' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Gantt
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'table' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Actividades
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'charts' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setActiveTab('risks')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'risks' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Riesgos
        </button>
        <button
          onClick={onOpenEvaluation}
          className="px-2.5 py-1 rounded whitespace-nowrap bg-sky-50 text-sky-700 border border-sky-200"
        >
          4.10/5
        </button>
      </div>
    </header>
  );
};
