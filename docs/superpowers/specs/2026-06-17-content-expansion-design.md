# Design Spec — Content Expansion v2
**Data:** 2026-06-17
**Status:** Aprovado

## Objetivo

Expandir o material de estudo trilíngue (PT → EN → FR) com:
- Guia de pronúncia PT-BR em todas as tabelas existentes
- Mais exemplos por lição
- 3 novas lições de vocabulário
- Cheat sheet de referência rápida
- Exercícios semana 02 e 03

---

## Seção 1 — Modificações nos arquivos existentes

**Arquivos afetados:** `vocabulary/01-03` e `grammar/01-04` (7 arquivos)

### 1.1 Colunas de pronúncia

Todas as tabelas PT → EN → FR ganham 2 colunas extras:

| Português | English | Français | EN soa como | FR soa como |
|---|---|---|---|---|
| escrever | write | écrire | rrait | é-KREER |
| falar | speak | parler | spiik | par-LÊ |

**Convenção de notação:**
- Sílaba tônica em MAIÚSCULA
- Hífen entre sílabas
- `~` para sons nasais (ex: `van~` = vingt)
- Sons sem equivalente PT-BR descritos entre parênteses

### 1.2 Bloco "📣 Pronúncia" por lição

Após cada tabela principal, adicionar um bloco com as 3–5 armadilhas mais importantes da lição:

```
📣 Pronúncia
• write → "rrait" — ignore o "w", soa como "r" forte
• language → "LÊN-guedj" — termina em "dj", não "ge"
• français → "fran-SÊ" — vogal nasal, não pronuncie o "s" final
```

### 1.3 Mais exemplos

Cada lição passa de 5 para 8 frases na tabela de exemplos. As 3 novas frases por lição devem incluir as colunas de pronúncia e introduzir estruturas ligeiramente mais complexas.

---

## Seção 2 — Novos arquivos de vocabulário

### `vocabulary/04-saudacoes.md` — Saudações / Greetings / Salutations

Vocabulário:
- olá / hello / bonjour
- bom dia / good morning / bonjour *(mesmo palavra pra manhã e início da tarde)*
- boa tarde / good afternoon / bon après-midi
- boa noite / good evening / bonsoir
- tchau / bye / au revoir
- obrigado(a) / thank you / merci
- de nada / you're welcome / de rien
- por favor / please / s'il vous plaît
- com licença / excuse me / excusez-moi
- desculpe / sorry / pardon

Pronúncias-chave FR: "bonjour" → "bon-JJUR", "merci" → "mer-SI", "s'il vous plaît" → "sil-vu-PLÊ", "au revoir" → "o-rre-VUAR"

Estrutura: vocabulary tree + grammar map (formal vs informal) + tabela 5 colunas + bloco pronúncia + common mistakes + practice.

### `vocabulary/05-numeros.md` — Números / Numbers / Nombres

Conteúdo:
- Números 1–20 nas 3 línguas
- Quantidades comuns: muito/many/beaucoup, pouco/few/peu, alguns/some/quelques, todos/all/tous
- Curiosidades: números FR irregulares — 11→onze, 12→douze, 17→dix-sept ("diss-SET"), 20→vingt ("van~")

Estrutura: vocabulary tree (1–10 e 11–20 separados) + tabela 5 colunas + bloco pronúncia + common mistakes + practice.

### `vocabulary/06-falsos-amigos.md` — Falsos Amigos / False Friends / Faux Amis

Palavras que parecem iguais entre os 3 idiomas mas têm significados diferentes:

| Palavra | PT | EN | FR | Armadilha |
|---|---|---|---|---|
| eventualmente | às vezes | in the end / eventually | talvez / éventuellement | 3 significados diferentes |
| sensível / sensible | que sente emoções | sensato / racional | que sente emoções | EN diverge de PT e FR |
| polvo | animal do mar (octopus) | powder (pó) | — | visual parecido em PT-EN |
| libraria / livraria | livraria (livros) | biblioteca | livraria | EN × FR opostos |
| borracha | material / apagador | — | bouche (boca) | som parecido PT-FR |
| pretender | ter intenção de | fingir / to pretend | pretendre (afirmar) | falso cognato clássico |

Estrutura: tabela de falsos amigos + exemplos de erro comum + exemplos corretos + practice (identifique o falso amigo na frase).

---

## Seção 3 — Cheat Sheet

**`reference/cheat-sheet.md`** — consulta rápida com todo o vocabulário aprendido.

Estrutura:
- Tabela por tópico (Idiomas, Ações, Descrições, Saudações, Números, Falsos Amigos)
- 5 colunas: PT | EN | FR | EN soa como | FR soa como
- Seção "📣 Guia Rápido de Sons" separada:

```
EN → PT-BR:
  "th"        → "d" ou "f"  (the → "di", think → "fink")
  "w"         → vogal "u"   (week → "uiik")
  final -tion → "-chon"     (pronunciation → "pro-nan-si-EI-chon")
  final -ed   → "d" ou "t"  (learned → "lêrnd", stopped → "stopt")

FR → PT-BR:
  "r"         → gutural     (merci → "mer-SI", som de gargarejo suave)
  "u"         → sem equiv.  (tu → lábios de "u", língua de "i")
  nasal -an/en/in → vogal fechada pelo nariz (français → "fran-SÊ")
  letras finais → silenciosas na maioria (vous → "vu", pas → "pa")
```

---

## Seção 4 — Exercícios

### `exercises/week-02.md` — Saudações, Números e Pronúncia

- **Tipo 1:** Complete nas 3 línguas (saudações e números)
- **Tipo 2:** Corrija o erro (erros clássicos de saudações e números)
- **Tipo 3:** Tradução livre (frases do dia a dia)
- **Tipo 4 (novo):** Escrita fonética — dado EN ou FR, escreva como soa em PT-BR

### `exercises/week-03.md` — Gramática + Falsos Amigos + Revisão Geral

- **Tipo 1:** Complete nas 3 línguas (frases com artigos, preposições, concordância)
- **Tipo 2:** Corrija o erro (artigos, gênero FR, preposições, falsos cognatos)
- **Tipo 3:** Tradução livre (frases mais longas, múltiplos conceitos da mesma frase)
- **Tipo 4:** Armadilha — identifique o falso amigo e corrija o significado

---

## Seção 5 — Atualização do README

Adicionar ao dashboard de progresso:
- Links para vocab/04, 05, 06
- Link para reference/cheat-sheet.md
- Links para exercises/week-02.md e week-03.md
- Seção "📣 Guia de Pronúncia" explicando a convenção de notação

---

## Resumo de entregáveis

| Ação | Arquivos |
|---|---|
| Modificar (+ pronúncia + exemplos) | vocabulary/01-03, grammar/01-04 (7 arquivos) |
| Criar | vocabulary/04-saudacoes.md |
| Criar | vocabulary/05-numeros.md |
| Criar | vocabulary/06-falsos-amigos.md |
| Criar | reference/cheat-sheet.md |
| Criar | exercises/week-02.md |
| Criar | exercises/week-03.md |
| Atualizar | README.md |

**Total: 7 modificações + 6 novos arquivos + README**
