# Manual do projeto Box4Pets Criador

Site da Box4Pets para criadores de cães e gatos: cinco páginas, quatro páginas de produto e
um carrinho que fecha o pedido pelo WhatsApp. Usa a mesma base, aparência e animações do
site Box4Vets (pasta `../box4vets`). Este documento registra o estado do projeto, as
decisões, como publicar e o que está pendente.

Atualizado em 27/11/2026.

---

## 1. Endereços

| O quê | Onde |
|---|---|
| Prévia para o cliente | https://erichprates.github.io/box4pets_criador/ |
| Código-fonte | https://github.com/erichprates/box4pets_criador (branch `main`) |
| Desenvolvimento local | `npm run dev -- -p 3211` e abrir http://localhost:3211 (o Box4Vets usa a 3210) |
| Domínio final | A definir. Hoje está `box4pets.com.br` em `src/content/site.ts` |

A prévia sai fora dos buscadores (`noindex`).

O script `dev` já sobe com `NODE_OPTIONS=--max-http-header-size=65536`. Sem isso o
`localhost` pode responder erro 431, por causa dos cookies acumulados de outros projetos.

## 2. Origem

- **Conteúdo:** protótipo "Box4Pets, Genética de saúde para criadores" (artifact com seis
  páginas). Os textos foram mantidos, com as exceções listadas na seção 4.
- **Estrutura, design system e animações:** copiados do Box4Vets. O manual de lá
  (`../box4vets/MANUAL_DO_PROJETO.md`) explica o design system, as regras das abas e a
  preparação dos vídeos; tudo aquilo vale aqui.
- **Logo:** `public/logo.svg` (box4pets com a etiqueta "criador"), mesmo roxo #3f2f80.

## 3. Páginas

| Rota | Arquivo | Conteúdo, na ordem |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, selos, por que testar (pilha de cards), escolha o seu teste (vitrine), Ninhada Testada, como funciona, faixa de vídeo, chamada final |
| `/testes` | `src/app/testes/page.tsx` | Como escolher, como é o laudo, Painel Saúde, coleta, opções lado a lado, testes complementares, chamada final |
| `/testes/[id]` | `src/app/testes/[id]/page.tsx` | Página de produto (`painel`, `merle`, `avulsos`, `perfil`) |
| `/programa-criador` | `src/app/programa-criador/page.tsx` | Como funciona, faixa de vídeo, Ninhada Testada com certificado, benefícios, formulário |
| `/aprenda` | `src/app/aprenda/page.tsx` | Guia de Cruzamento e Genética de Cores, em sete capítulos |
| `/faq` | `src/app/faq/page.tsx` | Três grupos de perguntas |

A página **Preços** do protótipo foi removida: os preços estão nos produtos.

Onde fica cada coisa:

| Caminho | Conteúdo |
|---|---|
| `src/content/site.ts` | Todos os textos, links, menu, produtos e rodapé |
| `src/components/sections/` | Seções. `Home.tsx` (home), `Testes.tsx`, `Loja.tsx` (vitrine, página de produto, comparativo), `Carrinho.tsx`, `Programa.tsx`, `Aprenda.tsx`, `Hero.tsx`, `Header.tsx`, `FaixaVideo.tsx`, `Rodape.tsx` |
| `src/lib/carrinho.tsx` | Estado do carrinho e regras de preço |
| `src/components/ui/` | `Button.tsx` (botões, etiqueta, linha de pagamento), `Caixa.tsx` (embalagem 3D), `Blocos.tsx` (abertura de página, título, tabela, sanfona, lista), logo e ícones |

## 4. Decisões e como cada parte funciona

### Menu e rodapé
- Menu: Início, Testes, Programa Criador, Aprenda, FAQ. À direita, "Ativar kit", "Pedir
  pelo WhatsApp" e o ícone do carrinho.
- Rodapé: contatos com ícone (WhatsApp, e-mail, Instagram) no lugar das palavras. No
  celular fica compacto e centralizado, sem as colunas "Produto" e "Criador".

### Hero (home)
- Vídeo de cães no campo ao fundo, tocando sozinho em loop (no Box4Vets o vídeo é
  controlado pela rolagem; aqui não).
- Três botões: "Adquira o teste" (branco, rola até a vitrine, não abre o WhatsApp),
  "Conhecer os testes" (azul claro, vai para `/testes`) e "Conhecer o Programa Criador"
  (contorno branco).
