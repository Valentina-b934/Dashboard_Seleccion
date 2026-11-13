import React from 'react';
import { TOOL_EVALUATIONS, HOLIDAYS_COLOMBIA, RISKS_CATALOG, REQUIREMENTS_CATALOG } from '../data/initialData';
import {
  X,
  Award,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Flag,
  Rocket,
  Layers,
  Sparkles
} from 'lucide-react';

interface EvaluationAndHolidaysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EvaluationAndHolidaysModal: React.FC<EvaluationAndHolidaysModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-sky-600 flex items-center justify-center text-white">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Justificación Técnica de Selección y Calendario UTS
              </h3>
              <p className="text-xs text-slate-500">
                Ponderación de alternativas (4,10/5), hitos y festivos de Colombia omitidos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section 1: Comparison Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Evaluación Comparativa de Alternativas Tecnológicas</span>
              </h4>
              <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                Opción Ganadora: Azure DevOps (4,10 / 5,00)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TOOL_EVALUATIONS.map((tool) => (
                <div
                  key={tool.nombre}
                  className={`rounded-lg p-4 border transition-all ${
                    tool.seleccionada
                      ? 'bg-sky-50/40 border-sky-300 ring-2 ring-sky-500/20 shadow-xs'
                      : 'bg-white border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      {tool.nombre}
                    </h5>
                    <div
                      className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                        tool.seleccionada
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tool.puntaje.toFixed(2)} / 5,00
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 mb-3 italic">
                    {tool.costoRelativo}
                  </div>

                  {/* Fortalezas */}
                  <div className="space-y-1.5 text-xs text-slate-700 mb-3">
                    <span className="font-semibold text-slate-800 text-[11px] block">
                      Fortalezas Clave:
                    </span>
                    {tool.fortalezas.map((f, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Desventajas */}
                  <div className="space-y-1 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                    <span className="font-semibold text-slate-600 block">
                      Consideraciones:
                    </span>
                    {tool.desventajas.map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Milestones & Critical Dates */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Hitos Clave del Cronograma UTS</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded border border-slate-200">
                <div className="flex items-center gap-1.5 text-sky-700 font-bold text-xs mb-1">
                  <span>🚀 Inicio de Proyecto (S1)</span>
                </div>
                <div className="font-mono text-sm font-bold text-slate-900">
                  Lunes, 9 de noviembre de 2026
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Arranque formal, asignación de licencias y alineación de comités.
                </p>
              </div>

              <div className="p-3 bg-white rounded border border-amber-200">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs mb-1">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Go-Live Despliegue (S7)</span>
                </div>
                <div className="font-mono text-sm font-bold text-slate-900">
                  Jueves, 24 de diciembre de 2026
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Puesta en producción oficial aprobada antes de Navidad.
                </p>
              </div>

              <div className="p-3 bg-white rounded border border-sky-200">
                <div className="flex items-center gap-1.5 text-sky-700 font-bold text-xs mb-1">
                  <Flag className="w-3.5 h-3.5" />
                  <span>Hito de Aceptación (S8)</span>
                </div>
                <div className="font-mono text-sm font-bold text-slate-900">
                  Semana 8 (31 de diciembre de 2026)
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Verificación de disponibilidad 99.9%, cierre de hypercare y firma final.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Colombian Holidays Excluded */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Días Festivos de Colombia Omitidos en la Planificación</span>
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Para garantizar el cálculo exacto de días hábiles y evitar retrasos operativos, los siguientes días festivos oficiales han sido excluidos del cómputo de esfuerzo:
            </p>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2 px-3">Fecha Festiva</th>
                    <th className="py-2 px-3">Celebración / Ley Emiliani</th>
                    <th className="py-2 px-3">Impacto en el Cronograma UTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {HOLIDAYS_COLOMBIA.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                        {h.fecha}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{h.nombre}</td>
                      <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                        {h.impactoSemana}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors text-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
