document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const mnav = document.getElementById('mnav');

  burger.addEventListener('click', () => {
    mnav.classList.toggle('open');
  });

  mnav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mnav.classList.remove('open'));
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- QR GENERATOR ----
  const qrBtn = document.getElementById('qrBtn');
  if (qrBtn) {
    qrBtn.addEventListener('click', () => {
      const val = document.getElementById('qrInput').value.trim();
      const box = document.getElementById('qrResult');
      box.innerHTML = '';
      if (!val) return;
      new QRCode(box, { text: val, width: 160, height: 160 });
    });
  }

  // ---- VERIFICADOR DE ENLACES SOSPECHOSOS ----
  const linkBtn = document.getElementById('linkBtn');
  if (linkBtn) {
    linkBtn.addEventListener('click', () => {
      const raw = document.getElementById('linkInput').value.trim();
      const box = document.getElementById('linkResult');
      box.classList.add('show');
      if (!raw) { box.textContent = 'Pega un enlace primero.'; return; }

      const warnings = [];
      let url;
      try {
        url = new URL(raw.match(/^https?:\/\//i) ? raw : 'http://' + raw);
      } catch (e) {
        box.textContent = 'No parece un enlace válido.';
        return;
      }
      const host = url.hostname.toLowerCase();

      if (!/^https:/i.test(raw) && !/^http:/i.test(raw)) warnings.push('• No especifica protocolo (agrega https:// siempre que puedas verlo).');
      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) warnings.push('• Usa una dirección IP en vez de un dominio: señal de alerta fuerte.');
      if (raw.includes('@')) warnings.push('• Contiene "@": puede ocultar el dominio real.');
      if (host.startsWith('xn--') || host.includes('.xn--')) warnings.push('• Dominio en punycode: puede imitar letras de otro idioma.');
      if ((host.match(/-/g) || []).length >= 3) warnings.push('• Muchos guiones en el dominio: común en sitios falsos.');
      if ((host.match(/\./g) || []).length >= 4) warnings.push('• Demasiados subdominios: revisa cuál es el dominio principal real.');
      const shorteners = ['bit.ly','tinyurl.com','t.co','cutt.ly','shorturl.at','rebrand.ly'];
      if (shorteners.some(s => host.includes(s))) warnings.push('• Es un acortador de enlaces: no puedes ver el destino real antes de abrirlo.');
      const brands = ['yape','plin','bcp','interbank','bbva','whatsapp','facebook','netflix','gmail'];
      const brandHit = brands.find(b => host.includes(b));
      const officialDomains = { yape:'yape.com.pe', bcp:'viabcp.com', interbank:'interbank.pe', bbva:'bbva.pe', whatsapp:'whatsapp.com', facebook:'facebook.com', netflix:'netflix.com', gmail:'google.com' };
      if (brandHit && !host.endsWith(officialDomains[brandHit])) {
        warnings.push(`• Menciona "${brandHit}" pero el dominio no es el oficial (${officialDomains[brandHit]}). Muy probable phishing.`);
      }

      if (warnings.length === 0) {
        box.textContent = '✅ No se detectaron señales evidentes de phishing en la estructura del enlace.\nAun así, verifica siempre el remitente y no ingreses contraseñas si algo se ve raro.';
      } else {
        box.textContent = '⚠️ Señales de alerta encontradas:\n\n' + warnings.join('\n');
      }
    });
  }

  // ---- EVALUADOR RÁPIDO DE SEGURIDAD ----
  const quizBody = document.getElementById('quizBody');
  if (quizBody) {
    let answers = {};
    quizBody.querySelectorAll('.quiz-q').forEach((q, i) => {
      q.querySelectorAll('.quiz-opts button').forEach(btn => {
        btn.addEventListener('click', () => {
          q.querySelectorAll('.quiz-opts button').forEach(b => b.classList.remove('sel'));
          btn.classList.add('sel');
          answers[i] = parseInt(btn.dataset.v, 10);
          if (Object.keys(answers).length === quizBody.querySelectorAll('.quiz-q').length) {
            const score = Object.values(answers).reduce((a, b) => a + b, 0);
            const total = quizBody.querySelectorAll('.quiz-q').length;
            const result = document.getElementById('quizResult');
            result.classList.add('show');
            let msg = `Puntaje: ${score}/${total}\n\n`;
            if (score === total) msg += '✅ Buen nivel base. Aun así, ningún negocio está 100% cubierto: una auditoría puede confirmar puntos ciegos.';
            else if (score >= total / 2) msg += '🟡 Nivel intermedio. Hay huecos concretos que conviene cerrar antes de que los aproveche alguien más.';
            else msg += '🔴 Nivel de riesgo alto. Con pocos cambios (2FA, backups, capacitación) se reduce muchísimo el riesgo.';
            msg += '\n\n¿Quieres que lo revisemos juntos? Escríbenos por WhatsApp.';
            result.textContent = msg;
          }
        });
      });
    });
  }

  // ---- COTIZADOR ESTIMADO ----
  const cotBtn = document.getElementById('cotBtn');
  if (cotBtn) {
    const ranges = {
      bot:   { s: '150 - 300', m: '300 - 600',  l: '600 - 1200' },
      web:   { s: '400 - 800', m: '800 - 1800', l: '1800 - 3500' },
      app:   { s: '1200 - 2500', m: '2500 - 5000', l: '5000+' },
      audit: { s: '350 - 700', m: '700 - 1500', l: '1500+' },
    };
    const labels = { bot:'Bot de WhatsApp/Telegram', web:'Sitio web', app:'App móvil', audit:'Auditoría de seguridad' };
    cotBtn.addEventListener('click', () => {
      const service = document.getElementById('cotService').value;
      const size = document.getElementById('cotSize').value;
      const box = document.getElementById('cotResult');
      box.classList.add('show');
      const range = ranges[service][size];
      box.textContent = `${labels[service]} (nivel ${size === 's' ? 'básico' : size === 'm' ? 'intermedio' : 'avanzado'})\nEstimado referencial: S/ ${range}\n\nEl precio final depende del alcance exacto. Escríbenos para una cotización cerrada.`;
    });
  }
});
