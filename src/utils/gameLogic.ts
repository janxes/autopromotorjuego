import {
  GameState,
  AlertaAutopromotor,
  ChoiceOption,
  LCCComparisonInput,
  LCCResult,
  LCCYearData,
} from '../types/game';

export function generateStressBar(percent: number): string {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const blocks = Math.round(clamped / 10);
  const filled = '■'.repeat(blocks);
  const empty = '□'.repeat(10 - blocks);
  return `[${filled}${empty}] ${clamped}%`;
}

export const INITIAL_GAME_STATE: GameState = {
  level: 0,
  levelName: 'Fase Previa: Calibración del Usuario',
  faseNombre: 'Calibración Inicial',
  presupuestoInicial: 250000,
  presupuestoRestante: 250000,
  desvioAcumuladoEuros: 0,
  desvioAcumuladoPorcentaje: 0,
  tiempoSemanas: 0,
  tiempoPrevistoSemanas: 24, // 24 semanas = ~6 meses previsto para industrializado
  estresPorcentaje: 10,
  estresBarra: generateStressBar(10),
  estadoEstres: 'Zen e Ilusionado con la Parcela',
  facturaEnergeticaMes: 35,
  confortYAire: 'Óptimo / Filtrado continuo',
  confortPuntos: 90,
  huellaCarbono: 0,
  modeloConstructivo: 'Industrializado Madera Passivhaus',
  blowerDoorN50: 0.45,
  vmcInstalado: true,
  tripleVidrio: true,
  calibration: {
    ubicacionParcela: '',
    dormitorios: 3,
    calibrado: false,
  },
  turnNumber: 0,
  gameOver: false,
  gameVictory: false,
};

export function formatStatusPanelMarkdown(state: GameState): string {
  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  const desvioSign = state.desvioAcumuladoEuros > 0 ? '+' : '';
  const carbonSign = state.huellaCarbono <= 0 ? '-' : '+';
  const carbonLabel =
    state.huellaCarbono <= 0
      ? `-${Math.abs(state.huellaCarbono).toFixed(1)} tCO2 eq (Madera fijadora)`
      : `+${state.huellaCarbono.toFixed(1)} tCO2 (Hormigón/Ladrillo)`;

  const lvlDisplay = state.level === 0 ? 'CALIBRACIÓN' : `${state.level}/5: ${state.faseNombre}`;

  return `📊 **ESTADO DEL AUTOPROMOTOR [NIVEL ${lvlDisplay}]**
- 💰 Presupuesto Inicial: ${formatoEuros(state.presupuestoInicial)} | Restante: ${formatoEuros(state.presupuestoRestante)}
- 📈 Desvío Económico Acumulado: ${desvioSign}${state.desvioAcumuladoPorcentaje.toFixed(1)}% (${desvioSign}${formatoEuros(state.desvioAcumuladoEuros)})
- ⏳ Tiempo Transcurrido: Semana ${state.tiempoSemanas} (vs Semana ${state.tiempoPrevistoSemanas} previstos)
- 🧠 Nivel de Estrés / Salud Mental: ${state.estresBarra} [${state.estadoEstres}]
- ⚡ Factura Energética: ${state.facturaEnergeticaMes} €/mes
- 🌡️ Confort y Aire: ${state.confortYAire}
- 🌲 Huella de Carbono: ${carbonLabel}
- 🏷️ Modelo Constructivo: [${state.modeloConstructivo}]`;
}

export function updateStressStatus(percent: number): string {
  if (percent <= 15) return 'Zen y en Control Total';
  if (percent <= 30) return 'Preocupado pero Funcional';
  if (percent <= 55) return 'Alerta Amarilla (Gastos Imprevistos)';
  if (percent <= 75) return 'Al Borde del Ictus con el Contratista';
  return 'Pánico Hipotecario y Agotamiento Extremo';
}

