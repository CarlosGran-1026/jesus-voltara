# Jesus Voltará — Site de Mensagens Bíblicas

Site completo em React + Vite para publicação de mensagens bíblicas diárias, devocionais e reflexões.

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam em `dist/` — prontos para publicar em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, etc.).

## Publicando no Netlify

O projeto já inclui `netlify.toml` e `public/_redirects`, necessários para que as rotas do React Router funcionem corretamente (sem eles, atualizar a página em `/mensagens`, `/admin` etc. resultaria em erro 404).

**Opção 1 — Arrastar e soltar:**
1. Rode `npm install && npm run build` localmente
2. Acesse app.netlify.com → "Add new site" → "Deploy manually"
3. Arraste a pasta `dist/` gerada

**Opção 2 — Conectado ao Git (recomendado):**
1. Suba o projeto para um repositório (GitHub/GitLab/Bitbucket)
2. No Netlify: "Add new site" → "Import an existing project"
3. Build command: `npm run build` — Publish directory: `dist` (já configurado em `netlify.toml`, o Netlify detecta automaticamente)

## Receber e-mail do formulário de contato

O formulário de contato (`/contato`) usa o **Web3Forms** — um serviço gratuito e independente de qual hospedagem você usa (Netlify, Vercel, etc.), sem necessidade de cartão de crédito, com até 250 envios/mês grátis.

**Configuração (leva ~2 minutos):**
1. Acesse **https://web3forms.com**
2. Digite seu e-mail e clique em "Create Access Key" — você recebe a chave na hora, sem precisar criar conta/senha
3. Abra `src/pages/Contact.jsx` e cole a chave na constante `WEB3FORMS_ACCESS_KEY`, no topo do arquivo:
   ```js
   const WEB3FORMS_ACCESS_KEY = 'sua-chave-aqui'
   ```
4. Rode `npm run build` novamente e publique — pronto, a partir daí todo envio do formulário chega direto no seu e-mail

Enquanto a chave não for configurada, o site continua funcionando normalmente, mas o envio fica salvo apenas localmente (no navegador de quem preencheu), sem chegar por e-mail.

## Painel administrativo

Acesse `/admin`.
Usuário e senha ficam nas constantes `ADMIN_USERNAME` e `ADMIN_PASSWORD` em `src/pages/Admin.jsx` — altere-as antes de publicar em produção, pois ficam visíveis no código-fonte do bundle.

## Armazenamento de dados

Este MVP guarda tudo no `localStorage` do navegador (mensagens, inscrições de newsletter e contatos), sem necessidade de backend. As 10 mensagens de exemplo (seed) são carregadas automaticamente no primeiro acesso.

Para produção com múltiplos usuários/editores, recomenda-se migrar os dados para um backend real (Firebase, Supabase ou API própria) — a estrutura de dados (`src/data/messages.js`) já está pronta para servir de modelo de schema.

## Estrutura

- `src/components` — componentes reutilizáveis (cards, header, footer, busca, compartilhamento, gerador de imagem etc.)
- `src/pages` — as 9 páginas do site (Home, Mensagens, Mensagem individual, Categorias, Categoria, Sobre, Contato, Buscar, Admin)
- `src/data` — mensagens seed, categorias e livros bíblicos
- `src/hooks` — lógica de mensagens (CRUD), tema e busca/filtros
- `src/utils` — slug, datas e geração de imagem via Canvas

## Leitura do texto bíblico e busca, direto no site

No Calendário de Leitura (`/calendario`), cada referência (ex: "Sl 56-59") é clicável — ao clicar, o texto aparece numa janela sobreposta, sem sair da página. A página **Buscar** (`/buscar`) também é uma busca real na Bíblia: digite uma palavra (ex: "esperança") para encontrar todos os versículos que a contêm, ou uma referência (ex: "Romanos 8", "Sl 23") para ler o texto direto.

O texto vem de um acervo público hospedado como arquivos estáticos no GitHub (github.com/MaatheusGois/bible), na versão **Almeida Corrigida Fiel (ACF)** — sem necessidade de conta, token ou configuração, e sem limite de requisições (é só um arquivo de texto sendo baixado, como uma imagem).

O site guarda em cache (no navegador, durante a sessão) cada livro já buscado, então reabrir a mesma referência não baixa os dados de novo. A busca por palavra baixa o texto completo da Bíblia (~1 MB comprimido) na primeira vez que é usada; buscas seguintes na mesma sessão são instantâneas.

Se algum dia o serviço estiver fora do ar, aparece um aviso com um link de apoio (busca no Google pelo nome completo do livro), então o recurso nunca trava a navegação.


- **Nome do site**: trocar "Jesus Voltará" em `Header.jsx`, `Footer.jsx`, `index.html`, `shareImage.js` e `About.jsx`
- **Cores**: variáveis CSS em `src/index.css` (`:root` e `[data-theme='dark']`)
- **Fontes**: Playfair Display (títulos/versículos) + Inter (corpo), carregadas via Google Fonts
