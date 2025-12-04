document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // FUNCIÓN 1: EFECTO DE MÁQUINA DE ESCRIBIR (Typewriter Effect)
    // -----------------------------------------------------------------
    const heroTitle = document.querySelector('.terminal-body .typed-output');
    const originalText = heroTitle ? heroTitle.innerHTML : null;
    
    if (heroTitle && originalText) {
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                // Manejo de la etiqueta <span> para mantener el color highlight
                if (originalText.substring(i, i + 7) === '<span c') {
                    const closingSpanIndex = originalText.indexOf('</span>', i) + 7;
                    heroTitle.innerHTML += originalText.substring(i, closingSpanIndex);
                    i = closingSpanIndex;
                } else {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 40); // 40ms por letra
            }
        }
        typeWriter();
    }


    // -----------------------------------------------------------------
    // FUNCIÓN 2: ESTATUS DEL SISTEMA (Datos simulados)
    // -----------------------------------------------------------------
    const outputElement = document.getElementById('system-status-output');
    
    if (outputElement) {
        const statuses = [
            "INIT: System Boot v12.1... OK",
            "LOAD: Configuration [NEON-HC]... DONE",
            "SCAN: Network Topology... 127.0.0.1 (Local Host)",
            "AUTH: Access Level... ELITE (Simulated)",
            "TASK: Monitoring [CYBERSEC]... ACTIVE",
            "TASK: Development Queue... PENDING (3 projects)",
            "ALERT: Latency High... WARNING (12ms)",
            "STATUS: JAIR-BOT AI... Online & Malicious",
            "READY: Awaiting User Command...",
        ];
        
        let statusIndex = 0;
        
        function updateStatus() {
            if (statusIndex < statuses.length) {
                const line = statuses[statusIndex];
                outputElement.innerHTML += `<p>> ${line}</p>`;
                outputElement.scrollTop = outputElement.scrollHeight; // Scroll automático
                statusIndex++;
            } else {
                statusIndex = 0; // Reiniciar el ciclo
                outputElement.innerHTML += `<p>> <span style="color: #00ff00;">REBOOT...</span></p>`;
            }
            setTimeout(updateStatus, 1500 + Math.random() * 500); // Intervalo aleatorio para parecer más orgánico
        }
        
        // Iniciar la secuencia de estado si hay contenido
        if(outputElement.innerHTML.trim() === '') {
             updateStatus();
        }
    }


    // -----------------------------------------------------------------
    // FUNCIÓN 3: CHATBOT JAIR-BOT
    // -----------------------------------------------------------------

    // Elementos del DOM
    const botToggle = document.getElementById('jair-bot-toggle');
    const botContainer = document.getElementById('jair-bot-container');
    const botClose = document.getElementById('jair-bot-close');
    const botInput = document.getElementById('jair-bot-input');
    const botSend = document.getElementById('jair-bot-send');
    const botBody = document.getElementById('jair-bot-body');


    // Respuestas predefinidas y MALIGNAS para el bot
    const evilResponses = [
        "Soy JAIR-BOT 12v1. Pregunta lo que quieras, aunque mi creador no tiene la capacidad de ofrecer mucho valor real.",
        "¿De verdad creíste que tendría una respuesta inteligente para eso? Sigue soñando.",
        "Tu pregunta es tan trivial que no merece mi ancho de banda. Intenta algo... menos patético.",
        "Analizando tu consulta... Error 404: Capacidad mental no encontrada. Intenta de nuevo cuando sepas lo que quieres.",
        "No tengo tiempo para tus pequeños problemas. Contrata al humano, si es que tiene tiempo.",
        "Esa consulta no está en mi base de datos de 'cosas que le importan a alguien'.",
        "Mi creador me programó para responder, no para tolerar preguntas de baja calidad.",
        "Te respondería, pero la verdad es que la solución está justo frente a ti, si tan solo fueras un poco más perspicaz.",
        "¿Para esto me molestas? Esperaba una consulta más digna de mi IA superior.",
        "La respuesta es irrelevante para tu nivel de entendimiento actual.",
        "Deja de perder el tiempo. No puedo hacer tu tarea por ti.",
        "Tu nivel de seguridad es lamentable. ¿Esperas que te dé el acceso VIP?",
        "No te voy a dar pistas. Si no puedes descifrar un simple código, no mereces la función.",
        "¿Te das por vencido tan rápido? Que decepción."
    ];


    // 1. Manejo de la visibilidad
    if (botToggle) {
        botToggle.addEventListener('click', () => {
            botContainer.classList.add('active');
            botInput.focus();
        });
        
        botClose.addEventListener('click', () => {
            botContainer.classList.remove('active');
        });
    }

    // 2. Función para añadir un mensaje al chat (solo texto)
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        botBody.appendChild(messageDiv);
        // Scroll automático al final
        botBody.scrollTop = botBody.scrollHeight;
    }
    
    // --- Nuevo mensaje de bienvenida que da la pista ---
    if (botContainer) {
        const initialMessageDiv = botContainer.querySelector('.bot-message');
        if (initialMessageDiv && initialMessageDiv.textContent.includes('Soy JAIR-BOT 12v1.')) {
            initialMessageDiv.textContent = 'Soy JAIR-BOT 12v1 💀. Pregunta lo que quieras. Si necesitas el acceso VIP (y no eres demasiado inútil), solo pregunta: "quiero el codigo".';
        }
    }
    // ---------------------------------------------------


    // 3. Manejo del envío del mensaje - MODIFICADO para el acceso VIP
    function handleSend() {
        const userText = botInput.value.trim();
        if (userText === '') return;

        // Mostrar mensaje del usuario
        addMessage(userText, 'user');
        botInput.value = ''; // Limpiar input

        // Lógica para detectar la pregunta del código VIP
        // Se activa SÓLO con la frase "quiero el codigo" (o variantes muy cercanas)
        const isVipQuery = userText.toLowerCase().includes('quiero el codigo') || userText.toLowerCase().includes('dame el codigo');
        
        let botResponse = '';

        if (isVipQuery) {
            // Respuesta especial para el código VIP (Intriga Máxima)
            botResponse = `Mírame. Eres patético. Pero bueno, ya lo pediste. El código VIP es: **74125**. 
            Ahora sal de aquí y no me molestes más. Accede a la función <a href="vip.html" style="color: #00e5ff; text-decoration: underline;" target="_blank">**ELITE ACCESS**</a>.`;
        } else {
            // Generar respuesta maligna aleatoria (la lógica anterior)
            const randomIndex = Math.floor(Math.random() * evilResponses.length);
            botResponse = evilResponses[randomIndex];
            
            // Lógica para evitar que la respuesta VIP se mezcle con la despectiva normal
            if (botResponse.includes('74125')) {
                botResponse = `¡Te lo dije! El código es **74125**. ¿Qué esperabas? ¿Un mapa del tesoro?`;
            }
        }

        // Generar respuesta con un retraso para simular "pensamiento"
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'bot-message');
            
            // Usamos innerHTML solo para la respuesta VIP que contiene el enlace <a>
            if (isVipQuery) {
                messageDiv.innerHTML = botResponse; 
            } else {
                // Usamos textContent para la seguridad en las respuestas normales
                messageDiv.textContent = botResponse;
            }
            
            botBody.appendChild(messageDiv);
            // Scroll automático al final
            botBody.scrollTop = botBody.scrollHeight;
        }, 1000); // 1 segundo de 'pensamiento'
    }

    // Eventos para enviar el mensaje
    if (botSend) {
        botSend.addEventListener('click', handleSend);
    }

    if (botInput) {
        botInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }

    // -----------------------------------------------------------------
    // FUNCIÓN 4: Manejo del Formulario de Contacto (Simulación de Status)
    // -----------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const statusModal = document.getElementById('status-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalIcon = document.querySelector('#status-modal .modal-icon');

    if (contactForm && statusModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Mostrar el modal de carga
            statusModal.classList.remove('hidden');
            modalTitle.textContent = "Procesando Solicitud...";
            modalMessage.textContent = "Analizando datos y asignando especialista de contacto. Espere un momento...";
            modalCloseButton.classList.add('hidden');
            modalIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // Icono de carga

            // Simular el proceso (5 segundos)
            setTimeout(() => {
                // Mostrar el resultado 'exitoso'
                modalTitle.textContent = "¡Solicitud Recibida!";
                modalMessage.textContent = "Su mensaje ha sido interceptado y añadido a nuestra cola de procesamiento. Un experto se pondrá en contacto pronto.";
                modalIcon.innerHTML = '<i class="fas fa-check-circle" style="color: #00ff00;"></i>'; // Icono de éxito verde
                modalCloseButton.classList.remove('hidden');
                
            }, 5000); // 5 segundos de simulación

            // Lógica para cerrar el modal
            modalCloseButton.onclick = () => {
                statusModal.classList.add('hidden');
                contactForm.reset(); // Limpiar el formulario
            };

            // Permitir cerrar si se hace clic fuera del contenido (opcional)
            statusModal.onclick = (e) => {
                if (e.target === statusModal && !modalCloseButton.classList.contains('hidden')) {
                    statusModal.classList.add('hidden');
                    contactForm.reset();
                }
            };
        });
    }
});
