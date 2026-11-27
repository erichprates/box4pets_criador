# Manual do projeto Box4Pets Criador

Site da Box4Pets para criadores de cães e gatos: seis páginas, com a mesma estrutura,
aparência e animações do site Box4Vets (pasta `../box4vets`). Este documento registra o
estado do projeto, as decisões, como publicar e o que está pendente.

Atualizado em 26/11/2026.

---

## 1. Endereços

| O quê | Onde |
|---|---|
| Prévia para o cliente | https://erichprates.github.io/box4pets_criador/ |
| Código-fonte | https://github.com/erichprates/box4pets_criador (branch `main`) |
| Desenvolvimento local | `npm run dev` e abrir http://localhost:3000 |
| Domínio final | A definir. Hoje está `box4pets.com.br` em `src/content/site.ts` |

A prévia sai fora dos buscadores (`noindex`).

## 2. Origem

- **Conteúdo:** protótipo "Box4Pets, Genética de saúde para criadores" (artifact com seis
  páginas). Os textos foram mantidos.
- **Estrutura, design system e animações:** copiados do Box4Vets. O manual de lá
  (`../box4vets/MANUAL_DO_PROJETO.md`) explica o design system, as regras das abas e a
  preparação dos vídeos; tudo aquilo vale aqui.
- **Logo:** `public/logo.svg` (box4pets com a etiqueta "criador"), mesmo roxo #3f2f80.

## 3. Páginas

| Rota | Arquivo | Conteúdo |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero com vídeo, selos, por que testar, escolha o teste, Ninhada Testada, como funciona, chamada final |
| `/testes` | `src/app/testes/page.tsx` | Comparativo, como escolher, Painel Saúde, como é o laudo, coleta, testes complementares |
| `/testes/[id]` | `src/app/testes/[id]/page.tsx` | Página de produto (painel, merle, avulsos, perfil), em formato de loja |
| `/precos` | `src/app/precos/page.tsx` | Três faixas de preço, testes complementares, proposta |
| `/programa-criador` | `src/app/programa-criador/page.tsx` | Como funciona, Ninhada Testada com certificado, benefícios, formulário |
| `/aprenda` | `src/app/aprenda/page.tsx` | Guia de Cruzamento e Genética de Cores, em sete capítulos |
| `/faq` | `src/app/faq/page.tsx` | Três grupos de perguntas |

Todos os textos ficam em `src/content/site.ts`. As seções ficam em
`src/components/sections/` e os blocos reutilizáveis (abertura de página, título de seção,
tabela que vira cartões, sanfona, lista) em `src/components/ui/Blocos.tsx`.

## 4. Como o conteúdo foi adaptado ao layout

- **Hero da home:** igual ao do Box4Vets (vídeo de DNA controlado pela rolagem, logo central
  que migra para o menu, box com vídeo que levanta da perspectiva).
- **Selos:** faixa que corre sem parar abaixo do hero.
- **Escolha o seu teste:** vitrine em formato de loja. Cada teste é um produto com foto, preço,
  seletor de quantidade e botão "Comprar", que abre o WhatsApp já com produto e quantidade.
  No Painel Saúde o preço por kit cai sozinho conforme a quantidade (acima de 3 e de 10).
  Testes avulsos são sob consulta, sem quantidade.
- **Página de produto** (`src/components/sections/Loja.tsx`): galeria com miniaturas, preço,
  faixas de desconto, quantidade, comprar, selos, três abas (Descrição, Como funciona,
  Informações) e "Recomendados" com os outros produtos. "Saiba mais" e o rodapé levam a ela.
- **Ninhada Testada (home):** painel escuro com os dois vídeos em stories.
- **Como funciona:** passos numerados, um aberto por vez, avançando sozinhos.
- **Como escolher (Testes):** quatro perguntas em abas, com a indicação ao lado.
- **Como é o laudo:** três status e um celular ilustrativo com a lista de condições.
- **Preços:** três cartões, o do meio em destaque.
- **Certificado (Programa Criador):** modelo desenhado em HTML, com os campos entre colchetes.
- **Combinações de cruzamento (Aprenda):** a tabela virou seis botões; cada par mostra uma
  barra dividida em normais, portadores e afetados.
