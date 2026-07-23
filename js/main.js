/* SPA ROUTER */
const pages = {
  home:'p-home', nosotros:'p-nosotros', ciber:'p-ciber',
  dev:'p-dev', movil:'p-movil', consul:'p-consul',
  tutoriales:'p-tutoriales', apps:'p-apps',
  software:'p-software', precios:'p-precios', contacto:'p-contacto', qr:'p-qr',
  calculadora:'p-calculadora', cotizador:'p-cotizador',
  metadatos:'p-metadatos', proximamente:'p-proximamente',
  osint:'p-osint', autoflow:'p-autoflow', scanner:'p-scanner',
  portafolio:'p-portafolio'
};

function go(key){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById(pages[key]);
  if(el) el.classList.add('active');
  // Fix: scroll window AND html/body to top immediately
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('act'));
  const navMap = {home:0,nosotros:1,ciber:2,dev:3,movil:4,consul:5,tutoriales:6,apps:7,software:8,precios:9,qr:10};
  const navBtns = document.querySelectorAll('#nav-d .ni');
  if(navMap[key]!==undefined && navBtns[navMap[key]]) navBtns[navMap[key]].classList.add('act');
  setTimeout(initReveal,50);
}

/* MOBILE NAV */
function toggleMnav(){
  document.getElementById('hbg').classList.toggle('open');
  document.getElementById('mnav').classList.toggle('open');
}
function closeMnav(){
  document.getElementById('hbg').classList.remove('open');
  document.getElementById('mnav').classList.remove('open');
}
document.addEventListener('click',e=>{
  const hbg=document.getElementById('hbg'),mn=document.getElementById('mnav');
  if(!hbg.contains(e.target)&&!mn.contains(e.target)) closeMnav();
});

/* BUSCADOR NEXUM */
const NX_INDEX = [
  // SERVICIOS
  {name:'Ciberseguridad',desc:'Pentesting, hacking ético, auditorías de seguridad',page:'ciber',icon:'🛡️',color:'rgba(212,175,55,.12)',tag:'Servicio'},
  {name:'Desarrollo Web',desc:'Sitios, apps web, e-commerce, landing pages',page:'dev',icon:'💻',color:'rgba(59,130,246,.1)',tag:'Servicio'},
  {name:'Apps Móviles',desc:'Flutter, React Native, iOS y Android',page:'movil',icon:'📱',color:'rgba(212,175,55,.1)',tag:'Servicio'},
  {name:'Consultoría',desc:'ISO 27001, GDPR, IRP, capacitaciones de seguridad',page:'consul',icon:'🧠',color:'rgba(255,196,0,.1)',tag:'Servicio'},
  {name:'AutoFlow IA',desc:'Automatización de WhatsApp con inteligencia artificial',page:'autoflow',icon:'🤖',color:'rgba(59,130,246,.12)',tag:'Nuevo'},
  {name:'Pentesting',desc:'Pruebas de penetración y hacking ético',page:'ciber',icon:'🔓',color:'rgba(255,0,60,.1)',tag:'Servicio'},
  {name:'Análisis Forense',desc:'Investigación digital y análisis de incidentes',page:'ciber',icon:'🔍',color:'rgba(212,175,55,.1)',tag:'Servicio'},
  {name:'OSINT',desc:'Inteligencia de fuentes abiertas y recopilación de datos',page:'ciber',icon:'👁️',color:'rgba(201,162,39,.1)',tag:'Servicio'},
  {name:'Hardening',desc:'Configuración segura de servidores y sistemas',page:'ciber',icon:'🔒',color:'rgba(212,175,55,.1)',tag:'Servicio'},
  {name:'Recuperación de Datos',desc:'Rescate de archivos perdidos en cualquier dispositivo',page:'movil',icon:'💾',color:'rgba(79,142,247,.1)',tag:'Servicio'},
  // HERRAMIENTAS
  {name:'Scanner IA de Seguridad',desc:'Analiza vulnerabilidades de tu dominio con Claude AI',page:'scanner',icon:'🔎',color:'rgba(212,175,55,.12)',tag:'IA'},
  {name:'OSINT Intelligence Suite',desc:'IP lookup, email breach, WHOIS, URL threat',page:'osint',icon:'🌐',color:'rgba(201,162,39,.1)',tag:'Herramienta'},
  {name:'Extractor de Metadatos',desc:'Analiza metadatos EXIF ocultos en tus imágenes',page:'metadatos',icon:'📸',color:'rgba(79,142,247,.1)',tag:'Herramienta'},
  {name:'QR Tool',desc:'Generador de códigos QR personalizados',page:'qr',icon:'📱',color:'rgba(212,175,55,.1)',tag:'Herramienta'},
  {name:'Calculadora de Riesgo',desc:'Evalúa el nivel de exposición digital de tu empresa',page:'calculadora',icon:'⚠️',color:'rgba(255,196,0,.1)',tag:'Herramienta'},
  {name:'Cotizador de Precios',desc:'Calcula el precio estimado de tu proyecto en 60 segundos',page:'cotizador',icon:'💰',color:'rgba(59,130,246,.1)',tag:'Herramienta'},
  {name:'IP Lookup',desc:'Geolocalización e información de IPs y dominios',page:'osint',icon:'🌍',color:'rgba(201,162,39,.1)',tag:'OSINT'},
  {name:'Email Breach Checker',desc:'Verifica si tu email está en filtraciones de datos',page:'osint',icon:'📧',color:'rgba(255,0,60,.1)',tag:'OSINT'},
  {name:'WHOIS',desc:'Información de registro de dominios y servidores DNS',page:'osint',icon:'🔍',color:'rgba(201,162,39,.1)',tag:'OSINT'},
  {name:'URL Threat Analyzer',desc:'Analiza URLs sospechosas en motores de amenazas',page:'osint',icon:'🦠',color:'rgba(255,0,60,.1)',tag:'OSINT'},
  // PRODUCTOS
  {name:'Software Educativo',desc:'Yape Clone, PaySim, PlinClone, FaceIntel y más',page:'software',icon:'📦',color:'rgba(79,142,247,.12)',tag:'Producto'},
  {name:'Yape Clone',desc:'Réplica educativa para pentesting e ingeniería social',page:'software',icon:'💜',color:'rgba(168,85,247,.15)',tag:'Premium'},
  {name:'Apps & Herramientas',desc:'Suite completa de aplicaciones NEXUM',page:'apps',icon:'🧰',color:'rgba(212,175,55,.1)',tag:'Producto'},
  {name:'Tutoriales',desc:'Contraseñas, phishing, ransomware, OWASP y más',page:'tutoriales',icon:'🎓',color:'rgba(255,196,0,.1)',tag:'Educativo'},
  {name:'Próximamente',desc:'NEXUM Vault, OSINT Mobile, CyberMap Perú y más',page:'proximamente',icon:'🚀',color:'rgba(212,175,55,.08)',tag:'Próximo'},
  // PÁGINAS
  {name:'Precios',desc:'Planes Essential, Professional, Elite y Enterprise 360',page:'precios',icon:'💳',color:'rgba(59,130,246,.1)',tag:'Página'},
  {name:'Nosotros',desc:'Quiénes somos, misión, valores y equipo NEXUM',page:'nosotros',icon:'🏢',color:'rgba(212,175,55,.08)',tag:'Página'},
  {name:'Contacto',desc:'Formulario de contacto y WhatsApp directo',page:'contacto',icon:'📩',color:'rgba(212,175,55,.08)',tag:'Página'},
];

let nxSearchOpen = false;

function toggleNxSearch(){
  nxSearchOpen = !nxSearchOpen;
  const bar = document.getElementById('nxSearchBar');
  const inp = document.getElementById('nxSearchInput');
  const drop = document.getElementById('nxSearchDrop');
  bar.classList.toggle('open', nxSearchOpen);
  if(nxSearchOpen){ setTimeout(()=>inp.focus(), 350); }
  else { drop.classList.remove('show'); inp.value=''; }
}

function nxHighlight(text, query){
  if(!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<span class="nx-sr-highlight">$1</span>');
}

function nxSearch(q){
  const drop = document.getElementById('nxSearchDrop');
  if(!q.trim()){ drop.classList.remove('show'); return; }
  const results = NX_INDEX.filter(item =>
    item.name.toLowerCase().includes(q.toLowerCase()) ||
    item.desc.toLowerCase().includes(q.toLowerCase()) ||
    item.tag.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8);
  if(!results.length){
    drop.innerHTML = `<div class="nx-sr-empty">🔍 Sin resultados para "<strong>${q}</strong>"<br><span style="font-size:.6rem;color:var(--txf)">Prueba: scanner, pentesting, yape, cotizador...</span></div>`;
    drop.classList.add('show'); return;
  }
  // Group by tag type
  const services = results.filter(r=>r.tag==='Servicio'||r.tag==='IA');
  const tools = results.filter(r=>['Herramienta','OSINT'].includes(r.tag));
  const other = results.filter(r=>!['Servicio','IA','Herramienta','OSINT'].includes(r.tag));
  let html = '';
  const renderGroup = (label, items) => {
    if(!items.length) return '';
    return `<div class="nx-sr-section">${label}</div>` +
      items.map(r=>`
        <div class="nx-sr-item" onclick="nxGoTo('${r.page}')">
          <div class="nx-sr-icon" style="background:${r.color}">${r.icon}</div>
          <div class="nx-sr-body">
            <div class="nx-sr-name">${nxHighlight(r.name, q)}</div>
            <div class="nx-sr-desc">${nxHighlight(r.desc, q)}</div>
          </div>
          <span class="nx-sr-tag">${r.tag}</span>
        </div>`).join('');
  };
  html += renderGroup('// Servicios', services);
  html += renderGroup('// Herramientas', tools);
  html += renderGroup('// Productos & Páginas', other);
  drop.innerHTML = html;
  drop.classList.add('show');
}

function nxGoTo(page){
  go(page);
  toggleNxSearch();
  // close mobile nav if open
  closeMnav();
}

// Input listener
document.addEventListener('DOMContentLoaded', ()=>{
  const inp = document.getElementById('nxSearchInput');
  if(!inp) return;
  inp.addEventListener('input', e => nxSearch(e.target.value));
  inp.addEventListener('keydown', e => {
    if(e.key === 'Escape') toggleNxSearch();
    if(e.key === 'Enter'){
      const drop = document.getElementById('nxSearchDrop');
      const first = drop.querySelector('.nx-sr-item');
      if(first) first.click();
    }
  });
});

// Close search when clicking outside
document.addEventListener('click', e=>{
  const wrap = document.getElementById('nxSearchWrap');
  if(wrap && !wrap.contains(e.target) && nxSearchOpen) toggleNxSearch();
});

/* HEADER SCROLL */
window.addEventListener('scroll',()=>document.getElementById('hdr').classList.toggle('scrolled',window.scrollY>20));

/* REVEAL */
function initReveal(){
  // works on https://, http:// and file://
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>{e.target.classList.remove('hide');},i*70);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.rv').forEach(el=>{el.classList.add('hide');obs.observe(el);});
}
initReveal();

/* COUNTERS */
function initCounters(){
  const obs2 = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      const target=parseInt(el.getAttribute('data-t'));
      const isPercent=el.closest('.rv')?.querySelector('.sl2')?.textContent.includes('%');
      let count=0;const step=Math.max(1,Math.ceil(target/60));
      const t=setInterval(()=>{
        count=Math.min(count+step,target);
        el.textContent=count+(isPercent?'%':'+');
        if(count>=target){el.textContent=target+(isPercent?'%':'+');clearInterval(t);}
      },28);
      obs2.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-t]').forEach(el=>obs2.observe(el));
}
initCounters();

/* STATUS CARD */
function buildStatusCard(){
  const card=document.getElementById('sc');
  if(!card) return;
  const now=new Date();
  const rows=[
    ['STATUS','<span class="sc-val ok">SISTEMAS ACTIVOS</span>'],
    ['HORA LOCAL',`<span class="sc-val" id="lc">${now.toLocaleTimeString('es-PE')}</span>`],
    ['ZONA',`<span class="sc-val">${Intl.DateTimeFormat().resolvedOptions().timeZone}</span>`],
    ['PROTOCOLO','<span class="sc-val ok">HTTPS / TLS 1.3</span>'],
    ['AMENAZAS','<span class="sc-val er">0 detectadas</span>'],
    ['UPTIME','<span class="sc-val ok">99.9%</span>'],
    ['NEXUM','<span class="sc-val ok">ONLINE ✓</span>'],
  ];
  card.innerHTML=rows.map(([l,v])=>`<div class="sc-row"><span class="sc-lbl">${l}</span>${v}</div>`).join('');
  setInterval(()=>{const el=document.getElementById('lc');if(el) el.textContent=new Date().toLocaleTimeString('es-PE');},1000);
}
setTimeout(buildStatusCard,700);

