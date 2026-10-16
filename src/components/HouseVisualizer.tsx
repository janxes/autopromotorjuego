import React from 'react';
import { HouseStage } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Trees, Sun, Layers, Compass, Wind } from 'lucide-react';

interface HouseVisualizerProps {
  stage: HouseStage;
  previousStage?: HouseStage;
  className?: string;
}

const STAGE_DESCRIPTIONS: Record<HouseStage, { title: string; subtitle: string; icon: string }> = {
  1: {
    title: 'Fase 1: La Parcela en Bruto',
    subtitle: 'Orientación bioclimática al sur y estudio del terreno',
    icon: '📍',
  },
  2: {
    title: 'Fase 2: El Gemelo Digital BIM',
    subtitle: 'Cotas, pasos de instalaciones y diseño congelado en 3D',
    icon: '📐',
  },
  3: {
    title: 'Fase 3: Cimentación y Estructura en Seco',
    subtitle: 'Losa aislada y montaje de madera técnica con grúa',
    icon: '🪵',
  },
  4: {
    title: 'Fase 4: Envolvente, Cubierta y Triple Vidrio',
    subtitle: 'Aislamiento continuo de fibra de madera y cintas herméticas',
    icon: '🛡️',
  },
  5: {
    title: 'Fase 5: Casa Terminada y con Jardín',
    subtitle: 'Iluminada al atardecer, confort constante a 21°C y aire puro',
    icon: '🏡',
  },
};

