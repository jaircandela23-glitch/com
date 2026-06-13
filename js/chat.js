(function(){
'use strict';

/* Datos de negocios */
const BIZDATA = [
  {
    id:0, icon:'💇‍♀️', name:'Salón Diana · Bot IA',
    convo:[
      {from:'client', text:'Hola, ¿tienen cita disponible para mañana?'},
      {from:'bot',    text:'¡Hola! 👋 Bienvenida al Salón Diana. Sí tenemos disponibilidad para mañana. ¿Qué servicio te interesa?\n\n💅 Manicure — S/ 25\n💇‍♀️ Corte + peinado — S/ 45\n✨ Tratamiento keratina — S/ 90', delay:1200},
      {from:'client', text:'Manicure por favor'},
      {from:'bot',    text:'Perfecto 💅 Tenemos estos horarios para mañana:\n\n🕙 10:00 am\n🕑 2:00 pm\n🕓 4:30 pm\n\n¿Cuál te viene mejor?', delay:1000},
      {from:'client', text:'A las 2pm'},
      {from:'bot',    text:'Reservado ✅ Cita para mañana a las 2:00 pm — Manicure S/ 25.\n¿A qué nombre te la registro?', delay:900},
      {from:'client', text:'Lucía Flores'},
      {from:'bot',    text:'Listo Lucía 🌸 Te mando un recordatorio mañana a las 10am. El pago lo puedes hacer en el local o por Yape al 945 366 356.\n\n¡Nos vemos mañana! 😊', delay:1100},
    ],
    flow:[
      {icon:'📱',label:'MENSAJE ENTRA',desc:'Cliente escribe'},
      {icon:'🤖',label:'BOT ANALIZA',desc:'IA entiende intención'},
      {icon:'📅',label:'VE AGENDA',desc:'Horarios en tiempo real'},
      {icon:'✅',label:'CONFIRMA CITA',desc:'Reserva automática'},
      {icon:'🔔',label:'RECORDATORIO',desc:'24h antes auto'},
    ],
    flowRows:[
      {icon:'📱',text:'Mensaje de cliente recibido',status:'✓ RECIBIDO'},
      {icon:'🤖',text:'IA identifica: solicitud de cita',status:'✓ PROCESADO'},
      {icon:'📅',text:'Consulta agenda en tiempo real',status:'✓ DISPONIBLE'},
      {icon:'💬',text:'Responde con opciones de horario',status:'✓ ENVIADO'},
      {icon:'✅',text:'Cliente confirma → cita registrada',status:'✓ RESERVADO'},
      {icon:'🔔',text:'Recordatorio programado: -24h',status:'⏰ PENDIENTE'},
    ],
    roi:[
      {label:'HORAS AHORRADAS / MES',val:'60h+',sub:'En atención manual de mensajes y coordinación de citas',type:'green'},
      {label:'REDUCCIÓN DE AUSENCIAS',val:'-68%',sub:'Por recordatorios automáticos 24h antes de cada cita',type:'green'},
      {label:'COSTO DEL PLAN PROFESIONAL',val:'S/480',sub:'Setup S/380 + mantenimiento S/100 primer mes',type:'red'},
      {label:'INGRESO RECUPERADO / MES',val:'S/900+',sub:'Solo con 3 citas adicionales diarias por atención 24/7',type:'green'},
    ],
    roiBar:{label:'TIEMPO DE RETORNO DE INVERSIÓN',fill:85,left:'Inversión inicial',right:'Recuperada en ~3 semanas'},
  },
  {
    id:1, icon:'🌸', name:'Floristería Primavera · Bot IA',
    convo:[
      {from:'client', text:'Buenas, ¿tienen arreglos para aniversario?'},
      {from:'bot',    text:'¡Hola! 🌸 Bienvenida a Floristería Primavera. Sí, tenemos hermosos arreglos para aniversario:\n\n💐 Básico — S/ 45\n🌹 Premium con rosas — S/ 75\n👑 Deluxe con caja — S/ 120\n\n¿Cuál te interesa?', delay:1100},
      {from:'client', text:'El Premium de rosas'},
      {from:'bot',    text:'Excelente elección 🌹 ¿Lo quieres con dedicatoria personalizada? También podemos agregar globos por S/ 15 extra o peluche por S/ 20.', delay:1000},
      {from:'client', text:'Solo el arreglo con dedicatoria, sin extras'},
      {from:'bot',    text:'Perfecto ✅ Arreglo Premium + dedicatoria — S/ 75.\n\n¿Para qué fecha y hora lo necesitas?\n¿Lo recoges en tienda o necesitas delivery?', delay:1000},
      {from:'client', text:'Para mañana al mediodía, delivery a Miraflores'},
      {from:'bot',    text:'Coordinado 🚀 Delivery a Miraflores — costo S/ 10 adicional. Total: S/ 85.\n\nPaga por Yape al 945 366 356 y envíanos el voucher. ¡El arreglo queda con su nombre y dedicatoria! 💐', delay:1200},
    ],
    flow:[
      {icon:'💬',label:'CONSULTA',desc:'Cliente pregunta'},
      {icon:'🛍️',label:'CATÁLOGO',desc:'Bot muestra opciones'},
      {icon:'✍️',label:'PERSONALIZA',desc:'Nombre · dedicatoria'},
      {icon:'💳',label:'PAGO YAPE',desc:'Confirma automático'},
      {icon:'🚚',label:'COORDINA',desc:'Entrega notificada'},
    ],
    flowRows:[
      {icon:'💬',text:'Consulta sobre arreglos recibida',status:'✓ ATENDIDO'},
      {icon:'🛍️',text:'Catálogo enviado automáticamente',status:'✓ ENVIADO'},
      {icon:'✅',text:'Cliente elige: Premium S/75',status:'✓ SELECCIONADO'},
      {icon:'💳',text:'Solicitud de pago Yape enviada',status:'✓ SOLICITADO'},
      {icon:'📸',text:'Cliente envía voucher → verificado',status:'✓ CONFIRMADO'},
      {icon:'🚚',text:'Orden creada → delivery coordinado',status:'⏰ EN PROCESO'},
    ],
    roi:[
      {label:'PEDIDOS EXTRA POR FECHAS ESPECIALES',val:'+35%',sub:'Por alertas automáticas a clientes antes de Día de la Madre, San Valentín, etc.',type:'green'},
      {label:'TIEMPO EN COORDINACIÓN DE PEDIDOS',val:'-80%',sub:'Proceso de pedido, pago y confirmación completamente automatizado',type:'green'},
      {label:'INVERSIÓN PLAN PROFESIONAL',val:'S/480',sub:'Mes 1 incluyendo setup y mantenimiento',type:'red'},
      {label:'INGRESO ADICIONAL ESTIMADO',val:'S/1,200+',sub:'En fechas especiales con 15 pedidos adicionales promedio',type:'green'},
    ],
    roiBar:{label:'IMPACTO EN FECHAS ESPECIALES',fill:92,left:'Sin AutoFlow',right:'Con AutoFlow: +35% pedidos'},
  },
  {
    id:2, icon:'🍕', name:'Pizzería Don Marco · Bot IA',
    convo:[
      {from:'client', text:'Quiero pedir una pizza familiar'},
      {from:'bot',    text:'¡Hola! 🍕 Bienvenido a Pizzería Don Marco. Aquí nuestras familiares:\n\n🍕 Hawaiana — S/ 42\n🍕 Pepperoni — S/ 45\n🍕 Especial Don Marco — S/ 52\n🍕 Vegetariana — S/ 38\n\n¿Cuál te llama más?', delay:1000},
      {from:'client', text:'La especial Don Marco'},
      {from:'bot',    text:'Excelente elección 🌟 Pizza Especial Don Marco — S/ 52.\n¿Para recoger en tienda o prefieres delivery?\n\n📍 Recojo (listo en 20 min)\n🛵 Delivery +S/ 8 (35-45 min)', delay:1000},
      {from:'client', text:'Delivery, estoy en San Isidro'},
      {from:'bot',    text:'Cubrimos San Isidro ✅ Total: S/ 60. Paga por Yape al 945 366 356 y mándanos el voucher.\n\nEn cuanto confirmemos, tu pizza entra a producción. ¡En ~40 minutos está en tu puerta! 🚀', delay:1100},
      {from:'client', text:'Listo, ya yapié'},
      {from:'bot',    text:'¡Pago recibido ✅! Tu pedido está en preparación. Te avisamos cuando salga el repartidor con el link de seguimiento. ¡Buen provecho! 🍕', delay:800},
    ],
    flow:[
      {icon:'📋',label:'TOMA PEDIDO',desc:'Menú digital'},
      {icon:'📍',label:'VERIFICA ZONA',desc:'Cobertura delivery'},
      {icon:'💳',label:'PAGO',desc:'Yape confirmado'},
      {icon:'👨‍🍳',label:'PRODUCCIÓN',desc:'Notifica cocina'},
      {icon:'🛵',label:'SEGUIMIENTO',desc:'Updates al cliente'},
    ],
    flowRows:[
      {icon:'📋',text:'Pedido tomado: Pizza Especial S/52',status:'✓ REGISTRADO'},
      {icon:'📍',text:'Zona de delivery verificada: San Isidro',status:'✓ COBERTURA OK'},
      {icon:'💳',text:'Pago Yape S/60 recibido y verificado',status:'✓ CONFIRMADO'},
      {icon:'👨‍🍳',text:'Orden enviada a cocina automáticamente',status:'✓ EN COCINA'},
      {icon:'🛵',text:'Repartidor asignado → cliente notificado',status:'⏰ EN CAMINO'},
      {icon:'⭐',text:'Post-entrega: encuesta satisfacción',status:'⏰ PROGRAMADO'},
    ],
    roi:[
      {label:'PEDIDOS SIN ERRORES',val:'100%',sub:'El bot toma el pedido exacto, sin malentendidos por teléfono',type:'green'},
      {label:'TIEMPO DE ATENCIÓN POR PEDIDO',val:'-90%',sub:'De 8 minutos manual a menos de 1 minuto automatizado',type:'green'},
      {label:'INVERSIÓN PLAN PROFESIONAL',val:'S/480',sub:'Setup S/380 + mantenimiento S/100 primer mes',type:'red'},
      {label:'PEDIDOS EXTRA POR HORARIO NOCTURNO',val:'+20%',sub:'Atención hasta las 11pm sin personal adicional',type:'green'},
    ],
    roiBar:{label:'REDUCCIÓN EN TIEMPO DE ATENCIÓN POR PEDIDO',fill:90,left:'Manual: 8 min/pedido',right:'AutoFlow: &lt;1 min/pedido'},
  },
  {
    id:3, icon:'🏥', name:'Consultorio Dra. García · Bot IA',
    convo:[
      {from:'client', text:'Buenas tardes, necesito una cita con la doctora'},
      {from:'bot',    text:'Buenas tardes 👋 Bienvenido al Consultorio Dra. García. Con gusto te ayudo a agendar tu cita.\n\n¿Es tu primera consulta o ya tienes historial con nosotros?', delay:1200},
      {from:'client', text:'Primera vez'},
      {from:'bot',    text:'Perfecto. Tenemos disponibilidad esta semana:\n\n📅 Miércoles 15 · 10:00 am\n📅 Jueves 16 · 3:00 pm\n📅 Viernes 17 · 9:00 am\n\n¿Qué horario te acomoda?', delay:1100},
      {from:'client', text:'El jueves a las 3pm'},
      {from:'bot',    text:'Cita confirmada ✅ Jueves 16 a las 3:00 pm.\n¿Tu nombre completo para el registro?', delay:900},
      {from:'client', text:'Marco Antonio Torres'},
      {from:'bot',    text:'Registrado Marco 🩺 El día anterior recibirás un recordatorio con las indicaciones previas. Consulta: S/ 80 — puedes pagar al llegar o por Yape.\n\nSi necesitas cancelar o reprogramar, escríbenos con 24h de anticipación. ¡Hasta el jueves!', delay:1300},
    ],
    flow:[
      {icon:'📅',label:'SOLICITUD',desc:'Pide cita por WA'},
      {icon:'🗓️',label:'DISPONIBILIDAD',desc:'Agenda en tiempo real'},
      {icon:'📝',label:'REGISTRO',desc:'Datos del paciente'},
      {icon:'✅',label:'CONFIRMACIÓN',desc:'Cita reservada'},
      {icon:'🔔',label:'RECORDATORIO',desc:'-24h + indicaciones'},
    ],
    flowRows:[
      {icon:'📅',text:'Solicitud de cita recibida',status:'✓ RECIBIDO'},
      {icon:'🗓️',text:'Disponibilidad consultada: 3 opciones',status:'✓ DISPONIBLE'},
      {icon:'📝',text:'Datos del paciente registrados',status:'✓ GUARDADO'},
      {icon:'✅',text:'Cita confirmada: Jueves 16 · 3:00 pm',status:'✓ AGENDADO'},
      {icon:'🔔',text:'Recordatorio + indicaciones: -24h',status:'⏰ PROGRAMADO'},
      {icon:'📊',text:'Historial de cita agregado al reporte',status:'✓ REGISTRADO'},
    ],
    roi:[
      {label:'REDUCCIÓN DE AUSENCIAS',val:'-70%',sub:'Recordatorios automáticos + confirmación obligatoria el día anterior',type:'green'},
      {label:'TIEMPO SECRETARIA EN CITAS',val:'-85%',sub:'Todo el proceso de agendamiento completamente automatizado',type:'green'},
      {label:'INVERSIÓN PLAN PROFESIONAL',val:'S/480',sub:'Setup S/380 + mantenimiento S/100 primer mes',type:'red'},
      {label:'INGRESO RECUPERADO / MES',val:'S/800+',sub:'Solo con 10 citas menos perdidas a S/80 promedio',type:'green'},
    ],
    roiBar:{label:'RECUPERACIÓN DE INVERSIÓN',fill:88,left:'Mes 1: recuperas S/800+',right:'ROI positivo desde semana 3'},
  },
  {
    id:4, icon:'🛍️', name:'Tienda ModaLima · Bot IA',
    convo:[
      {from:'client', text:'Hola, ¿tienen vestidos de verano?'},
      {from:'bot',    text:'¡Hola! 👗 Bienvenida a ModaLima. Sí, tenemos nueva colección de verano recién llegada:\n\n🌸 Vestidos casual — desde S/ 45\n✨ Vestidos de noche — desde S/ 85\n☀️ Vestidos playa — desde S/ 55\n\n¿Qué estilo buscas?', delay:1100},
      {from:'client', text:'Casual, talla M'},
      {from:'bot',    text:'Perfecto 😊 En casual talla M tenemos 8 modelos disponibles ahora mismo. Te mando las fotos por aquí en un momento.\n\n¿Tienes preferencia de color?', delay:1000},
      {from:'client', text:'Colores claros, pastel'},
      {from:'bot',    text:'Tengo 3 opciones en pastel talla M:\n\n🌷 Vestido rosa — S/ 48\n💙 Vestido celeste — S/ 52\n🤍 Vestido blanco off — S/ 45\n\n¿Cuál te interesa? Puedo separártelo hoy con el 50% de adelanto por Yape.', delay:1200},
    ],
    flow:[
      {icon:'🔍',label:'CONSULTA STOCK',desc:'Disponibilidad real'},
      {icon:'🛍️',label:'MUESTRA CATÁLOGO',desc:'Fotos + precios'},
      {icon:'❤️',label:'CLIENTE ELIGE',desc:'Talla · color'},
      {icon:'💳',label:'SEPARADO / PAGO',desc:'Yape · Plin'},
      {icon:'📦',label:'NOTIFICA ENVÍO',desc:'Tracking automático'},
    ],
    flowRows:[
      {icon:'🔍',text:'Consulta de stock: vestidos talla M',status:'✓ VERIFICADO'},
      {icon:'🛍️',text:'Catálogo filtrado enviado al cliente',status:'✓ ENVIADO'},
      {icon:'❤️',text:'Cliente interesada en vestido celeste S/52',status:'✓ SELECCIONADO'},
      {icon:'💳',text:'Adelanto 50% solicitado: S/26 Yape',status:'✓ SOLICITADO'},
      {icon:'📦',text:'Separado registrado en inventario',status:'⏰ PENDIENTE PAGO'},
      {icon:'🚚',text:'Envío coordinado al confirmar pago total',status:'⏰ PENDIENTE'},
    ],
    roi:[
      {label:'VENTAS FUERA DE HORARIO',val:'+40%',sub:'Atención automática hasta las 11pm sin personal adicional',type:'green'},
      {label:'TIEMPO EN ATENCIÓN DE CONSULTAS',val:'-75%',sub:'Consultas de stock, tallas y precios resueltas automáticamente',type:'green'},
      {label:'INVERSIÓN PLAN PROFESIONAL',val:'S/480',sub:'Setup S/380 + mantenimiento S/100 primer mes',type:'red'},
      {label:'VENTAS RECUPERADAS / MES',val:'S/1,500+',sub:'Clientes que antes no recibían respuesta inmediata y compraban en otro lado',type:'green'},
    ],
    roiBar:{label:'IMPACTO EN VENTAS NOCTURNAS (después 6pm)',fill:78,left:'Sin AutoFlow: 0 ventas',right:'Con AutoFlow: +40% ventas nocturnas'},
  }
];

let currentBiz = 0;
let currentTab = 'chat';
let chatTimeouts = [];
let roiAnimated = false;

/* Render chat */
function renderChat(bizIdx){
  const chat = document.getElementById('af-chat-area');
  const biz  = BIZDATA[bizIdx];
  chat.innerHTML = '';
  chatTimeouts.forEach(clearTimeout);
  chatTimeouts = [];

  document.getElementById('af-wa-name').textContent = biz.name;
  document.getElementById('af-wa-icon').textContent = biz.icon;

  let delay = 300;
  biz.convo.forEach((msg) => {
    const d = delay;
    const t = chatTimeouts.length;
    chatTimeouts.push(setTimeout(() => {
      // Typing indicator for bot
      if(msg.from === 'bot'){
        const typ = document.createElement('div');
        typ.className = 'af-msg-row bot'; typ.id = 'af-typing-ind';
        typ.innerHTML = '<div class="af-typing"><span></span><span></span><span></span></div>';
        chat.appendChild(typ); chat.scrollTop = chat.scrollHeight;

        chatTimeouts.push(setTimeout(() => {
          const ind = document.getElementById('af-typing-ind');
          if(ind) ind.remove();
          addBubble(chat, msg);
        }, msg.delay || 1000));
      } else {
        addBubble(chat, msg);
      }
    }, d));
    delay += (msg.delay || 900) + 600;
  });
}

function addBubble(chat, msg){
  const now  = new Date();
  const time = now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();
  const row  = document.createElement('div');
  row.className = 'af-msg-row ' + msg.from;
  const bub = document.createElement('div');
  bub.className = 'af-bubble ' + msg.from;
  bub.textContent = msg.text;
  bub.style.whiteSpace = 'pre-line';
  const t = document.createElement('div');
  t.className = 'af-bubble-time';
  t.textContent = time + (msg.from==='bot' ? ' · Bot IA' : '');
  row.appendChild(bub); row.appendChild(t);
  chat.appendChild(row); chat.scrollTop = chat.scrollHeight;
}

/* Render flujo */
function renderFlow(bizIdx){
  const biz = BIZDATA[bizIdx];
  const stepsEl = document.getElementById('af-flow-steps');
  const visEl   = document.getElementById('af-flow-visual');

  stepsEl.innerHTML = biz.flow.map(s => `
    <div class="af-flow-step">
      <div class="af-flow-node">${s.icon}</div>
      <div class="af-flow-label">${s.label}</div>
      <div class="af-flow-desc">${s.desc}</div>
    </div>
  `).join('');

  visEl.innerHTML = biz.flowRows.map((r, i) => `
    <div class="af-flow-row ${i < 4 ? 'active-row' : ''}" id="afr-${i}">
      <div class="af-flow-row-icon">${r.icon}</div>
      <div style="flex:1;font-family:var(--fs);font-size:.78rem">${r.text}</div>
      <div class="af-flow-row-status">${i < 4 ? r.status : r.status}</div>
    </div>
  `).join('');

  // Animate rows progressively
  let i = 4;
  const interval = setInterval(() => {
    const el = document.getElementById('afr-' + i);
    if(el){ el.classList.add('active-row'); i++; }
    if(i >= biz.flowRows.length) clearInterval(interval);
  }, 800);
}

/* Render ROI */
function renderROI(bizIdx){
  const biz = BIZDATA[bizIdx];
  const grid = document.getElementById('af-roi-cards');
  const bar  = document.getElementById('af-roi-bar');

  grid.innerHTML = biz.roi.map(r => `
    <div class="af-roi-card ${r.type}">
      <div class="af-roi-label">${r.label}</div>
      <div class="af-roi-value">${r.val}</div>
      <div class="af-roi-sub">${r.sub}</div>
    </div>
  `).join('');

  bar.innerHTML = `
    <div class="af-roi-bar-label">// ${biz.roiBar.label}</div>
    <div class="af-roi-progress">
      <div class="af-roi-fill" id="af-roi-fill" style="width:0%"></div>
    </div>
    <div class="af-roi-prog-label">
      <span>${biz.roiBar.left}</span>
      <span>${biz.roiBar.right}</span>
    </div>
  `;

  setTimeout(() => {
    const fill = document.getElementById('af-roi-fill');
    if(fill) fill.style.width = biz.roiBar.fill + '%';
  }, 200);
}

/* Casos de uso */
const CASES = [
  {
    tab:'💇‍♀️ Salón', title:'Salón de Belleza / Spa / Barbería',
    desc:'Los salones pierden entre 20% y 40% de sus citas por ausencias y mal coordinación. Con AutoFlow, la reserva es instantánea, el recordatorio automático y el pago confirmado antes de que el cliente llegue.',
    autos:[
      {t:'Bot reserva citas 24/7 por WhatsApp',s:'El cliente elige horario sin llamadas ni esperas'},
      {t:'Recordatorio automático 24h antes',s:'Con confirmación obligatoria para reducir ausencias'},
      {t:'Confirmación de pago por Yape / Plin',s:'El adelanto queda registrado automáticamente'},
      {t:'Lista de espera inteligente',s:'Si alguien cancela, el siguiente en lista recibe oferta'},
      {t:'Post-visita: solicitud de reseña Google',s:'Construye reputación online automáticamente'},
    ],
    metrics:[{v:'3h',l:'AHORRADAS/DÍA'},{v:'-68%',l:'AUSENCIAS'},{v:'+45%',l:'RESEÑAS'}],
    flowRows:[
      {icon:'📱',text:'Cliente escribe a las 10:47pm',active:true},
      {icon:'🤖',text:'Bot responde en 2 segundos',active:true},
      {icon:'📅',text:'Muestra horarios disponibles mañana',active:true},
      {icon:'✅',text:'Cita reservada · pago Yape solicitado',active:true},
      {icon:'🔔',text:'Recordatorio programado: -24h auto',active:false},
      {icon:'⭐',text:'Post-visita: reseña Google solicitada',active:false},
    ]
  },
  {
    tab:'🌸 Floristería', title:'Floristería / Regalos / Eventos',
    desc:'Las florerías tienen picos brutales en fechas especiales. Sin automatización, pierden pedidos porque no pueden atender todo. Con AutoFlow, el sistema atiende a todos simultáneamente.',
    autos:[
      {t:'Catálogo interactivo por WhatsApp',s:'Con fotos, precios y disponibilidad en tiempo real'},
      {t:'Pedido completo sin llamadas',s:'Desde la elección hasta el pago en la misma conversación'},
      {t:'Alertas automáticas a clientes frecuentes',s:'7 días antes de Día de la Madre, San Valentín, etc.'},
      {t:'Seguimiento de entrega automático',s:'El cliente sabe en todo momento dónde está su pedido'},
      {t:'Recompra inteligente',s:'Recordatorio anual para aniversarios y fechas repetidas'},
    ],
    metrics:[{v:'+35%',l:'PEDIDOS ESPECIALES'},{v:'0',l:'PEDIDOS PERDIDOS'},{v:'-80%',l:'TIEMPO/PEDIDO'}],
    flowRows:[
      {icon:'🌸',text:'Cliente consulta arreglos de aniversario',active:true},
      {icon:'📸',text:'Catálogo con fotos enviado automáticamente',active:true},
      {icon:'✅',text:'Cliente elige Premium S/75',active:true},
      {icon:'💳',text:'Pago Yape recibido y verificado',active:true},
      {icon:'📦',text:'Orden creada en sistema automáticamente',active:false},
      {icon:'🚚',text:'Notificación de entrega enviada al cliente',active:false},
    ]
  },
  {
    tab:'🍕 Restaurante', title:'Restaurante / Delivery / Cafetería',
    desc:'Tomar pedidos por WhatsApp consume tiempo y genera errores. AutoFlow convierte cada conversación en un pedido perfectamente registrado — sin intermediarios ni malentendidos.',
    autos:[
      {t:'Menú digital interactivo por WhatsApp',s:'Con fotos, precios y combos del día actualizables'},
      {t:'Toma de pedido sin errores',s:'El bot confirma cada ítem antes de procesar'},
      {t:'Verificación de pago Yape en tiempo real',s:'El pedido entra a cocina solo cuando el pago está confirmado'},
      {t:'Tiempo estimado de entrega automático',s:'El cliente sabe cuánto esperar sin preguntar'},
      {t:'Encuesta de satisfacción post-pedido',s:'Más reseñas de 5 estrellas en Google Maps'},
    ],
    metrics:[{v:'100%',l:'PEDIDOS SIN ERRORES'},{v:'+20%',l:'PEDIDOS NOCTURNOS'},{v:'-90%',l:'TIEMPO/ATENCIÓN'}],
    flowRows:[
      {icon:'🍕',text:'Pedido recibido por WhatsApp',active:true},
      {icon:'📋',text:'Bot confirma ítems con el cliente',active:true},
      {icon:'💳',text:'Pago Yape verificado automáticamente',active:true},
      {icon:'👨‍🍳',text:'Orden enviada a cocina → producción',active:true},
      {icon:'🛵',text:'Repartidor asignado · cliente notificado',active:false},
      {icon:'⭐',text:'Encuesta enviada 30 min post-entrega',active:false},
    ]
  },
  {
    tab:'🏥 Consultorio', title:'Consultorio / Clínica / Centro de Salud',
    desc:'El 30% de las citas médicas se pierden por no-shows. El bot de AutoFlow no solo recuerda la cita — también pide confirmación activa y puede reprogramar si el paciente cancela a tiempo.',
    autos:[
      {t:'Agendamiento de citas 24/7',s:'Pacientes reservan fuera de horario de oficina'},
      {t:'Recordatorio + indicaciones previas',s:'Qué traer, si venir en ayunas, cómo llegar'},
      {t:'Confirmación activa obligatoria',s:'El paciente debe responder para conservar su cita'},
      {t:'Reprogramación automática si cancela',s:'El slot se libera y se ofrece al siguiente en lista'},
      {t:'Seguimiento post-consulta',s:'Recordatorio de medicación o próxima cita programada'},
    ],
    metrics:[{v:'-70%',l:'AUSENCIAS'},{v:'-85%',l:'TRABAJO SECRETARIA'},{v:'S/800+',l:'INGRESO RECUPERADO'}],
    flowRows:[
      {icon:'📅',text:'Paciente agenda cita a las 11pm',active:true},
      {icon:'📝',text:'Datos registrados automáticamente',active:true},
      {icon:'🔔',text:'Recordatorio + indicaciones: -24h',active:true},
      {icon:'✅',text:'Paciente confirma · cita asegurada',active:true},
      {icon:'🩺',text:'Historial actualizado post-consulta',active:false},
      {icon:'💊',text:'Recordatorio de medicación programado',active:false},
    ]
  },
  {
    tab:'🛍️ Tienda', title:'Tienda / E-commerce / Moda',
    desc:'El 40% de las ventas online se pierden porque el cliente no recibe respuesta inmediata. Con AutoFlow, tu tienda atiende a las 11pm con la misma calidad que en horario de trabajo.',
    autos:[
      {t:'Catálogo con stock en tiempo real',s:'El cliente sabe si hay disponibilidad antes de interesarse'},
      {t:'Asesoría de tallas y colores por chat',s:'El bot hace las preguntas correctas para dar la recomendación'},
      {t:'Separado con adelanto Yape',s:'Reserva el producto con pago parcial para asegurar la venta'},
      {t:'Seguimiento del pedido en WhatsApp',s:'Desde despacho hasta entrega con updates automáticos'},
      {t:'Recuperación de carritos abandonados',s:'Si el cliente no completó la compra, el bot hace seguimiento'},
    ],
    metrics:[{v:'+40%',l:'VENTAS NOCTURNAS'},{v:'-75%',l:'CONSULTAS MANUALES'},{v:'S/1,500+',l:'VENTAS RECUPERADAS'}],
    flowRows:[
      {icon:'🔍',text:'Consulta de stock recibida a las 9:30pm',active:true},
      {icon:'👗',text:'Catálogo filtrado por talla y color',active:true},
      {icon:'❤️',text:'Cliente elige: vestido celeste talla M',active:true},
      {icon:'💳',text:'Adelanto 50% por Yape — separado',active:true},
      {icon:'📦',text:'Producto reservado en inventario',active:false},
      {icon:'🚚',text:'Envío coordinado · tracking enviado',active:false},
    ]
  }
];

function renderCases(){
  const tabsEl   = document.getElementById('af-case-tabs');
  const panelsEl = document.getElementById('af-case-panels');

  tabsEl.innerHTML = CASES.map((c,i) => `
    <button class="af-case-tab ${i===0?'active':''}" onclick="afCaseTab(${i})">
      ${c.tab}
    </button>
  `).join('');

  panelsEl.innerHTML = CASES.map((c,i) => `
    <div class="af-case-panel ${i===0?'active':''}" id="afcp-${i}">
      <div class="af-case-info">
        <h3 class="af-case-title">${c.title}</h3>
        <p class="af-case-desc">${c.desc}</p>
        <div class="af-case-autos">
          ${c.autos.map(a=>`
            <div class="af-case-auto">
              <div class="af-auto-dot"></div>
              <div>
                <div class="af-auto-title">${a.t}</div>
                <div class="af-auto-sub">${a.s}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="af-case-result">
          <div class="af-result-label">// RESULTADOS ESPERADOS</div>
          <div class="af-result-metrics">
            ${c.metrics.map(m=>`
              <div class="af-metric">
                <div class="af-metric-val">${m.v}</div>
                <div class="af-metric-lbl">${m.l}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="af-case-visual">
        <div class="af-visual-bar">
          <div class="af-visual-dot"></div>
          AutoFlow · Flujo en tiempo real
        </div>
        <div class="af-visual-body">
          <div class="af-flow-mini">
            ${c.flowRows.map((r,ri)=>`
              <div class="af-flow-row ${r.active?'active-row':''}">
                <div class="af-flow-row-icon">${r.icon}</div>
                <div style="flex:1;font-family:var(--fs);font-size:.75rem;color:${r.active?'var(--tx)':'var(--txd)'}">${r.text}</div>
                <div class="af-flow-row-status" style="${r.active?'background:rgba(0,255,136,.1);color:var(--af);border:1px solid rgba(0,255,136,.2);font-family:var(--fm);font-size:.52rem;padding:2px 8px;border-radius:4px':'font-family:var(--fm);font-size:.52rem;color:var(--txd);padding:2px 8px'}">
                  ${r.active?'✓ ACTIVO':'◌ PENDIENTE'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.afCaseTab = function(idx){
  document.querySelectorAll('.af-case-tab').forEach((b,i) => b.classList.toggle('active', i===idx));
  document.querySelectorAll('.af-case-panel').forEach((p,i) => p.classList.toggle('active', i===idx));
};

/* Selección de negocio en demo */
window.afSelectBiz = function(idx, btn){
  document.querySelectorAll('.af-biz-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentBiz = idx;
  if(currentTab === 'chat') renderChat(idx);
  else if(currentTab === 'flow') renderFlow(idx);
  else renderROI(idx);
};

/* Tabs de demo */
window.afTab = function(tab, btn){
  document.querySelectorAll('.af-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.af-tab-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('af-pane-' + tab).classList.add('active');
  currentTab = tab;
  if(tab === 'chat')  renderChat(currentBiz);
  if(tab === 'flow')  renderFlow(currentBiz);
  if(tab === 'roi')   renderROI(currentBiz);
};

/* Mensaje libre del usuario */
window.afUserSend = function(){
  const inp = document.getElementById('af-chat-inp');
  const txt = inp.value.trim();
  if(!txt) return;
  inp.value = '';
  const chat = document.getElementById('af-chat-area');
  addBubble(chat, {from:'client', text:txt});

  // Typing
  setTimeout(() => {
    const typ = document.createElement('div');
    typ.className = 'af-msg-row bot'; typ.id = 'af-typing-free';
    typ.innerHTML = '<div class="af-typing"><span></span><span></span><span></span></div>';
    chat.appendChild(typ); chat.scrollTop = chat.scrollHeight;

    const replies = [
      'Entendido 👍 ¿Me puedes dar más detalles para ayudarte mejor?',
      '¡Perfecto! Déjame verificar esa información para ti...',
      'Con gusto te ayudo con eso. ¿Tienes alguna preferencia adicional?',
      'Anotado ✅ En un momento te doy la información que necesitas.',
      '¡Hola! Gracias por escribirnos. ¿En qué más puedo ayudarte?'
    ];
    setTimeout(() => {
      const ind = document.getElementById('af-typing-free');
      if(ind) ind.remove();
      addBubble(chat, {from:'bot', text: replies[Math.floor(Math.random()*replies.length)]});
    }, 1400);
  }, 600);
};

/* Init */
renderCases();
renderChat(0);

})();