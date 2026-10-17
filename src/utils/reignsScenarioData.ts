import { GameCard, Character, PlayerProfile } from '../types/game';

export const CHARACTERS: Record<string, Character> = {
  architect: {
    id: 'architect',
    name: 'Elena',
    role: 'Arquitecta del Proyecto',
    avatarBg: 'bg-emerald-100',
    avatarColor: 'text-emerald-800',
  },
  builder: {
    id: 'builder',
    name: 'Manolo',
    role: 'Constructor Tradicional',
    avatarBg: 'bg-amber-100',
    avatarColor: 'text-amber-900',
  },
  partner: {
    id: 'partner',
    name: 'Álex',
    role: 'Tu Pareja (Co-promotor)',
    avatarBg: 'bg-sky-100',
    avatarColor: 'text-sky-900',
  },
  advisor: {
    id: 'advisor',
    name: 'Laura',
    role: 'Especialista en Casas Pasivas',
    avatarBg: 'bg-indigo-100',
    avatarColor: 'text-indigo-900',
  },
};

export const REIGNS_SCENARIOS: GameCard[] = [
  // NIVEL 1: La parcela y el presupuesto cebo
  {
    id: 'card-level-1',
    level: 1,
    sceneTitle: 'Nivel 1: La Parcela y el Presupuesto Cebo',
    character: CHARACTERS.partner,
    messageType: 'chat',
    prompt: '«La parcela nos encanta y tiene unas vistas increíbles. Manolo nos dice: "Fírmame este número rápido en un folio; lo que vaya saliendo en el terreno lo vemos sobre la marcha, vosotros no os preocupéis". ¿Firmamos ya?»',
    detailContext: 'Ubicación atractiva, pero aún no has pedido la ficha técnica del ayuntamiento ni sabes si el subsuelo es roca dura o arcilla blanda.',
    phaseAnalogy: {
      title: 'El billete de avión tirado de precio con sorpresas al embarcar',
      metaphor: 'Comprar un vuelo por 15 € sin mirar la letra pequeña: al llegar a la puerta te cobran 70 € por la maleta, 35 € por sentarte y 40 € por el bolso.',
      explanation: 'El "ya lo iremos viendo en el terreno" funciona igual: te atraen con un precio bajo en un papel, pero la primera piedra que encuentra la excavadora te cuesta miles de euros porque "no estaba en el presupuesto orientativo".',
      cases: [
        {
          label: 'Si tu terreno tiene pendiente o sospecha de roca',
          tip: 'Exige siempre un estudio geotécnico previo. Una pala picando roca sin preverlo cuesta entre 5.000 € y 12.000 € que el banco no te financiará.'
        },
        {
          label: 'Si tu presupuesto de hipoteca va justo',
          tip: 'Nunca firmes un presupuesto abierto. En el catálogo industrializado la cimentación se calcula con cotas milimétricas antes de mover un solo terrón.'
        },
        {
          label: 'Si estás en zona urbana con casas vecinas',
          tip: 'Pide la ficha urbanística para verificar retranqueos de linde y servidumbres antes de comprometer ningún pago.'
        }
      ]
    },
    leftChoice: {
      id: 'L1_IMPULSO',
      label: 'Aceptar el "sobre la marcha"',
      subtext: 'Firmar el número rápido para no perder tiempo',
      deltaPresupuesto: -6500, // Imprevisto de cimentación por no mirar
      deltaSemanas: 6, // Retrasos en licencia
      deltaEstres: 25,
      deltaFactura: 0,
      consequenceText: 'En cuanto la excavadora entra en la parcela, encuentra roca dura. El constructor se encoge de hombros: «Esto no entraba en el presupuesto orientativo; son 6.500 € más o no puedo meter la máquina».',
      partnerReaction: '«Oye... el del tractor dice que o le pagamos el suplemento de picado de roca o se marcha a otra obra. Ya empezamos con los sobrecostes...»',
      technicalTip: {
        warning: 'La trampa del "sobre la marcha" es el anzuelo clásico para atraparte con un precio bajo que luego se multiplica.',
        advice: 'Antes de firmar nada, exige siempre la ficha técnica municipal y el estudio del terreno. En el catálogo industrializado el diseño se adapta a la parcela antes de meter una pala.',
        quote: '«El "ya lo iremos viendo" es la partida más cara de cualquier obra tradicional».',
        analogy: {
          title: 'El billete de avión ganga con suplementos trampa',
          story: 'Comprar un vuelo low-cost por 15 € parece un chollo, hasta que en la puerta de embarque te cobran 70 € por la maleta de mano y 40 € por imprimir la tarjeta. En la obra tradicional, el papel rápido de Manolo es ese billete trampa: el precio real aparece cuando la máquina ya está en tu parcela y ya no puedes decir que no.',
          lesson: 'Nunca firmes nada sin conocer la composición del subsuelo y la cota exacta de apoyo.',
          adaptableAdvice: 'Para tu caso: antes de solicitar la hipoteca, pide un informe geotécnico y una topografía; te costará menos de 1.200 € y te blindará contra sobrecostes de más de 10.000 €.',
          cases: [
            {
              label: 'Caso con pendiente pronunciada',
              tip: 'Opta por una cimentación por pilotes o muros de contención calculados previamente en maqueta para no disparar el hormigón.'
            },
            {
              label: 'Caso con suelo arcilloso expansivo',
              tip: 'Las zapatas convencionales agrietan paredes en verano; la madera industrializada reparte cargas ligeras reduciendo cimientos.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses comprobado la información técnica antes:',
        budgetResult: '0 € en sobrecostes y sorpresas de excavación.',
        weeksResult: '6 semanas ganadas al tramitar la licencia con cotas exactas.',
        narrative: 'Habrías detectado la roca de antemano y la estructura se habría anclado a la cota idónea sin picar a ciegas.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L1_TECNICA',
      label: 'Comprobar información técnica',
      subtext: 'Revisar normativa, orientación al sol y subsuelo',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Revisas la ficha técnica del ayuntamiento y la orientación al sol de invierno. Todo encaja para captar calor natural gratis y evitar sorpresas de cimentación.',
      partnerReaction: '«¡Menos mal que pediste la ficha técnica! Detectamos un retranqueo a tiempo y el banco ha dado el visto bueno sin pegas».',
      parallelOutcome: {
        title: 'Si hubieses firmado el papel rápido a ciegas:',
        budgetResult: '+6.500 € en picado imprevisto de roca.',
        weeksResult: '+6 semanas de retrasos y trámites atascados.',
        narrative: 'Habrías caído en el primer precio contradictorio del constructor tradicional antes de poner un solo ladrillo.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
  },

  // CARTA DE IMPREVISTO 1: Entre nivel 1 y 2
  {
    id: 'card-surprise-1',
    level: 1,
    sceneTitle: '🎴 Carta de Imprevisto: La vida también juega',
    character: CHARACTERS.partner,
    messageType: 'surprise',
    prompt: '«Cambio de planes: en mi trabajo han aprobado teletrabajo permanente. Necesitamos un rincón de trabajo luminoso y con silencio total. Manolo propone: "Metemos 25 m² más de ladrillo y luego ya arreglaremos la hipoteca"».',
    detailContext: 'Una necesidad nueva cuando el proyecto está empezando a diseñarse.',
    phaseAnalogy: {
      title: 'Comprar una furgoneta industrial solo por si un día llevas una maleta de más',
      metaphor: 'No te compras un camión de mudanzas para ir a trabajar a diario solo porque una vez al mes llevas equipaje extra; organizas mejor el maletero.',
      explanation: 'Construir 25 m² más de ladrillo infla la hipoteca 28.000 € y te obliga a calentar, limpiar y pagar impuestos por ese espacio durante 30 años. Un espacio polivalente con tabiques móviles resuelve el despacho sin gastar un euro más.',
      cases: [
        {
          label: 'Si teletrabajas con llamadas frecuentes',
          tip: 'Prioriza el aislamiento acústico y la luz natural en un dormitorio de uso mixto antes que inflar los metros cuadrados totales.'
        },
        {
          label: 'Si piensas en tener hijos en el futuro',
          tip: 'Elige distribuciones con tabiquería seca adaptable: puedes transformar un espacio diáfano en dos cuartos cuando lo necesites.'
        },
        {
          label: 'Si tu capacidad de endeudamiento está al límite',
          tip: 'Cada 10 m² que evitas construir son unos 15.000 € menos de deuda hipotecaria.'
        }
      ]
    },
    leftChoice: {
      id: 'S1_METROS_EXTRA',
      label: 'Añadir 25 m² más a la casa',
      subtext: 'Hacer la casa más grande a lo tradicional',
      deltaPresupuesto: -28000,
      deltaSemanas: 5,
      deltaEstres: 20,
      deltaFactura: 25,
      consequenceText: 'Construir más metros infla la hipoteca un 15% y crea un espacio enorme que tendrás que pagar, calentar y limpiar durante los próximos 30 años.',
      partnerReaction: '«El banco nos dice que con los metros extra estamos al límite de endeudamiento y nos piden avalistas... me está dando un ataque de nervios».',
      technicalTip: {
        warning: 'Construir metros de más es la solución perezosa tradicional que arruina los presupuestos.',
        advice: 'Un buen diseño arquitectónico crea estancias polivalentes de doble uso. La mejor casa no es la más grande, sino la que aprovecha cada centímetro.',
        quote: '«Los metros cuadrados que no construyes son los más baratos de calentar y pagar al banco».',
        analogy: {
          title: 'El camión de mudanzas vs el maletero bien organizado',
          story: 'Para llevar una bolsa de deporte adicional no te compras un camión que consume 25 litros de gasoil cada 100 km. En tu hogar, añadir 25 m² de ladrillos genera 28.000 € de deuda directa y 30 años de pagar climatización por aire vacío. Una pared móvil acústica o una cama abatible integrada te da el mismo despacho gratis.',
          lesson: 'El confort no se mide en metros cúbicos brutos, sino en la calidad de uso y luz de cada rincón.',
          adaptableAdvice: 'Para tu caso: diseña un dormitorio que durante el horario laboral funcione como despacho con iluminación natural cenital y por la noche sea cuarto de descanso o invitados.',
          cases: [
            {
              label: 'Caso de vivienda unifamiliar compacta',
              tip: 'Aprovecha dobles alturas y luz cenital para dar sensación de amplitud sin engordar los metros construidos.'
            },
            {
              label: 'Caso con visitas familiares ocasionales',
              tip: 'Un sofá cama de calidad en un despacho bien aislado cuesta 1.500 €; una habitación extra vacía cuesta más de 25.000 €.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses adaptado la maqueta digital 3D:',
        budgetResult: '28.000 € ahorrados en hipoteca.',
        weeksResult: '0 semanas perdidas en recalcular la estructura.',
        narrative: 'Habrías resuelto el despacho con un tabique móvil acústico y luz natural sin inflar el tamaño de la casa.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'S1_DISENO_FLEXIBLE',
      label: 'Ajustar la maqueta 3D (Piezas de precisión)',
      subtext: 'Diseñar espacio polivalente sin inflar metros',
      deltaPresupuesto: 0,
      deltaSemanas: 0,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Elena ajusta la distribución en la maqueta digital 3D (como mover piezas de Lego en pantalla): un dormitorio se convierte en estancia dual con aislamiento acústico.',
      partnerReaction: '«¡Qué solución tan inteligente! El despacho queda super luminoso, con silencio absoluto y sin pedir un euro más al banco».',
      parallelOutcome: {
        title: 'Si hubieses inflado los metros sobre la marcha:',
        budgetResult: '+28.000 € de sobrecoste en el préstamo.',
        weeksResult: '+5 semanas de retraso en replantear cimientos.',
        narrative: 'Habrías tenido que recortar en calidad de ventanas y aislamiento para compensar los metros añadidos.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
    isSurpriseCard: true,
  },

  // NIVEL 2: El diseño y las peleas de obra
  {
    id: 'card-level-2',
    level: 2,
    sceneTitle: 'Nivel 2: El Diseño y las Peleas de Obra',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt: '«Tú no te compliques congelando planos. Los arquitectos hacen dibujitos muy monos en el ordenador, pero en la obra mando yo. Vamos levantando el ladrillo y sobre el terreno ya decidimos a ojo los tabiques y los enchufes».',
    detailContext: 'Las decisiones sobre la maqueta digital en pantalla cuestan 0 €; mover un tabique con los tubos ya pasados cuesta miles.',
    phaseAnalogy: {
      title: 'Hacerte un traje a medida cosido a ciegas y rajándolo con tijeras para meter los bolsillos',
      metaphor: 'Un sastre te cose una camisa puesta y luego viene otro ayudante con una cizalla a cortarte la manga porque se le olvidó poner el bolsillo interior.',
      explanation: 'Eso son las "rozas" de la obra tradicional: albañiles haciendo paredes para que al día siguiente venga el fontanero a picarlas a martillazos para pasar cables. En la casa industrializada, cada orificio y conducto viene cortado por robot en fábrica con precisión milimétrica.',
      cases: [
        {
          label: 'Si vas a poner cocina con isla o electrodomésticos especiales',
          tip: 'Fija las tomas de agua y corriente en la maqueta 3D; cuando llegue la estructura encajará sin tener que taladrar suelos acabados.'
        },
        {
          label: 'Si quieres evitar retrasos por lluvia o barro',
          tip: 'La fabricación en seco en taller cerrado no depende de si llueve o hiela en la parcela.'
        },
        {
          label: 'Si buscas acabados perfectos sin grietas',
          tip: 'Los paneles de madera técnica no merman ni se agrietan como los enlucidos húmedos tradicionales.'
        }
      ]
    },
    leftChoice: {
      id: 'L2_SOBRE_LA_MARCHA',
      label: 'Decidir tabiques sobre la marcha',
      subtext: 'Ver las paredes levantadas antes de decidir',
      deltaPresupuesto: -10500,
      deltaSemanas: 5,
      deltaEstres: 25,
      deltaFactura: 10,
      consequenceText: 'El fontanero y el albañil se pelean en la obra: el fontanero pica a martillazos el tabique recién hecho para meter tubos. El albañil se niega a taparlo sin cobrar un suplemento de 3.500 €.',
      partnerReaction: '«He ido a la obra y aquello parecía un campo de batalla: tabiques medio tirados, escombros por el suelo y los operarios echándose la culpa unos a otros...»',
      technicalTip: {
        warning: 'Picar tabiques recién hechos para pasar tubos es el pan de cada día en la obra artesanal.',
        advice: 'En la casa industrializada, cada paso de tubería y cable viene perforado de fábrica en la madera con precisión milimétrica. Cero polvo y cero martillazos.',
        quote: '«Una línea borrada en el ordenador cuesta un clic; una pared tirada a mazo en la obra cuesta tres semanas y mil disgustos».',
        analogy: {
          title: 'El sastre con tijeras vs el corte de precisión por láser',
          story: 'Imagina que pagas por un traje caro y el sastre te lo cose directamente encima; cuando terminas, viene el botones con un cúter a romperte el forro para meter la cartera. Así de absurdo es levantar tabiques de ladrillo sobre la marcha para luego destrozarlos con una radial para pasar tubos de fontanería. En taller industrializado, la madera se corta con tolerancias de 1 milímetro con todas las canalizaciones listas.',
          lesson: 'Resolver cada choque de tuberías en la pantalla ahorra semanas enteras de discusiones en el barro.',
          adaptableAdvice: 'Para tu caso: exige ver el recorrido tridimensional de tuberías y ventilación antes de dar la orden de fabricación; no aceptes "lo vemos in situ".',
          cases: [
            {
              label: 'Caso con suelo radiante o refrescante',
              tip: 'Un tubo perforado por improvisar en obra tradicional exige levantar todo el recrecido; en madera técnica los pasos están sellados.'
            },
            {
              label: 'Caso de distribución abierta salón-cocina',
              tip: 'La extracción de humos y retorno de ventilación deben coordinarse previamente para que los conductos no queden a la vista.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses congelado la maqueta digital de precisión:',
        budgetResult: '10.500 € ahorrados en demoliciones y rozas.',
        weeksResult: '5 semanas de adelanto sin peleas entre gremios.',
        narrative: 'Las paredes de madera técnica habrían llegado a la parcela con todos los tubos canalizados de serie.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L2_CONGELAR_BIM',
      label: 'Cerrar maqueta digital milimétrica',
      subtext: 'Resolver cada tubo y esquina antes de fabricar',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Congelas la maqueta digital completa. Cada orificio, cuadro eléctrico y conducto de ventilación queda ubicado con precisión de relojería antes de cortar la madera.',
      partnerReaction: '«Ver el paseo virtual de la casa nos dio una seguridad increíble. Todo tiene su sitio exacto y no habrá que improvisar nada en el barro».',
      parallelOutcome: {
        title: 'Si hubieses dejado los tabiques a ojo:',
        budgetResult: '+10.500 € en rozas, parches y facturas sorpresa.',
        weeksResult: '+5 semanas de parón por desajustes entre gremios.',
        narrative: 'Habrías tenido que vivir la pesadilla de ver cómo pican paredes que acababas de pagar.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // NIVEL 3: El contrato y las partidas abiertas
  {
    id: 'card-level-3',
    level: 3,
    sceneTitle: 'Nivel 3: El Contrato y las Partidas Abiertas',
    character: CHARACTERS.builder,
    messageType: 'chat',
    prompt: '«Tengo mi presupuesto por mediciones: si el hierro o el cemento suben durante el año, lo vamos ajustando con "precios contradictorios". Es más justo para todos que firmar un precio cerrado fijo».',
    detailContext: 'El clásico truco del presupuesto con partidas abiertas: parece barato al inicio, pero no tiene techo de gasto ni penalización por retrasos.',
    phaseAnalogy: {
      title: 'Subirse a un taxi con taxímetro trucado vs contratar un trayecto con precio cerrado en la app',
      metaphor: 'En un taxi antiguo el chófer puede dar rodeos, alegar que llueve o cobrarte un recargo por equipaje sin avisar; en la app sabes el céntimo exacto y la hora de llegada antes de subirte.',
      explanation: 'Un presupuesto tradicional abierto es un cheque en blanco: si los materiales suben o el constructor calculó mal, te repercute "precios contradictorios" a mitad de obra sabiendo que ya no puedes marcharte. El contrato cerrado llave en mano fija el precio y los plazos ante notario.',
      cases: [
        {
          label: 'Si dependes de la hipoteca del banco',
          tip: 'Los bancos no amplían créditos por encarecimientos de obra. Un desvío de 30.000 € tendrás que pagarlo de tus ahorros o dejar la obra a medias.'
        },
        {
          label: 'Si estás pagando alquiler mientras construyes',
          tip: 'Cada mes de retraso de un constructor tradicional te cuesta la cuota de la hipoteca de carencia más tu alquiler actual.'
        },
        {
          label: 'Si quieres dormir tranquilo por las noches',
          tip: 'El contrato llave en mano de catálogo transfiere el riesgo del precio de los materiales a la empresa fabricante, no a ti.'
        }
      ]
    },
    leftChoice: {
      id: 'L3_OFERTA_BARATA',
      label: 'Presupuesto abierto por mediciones',
      subtext: 'Aceptar ajustes según evolucione la obra',
      deltaPresupuesto: -34000,
      deltaSemanas: 14,
      deltaEstres: 35,
      deltaFactura: 45,
      consequenceText: 'A los 6 meses el constructor alega que los materiales han subido, que la grúa se cobra aparte y que la cubierta tenía "partidas no previstas". Te exige 34.000 € extra o paraliza la obra.',
      partnerReaction: '«Una pregunta: ¿la impermeabilización del tejado estaba incluida o estaba en nuestra imaginación? Porque nos reclaman 15.000 € más o no vuelven el lunes».',
      technicalTip: {
        warning: 'Firmar un presupuesto con partidas abiertas es firmar un cheque en blanco al constructor.',
        advice: 'Exige siempre un contrato con precio cerrado notarial y llave en mano, donde el constructor asuma cualquier fluctuación del mercado de materiales.',
        quote: '«El "precio contradictorio" es el monstruo que se come los ahorros de toda la vida de los autopromotores».',
        analogy: {
          title: 'El taxímetro desbocado en noche de tormenta',
          story: 'Te montas en un taxi para ir al aeropuerto y el conductor te dice: "No te preocupes por la tarifa, según haya atasco ya iremos viendo". A mitad de camino se mete por una carretera secundaria y el contador se dispara al triple. En la obra tradicional, el presupuesto abierto funciona igual: una vez que han vaciado la parcela y tienes zapatas puestas, estás atrapado y te suben el precio un 20% sabiendo que no puedes cambiar de constructor fácilmente.',
          lesson: 'El precio debe ser cerrado y estar vinculado a fechas de entrega con penalizaciones por día de retraso.',
          adaptableAdvice: 'Para tu caso: exige contrato de catálogo llave en mano con desglose transparente y precio sellado notarialmente.',
          cases: [
            {
              label: 'Caso con hipoteca autopromotor',
              tip: 'Presenta al tasador el contrato de precio cerrado; facilitará la tasación inicial al 100% sin reservas de riesgo.'
            },
            {
              label: 'Caso con ahorros justos para muebles',
              tip: 'Los sobrecostes imprevistos de la obra tradicional te obligarán a vivir meses sin muebles o recortar en climatización.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses elegido contrato cerrado de catálogo:',
        budgetResult: '34.000 € de sobrecostes evitados por completo.',
        weeksResult: '3 meses y medio de alquiler puente ahorrados.',
        narrative: 'Habrías firmado con fecha fija de entrega y garantía económica blindada ante el banco.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L3_CONTRATO_CERRADO',
      label: 'Contrato cerrado llave en mano',
      subtext: 'Precio fijo notarial, alcance completo y fecha garantizada',
      deltaPresupuesto: 0,
      deltaSemanas: 6,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText: 'Firmas contrato de catálogo llave en mano con estructura de madera técnica. El precio queda sellado ante notario: ni un euro de desvío y fecha de entrega blindada.',
      partnerReaction: '«Qué alivio monumental. Saber exactamente cuánto vamos a pagar y cuándo nos mudamos nos ha quitado una losa de encima».',
      parallelOutcome: {
        title: 'Si hubieses firmado el presupuesto abierto:',
        budgetResult: '+34.000 € en facturas de sobrecostes imprevisibles.',
        weeksResult: '+14 semanas pagando alquiler e intereses de demora.',
        narrative: 'Habrías vivido con la angustia constante de no saber si el dinero de la hipoteca te iba a alcanzar para terminar la casa.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // CARTA DE IMPREVISTO 2: Entre nivel 3 y 4
  {
    id: 'card-surprise-2',
    level: 3,
    sceneTitle: '🎴 Carta de Imprevisto: La vida también juega',
    character: CHARACTERS.advisor,
    messageType: 'surprise',
    prompt: '«En el diseño del porche podemos integrar un alero o pérgola con cálculo solar: tapará el sol abrasador en agosto pero dejará entrar los rayos cálidos en pleno enero. ¿Lo dejamos incluido?»',
    detailContext: 'Una decisión de física del edificio: confort natural gratuito frente a depender del aire acondicionado de por vida.',
    phaseAnalogy: {
      title: 'Llevar una gorra con visera bajo el sol de mediodía vs ir sin nada y comprar bolsas de hielo para la frente',
      metaphor: 'Una visera bloquea el sol vertical de verano sin taparte la vista. En invierno, cuando el sol va bajo, entra por debajo y te calienta la cara.',
      explanation: 'El alero bioclimático utiliza la inclinación del sol: en julio está a 70° de altura (la sombra cubre el cristal y la casa se mantiene fresca sin gastar electricidad), pero en enero está a 25° (el sol entra hasta el fondo del salón y te calienta gratis). Quitarlo para ahorrar hoy significa pagar 40 € más al mes en luz para siempre.',
      cases: [
        {
          label: 'Si tu parcela está en zona centro o sur calurosa',
          tip: 'La protección solar exterior es la diferencia entre un hogar a 22°C o un horno insoportable en las olas de calor.'
        },
        {
          label: 'Si tienes grandes ventanales al sur u oeste',
          tip: 'Una cortina interior no para el calor: cuando el rayo toca el cristal, el calor ya está dentro. El freno debe estar por fuera.'
        },
        {
          label: 'Si buscas la factura eléctrica más baja posible',
          tip: 'El cálculo solar pasivo sustituye horas y horas de compresor de aire acondicionado.'
        }
      ]
    },
    leftChoice: {
      id: 'S2_QUITAR_PERGOLA',
      label: 'Prescindir del alero solar',
      subtext: 'Ahorrar ese remate exterior hoy',
      deltaPresupuesto: 0,
      deltaSemanas: 0,
      deltaEstres: 10,
      deltaFactura: 35,
      consequenceText: 'Llega el verano y el salón se convierte en un invernadero a 29°C. Tienes que vivir a oscuras con las persianas bajadas y el aire acondicionado zumbando a tope todo el día.',
      partnerReaction: '«Hace un calor insoportable en el salón... vamos a tener que gastarnos 3.000 € en toldos postizos que con el primer vendaval se estropearán».',
      technicalTip: {
        warning: 'Quitar la protección solar pasiva para ahorrar hoy traslada el coste a la factura de la luz para siempre.',
        advice: 'Un alero bien dimensionado utiliza la geometría del cielo: el sol está alto en verano (lo frena) y bajo en invierno (lo deja pasar para calentar gratis la casa).',
        quote: '«La mejor energía es la sombra natural que no gasta ni un vatio».',
        analogy: {
          title: 'La visera de la gorra vs el abanico eléctrico continuo',
          story: 'Caminar a 40°C sin gorra te obliga a echarte agua continuamente en la cara para no marearte. El alero arquitectónico es la visera de tu casa: no consume pilas ni se estropea. En agosto el sol cae a plomo y el alero proyecta una sombra refrescante en tus ventanas. En diciembre, cuando el sol va raso, sus rayos entran por debajo del alero e iluminan y calientan el suelo de madera gratis.',
          lesson: 'El calor que no entra en verano no tienes que gastar dinero en sacarlo con máquinas de aire.',
          adaptableAdvice: 'Para tu caso: calcula la profundidad del alero según tu latitud geográfica; te garantizará sombra completa de junio a septiembre.',
          cases: [
            {
              label: 'Caso de ventanas orientadas al oeste',
              tip: 'El sol de poniente de verano entra muy bajo; complementa el alero con lamas verticales o vegetación de hoja caduca.'
            },
            {
              label: 'Caso en clima de montaña',
              tip: 'Un voladizo optimizado permite maximizar la ganancia térmica solar durante el 70% del año que hace frío.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses incluido la protección solar calculada:',
        budgetResult: 'Salón fresco a 22°C en plena ola de calor sin factura de luz.',
        weeksResult: '0 remates postizos o toldos colgando.',
        narrative: 'La vivienda se habría autorregulado térmicamente aprovechando la inclinación natural del sol.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'S2_INCLUIR_PERGOLA',
      label: 'Integrar alero y porche bioclimático',
      subtext: 'Sombra fresca en verano, calor gratis en invierno',
      deltaPresupuesto: -2500,
      deltaSemanas: 0,
      deltaEstres: -5,
      deltaFactura: -10,
      consequenceText: 'El alero se ensambla con la estructura de madera en taller. En agosto proyecta sombra fresca sobre los ventanales y en enero los rayos calientan el suelo de forma natural.',
      partnerReaction: '«¡Qué gozada de porche! Estamos a 38°C en la calle y dentro se está en la gloria sin haber encendido ningún aparato».',
      parallelOutcome: {
        title: 'Si hubieses prescindido del alero solar:',
        budgetResult: '+35 €/mes en consumo continuo de aire acondicionado.',
        weeksResult: 'Salón sobrecalentado durante toda la época estival.',
        narrative: 'Habrías tenido que vivir en penumbra para que el sol no cociera el interior de la casa.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
    isSurpriseCard: true,
  },

  // NIVEL 4: Las ventanas y el falso ahorro del cuñado
  {
    id: 'card-level-4',
    level: 4,
    sceneTitle: 'Nivel 4: Las Ventanas y las Rendijas Invisibles',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt: '«¿Cintas caras de sellado hermético y la maquinita esa del ventilador en la puerta? ¡Menuda tontería de modernos! Las casas de toda la vida tienen que respirar por las rendijas o te asfixias. Yo os pongo unas ventanas baratas que me saca un amigo con un bote de espuma rápida y arreando».',
    detailContext: 'El 60% del calor de una casa tradicional se escapa por las holguras entre la ventana y la pared, provocando moho negro y corrientes frías.',
    phaseAnalogy: {
      title: 'Llevar un abrigo de plumas de alta montaña con cremallera estanca vs un jersey de punto con agujeros por donde entra el viento',
      metaphor: 'Si sales a una nevada con un jersey de lana gordo pero lleno de agujeros, el viento helado te atraviesa y te congelas aunque el jersey sea caro.',
      explanation: 'Decir que "la casa tiene que respirar por las rendijas" es una justificación para tapar ventanas mal instaladas con espuma cutre. Tu casa debe ser hermética como un anorak de montaña para no perder calor ni tener corrientes en los pies, y debe "respirar" mediante su propio pulmón (ventilación mecánica controlada que purifica y renueva el aire sin enfriar).',
      cases: [
        {
          label: 'Si sufres de alergias o ruidos exteriores',
          tip: 'La hermeticidad con filtros de aire elimina el 95% del polen, el hollín de los coches y el ruido de la calle.'
        },
        {
          label: 'Si quieres evitar condensaciones y moho negro',
          tip: 'El moho aparece donde hay puentes térmicos y corrientes frías; el sellado hermético mantiene las esquinas a temperatura homogénea.'
        },
        {
          label: 'Si quieres facturas de calefacción mínimas',
          tip: 'El calor no se escapa por las rendijas y la casa retiene la temperatura durante horas sin consumir energía.'
        }
      ]
    },
    leftChoice: {
      id: 'L4_ESPUMA_RAPIDA',
      label: 'Aceptar la espuma barata del amigo',
      subtext: 'Ahorrar en sellados y evitar "complicaciones"',
      deltaPresupuesto: -8000,
      deltaSemanas: 2,
      deltaEstres: 30,
      deltaFactura: 65,
      consequenceText: 'La espuma barata se cuartea a los pocos meses con los cambios de temperatura. En invierno entra un silbido de viento helado por el marco y en las esquinas brota moho negro por condensación.',
      partnerReaction: '«Las cortinas se mueven solas con el viento aunque la ventana esté cerrada a cal y canto, y el zócalo de la pared tiene manchas negras de humedad...»',
      technicalTip: {
        warning: 'El mito de que "la casa tiene que respirar por las rendijas" es una excusa para tapar chapuzas de aislamiento.',
        advice: 'Una casa eficiente debe ser hermética como un abrigo de calidad. El aire fresco debe entrar filtrado y controlado por la ventilación inteligente, no colándose por agujeros helados.',
        quote: '«Una ventana cara instalada con un chorro de espuma corriente funciona exactamente igual que una ventana abierta dos dedos».',
        analogy: {
          title: 'El anorak técnico vs el jersey calado en una ventisca',
          story: 'Imagina ponerte un anorak de alta montaña de 500 € pero dejarte la cremallera del pecho abierta de par en par: te congelarás exactamente igual que si fueras en camiseta. En una vivienda, gastarse miles de euros en ventanas de aluminio y rellenar el hueco de la pared con espuma de bote sin cintas elásticas estancas es dejar esa cremallera abierta. El aire helado se cuela, enfría el muro y crea manchas negras de moho tóxico.',
          lesson: 'La hermeticidad no asfixia: la casa ventila continuamente por su sistema mecánico con recuperador de calor.',
          adaptableAdvice: 'Para tu caso: exige la prueba del ventilador en la puerta (test de inflado) antes de colocar los remates para asegurar que el sellado es estanco.',
          cases: [
            {
              label: 'Caso con niños pequeños o asmáticos',
              tip: 'El aire filtrado continuo evita crisis de asma y bronquitis al renovar el CO2 sin abrir ventanas en invierno.'
            },
            {
              label: 'Caso en clima muy húmedo o costero',
              tip: 'La ausencia de corrientes frías en ventanas previene el deterioro de maderas interiores y pinturas.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses exigido el sellado hermético certificado:',
        budgetResult: '0 € en tratamientos antihumedad y pinturas para moho.',
        weeksResult: 'Silencio acústico total frente a la lluvia y el viento.',
        narrative: 'Habrías superado la prueba de inflado de la casa con nota sobresaliente y facturas residuales.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L4_SELLADO_PASSIVHAUS',
      label: 'Sellado hermético continuo (Test de inflado)',
      subtext: 'Cintas elásticas estancas y ventanas de 3 capas aislantes',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Se colocan cintas elásticas continuas y ventanas con 3 cristales aislantes. Se realiza la prueba de inflado hermético de la casa: ¡cero corrientes de aire indeseadas y estanqueidad perfecta!',
      partnerReaction: '«El técnico de la prueba del inflado ha presurizado la casa y no entra ni un hilo de aire por ningún rincón. El silencio dentro es absoluto».',
      parallelOutcome: {
        title: 'Si hubieses aceptado la espuma rápida sin sellado:',
        budgetResult: '+8.000 € en reparar marcos y humedades.',
        weeksResult: '+65 €/mes en calefacción tirada por las rendijas.',
        narrative: 'Habrías convivido con corrientes heladas en los tobillos y manchas de moho en las paredes.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
  },

  // NIVEL 5: La entrega de llaves y el acta de fin de obra
  {
    id: 'card-level-5',
    level: 5,
    sceneTitle: 'Nivel 5: La Entrega de Llaves y el Fin de Obra',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt: '«Fírmame el acta de fin de obra y te doy las llaves ya mismo, que tengo que llevar los peones a otra parcela mañana. Los cuatro remates que quedan sueltos y la máquina de aire ya vendrá un chaval la semana que viene a mirártelo, te doy mi palabra».',
    detailContext: 'El momento más emocionante del proyecto, pero donde se cierran las garantías legales del contrato.',
    phaseAnalogy: {
      title: 'Sacar un coche nuevo del concesionario sin encender el motor ni comprobar los frenos porque tienes prisa por conducirlo',
      metaphor: 'Si sacas el coche a ciegas y en la primera curva no frena o echa humo, el vendedor te dirá que pidas cita para dentro de un mes. Pierdes toda la fuerza.',
      explanation: 'Cuando firmas el fin de obra sin reservas, el banco le entrega al constructor el último 10% de tu dinero que tenía retenido como garantía. Una vez cobrado, sus incentivos para volver a arreglar los fallos caen a cero. La comprobación técnica oficial garantiza que te entreguen una casa terminada y garantizada ante notario.',
      cases: [
        {
          label: 'Si quieres evitar llamadas eternas sin respuesta',
          tip: 'No firmes el acta hasta que cada enchufe, grifo y máquina de ventilación esté probado y funcionando en silencio.'
        },
        {
          label: 'Si quieres conservar el valor de reventa de la casa',
          tip: 'El libro digital del edificio con los certificados energéticos oficiales y esquemas de instalaciones es tu mayor garantía patrimonial.'
        },
        {
          label: 'Si quieres que el constructor cumpla los remates',
          tip: 'La retención del último pago del 5% o 10% es la única herramienta que garantiza que terminen hasta el último detalle.'
        }
      ]
    },
    leftChoice: {
      id: 'L5_ENTRAR_YA',
      label: 'Firmar ya por las prisas de entrar',
      subtext: 'Coger las llaves y confiar en la palabra de Manolo',
      deltaPresupuesto: -6500,
      deltaSemanas: 0,
      deltaEstres: 25,
      deltaFactura: 25,
      consequenceText: 'Firmas el acta sin reservas. El constructor cobra el último pago del banco y ya no contesta al teléfono. El sistema de aire hace un ruido insoportable y tienes que pagar a técnicos externos para calibrarlo.',
      partnerReaction: '«Llevo tres semanas llamando a Manolo y me salta el buzón de voz. Dice la vecina que ya está en otra urbanización y que no piensa volver...»',
      technicalTip: {
        warning: 'Firmar el fin de obra sin repasar la lista de comprobaciones te deja legalmente indefenso.',
        advice: 'No entregues el último pago sin el acta de pruebas técnicas: comprobación de caudal del pulmón de aire, certificado de inflado hermético y entrega del libro de la casa con garantías selladas.',
        quote: '«La emoción de la mudanza no debe nublar la firma del documento más importante de tu inversión».',
        analogy: {
          title: 'El concesionario de coches y el motor que vibra',
          story: 'Vas a recoger tu coche nuevo de paquete, te dan las llaves en mano y el vendedor te dice: "Fírmame aquí que te lo llevas perfecto; si la marcha atrás rasca o el freno vibra, la semana que viene se pasa un mecánico". Si firmas y sales a la calle, el seguro y el concesionario se desentienden. En tu casa, firmar el fin de obra libera la última certificación bancaria: una vez que Manolo cobra, sus teléfonos dejan de dar tono y los remates tendrás que pagarlos tú.',
          lesson: 'La retención del último pago hasta la comprobación final es tu derecho legal y tu único escudo.',
          adaptableAdvice: 'Para tu caso: organiza una visita de 3 horas con tu arquitecto técnico para probar cada instalación antes de firmar la entrega.',
          cases: [
            {
              label: 'Caso con sistema de ventilación inteligente',
              tip: 'Mide que el caudal de impulsión en dormitorios sea exactamente el proyectado y que los filtros estén nuevos.'
            },
            {
              label: 'Caso con certificación Passivhaus',
              tip: 'Exige el certificado emitido por el instituto oficial antes de liquidar los honorarios técnicos finales.'
            }
          ]
        }
      },
      parallelOutcome: {
        title: 'Si hubieses exigido el protocolo de comprobaciones:',
        budgetResult: 'Puesta en marcha perfecta sin gastar un céntimo extra.',
        weeksResult: 'Garantía decenal y libro del edificio entregados en mano.',
        narrative: 'El pulmón de aire habría quedado calibrado en absoluto silencio con sus filtros limpios listos.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L5_VERIFICAR_PROTOCOLOS',
      label: 'Exigir comprobación técnica estricta',
      subtext: 'Revisar certificados, pulmón de aire y garantías selladas',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText: 'Revisas el protocolo oficial completo: caudal del pulmón de aire calibrado en silencio, test de estanqueidad certificado, libro de la vivienda entregado y garantías notariales firmadas.',
      partnerReaction: '«Todo comprobado y sellado. La casa es una maravilla, el aire huele a limpio, no se oye nada de la calle y las llaves son oficialmente nuestras».',
      parallelOutcome: {
        title: 'Si hubieses firmado a ciegas por las prisas:',
        budgetResult: '+6.500 € en arreglos de tu propio bolsillo.',
        weeksResult: 'Semanas de llamadas y discusiones sin respuesta.',
        narrative: 'Habrías tenido que pagar a terceros para arreglar instalaciones mal calibradas cuando ya estabas viviendo dentro.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 5,
  },
];

export function calculatePlayerProfile(history: { chosenOptionId: string; isPassivhausWay?: boolean }[]): PlayerProfile {
  const passivChoices = history.filter((h) => h.isPassivhausWay).length;

  if (passivChoices >= 4) {
    return {
      title: 'Planificador con Visión',
      tagline: '«Anticipar en maqueta es el mayor ahorro de tu vida»',
      description: 'Has entendido que el verdadero ahorro de una casa no está en improvisar en el barro ni en aceptar presupuestos trampa, sino en blindar contratos con precio cerrado, cuidar el abrigo térmico y disfrutar de 30 años de confort a 21°C con facturas de 35 €/mes.',
      badgeEmoji: '🏆',
    };
  }

  if (passivChoices >= 2) {
    return {
      title: 'Explorador de Posibilidades',
      tagline: '«Equilibrio entre prudencia y aprendizaje con lecciones reales»',
      description: 'Has explorado opciones y tomado decisiones pragmáticas. Viviste en carne propia cómo un "ya lo veremos en obra" encarece el presupuesto y comprobaste por qué el sellado hermético y la certeza contractual son indispensables para vivir tranquilo.',
      badgeEmoji: '🧭',
    };
  }

  return {
    title: 'Improvisador Valiente',
    tagline: '«Has vivido la obra tradicional en tus propias carnes»',
    description: 'Comprobaste de primera mano qué pasa cuando se aceptan presupuestos con partidas abiertas o se confía en la espuma rápida del amigo. La gran ventaja: ¡en la vida real puedes elegir el modelo de catálogo con precio notarial antes de poner un solo euro en la parcela!',
    badgeEmoji: '🧱',
  };
}