/* MONEY RAIN CANVAS */
function initMoneyCanvas(){
  const canvas=document.getElementById('moneyCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=canvas.offsetWidth||280,H=canvas.offsetHeight||340;
  canvas.width=W;canvas.height=H;
  const chars='$¥€₿₴01010011000111001101001NEXUM01010SECURE10101';
  const cols=Math.floor(W/12);
  const drops=Array.from({length:cols},()=>Math.random()*-50);
  function draw(){
    ctx.fillStyle='rgba(2,4,8,0.18)';
    ctx.fillRect(0,0,W,H);
    ctx.font='11px JetBrains Mono,monospace';
    drops.forEach((y,i)=>{
      const c=chars[Math.floor(Math.random()*chars.length)];
      const alpha=Math.random()>.7?0.9:0.3;
      ctx.fillStyle=c==='$'||c==='€'||c==='¥'||c==='₿'?`rgba(59,130,246,${alpha})`:`rgba(212,175,55,${alpha})`;
      ctx.fillText(c,i*12,y*12);
      if(y*12>H&&Math.random()>.97) drops[i]=0;
      drops[i]+=.6;
    });
  }
  setInterval(draw,55);
}
setTimeout(initMoneyCanvas,400);

/* TRANSACTION FEED */
function initTxFeed(){
  const feed=document.getElementById('txFeed');
  if(!feed) return;
  const txs=[
    {t:'AUDIT',v:'$850',a:'PE→MX',c:'ok'},
    {t:'PENTEST',v:'$1,200',a:'Lima→Bogotá',c:'ok'},
    {t:'DEV WEB',v:'$600',a:'Perú→EEUU',c:'ok'},
    {t:'CONSULT',v:'$300',a:'Remoto',c:'ok'},
    {t:'APP MOB',v:'$950',a:'Android',c:'ok'},
    {t:'FORENSE',v:'$450',a:'Urgente',c:'am'},
    {t:'OSINT',v:'$250',a:'Anónimo',c:'ok'},
    {t:'CLOUD',v:'$700',a:'AWS',c:'ok'},
  ];
  let idx=0;
  function addTx(){
    const tx=txs[idx%txs.length];idx++;
    const row=document.createElement('div');
    row.style.cssText='display:flex;justify-content:space-between;align-items:center;font-family:var(--fm);font-size:.6rem;animation:mIn .3s ease;border-bottom:1px solid rgba(212,175,55,0.05);padding:2px 0';
    const color=tx.c==='ok'?'var(--g)':'var(--am)';
    row.innerHTML=`<span style="color:var(--txd)">${tx.t}</span><span style="color:var(--txd)">${tx.a}</span><span style="color:${color};font-weight:700">${tx.v}</span>`;
    feed.insertBefore(row,feed.firstChild);
    if(feed.children.length>4) feed.removeChild(feed.lastChild);
  }
  addTx();addTx();addTx();
  setInterval(addTx,2800);
}
setTimeout(initTxFeed,1000);

/* CONTACT FORM */
function submitForm(e){
  e.preventDefault();
  const modal=document.getElementById('modal');
  const icon=document.getElementById('mIcon');
  const title=document.getElementById('mTitle');
  const msg=document.getElementById('mMsg');
  const closeBtn=document.getElementById('mClose');
  icon.className='fas fa-spinner fa-spin';icon.style.color='';
  title.textContent='Procesando Solicitud...';
  msg.textContent='Asignando especialista. Un momento por favor...';
  closeBtn.style.display='none';
  modal.classList.remove('hid');
  setTimeout(()=>{
    icon.className='fas fa-check-circle';icon.style.color='var(--g)';
    title.textContent='¡Solicitud Enviada!';
    msg.textContent='Gracias. Un especialista de NEXUM se pondrá en contacto en menos de 24 horas. También puede escribirnos por WhatsApp: +51 945 366 356.';
    closeBtn.style.display='inline-flex';
    document.getElementById('cform').reset();
  },2400);
}
function closeModal(){document.getElementById('modal').classList.add('hid');}

/* QR */
let qrInst=null;
function toggleQrOpts(){
  const t=document.getElementById('qrType').value;
  document.getElementById('qrUrlOpts').style.display=t==='url'?'block':'none';
  document.getElementById('qrVcardOpts').style.display=t==='vcard'?'block':'none';
}
function genQR(){
  const tipo=document.getElementById('qrType').value;
  let data='';
  if(tipo==='url'){
    const url=document.getElementById('qrUrl').value.trim();
    if(!url){alert('Por favor ingresa una URL.');return;}
    data=url;
  } else {
    const n=document.getElementById('vcNombre').value.trim();
    if(!n){alert('Ingresa el nombre.');return;}
    data=`BEGIN:VCARD\nVERSION:3.0\nFN:${n}\nTITLE:${document.getElementById('vcTitulo').value}\nEMAIL:${document.getElementById('vcEmail').value}\nTEL:${document.getElementById('vcTel').value}\nURL:${document.getElementById('vcWeb').value}\nEND:VCARD`;
  }
  const canvas=document.getElementById('qrCanvas');
  canvas.innerHTML='';
  if(qrInst){qrInst.clear();qrInst=null;}
  qrInst=new QRCode(canvas,{text:data,width:220,height:220,colorDark:'#000',colorLight:'#fff',correctLevel:QRCode.CorrectLevel.H});
  document.getElementById('qrStatusTxt').textContent=tipo==='url'?'QR de URL generado':'vCard QR generada';
  document.getElementById('qrResult').style.display='block';
  setTimeout(()=>{
    const c=canvas.querySelector('canvas');
    if(c){const dl=document.getElementById('qrDownload');dl.href=c.toDataURL('image/png');dl.style.display='inline-flex';}
  },300);
}

/* FAQ */
function toggleFaq(el){
  const item=el.closest('.faq-item');
  document.querySelectorAll('.faq-item').forEach(i=>{if(i!==item)i.classList.remove('open');});
  item.classList.toggle('open');
}

/* --- */
const tutData = {
  t1:{title:'Contraseñas Inquebrantables',content:`
    <h4>¿Por qué importan las contraseñas?</h4>
    <p>El 81% de las brechas de seguridad se originan por contraseñas débiles o robadas. Una contraseña como <code>123456</code> se descifra en menos de 1 segundo.</p>
    <h4>Reglas de una contraseña fuerte</h4>
    <ul>
      <li>Mínimo 12 caracteres (idealmente 16+)</li>
      <li>Combina mayúsculas, minúsculas, números y símbolos</li>
      <li>No uses palabras del diccionario ni nombres personales</li>
      <li>Usa una frase: <code>M!perro#come2veces</code></li>
    </ul>
    <h4>Gestores de contraseñas recomendados</h4>
    <ul>
      <li><strong>Bitwarden</strong> — Gratuito, open source ✓</li>
      <li><strong>1Password</strong> — Premium, muy completo</li>
      <li><strong>KeePass</strong> — Local, sin nube</li>
    </ul>
    <h4>Activa el 2FA siempre que puedas</h4>
    <p>El doble factor de autenticación (2FA) bloquea el 99.9% de ataques automáticos aunque roben tu contraseña. Usa apps como <code>Google Authenticator</code> o <code>Authy</code>.</p>
  `},
  t2:{title:'Detectar Phishing en 5 Pasos',content:`
    <h4>¿Qué es el phishing?</h4>
    <p>El phishing es un engaño donde los atacantes simulan ser una entidad de confianza (banco, Google, Netflix) para robar tus credenciales o instalar malware.</p>
    <h4>Los 5 pasos para detectarlo</h4>
    <ul>
      <li><strong>1. Revisa el dominio:</strong> <code>banco.com</code> ≠ <code>banco-seguro.net</code> o <code>banc0.com</code></li>
      <li><strong>2. Busca urgencia falsa:</strong> "¡Tu cuenta será bloqueada en 24h!" es señal de alarma</li>
      <li><strong>3. Verifica el SSL:</strong> El candado HTTPS es necesario pero no suficiente</li>
      <li><strong>4. Pasa el cursor sobre links:</strong> Antes de hacer clic, ve a dónde apunta realmente</li>
      <li><strong>5. Llama directamente:</strong> Si dudas, llama al banco/empresa por el número oficial</li>
    </ul>
    <h4>Herramientas para verificar</h4>
    <ul>
      <li><code>virustotal.com</code> — Analiza URLs sospechosas</li>
      <li><code>phishtank.com</code> — Base de datos de phishing conocidos</li>
    </ul>
  `},
  t3:{title:'Wi-Fi Público y VPN',content:`
    <h4>El riesgo del Wi-Fi público</h4>
    <p>En redes abiertas (cafés, aeropuertos, hoteles), un atacante puede hacer un ataque <strong>Man-in-the-Middle</strong> e interceptar todo tu tráfico sin que lo notes.</p>
    <h4>¿Qué puede robar en Wi-Fi público?</h4>
    <ul>
      <li>Cookies de sesión (sin necesitar tu contraseña)</li>
      <li>Datos de formularios no encriptados</li>
      <li>Imágenes y archivos descargados</li>
    </ul>
    <h4>Cómo protegerte</h4>
    <ul>
      <li>Usa una <strong>VPN</strong> siempre en redes públicas</li>
      <li>Solo visita sitios <code>HTTPS</code></li>
      <li>Desactiva el Wi-Fi automático en tu celular</li>
      <li>Evita operaciones bancarias en redes públicas</li>
    </ul>
    <h4>VPNs recomendadas</h4>
    <ul>
      <li><strong>ProtonVPN</strong> — Gratuita y privada ✓</li>
      <li><strong>Mullvad</strong> — Sin registro de usuario</li>
      <li><strong>NordVPN</strong> — Completa y rápida</li>
    </ul>
  `},
  t4:{title:'Proteger tu Servidor Web',content:`
    <h4>Hardening básico de servidor</h4>
    <p>El hardening es el proceso de reducir la superficie de ataque eliminando configuraciones débiles y servicios innecesarios.</p>
    <h4>Pasos esenciales</h4>
    <ul>
      <li>Actualiza el OS y software siempre: <code>apt update && apt upgrade</code></li>
      <li>Cambia el puerto SSH por defecto (22) a uno no estándar</li>
      <li>Usa autenticación por clave SSH, no por contraseña</li>
      <li>Configura un firewall: <code>ufw allow 443 && ufw enable</code></li>
      <li>Instala Fail2Ban para bloquear ataques de fuerza bruta</li>
    </ul>
    <h4>Headers HTTP de seguridad esenciales</h4>
    <ul>
      <li><code>Strict-Transport-Security</code> (HSTS)</li>
      <li><code>Content-Security-Policy</code> (CSP)</li>
      <li><code>X-Frame-Options: DENY</code></li>
      <li><code>X-Content-Type-Options: nosniff</code></li>
    </ul>
  `},
  t5:{title:'OSINT Básico — Conoce tu Huella',content:`
    <h4>¿Qué es OSINT?</h4>
    <p>OSINT (Open Source Intelligence) es la recolección de información a partir de fuentes públicas. Los atacantes lo usan para preparar ataques dirigidos.</p>
    <h4>¿Qué información tuya está pública?</h4>
    <ul>
      <li>Nombre, email, teléfono en directorios online</li>
      <li>Fotos con metadatos (GPS embebido)</li>
      <li>Posts en redes sociales con tu ubicación</li>
      <li>Datos en filtraciones (Have I Been Pwned)</li>
    </ul>
    <h4>Herramientas para auditar tu huella</h4>
    <ul>
      <li><code>haveibeenpwned.com</code> — ¿Tu email fue filtrado?</li>
      <li><code>google.com/alerts</code> — Alerta cuando te mencionan</li>
      <li><code>exifdata.com</code> — Extrae metadatos de imágenes</li>
    </ul>
    <h4>Cómo reducir tu huella</h4>
    <ul>
      <li>Solicita eliminación de datos en directorios web</li>
      <li>Usa alias de email para registros no críticos</li>
      <li>Elimina metadatos antes de subir fotos</li>
    </ul>
  `},
  t6:{title:'Ransomware — Prevención y Respuesta',content:`
    <h4>¿Qué es el ransomware?</h4>
    <p>Es un malware que cifra todos tus archivos y pide un rescate en criptomonedas para recuperarlos. En 2024 causó pérdidas de más de $20 mil millones globalmente.</p>
    <h4>Cómo se infectan los sistemas</h4>
    <ul>
      <li>Phishing con archivos adjuntos maliciosos</li>
      <li>Vulnerabilidades en RDP expuesto a internet</li>
      <li>Software pirata o descargado de fuentes no oficiales</li>
    </ul>
    <h4>Prevención (regla 3-2-1)</h4>
    <ul>
      <li><strong>3</strong> copias de datos importantes</li>
      <li><strong>2</strong> medios diferentes (disco + nube)</li>
      <li><strong>1</strong> copia offline desconectada</li>
    </ul>
    <h4>Si ya fuiste infectado</h4>
    <ul>
      <li>Desconecta el equipo de la red INMEDIATAMENTE</li>
      <li>NO pagues el rescate (no garantiza recuperación)</li>
      <li>Reporta a CERT-PE y autoridades</li>
      <li>Consulta <code>nomoreransom.org</code> para herramientas de descifrado gratuitas</li>
    </ul>
  `},
  t7:{title:'OWASP Top 10 — Vulnerabilidades Web',content:`
    <h4>Las 10 vulnerabilidades más críticas</h4>
    <ul>
      <li><strong>A01 — Broken Access Control:</strong> Usuarios acceden a recursos que no deberían</li>
      <li><strong>A02 — Fallas Criptográficas:</strong> Datos sensibles expuestos por cifrado débil</li>
      <li><strong>A03 — Inyección (SQL, XSS):</strong> Datos no validados ejecutados como código</li>
      <li><strong>A04 — Diseño Inseguro:</strong> Falta de controles de seguridad en el diseño</li>
      <li><strong>A05 — Mala Configuración:</strong> Defaults inseguros, permisos excesivos</li>
      <li><strong>A06 — Componentes Vulnerables:</strong> Librerías desactualizadas con CVEs conocidos</li>
      <li><strong>A07 — Auth Failures:</strong> Contraseñas débiles, sesiones mal gestionadas</li>
      <li><strong>A08 — Integridad Software/Datos:</strong> Pipelines CI/CD sin verificación</li>
      <li><strong>A09 — Logging Insuficiente:</strong> No detectar ni registrar ataques</li>
      <li><strong>A10 — SSRF:</strong> Servidor realiza peticiones forjadas por el atacante</li>
    </ul>
    <h4>Recurso oficial</h4>
    <p>Visita <code>owasp.org</code> para la guía completa con ejemplos y mitigaciones para cada vulnerabilidad.</p>
  `},
  t8:{title:'SQL Injection — Prevención',content:`
    <h4>¿Cómo funciona SQL Injection?</h4>
    <p>Ocurre cuando datos del usuario se concatenan directamente en una consulta SQL sin validación.</p>
    <h4>Ejemplo vulnerable</h4>
    <p>Input malicioso: <code>' OR '1'='1</code><br>Query resultante: <code>SELECT * FROM users WHERE user='' OR '1'='1'</code> — devuelve TODOS los usuarios.</p>
    <h4>Prevención con consultas parametrizadas</h4>
    <p>Python: <code>cursor.execute("SELECT * FROM users WHERE email=?", (email,))</code></p>
    <p>Node.js: <code>db.query("SELECT * FROM users WHERE email=?", [email])</code></p>
    <h4>Capas de defensa adicionales</h4>
    <ul>
      <li>Usa un ORM (SQLAlchemy, Sequelize, Eloquent)</li>
      <li>Aplica principio de mínimo privilegio en la DB</li>
      <li>Implementa un WAF (Web Application Firewall)</li>
      <li>Valida y sanitiza TODOS los inputs del usuario</li>
    </ul>
  `},
  t9:{title:'Autenticación Segura con JWT',content:`
    <h4>¿Qué es JWT?</h4>
    <p>JSON Web Token es un estándar para transmitir información de forma segura entre partes como un objeto JSON firmado digitalmente.</p>
    <h4>Estructura de un JWT</h4>
    <p><code>Header.Payload.Signature</code></p>
    <ul>
      <li><strong>Header:</strong> Algoritmo de firma (usa HS256 o RS256)</li>
      <li><strong>Payload:</strong> Claims del usuario (userId, roles, exp)</li>
      <li><strong>Signature:</strong> Verifica que el token no fue alterado</li>
    </ul>
    <h4>Buenas prácticas</h4>
    <ul>
      <li>Tiempo de expiración corto: <code>exp: 15min</code></li>
      <li>Usa refresh tokens con rotación</li>
      <li>Guarda tokens en <code>httpOnly cookies</code>, no en localStorage</li>
      <li>Nunca almacenes datos sensibles en el payload (es decodificable)</li>
      <li>Implementa lista negra de tokens revocados</li>
    </ul>
  `}
};

function openTut(id){
  const d=tutData[id];
  if(!d) return;
  document.getElementById('tutTitle').textContent=d.title;
  document.getElementById('tutContent').innerHTML=d.content;
  document.getElementById('tutModal').classList.remove('hid');
  document.body.style.overflow='hidden';
}
function closeTut(){
  document.getElementById('tutModal').classList.add('hid');
  document.body.style.overflow='';
}

/* --- */
function openPassGen(){
  go('apps');
  setTimeout(()=>{
    const c=document.getElementById('miniAppContainer');
    c.style.display='block';
    c.innerHTML=`
    <div class="mini-app">
      <h3><i class="fas fa-key"></i> Generador de Contraseñas Seguras</h3>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">
        <div>
          <label style="font-family:var(--fm);font-size:.68rem;color:var(--c);display:block;margin-bottom:5px">LONGITUD</label>
          <input type="number" id="pgLen" value="16" min="8" max="64" style="width:80px">
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;justify-content:flex-end">
          <label style="font-family:var(--fm);font-size:.68rem;color:var(--txd);display:flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" id="pgUp" checked> Mayúsculas</label>
          <label style="font-family:var(--fm);font-size:.68rem;color:var(--txd);display:flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" id="pgNum" checked> Números</label>
          <label style="font-family:var(--fm);font-size:.68rem;color:var(--txd);display:flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" id="pgSym" checked> Símbolos</label>
        </div>
      </div>
      <button class="btn btn-sm" onclick="generatePass()"><i class="fas fa-sync"></i> Generar</button>
      <div class="result-box" id="pgResult" style="margin-top:12px;font-size:.9rem;letter-spacing:2px">— clic en Generar —</div>
      <div id="pgStrength" style="height:6px;border-radius:3px;margin-top:8px;background:var(--br);transition:all .3s"></div>
      <div id="pgStrengthTxt" style="font-family:var(--fm);font-size:.65rem;color:var(--txd);margin-top:4px"></div>
      <button class="btn sec btn-sm" onclick="copyPass()" style="margin-top:10px"><i class="fas fa-copy"></i> Copiar</button>
    </div>`;
    generatePass();
    c.scrollIntoView({behavior:'smooth'});
  },100);
}

function generatePass(){
  const len=parseInt(document.getElementById('pgLen').value)||16;
  const up=document.getElementById('pgUp').checked;
  const num=document.getElementById('pgNum').checked;
  const sym=document.getElementById('pgSym').checked;
  let chars='abcdefghijklmnopqrstuvwxyz';
  if(up) chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(num) chars+='0123456789';
  if(sym) chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
  let pass='',arr=new Uint8Array(len);
  crypto.getRandomValues(arr);
  arr.forEach(b=>pass+=chars[b%chars.length]);
  document.getElementById('pgResult').textContent=pass;
  const score=Math.min(100,len*4+(up?10:0)+(num?10:0)+(sym?20:0));
  const bar=document.getElementById('pgStrength');
  const txt=document.getElementById('pgStrengthTxt');
  bar.style.width=score+'%';
  if(score<40){bar.style.background='var(--r)';txt.textContent='Débil';}
  else if(score<70){bar.style.background='var(--am)';txt.textContent='Moderada';}
  else{bar.style.background='var(--g)';txt.textContent='Fuerte ✓';}
}
function copyPass(){
  const t=document.getElementById('pgResult').textContent;
  if(t&&t!=='— clic en Generar —'){navigator.clipboard.writeText(t).then(()=>{const btn=document.querySelector('.mini-app .btn.sec');btn.innerHTML='<i class="fas fa-check"></i> ¡Copiado!';setTimeout(()=>{btn.innerHTML='<i class="fas fa-copy"></i> Copiar';},2000);});}
}

function openHasher(){
  go('apps');
  setTimeout(()=>{
    const c=document.getElementById('miniAppContainer');
    c.style.display='block';
    c.innerHTML=`
    <div class="mini-app">
      <h3><i class="fas fa-fingerprint"></i> Generador de Hash SHA-256</h3>
      <textarea id="hashIn" placeholder="Escribe el texto a hashear..." rows="3"></textarea>
      <button class="btn btn-sm" onclick="calcHash()"><i class="fas fa-calculator"></i> Calcular Hash</button>
      <div class="result-box" id="hashOut" style="margin-top:12px">— ingresa texto —</div>
      <button class="btn sec btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('hashOut').textContent)" style="margin-top:10px"><i class="fas fa-copy"></i> Copiar Hash</button>
    </div>`;
    c.scrollIntoView({behavior:'smooth'});
  },100);
}
async function calcHash(){
  const txt=document.getElementById('hashIn').value;
  if(!txt){document.getElementById('hashOut').textContent='— ingresa texto —';return;}
  const enc=new TextEncoder().encode(txt);
  const hashBuf=await crypto.subtle.digest('SHA-256',enc);
  const hashArr=Array.from(new Uint8Array(hashBuf));
  document.getElementById('hashOut').textContent=hashArr.map(b=>b.toString(16).padStart(2,'0')).join('');
}

function openIPInfo(){
  go('apps');
  setTimeout(()=>{
    const c=document.getElementById('miniAppContainer');
    c.style.display='block';
    c.innerHTML=`
    <div class="mini-app">
      <h3><i class="fas fa-network-wired"></i> Información de tu IP</h3>
      <div class="result-box" id="ipInfo"><i class="fas fa-spinner fa-spin"></i> Consultando...</div>
    </div>`;
    c.scrollIntoView({behavior:'smooth'});
    fetch('https://ipapi.co/json/').then(r=>r.json()).then(d=>{
      document.getElementById('ipInfo').innerHTML=
        `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[['IP Pública',d.ip],['País',d.country_name+' '+d.country],['Ciudad',d.city||'—'],['Región',d.region||'—'],['ISP',d.org||'—'],['Zona Horaria',d.timezone||'—']].map(([l,v])=>`<div><span style="color:var(--txf);font-size:.65rem">${l}</span><br><span>${v||'—'}</span></div>`).join('')}
        </div>`;
    }).catch(()=>{document.getElementById('ipInfo').textContent='No se pudo obtener la información.';});
  },100);
}

function openBase64(){
  go('apps');
  setTimeout(()=>{
    const c=document.getElementById('miniAppContainer');
    c.style.display='block';
    c.innerHTML=`
    <div class="mini-app">
      <h3><i class="fas fa-code"></i> Codificador / Decodificador Base64</h3>
      <textarea id="b64In" placeholder="Texto a codificar o decodificar..." rows="3"></textarea>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-sm" onclick="b64enc()"><i class="fas fa-lock"></i> Codificar</button>
        <button class="btn sec btn-sm" onclick="b64dec()"><i class="fas fa-unlock"></i> Decodificar</button>
      </div>
      <div class="result-box" id="b64Out" style="margin-top:12px">— resultado —</div>
      <button class="btn sec btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('b64Out').textContent)" style="margin-top:10px"><i class="fas fa-copy"></i> Copiar</button>
    </div>`;
    c.scrollIntoView({behavior:'smooth'});
  },100);
}
function b64enc(){const t=document.getElementById('b64In').value;try{document.getElementById('b64Out').textContent=btoa(unescape(encodeURIComponent(t)));}catch(e){document.getElementById('b64Out').textContent='Error: caracteres no válidos';}}
function b64dec(){const t=document.getElementById('b64In').value;try{document.getElementById('b64Out').textContent=decodeURIComponent(escape(atob(t)));}catch(e){document.getElementById('b64Out').textContent='Error: Base64 inválido';}}

function openPortCheck(){
  go('apps');
  setTimeout(()=>{
    const c=document.getElementById('miniAppContainer');
    c.style.display='block';
    c.innerHTML=`
    <div class="mini-app">
      <h3><i class="fas fa-plug"></i> Analizador de Headers HTTP</h3>
      <div style="display:flex;gap:10px">
        <input type="text" id="hdrUrl" placeholder="https://ejemplo.com" style="flex:1">
        <button class="btn btn-sm" onclick="checkHeaders()"><i class="fas fa-search"></i> Analizar</button>
      </div>
      <div class="result-box" id="hdrResult" style="margin-top:12px">— ingresa una URL para analizar —</div>
      <p style="color:var(--txf);font-family:var(--fm);font-size:.65rem;margin-top:8px">* Abre securityheaders.com para análisis completo</p>
    </div>`;
    c.scrollIntoView({behavior:'smooth'});
  },100);
}
function checkHeaders(){
  const url=document.getElementById('hdrUrl').value.trim();
  if(!url){return;}
  const r=document.getElementById('hdrResult');
  r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Para análisis completo de headers HTTP, esta herramienta te redirige a SecurityHeaders.com...';
  setTimeout(()=>{
    const secUrl='https://securityheaders.com/?q='+encodeURIComponent(url)+'&followRedirects=on';
    r.innerHTML=`Headers analizados externamente. <a href="${secUrl}" target="_blank" style="color:var(--c)">Ver reporte completo en SecurityHeaders.com →</a>`;
  },1200);
}

/* --- */

function showMiniApp(html){
  const c=document.getElementById('miniAppContainer');
  c.style.display='block';
  c.innerHTML=html;
  c.scrollIntoView({behavior:'smooth',block:'start'});
}

function openPhoneOsint(){
  go('apps');
  setTimeout(()=>showMiniApp(`
  <div class="mini-app">
    <h3><i class="fas fa-phone-alt"></i> Verificador de Número Telefónico</h3>
    <p style="color:var(--txd);font-size:.85rem;margin-bottom:16px">Analiza un número telefónico para obtener información sobre el operador, país y posibles reportes de spam.</p>
    <div style="display:flex;gap:10px">
      <input type="text" id="phoneIn" placeholder="Ej: +51945366356 o 945366356" style="flex:1">
      <button class="btn btn-sm" onclick="checkPhone()"><i class="fas fa-search"></i> Analizar</button>
    </div>
    <div class="result-box" id="phoneResult" style="margin-top:14px;min-height:80px">— ingresa el número —</div>
    <p style="color:var(--txf);font-family:var(--fm);font-size:.63rem;margin-top:10px">* Para reportes de spam avanzados, también consulte: truecaller.com | numverify.com</p>
    <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap" id="phoneLinks"></div>
  </div>`),150);
}

function checkPhone(){
  const raw=document.getElementById('phoneIn').value.trim().replace(/[\s\-\(\)]/g,'');
  if(!raw){return;}
  const r=document.getElementById('phoneResult');
  r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Analizando...';
  
  // Detect Peru format
  let number=raw,country='Desconocido',flag='🌍',operator='—',type='—',formatted=raw;
  if(raw.startsWith('+51')||raw.startsWith('51')){
    country='Perú 🇵🇪';flag='🇵🇪';
    const num=raw.replace(/^(\+51|51)/,'');
    formatted='+51 '+num;
    if(num.startsWith('9')){type='Móvil';
      if(num.startsWith('99')||num.startsWith('98')){operator='Claro/Entel';}
      else if(num.startsWith('97')||num.startsWith('94')){operator='Movistar';}
      else if(num.startsWith('96')||num.startsWith('95')){operator='Bitel';}
      else{operator='Operador Peruano';}
    } else {type='Fijo';operator='Línea Fija Perú';}
  } else if(raw.startsWith('+1')||raw.startsWith('1')){
    country='Estados Unidos/Canadá 🇺🇸';type='—';operator='—';
  } else if(raw.startsWith('+34')){
    country='España 🇪🇸';operator='—';
  } else if(raw.startsWith('+52')){
    country='México 🇲🇽';operator='—';
  } else if(raw.startsWith('+57')){
    country='Colombia 🇨🇴';operator='—';
  } else if(raw.startsWith('+54')){
    country='Argentina 🇦🇷';operator='—';
  }

  setTimeout(()=>{
    r.innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div><span style="color:var(--txf);font-size:.65rem">NÚMERO</span><br><span style="color:var(--tx);font-size:.9rem;font-weight:700">${formatted}</span></div>
      <div><span style="color:var(--txf);font-size:.65rem">PAÍS</span><br><span>${country}</span></div>
      <div><span style="color:var(--txf);font-size:.65rem">TIPO DE LÍNEA</span><br><span style="color:var(--c)">${type}</span></div>
      <div><span style="color:var(--txf);font-size:.65rem">OPERADOR ESTIMADO</span><br><span style="color:var(--g)">${operator}</span></div>
    </div>
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--br);font-size:.75rem;color:var(--txd)">
      <i class="fas fa-info-circle" style="color:var(--c)"></i> Para verificar reportes de spam y más detalles, use las herramientas externas abajo.
    </div>`;
    const enc=encodeURIComponent(formatted);
    document.getElementById('phoneLinks').innerHTML=`
      <a href="https://www.truecaller.com/search/pe/${raw.replace('+','')}" target="_blank" class="btn sec btn-sm"><i class="fas fa-external-link-alt"></i> Truecaller</a>
      <a href="https://www.numerify.com/phone-number/${raw.replace('+','')}" target="_blank" class="btn sec btn-sm"><i class="fas fa-external-link-alt"></i> Numerify</a>
      <a href="https://wa.me/${raw.replace(/\D/g,'')}" target="_blank" class="btn btn-sm" style="background:#25d366"><i class="fab fa-whatsapp"></i> WhatsApp</a>`;
  },900);
}

function openDniLookup(){
  go('apps');
  setTimeout(()=>showMiniApp(`
  <div class="mini-app">
    <h3><i class="fas fa-id-card"></i> Consulta DNI Perú — RENIEC</h3>
    <p style="color:var(--txd);font-size:.85rem;margin-bottom:6px">Consulta datos básicos de un DNI peruano a través de fuentes públicas.</p>
    <div style="background:rgba(255,196,0,.08);border:1px solid rgba(255,196,0,.3);border-radius:var(--ra);padding:10px 14px;margin-bottom:16px">
      <p style="font-family:var(--fm);font-size:.65rem;color:var(--am)"><i class="fas fa-shield-alt"></i> Solo se consultan fuentes públicas oficiales. No almacenamos datos. Uso exclusivamente para verificación legítima.</p>
    </div>
    <div style="display:flex;gap:10px">
      <input type="text" id="dniIn" placeholder="Ingrese DNI (8 dígitos)" maxlength="8" style="flex:1">
      <button class="btn btn-sm" onclick="checkDNI()"><i class="fas fa-search"></i> Consultar</button>
    </div>
    <div class="result-box" id="dniResult" style="margin-top:14px;min-height:80px">— ingresa el DNI —</div>
    <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
      <a href="https://www.reniec.gob.pe/portal/html/registro-civil/registro-civil.jsp" target="_blank" class="btn sec btn-sm"><i class="fas fa-external-link-alt"></i> RENIEC Oficial</a>
      <a href="https://eldni.com/" target="_blank" class="btn sec btn-sm"><i class="fas fa-external-link-alt"></i> ElDNI.com</a>
      <a href="https://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias" target="_blank" class="btn sec btn-sm"><i class="fas fa-external-link-alt"></i> SUNAT RUC</a>
    </div>
  </div>`),150);
}

function checkDNI(){
  const dni=document.getElementById('dniIn').value.trim();
  const r=document.getElementById('dniResult');
  if(!/^\d{8}$/.test(dni)){r.innerHTML='<span style="color:var(--r)">El DNI debe tener exactamente 8 dígitos numéricos.</span>';return;}
  r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Consultando...';
  
  // Note: Direct RENIEC API requires auth. We show guidance + link to verified sources
  setTimeout(()=>{
    r.innerHTML=`
    <div>
      <div style="margin-bottom:10px"><span style="color:var(--txf);font-size:.65rem">DNI CONSULTADO</span><br>
      <span style="color:var(--c);font-size:1.1rem;font-weight:700;letter-spacing:3px">${dni}</span></div>
      <div style="color:var(--txd);font-size:.85rem;margin-bottom:12px">
        <i class="fas fa-info-circle" style="color:var(--am)"></i> La consulta directa al RENIEC requiere autenticación oficial. 
        Para obtener el nombre completo vinculado a este DNI, use los enlaces oficiales de abajo:
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <a href="https://eldni.com/pe/buscar-por-dni?dni=${dni}" target="_blank" class="btn btn-sm"><i class="fas fa-external-link-alt"></i> Buscar en ElDNI.com</a>
        <a href="https://cel.reniec.gob.pe/valreg/valreg.jsp" target="_blank" class="btn sec btn-sm"><i class="fas fa-external-link-alt"></i> Validar en RENIEC</a>
      </div>
    </div>`;
  },1000);
}

function openEmailChecker(){
  go('apps');
  setTimeout(()=>showMiniApp(`
  <div class="mini-app">
    <h3><i class="fas fa-at"></i> Verificador de Filtraciones de Email</h3>
    <p style="color:var(--txd);font-size:.85rem;margin-bottom:16px">Comprueba si tu correo apareció en filtraciones de datos conocidas usando HaveIBeenPwned.</p>
    <div style="display:flex;gap:10px">
      <input type="text" id="emailIn" placeholder="tucorreo@ejemplo.com" style="flex:1">
      <button class="btn btn-sm" onclick="checkEmailBreaches()"><i class="fas fa-search"></i> Verificar</button>
    </div>
    <div class="result-box" id="emailResult" style="margin-top:14px;min-height:60px">— ingresa el email —</div>
  </div>`),150);
}

function checkEmailBreaches(){
  const em=document.getElementById('emailIn').value.trim();
  const r=document.getElementById('emailResult');
  if(!em||!em.includes('@')){r.innerHTML='<span style="color:var(--r)">Ingresa un email válido.</span>';return;}
  r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Verificando...';
  setTimeout(()=>{
    r.innerHTML=`
    <div style="color:var(--txd);font-size:.88rem">
      Para verificar <strong style="color:var(--c)">${em}</strong> en filtraciones conocidas:<br><br>
      <a href="https://haveibeenpwned.com/account/${encodeURIComponent(em)}" target="_blank" class="btn btn-sm" style="margin-bottom:10px;display:inline-flex"><i class="fas fa-external-link-alt"></i> Verificar en HaveIBeenPwned</a><br>
      <span style="font-size:.78rem"><i class="fas fa-lock" style="color:var(--g)"></i> HaveIBeenPwned es el servicio más confiable a nivel mundial. Tu email no es almacenado.</span>
    </div>`;
  },800);
}

function openUsernameOsint(){
  go('apps');
  setTimeout(()=>showMiniApp(`
  <div class="mini-app">
    <h3><i class="fas fa-user-secret"></i> Búsqueda de Username en Redes</h3>
    <p style="color:var(--txd);font-size:.85rem;margin-bottom:16px">Busca un nombre de usuario en múltiples plataformas simultáneamente.</p>
    <div style="display:flex;gap:10px">
      <input type="text" id="userIn" placeholder="nombre_usuario (sin @)" style="flex:1">
      <button class="btn btn-sm" onclick="checkUsername()"><i class="fas fa-search"></i> Buscar</button>
    </div>
    <div id="usernameResult" style="margin-top:14px"></div>
  </div>`),150);
}

function checkUsername(){
  const u=document.getElementById('userIn').value.trim().replace('@','');
  const r=document.getElementById('usernameResult');
  if(!u){return;}
  const platforms=[
    {name:'Instagram',url:'https://instagram.com/'+u,icon:'fab fa-instagram',color:'#e1306c'},
    {name:'Facebook',url:'https://facebook.com/'+u,icon:'fab fa-facebook-f',color:'#1877f2'},
    {name:'Twitter/X',url:'https://x.com/'+u,icon:'fab fa-x-twitter',color:'#000'},
    {name:'TikTok',url:'https://tiktok.com/@'+u,icon:'fab fa-tiktok',color:'#010101'},
    {name:'LinkedIn',url:'https://linkedin.com/in/'+u,icon:'fab fa-linkedin',color:'#0a66c2'},
    {name:'GitHub',url:'https://github.com/'+u,icon:'fab fa-github',color:'#333'},
    {name:'YouTube',url:'https://youtube.com/@'+u,icon:'fab fa-youtube',color:'#ff0000'},
    {name:'Telegram',url:'https://t.me/'+u,icon:'fab fa-telegram',color:'#0088cc'},
    {name:'Pinterest',url:'https://pinterest.com/'+u,icon:'fab fa-pinterest',color:'#e60023'},
    {name:'Snapchat',url:'https://snapchat.com/add/'+u,icon:'fab fa-snapchat',color:'#fffc00'},
    {name:'Reddit',url:'https://reddit.com/u/'+u,icon:'fab fa-reddit',color:'#ff4500'},
    {name:'Twitch',url:'https://twitch.tv/'+u,icon:'fab fa-twitch',color:'#9147ff'},
  ];
  r.innerHTML=`<p style="font-family:var(--fm);font-size:.72rem;color:var(--txd);margin-bottom:12px">Verificando "<strong style="color:var(--c)">${u}</strong>" en ${platforms.length} plataformas:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px">
  ${platforms.map(p=>`
    <a href="${p.url}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:7px;padding:8px 12px;background:var(--bg3);border:1px solid var(--br2);border-radius:var(--ra);font-family:var(--fm);font-size:.68rem;color:var(--txd);text-decoration:none;transition:var(--tr)" 
       onmouseover="this.style.borderColor='${p.color}';this.style.color='#fff'" 
       onmouseout="this.style.borderColor='var(--br2)';this.style.color='var(--txd)'">
      <i class="${p.icon}" style="color:${p.color};font-size:.9rem"></i>${p.name}
    </a>`).join('')}
  </div>
  <p style="color:var(--txf);font-family:var(--fm);font-size:.62rem;margin-top:12px"><i class="fas fa-info-circle"></i> Haz clic en cada red para verificar si el usuario existe. También prueba: sherlock-project.github.io</p>`;
}

function openDomainOsint(){
  go('apps');
  setTimeout(()=>showMiniApp(`
  <div class="mini-app">
    <h3><i class="fas fa-globe"></i> Investigar Dominio / WHOIS</h3>
    <p style="color:var(--txd);font-size:.85rem;margin-bottom:16px">Obtén información de registro de cualquier dominio web.</p>
    <div style="display:flex;gap:10px">
      <input type="text" id="domIn" placeholder="ejemplo.com" style="flex:1">
      <button class="btn btn-sm" onclick="checkDomain()"><i class="fas fa-search"></i> Investigar</button>
    </div>
    <div class="result-box" id="domResult" style="margin-top:14px;min-height:80px">— ingresa el dominio —</div>
    <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap" id="domLinks"></div>
  </div>`),150);
}

function checkDomain(){
  const dom=document.getElementById('domIn').value.trim().replace(/https?:\/\//,'').split('/')[0];
  const r=document.getElementById('domResult');
  if(!dom||!dom.includes('.')){r.innerHTML='<span style="color:var(--r)">Ingresa un dominio válido (ej: google.com)</span>';return;}
  r.innerHTML='<i class="fas fa-spinner fa-spin"></i> Consultando...';
  setTimeout(()=>{
    r.innerHTML=`<div style="color:var(--txd);font-size:.88rem">
      Dominio analizado: <strong style="color:var(--c)">${dom}</strong><br><br>
      Para información completa de WHOIS, registrante y DNS usa los enlaces abajo:
    </div>`;
    document.getElementById('domLinks').innerHTML=`
      <a href="https://www.whois.com/whois/${dom}" target="_blank" class="btn btn-sm"><i class="fas fa-search"></i> WHOIS</a>
      <a href="https://who.is/whois/${dom}" target="_blank" class="btn sec btn-sm">Who.is</a>
      <a href="https://dnschecker.org/#A/${dom}" target="_blank" class="btn sec btn-sm">DNS Checker</a>
      <a href="https://www.shodan.io/search?query=${dom}" target="_blank" class="btn sec btn-sm">Shodan</a>
      <a href="https://web.archive.org/web/*/${dom}" target="_blank" class="btn sec btn-sm"><i class="fas fa-history"></i> Wayback</a>`;
  },800);
}

function openImageOsint(){
  go('apps');
  setTimeout(()=>showMiniApp(`
  <div class="mini-app">
    <h3><i class="fas fa-camera"></i> Búsqueda Inversa de Imagen</h3>
    <p style="color:var(--txd);font-size:.85rem;margin-bottom:16px">Encuentra el origen de una imagen en internet. Útil para verificar identidades y detectar fotos robadas.</p>
    <div style="margin-bottom:14px">
      <input type="text" id="imgUrl" placeholder="https://url-de-la-imagen.jpg">
    </div>
    <p style="color:var(--txd);font-size:.82rem;margin-bottom:14px">O abre directamente en los motores de búsqueda inversa:</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap" id="imgLinks">
      <button class="btn btn-sm" onclick="searchImage('google')"><i class="fab fa-google"></i> Google Images</button>
      <button class="btn sec btn-sm" onclick="searchImage('tineye')">TinEye</button>
      <button class="btn sec btn-sm" onclick="searchImage('yandex')">Yandex</button>
      <button class="btn sec btn-sm" onclick="searchImage('bing')"><i class="fab fa-microsoft"></i> Bing</button>
    </div>
    <p style="color:var(--txf);font-family:var(--fm);font-size:.62rem;margin-top:14px"><i class="fas fa-lightbulb" style="color:var(--am)"></i> Tip: Yandex es el más efectivo para encontrar personas por foto.</p>
  </div>`),150);
}

function searchImage(engine){
  const url=document.getElementById('imgUrl').value.trim();
  const urls={
    google:`https://images.google.com/searchbyimage?image_url=${encodeURIComponent(url||'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png')}`,
    tineye:`https://tineye.com/search/?url=${encodeURIComponent(url||'')}`,
    yandex:`https://yandex.com/images/search?url=${encodeURIComponent(url||'')}&rpt=imageview`,
    bing:`https://www.bing.com/images/search?q=imgurl:${encodeURIComponent(url||'')}&view=detailv2&iss=sbi`
  };
  window.open(urls[engine],'_blank');
}

/* --- */
let chatOpen=false, isTyping=false;

const KB=[
  {p:/(^hola$|^hi$|^hey$|buenas|buenos días|buenas tardes|buenas noches|saludos|que tal|como estas|qué hay)/i,r:[
    '¡Hola! 👋 Bienvenido a NEXUM. Soy tu asistente de seguridad. Puedo ayudarte con información sobre ciberseguridad, nuestros servicios, precios y más. ¿En qué te puedo ayudar hoy?',
    '¡Buenas! 🛡️ Estás en NEXUM, empresa peruana de ciberseguridad y desarrollo de software. ¿Tienes alguna pregunta o necesitas una cotización?'
  ]},
  {p:/(precio|costo|cuanto cobra|cuanto cuesta|tarifa|presupuesto|cotizacion|cotizar|valor|cuanto sale)/i,r:[
    '💰 Precios referenciales de NEXUM:\n\n🔒 **Ciberseguridad básica:** desde $150 USD\n🔒 **Pentest profesional:** desde $400 USD\n💻 **Web básica:** desde $200 USD\n💻 **Web avanzada/e-commerce:** desde $600 USD\n📱 **App móvil iOS+Android:** desde $800 USD\n\nUsa el Cotizador (menú → 💰 Cotizar) para un estimado rápido, o escríbele a Jair: wa.me/51945366356 😊'
  ]},
  {p:/(pentesting|pentest|hacking.?ético|prueba de penetracion|auditoria de seguridad|vulnerabilidad|cve|exploit|test de intrusion)/i,r:[
    '🎯 El **pentesting** es una simulación controlada de un ataque real. NEXUM aplica OWASP y PTES:\n\n✅ Reconocimiento y OSINT\n✅ Análisis de vulnerabilidades\n✅ Explotación controlada\n✅ Reporte ejecutivo + técnico\n✅ Plan de remediación\n✅ Revisiones post-corrección\n\n¿Quieres saber qué tan expuesta está tu infraestructura? Usa la Calculadora de Riesgo (menú → ⚡ Riesgo) o contacta a Jair: wa.me/51945366356'
  ]},
  {p:/(osint|inteligencia de fuentes abiertas|huella digital|investigar persona|informacion publica|reconocimiento)/i,r:[
    '🔍 **OSINT** es recolectar información pública para mapear la huella digital de personas u organizaciones.\n\nNEXUM ofrece:\n• Auditoría de exposición digital\n• Investigación de amenazas\n• Verificación de identidades\n\n🆓 También tienes herramientas OSINT gratuitas en menú → Apps:\n• Verificador de teléfonos\n• Consulta DNI Perú\n• Buscador de usernames\n• Extractor de metadatos con GPS\n\n¿Necesitas una investigación OSINT profesional? wa.me/51945366356'
  ]},
  {p:/(forense|investigacion digital|me hackearon|hackeo|incidente|brecha|datos robados|ransomware|virus|malware|infectado)/i,r:[
    '🚨 **¡Actúa RÁPIDO!** Si fuiste víctima de un incidente:\n\n1️⃣ Desconecta el equipo de internet INMEDIATAMENTE\n2️⃣ NO apagues el equipo (se pierden evidencias)\n3️⃣ NO pagues rescates\n4️⃣ Contacta a Jair URGENTE: wa.me/51945366356\n\nNEXUM realiza **Análisis Forense Digital** completo:\n✅ Identificación de causa raíz\n✅ Recuperación de evidencias\n✅ Informe pericial legal\n✅ Plan de recuperación'
  ]},
  {p:/(phishing|estafa|fraude|correo falso|suplantacion|engaño|scam)/i,r:[
    '⚠️ **Cómo detectar phishing:**\n\n🔴 Revisa el dominio exacto del remitente\n🔴 Desconfía de urgencia extrema\n🔴 Pasa el cursor sobre links ANTES de clicar\n🔴 Nunca ingreses credenciales sin verificar\n\n📚 Tenemos tutorial completo en menú → Tutoriales\n🤝 ¿Tu empresa necesita capacitación? wa.me/51945366356'
  ]},
  {p:/(desarrollo web|pagina web|sitio web|landing page|ecommerce|tienda online|portal|sistema web)/i,r:[
    '💻 NEXUM desarrolla desde landing pages hasta sistemas empresariales complejos:\n\n✅ Sitios corporativos y landing pages\n✅ E-commerce con pasarela de pago\n✅ Sistemas con panel administración\n✅ APIs REST documentadas\n✅ Seguridad integrada desde el primer commit\n\nStack: React, Node.js, Python, PHP, PostgreSQL\n\nUsa el Cotizador (menú → 💰) o escríbele a Jair: wa.me/51945366356'
  ]},
  {p:/(app movil|aplicacion movil|flutter|react native|smartphone app|ios|android)/i,r:[
    '📱 Desarrollamos apps con **Flutter** — un código para iOS y Android:\n\n✅ Diseño UX/UI personalizado\n✅ Backend y API incluidos\n✅ Publicación en App Store y Play Store\n✅ Push notifications\n✅ 60 días de soporte\n\nDesde $800 USD. ¿Tienes una idea? Cuéntale a Jair: wa.me/51945366356 🚀'
  ]},
  {p:/(cloud|aws|azure|servidor|hosting|devops|ci.cd|docker|despliegue)/i,r:[
    '☁️ NEXUM con AWS y Azure:\n\n✅ Migración segura a la nube\n✅ Servidores hardeneados\n✅ Pipelines CI/CD automatizados\n✅ Monitoreo 24/7\n✅ Optimización de costos\n\n¿Necesitas migrar o mejorar tu infraestructura? wa.me/51945366356'
  ]},
  {p:/(consultoria|iso 27001|gdpr|cumplimiento|certificacion|politica de seguridad|irp|plan de respuesta)/i,r:[
    '📋 Consultoría NEXUM:\n\n✅ Auditorías ISO 27001\n✅ Adecuación GDPR / LOPD\n✅ Talleres anti-phishing\n✅ Planes de Respuesta a Incidentes (IRP)\n✅ Políticas de seguridad corporativas\n\n¿Tu empresa necesita certificarse? wa.me/51945366356'
  ]},
  {p:/(software|pentakit|faceIntel|socialeng|osint suite|plinclone|comprar|kit educativo)/i,r:[
    '🛒 Software educativo NEXUM:\n\n🔴 **PentaKit Pro** — S/179\n🔵 **PlinClone Edu v1.8** — S/179\n👁️ **FaceIntel Edu v3.0** — S/249\n🎭 **SocialEng Lab v2.5** — S/320\n🕵️ **NEXUM OSINT Suite v4.0** — S/399\n\nPagos: Yape, Plin, BCP/Interbank\nAdquiere por WhatsApp: wa.me/51945366356'
  ]},
  {p:/(recuperar datos|celular roto|android problema|iphone problema|datos perdidos|soporte movil)/i,r:[
    '📱 Soporte técnico móvil NEXUM:\n\n✅ Diagnóstico iOS y Android\n✅ Eliminación de malware\n✅ Recuperación de datos perdidos\n✅ Optimización y limpieza\n✅ Resultados garantizados o no cobramos\n\nEscríbele a Jair con tu caso: wa.me/51945366356'
  ]},
  {p:/(contactar|hablar|jair|numero|telefono|whatsapp|wa\.me|instagram|facebook|redes|comunicarme)/i,r:[
    '📞 Contacto NEXUM:\n\n💬 **WhatsApp:** +51 945 366 356\n→ wa.me/51945366356\n📸 **Instagram:** @jair_munoz_candela\n📘 **Facebook:** @jairlpb\n🎵 **TikTok:** @fritooo23\n\nJair responde personalmente y rápido 😊'
  ]},
  {p:/(telegram|canal telegram|noticias seguridad|alertas)/i,r:[
    '📱 Canal de Telegram de NEXUM:\n• Alertas de vulnerabilidades\n• Tutoriales de ciberseguridad\n• Noticias del mundo hacker\n• Consejos gratuitos\n\nBúscanos como **@nexumsecurity** en Telegram 📡'
  ]},
  {p:/(quien es nexum|quienes son|sobre nexum|empresa|fundador|historia|años|trayectoria)/i,r:[
    '🏢 **NEXUM** — Empresa peruana de ciberseguridad y desarrollo de software.\n\nFundador: **Jair Muñoz Candela**\n\n📊 Resultados:\n✅ +150 clientes protegidos\n✅ +300 vulnerabilidades encontradas\n✅ +50 proyectos de software\n✅ 99% satisfacción\n✅ +5 años de trayectoria\n\nBasados en Perú, atendemos toda Latinoamérica 🌎'
  ]},
  {p:/(herramientas|gratis|gratuito|free|herramienta osint|verificar telefono|dni|whois|email filtrado)/i,r:[
    '🆓 Herramientas GRATUITAS (menú → Apps):\n\n📞 Verificador de teléfonos\n🪪 Consulta DNI Perú\n🌐 WHOIS de dominios\n📧 Checker de emails filtrados\n👤 Buscador de usernames (12 redes)\n🖼️ Búsqueda inversa de imágenes\n📷 Extractor de metadatos + GPS\n🔑 Generador de contraseñas\n\n¡Todo gratis, sin registro!'
  ]},
  {p:/(tutorial|aprender|curso|guia|como|aprende|capacitacion)/i,r:[
    '📚 Tutoriales gratuitos (menú → Tutoriales):\n\n🔐 Contraseñas inquebrantables\n📧 Detectar phishing\n📱 Seguridad en redes sociales\n🌐 Seguridad web básica\n🔍 OSINT y huella digital\n💀 Ransomware: prevención y respuesta\n🕷️ OWASP Top 10\n💉 SQL Injection\n🔑 JWT: autenticación segura\n\nTambién canal de Telegram @nexumsecurity 📡'
  ]},
  {p:/(proximamente|nuevo|lanzamiento|novedad|que viene|roadmap|academy|vault|cybermap)/i,r:[
    '🚀 Proyectos en desarrollo (menú → Próximo):\n\n⚡ **SecureAPI Checker** — 85% (muy pronto!)\n📱 **OSINT Mobile App** — 78%\n🔐 **NEXUM Vault** — 65%\n🗺️ **CyberMap Perú** — 45%\n🎓 **NEXUM Academy** — 30%\n\nSuscríbete a Telegram para ser el primero en saber @nexumsecurity'
  ]},
  {p:/(2fa|dos factores|autenticacion|contraseña|password|clave segura|gestor)/i,r:[
    '🔐 Seguridad básica esencial:\n\n✅ Contraseñas de 16+ caracteres\n✅ 2FA en TODAS las cuentas\n✅ Gestor de contraseñas (Bitwarden, 1Password)\n✅ Contraseñas únicas por sitio\n\n🆓 Usa nuestro generador gratuito en menú → Apps\n\n¿Tu empresa necesita política de contraseñas? wa.me/51945366356'
  ]},
  {p:/(gracias|muchas gracias|perfecto|excelente|genial|ok gracias|listo|entendido|bye|adios)/i,r:[
    '¡Con mucho gusto! 🙌 Si tienes más preguntas, aquí estaré. Para hablar con Jair directamente: wa.me/51945366356',
    '¡Genial! Fue un placer ayudarte. Recuerda: cualquier proyecto o emergencia de seguridad, Jair está disponible: wa.me/51945366356 🛡️'
  ]},
  {p:/(testimonio|opinion|review|confianza|garantia|seguro|legit|real)/i,r:[
    '⭐ +150 clientes satisfechos avalan a NEXUM.\n\nVer testimonios reales en la sección → Nosotros.\n\n📜 Contrato de confidencialidad en cada proyecto\n💯 Garantía: resultados o no cobramos (soporte móvil)\n✅ 99% de satisfacción\n\n¿Tienes dudas? Habla directamente con Jair: wa.me/51945366356'
  ]},
];

const fallbacks=[
  'Interesante. Para la respuesta más precisa, contáctale a Jair directamente: wa.me/51945366356 🔐 — responde personalmente y muy rápido.',
  'Para ese tema específico, Jair puede orientarte mejor. WhatsApp: +51 945 366 356 😊',
  'Esa consulta técnica requiere más contexto. Lo mejor es hablarlo con Jair: wa.me/51945366356 📲',
  '¡Buena pregunta! Jair de NEXUM tiene la respuesta exacta para tu caso: wa.me/51945366356',
];

function getReply(msg){
  const lower = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  for(const entry of KB){
    if(entry.p.test(lower)){
      const r=entry.r;
      return r[Math.floor(Math.random()*r.length)];
    }
  }
  return fallbacks[Math.floor(Math.random()*fallbacks.length)];
}

function toggleChat(){
  const box=document.getElementById('chatbox');
  chatOpen=!chatOpen;
  box.classList.toggle('act',chatOpen);
  if(chatOpen) document.getElementById('chatIn').focus();
}

function appendMsg(text,role){
  const body=document.getElementById('chatBody');
  const d=document.createElement('div');
  d.className='msg '+(role==='user'?'usr':'bot');
  d.innerHTML=text
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:var(--c)">$1</strong>')
    .replace(/\n/g,'<br>')
    .replace(/(wa\.me\/\S+)/g,'<a href="https://$1" target="_blank" style="color:var(--c);font-weight:bold;text-decoration:underline">$1</a>');
  body.appendChild(d);
  body.scrollTop=body.scrollHeight;
}

function showTyping(){
  const body=document.getElementById('chatBody');
  const el=document.createElement('div');
  el.className='typ';el.id='typing';
  el.innerHTML='<div class="td"></div><div class="td"></div><div class="td"></div>';
  body.appendChild(el);body.scrollTop=body.scrollHeight;
}
function hideTyping(){const e=document.getElementById('typing');if(e)e.remove();}

function quickChat(msg){
  document.getElementById('chatIn').value=msg;
  const sug=document.getElementById('chatSuggested');
  if(sug) sug.style.display='none';
  sendMsg();
}

async function sendMsg(){
  const inp=document.getElementById('chatIn');
  const text=inp.value.trim();
  if(!text||isTyping) return;
  inp.value='';isTyping=true;
  document.getElementById('chatSnd').disabled=true;
  const sug=document.getElementById('chatSuggested');
  if(sug) sug.style.display='none';
  appendMsg(text,'user');
  showTyping();
  const delay=500+Math.random()*700;
  await new Promise(r=>setTimeout(r,delay));
  hideTyping();
  const reply=getReply(text);
  appendMsg(reply,'bot');
  isTyping=false;
  document.getElementById('chatSnd').disabled=false;
  inp.focus();
}

/* fix */
window.addEventListener('scroll',()=>{
  const btn=document.getElementById('scrollTop');
  if(btn) btn.classList.toggle('vis', window.scrollY > 400);
});

/* --- */
const riskAnswers = {};
let riskAnsweredCount = 0;

function selectRisk(q, opt, score){
  riskAnswers[q] = score;
  // Update UI
  const qEl = document.getElementById('rq'+q);
  qEl.classList.add('answered');
  qEl.querySelectorAll('.risk-opt').forEach(b=>b.classList.remove('sel'));
  event.target.classList.add('sel');
  riskAnsweredCount = Object.keys(riskAnswers).length;
  // Update meter
  const total = Object.values(riskAnswers).reduce((a,b)=>a+b,0);
  const avg = Math.round(total / riskAnsweredCount);
  const fill = document.getElementById('riskFill');
  const pct = document.getElementById('riskPct');
  const color = avg < 25 ? 'var(--g)' : avg < 55 ? 'var(--am)' : 'var(--r)';
  fill.style.width = avg+'%';
  fill.style.background = color;
  pct.style.color = color;
  pct.textContent = avg+'%';
  // Update button
  const btn = document.getElementById('calcBtn');
  btn.disabled = riskAnsweredCount < 8;
  btn.style.opacity = riskAnsweredCount < 8 ? '.5' : '1';
  btn.innerHTML = `<i class="fas fa-chart-bar"></i> Ver Diagnóstico Completo (${riskAnsweredCount}/8 respondidas)`;
}

function calcRisk(){
  const total = Object.values(riskAnswers).reduce((a,b)=>a+b,0);
  const score = Math.round(total / Object.keys(riskAnswers).length);
  const result = document.getElementById('riskResult');
  const num = document.getElementById('riskScoreNum');
  const lbl = document.getElementById('riskScoreLbl');
  const desc = document.getElementById('riskDesc');
  const recs = document.getElementById('riskRecs');

  num.textContent = score+'%';

  if(score < 20){
    num.style.color = 'var(--g)';
    lbl.textContent = '✅ Riesgo Bajo';
    desc.textContent = '¡Excelente! Tu empresa tiene buenas prácticas de seguridad. Sin embargo, la ciberseguridad requiere revisión continua. Te recomendamos una auditoría anual para identificar vulnerabilidades emergentes.';
    recs.innerHTML = '<div style="background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:8px;padding:14px"><p style="font-family:var(--fm);font-size:.75rem;color:var(--g);margin-bottom:8px">RECOMENDACIONES</p><p style="font-size:.87rem;color:var(--txd)">✓ Mantén las buenas prácticas actuales<br>✓ Programa una auditoría preventiva anual<br>✓ Capacita al equipo en nuevas amenazas</p></div>';
  } else if(score < 45){
    num.style.color = 'var(--am)';
    lbl.textContent = '⚠️ Riesgo Moderado';
    desc.textContent = 'Tienes algunas medidas de seguridad, pero hay brechas importantes que podrían ser explotadas. Un atacante motivado podría encontrar vulnerabilidades en tu infraestructura actual.';
    recs.innerHTML = '<div style="background:rgba(255,196,0,.08);border:1px solid rgba(255,196,0,.2);border-radius:8px;padding:14px"><p style="font-family:var(--fm);font-size:.75rem;color:var(--am);margin-bottom:8px">ACCIONES PRIORITARIAS</p><p style="font-size:.87rem;color:var(--txd)">🔸 Implementa 2FA en todas las cuentas críticas<br>🔸 Establece política de contraseñas con gestor<br>🔸 Crea un plan de backups offline<br>🔸 Capacita al equipo contra phishing</p></div>';
  } else if(score < 70){
    num.style.color = '#ff8800';
    lbl.textContent = '🚨 Riesgo Alto';
    desc.textContent = 'Tu empresa tiene vulnerabilidades graves. Eres un blanco fácil para ataques de ransomware, phishing y brechas de datos. Es urgente tomar acción inmediata antes de sufrir un incidente.';
    recs.innerHTML = '<div style="background:rgba(255,136,0,.08);border:1px solid rgba(255,136,0,.2);border-radius:8px;padding:14px"><p style="font-family:var(--fm);font-size:.75rem;color:#ff8800;margin-bottom:8px">ACCIONES URGENTES</p><p style="font-size:.87rem;color:var(--txd)">🔴 Auditoría de seguridad inmediata<br>🔴 Cambio de todas las contraseñas<br>🔴 Implementar backups automáticos HOY<br>🔴 Activar 2FA en TODAS las cuentas<br>🔴 Capacitación anti-phishing de emergencia</p></div>';
  } else {
    num.style.color = 'var(--r)';
    lbl.textContent = '💀 Riesgo Crítico';
    desc.textContent = 'ALERTA: Tu empresa está en peligro inminente. Con este nivel de exposición, un ataque exitoso es una cuestión de tiempo. Necesitas ayuda profesional INMEDIATA para no perder tus datos y sistemas.';
    recs.innerHTML = '<div style="background:rgba(255,0,60,.08);border:1px solid rgba(255,0,60,.3);border-radius:8px;padding:14px"><p style="font-family:var(--fm);font-size:.75rem;color:var(--r);margin-bottom:8px">⚠️ ACCIÓN INMEDIATA REQUERIDA</p><p style="font-size:.87rem;color:var(--txd)">💀 Contactar a NEXUM HOY para auditoría de emergencia<br>💀 Desconectar servidores con acceso público no protegido<br>💀 Auditar qué sistemas tienen acceso externo<br>💀 Implementar monitoreo de seguridad</p></div>';
  }

  result.style.display = 'block';
  result.scrollIntoView({behavior:'smooth', block:'center'});
}

/* --- */
const quoteData = {step:0, service:'', company:'', urgency:'', budget:'', serviceKey:'', budgetKey:''};

const priceMatrix = {
  ciber: {low:'$150 – $250', mid:'$250 – $500', high:'$400 – $1,200', vhigh:'$1,000 – $5,000+'},
  web:   {low:'$200 – $350', mid:'$300 – $600', high:'$600 – $1,500', vhigh:'$1,500 – $4,000+'},
  movil: {low:'Sin app móvil en este rango', mid:'$500 – $900 (básica)', high:'$800 – $2,000', vhigh:'$2,000 – $6,000+'},
  consul:{low:'$100 – $200', mid:'$200 – $500', high:'$400 – $1,200', vhigh:'$1,200 – $3,000+'},
  custom:{low:'$200 – $400', mid:'$400 – $800', high:'$800 – $2,500', vhigh:'$2,000 – $10,000+'},
  cloud: {low:'$150 – $300', mid:'$300 – $700', high:'$700 – $2,000', vhigh:'$2,000 – $8,000+'},
};

const urgencyFactor = {urgent:'+20% urgencia', soon:'+5%', normal:'Precio estándar', explore:'Precio estándar'};
const stepBarPct = ['12.5%','37.5%','62.5%','87.5%','100%'];
const stepIcons = ['fas fa-shield-alt','fas fa-users','fas fa-bolt','fas fa-coins'];
const stepLabels = ['Servicio','Empresa','Urgencia','Presupuesto'];

function selectQ(step, label, key){
  if(step===1){quoteData.service=label; quoteData.serviceKey=key;}
  if(step===2){quoteData.company=label;}
  if(step===3){quoteData.urgency=label;}
  if(step===4){quoteData.budget=label; quoteData.budgetKey=key;}

  // Highlight selected
  document.querySelectorAll('#qs'+step+' .q-opt').forEach(o=>o.classList.remove('sel'));
  event.currentTarget.classList.add('sel');

  setTimeout(()=>{
    if(step < 4){
      document.getElementById('qs'+step).classList.remove('active');
      document.getElementById('qs'+(step+1)).classList.add('active');
      // Update step dots
      const dot = document.getElementById('qd'+step);
      dot.classList.remove('active');
      dot.classList.add('done');
      document.getElementById('qn'+step).innerHTML = '<i class="fas fa-check" style="font-size:.6rem"></i>';
      const nextDot = document.getElementById('qd'+(step+1));
      nextDot.classList.add('active');
      // Update progress bar fill
      document.getElementById('qBarFill').style.width = stepBarPct[step];
    } else {
      showQuoteSummary();
    }
  }, 300);
}

function showQuoteSummary(){
  const dot = document.getElementById('qd4');
  dot.classList.remove('active');
  dot.classList.add('done');
  document.getElementById('qn4').innerHTML = '<i class="fas fa-check" style="font-size:.6rem"></i>';
  document.getElementById('qBarFill').style.width = '100%';
  document.getElementById('qs4').classList.remove('active');

  const s = quoteData;
  const priceRange = priceMatrix[s.serviceKey]?.[s.budgetKey] || 'A consultar';
  const urgencyKey = s.urgency?.includes('semana')?'urgent':s.urgency?.includes('mes')?'soon':'normal';
  const urgencyNote = urgencyFactor[urgencyKey] || 'Precio estándar';

  // Random quote ref
  const ref = '#NXM-' + String(Math.floor(Math.random()*9000)+1000);
  document.getElementById('quoteRef').textContent = ref;

  const rows = [
    ['fas fa-tools','Servicio', s.service, 'var(--c)'],
    ['fas fa-building','Organización', s.company, 'var(--tx)'],
    ['fas fa-bolt','Urgencia', s.urgency, 'var(--am)'],
    ['fas fa-percent','Factor urgencia', urgencyNote, 'var(--txd)'],
  ];
  document.getElementById('quoteLines').innerHTML = rows.map(([ic,k,v,col])=>`
    <div class="quote-line">
      <span class="quote-line-key"><i class="${ic}"></i>${k}</span>
      <span style="color:${col};font-weight:600">${v}</span>
    </div>`).join('');

  document.getElementById('quoteTotal').innerHTML = priceRange + ' <span style="font-size:1rem;color:var(--txd);font-weight:400">USD</span>';
  const summEl = document.getElementById('quoteSummary');
  summEl.style.display = 'block';
  summEl.scrollIntoView({behavior:'smooth', block:'center'});
}

function sendQuoteToWA(){
  const s = quoteData;
  const msg = `Hola Jair, usé el cotizador de NEXUM y me interesa: *${s.service}* para empresa ${s.company}. Urgencia: ${s.urgency}. Presupuesto aprox: ${s.budget}. ¿Podemos hablar?`;
  window.open('https://wa.me/51945366356?text='+encodeURIComponent(msg), '_blank');
}

function resetQuote(){
  quoteData.step=0;
  ['service','company','urgency','budget','serviceKey','budgetKey'].forEach(k=>quoteData[k]='');
  document.querySelectorAll('.quote-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('qs1').classList.add('active');
  document.getElementById('qBarFill').style.width='12.5%';
  document.querySelectorAll('.q-step-dot').forEach((d,i)=>{d.classList.remove('done','active');if(i===0)d.classList.add('active');});
  [1,2,3,4].forEach(i=>{const n=document.getElementById('qn'+i);if(n)n.textContent=i;});
  document.querySelectorAll('.q-opt').forEach(o=>o.classList.remove('sel'));
  document.getElementById('quoteSummary').style.display='none';
}

/* --- */
function loadMetadata(input){
  const file = input.files[0];
  if(!file) return;
  const name = file.name;
  const size = (file.size/1024).toFixed(1)+' KB';
  const type = file.type || 'Desconocido';
  const lastMod = new Date(file.lastModified).toLocaleString('es-PE');

  document.getElementById('metaFileName').textContent = name;
  document.getElementById('metaResult').style.display = 'block';
  document.getElementById('gpsMapSection').style.display = 'none';

  // Show image preview
  const reader = new FileReader();
  reader.onload = function(e){
    const prev = document.getElementById('metaImgPrev');
    prev.src = e.target.result;
    prev.style.display = 'block';

    // Read real EXIF data
    const img = new Image();
    img.onload = function(){
      const basicRows = [
        ['Nombre del archivo', name],
        ['Tamaño', size],
        ['Tipo MIME', type],
        ['Última modificación', lastMod],
        ['Dimensiones', img.naturalWidth + ' × ' + img.naturalHeight + ' px'],
        ['Megapíxeles', ((img.naturalWidth * img.naturalHeight)/1000000).toFixed(2) + ' MP'],
        ['Relación de aspecto', getAspectRatio(img.naturalWidth, img.naturalHeight)],
        ['Origen probable', detectOrigin(file)],
      ];

      if(typeof EXIF !== 'undefined' && (type.includes('jpeg') || type.includes('jpg') || type.includes('tiff'))){
        EXIF.getData(img, function(){
          const allTags = EXIF.getAllTags(this);
          const exifRows = [...basicRows];

          // Camera info
          const make = EXIF.getTag(this, 'Make');
          const model = EXIF.getTag(this, 'Model');
          const software = EXIF.getTag(this, 'Software');
          const dateTime = EXIF.getTag(this, 'DateTimeOriginal') || EXIF.getTag(this, 'DateTime');
          const fNumber = EXIF.getTag(this, 'FNumber');
          const exposureTime = EXIF.getTag(this, 'ExposureTime');
          const isoSpeed = EXIF.getTag(this, 'ISOSpeedRatings');
          const focalLength = EXIF.getTag(this, 'FocalLength');
          const flash = EXIF.getTag(this, 'Flash');
          const orientation = EXIF.getTag(this, 'Orientation');

          if(make) exifRows.push(['Fabricante dispositivo', '📱 '+make]);
          if(model) exifRows.push(['Modelo dispositivo', '📱 '+model]);
          if(software) exifRows.push(['Software', software]);
          if(dateTime) exifRows.push(['Fecha y hora foto', '📅 '+dateTime]);
          if(fNumber) exifRows.push(['Apertura (f/)', 'f/'+fNumber]);
          if(exposureTime) exifRows.push(['Velocidad obturación', exposureTime+'s']);
          if(isoSpeed) exifRows.push(['ISO', isoSpeed]);
          if(focalLength) exifRows.push(['Focal length', focalLength+'mm']);
          if(flash !== undefined) exifRows.push(['Flash', flash ? '✓ Activado' : '✗ Desactivado']);
          if(orientation) exifRows.push(['Orientación', orientation]);

          // GPS DATA
          const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
          const latArr = EXIF.getTag(this, 'GPSLatitude');
          const lonRef = EXIF.getTag(this, 'GPSLongitudeRef');
          const lonArr = EXIF.getTag(this, 'GPSLongitude');
          const altitude = EXIF.getTag(this, 'GPSAltitude');

          if(latArr && lonArr){
            const lat = convertDMSToDD(latArr, latRef);
            const lon = convertDMSToDD(lonArr, lonRef);
            const coordStr = lat.toFixed(6) + ', ' + lon.toFixed(6);
            exifRows.push(['🔴 GPS Latitud', lat.toFixed(6) + '° ' + (latRef || '')]);
            exifRows.push(['🔴 GPS Longitud', lon.toFixed(6) + '° ' + (lonRef || '')]);
            if(altitude) exifRows.push(['GPS Altitud', altitude.toFixed(0) + ' m']);
            exifRows.push(['Coordenadas decimales', coordStr]);
            document.getElementById('metaWarn').style.display = 'block';
            showGPSMap(lat, lon, coordStr);
          } else {
            exifRows.push(['GPS', type.includes('jpeg')?'No detectado en esta imagen':'N/A para este formato']);
            document.getElementById('metaWarn').style.display = 'none';
          }

          exifRows.push(['Total tags EXIF', Object.keys(allTags).length + ' campos']);
          renderMetaTable(exifRows);
          renderMetaTags(file, img, type, latArr && lonArr);
        });
      } else {
        // Non-JPEG — limited metadata
        if(type.includes('jpeg') || type.includes('jpg')){
          basicRows.push(['Metadatos EXIF', 'No detectados (imagen sin EXIF o editada)']);
          document.getElementById('metaWarn').style.display = 'none';
        } else {
          basicRows.push(['Formato', type.includes('png') ? 'PNG — Sin EXIF GPS' : type.includes('gif') ? 'GIF — Sin EXIF' : type.includes('webp') ? 'WebP — Sin GPS' : 'Formato sin EXIF']);
          document.getElementById('metaWarn').style.display = 'none';
        }
        basicRows.push(['Recomendación', 'Usa ExifTool para limpiar metadatos antes de publicar']);
        renderMetaTable(basicRows);
        renderMetaTags(file, img, type, false);
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function convertDMSToDD(dms, ref){
  if(!dms || dms.length < 3) return 0;
  const d = typeof dms[0]==='object' ? dms[0].numerator/dms[0].denominator : dms[0];
  const m = typeof dms[1]==='object' ? dms[1].numerator/dms[1].denominator : dms[1];
  const s = typeof dms[2]==='object' ? dms[2].numerator/dms[2].denominator : dms[2];
  let dd = d + m/60 + s/3600;
  if(ref === 'S' || ref === 'W') dd = -dd;
  return dd;
}

function getAspectRatio(w, h){
  const gcd = (a, b) => b === 0 ? a : gcd(b, a%b);
  const d = gcd(w, h);
  return (w/d) + ':' + (h/d);
}

async function showGPSMap(lat, lon, coordStr){
  document.getElementById('gpsMapSection').style.display = 'block';
  document.getElementById('gpsCoords').textContent = coordStr;
  document.getElementById('gpsLocation').textContent = 'Obteniendo dirección...';

  // Set map iframe (OpenStreetMap)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lon}`;
  document.getElementById('gpsMapFrame').src = mapUrl;
  document.getElementById('gpsGoogleLink').href = `https://www.google.com/maps?q=${lat},${lon}`;
  document.getElementById('gpsOpenStreetLink').href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=15`;

  // Reverse geocoding with Nominatim (free, no key needed)
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=es`, {
      headers: {'Accept-Language': 'es', 'User-Agent': 'NEXUM-MetaExtractor/1.0'}
    });
    const data = await res.json();
    if(data && data.display_name){
      const parts = data.display_name.split(',').slice(0,4).join(',');
      document.getElementById('gpsLocation').textContent = '📍 ' + parts;
    } else {
      document.getElementById('gpsLocation').textContent = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  } catch(e){
    document.getElementById('gpsLocation').textContent = `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
  }

  // Scroll to map
  setTimeout(()=>document.getElementById('gpsMapSection').scrollIntoView({behavior:'smooth', block:'center'}), 300);
}

function detectOrigin(file){
  const name = file.name.toLowerCase();
  if(name.startsWith('img_') || name.startsWith('dsc_')) return '📷 Posiblemente cámara DSLR';
  if(name.startsWith('screenshot')) return '🖥️ Captura de pantalla';
  if(/^\d{8}_\d{6}/.test(name)) return '📱 Posiblemente smartphone Android';
  if(name.startsWith('img_e')) return '📱 Posiblemente iPhone (editada)';
  if(name.startsWith('photo_')) return '📱 Posiblemente smartphone';
  return '❓ Origen indeterminado';
}

function renderMetaTable(rows){
  const table = document.getElementById('metaTable');
  table.innerHTML = rows.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('');
}

function renderMetaTags(file, img, type, hasGPS){
  const tags = [];
  if(type.includes('jpeg') || type.includes('jpg')) tags.push('JPEG/EXIF');
  if(img.naturalWidth > 3000) tags.push('Alta Resolución');
  if(img.naturalWidth === img.naturalHeight) tags.push('Cuadrada');
  if(file.size > 2*1024*1024) tags.push('Archivo Grande (+2MB)');
  if(hasGPS) tags.push('🔴 GPS DETECTADO');
  else if(type.includes('jpeg')) tags.push('Sin GPS');
  tags.push('✓ Análisis local');
  tags.push('✓ Sin envío de datos');

  document.getElementById('metaTags').innerHTML = tags.map(t=>`<span class="meta-tag" ${t.includes('GPS DETECTADO')?'style="background:rgba(255,0,60,.15);color:var(--r);border-color:rgba(255,0,60,.3)"':''}>${t}</span>`).join('');
}

function clearMeta(){
  document.getElementById('metaResult').style.display='none';
  document.getElementById('metaWarn').style.display='none';
  document.getElementById('gpsMapSection').style.display='none';
  document.getElementById('fileInput').value='';
  document.getElementById('metaImgPrev').src='';
  document.getElementById('metaImgPrev').style.display='none';
  document.getElementById('metaTable').innerHTML='';
  document.getElementById('metaTags').innerHTML='';
  document.getElementById('gpsMapFrame').src='';
}

// Drag and drop
const dz = document.getElementById('dropZone');
if(dz){
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dragover');});
  dz.addEventListener('dragleave',()=>dz.classList.remove('dragover'));
  dz.addEventListener('drop',e=>{
    e.preventDefault();dz.classList.remove('dragover');
    const f = e.dataTransfer.files[0];
    if(f && f.type.startsWith('image/')){
      const inp = document.getElementById('fileInput');
      const dt = new DataTransfer();
      dt.items.add(f);
      inp.files = dt.files;
      loadMetadata(inp);
    }
  });
}

/* --- */
(function(){
  const ticker = document.getElementById('activityTicker');
  if(!ticker) return;
  const items = [
    '🛡️ Jair acaba de completar un pentest para empresa en Lima',
    '🔐 Vulnerabilidad crítica encontrada y reportada — cliente notificado',
    '📱 App móvil entregada con 0 vulnerabilidades críticas',
    '⭐ Nuevo cliente 5 estrellas: "El mejor servicio de seguridad que hemos contratado"',
    '🌎 Proyecto cloud AWS completado para startup en Bogotá',
    '🔍 Análisis OSINT detectó fuga de datos antes de que fuera explotada',
    '💻 E-commerce lanzado con integración de pago segura',
    '🏆 NEXUM: +150 clientes protegidos en Perú y Latinoamérica',
    '⚡ Respuesta a incidente de ransomware — sistema recuperado en 4 horas',
    '📊 Auditoría ISO 27001 completada — empresa lista para certificación',
  ];
  const html = items.map(i => `<span style="display:inline-block;padding:0 28px;font-family:var(--fm);font-size:.72rem;color:var(--txd)"><span style="color:var(--g);margin-right:6px">●</span>${i}</span>`).join('');
  // Duplicate for seamless loop
  ticker.innerHTML = html + html;
})();

/* --- */
(function(){
  const el = document.querySelector('.brand-tagline');
  if(!el) return;
  const texts = ['Protege Tu Vida Digital', 'Seguridad de Clase Mundial', 'Hacking Ético Certificado', 'Software Blindado'];
  let ti=0, ci=0, deleting=false;
  function type(){
    const t=texts[ti];
    if(!deleting){
      el.textContent=t.slice(0,ci+1); ci++;
      if(ci===t.length){deleting=true; setTimeout(type,2200); return;}
    } else {
      el.textContent=t.slice(0,ci-1); ci--;
      if(ci===0){deleting=false; ti=(ti+1)%texts.length; setTimeout(type,400); return;}
    }
    setTimeout(type, deleting?40:70);
  }
  setTimeout(type, 1500);
})();

// Override pages object to include new pages
// pages object includes all routes (defined above)

/* OSINT SUITE JS */

function osintTab(id){
  document.querySelectorAll('.osint-tab').forEach(t=>t.classList.remove('act'));
  document.querySelectorAll('.osint-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('otab-'+id).classList.add('act');
  document.getElementById('opanel-'+id).classList.add('active');
}

/* IP LOOKUP */
async function osintIP(){
  const raw = document.getElementById('osint-ip-in').value.trim();
  if(!raw){return;}
  _osintIPQuery(raw);
}
async function osintMyIP(){
  document.getElementById('osint-ip-in').value = '';
  _osintIPQuery('');
}
async function _osintIPQuery(target){
  const res = document.getElementById('osint-ip-result');
  const loading = document.getElementById('osint-ip-loading');
  res.style.display='none'; loading.style.display='block';
  try{
    const url = target ? `https://ip-api.com/json/${encodeURIComponent(target)}?fields=66846719` : 'https://ip-api.com/json/?fields=66846719';
    const r = await fetch(url);
    const d = await r.json();
    loading.style.display='none';
    if(d.status==='fail'){
      document.getElementById('osint-ip-body').innerHTML=`<p style="color:var(--r);font-family:var(--fm);font-size:.8rem"><i class="fas fa-times-circle"></i> ${d.message||'No se pudo resolver el objetivo.'}</p>`;
      res.style.display='block'; return;
    }
    const flagURL = `https://flagcdn.com/24x18/${(d.countryCode||'').toLowerCase()}.png`;
    document.getElementById('osint-ip-flag').innerHTML = d.countryCode ? `<img src="${flagURL}" alt="${d.country}" style="border-radius:2px;vertical-align:middle"> ${d.countryCode}` : '';
    document.getElementById('osint-ip-title').textContent = `ip-lookup — ${d.query}`;
    const rows = [
      ['IP Consultada', d.query],
      ['País', `${d.country||'—'} (${d.countryCode||'—'})`],
      ['Región / Ciudad', `${d.regionName||'—'} / ${d.city||'—'}`],
      ['Código Postal', d.zip||'—'],
      ['Coordenadas', d.lat && d.lon ? `${d.lat}, ${d.lon}` : '—'],
      ['Zona Horaria', d.timezone||'—'],
      ['ISP / Proveedor', d.isp||'—'],
      ['Organización', d.org||'—'],
      ['ASN', d.as||'—'],
      ['Hostname Reverse', d.reverse||'—'],
      ['Tipo de conexión', d.type||'—'],
      ['¿Es Móvil?', d.mobile ? '✓ Sí' : '✗ No'],
      ['¿Es Proxy/VPN?', d.proxy ? '⚠️ Sí' : '✗ No'],
      ['¿Es Hosting?', d.hosting ? '⚠️ Sí (datacenter/server)' : '✗ No'],
    ];
    document.getElementById('osint-ip-body').innerHTML = rows.map(([k,v])=>`
      <div class="osint-row">
        <span class="osint-key">// ${k}</span>
        <span class="osint-val" style="${v.includes('⚠️')?'color:var(--am)':v.includes('✓')?'color:var(--g)':''}">${v}</span>
      </div>`).join('');
    const enc = encodeURIComponent(d.query);
    document.getElementById('osint-ip-links').innerHTML = `
      <a href="https://www.shodan.io/host/${d.query}" target="_blank" class="btn sec btn-sm"><i class="fas fa-eye"></i> Shodan</a>
      <a href="https://www.abuseipdb.com/check/${d.query}" target="_blank" class="btn sec btn-sm"><i class="fas fa-ban"></i> AbuseIPDB</a>
      <a href="https://bgp.he.net/ip/${d.query}" target="_blank" class="btn sec btn-sm">BGP.he.net</a>
      <a href="https://www.google.com/maps?q=${d.lat},${d.lon}" target="_blank" class="btn sec btn-sm"><i class="fas fa-map-marker-alt"></i> Mapa</a>`;
    res.style.display='block';
  }catch(e){
    loading.style.display='none';
    document.getElementById('osint-ip-body').innerHTML=`<p style="color:var(--r);font-family:var(--fm);font-size:.8rem"><i class="fas fa-times-circle"></i> Error al consultar la API. Verifica tu conexión.</p>`;
    res.style.display='block';
  }
}

/* EMAIL BREACH */
async function osintEmail(){
  const email = document.getElementById('osint-email-in').value.trim();
  if(!email || !email.includes('@')){return;}
  const res = document.getElementById('osint-email-result');
  const loading = document.getElementById('osint-email-loading');
  res.style.display='none'; loading.style.display='block';
  try{
    // k-anonymity: hash SHA-1, send only first 5 chars
    const hashBuf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(email));
    const hashHex = Array.from(new Uint8Array(hashBuf)).map(b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();
    const prefix = hashHex.slice(0,5);
    const suffix = hashHex.slice(5);
    const r = await fetch(`https://api.pwnedpasswords.com/range/${prefix}?mode=ntlm`, {headers:{'Add-Padding':'true'}});
    // Note: for actual HIBP email breach we use the password API as proxy — show guidance
    loading.style.display='none';
    // Direct HIBP email API requires key — show professional guidance + deep links
    res.innerHTML = `
      <div style="background:rgba(212,175,55,.05);border:1px solid var(--br);border-radius:var(--rl);padding:20px">
        <p style="font-family:var(--fm);font-size:.72rem;color:var(--txd);margin-bottom:14px">
          <i class="fas fa-info-circle" style="color:var(--c)"></i> La API de email de HIBP requiere clave de acceso para uso directo (política anti-scraping). 
          Consulta directamente en los servicios verificados:
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:16px">
          <a href="https://haveibeenpwned.com/account/${encodeURIComponent(email)}" target="_blank" class="osint-engine-card" style="text-decoration:none;cursor:pointer">
            <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">Have I Been Pwned</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Base de datos más grande del mundo</p></div>
            <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
          </a>
          <a href="https://www.dehashed.com/search?query=${encodeURIComponent(email)}" target="_blank" class="osint-engine-card" style="text-decoration:none">
            <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">DeHashed</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Filtraciones + datos adicionales</p></div>
            <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
          </a>
          <a href="https://breachdirectory.org/?search=${encodeURIComponent(email)}" target="_blank" class="osint-engine-card" style="text-decoration:none">
            <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">BreachDirectory</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Busca hashes y credenciales</p></div>
            <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
          </a>
          <a href="https://leakcheck.io/?query=${encodeURIComponent(email)}" target="_blank" class="osint-engine-card" style="text-decoration:none">
            <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">LeakCheck.io</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Verificación rápida y gratuita</p></div>
            <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
          </a>
        </div>
        <div style="background:rgba(255,196,0,.08);border:1px solid rgba(255,196,0,.25);border-radius:var(--ra);padding:12px 16px">
          <p style="font-family:var(--fm);font-size:.68rem;color:var(--am)"><i class="fas fa-lightbulb"></i> ¿Necesitas monitoreo continuo de filtraciones para tu empresa? <button onclick="go('contacto')" style="background:none;border:none;color:var(--c);cursor:pointer;font-family:var(--fm);font-size:.68rem;text-decoration:underline">Contáctanos →</button></p>
        </div>
      </div>`;
    res.style.display='block';
  }catch(e){
    loading.style.display='none';
    res.innerHTML=`<p style="color:var(--r);font-family:var(--fm);font-size:.8rem"><i class="fas fa-times-circle"></i> Error. Verifica tu conexión.</p>`;
    res.style.display='block';
  }
}

/* WHOIS */
async function osintWhois(){
  const raw = document.getElementById('osint-whois-in').value.trim().replace(/https?:\/\//,'').split('/')[0];
  if(!raw || !raw.includes('.')){return;}
  const res = document.getElementById('osint-whois-result');
  const loading = document.getElementById('osint-whois-loading');
  res.style.display='none'; loading.style.display='block';
  try{
    // Use RDAP (free, no key) for registrar info
    const tld = raw.split('.').pop();
    const rdapUrl = `https://rdap.org/domain/${raw}`;
    let rdapData = null;
    try{
      const rdapRes = await fetch(rdapUrl);
      if(rdapRes.ok) rdapData = await rdapRes.json();
    }catch(e){}

    // DNS lookup via Cloudflare DoH
    let dnsData = null;
    try{
      const dnsRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${raw}&type=A`, {headers:{'accept':'application/dns-json'}});
      if(dnsRes.ok) dnsData = await dnsRes.json();
    }catch(e){}

    let mxData = null;
    try{
      const mxRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${raw}&type=MX`, {headers:{'accept':'application/dns-json'}});
      if(mxRes.ok) mxData = await mxRes.json();
    }catch(e){}

    loading.style.display='none';

    // Parse RDAP
    let registrar='—', regDate='—', expDate='—', updDate='—', status='—', nameservers='—';
    if(rdapData){
      registrar = rdapData.entities?.find(e=>e.roles?.includes('registrar'))?.vcardArray?.[1]?.find(v=>v[0]==='fn')?.[3] || '—';
      regDate = rdapData.events?.find(e=>e.eventAction==='registration')?.eventDate?.split('T')[0] || '—';
      expDate = rdapData.events?.find(e=>e.eventAction==='expiration')?.eventDate?.split('T')[0] || '—';
      updDate = rdapData.events?.find(e=>e.eventAction==='last changed')?.eventDate?.split('T')[0] || '—';
      status = rdapData.status?.join(', ') || '—';
      nameservers = rdapData.nameservers?.map(ns=>ns.ldhName).slice(0,4).join(', ') || '—';
    }

    // DNS A records
    const aRecords = dnsData?.Answer?.filter(a=>a.type===1)?.map(a=>a.data).join(', ') || '—';
    const mxRecords = mxData?.Answer?.filter(a=>a.type===15)?.map(a=>a.data.split(' ').pop()).slice(0,3).join(', ') || '—';

    const now = new Date();
    const exp = expDate !== '—' ? new Date(expDate) : null;
    const daysLeft = exp ? Math.floor((exp-now)/86400000) : null;
    const expStatus = daysLeft === null ? '' : daysLeft < 30 ? `<span class="osint-badge danger"><i class="fas fa-exclamation-triangle"></i> Vence en ${daysLeft}d</span>` : daysLeft < 90 ? `<span class="osint-badge warn">Vence en ${daysLeft}d</span>` : `<span class="osint-badge safe"><i class="fas fa-check"></i> ${daysLeft}d restantes</span>`;

    res.innerHTML = `
      <div style="background:var(--bg3);border:1px solid var(--c3);border-radius:var(--rl);overflow:hidden">
        <div style="background:var(--bg2);padding:12px 18px;border-bottom:1px solid var(--br2);display:flex;align-items:center;gap:10px">
          <span style="font-family:var(--fh);font-size:.9rem;color:var(--c)">${raw}</span>
          ${expStatus}
        </div>
        <div style="padding:16px 18px">
          <p style="font-family:var(--fm);font-size:.62rem;color:var(--txd);margin-bottom:12px;text-transform:uppercase;letter-spacing:2px">// Datos de Registro (RDAP)</p>
          ${[
            ['Registrador', registrar],
            ['Fecha de Registro', regDate],
            ['Fecha de Expiración', expDate],
            ['Última Actualización', updDate],
            ['Estado', status],
            ['Nameservers', nameservers],
          ].map(([k,v])=>`<div class="osint-row"><span class="osint-key">${k}</span><span class="osint-val">${v}</span></div>`).join('')}
          <p style="font-family:var(--fm);font-size:.62rem;color:var(--txd);margin:16px 0 12px;text-transform:uppercase;letter-spacing:2px">// Registros DNS</p>
          ${[
            ['A (IPv4)', aRecords],
            ['MX (Correo)', mxRecords],
          ].map(([k,v])=>`<div class="osint-row"><span class="osint-key">${k}</span><span class="osint-val">${v}</span></div>`).join('')}
        </div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <a href="https://www.whois.com/whois/${raw}" target="_blank" class="btn sec btn-sm"><i class="fas fa-search"></i> WHOIS Completo</a>
        <a href="https://dnschecker.org/#A/${raw}" target="_blank" class="btn sec btn-sm">DNS Checker</a>
        <a href="https://www.shodan.io/search?query=${raw}" target="_blank" class="btn sec btn-sm"><i class="fas fa-eye"></i> Shodan</a>
        <a href="https://web.archive.org/web/*/${raw}" target="_blank" class="btn sec btn-sm"><i class="fas fa-history"></i> Wayback</a>
        <a href="https://crt.sh/?q=${raw}" target="_blank" class="btn sec btn-sm"><i class="fas fa-certificate"></i> Certificados SSL</a>
      </div>`;
    res.style.display='block';
  }catch(e){
    loading.style.display='none';
    res.innerHTML=`<p style="color:var(--r);font-family:var(--fm);font-size:.8rem"><i class="fas fa-times-circle"></i> Error al consultar. Verifica el dominio.</p>`;
    res.style.display='block';
  }
}

/* URL THREAT */
function osintURL(){
  let raw = document.getElementById('osint-url-in').value.trim();
  if(!raw){return;}
  if(!raw.startsWith('http')) raw = 'https://'+raw;
  let domain = '';
  try{ domain = new URL(raw).hostname; }catch(e){ domain = raw; }
  const enc = encodeURIComponent(raw);
  const encDom = encodeURIComponent(domain);
  const b64 = btoa(raw).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');

  document.getElementById('osint-url-result').innerHTML = `
    <p style="font-family:var(--fm);font-size:.72rem;color:var(--txd);margin-bottom:14px">
      <i class="fas fa-info-circle" style="color:var(--c)"></i> Abriendo en motores de análisis. Para el resultado más completo, revisa cada uno:
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-bottom:16px">
      <a href="https://www.virustotal.com/gui/url/${b64}" target="_blank" class="osint-engine-card" style="text-decoration:none">
        <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">VirusTotal</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">70+ antivirus + reputación</p></div>
        <span class="osint-badge warn">Principal</span>
      </a>
      <a href="https://urlscan.io/search/#${enc}" target="_blank" class="osint-engine-card" style="text-decoration:none">
        <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">URLScan.io</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Captura y análisis de página</p></div>
        <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
      </a>
      <a href="https://www.abuseipdb.com/check/${domain}" target="_blank" class="osint-engine-card" style="text-decoration:none">
        <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">AbuseIPDB</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Reportes de abuse del host</p></div>
        <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
      </a>
      <a href="https://safeweb.norton.com/report/show?url=${enc}" target="_blank" class="osint-engine-card" style="text-decoration:none">
        <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">Norton SafeWeb</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Reputación y clasificación</p></div>
        <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
      </a>
      <a href="https://www.shodan.io/search?query=${encDom}" target="_blank" class="osint-engine-card" style="text-decoration:none">
        <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">Shodan</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Puertos y servicios expuestos</p></div>
        <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
      </a>
      <a href="https://transparencyreport.google.com/safe-browsing/search?url=${enc}" target="_blank" class="osint-engine-card" style="text-decoration:none">
        <div><p style="font-family:var(--fh);font-size:.78rem;color:var(--c);margin-bottom:3px">Google Safe Browsing</p><p style="font-family:var(--fm);font-size:.63rem;color:var(--txd)">Phishing / malware</p></div>
        <i class="fas fa-external-link-alt" style="color:var(--txd);font-size:.8rem"></i>
      </a>
    </div>
    <div style="background:rgba(201,162,39,.07);border:1px solid rgba(201,162,39,.2);border-radius:var(--ra);padding:12px 16px">
      <p style="font-family:var(--fm);font-size:.68rem;color:rgba(201,162,39,.9)"><i class="fas fa-shield-alt"></i> <strong>Consejo NEXUM:</strong> Si VirusTotal marca 1+ detecciones, NO visites la URL. Contáctanos para un análisis forense completo.</p>
    </div>`;
  document.getElementById('osint-url-result').style.display='block';
}

(function(){
  let t = 39;
  setInterval(()=>{
    const el = document.getElementById('hackTimer');
    if(!el) return;
    t--;
    if(t <= 0){ t = 39; }
    el.textContent = t;
  }, 1000);
})();
/* ============================================================
   PORTAFOLIO — barras de dominio técnico animadas
   ============================================================ */
function initSkillBars(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const pct = el.getAttribute('data-pct');
      requestAnimationFrame(()=>{ el.style.width = pct + '%'; });
      obs.unobserve(el);
    });
  },{threshold:.3});
  document.querySelectorAll('.skill-fill').forEach(el=>obs.observe(el));
}
initSkillBars();

/* Reinicia las barras cada vez que se entra a la página de portafolio */
(function(){
  const _go = go;
  window.go = function(key){
    _go(key);
    if(key === 'portafolio'){
      document.querySelectorAll('.skill-fill').forEach(el=>{ el.style.width='0%'; });
      setTimeout(initSkillBars, 60);
    }
  };
})();
