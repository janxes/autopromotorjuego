import React from 'react';
import { HouseStage } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Home, CheckCircle2 } from 'lucide-react';

interface HouseVisualizerProps {
  stage: HouseStage;
  previousStage?: HouseStage;
  className?: string;
}

const STAGE_DESCRIPTIONS: Record<HouseStage, { title: string; subtitle: string; icon: string }> = {
  1: {
    title: 'Fase 1: La Parcela',
    subtitle: 'Orientación al sol de invierno y estudio del terreno',
    icon: '📍',
  },
  2: {
    title: 'Fase 2: Maqueta 3D Milimétrica',
    subtitle: 'Como un puzle: cada tubo y cable resuelto antes de cortar madera',
    icon: '📐',
  },
  3: {
    title: 'Fase 3: Montaje en Seco con Grúa',
    subtitle: 'Madera de taller ensamblada en días, protegida de la lluvia',
    icon: '🪵',
  },
  4: {
    title: 'Fase 4: Abrigo Térmico y Ventanas de 3 Capas',
    subtitle: 'Sellado hermético continuo: ni una corriente de aire frío',
    icon: '🛡️',
  },
  5: {
    title: 'Fase 5: Mudanza y Casa Terminada',
    subtitle: 'Confort constante a 21°C, aire limpio filtrado y facturas mínimas',
    icon: '🏡',
  },
};

