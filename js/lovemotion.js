/* CURSOR (desktop) */
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=0,my=0,cx2=0,cy2=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
setInterval(()=>{cx2+=(mx-cx2)*.12;cy2+=(my-cy2)*.12;cur2.style.left=cx2+'px';cur2.style.top=cy2+'px';},16);

/* HAMBURGER */
function toggleMenu(){
  const nav=document.getElementById('mobileNav');
  const btn=document.getElementById('hambtn');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMenu(){document.getElementById('mobileNav').classList.remove('open');document.getElementById('hambtn').classList.remove('open');}
document.addEventListener('click',e=>{
  if(!e.target.closest('nav')&&!e.target.closest('.mobile-nav'))closeMenu();
});

/* HERO CANVAS */
(function(){
  const cv=document.getElementById('heroCanvas'),c=cv.getContext('2d');
  function resize(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;}
  resize();window.addEventListener('resize',resize);
  const N=100;
  const pts=Array.from({length:N},()=>({
    x:Math.random(),y:Math.random(),
    vx:(Math.random()-.5)*.0003,vy:(Math.random()-.5)*.0003,
    r:.4+Math.random()*1.4,h:280+Math.random()*80,
    a:Math.random()*.35+.05,ph:Math.random()*Math.PI*2
  }));
  function draw(){
    const W=cv.width,H=cv.height;
    c.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.ph+=.01;p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1;
      const a=p.a*(0.5+0.5*Math.sin(p.ph));
      c.beginPath();c.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);
      c.fillStyle=`hsla(${p.h},100%,70%,${a})`;c.fill();
    });
    for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
      const dx=(pts[i].x-pts[j].x)*W,dy=(pts[i].y-pts[j].y)*H;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<90){
        c.beginPath();c.moveTo(pts[i].x*W,pts[i].y*H);c.lineTo(pts[j].x*W,pts[j].y*H);
        c.strokeStyle=`rgba(200,64,255,${(1-d/90)*.07})`;c.lineWidth=.7;c.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* MINI CANVASES */
const COLORS=[[300,360],[330,30],[190,240],[260,320],[290,355]];
document.querySelectorAll('.mini-canvas').forEach((cv)=>{
  const idx=parseInt(cv.dataset.idx)||0;
  const c=cv.getContext('2d');
  function resize(){cv.width=Math.max(cv.offsetWidth,10)||160;cv.height=Math.max(cv.offsetHeight,10)||200;}
  resize();
  const [h1,h2]=COLORS[idx%COLORS.length];
  const range=h2>h1?h2-h1:h2-h1+360;
  const N=500;
  const W0=cv.width,H0=cv.height;
  const sc=Math.min(W0,H0)*.016||2;
  const pts=Array.from({length:N},(_,i)=>{
    const t=(i/N)*Math.PI*2+(Math.random()-.5)*.3;
    const hx=16*Math.pow(Math.sin(t),3);
    const hy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
    return{
      x:W0/2+(Math.random()-.5)*50,y:H0/2+(Math.random()-.5)*50,
      vx:0,vy:0,
      tx:W0/2+hx*sc,ty:H0/2+hy*sc,
      hue:h1+Math.random()*range,
      size:.7+Math.random()*1.3,
      ph:Math.random()*Math.PI*2,a:0
    };
  });
  function draw(){
    const W=cv.width,H=cv.height;
    c.fillStyle='rgba(4,2,10,.14)';c.fillRect(0,0,W,H);
    pts.forEach(p=>{
      p.ph+=.045;
      const dx=p.tx-p.x,dy=p.ty-p.y;
      p.vx+=dx*.085;p.vy+=dy*.085;p.vx*=.83;p.vy*=.83;
      p.x+=p.vx;p.y+=p.vy;
      const ta=.75+.25*Math.sin(p.ph);p.a+=(ta-p.a)*.07;
      c.beginPath();c.arc(p.x,p.y,Math.max(.3,p.size),0,Math.PI*2);
      c.fillStyle=`hsla(${p.hue},100%,65%,${p.a})`;
      c.shadowColor=`hsl(${p.hue},100%,65%)`;c.shadowBlur=3;c.fill();c.shadowBlur=0;
    });
    requestAnimationFrame(draw);
  }
  draw();
});

/* PREVIEW CANVAS */
(function(){
  const cv=document.getElementById('previewCanvas'),c=cv.getContext('2d');
  function resize(){cv.width=Math.max(cv.offsetWidth,10);cv.height=Math.max(cv.offsetHeight,10);}
  resize();window.addEventListener('resize',()=>{resize();build(currentName);});
  const PAL=[[300,360],[20,60],[190,230],[120,180],[0,360]];
  let palIdx=0,currentName='Para Ti',t=0,pT=0,phase='form';
  const N=1600;
  const pts=Array.from({length:N},()=>({
    x:cv.offsetWidth/2,y:cv.offsetHeight/2,vx:0,vy:0,
    tx:cv.offsetWidth/2,ty:cv.offsetHeight/2,
    hue:300+Math.random()*60,size:.8+Math.random()*1.6,
    ph:Math.random()*Math.PI*2,a:0
  }));
  function sample(msg){
    const W=cv.width,H=cv.height;
    const off=document.createElement('canvas');off.width=W;off.height=H;
    const oc=off.getContext('2d');
    let fs=Math.min(W*.22,H*.15,85);
    if(msg.length>7)fs=Math.min(fs,W*.14);
    if(msg.length>11)fs=Math.min(fs,W*.1);
    oc.fillStyle='#fff';oc.font=`900 ${fs}px 'Courier New',monospace`;
    oc.textAlign='center';oc.textBaseline='middle';oc.fillText(msg,W/2,H/2);
    const d=oc.getImageData(0,0,W,H).data,out=[];
    const step=Math.max(3,Math.ceil(5-msg.length*.1));
    for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step)
      if(d[(y*W+x)*4]>100)out.push({x,y});
    return out;
  }
  function build(name){
    currentName=name||'Para Ti';
    const tgs=sample(currentName);
    if(!tgs.length)return;
    const[h1,h2]=PAL[palIdx];
    pts.forEach((p,i)=>{
      const tg=tgs[i%tgs.length];
      p.tx=tg.x+(Math.random()-.5)*2;p.ty=tg.y+(Math.random()-.5)*2;
      p.hue=h1+Math.random()*(h2>h1?h2-h1:h2-h1+360);
    });
    phase='form';pT=0;
  }
  function scatter(){
    const W=cv.width,H=cv.height;
    pts.forEach(p=>{const a=Math.random()*Math.PI*2,s=3+Math.random()*10;p.vx+=Math.cos(a)*s;p.vy+=Math.sin(a)*s;p.tx=-100+Math.random()*(W+200);p.ty=-100+Math.random()*(H+200);});
    phase='out';pT=0;setTimeout(()=>build(currentName),380);
  }
  window.updatePreview=function(){
    const n=document.getElementById('edName').value.trim()||'Para Ti';
    document.getElementById('previewName').textContent=n;
    build(n);
  };
  window.setAnimType=function(idx,el){
    document.querySelectorAll('.anim-opt').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');scatter();
  };
  window.setColor=function(idx,el){
    palIdx=idx;
    document.querySelectorAll('.color-opt').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');scatter();
  };
  window.selectAnim=function(idx){
    document.getElementById('editor').scrollIntoView({behavior:'smooth'});
    setTimeout(()=>{const o=document.querySelectorAll('.anim-opt')[idx];if(o)o.click();},600);
  };
  build('Para Ti');
  function draw(){
    const W=cv.width,H=cv.height;
    c.fillStyle='rgba(4,2,10,.16)';c.fillRect(0,0,W,H);
    t+=.025;pT+=.025;
    if(phase==='form'&&pT>1.5){phase='hold';pT=0;}
    if(phase==='hold'&&pT>2.5){scatter();}
    const ease=phase==='form'?.13:phase==='out'?.05:.055;
    pts.forEach(p=>{
      p.ph+=.05;
      const dx=p.tx-p.x,dy=p.ty-p.y;
      p.vx+=dx*ease;p.vy+=dy*ease;p.vx*=.8;p.vy*=.8;
      if(phase==='hold'){p.x+=Math.sin(t*1.2+p.ph*.4)*.22;p.y+=Math.cos(t*.9+p.ph*.3)*.22;}
      p.x+=p.vx;p.y+=p.vy;
      const d2=Math.sqrt(dx*dx+dy*dy);
      const ta=phase==='out'?.25:Math.min(1,1.4-d2/(W*.08));
      p.a+=(ta-p.a)*.09;
      const sz=p.size*(0.85+0.15*Math.sin(p.ph));
      c.beginPath();c.arc(p.x,p.y,Math.max(.3,sz),0,Math.PI*2);
      c.fillStyle=`hsla(${p.hue},100%,65%,${p.a})`;
      c.shadowColor=`hsl(${p.hue},100%,68%)`;c.shadowBlur=sz*2.2;c.fill();c.shadowBlur=0;
    });
    if(phase==='hold'){
      const b=1+.1*Math.sin(t*3.5);
      const g=c.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.min(W,H)*.25*b);
      g.addColorStop(0,`hsla(${PAL[palIdx][0]},100%,70%,.08)`);g.addColorStop(1,'transparent');
      c.fillStyle=g;c.fillRect(0,0,W,H);
    }
    requestAnimationFrame(draw);
  }
  draw();
  cv.addEventListener('click',()=>{if(phase==='hold')scatter();});
})();