export interface ScenarioDefinition {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  title: string;
  faseNombre: string;
  gameMasterNarration: string;
  options: ChoiceOption[];
  badAlerts?: Record<string, AlertaAutopromotor>;
}

export const GAME_SCENARIOS_V2: Record<number, ScenarioDefinition> = {
  0: {
    level: 0,
    title: 'Fase Previa: Calibración del Usuario',
    faseNombre: 'Calibración de Parcela y Necesidades',
    gameMasterNarration: `¡Bienvenido a "La Odisea del Autopromotor: De la Parcela al Hogar"!

Soy tu Game Master y asesor pedagógico en edificación industrializada de madera técnica y estándar Passivhaus por catálogo. Mi misión es guiarte para que conquistes tu futuro hogar sin caer en los 3 grandes dolores de la autopromoción:
1. La ruleta rusa de los presupuestos con partidas abiertas (+15% a +25% de sobrecoste).
2. El lodazal de la obra húmeda in situ frente al montaje récord en seco en días.
3. El coste a 30 años (Life Cycle Cost): confort con triple vidrio y VMC continua vs. moho y facturas desorbitadas.

Comienzas con una parcela limpia, 250.000 € y la ilusión intacta. Antes de arrancar con el Nivel 1, calibremos tu proyecto en 1 sola pregunta:
1. ¿Dónde está ubicada tu parcela (zona fría/montaña, meseta continental o costa suave)?
2. ¿Qué tamaño de vivienda buscas (2, 3 o 4 dormitorios)?`,
    options: [
      {
        id: 'CALIB_MONTAÑA_3D',
        label: 'Zona Fría / Montaña — 3 Dormitorios (135 m²)',
        description: 'Inviernos crudos con heladas. Envolvente térmica extrema requerida.',
      },
      {
        id: 'CALIB_MESETA_3D',
        label: 'Meseta Continental — 3 Dormitorios (140 m²)',
        description: 'Oscilación térmica brutal: inviernos gélidos y veranos tórridos a 40°C.',
      },
      {
        id: 'CALIB_COSTA_4D',
        label: 'Zona Costa / Clima Suave — 4 Dormitorios (160 m²)',
        description: 'Humedad relativa alta y riesgo de moho en puentes térmicos.',
      },
    ],
  },
  1: {
    level: 1,
    title: 'NIVEL 1: «La Ruleta del Presupuesto y el Calendario»',
    faseNombre: 'La Ruleta del Presupuesto y el Calendario',
    gameMasterNarration: `Tienes la parcela escriturada y el banco te pide el presupuesto de ejecución material para aprobar tu hipoteca autopromotor. Llega el primer gran dilema:

¿Cómo vas a solicitar los precios y el proyecto para acudir a la entidad bancaria?`,
    options: [
      {
        id: 'L1_OPCION_A',
        letter: 'A',
        label: 'Opción A (La Trampa Tradicional): Pedir presupuestos a varios constructores locales con partidas abiertas',
        description: 'El arquitecto redacta mediciones abiertas y esperas a que 4 constructores locales te pasen precios "a liquidar según avance de obra".',
        isBadDecision: true,
      },
      {
        id: 'L1_OPCION_B',
        letter: 'B',
        label: 'Opción B (Catálogo Industrializado Passivhaus): Elegir modelo prediseñado con maqueta digital 3D y precio cerrado',
        description: 'Seleccionas una vivienda de catálogo en madera técnica con precio notarial cerrado, desglose claro entre fase técnica y acabados, y aprobación inmediata.',
        isBadDecision: false,
        recommended: true,
      },
    ],
    badAlerts: {
      L1_OPCION_A: {
        impacto: '4 meses de silencio administrativo y llamadas sin respuesta. Cuando llegan los presupuestos, dos constructores ya han quebrado, otro sube un 20% por "alza del acero" y los tipos de interés de la hipoteca han subido 75 puntos básicos. Has perdido 14 semanas y 11.500 € en comisiones e intereses de carencia.',
        porqueTecnico: 'Los presupuestos tradicionales con partidas abiertas no tienen ingeniería previa de detalle. El constructor traslada el riesgo al autopromotor mediante "precios contradictorios" y partidas alzadas una vez que estás comprometido.',
        alternativaIndustrializada: 'Un modelo por catálogo con maqueta digital milimétrica congela las compras de madera técnica en taller y fija un contrato llave en mano de precio vinculante ante notario.',
        penalizacionPresupuesto: 11500,
        penalizacionSemanas: 16,
        penalizacionEstres: 35,
        analogia: 'Es como comprar un billete de avión low-cost por 15 €: en la puerta de embarque te cobran 70 € por la maleta de mano y 40 € por el asiento. El papel en blanco de la obra tradicional es ese billete trampa.',
        adaptableACadaCaso: 'Si tu terreno tiene pendiente o sospecha de roca, encarga siempre un estudio geotécnico y ficha urbanística antes de solicitar la hipoteca.',
      },
    },
  },
  2: {
    level: 2,
    title: 'NIVEL 2: «Lodo en la Parcela vs. Precisión de Fábrica»',
    faseNombre: 'Lodo en la Parcela vs. Precisión de Fábrica',
    gameMasterNarration: `Arrancan los trabajos en parcela en pleno otoño. A los pocos días se desata un temporal atlántico con 3 semanas de lluvia torrencial ininterrumpida. 

El terreno es una ciénaga y el agua se acumula en las zanjas. ¿Cómo gestionas la ejecución de la estructura?`,
    options: [
      {
        id: 'L2_OPCION_A',
        letter: 'A',
        label: 'Opción A (Obra in situ artesanal): Seguir con ladrillo y hormigón en parcela entre el barro',
        description: 'La cuadrilla intenta hormigonar y apilar ladrillos bajo la lluvia. Los andamios siguen cobrando tarifa diaria de alquiler.',
        isBadDecision: true,
      },
      {
        id: 'L2_OPCION_B',
        letter: 'B',
        label: 'Opción B (Industrialización en nave): Fabricar la estructura en seco bajo techo en taller mientras fragua la base',
        description: 'La solera se protege adecuadamente mientras los paneles de madera técnica con aislamiento se ensamblan en seco en fábrica con control numérico CNC.',
        isBadDecision: false,
        recommended: true,
      },
    ],
    badAlerts: {
      L2_OPCION_A: {
        impacto: 'Paro total de obra. Los palés de aislamiento de lana mineral quedan empapados en el fango y pierden sus propiedades térmicas. El alquiler de andamios y casetas sigue facturando. Tienes 8 semanas de retraso y un sobrecoste de 16.000 € mientras sigues pagando el alquiler de tu piso actual.',
        porqueTecnico: 'El hormigón y el mortero fresco requieren tiempos de curado y no toleran saturación hídrica. La obra húmeda in situ es rehén de la meteorología, provocando solape de gremios y patologías por humedad atrapada en cerramientos.',
        alternativaIndustrializada: 'El 90% de la envolvente de madera técnica se produce en fábrica bajo clima controlado con tolerancias de 1 mm. Llega a la parcela en camiones y se monta en seco en 5 días con grúa, cerrando la casa al agua de inmediato.',
        penalizacionPresupuesto: 16000,
        penalizacionSemanas: 8,
        penalizacionEstres: 25,
        analogia: 'Es como hacerte un traje de sastre cosiendo las telas bajo la lluvia para luego rajarlas con tijeras para meter las tuberías. En taller se fabrica en seco con precisión de 1 mm.',
        adaptableACadaCaso: 'Si tienes prisa por mudarte o vives de alquiler, construir en taller te ahorra entre 4 y 7 meses de alquiler puente.',
      },
    },
  },
  3: {
    level: 3,
    title: 'NIVEL 3: «El Enigma Invisible: Hermeticidad y Ventanas»',
    faseNombre: 'El Enigma Invisible: Hermeticidad y Ventanas',
    gameMasterNarration: `La envolvente estructural ya está levantada. Llega el hito crucial que definirá el confort interior para los próximos 50 años: la colocación de ventanas y el sellado de la capa de hermeticidad.

¿Qué criterio de carpintería e instalación eliges?`,
    options: [
      {
        id: 'L3_OPCION_A',
        letter: 'A',
        label: 'Opción A (Ahorro aparente): Ventanas estándar fijadas con espuma convencional de poliuretano sin cintas',
        description: 'Comprar carpinterías estándar de aluminio con doble vidrio y rellenar el hueco perimetral con spray de espuma de poliuretano sin verificar con Blower Door.',
        isBadDecision: true,
      },
      {
        id: 'L3_OPCION_B',
        letter: 'B',
        label: 'Opción B (Estándar Passivhaus verificado): Triple vidrio, membranas elásticas continuas y Test Blower Door',
        description: 'Carpinterías de madera-aluminio de altas prestaciones con intercalario caliente, triple vidrio bajo emisivo con argón, cintas de estanqueidad y ensayo Blower Door (n50 ≤ 0,6 ren/h).',
        isBadDecision: false,
        recommended: true,
      },
    ],
    badAlerts: {
      L3_OPCION_A: {
        impacto: 'El primer temporal de invierno trae silbidos de viento por las juntas. La espuma rígida se ha cuarteado con las dilataciones. Las esquinas de las ventanas están frías a 11°C y aparecen manchas negras de moho tóxico. El test Blower Door arroja un desastre: n50 = 6,2 ren/h (un auténtico colador).',
        porqueTecnico: 'La espuma de poliuretano convencional no es estanca al aire ni deformable; con los ciclos frío/calor se microfisura. El aire caliente interior húmedo se escapa por la rendija, se enfría por debajo del punto de rocío y genera condensación intersticial que pudre acabados.',
        alternativaIndustrializada: 'El estándar Passivhaus exige cintas elásticas especiales (Siga/ProClima) que sellan herméticamente el encuentro carpintería-muro, garantizando n50 ≤ 0,6 h⁻¹ y eliminando cualquier corriente o condensación.',
        penalizacionPresupuesto: 12500,
        penalizacionSemanas: 4,
        penalizacionEstres: 20,
        analogia: 'Es como llevar un anorak de montaña caro de 500 € pero dejarte la cremallera del pecho abierta: el viento helado te congelará igual. La espuma rápida en ventanas es esa cremallera abierta.',
        adaptableACadaCaso: 'Si sufres de alergias o ruidos exteriores de tráfico, el sellado elástico continuo con triple vidrio aísla tanto el aire como el ruido exterior.',
      },
    },
  },
  4: {
    level: 4,
    title: 'NIVEL 4: «Respirar o Ventilar: Salud y Confort Interior»',
    faseNombre: 'Respirar o Ventilar: Salud y Confort Interior',
    gameMasterNarration: `Llega tu primer invierno habitando la vivienda. Fuera el termómetro marca 1°C y sopla viento helado. Toca gestionar la calidad del aire interior, la humedad producida por duchas y cocina, y la acumulación de CO2 mientras duermes.

¿Cómo vas a ventilar y climatizar tu hogar?`,
    options: [
      {
        id: 'L4_OPCION_A',
        letter: 'A',
        label: 'Opción A (Prescindir de VMC): Abaratar la instalación y abrir ventanas 2 veces al día para ventilar',
        description: 'Ahorras en el equipo de ventilación mecánica; abres de par en par las ventanas por la mañana y por la noche durante 15 minutos.',
        isBadDecision: true,
      },
      {
        id: 'L4_OPCION_B',
        letter: 'B',
        label: 'Opción B (Passivhaus VMC Doble Flujo): Ventilación mecánica con recuperación de calor (>90%) y filtros F7/HEPA',
        description: 'El aire se renueva 24/7 de forma silenciosa e imperceptible, reteniendo el 92% del calor y filtrando polen, polvo, ácaros y esporas de moho.',
        isBadDecision: false,
        recommended: true,
      },
    ],
    badAlerts: {
      L4_OPCION_A: {
        impacto: 'Abrir las ventanas a 1°C tira a la basura en 10 minutos todo el calor acumulado: la bomba de calor o caldera se enciende a máxima potencia, disparando la factura a 260 €/mes. Por la noche, el CO2 en el dormitorio sube a 1.900 ppm (te levantas con dolor de cabeza y pesadez). En primavera, el polen entra directo.',
        porqueTecnico: 'La ventilación manual no controla el caudal ni la humedad y genera pérdidas energéticas masivas. En una casa sin VMC, la humedad de duchas y respiración satura el ambiente provocando condensaciones superficiales y proliferación de ácaros.',
        alternativaIndustrializada: 'La VMC de doble flujo cruza el aire viciado caliente que sale con el aire puro frío que entra sin mezclarlos, recuperando más del 90% del calor con un consumo de un ventilador de apenas 25W.',
        penalizacionPresupuesto: 8000,
        penalizacionSemanas: 0,
        penalizacionEstres: 15,
        analogia: 'Es como calentar una piscina y cambiar todo el agua por agua helada dos veces al día. La ventilación inteligente es un pulmón que renueva el aire sin tirar el calor.',
        adaptableACadaCaso: 'Si duermes con ventanas cerradas y te levantas con la cabeza cargada, la ventilación continua mantiene el CO2 siempre por debajo de 800 ppm.',
      },
    },
  },
  5: {
    level: 5,
    title: 'NIVEL 5: «La Balanza a 30 Años: Facturas vs. Longevidad»',
    faseNombre: 'La Balanza a 30 Años (Life Cycle Cost)',
    gameMasterNarration: `Hacemos un viaje en el tiempo a 30 AÑOS VISTA. Es el momento del balance definitivo: el Life Cycle Cost (Coste del Ciclo de Vida).

Durante estas 3 décadas se han vivido inviernos con Filomena, olas de calor sahariano en agosto y constantes incrementos en la tarifa eléctrica de la red. 

¿Cuál es la realidad de tu hogar según el camino que has recorrido?`,
    options: [
      {
        id: 'L5_VER_BALANCE',
        label: 'Ver Balance Final del Ciclo de Vida a 30 Años y Certificado',
        description: 'Generar la auditoría completa comparativa, perfil de autopromotor, guía de preguntas trampa para constructores y estudio de viabilidad.',
        recommended: true,
      },
    ],
  },
};

