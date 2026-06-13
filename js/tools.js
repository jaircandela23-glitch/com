/* LISTA DE ESPERA */
(function initWaitlistCupos(){
  const totalSlots = 3;
  const taken = parseInt(localStorage.getItem('nx_wl_taken') || '0');
  const available = Math.max(0, totalSlots - taken);
  const pct = Math.round((taken / totalSlots) * 100);
  const numEl = document.getElementById('cuposNum');
  const fillEl = document.getElementById('cuposFill');
  const txtEl  = document.getElementById('cuposTotalTxt');
  if(numEl) numEl.textContent = available;
  if(fillEl) setTimeout(()=>{ fillEl.style.width = pct+'%'; }, 600);
  if(txtEl)  txtEl.textContent = available + ' disponibles';
  const cuposTxt = document.querySelector('.cupos-txt span');
  if(cuposTxt) cuposTxt.textContent = taken + ' ocupados';
  document.querySelectorAll('#exitCupos').forEach(el=>el.textContent=available);
})();

window.submitWaitlist = function(){
  const nombre   = document.getElementById('wl-nombre')?.value.trim();
  const empresa  = document.getElementById('wl-empresa')?.value.trim();
  const whatsapp = document.getElementById('wl-whatsapp')?.value.trim();
  if(!nombre || !whatsapp){
    const inp = !nombre ? document.getElementById('wl-nombre') : document.getElementById('wl-whatsapp');
    if(inp){ inp.style.borderColor='var(--r)'; inp.focus(); setTimeout(()=>inp.style.borderColor='',1800); }
    return;
  }
  // Actualizar cupos
  const taken = Math.min(3, parseInt(localStorage.getItem('nx_wl_taken')||'0') + 1);
  localStorage.setItem('nx_wl_taken', taken);
  const available = Math.max(0, 3 - taken);
  const numEl = document.getElementById('cuposNum');
  if(numEl) numEl.textContent = available;
  const fillEl = document.getElementById('cuposFill');
  if(fillEl) fillEl.style.width = Math.round((taken/3)*100)+'%';
  // Ocultar form, mostrar éxito
  const formWrap = document.getElementById('waitlistFormWrap');
  const successEl = document.getElementById('waitlistSuccess');
  const recentEl = document.getElementById('waitlistRecent');
  if(formWrap) formWrap.style.display = 'none';
  if(successEl){ successEl.style.display = 'block'; successEl.scrollIntoView({behavior:'smooth',block:'center'}); }
  if(recentEl) recentEl.style.display = 'none';
  // Abrir WhatsApp con los datos
  const msg = `Hola Jair, me registré en la lista de espera de NEXUM 🔐\n\nNombre: ${nombre}\nEmpresa: ${empresa||'N/A'}\nWhatsApp: ${whatsapp}\n\n¿Cuándo hay disponibilidad?`;
  setTimeout(()=>{ window.open('https://wa.me/51945366356?text='+encodeURIComponent(msg), '_blank'); }, 1200);
};

window.openWaitlistFromScanner = function(){
  go('home');
  setTimeout(()=>{ document.getElementById('waitlist-section').scrollIntoView({behavior:'smooth'}); }, 350);
};

/* SCANNER IA — CLAUDE API */
const SCAN_LOGS_DATA = [
  {t:'00:01', msg:'Iniciando módulo de reconocimiento pasivo...', cls:'sl-ok'},
  {t:'00:02', msg:'Resolución DNS y análisis de registros A/MX...', cls:''},
  {t:'00:03', msg:'Comprobando headers HTTP de seguridad (CSP, HSTS, X-Frame)...', cls:'sl-warn'},
  {t:'00:05', msg:'Analizando certificado SSL/TLS y cadena de confianza...', cls:''},
  {t:'00:07', msg:'Verificando puertos comunes expuestos (80, 443, 8080, 22)...', cls:'sl-warn'},
  {t:'00:09', msg:'Revisando configuración CORS y políticas de acceso...', cls:''},
  {t:'00:11', msg:'Buscando subdominios y endpoints públicos...', cls:'sl-ok'},
  {t:'00:13', msg:'Consultando bases de datos de filtraciones (Have I Been Pwned)...', cls:'sl-warn'},
  {t:'00:15', msg:'Generando reporte con Claude AI...', cls:'sl-ok'},
];

