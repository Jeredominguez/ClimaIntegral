// ============================================
// CLIMA INTEGRAL — INTERACCIONES Y ANIMACIONES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarHeaderScroll();
    inicializarMenuMovil();
    inicializarScrollProgress();
    inicializarRevealScroll();
    inicializarContadores();
    inicializarParticulas();
    inicializarAnioFooter();
    inicializarCierreMenuAlClickear();
});

// Header que se achica y agrega fondo al scrollear
function inicializarHeaderScroll() {
    const cabecera = document.getElementById('cabecera');
    if (!cabecera) return;
    const actualizar = () => {
        if (window.scrollY > 40) {
            cabecera.classList.add('scrolled');
        } else {
            cabecera.classList.remove('scrolled');
        }
    };
    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
}

// Menú hamburguesa para mobile
function inicializarMenuMovil() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    if (!hamburger || !menu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('abierto');
        menu.classList.toggle('abierto');
    });
}

function inicializarCierreMenuAlClickear() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    if (!hamburger || !menu) return;
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('abierto');
            menu.classList.remove('abierto');
        });
    });
}

// Barra de progreso de scroll
function inicializarScrollProgress() {
    const barra = document.getElementById('scrollProgress');
    if (!barra) return;
    window.addEventListener('scroll', () => {
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
        barra.style.width = progreso + '%';
    }, { passive: true });
}

// Animación de aparición al hacer scroll (Intersection Observer)
function inicializarRevealScroll() {
    const elementos = document.querySelectorAll('.reveal-up');
    if (!elementos.length) return;

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const delay = entrada.target.dataset.delay || 0;
                setTimeout(() => entrada.target.classList.add('visible'), delay);
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elementos.forEach(el => observer.observe(el));
}

// Contadores numéricos animados en la banda de métricas
function inicializarContadores() {
    const contadores = document.querySelectorAll('.contador');
    if (!contadores.length) return;

    const animarContador = (elemento) => {
        const objetivo = parseInt(elemento.dataset.target, 10);
        if (isNaN(objetivo) || objetivo === 0) {
            return; // valores no numéricos (ej: "Zona Sur") quedan como están
        }
        const duracion = 1600;
        const inicio = performance.now();

        const paso = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            const facilitado = 1 - Math.pow(1 - progreso, 3);
            elemento.textContent = Math.floor(facilitado * objetivo);
            if (progreso < 1) {
                requestAnimationFrame(paso);
            } else {
                elemento.textContent = objetivo;
            }
        };
        requestAnimationFrame(paso);
    };

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(el => observer.observe(el));
}

// Partículas flotantes decorativas en el hero
function inicializarParticulas() {
    const contenedor = document.getElementById('heroParticles');
    if (!contenedor) return;

    const cantidad = window.innerWidth < 768 ? 14 : 26;
    for (let i = 0; i < cantidad; i++) {
        const particula = document.createElement('span');
        particula.className = 'particula';
        particula.style.left = Math.random() * 100 + '%';
        particula.style.bottom = -20 + 'px';
        particula.style.animationDuration = (8 + Math.random() * 10) + 's';
        particula.style.animationDelay = (Math.random() * 10) + 's';
        particula.style.opacity = (0.2 + Math.random() * 0.5).toString();
        const tam = (2 + Math.random() * 3);
        particula.style.width = tam + 'px';
        particula.style.height = tam + 'px';
        contenedor.appendChild(particula);
    }
}

// Año actual en el footer
function inicializarAnioFooter() {
    const span = document.getElementById('anioActual');
    if (span) span.textContent = new Date().getFullYear();
}