export const CHECKLIST_PREGUNTAS_TRAMPA = [
  {
    num: '1',
    pregunta: '¿El contrato estipula un precio cerrado con penalización económica diaria por retraso en la entrega?',
    porQue: 'Si el constructor no acepta penalización por demora, financiará tus retrasos con los adelantos de otros clientes.',
    respuestaPassivhaus: 'Sí, contrato notarial con precio cerrado y penalización estipulada.',
  },
  {
    num: '2',
    pregunta: '¿Vais a realizar un Test Blower Door con valor n50 ≤ 0,6 h⁻¹ certificado antes de colocar el pladur?',
    porQue: 'Si esperan a colocar el pladur para medir la estanqueidad, será imposible corregir las fugas en tubos y juntas.',
    respuestaPassivhaus: 'Obligatorio en fase de estructura y en fase final para certificar Passivhaus.',
  },
  {
    num: '3',
    pregunta: '¿Existe una maqueta digital 3D donde cada conducto y paso de cables ya esté resuelto antes de cortar madera?',
    porQue: 'En obra tradicional, los fontaneros y electricistas pican el ladrillo con radial rompiendo el aislamiento térmico.',
    respuestaPassivhaus: 'Todo pre-mecanizado en taller con precisión de relojero, sin dar un solo martillazo en la obra.',
  },
  {
    num: '4',
    pregunta: '¿Cómo garantizáis la ventilación continua y la ausencia de condensaciones en puentes térmicos?',
    porQue: 'Las rejillas tradicionales en fachadas introducen ruido, aire frío y crean condensaciones de moho en las esquinas.',
    respuestaPassivhaus: 'VMC de doble flujo con recuperador de calor >90% y filtros continuos F7/HEPA.',
  },
];

