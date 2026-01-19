// ===== NOVABYTE STUDIO - SCRIPT PRINCIPAL =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('NovaByte Studio cargada correctamente');
    
    // ===== VARIABLES GLOBALES =====
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ===== PARTÍCULAS ANIMADAS =====
    function createParticles() {
        const container = document.getElementById('particles-container');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Tamaño aleatorio
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posición inicial aleatoria
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Animación con duración y retardo aleatorios
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Opacidad aleatoria
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            container.appendChild(particle);
        }
    }
    
    // ===== MENÚ RESPONSIVE =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace (en móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Marcar enlace activo
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ===== EFECTO TYPING =====
    function initTypingEffect() {
        const typewriters = document.querySelectorAll('.typewriter');
        typewriters.forEach((el, index) => {
            const text = el.textContent;
            el.textContent = '';
            let i = 0;
            const speed = 50; // velocidad en milisegundos
            const delay = index * 2000; // delay entre líneas
            
            setTimeout(() => {
                const timer = setInterval(() => {
                    if (i < text.length) {
                        el.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                    }
                }, speed);
            }, delay);
        });
    }
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMACIÓN DE TARJETAS AL SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.pricing-card, .service-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estado inicial de las tarjetas
    document.querySelectorAll('.pricing-card, .service-card, .gallery-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // ===== CAMBIAR CLASE ACTIVA EN NAVEGACIÓN =====
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== EFECTO GLOW AL PASAR MOUSE SOBRE BOTONES =====
    function addButtonGlowEffect() {
        const buttons = document.querySelectorAll('.btn-pricing, .btn-cta, .btn-overlay');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.6)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }
    
    // ===== INICIALIZAR TODO =====
    function init() {
        createParticles();
        initTypingEffect();
        addButtonGlowEffect();
        
        // Ejecutar animaciones al cargar
        setTimeout(animateOnScroll, 100);
        
        // Event listeners
        window.addEventListener('scroll', () => {
            updateActiveNavLink();
            animateOnScroll();
        });
        
        // Actualizar año en footer
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
    
    // Inicializar la página
    init();
    
    console.log('NovaByte Studio - Todas las funcionalidades inicializadas');
});