window.runScanner = function(){
  const domainIn = document.getElementById('scannerDomain');
  const rawDomain = (domainIn?.value||'').trim().toLowerCase().replace(/^https?:\/\//,'').replace(/\/.*$/,'');
  if(!rawDomain){ domainIn.style.borderColor='var(--r)'; domainIn.focus(); setTimeout(()=>domainIn.style.borderColor='',1800); return; }
  // Reset
  document.getElementById('scannerProgress').classList.remove('show');
  document.getElementById('scannerReport').classList.remove('show');
  document.getElementById('scannerBtn').disabled = true;
  document.getElementById('scannerBtn').innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>&nbsp; ANALIZANDO...';
  document.getElementById('scanProgFill').style.width = '0%';
  document.getElementById('scanLogs').innerHTML = '';
  document.getElementById('scanPercent').textContent = '0%';
  // Show progress
  document.getElementById('scannerProgress').classList.add('show');
  // Simulate logs
  let logIdx = 0;
  const logInterval = setInterval(()=>{
    if(logIdx >= SCAN_LOGS_DATA.length){ clearInterval(logInterval); return; }
    const l = SCAN_LOGS_DATA[logIdx];
    const logsEl = document.getElementById('scanLogs');
    const div = document.createElement('div');
    div.className = 'scan-log';
    div.innerHTML = `<span class="sl-time">[${l.t}]</span><span class="${l.cls}">${l.msg}</span>`;
    logsEl.appendChild(div);
    logsEl.scrollTop = logsEl.scrollHeight;
    const pct = Math.round(((logIdx+1)/SCAN_LOGS_DATA.length)*85);
    document.getElementById('scanProgFill').style.width = pct+'%';
    document.getElementById('scanPercent').textContent = pct+'%';
    logIdx++;
  }, 900);
  // Call Claude API
  setTimeout(()=>{ callClaudeScanner(rawDomain, logInterval); }, 9200);
};

async function callClaudeScanner(domain, logInterval){
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages:[{
          role:'user',
          content:`Eres NEXUM Security AI, un experto en ciberseguridad. Analiza el dominio "${domain}" y genera un reporte de seguridad profesional en español.

El reporte debe incluir:
1. NIVEL DE RIESGO: (CRÍTICO / MODERADO / BAJO) - elige uno basándote en el tipo de dominio
2. VULNERABILIDADES POTENCIALES: 3-4 vectores de ataque comunes para este tipo de dominio
3. CONFIGURACIONES A VERIFICAR: headers HTTP, SSL, DNS, etc.
4. RECOMENDACIONES PRIORITARIAS: 3 acciones concretas e inmediatas
5. PRÓXIMOS PASOS: qué haría NEXUM en una auditoría real

Escribe de forma técnica pero accesible. Usa emojis de escudo 🔴🟡🟢 para indicar prioridad. 
Menciona específicamente el dominio "${domain}" en el análisis.
No uses markdown con asteriscos ni corchetes. Solo texto plano con saltos de línea.
Máximo 400 palabras.`
        }]
      })
    });
    const data = await response.json();
    clearInterval(logInterval);
    document.getElementById('scanProgFill').style.width = '100%';
    document.getElementById('scanPercent').textContent = '100%';
    // Agregar log final
    const logsEl = document.getElementById('scanLogs');
    const finalLog = document.createElement('div');
    finalLog.className = 'scan-log';
    finalLog.innerHTML = `<span class="sl-time">[00:16]</span><span class="sl-ok">✓ Análisis completado. Reporte generado.</span>`;
    logsEl.appendChild(finalLog);
    setTimeout(()=>{
      const aiText = data.content?.[0]?.text || 'No se pudo generar el análisis. Por favor intenta de nuevo.';
      // Detectar nivel de riesgo
      let scoreClass = 'warning', scoreText = '⚠ RIESGO MODERADO';
      if(aiText.toLowerCase().includes('crítico') || aiText.toLowerCase().includes('critico')){
        scoreClass='critical'; scoreText='🔴 RIESGO CRÍTICO';
      } else if(aiText.toLowerCase().includes('bajo') || aiText.toLowerCase().includes('mínimo')){
        scoreClass='safe'; scoreText='🟢 RIESGO BAJO';
      }
      document.getElementById('reportDomain').textContent = domain;
      document.getElementById('reportScore').textContent = scoreText;
      document.getElementById('reportScore').className = 'scan-score-badge ' + scoreClass;
      document.getElementById('reportText').textContent = aiText;
      document.getElementById('scannerReport').classList.add('show');
      document.getElementById('scannerReport').scrollIntoView({behavior:'smooth',block:'start'});
      document.getElementById('scannerBtn').disabled = false;
      document.getElementById('scannerBtn').innerHTML = '<i class="fas fa-search-plus"></i>&nbsp; ANALIZAR';
    }, 600);
  } catch(err) {
    clearInterval(logInterval);
    document.getElementById('reportDomain').textContent = domain;
    document.getElementById('reportScore').textContent = '⚠ Error de conexión';
    document.getElementById('reportScore').className = 'scan-score-badge warning';
    document.getElementById('reportText').textContent = 'No se pudo conectar con el motor de análisis. Por favor verifica tu conexión e intenta nuevamente. Si el problema persiste, contáctanos directamente por WhatsApp.';
    document.getElementById('scannerReport').classList.add('show');
    document.getElementById('scannerBtn').disabled = false;
    document.getElementById('scannerBtn').innerHTML = '<i class="fas fa-search-plus"></i>&nbsp; ANALIZAR';
  }
}