export function calculateLCC(input: LCCComparisonInput): LCCResult {
  const { areaM2, costeKWh, inflacionEnergeticaAnual, years } = input;

  const capexInicialTradicional = areaM2 * 1420;
  const desvioTradicionalPorc = 0.185;
  const desvioTradicionalEuros = capexInicialTradicional * desvioTradicionalPorc;
  const capexRealConDesvioTradicional = capexInicialTradicional + desvioTradicionalEuros;

  const capexInicialIndustrializado = areaM2 * 1750;

  const consumoAnualKWhTradicional = areaM2 * 95;
  const consumoAnualKWhPassivhaus = areaM2 * 16;

  const ahorroEnergeticoPorcentaje =
    ((consumoAnualKWhTradicional - consumoAnualKWhPassivhaus) / consumoAnualKWhTradicional) * 100;

  const co2EmbebidoTradicionalTons = (areaM2 * 380) / 1000;
  const co2SecuestradoMaderaTons = (areaM2 * -280) / 1000;

  const chartData: LCCYearData[] = [];

  let acumuladoTradicional = capexRealConDesvioTradicional;
  let acumuladoIndustrializado = capexInicialIndustrializado;
  let precioKWhActual = costeKWh;
  let paybackAnos = -1;

  for (let y = 1; y <= years; y++) {
    const gastoEnergiaTrad = consumoAnualKWhTradicional * precioKWhActual;
    const gastoEnergiaIndus = consumoAnualKWhPassivhaus * precioKWhActual;

    let mantenimientoTrad = 350;
    if (y >= 5) mantenimientoTrad += 1100 + y * 45;

    const mantenimientoIndus = 270;

    acumuladoTradicional += gastoEnergiaTrad + mantenimientoTrad;
    acumuladoIndustrializado += gastoEnergiaIndus + mantenimientoIndus;

    const ahorroNeto = acumuladoTradicional - acumuladoIndustrializado;

    if (ahorroNeto >= 0 && paybackAnos === -1) {
      paybackAnos = y;
    }

    chartData.push({
      year: y,
      costeAcumuladoTradicional: Math.round(acumuladoTradicional),
      costeAcumuladoIndustrializado: Math.round(acumuladoIndustrializado),
      gastoEnergiaTradicional: Math.round(gastoEnergiaTrad),
      gastoEnergiaIndustrializado: Math.round(gastoEnergiaIndus),
      mantenimientoPatologiasTradicional: Math.round(mantenimientoTrad),
      mantenimientoPatologiasIndustrializado: Math.round(mantenimientoIndus),
      ahorroNetoAcumulado: Math.round(ahorroNeto),
    });

    precioKWhActual *= 1 + inflacionEnergeticaAnual;
  }

  const ahorroTotal30Anos =
    chartData[chartData.length - 1].costeAcumuladoTradicional -
    chartData[chartData.length - 1].costeAcumuladoIndustrializado;

  return {
    capexInicialTradicional,
    capexRealConDesvioTradicional,
    capexInicialIndustrializado,
    consumoAnualKWhTradicional,
    consumoAnualKWhPassivhaus,
    ahorroEnergeticoPorcentaje,
    ahorroTotal30Anos,
    paybackAnos: paybackAnos === -1 ? 6 : paybackAnos,
    co2EmbebidoTradicionalTons,
    co2SecuestradoMaderaTons,
    chartData,
  };
}
