// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os componentes
    initNavbar();
    initTheme();
    initEasterEggs();
    initContactForm();
    initSkillAnimations();
    initProjectModals();
    initScrollEffects();
    
    console.log('%c🦉 Portfólio AndersonLuiz.dev carregado!', 
        'color: #2ea043; font-size: 14px; font-weight: bold;');
    console.log('%cDica: Digite "OWL" no teclado para um easter egg secreto!', 
        'color: #8b949e; font-size: 12px;');
});

// ===== NAVBAR RESPONSIVA =====
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Fechar menu ao clicar em um link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        });
    }
    
    // Efeito de mudança na navbar ao scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== TOGGLE DE TEMA CLARO/ESCURO =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            setTheme(newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }
    
    function setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            updateThemeVariables('light');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            updateThemeVariables('dark');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }
    
    function updateThemeVariables(theme) {
        const root = document.documentElement;
        
        if (theme === 'light') {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f6f8fa');
            root.style.setProperty('--bg-card', '#ffffff');
            root.style.setProperty('--text-primary', '#1f2328');
            root.style.setProperty('--text-secondary', '#656d76');
            root.style.setProperty('--border-color', '#d0d7de');
        } else {
            root.style.setProperty('--bg-primary', '#0d1117');
            root.style.setProperty('--bg-secondary', '#161b22');
            root.style.setProperty('--bg-card', '#21262d');
            root.style.setProperty('--text-primary', '#f0f6fc');
            root.style.setProperty('--text-secondary', '#8b949e');
            root.style.setProperty('--border-color', '#30363d');
        }
    }
}