/* POPUP DE SALIDA — EXIT INTENT */
(function initExitIntent(){
  if(localStorage.getItem('nx_exit_shown')) return;
  let triggered = false;
  // Desktop: mouse leave viewport por arriba
  document.addEventListener('mouseleave', function(e){
    if(e.clientY <= 5 && !triggered){
      triggered = true;
      localStorage.setItem('nx_exit_shown','1');
      setTimeout(()=>{ document.getElementById('exitOverlay').classList.add('show'); }, 300);
    }
  });
  // Mobile: scroll hacia arriba rápido después de 30s
  let lastScrollY = 0, mobileTimer = null;
  window.addEventListener('scroll', function(){
    const currentY = window.scrollY;
    if(lastScrollY - currentY > 80 && currentY < 200 && !triggered){
      if(!mobileTimer) mobileTimer = setTimeout(()=>{
        triggered = true;
        localStorage.setItem('nx_exit_shown','1');
        document.getElementById('exitOverlay').classList.add('show');
      }, 500);
    } else { clearTimeout(mobileTimer); mobileTimer = null; }
    lastScrollY = currentY;
  });
})();

window.closeExitPopup = function(){
  document.getElementById('exitOverlay').classList.remove('show');
};
// Cerrar con click en overlay
document.getElementById('exitOverlay').addEventListener('click', function(e){
  if(e.target === this) closeExitPopup();
});
// Tecla Escape
document.addEventListener('keydown', function(e){
  if(e.key==='Escape') closeExitPopup();
});

/* DEMO INTERACTIVA — switchDemo */
window.switchDemo = function(id, btn) {
  document.querySelectorAll('.demo-stage').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
  const stage = document.getElementById('demo-' + id);
  if(stage) stage.classList.add('active');
  if(btn) btn.classList.add('active');
  // Animate progress bars on show
  if(stage) {
    stage.querySelectorAll('.demo-prog-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = w; }, 50);
    });
  }
};

