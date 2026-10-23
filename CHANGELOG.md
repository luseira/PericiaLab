# Changelog

## v1.12 · 2026-10-23
- Cápsula × transmissor: a escolha respeita o conector (TA5F nos Lectrosonics, Lemo 3 no A10 e no SSM). DPA MicroDot/MicroLock entram com adaptador, contando quantos estão livres no episódio (5 para TA5F, 2 para Lemo). Sanken COS-11 sem D não vai em transmissor digital (DBSMD, A10).
- Avisos: cápsula incompatível, falta de adaptador, cápsula em manutenção. Card e input list mostram "+AD TA5F/Lemo 3" quando a cápsula usa adaptador.

## v1.6 · 2026-10-23
- Código calculado pelo app: Lectrosonics em hex com ¼ ½ ¾ (e o bloco nos wideband), Sony UTX pelo canal de TV + passos de 125 kHz.
- Aviso de frequência fora da grade do aparelho (passo do modelo) ou fora da faixa: no card e na prévia da importação do report.
- Transmissores de monitoração (Sony) cadastrados com Uso = monitoração: não aparecem para personagens; ficam numa seção própria no fim da input list.
- Input list traz também as saídas do Scorpio e os buses da cena atual.
- Apps Script: a importação grava o código calculado na coluna Código.

## v1.5 · 2026-10-23
- Card do Carômetro com nome do transmissor, bloco, frequência, código, receptor com canal e fundo na cor do time.

## v1.4 · 2026-10-23
- Tela do canal, Routing, Buses e Outputs redesenhados no estilo do SD-Remote (duas colunas, chaves, grade de fontes, abas embaixo; matriz com as mesmas cores: laranja pós, verde pré, azul send).
- Barra do mixer embaixo, como no SD-Remote: 1–8, 9–16, 17–24, 25–32, 1–16, 17–32, CL-12, Tudo, Buses, Outputs, Routing, Scorpio.
- ISO das pistas é sempre pré: a opção de ISO pós saiu do app, e o settings exportado grava pré em todas as pistas.
- Retorno "Bl" no bus confirmado como Return B1 (print do SD-Remote).

## v1.2 · 2026-10-23
- Mixer, aba Pistas: ON e ARM como no CL-12 e envios X1 · L · R · X2 (verde pré, amarelo pós) embaixo de cada fader; contagem de pistas armadas e ligadas; impressão marca ARM e envios.
- Painel da pista: ON, ARM, ISO pré/pós, roteamento para L, R e buses 1–10 (pós, pré ou send com ganho), trim, HPF, fase e delay (fase e delay só 1–16). Campos vazios = não mexer no gravador.
- Copiar canal como no Scorpio: escolhe o que copiar (fonte e nome, roteamento, ISO, ON, ARM, trim, HPF, fase, delay) e toca nas pistas de destino.
- Novas abas no mixer: Routing (matriz 32 × 12), Buses (nome e retorno), Saídas (L, R, X1–X10 com fonte única, nível, ganho e delay) e Scorpio.
- Scorpio: importa o settings (.json), compara com a cena, traz a configuração do gravador para a cena e exporta a cena como settings novo, mudando só os campos do plano. Arquivo testado byte a byte: sem mudanças, sai idêntico ao original.
- Plano inicial de buses e saídas tirado da aba LAYOUT (CTK 1/2, MIX, TELMA, SALADA, ASSIST 1/2; CTRL A/B, ISO B1–B5, CAM, ASSIST, CTK).

## v1.1 · 2026-10-23
- Carômetro: busca por nome, TX, modelo, canal ou cápsula; filtro por time; card mostra o modelo do transmissor e o canal do gravador.
- Times passam a ser **Vermelho** e **Azul** (valores antigos A/B continuam sendo lidos). O Azul vai para a Clara (17–21).
- Input list: uma coluna só de canal (AES 1, LINE 2…), sem o número do conector.
- Cápsulas: coluna "Polaridade invertida"; ícone Ø no card, editor, input list e mixer, com aviso "inverter no TX".
- Mixer: fita crepe com o nome sob cada fader, colorida por time; colinha 23–32 automática, em ordem de transmissor e sem buracos a cada episódio; pistas copiadas mostram TX e canal; painel da pista com foto, cápsula, transmissor, receptor, canal, frequência e outras pistas da pessoa; busca no mixer e destaque Ø; desfazer/refazer (Ctrl+Z / Ctrl+Shift+Z).
- Apps Script: coluna Nome da escalação deixa de dar #ERROR!; uma linha nova de episódio herda o time da anterior.

## v1.0 · 2026-10-23
- Carômetro, input list (fichas e tabela), devolução, técnico (import do Wireless Designer).
- Simulador de mesa: cenas, bancos do SD-Remote, bloco da Clara (17–22 → X1–X6 → 633), colinha.