// ===== EASTER EGGS DA CORUJA =====
function initEasterEggs() {
    // 1. Coruja no Hero (tooltip interativo)
    const heroOwl = document.querySelector('.owl-hero');
    if (heroOwl) {
        heroOwl.addEventListener('mouseenter', function() {
            this.title = 'Hoo hoo! Trabalho melhor quando o sol se põe.';
        });
        
        heroOwl.addEventListener('click', function() {
            showOwlMessage('🦉 A sabedoria noturna guia meus commits!');
        });
    }
    
    // 2. Coruja no Footer (clique para mensagem)
    const footerOwl = document.getElementById('owl-secret');
    const secretMessage = document.getElementById('secret-message');
    
    if (footerOwl && secretMessage) {
        footerOwl.addEventListener('click', function() {
            secretMessage.classList.toggle('hidden');
            
            if (!secretMessage.classList.contains('hidden')) {
                // Efeito de digitação
                typeWriterEffect(
                    secretMessage, 
                    '"A coruja vê na escuridão o que outros não veem na luz."', 
                    50
                );
            }
        });
    }
    
    // 3. Coruja flutuante na seção Sobre
    const owlFloat = document.querySelector('.owl-float');
    if (owlFloat) {
        owlFloat.addEventListener('mouseenter', function() {
            this.style.animation = 'float 3s ease-in-out infinite';
            this.title = 'Observando cada detalhe do código...';
        });
        
        owlFloat.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
    
    // 4. Easter Egg de teclado (digitar "OWL")
    let owlSequence = [];
    const owlCode = ['KeyO', 'KeyW', 'KeyL'];
    
    document.addEventListener('keydown', function(e) {
        owlSequence.push(e.code);
        
        if (owlSequence.length > 3) {
            owlSequence.shift();
        }
        
        if (JSON.stringify(owlSequence) === JSON.stringify(owlCode)) {
            activateOwlSecret();
            owlSequence = [];
        }
    });
    
    // 5. Easter Egg escondido no console
    console.log(
        `%c
         ___   
        (o,o)  
        {`"`"}  
        -"-"-
        🦉 OwlOS v1.0 - Sistema de Desenvolvimento Noturno
        `,
        'color: #2ea043; font-family: monospace;'
    );
}

function showOwlMessage(message) {
    // Criar notificação estilo toast
    const toast = document.createElement('div');
    toast.className = 'owl-toast';
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    // Estilos inline para o toast
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: var(--border-radius);
        border: 1px solid var(--owl-green);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Botão para fechar
    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
    
    // Adicionar keyframes CSS dinamicamente
    if (!document.querySelector('#toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function activateOwlSecret() {
    // Efeito visual secreto
    document.body.style.transition = 'background 1s';
    document.body.style.background = 'linear-gradient(135deg, #0d1117, #0e4429, #161b22)';
    
    showOwlMessage('🦉 Easter egg desbloqueado! Modo Coruja Ativado!');
    
    // Adicionar corujas voando
    createFlyingOwls();
    
    // Reverter após 5 segundos
    setTimeout(() => {
        document.body.style.background = '';
        document.querySelectorAll('.flying-owl').forEach(owl => owl.remove());
    }, 5000);
}

function createFlyingOwls() {
    for (let i = 0; i < 5; i++) {
        const owl = document.createElement('div');
        owl.className = 'flying-owl';
        owl.textContent = '🦉';
        owl.style.cssText = `
            position: fixed;
            font-size: 2rem;
            z-index: 9999;
            pointer-events: none;
            animation: fly${i} 5s linear forwards;
        `;
        
        // Posição inicial aleatória
        const startX = Math.random() * window.innerWidth;
        owl.style.left = `${startX}px`;
        owl.style.top = `${window.innerHeight}px`;
        
        // Keyframes dinâmicos para voo
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fly${i} {
                0% { 
                    transform: translate(0, 0) rotate(0deg); 
                    opacity: 1;
                }
                100% { 
                    transform: translate(${Math.random() * 200 - 100}px, -${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg); 
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(owl);
        
        // Remover após animação
        setTimeout(() => owl.remove(), 5000);
    }
}

function typeWriterEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simulação de envio (substituir por integração real)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de rede
            setTimeout(() => {
                showFormMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Google Analytics event (se configurado)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submit', {
                        'event_category': 'engagement',
                        'event_label': 'Contact Form'
                    });
                }
            }, 1500);
        });
    }
    
    function showFormMessage(message, type) {
        // Remover mensagens anteriores
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        // Criar nova mensagem
        const msgDiv = document.createElement('div');
        msgDiv.className = `form-message ${type}`;
        msgDiv.textContent = message;
        msgDiv.style.cssText = `
            padding: 15px;
            margin-top: 20px;
            border-radius: var(--border-radius);
            background-color: ${type === 'success' ? 'rgba(46, 160, 67, 0.2)' : 'rgba(218, 54, 51, 0.2)'};
            color: ${type === 'success' ? 'var(--owl-green)' : 'var(--danger)'};
            border: 1px solid ${type === 'success' ? 'var(--owl-green)' : 'var(--danger)'};
        `;
        
        contactForm.appendChild(msgDiv);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (msgDiv.parentNode) {
                msgDiv.style.opacity = '0';
                msgDiv.style.transition = 'opacity 0.3s';
                setTimeout(() => msgDiv.remove(), 300);
            }
        }, 5000);
    }
}

// ===== ANIMAÇÃO DAS HABILIDADES =====
function initSkillAnimations() {
    const skillSection = document.getElementById('habilidades');
    const skillBars = document.querySelectorAll('.skill-level');
    
    if (!skillSection || skillBars.length === 0) return;
    
    // Observer para animar ao entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-in-out';
                        bar.style.width = width;
                    }, 200);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillSection);
}

// ===== MODAIS DE PROJETOS =====
function initProjectModals() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || projectButtons.length === 0) return;
    
    // Dados dos projetos
    const projects = {
        nutrofit: {
            title: "NutroFit - Sistema Nutricional com IA",
            content: `
                <h2>Detalhes do Projeto</h2>
                <p><strong>Status:</strong> Em desenvolvimento (fase final)</p>
                
                <h3>📊 Contexto do Problema</h3>
                <p>Nutrólogos enfrentam dificuldades para:</p>
                <ul>
                    <li>Criar planos alimentares personalizados de forma eficiente</li>
                    <li>Acompanhar múltiplos pacientes simultaneamente</li>
                    <li>Manter comunicação constante via WhatsApp</li>
                    <li>Analisar dados de progresso dos pacientes</li>
                </ul>
                
                <h3>🚀 Solução Implementada</h3>
                <p>Sistema B2B completo com:</p>
                <ul>
                    <li><strong>Landing Page</strong> - Convert leads médicos</li>
                    <li><strong>Dashboard Médico</strong> - Gerenciamento de pacientes</li>
                    <li><strong>IA Generativa</strong> - Cria planos alimentares personalizados</li>
                    <li><strong>Integração WhatsApp</strong> - Envio automático de lembretes e check-ins</li>
                    <li><strong>Painel do Paciente</strong> - Acompanhamento via app web</li>
                </ul>
                
                <h3>🛠 Stack Tecnológica</h3>
                <div class="modal-stack">
                    <span class="stack-tag"><i class="fab fa-node-js"></i> Node.js (Frontend)</span>
                    <span class="stack-tag"><i class="fab fa-python"></i> Django (Backend API)</span>
                    <span class="stack-tag"><i class="fas fa-brain"></i> Claude/LangChain (IA)</span>
                    <span class="stack-tag"><i class="fab fa-whatsapp"></i> Twilio API</span>
                    <span class="stack-tag"><i class="fas fa-database"></i> PostgreSQL</span>
                    <span class="stack-tag"><i class="fas fa-cloud"></i> Vercel (Deploy)</span>
                </div>
                
                <h3>📈 Próximos Passos</h3>
                <ul>
                    <li>Integração completa da API de IA (Claude)</li>
                    <li>Sistema de pagamentos (Stripe)</li>
                    <li>App mobile React Native</li>
                    <li>Beta testing com 5 clínicas</li>
                </ul>
                
                <div class="modal-links">
                    <a href="https://nutrofit-lading.vercel.app" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Acessar Landing Page
                    </a>
                    <a href="mailto:andersonluiz.dev@gmail.com?subject=Interesse no NutroFit" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> Solicitar Demonstração
                    </a>
                </div>
            `
        }
        // Adicionar outros projetos aqui conforme necessário
    };
    
    // Abrir modal
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            
            if (projects[projectId]) {
                document.getElementById('modal-body').innerHTML = projects[projectId].content;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fechar modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModalFunc();
        }
    });
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    // Ativar links da navbar conforme scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
                navLink.classList.add('active');
            } else if (navLink) {
                navLink.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Animar elementos ao entrar na viewport
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos para animação
    document.querySelectorAll('.project-card, .about-card, .skill-category').forEach(el => {
        animateOnScroll.observe(el);
    });
}

// ===== FUNÇÕES UTILITÁRIAS =====
// Copiar email para clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showOwlMessage('📋 E-mail copiado para a área de transferência!');
    });
}

// Formatar telefone
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// ===== INICIALIZAÇÃO ADICIONAL =====
// Adicionar estilos dinâmicos para animações
if (!document.querySelector('#dynamic-styles')) {
    const dynamicStyles = document.createElement('style');
    dynamicStyles.id = 'dynamic-styles';
    dynamicStyles.textContent = `
        .animated {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu a.active {
            color: var(--accent) !important;
        }
        
        .nav-menu a.active::after {
            width: 100% !important;
        }
        
        .modal-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
        }
        
        .modal-links {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
    `;
    document.head.appendChild(dynamicStyles);
}