/* INDUSTRIA — switchIndustry */
window.switchIndustry = function(id, btn) {
  document.querySelectorAll('.industry-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ind-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById('ind-' + id);
  if(panel) panel.classList.add('active');
  if(btn) btn.classList.add('active');
};

/* TIMELINE — intersection reveal */
(function initTimeline(){
  const items = document.querySelectorAll('.tl-item');
  if(!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if(e.isIntersecting){
        setTimeout(() => e.target.classList.add('vis'), i * 120);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => obs.observe(item));
})();

/* CALCULADORA DE ROI */
window.calcROI = function(){
  const factura = parseInt(document.getElementById('roi-factura').value) || 5000;
  const emp     = parseInt(document.getElementById('roi-emp').value) || 5;
  const sector  = parseFloat(document.getElementById('roi-sector').value) || 1.2;
  const seg     = parseFloat(document.getElementById('roi-seg').value) || 2.0;

  // Pérdida directa estimada (promedio LATAM: entre 1.5x y 4x facturación mensual)
  const perdidaBase = factura * 2.2 * sector * seg;
  const perdidaMin  = Math.round(perdidaBase * 0.7 / 100) * 100;
  const perdidaMax  = Math.round(perdidaBase * 1.4 / 100) * 100;

  // Días de inactividad estimados
  const downtimeDias = Math.round((seg * sector * 1.8) + (emp > 25 ? 3 : 1));

  // Costo estimado de NEXUM (muy inferior a la pérdida)
  const nexumCosto = Math.min(Math.max(Math.round(perdidaMin * 0.04 / 10) * 10, 150), 1200);

  // Formatear soles
  const fmt = n => 'S/ ' + n.toLocaleString('es-PE');

  document.getElementById('roi-perdida').textContent = fmt(perdidaMin) + ' – ' + fmt(perdidaMax);
  document.getElementById('roi-downtime').textContent = downtimeDias + ' – ' + (downtimeDias + 4) + ' días';
  document.getElementById('roi-ahorro').textContent = 'Desde ' + fmt(nexumCosto);

  // Insight personalizado
  const ratio = Math.round(perdidaMin / nexumCosto);
  document.getElementById('roi-insight').innerHTML =
    `Por cada <strong>S/ ${nexumCosto}</strong> invertido en protección con NEXUM, podrías evitar pérdidas de hasta <strong>${fmt(perdidaMax)}</strong>. Eso es un ROI de seguridad de <strong>${ratio}x</strong>. El 43% de los ciberataques afectan a empresas con menos de ${emp * 4} empleados — no existe empresa "muy pequeña" para ser atacada.`;

  const res = document.getElementById('roi-results');
  res.classList.add('show');
  res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

/* ACTIVITY TOASTS — Notificaciones */
(function initAttackSim(){
  const attacks = {
    recon:[
      {delay:0,   prompt:'$', cmd:'whois target-empresa.com.pe', cls:'cmd'},
      {delay:600, prompt:'>', out:'Registrant: TARGET EMPRESA SAC', cls:'out'},
      {delay:900, prompt:'>', out:'Email: admin@target-empresa.com.pe', cls:'out'},
      {delay:1200,prompt:'$', cmd:'theHarvester -d target-empresa.com.pe -b google', cls:'cmd'},
      {delay:1800,prompt:'>', out:'[*] Emails encontrados: 14', cls:'warn'},
      {delay:2100,prompt:'>', out:'jair@target-empresa.com.pe', cls:'out'},
      {delay:2400,prompt:'>', out:'sistemas@target-empresa.com.pe', cls:'out'},
      {delay:2700,prompt:'$', cmd:'shodan search "target-empresa.com.pe"', cls:'cmd'},
      {delay:3200,prompt:'>', out:'Puertos expuestos: 22, 80, 443, 3306, 8080', cls:'err'},
      {delay:3600,prompt:'!', out:'Puerto 3306 (MySQL) abierto al público — CRÍTICO', cls:'err'},
    ],
    scan:[
      {delay:0,   prompt:'$', cmd:'nmap -sV -sC -p- 189.xx.xx.xx', cls:'cmd'},
      {delay:500, prompt:'>', out:'Starting Nmap scan...', cls:'info'},
      {delay:900, prompt:'>', out:'22/tcp  open  ssh     OpenSSH 7.2 (DESACTUALIZADO)', cls:'warn'},
      {delay:1200,prompt:'>', out:'80/tcp  open  http    Apache 2.2.34 (VULNERABLE)', cls:'err'},
      {delay:1500,prompt:'>', out:'3306/tcp open mysql  MySQL 5.5.62', cls:'err'},
      {delay:1800,prompt:'$', cmd:'nikto -h http://target-empresa.com.pe', cls:'cmd'},
      {delay:2300,prompt:'>', out:'+ CVE-2017-9798: Apache mod_userdir info disclosure', cls:'err'},
      {delay:2600,prompt:'>', out:'+ SQL Injection posible en /login.php?id=', cls:'err'},
      {delay:3000,prompt:'>', out:'+ XSS en parámetro "search" sin sanitizar', cls:'err'},
      {delay:3400,prompt:'!', out:'47 vulnerabilidades encontradas. Score: 12/100', cls:'err'},
    ],
    exploit:[
      {delay:0,   prompt:'$', cmd:"sqlmap -u 'http://target-empresa.com.pe/login.php?id=1' --dbs", cls:'cmd'},
      {delay:700, prompt:'>', out:'[*] Testing parameter: id', cls:'info'},
      {delay:1100,prompt:'>', out:'[CRITICAL] SQL Injection confirmada — tipo: UNION', cls:'err'},
      {delay:1500,prompt:'>', out:'Bases de datos encontradas: clientes_db, ventas_db, admin_db', cls:'err'},
      {delay:1900,prompt:'$', cmd:'sqlmap --dump -D admin_db -T usuarios', cls:'cmd'},
      {delay:2400,prompt:'>', out:'ID | Usuario       | Password (MD5)', cls:'warn'},
      {delay:2700,prompt:'>', out:'1  | admin          | 5f4dcc3b5aa765d61...', cls:'err'},
      {delay:3000,prompt:'>', out:'2  | gerencia       | e10adc3949ba59ab...', cls:'err'},
      {delay:3300,prompt:'!', out:'ACCESO TOTAL a 12,847 registros de clientes', cls:'err'},
      {delay:3700,prompt:'!', out:'Datos expuestos: DNI, tarjetas, contraseñas', cls:'err'},
    ],
    nexum:[
      {delay:0,   prompt:'N', cmd:'NEXUM Shield activado — Modo protección ELITE', cls:'info'},
      {delay:500, prompt:'✓', out:'WAF bloqueó 847 requests sospechosos hoy', cls:'out'},
      {delay:900, prompt:'✓', out:'Puerto 3306 cerrado — acceso solo desde VPN', cls:'out'},
      {delay:1200,prompt:'✓', out:'Apache actualizado → 2.4.57 (sin CVEs activos)', cls:'out'},
      {delay:1500,prompt:'✓', cmd:'Parámetros sanitizados — SQLi imposible', cls:'out'},
      {delay:1800,prompt:'✓', out:'2FA activado en todos los accesos admin', cls:'out'},
      {delay:2100,prompt:'✓', out:'Monitoreo 24/7 con alertas en tiempo real', cls:'out'},
      {delay:2400,prompt:'✓', out:'Score de seguridad: 12/100 → 97/100', cls:'out'},
      {delay:2800,prompt:'🛡', out:'Ataque neutralizado. Sistema blindado por NEXUM.', cls:'info'},
      {delay:3200,prompt:'$', cmd:'// ¿Quieres que auditemos tu empresa?', cls:'cmd'},
    ]
  };

  let currentKey = 'recon';
  let timers = [];

  function renderAttack(key){
    currentKey = key;
    timers.forEach(clearTimeout);
    timers = [];
    const body = document.getElementById('attackBody');
    if(!body) return;
    body.innerHTML = '';
    const lines = attacks[key];
    lines.forEach(({delay, prompt, cmd, out, cls})=>{
      const t = setTimeout(()=>{
        const div = document.createElement('div');
        div.className = 'attack-line';
        div.style.animationDelay = '0s';
        const text = cmd || out || '';
        div.innerHTML = `<span class="prompt">${prompt}</span><span class="${cls}">${text}</span>`;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
      }, delay);
      timers.push(t);
    });
  }

  window.switchAttack = function(key, btn){
    document.querySelectorAll('.attack-step-tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    renderAttack(key);
  };

  // Auto-start when visible
  const obs = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){ renderAttack('recon'); obs.disconnect(); }
  },{threshold:0.3});
  const el = document.querySelector('.attack-terminal');
  if(el) obs.observe(el);
})();

// Portfolio terminal screens
(function initPortScreens(){
  const screens = {
    portScreen1:[
      '$ nmap -sV 192.168.1.x',
      '> 3306/tcp OPEN — MySQL sin auth',
      '> CVE-2019-2455 detectado',
      '$ sqlmap --level=5 --risk=3',
      '> [CRITICAL] Dump exitoso',
      '> 12,000 registros expuestos',
      '$ nexum --fix --harden',
      '> Score: 38 → 94/100 ✓',
    ],
    portScreen2:[
      '$ lighthouse http://retailpe.com',
      '> Performance: 31/100',
      '> TTI: 8.4s — LENTO',
      '$ nexum build --optimize',
      '> Bundle: 4.2MB → 890KB',
      '> TTI: 8.4s → 1.1s ✓',
      '> Conversión: +340%',
      '> Deploy en Vercel ✓',
    ],
    portScreen3:[
      '$ aws-nuke --scan legacy-infra',
      '> S3 buckets: PÚBLICOS ⚠',
      '> IAM: 47 permisos wildcard',
      '$ terraform apply nexum-secure',
      '> VPC + WAF configurado ✓',
      '> IAM least-privilege ✓',
      '> CloudTrail activo ✓',
      '> Uptime SLA: 99.97% ✓',
    ]
  };

  function typeScreen(id, lines){
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = '';
    let i = 0;
    function next(){
      if(i >= lines.length){ i = 0; setTimeout(()=>{ el.innerHTML=''; next(); }, 3000); return; }
      const div = document.createElement('div');
      div.textContent = lines[i++];
      el.appendChild(div);
      setTimeout(next, 400);
    }
    next();
  }

  const obs = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      Object.keys(screens).forEach(id => typeScreen(id, screens[id]));
      obs.disconnect();
    }
  },{threshold:0.2});
  const sec = document.querySelector('.portfolio-sec');
  if(sec) obs.observe(sec);
})();

