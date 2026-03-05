# 🦉 andersonluiz.dev — Portfólio

Portfólio profissional com tema dark retro-futurista, jogo de nave integrado e easter eggs.

**[→ Ver ao vivo](https://andersonluiz-dev.vercel.app)**

---

## ✨ O que tem nele

- **Dark retro-futurista** — estética terminal/hacker com scanlines, grid de fundo e glow effects
- **Arquivo único** — tudo em `index.html` (HTML + CSS + JS inline), sem dependências locais
- **Jogo de nave 🚀** — Space Shooter jogável direto no portfólio (botão "jogar" no nav)
- **Typed effect** — roles que rotacionam automaticamente no hero
- **Skill bars animadas** — animam ao entrar na viewport via IntersectionObserver
- **Fade-in nas seções** — scroll suave com animação de entrada
- **Easter egg OWL** — digitar O-W-L no teclado ativa animação de corujas

---

## 🚀 Rodando localmente

```bash
git clone https://github.com/owlboy13/portfolio.git
cd portfolio
# Abrir index.html no navegador — sem build, sem dependências
```

Ou com Live Server no VS Code: botão direito em `index.html` → *Open with Live Server*

---

## 🎮 O Jogo

Clique em **"🚀 jogar"** no nav (desktop) ou acesse pelo menu mobile.

| Tecla | Ação |
|-------|------|
| ← → / A D | Mover nave |
| Espaço / ↑ | Atirar |
| P | Pausar |
| ESC | Fechar jogo |

Inimigos em 3 tiers (verde, azul, âmbar) com dificuldade crescente por onda.

---

## 🦉 Easter Egg

Digite **OWL** no teclado em qualquer parte do site para ativar o Modo Coruja.

---

## 🛠 Stack

```
HTML5 · CSS3 · JavaScript (vanilla)
Font Awesome 6.4 · Google Fonts (Share Tech Mono + Rajdhani)
Deploy: Vercel
```

---

## 📁 Estrutura

```
portfolio/
├── index.html        # Tudo aqui — HTML, CSS e JS em arquivo único
├── README.md
├── .gitignore
├── vercel.json
└── assets/
    └── icons/        # Favicons
```

---

## ➕ Adicionando projetos

Dentro da `div.projects-list` no `index.html`, copie um bloco `<article class="project-card">` existente e ajuste título, badges, descrição, stack e links.

Badges disponíveis: `badge-green` · `badge-blue` · `badge-amber` · `badge-gray`

---

## 🌐 Deploy no Vercel

```bash
npm i -g vercel
vercel
```

Ou conecte o repositório diretamente em [vercel.com](https://vercel.com) — zero configuração necessária.

---

## 📞 Contato

**Anderson Luiz**  
📧 andersonluiz.dev@gmail.com  
📱 (83) 99920-8007  
💼 [LinkedIn](https://linkedin.com/in/andersonluiz-dev)  
🐙 [GitHub](https://github.com/owlboy13)