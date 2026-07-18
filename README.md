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

## Aparecer no Google e divulgar nas redes sociais

O projeto já vem preparado tecnicamente para isso: meta tags de SEO, imagem de compartilhamento (`public/og-image.png`), `robots.txt` e `sitemap.xml`. Mas faltam alguns passos manuais, que só podem ser feitos por você (não é algo que se resolve só no código):

### 1. Antes de tudo: troque o domínio de exemplo

Os arquivos usam `https://SEU-DOMINIO-AQUI.netlify.app/` como placeholder. Depois de publicar no Netlify (e saber o endereço final do site, ou configurar um domínio próprio), substitua esse texto pelo endereço real em 3 arquivos:
- `index.html` (5 ocorrências: canonical, og:url, og:image, twitter:image)
- `public/robots.txt`
- `public/sitemap.xml` (em todas as URLs)

Depois rode `npm run build` de novo e publique.

### 2. Cadastrar no Google Search Console (para aparecer nas buscas)

1. Acesse **search.google.com/search-console**
2. Adicione seu site (propriedade tipo "prefixo do URL")
3. Verifique a propriedade (o Netlify permite verificar via DNS ou subindo um arquivo HTML — o Search Console explica o passo exato)
4. Depois de verificado, vá em **Sitemaps** no menu lateral e envie: `sitemap.xml`
5. Pronto — o Google passa a rastrear o site periodicamente. Não é instantâneo: costuma levar de alguns dias a poucas semanas para as páginas aparecerem nos resultados de busca

Dica: em **Inspeção de URL** (mesmo menu), você pode colar o link da home e clicar em "Solicitar indexação" para acelerar um pouco a primeira indexação.

### 3. Divulgar nas redes sociais

Isso é mais estratégia do que código, mas alguns pontos técnicos ajudam:
- Quando você colar o link do site no WhatsApp, Instagram (bio/stories), Facebook ou Twitter/X, a imagem de capa (`og-image.png`) e o título/descrição já aparecem automaticamente, graças às meta tags — não precisa fazer nada extra
- Se colar o link e a prévia não atualizar (às vezes as redes guardam versão antiga em cache), use o **Facebook Sharing Debugger** (developers.facebook.com/tools/debug) colando a URL do site e clicando em "Scrape Again" — isso força a rede a buscar a versão nova
- Ideias de conteúdo para postar: a mensagem do dia (a Home já destaca uma), um card de versículo (o botão "Gerar imagem" dentro de cada mensagem serve exatamente para isso), ou convidar para o Calendário de Leitura

### 4. Ideias adicionais (fora do escopo do código)

- Criar perfis do site no Instagram/Facebook com o mesmo nome e logo, linkando para o site na bio
- Compartilhar em grupos de WhatsApp/Telegram relacionados ao tema
- Pedir para amigos/conhecidos compartilharem — engajamento inicial ajuda o Google a entender que o site é relevante

## Personalização rápida


- **Nome do site**: trocar "Jesus Voltará" em `Header.jsx`, `Footer.jsx`, `index.html`, `shareImage.js` e `About.jsx`
- **Cores**: variáveis CSS em `src/index.css` (`:root` e `[data-theme='dark']`)
- **Fontes**: Playfair Display (títulos/versículos) + Inter (corpo), carregadas via Google Fonts