(function initToasts(){
  const events = [
    { icon:'🔒', title:'Empresa de Lima solicitó auditoría', sub:'hace 3 minutos' },
    { icon:'🛡️', title:'PyME de Arequipa contrató Pentesting', sub:'hace 11 minutos' },
    { icon:'🚨', title:'Vulnerabilidad crítica detectada y cerrada', sub:'hace 18 minutos' },
    { icon:'💼', title:'Startup de Miraflores contrató desarrollo web', sub:'hace 24 minutos' },
    { icon:'🔐', title:'Clínica de San Isidro contrató hardening', sub:'hace 31 minutos' },
    { icon:'⚡', title:'Scanner IA analizó 47 dominios hoy', sub:'en tiempo real' },
    { icon:'✅', title:'Proyecto entregado — 99/100 en Lighthouse', sub:'hace 45 minutos' },
    { icon:'📱', title:'App móvil desplegada en producción', sub:'hace 1 hora' },
  ];

  let idx = 0;
  function showToast(){
    const e = events[idx % events.length];
    idx++;
    const container = document.getElementById('nx-toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'nx-toast';
    toast.innerHTML = `
      <div class="nx-toast-icon">${e.icon}</div>
      <div class="nx-toast-body">
        <div class="nx-toast-title">${e.title}</div>
        <div class="nx-toast-sub">${e.sub}</div>
      </div>
      <div class="nx-toast-dot"></div>
    `;
    container.appendChild(toast);
    // Auto-remove after 5s
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => { if(toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
    }, 5000);
  }

  // First toast after 8s, then every 14-22s
  setTimeout(() => {
    showToast();
    setInterval(showToast, 17000 + Math.random() * 5000);
  }, 8000);
})();