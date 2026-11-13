import React, { useState } from 'react';
import { RISKS_CATALOG, REQUIREMENTS_CATALOG, HOLIDAYS_COLOMBIA } from '../data/initialData';
import { Task } from '../types';
import {
  ShieldAlert,
  FileCheck2,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';

interface RisksViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export const RisksView: React.FC<RisksViewProps> = ({ tasks, onSelectTask }) => {
  const [activeSubTab, setActiveSubTab] = useState<'riesgos' | 'requisitos' | 'festivos'>('riesgos');
  const [searchTerm, setSearchTerm] = useState('');
  const [impactFilter, setImpactFilter] = useState('Todos');

  // Filtered risks
  const filteredRisks = RISKS_CATALOG.filter((r) => {
    if (impactFilter !== 'Todos' && r.impacto !== impactFilter) return false;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      return (
        r.code.toLowerCase().includes(term) ||
        r.nombre.toLowerCase().includes(term) ||
        r.descripcion.toLowerCase().includes(term) ||
        r.mitigacion.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Subtab navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('riesgos')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            activeSubTab === 'riesgos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Matriz de Riesgos (R1 - R12)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('requisitos')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            activeSubTab === 'requisitos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Requisitos (RF / RNF)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('festivos')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            activeSubTab === 'festivos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Festivos Colombia Omitidos</span>
        </button>
      </div>

      {/* Subtab 1: Matriz de Riesgos */}
      {activeSubTab === 'riesgos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar riesgo por código o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-800 w-64 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <select
                value={impactFilter}
                onChange={(e) => setImpactFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-700"
              >
                <option value="Todos">Todos los impactos</option>
                <option value="Crítico">Crítico (Severidad 20)</option>
                <option value="Alto">Alto (Severidad 16)</option>
                <option value="Medio">Medio (Severidad 9-12)</option>
                <option value="Bajo">Bajo (Severidad 6-8)</option>
              </select>
            </div>
            <span className="text-xs text-slate-500">
              {filteredRisks.length} de {RISKS_CATALOG.length} riesgos catalogados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRisks.map((risk) => {
              // Find related tasks
              const relatedTasks = tasks.filter((t) =>
                t.riesgos.some((r) => r.startsWith(risk.code))
              );

              return (
                <div
                  key={risk.code}
                  className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                        {risk.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {risk.nombre}
                      </h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        risk.impacto === 'Crítico'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : risk.impacto === 'Alto'
                          ? 'bg-orange-100 text-orange-800 border border-orange-200'
                          : risk.impacto === 'Medio'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {risk.impacto} · Sev: {risk.severidad}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {risk.descripcion}
                  </p>

                  <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5 text-xs">
                    <span className="font-semibold text-slate-800 block mb-0.5">
                      Medida de Mitigación UTS:
                    </span>
                    <span className="text-slate-600">{risk.mitigacion}</span>
                  </div>

                  {/* Related tasks badges */}
                  {relatedTasks.length > 0 && (
                    <div className="pt-1 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400">Actividades vinculadas:</span>
                      {relatedTasks.map((rt) => (
                        <button
                          key={rt.id}
                          onClick={() => onSelectTask(rt)}
                          className="text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 px-1.5 py-0.5 rounded border border-sky-200 font-mono"
                          title={rt.actividad}
                        >
                          #{rt.id} {rt.actividad.slice(0, 18)}...
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Requisitos Funcionales y No Funcionales */}
      {activeSubTab === 'requisitos' && (
        <div className="space-y-6">
          {/* Functional Requirements */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span>Requisitos Funcionales (RF-01 a RF-06)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REQUIREMENTS_CATALOG.filter((r) => r.tipo === 'RF').map((req) => (
                <div
                  key={req.code}
                  className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs text-xs space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded">
                      {req.code}
                    </span>
                    <span className="font-bold text-slate-900">{req.nombre}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                    {req.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Functional Requirements */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>Requisitos No Funcionales (RNF-01 a RNF-06)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REQUIREMENTS_CATALOG.filter((r) => r.tipo === 'RNF').map((req) => (
                <div
                  key={req.code}
                  className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs text-xs space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                      {req.code}
                    </span>
                    <span className="font-bold text-slate-900">{req.nombre}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                    {req.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Festivos Colombia */}
      {activeSubTab === 'festivos' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Días Festivos de Colombia Omitidos (Ley Emiliani)</span>
            </h4>
            <p className="text-xs text-slate-500">
              Estos días han sido excluidos del cómputo de semanas y jornadas de trabajo en el cronograma UTS para prevenir desvíos en el Go-Live fijado para el 24 de diciembre de 2026.
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Fecha</th>
                  <th className="py-2.5 px-3">Festivo Oficial</th>
                  <th className="py-2.5 px-3">Impacto en Semanas del Proyecto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {HOLIDAYS_COLOMBIA.map((h, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {h.fecha}
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-medium">
                      {h.nombre}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {h.impactoSemana}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