export const HouseVisualizer: React.FC<HouseVisualizerProps> = ({
  stage,
  className = '',
}) => {
  const currentInfo = STAGE_DESCRIPTIONS[stage];

  return (
    <div
      className={`relative bg-gradient-to-b from-sky-50 via-amber-50/30 to-emerald-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-2xs ${className}`}
    >
      {/* Compact Top Info Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="text-base" role="img" aria-label="icono de fase">
            {currentInfo.icon}
          </span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              {currentInfo.title}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              — {currentInfo.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px] font-bold text-emerald-800">
          <span>Hito {stage} de 5</span>
        </div>
      </div>

      {/* Compact Panorama SVG of the Parcel / House */}
      <div className="w-full h-28 sm:h-36 relative flex items-center justify-center px-2 overflow-hidden bg-gradient-to-b from-sky-100/50 to-emerald-50/30">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-full object-contain"
          aria-label={`Ilustración compacta de la vivienda en fase ${stage}`}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stage === 5 ? '#fef3c7' : '#e0f2fe'} />
              <stop offset="100%" stopColor={stage === 5 ? '#fed7aa' : '#f8fafc'} />
            </linearGradient>
            <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="timberWall" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="cltWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Sun */}
          <circle
            cx="480"
            cy={stage === 5 ? '65' : '45'}
            r="24"
            fill={stage === 5 ? '#f97316' : '#facc15'}
            opacity="0.85"
          />

          {/* Mountains backdrop */}
          <polygon points="50,180 160,100 270,180" fill="#cbd5e1" opacity="0.5" />
          <polygon points="190,180 320,80 450,180" fill="#94a3b8" opacity="0.4" />
          <polygon points="370,180 480,110 570,180" fill="#cbd5e1" opacity="0.5" />

          {/* Ground Plot Landscape */}
          <path
            d="M 0 175 Q 180 168, 320 174 T 600 175 L 600 240 L 0 240 Z"
            fill="url(#grassGrad)"
          />

          {/* STAGE 1: Parcela y estacas */}
          {stage >= 1 && (
            <g id="plot-markers">
              <rect x="190" y="155" width="5" height="25" fill="#78350f" rx="1" />
              <rect x="410" y="155" width="5" height="25" fill="#78350f" rx="1" />
              <rect x="230" y="165" width="4" height="20" fill="#78350f" rx="1" />
              <rect x="370" y="165" width="4" height="20" fill="#78350f" rx="1" />
              <line x1="192" y1="160" x2="412" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              <text x="280" y="150" fill="#065f46" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                Línea de fachada sur
              </text>
            </g>
          )}

          {/* STAGE 2: Maqueta 3D Milimétrica */}
          {stage >= 2 && (
            <g id="blueprint-layer">
              <rect x="210" y="105" width="180" height="70" fill="#0284c7" opacity="0.15" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4,4" />
              <polygon points="200,105 300,55 400,105" fill="#0284c7" opacity="0.2" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4,4" />
              {/* Internal layout lines */}
              <line x1="270" y1="105" x2="270" y2="175" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="330" y1="105" x2="330" y2="175" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3,3" />
            </g>
          )}

          {/* STAGE 3: Cimentación y montaje de madera en seco */}
          {stage >= 3 && (
            <g id="structure-layer">
              {/* Foundation slab */}
              <rect x="200" y="170" width="200" height="12" fill="#94a3b8" rx="2" stroke="#475569" strokeWidth="1" />
              {/* Timber wall panels */}
              <rect x="210" y="105" width="22" height="65" fill="url(#cltWood)" stroke="#b45309" strokeWidth="1" />
              <rect x="368" y="105" width="22" height="65" fill="url(#cltWood)" stroke="#b45309" strokeWidth="1" />
              <rect x="280" y="105" width="16" height="65" fill="url(#cltWood)" stroke="#b45309" strokeWidth="1" />
              {/* Timber beams & roof structure */}
              <polygon points="200,105 300,55 400,105" fill="none" stroke="#b45309" strokeWidth="3" />
              <line x1="200" y1="105" x2="400" y2="105" stroke="#b45309" strokeWidth="3" />
              {/* Assembly crane */}
              <line x1="430" y1="170" x2="430" y2="35" stroke="#eab308" strokeWidth="4" />
              <line x1="430" y1="35" x2="330" y2="35" stroke="#eab308" strokeWidth="3" />
              <line x1="330" y1="35" x2="330" y2="70" stroke="#0f172a" strokeWidth="1.5" />
            </g>
          )}

          {/* STAGE 4: Abrigo térmico y ventanas de 3 capas */}
          {stage >= 4 && (
            <g id="envelope-layer">
              {/* Insulation continuous thermal envelope */}
              <rect x="205" y="102" width="190" height="68" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              {/* High performance triple pane windows */}
              <rect x="235" y="118" width="34" height="42" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" rx="2" />
              <rect x="325" y="118" width="34" height="42" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" rx="2" />
              <line x1="252" y1="118" x2="252" y2="160" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="342" y1="118" x2="342" y2="160" stroke="#0284c7" strokeWidth="1.5" />
              {/* Airtight green seal tape */}
              <rect x="233" y="116" width="38" height="46" fill="none" stroke="#10b981" strokeWidth="2" rx="3" strokeDasharray="4,2" />
              <rect x="323" y="116" width="38" height="46" fill="none" stroke="#10b981" strokeWidth="2" rx="3" strokeDasharray="4,2" />
              {/* Insulated Roof */}
              <polygon points="195,102 300,50 405,102" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            </g>
          )}

          {/* STAGE 5: Mudanza, casa iluminada y jardín */}
          {stage >= 5 && (
            <g id="finished-home">
              {/* Warm cozy indoor lighting */}
              <rect x="235" y="118" width="34" height="42" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="2" />
              <rect x="325" y="118" width="34" height="42" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="2" />
              {/* Front entrance door */}
              <rect x="282" y="125" width="24" height="45" fill="#78350f" stroke="#451a03" strokeWidth="2" rx="1" />
              <circle cx="287" cy="148" r="2" fill="#facc15" />
              {/* Garden flowers */}
              <circle cx="215" cy="180" r="5" fill="#ec4899" />
              <circle cx="225" cy="182" r="4.5" fill="#a855f7" />
              <circle cx="375" cy="180" r="5" fill="#f59e0b" />
              <circle cx="385" cy="182" r="5.5" fill="#ec4899" />
              {/* Porch pergola */}
              <line x1="205" y1="115" x2="175" y2="128" stroke="#78350f" strokeWidth="3" />
              <rect x="172" y="128" width="6" height="42" fill="#78350f" rx="1" />
            </g>
          )}
        </svg>
      </div>

      {/* Ultra Compact Step Dots */}
      <div className="px-3 py-1 bg-white/80 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-600">
        <span className="flex items-center gap-1 text-[11px]">
          <Layers className="w-3 h-3 text-emerald-700" />
          <span>Evolución física de tu parcela</span>
        </span>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`w-5 h-5 rounded flex items-center justify-center font-bold transition-all ${
                stage === i
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : stage > i
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
