import React from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  HelpCircle,
  Type,
  Sun,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTextSize?: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onOpenTextSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                Guía del Juego y Menú de Ayuda
              </h2>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                La Odisea del Autopromotor · Medgón Passivhaus
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Cerrar guía de ayuda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* SECTION 1: LA INTENCIÓN DEL JUEGO */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-950">
                1. ¿Cuál es la intención del juego?
              </h3>
            </div>
            <p className="text-emerald-950 font-medium">
              Este juego es un <strong>simulador para el autopromotor</strong>: su objetivo es que aprendas a tomar decisiones estratégicas de construcción equivocándote <strong>en la pantalla y no en tu bolsillo</strong>.
            </p>
            <p className="text-emerald-900/90 text-[11px] sm:text-xs leading-relaxed">
              Diez decisiones reales, desde la parcela hasta la entrega de llaves. Aquí descubrirás una diferencia crucial: <strong>la industrialización no es prefabricación</strong>. Elegir una vivienda optimizada de catálogo en <strong>madera técnica</strong> bajo el estándar <strong>Passivhaus</strong> no va de modas, sino de certidumbre: <strong>precio cerrado, plazos sin sorpresas, confort absoluto y facturas mínimas</strong>, frente a la ruleta de imprevistos de la obra tradicional.
            </p>
          </div>

          {/* SECTION 2: CÓMO SE JUEGA */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-700 shrink-0" />
              <span>2. ¿Cómo se juega? (Mecánica paso a paso)</span>
            </h3>

            <div className="space-y-2.5">
              {/* Step A */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    A
                  </span>
                  <strong className="text-slate-900 font-bold">Lee la situación y escucha a las dos voces:</strong>
                </div>
                <p className="text-slate-600 pl-7 text-[11px] sm:text-xs">
                  En cada hito aparece una situación que todo autopromotor vive en primera persona. Verás dos posturas contrastadas:
                </p>
                <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-950">
                    <strong>😈 El Diablillo:</strong> propone atajos rápidos, precios de portada o «ya lo resolveremos en obra».
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <strong>🛡️ El Asesor:</strong> aporta rigor técnico, física Passivhaus, codiseño y presupuestos blindados.
                  </div>
                </div>
              </div>

              {/* Step B */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    B
                  </span>
                  <strong className="text-slate-900 font-bold">Toma tu decisión:</strong>
                </div>
                <p className="text-slate-600 pl-7 text-[11px] sm:text-xs leading-relaxed">
                  Partes de un <strong>presupuesto inicial de 250.000 €</strong>. Puedes <strong>deslizar la tarjeta</strong> hacia la izquierda o hacia la derecha, o pulsar directamente sobre una de las dos opciones de la parte inferior.
                </p>
              </div>

              {/* Step C */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    C
                  </span>
                  <strong className="text-slate-900 font-bold">Vigila el marcador superior fijo:</strong>
                </div>
                <p className="text-slate-600 pl-7 text-[11px] sm:text-xs">
                  El marcador siempre permanece fijo en la parte superior en 1 sola fila y reacciona de inmediato:
                </p>
                <div className="pl-7 grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <strong>💰 Presupuesto:</strong> Empiezas con 250.000 €; evita sobrecostes.
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <strong>⏳ Plazo:</strong> Mantén las semanas previstas.
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <strong>🧠 Estrés:</strong> Cuida tu salud mental en la obra.
                  </div>
                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <strong>⚡ Energía:</strong> Busca facturas de ~35 €/mes.
                  </div>
                </div>
              </div>

              {/* Step D */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    D
                  </span>
                  <strong className="text-slate-900 font-bold">Rectificación pedagógica y universo paralelo:</strong>
                </div>
                <p className="text-slate-600 pl-7 text-[11px] sm:text-xs">
                  Si una elección entraña un error común de la obra tradicional, se abrirá una alerta pedagógica con una analogía cotidiana para darte la opción de <strong>rectificar</strong> o asumir el golpe. Al finalizar, podrás consultar el historial y ver qué habría ocurrido en el camino alternativo.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: OPCIONES DE ACCESIBILIDAD */}
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/90 space-y-3">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-sky-700 shrink-0" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-sky-950">
                3. Opciones de Accesibilidad y Lectura Cómoda
              </h3>
            </div>
            <p className="text-sky-950 text-[11px] sm:text-xs font-medium">
              Diseñado para personas mayores o usuarios con dificultad visual:
            </p>

            <div className="space-y-2 text-[11px] sm:text-xs text-sky-950">
              <div className="p-2.5 rounded-xl bg-white border border-sky-200 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Type className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Ampliación de Texto (Botón «A» en la cabecera)</span>
                  </strong>
                  {onOpenTextSize && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenTextSize();
                      }}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                    >
                      Ajustar ahora
                    </button>
                  )}
                </div>
                <p className="text-slate-600 text-[11px]">
                  Permite ampliar toda la tipografía de la aplicación proporcionalmente en 4 niveles: <strong>100% (Estándar)</strong>, <strong>115% (Grande)</strong>, <strong>130% (Muy grande)</strong> y <strong>150% (Máximo accesible)</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-sky-200 space-y-0.5">
                <strong className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Modo Alto Contraste</span>
                </strong>
                <p className="text-slate-600 text-[11px]">
                  Disponible en el menú superior para forzar contrastes máximos en textos y bordes, ideal para leer bajo luz solar directa o baja visión.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-sky-200 space-y-0.5">
                <strong className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                  <span>Narración por Voz (Lectura en voz alta)</span>
                </strong>
                <p className="text-slate-600 text-[11px]">
                  Puedes activar en el menú la lectura hablada automática de los diálogos, preguntas y consecuencias en español.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: 1 fila para el texto y 1 fila para el botón Entendido */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2.5 w-full">
          <span className="text-xs text-slate-500 font-medium text-center sm:text-left block w-full">
            Pulsa en cualquier momento la <strong>«Ayuda»</strong> o el menú para volver aquí.
          </span>
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-98 cursor-pointer text-center"
          >
            Entendido, volver al juego
          </button>
        </div>
      </div>
    </div>
  );
};