- Linha de pagamento com ícones: "Atendimento e pagamento pelo WhatsApp" e "Pague em até 6x".

### Por que testar (home)
- Quatro cards grandes, com foto, que empilham com a rolagem: cada um gruda no topo e
  encolhe um pouco quando o seguinte chega por cima. Cores do branco ao roxo escuro.

### Loja
- **Produtos:** Painel Saúde (R$ 619), Teste Merle (R$ 450), Testes avulsos (R$ 450 por
  teste) e Perfil de DNA (R$ 489). Os preços ficam em `unitario`, em `src/lib/carrinho.tsx`.
- **Desconto por quantidade (só Painel Saúde):** acima de 3 kits, R$ 529 cada; acima de
  10, R$ 489 cada (`precoPainel`, no mesmo arquivo).
- **Imagem do produto:** embalagem 3D desenhada em CSS (`Caixa.tsx`), que flutua e gira com
  o mouse. É uma simulação, não a embalagem real.
- **Vitrine (home):** cards sem borda, com contador de quantidade e botão "Adicionar". O
  recomendado (Painel Saúde) vem primeiro, um pouco maior no desktop e com uma luz aqua e
  roxa girando em volta.
- **Página de produto:** só a caixa 3D como imagem, preço, faixas de desconto, quantidade,
  "Adicionar ao carrinho", selos, três abas (Descrição, Como funciona, Informações) e
  "Outros testes recomendados".
- **Testes avulsos** não entram no carrinho: o botão é "Consultar" e abre o WhatsApp,
  porque depende de qual teste a pessoa precisa.

### Carrinho
- Não há pagamento no site. O carrinho monta o pedido e "Finalizar pelo WhatsApp" abre a
  conversa com itens, quantidades, preço unitário e total já escritos.
- Fica salvo no navegador (`localStorage`), então não se perde ao trocar de página.
- É uma janela com a altura do conteúdo: cresce com os itens e só rola por dentro ao
  encher a tela. No desktop abre do canto do ícone; no celular sobe de baixo.
- Mostra quanto falta para a próxima faixa de desconto do Painel Saúde.
- **Botão flutuante**, só quando há itens: no celular, no canto inferior direito; no
  desktop, no topo à direita quando o menu some ao rolar para baixo.

### Página Testes
- **Como escolher:** quatro perguntas em abas; cada resposta mostra a caixa do produto
  indicado flutuando ao lado e um link "Ver produto" (`comoEscolher[].produto`).
- **Como é o laudo:** três status e um cartão de vidro com degradê aqua, ilustrativo.
- **Painel Saúde:** chamada curta (caixa, resumo, quatro destaques, preço, "Ver produto").
  A compra fica na página do produto e na vitrine da home.
- **Opções lado a lado:** em linhas, uma por produto, com caixa em miniatura e "Ver produto".
- **Testes complementares:** três cartões pequenos com "Ver produto", sem compra.

### Outras
- **Como funciona (home):** quatro passos com imagem: foto do kit, tela do app (ativação),
  foto do swab, tela do app (resultado).
- **Faixa de vídeo:** logo acima da frase, sem linha de preços. `focoMobile` desloca o
  enquadramento no celular (na home, 24%, para o cão aparecer).
- **Ninhada Testada (home):** painel escuro com dois vídeos em formato de stories.
- **Certificado (Programa Criador):** modelo desenhado em HTML, com campos entre colchetes.
- **Formulário "Quero participar":** monta a mensagem e abre o WhatsApp.
- **Combinações de cruzamento e cores (Aprenda):** botões por par, com barra de proporções;
  cada combinação de cor tem uma amostra aproximada.
- **Tabelas:** viram cartões no celular.

### Textos que mudaram em relação ao protótipo
- Hero: "Comprar o teste — R$ 619" virou "Adquira o teste"; "Entre em contato" saiu.
- Bloco final da home: "Ninhadas mais saudáveis começam antes do acasalamento." (texto
  nosso, para não repetir a frase do vídeo: **validar com o cliente**).
- Atendimento "das 9h às 18h" (página Testes).
- Saíram com a página Preços: "Economia de R$ 90 por kit (14,5%)", "Economia de R$ 130 por
  kit (21%)" e a lista de itens do plano de 1 a 3 kits. O conteúdo continua em `planos`,
  em `src/content/site.ts`.
