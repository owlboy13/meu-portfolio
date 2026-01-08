🌙 Portfolio Anderson Luiz - Desenvolvimento & Automação

Portfólio profissional minimalista com tema escuro estilo GitHub

Live Demo • Report Bug • Request Feature

</div>
🦉 Sobre o Projeto
Portfólio desenvolvido para destacar habilidades em desenvolvimento web, sistemas locais e automações RPA. Design inspirado no GitHub Dark Theme com elementos de coruja como símbolo do trabalho noturno.

✨ Funcionalidades Principais
✅ Tema Escuro GitHub-style - Cores e estética inspiradas no GitHub

✅ Totalmente Responsivo - Mobile-first design

✅ Easter Eggs Interativos - 5 segredos escondidos

✅ Performance Otimizada - Carregamento rápido

✅ SEO Pronto - Meta tags e estrutura semântica

✅ Formulário de Contato - Funcional e moderno

🎯 Seções do Site
Seção	Descrição
Hero	Apresentação com CTA e código interativo
Sobre	Filosofia de trabalho e bio profissional
Projetos	4 projetos em destaque com cases detalhados
Habilidades	Barras de progresso e tags técnicas
Contato	Formulário + links diretos (WhatsApp/Email)
Footer	Links sociais e easter egg final
🚀 Começando
Pré-requisitos
Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)

Editor de código (VS Code recomendado)

Conta no GitHub e Vercel

Instalação Local
Clone o repositório

bash
git clone https://github.com/owlboy13/portfolio.git
cd portfolio
Abra no VS Code

bash
code .
Execute com Live Server

Instale a extensão "Live Server"

Botão direito em index.html → "Open with Live Server"

Acesse http://localhost:5500

🛠 Tecnologias
<table> <tr> <td><strong>Frontend</strong></td> <td> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript"> </td> </tr> <tr> <td><strong>Design</strong></td> <td> <img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=flat&logo=fontawesome&logoColor=white" alt="Font Awesome"> <img src="https://img.shields.io/badge/Google_Fonts-4285F4?style=flat&logo=googlefonts&logoColor=white" alt="Google Fonts"> </td> </tr> <tr> <td><strong>Deploy</strong></td> <td> <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel"> <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=flat&logo=githubpages&logoColor=white" alt="GitHub Pages"> </td> </tr> </table>
📁 Estrutura do Projeto
text
portfolio-andersonluiz/
├── 📄 index.html              # Página principal
├── 🎨 style.css               # Estilos completos (CSS)
├── ⚡ script.js               # Interatividade e Easter Eggs
├── 📖 README.md               # Documentação
├── .gitignore                 # Arquivos ignorados no Git
├── vercel.json                # Configuração do Vercel
│
├── 📁 assets/                 # Recursos estáticos
│   ├── 📁 icons/             # Ícones SVG
│   │   └── owl-icon.svg      # Ícone da coruja
│   └── 📁 images/            # Imagens otimizadas
│       ├── profile.jpg       # Foto profissional
│       └── projects/         # Screenshots dos projetos
│
└── 📁 pages/                  # Páginas adicionais (opcional)
    ├── projects/             # Páginas detalhadas por projeto
    └── contact-success.html  # Confirmação de contato
🎨 Personalização
1. Alterar Informações Pessoais
No index.html, atualize:

Seção Hero:

html
<h1 class="hero-title">
    <span class="gradient-text">Seu Nome</span> <!-- ← Seu nome aqui -->
    <span class="owl-hero">🦉</span>
</h1>
<h2 class="hero-subtitle">Seu Título Profissional</h2> <!-- ← Seu título -->
Seção Contato:

html
<a href="https://wa.me/SEU_NUMERO" class="contact-item" target="_blank">
    <!-- ... -->
    <span class="contact-value">(XX) XXXXX-XXXX</span> <!-- ← Seu WhatsApp -->
</a>

<a href="mailto:SEU_EMAIL" class="contact-item">
    <!-- ... -->
    <span class="contact-value">seuemail@dominio.com</span> <!-- ← Seu email -->
</a>
2. Adicionar Novos Projetos
Na seção #projetos, adicione:

html
<article class="project-card">
    <div class="project-badge">
        <span class="badge">Tipo</span>
        <span class="badge badge-green">Tecnologia</span>
    </div>
    <div class="project-content">
        <div class="project-info">
            <h3>Nome do Projeto</h3>
            <p class="project-problem">
                <strong>Problema:</strong> Descrição do problema resolvido.
            </p>
            <p class="project-solution">
                <strong>Solução:</strong> Como seu projeto resolve o problema.
            </p>
            <div class="project-stack">
                <span class="stack-tag"><i class="fab fa-python"></i> Python</span>
                <!-- Adicione mais tecnologias -->
            </div>
            <div class="project-links">
                <a href="LINK_GITHUB" class="btn btn-primary" target="_blank">
                    <i class="fab fa-github"></i> Ver Código
                </a>
                <a href="LINK_DEMO" class="btn btn-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Ver Demo
                </a>
            </div>
        </div>
    </div>
</article>
3. Modificar Cores
No início do style.css:

