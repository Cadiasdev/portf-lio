# Portfólio — Eduardo Rodrigues

Website one-page em português de Portugal, feito com HTML, CSS e JavaScript modular. Esta stack mantém o projecto leve, sem dependências ou processo de build, e simples de alojar como site estático.

## Estrutura

```text
.
├── index.html             # Base HTML e metadados SEO / Open Graph
├── styles.css              # Variáveis de cor, layout e breakpoints responsivos
├── robots.txt              # Permite a indexação pública
├── img.hero/
│   ├── logo-eduardo.png     # Logótipo do site e favicon
│   └── Retrato com Luz de Contorno Vermelha.png
└── src/
    ├── data.js             # Copy, serviços, projectos, tecnologias e contacto
    ├── components.js       # Componentes HTML reutilizáveis
    └── main.js             # Renderização, navegação e animações
```

## Executar localmente

Na pasta do projecto, inicie um servidor estático:

```bash
python3 -m http.server 4173
```

Abra [http://localhost:4173](http://localhost:4173). Para parar o servidor, use `Ctrl+C` no terminal.

## Personalizar

- **Foto:** substitua `img.hero/Retrato com Luz de Contorno Vermelha.png` ou actualize `hero.portrait` em `src/data.js`. A imagem actual é PNG com fundo transparente para manter o recorte.
- **Textos, serviços, tecnologias e projectos:** edite `src/data.js`.
- **WhatsApp:** substitua `contact.whatsapp.href` em `src/data.js` pelo link de contacto do WhatsApp.
- **Cores:** altere as variáveis `--color-*` no início de `styles.css`.
- **SEO e partilha:** actualize título, descrição e imagem Open Graph no `<head>` de `index.html` antes de publicar.

O contacto está reduzido ao WhatsApp. Não há formulário nem ligações para LinkedIn ou GitHub.

## Publicação

Por ser um site estático, pode ser publicado em qualquer alojamento de páginas estáticas. Na Vercel, importe o projecto e use a pasta raiz como directório de publicação.

Antes da publicação, defina o domínio final para completar o URL canónico e os URLs absolutos de Open Graph, e gerar `sitemap.xml` com esse domínio.

## Melhorias futuras

- Blog técnico ou área de artigos.
- Modo claro com alternância de tema.
- Versão em inglês e internacionalização.
- Substituição dos cartões visuais por capturas reais dos projectos.
- Deploy contínuo na Vercel.