- Rótulos de apoio novos: "Por que testar", "Passo a passo", "Nossa indicação", "Produto
  principal", "Outros testes recomendados".

Regras fixas: textos em PT-BR e sem travessão.

## 5. Mídia

| Arquivo | Origem | Onde aparece |
|---|---|---|
| `hero-campo.mp4` (+ `-mobile`, `.jpg`) | Storyblocks. Segunda metade do vídeo, 5,5s; o último segundo se funde ao primeiro, para o loop não ter corte | Fundo do hero |
| `faixa-canil.mp4` (+ `-mobile`, `.jpg`) | Envato (criadora com cão no canil, 7s) | Faixa de vídeo da home |
| `faixa-brincando.mp4` (+ `-mobile`, `.jpg`) | Storyblocks (cães no gramado, 7s) | Faixa de vídeo do Programa Criador |
| `story-brincando.mp4`, `story-canil.mp4` (+ `.jpg`) | Recortes verticais dos dois vídeos acima | Stories da Ninhada Testada |
| `hero-coleta.mp4` (+ `-mobile`, `.jpg`) | Vídeo do cliente | Box do hero e coleta (Testes). **Provisório**: mostra o kit "box4dog" |
| `porque-ninhada.jpg`, `porque-reprodutor.jpg`, `porque-filhote.jpg`, `porque-canil.jpg` | Geradas por IA (Higgsfield) | Cards "Por que testar" |
| `app-ativacao.jpg`, `app-laudo.jpg` | Capturas do app enviadas pelo cliente, com 207px de largura | Passos 2 e 4 de "Como funciona". **Pedir versões maiores** |
| `kit.jpg`, `coleta.jpg` | Fotos do Box4Vets | Passos 1 e 3 de "Como funciona". **Provisórias** |
| `inovacao-*.jpg`, `abordagem-*.jpg` | Fotos do Box4Vets | Sobras da base. Conferir se alguma ainda aparece e remover as demais |

Vídeo em ida e volta foi descartado no hero: o cão andaria de ré.

O protótipo ainda pede estas imagens, que continuam sem material próprio:

| Onde | O que o protótipo pede |
|---|---|
| Ninhada Testada (home) | Família recebendo o filhote e o certificado impresso com QR code |
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
- [ ] Validade dos kits: "[X] meses" (FAQ).
- [ ] Resposta sobre aceitação pela **CBKC e ALKC** (FAQ), hoje com o texto "[Confirmar…]".

Do projeto:
- [ ] Validar com o cliente a frase do bloco final da home.
- [ ] Capturas do app em resolução maior.
- [ ] Trocar as fotos e os vídeos provisórios (seção 5).
- [ ] Carrinho: decidir se haverá pagamento no site no futuro; hoje fecha no WhatsApp.
- [ ] Repositório público: os vídeos de banco de imagem ficam visíveis. Conferir licenças.
- [ ] Definir o domínio final e a relação com o site Box4Vets.
- [ ] Testar em aparelho real (pilha de cards, carrinho, vídeos).

## 8. Histórico