- **Cores esperadas (Aprenda):** cada combinação tem uma amostra de cor aproximada.
- **Tabelas:** viram cartões no celular.
- **Formulário "Quero participar":** monta a mensagem e abre o WhatsApp.

Pequenas mudanças de texto: o botão "Comprar o teste — R$ 619" ficou "Comprar o teste por
R$ 619" (sem travessão); rótulos novos de apoio: "Por que testar", "Passo a passo", "Nossa
indicação" e a chamada final das páginas Testes e Aprenda.

## 5. Mídia

| Arquivo | Origem | Onde aparece |
|---|---|---|
| `hero-campo.mp4` (+ `-mobile`, `.jpg`) | Storyblocks (cães no campo; trecho final, em que o cão chega perto da câmera; montado ida e volta, 13s, para o loop não ter corte) | Fundo do hero, tocando sozinho em loop (no Box4Vets ele é controlado pela rolagem) |
| `faixa-canil.mp4` (+ `-mobile`, `.jpg`) | Envato (criadora com cão no canil, 7s) | Faixa com parallax da home |
| `faixa-brincando.mp4` (+ `-mobile`, `.jpg`) | Storyblocks (cães no gramado, 7s) | Faixa com parallax do Programa Criador |
| `story-brincando.mp4`, `story-canil.mp4` (+ `.jpg`) | Recortes verticais dos dois vídeos acima | Stories da Ninhada Testada (home) |
| `hero-coleta.mp4` (+ `-mobile`, `.jpg`) | Vídeo do cliente | Box do hero, coleta (Testes) e galeria de produto. **Provisório**: mostra o kit "box4dog" |
| `inovacao-*.jpg`, `abordagem-*.jpg`, `coleta.jpg` | Fotos do Box4Vets | Cards "Por que testar" e testes complementares. **Provisórias** |

**Imagem dos produtos:** não é foto. É uma embalagem 3D desenhada em CSS
(`src/components/ui/Caixa.tsx`), uma por produto, com o logo e o nome do teste, que flutua
e gira com o mouse. As cores e a frase de cada caixa ficam no objeto `estilos` desse arquivo.
A caixa é uma simulação: não reproduz a embalagem real do kit.

O protótipo ainda pede estas imagens, que continuam sem material próprio:

| Onde | O que o protótipo pede |
|---|---|
| Ninhada Testada (home) | Família recebendo o filhote e o certificado impresso com QR code |
| Como funciona | Kit aberto; app no cadastro; swab na bochecha; laudo no app |
| Programa Criador (topo) | Matriz e padreador no canil, com o selo "Canil Testado Box4Pets" |
| Coleta (Testes) | Vídeo de 1 min com a coleta em um cão e em um gato |
| Cores (Aprenda) | Grade de oito cães, um por cor da tabela |

## 6. Como publicar a prévia do cliente

```bash
npm run build:pages            # gera a pasta out/
cp -R out /tmp/ghp && cd /tmp/ghp
touch .nojekyll
git init -b gh-pages && git add -A && git commit -m "Prévia"
git push -f https://github.com/erichprates/box4pets_criador.git gh-pages
```

A prévia não se atualiza sozinha. O código vai para o `main` com `git push` normal.

## 7. Pendências

Vieram em aberto do próprio protótipo:
- [ ] Link de **"Ativar kit"** (menu).
- [ ] Link da **lista completa de doenças** e do **exemplo de laudo (PDF)**.
- [ ] Endereço do **Instagram** e das páginas de **Privacidade, Reembolso e Termos**.
- [ ] Horário de atendimento: "das [X] às [X] h" (página Preços).
- [ ] Validade dos kits: "[X] meses" (FAQ).
- [ ] Resposta sobre aceitação pela **CBKC e ALKC** (FAQ), hoje com o texto "[Confirmar…]".

Do projeto:
- [ ] Trocar todas as fotos e vídeos provisórios.
- [ ] Definir o domínio final e a relação com o site Box4Vets.
- [ ] Testar em aparelho real.

## 8. Histórico

**26/11/2026**
- Projeto criado a partir da base do Box4Vets, com o conteúdo das seis páginas do protótipo.
- Publicado no GitHub e no GitHub Pages.
- "Escolha o seu teste" virou vitrine de loja e cada teste ganhou página de produto.
- Produtos com embalagem 3D em CSS; três vídeos novos (hero, faixas e stories).