css
:root {
    /* Cores principais */
    --bg-primary: #0d1117;        /* Cor de fundo principal */
    --bg-secondary: #161b22;      /* Cor de fundo secundária */
    --bg-card: #21262d;           /* Fundo dos cards */
    
    /* Cores de texto */
    --text-primary: #f0f6fc;      /* Texto principal */
    --text-secondary: #8b949e;    /* Texto secundário */
    
    /* Cores de destaque */
    --accent: #58a6ff;            /* Azul de destaque (links, botões) */
    --owl-green: #2ea043;         /* Verde da coruja (seu toque pessoal) */
    
    /* Modifique estas cores para personalizar */
}
4. Adicionar Suas Habilidades
Na seção #habilidades:

html
<div class="skill-item">
    <span class="skill-name">Nova Habilidade</span> <!-- ← Nome da skill -->
    <div class="skill-bar">
        <div class="skill-level" style="width: 80%"></div> <!-- ← Nível (0-100%) -->
    </div>
</div>
Ou adicione tags de habilidades:

html
<span class="skill-tag"><i class="fab fa-react"></i> React</span>
<span class="skill-tag"><i class="fab fa-node-js"></i> Node.js</span>
🌐 Deploy
Opção 1: Vercel (Recomendado)
Via Interface Web:

Acesse vercel.com

Faça login com GitHub

Clique em "Add New" → "Project"

Importe seu repositório

Clique em "Deploy"

Via CLI:

bash
# Instale o Vercel CLI
npm i -g vercel

# Faça deploy
vercel
Opção 2: GitHub Pages
Vá para Settings do seu repositório

Role até "GitHub Pages"

Em "Source", selecione main branch

Seu site estará em: https://seuusuario.github.io/portfolio

Configuração do Vercel (Opcional)
Crie vercel.json para configurações avançadas:

json
{
  "buildCommand": null,
  "outputDirectory": ".",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" }
      ]
    }
  ]
}
🦉 Easter Eggs Descobríveis
O portfólio inclui 5 Easter Eggs interativos:

#	Como Ativar	O Que Acontece
1	Passar mouse na coruja do Hero	Mensagem secreta aparece
2	Clicar na coruja do Footer	Citação filosófica revelada
3	Digitar "OWL" no teclado	Modo Coruja ativado (animação)
4	Abrir Console (F12)	Mensagem especial no DevTools
5	Clicar no ícone 🌙	Alternar tema claro/escuro
Para Adicionar Mais Easter Eggs
No script.js:

javascript
// Exemplo: Novo easter egg
const novoElemento = document.querySelector('#novo-elemento');
if (novoElemento) {
    novoElemento.addEventListener('click', function() {
        showOwlMessage('🦉 Você encontrou um novo segredo!');
        // Adicione animações ou efeitos especiais
    });
}
📊 SEO e Performance
Meta Tags Configuradas
html
<!-- index.html -->
<meta name="description" content="Portfólio de Anderson Luiz - Desenvolvedor Full-Stack Python especializado em Automação RPA, Sistemas Web e Aplicações com IA">
<meta name="keywords" content="Python, Django, Automação RPA, Selenium, Streamlit, Desenvolvedor Backend, Web Scraping">
<meta property="og:title" content="Anderson Luiz | Dev Full-Stack & Automação">
<meta property="og:description" content="Transformo processos complexos em soluções eficientes através de código">
<meta property="og:image" content="https://andersonluiz.vercel.app/assets/images/og-image.jpg">
Otimizações de Performance
✅ Imagens otimizadas (compressão automática recomendada)

✅ CSS minificado (pronto para produção)

✅ JavaScript otimizado (sem dependências pesadas)

✅ Carregamento lazy (para imagens futuras)

✅ Cache configurado (headers apropriados)

🐛 Solução de Problemas
Problema	Causa Possível	Solução
Formulário não envia	Configuração do Netlify	Remova netlify do form ou configure no Netlify
Imagens não carregam	Caminho incorreto	Verifique o caminho no src das imagens
CSS não aplica	Cache do navegador	Ctrl+F5 para hard refresh
JavaScript não funciona	Erro no console	Verifique Console (F12) por erros
Site não atualiza no Vercel	Cache do Vercel	Aguarde 1-2 minutos ou limpe cache
Verificações Pós-Deploy
bash
# Teste de links (Linux/Mac)
curl -I https://seu-site.vercel.app

# Teste de performance
# Use o Lighthouse do Chrome DevTools
📈 Roadmap de Melhorias
Fase 1 (Imediato)
Deploy no Vercel

Configurar domínio personalizado (opcional)

Integrar com Google Analytics

Otimizar imagens

Fase 2 (1-2 semanas)
Adicionar mais 2 projetos detalhados

Criar página "Blog" para artigos técnicos

Adicionar modo impressão (CV)

Internacionalização (EN/PT)

Fase 3 (1 mês)
Sistema de blog com Markdown

Dark/Light mode automático

Animações mais avançadas (GSAP)

PWA (Progressive Web App)

👥 Contribuindo
Contribuições são bem-vindas! Siga estes passos:

Fork o projeto

Crie uma branch (git checkout -b feature/incrivel)

Commit suas mudanças (git commit -m 'Add incrível feature')

Push para a branch (git push origin feature/incrivel)

Abra um Pull Request

Guia de Estilo de Código
Use nomes descritivos em inglês para classes CSS

Comente código complexo em JavaScript

Mantenha indentação consistente (2 espaços)

Teste em pelo menos 2 navegadores

📄 Licença
Distribuído sob licença MIT. Veja LICENSE para mais informações.

📞 Contato
Anderson Luiz
📧 andersonluiz.dev@gmail.com
📱 (83) 99920-8007
💼 LinkedIn
🐙 GitHub