**26/11/2026**
- Projeto criado a partir da base do Box4Vets, com o conteúdo das seis páginas do protótipo.
- Publicado no GitHub e no GitHub Pages.
- "Escolha o seu teste" virou vitrine de loja e cada teste ganhou página de produto.
- Produtos com embalagem 3D em CSS; três vídeos novos (hero, faixas e stories).
- Hero: vídeo toca sozinho em loop com fusão entre fim e começo (ida e volta foi descartado: o cão andaria de ré).
- Linha de pagamento virou destaque de loja (`Pagamento` em `ui/Button.tsx`), com ícones de WhatsApp e cartão.
- Página Testes em formato de loja: comparador com as caixas, e Painel Saúde e complementares como blocos de produto com compra.
- Página de produto só com a caixa 3D (sem fotos adicionais); preços sempre com a unidade (/kit ou /teste).
- Loja: contador com número que rola e botão de compra animado (cor que sobe, seta que troca, confirmação ao clicar), no padrão do Aquamundo; "Recomendado" vira selo com estrela no topo do card, com contorno e brilho.
- Testes: "As opções lado a lado" voltou a ser em linhas (os cards repetiam os blocos de produto), agora com a caixa em miniatura, preço e "Ver produto"; o laudo ilustrativo virou um cartão de vidro com degradê aqua, sem moldura escura.
- Página Preços removida (ficou redundante): os preços e as faixas de desconto estão nos produtos, em Testes. O aviso sobre comprar vários kits e a chamada "Plantel grande ou projeto de saúde para a sua raça?" foram para a página Testes. Deixaram de aparecer as linhas "Economia de R$ 90 por kit (14,5%)" e "Economia de R$ 130 por kit (21%)" e a lista de seis itens do plano de 1 a 3 kits; o conteúdo continua em `planos`, em `src/content/site.ts`.
- Testes: "Como é o laudo" passou a vir antes do bloco do Painel Saúde.
- Menu ganhou "Início"; rodapé com ícones de WhatsApp, e-mail e Instagram no lugar das palavras.
- Hero: botões "Adquira o teste" (rola até a vitrine, não abre o WhatsApp), "Conhecer os testes" e "Conhecer o Programa Criador"; linha de pagamento "Pague em até 6x".
- Testes: ordem final é como escolher, laudo, Painel Saúde, coleta, comparativo e complementares; os complementares viraram cartões menores com "Ver produto" (sem compra ali). Atendimento das 9h às 18h.
- Home: "Como funciona" com imagem em cada passo, como no protótipo.
- Vitrine: cards sem borda (superfície branca, sombra suave, cantos de 28px, imagem de ponta a ponta); entrada com desfoque e escala e elevação com mola ao passar o mouse; "Recomendado" virou pílula dentro da imagem.
- Card recomendado: continua em primeiro, um pouco maior no desktop (à frente dos outros) e com uma luz aqua e roxa girando em volta. Testado no meio da fileira e descartado, porque são quatro produtos.
- "Como funciona": as telas dos passos 2 e 4 são capturas reais do app.
- Testes, "Como escolher": cada resposta mostra a caixa do produto indicado flutuando ao lado do texto (`Caixa` com `solta`, sem fundo) e um link "Ver produto". O produto de cada resposta fica em `comoEscolher[].produto`.
- Testes: o bloco do Painel Saúde ficou curto (caixa, resumo, quatro destaques, preço e "Ver produto"). Quantidade, faixas de desconto e compra ficam só na página do produto e na vitrine da home.
- Hero: "Conhecer os testes" com fundo azul claro (variante `aqua` do `SplitButton`) e "Conhecer o Programa Criador" como botão de contorno branco.

**27/11/2026**
- Home, "Por que testar": os quatro cards viraram uma pilha (`CartaoPilha` em `Home.tsx`). Cada card é grande, com foto ao lado, gruda no topo (`position: sticky`) e encolhe um pouco quando o seguinte chega por cima; as cores vão do branco ao roxo escuro. Os textos não mudaram.
- Carrinho: "Comprar" virou "Adicionar ao carrinho"; o pedido fecha em uma única mensagem de WhatsApp.
- Rodapé no celular: compacto e centralizado, sem as colunas Produto e Criador (o mapa do site continua no desktop).
- Corrigidos: sufixo do título das páginas ("| Box4Pets Criador", estava "| Box4Vets") e sobra lateral na página de produto no celular.
- Carrinho no celular: com itens, um botão flutuante (ícone, quantidade e total) fica no canto inferior direito e abre a gaveta.
- Home: a faixa de vídeo ficou sem a linha de preços.
- Faixa de vídeo: logo acima da frase (nas duas faixas, home e Programa Criador); no celular o vídeo da home foi deslocado para o cão aparecer (`focoMobile="24%"` em `FaixaVideo`).
- Carrinho: deixou de ser uma gaveta de altura inteira. É uma janela com a altura do conteúdo (cresce com os itens e só rola por dentro ao encher a tela); no desktop abre do canto do ícone, no celular sobe de baixo. Entrada com mola, escala e desfoque, e as partes aparecem em sequência.
- Home: o bloco final repetia a frase do vídeo ("Teste seu plantel antes da próxima ninhada."). O título passou a ser "Ninhadas mais saudáveis começam antes do acasalamento." (texto novo, sugerido por nós: validar com o cliente).
- Carrinho no desktop: quando o menu some ao rolar para baixo, o botão flutuante aparece no topo, à direita.
- Manual revisto por inteiro (seções 1 a 7) para refletir o estado atual.
