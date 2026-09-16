# Mult Lang — web study reader

Camada de apresentação **somente leitura** para o conteúdo Markdown do repositório, seguindo o mesmo princípio do Projeto Gênesis:

> **A interface depende do conteúdo; o conteúdo não depende da interface.**

## Fonte de verdade

O curso atual de francês continua em `french/current_course/`.

A aplicação não move, duplica nem reescreve as lições. Ela lê os `.md` diretamente do repositório local. Assim, material avançado em outras pastas não aparece automaticamente como conteúdo já estudado.

## Rodar

Na raiz do repositório:

```bash
node web/server.mjs
```

Abra:

```text
http://127.0.0.1:4174
```

Não precisa de `npm install`: o servidor usa módulos nativos do Node.

Para abrir no celular pela rede local:

```bash
HOST=0.0.0.0 node web/server.mjs
```

## V1

- home mobile-first;
- acesso ao curso atual de francês;
- lista automática dos Markdown em `french/current_course/`;
- leitura das lições sem criar segunda fonte de verdade;
- busca simples nos arquivos liberados;
- tema escuro;
- progresso local no navegador por arquivo concluído;
- botão para marcar/desmarcar uma lição como concluída.

## Estrutura

```text
web/
├── README.md
├── server.mjs
└── public/
    ├── index.html
    ├── app.js
    └── styles.css
```