export const HouseVisualizer: React.FC<HouseVisualizerProps> = ({
  stage,
  className = '',
}) => {
  const currentInfo = STAGE_DESCRIPTIONS[stage];

  return (
    <div className={`relative bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50/60 rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between ${className}`}>
      {/* Top Banner with Stage Badge */}
      <div className="p-4 sm:p-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="icono de fase">
            {currentInfo.icon}
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
              {currentInfo.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              {currentInfo.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200 text-xs font-bold text-emerald-800">
          <span>Hito {stage} de 5</span>
        </div>
      </div>

      {/* Centerpiece Vector Illustration of the Plot / House */}
      <div className="w-full h-56 sm:h-72 relative flex items-center justify-center px-4 overflow-hidden">
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full max-h-72 object-contain"
          aria-label={`Ilustración de la vivienda en fase ${stage}`}
        >
          {/* Sky & Atmosphere */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stage === 5 ? '#fef3c7' : '#e0f2fe'} />
              <stop offset="100%" stopColor={stage === 5 ? '#fed7aa' : '#ffffff'} />
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

          {/* Sun / Sunset */}
          <motion.circle
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            cx="480"
            cy={stage === 5 ? '90' : '60'}
            r="32"
            fill={stage === 5 ? '#f97316' : '#facc15'}
            opacity="0.85"
          />

          {/* Mountains backdrop */}
          <polygon points="40,240 160,140 280,240" fill="#cbd5e1" opacity="0.6" />
          <polygon points="180,240 320,110 460,240" fill="#94a3b8" opacity="0.5" />
          <polygon points="360,240 480,150 580,240" fill="#cbd5e1" opacity="0.6" />

          {/* Ground Plot Landscape */}
          <path
            d="M 0 240 Q 180 230, 320 238 T 600 240 L 600 320 L 0 320 Z"
            fill="url(#grassGrad)"
          />

          {/* STAGE 1: Parcela vacía (Estacas topográficas y cinta de replanteo) */}
          {stage >= 1 && (
            <g id="plot-markers">
              {/* Topographic wooden stakes */}
              <rect x="180" y="215" width="6" height="30" fill="#78350f" rx="1" />
              <rect x="420" y="215" width="6" height="30" fill="#78350f" rx="1" />
              <rect x="220" y="235" width="5" height="25" fill="#78350f" rx="1" />
              <rect x="380" y="235" width="5" height="25" fill="#78350f" rx="1" />
              {/* String / Ribbon line connecting stakes */}
              <line
                x1="183"
                y1="220"
                x2="423"
                y2="220"
                stroke="#e11d48"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <line
                x1="222"
                y1="240"
                x2="382"
                y2="240"
                stroke="#e11d48"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              {/* Small natural tree on the side */}
              <circle cx="100" cy="205" r="24" fill="#059669" />
              <circle cx="115" cy="195" r="18" fill="#10b981" />
              <rect x="104" y="220" width="7" height="25" fill="#78350f" />
            </g>
          )}

          {/* STAGE 2: Plano BIM desplegado en el terreno */}
          {stage === 2 && (
            <motion.g
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              id="bim-blueprint"
            >
              {/* Translucent grid blueprint on the ground */}
              <polygon
                points="190,235 410,235 435,260 165,260"
                fill="#0284c7"
                opacity="0.35"
              />
              <line x1="240" y1="235" x2="230" y2="260" stroke="#bae6fd" strokeWidth="1" />
              <line x1="300" y1="235" x2="300" y2="260" stroke="#bae6fd" strokeWidth="1" />
              <line x1="360" y1="235" x2="370" y2="260" stroke="#bae6fd" strokeWidth="1" />
              {/* Holographic 3D wireframe wire */}
              <rect
                x="220"
                y="150"
                width="160"
                height="85"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
                strokeDasharray="6 3"
                opacity="0.8"
              />
              <polygon
                points="220,150 300,105 380,150"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
                strokeDasharray="6 3"
                opacity="0.8"
              />
            </motion.g>
          )}

          {/* STAGE 3: Cimentación y Estructura de Madera Técnica CLT / Entramado */}
          {stage >= 3 && (
            <motion.g
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              id="timber-structure"
            >
              {/* Insulated dry foundation slab */}
              <rect x="190" y="235" width="220" height="12" fill="#94a3b8" rx="2" />
              {/* CLT Timber Columns and Beams */}
              <rect x="205" y="160" width="14" height="75" fill="url(#cltWood)" rx="1" />
              <rect x="260" y="160" width="12" height="75" fill="url(#cltWood)" rx="1" />
              <rect x="330" y="160" width="12" height="75" fill="url(#cltWood)" rx="1" />
              <rect x="385" y="160" width="14" height="75" fill="url(#cltWood)" rx="1" />
              {/* Main horizontal timber beam */}
              <rect x="195" y="152" width="210" height="12" fill="#b45309" rx="1" />
              {/* Roof timber rafters */}
              <line x1="195" y1="154" x2="300" y2="105" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
              <line x1="405" y1="154" x2="300" y2="105" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
              <line x1="235" y1="154" x2="300" y2="118" stroke="#b45309" strokeWidth="4" />
              <line x1="365" y1="154" x2="300" y2="118" stroke="#b45309" strokeWidth="4" />
            </motion.g>
          )}

          {/* STAGE 4: Envolvente térmica continua, cubierta y triple vidrio */}
          {stage >= 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              id="house-envelope"
            >
              {/* Thermal insulation and facade cladding */}
              <polygon
                points="200,235 400,235 400,154 200,154"
                fill="url(#timberWall)"
              />
              {/* Roof slope cover */}
              <polygon
                points="190,156 300,100 410,156 395,160 300,108 205,160"
                fill="#334155"
              />
              {/* Triple Glazing Windows with Argon (Blue tint) */}
              <rect
                x="225"
                y="175"
                width="40"
                height="45"
                fill="#38bdf8"
                opacity="0.8"
                stroke="#0f172a"
                strokeWidth="2.5"
                rx="2"
              />
              <rect
                x="335"
                y="175"
                width="48"
                height="45"
                fill="#38bdf8"
                opacity="0.8"
                stroke="#0f172a"
                strokeWidth="2.5"
                rx="2"
              />
              {/* Front entrance door */}
              <rect
                x="285"
                y="180"
                width="28"
                height="55"
                fill="#78350f"
                stroke="#0f172a"
                strokeWidth="2"
                rx="1"
              />
            </motion.g>
          )}

          {/* STAGE 5: Casa terminada, iluminada al atardecer y jardín frondoso */}
          {stage === 5 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              id="finished-home"
            >
              {/* Warm interior lighting through windows */}
              <rect
                x="225"
                y="175"
                width="40"
                height="45"
                fill="#fef08a"
                opacity="0.95"
                stroke="#0f172a"
                strokeWidth="2.5"
                rx="2"
              />
              <rect
                x="335"
                y="175"
                width="48"
                height="45"
                fill="#fef08a"
                opacity="0.95"
                stroke="#0f172a"
                strokeWidth="2.5"
                rx="2"
              />
              {/* Warm light cast onto porch */}
              <polygon
                points="220,225 270,225 285,255 205,255"
                fill="#fef08a"
                opacity="0.3"
              />
              <polygon
                points="330,225 385,225 405,255 315,255"
                fill="#fef08a"
                opacity="0.3"
              />
              {/* Garden path to entrance */}
              <polygon
                points="285,235 313,235 345,290 255,290"
                fill="#e2e8f0"
                opacity="0.9"
              />
              {/* Garden flowers & bushes */}
              <circle cx="210" cy="245" r="8" fill="#ec4899" />
              <circle cx="225" cy="248" r="7" fill="#a855f7" />
              <circle cx="390" cy="246" r="8" fill="#f59e0b" />
              <circle cx="405" cy="248" r="9" fill="#ec4899" />
              {/* Porch wooden pergola */}
              <line x1="200" y1="165" x2="160" y2="185" stroke="#78350f" strokeWidth="4" />
              <rect x="155" y="185" width="8" height="50" fill="#78350f" rx="1" />
              <line x1="155" y1="185" x2="200" y2="185" stroke="#b45309" strokeWidth="3" />
            </motion.g>
          )}
        </svg>
      </div>

      {/* Evolution Step Indicators */}
      <div className="px-5 py-3 bg-white/70 backdrop-blur-xs border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          <span>Evolución física de tu parcela</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded-md flex items-center justify-center font-bold transition-all ${
                stage === i
                  ? 'bg-emerald-800 text-white shadow-xs'
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