/* MODAL */
const WA='51945366356';
function openModal(plan){
  document.getElementById('modal').classList.add('open');
  document.getElementById('modal-form-wrap').style.display='block';
  document.getElementById('orderSuccess').style.display='none';
  document.body.style.overflow='hidden';
  if(plan)document.getElementById('mPlan').value=plan;
  const n=document.getElementById('edName').value.trim();
  if(n)document.getElementById('mDed').value=n;
}
function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
}
window.openModal=openModal;window.closeModal=closeModal;

function submitOrder(){
  const name=document.getElementById('mName').value.trim();
  const wa=document.getElementById('mWa').value.trim();
  const ded=document.getElementById('mDed').value.trim();
  const plan=document.getElementById('mPlan').value;
  const ocas=document.getElementById('mOcasion').value;
  const anim=document.getElementById('mAnim').value;
  if(!name||!wa){alert('Por favor completa tu nombre y WhatsApp.');return;}
  const labels={basico:'Básico S/ 20',premium:'Premium S/ 35',negocios:'Pack Negocios S/ 99'};
  const msg=encodeURIComponent(
    `¡Hola Jair! Quiero pedir una dedicatoria animada 💜\n\n`+
    `👤 Mi nombre: ${name}\n`+
    `📱 Mi WhatsApp: ${wa}\n`+
    `💖 Nombre a dedicar: ${ded||'por definir'}\n`+
    `🎉 Ocasión: ${ocas}\n`+
    `📦 Plan: ${labels[plan]||plan}\n`+
    `✨ Animación: ${anim}\n\n`+
    `¿Cómo procedo con el pago? ¡Gracias!`
  );
  document.getElementById('modal-form-wrap').style.display='none';
  document.getElementById('orderSuccess').style.display='block';
  document.getElementById('waLink').href=`https://wa.me/${WA}?text=${msg}`;
}
window.submitOrder=submitOrder;

/* SCROLL REVEAL */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));