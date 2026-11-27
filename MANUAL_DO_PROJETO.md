# Manual do projeto Box4Pets Criador

Site da Box4Pets para criadores de cães e gatos: cinco páginas e quatro páginas de produto, com a mesma estrutura,
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
- **Escolha o seu teste:** vitrine em formato de loja. Cada teste é um produto com caixa, preço,
  seletor de quantidade e botão "Adicionar", que põe o produto no carrinho.
- **Carrinho** (`src/lib/carrinho.tsx` e `src/components/sections/Carrinho.tsx`): ícone com
  contador no menu; abre uma gaveta lateral com itens, quantidades, quanto falta para a
  próxima faixa de desconto do Painel Saúde, desconto aplicado e total. "Finalizar pelo
  WhatsApp" abre a conversa com o pedido inteiro escrito. Fica salvo no navegador
  (`localStorage`). Não há pagamento no site. Testes avulsos não entram: continuam "Consultar".
  No Painel Saúde o preço por kit cai sozinho conforme a quantidade (acima de 3 e de 10).
  Testes avulsos são sob consulta, sem quantidade.
- **Página de produto** (`src/components/sections/Loja.tsx`): galeria com miniaturas, preço,
  faixas de desconto, quantidade, comprar, selos, três abas (Descrição, Como funciona,
  Informações) e "Recomendados" com os outros produtos. "Saiba mais" e o rodapé levam a ela.
- **Ninhada Testada (home):** painel escuro com os dois vídeos em stories.
- **Como funciona:** quatro passos, cada um com imagem (foto do kit, tela do app no cadastro, foto do swab, tela do laudo). As duas telas são capturas reais do app enviadas pelo cliente (`app-ativacao.jpg` e `app-laudo.jpg`, originais com só 207px de largura: pedir versões maiores); as duas fotos vieram do Box4Vets e são provisórias.
- **Como escolher (Testes):** quatro perguntas em abas, com a indicação ao lado.
- **Como é o laudo:** três status e um celular ilustrativo com a lista de condições.
- **Certificado (Programa Criador):** modelo desenhado em HTML, com os campos entre colchetes.
- **Combinações de cruzamento (Aprenda):** a tabela virou seis botões; cada par mostra uma
  barra dividida em normais, portadores e afetados.
- **Cores esperadas (Aprenda):** cada combinação tem uma amostra de cor aproximada.
- **Tabelas:** viram cartões no celular.
- **Formulário "Quero participar":** monta a mensagem e abre o WhatsApp.

Pequenas mudanças de texto: o botão do hero "Comprar o teste — R$ 619" virou "Adquira o
teste" (pedido do cliente), e "Entre em contato" saiu do hero, que agora tem "Ver o que o
painel avalia" e "Conhecer o Programa Criador"; rótulos novos de apoio: "Por que testar", "Passo a passo", "Nossa
indicação" e a chamada final das páginas Testes e Aprenda.

## 5. Mídia

| Arquivo | Origem | Onde aparece |
|---|---|---|
| `hero-campo.mp4` (+ `-mobile`, `.jpg`) | Storyblocks (cães no campo; segunda metade do vídeo, 5,5s, em que o cão chega perto da câmera; o último segundo se funde ao primeiro, para o loop não ter corte) | Fundo do hero, tocando sozinho em loop (no Box4Vets ele é controlado pela rolagem) |
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
- [ ] Trocar todas as fotos e vídeos provisórios.
- [ ] Definir o domínio final e a relação com o site Box4Vets.
- [ ] Testar em aparelho real.

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
