# Changelog






## v1.40 · 27/10/2026
- Sem barra de episódios: o app trabalha no episódio atual. Eliminar alguém (no lápis da pessoa) fecha o episódio e abre o próximo; o eliminado vai para o fim, em cinza com um X, e pode ser recuperado.
- Carômetro no celular: cada grupo vira um carrossel de cartas. Tocar numa pessoa mostra o resumo e o lápis "Editar"; a escolha é em dois passos com cartas (transmissor → cápsula → OK), com foto quando houver. Quem ainda não tem nada já abre direto na escolha.
- Fotos de transmissores e cápsulas (📷 na carta), guardadas na pasta de fotos; sem foto, aparece a de outro item do mesmo modelo ou um desenho.
- Nome da cápsula só com o modelo (COS11, COS11D, TL47…); a cor fica na caixa e a marca vermelha vira um pontinho vermelho.
- Configurações salvas: guardar a escalação inteira com um nome, recuperar depois e tirar todos os transmissores e cápsulas de uma vez. Antes de recuperar ou zerar, o estado atual fica em "Último estado".
- Informações e avisos no fim do Carômetro, com os transmissores livres.
- Input list nova: lista como padrão (pista, nome, source, mic, transmissor, receptor, freq., bloco), na ordem da cena "Todos juntos"; buses; outputs com nome, source, nível, transmissor e receptor; fichas impressas em paisagem; botão "Copiar para WhatsApp".
- Apps Script 1.40: ações "lote" e "fotoEquip" e número de versão (precisa de Nova versão).

## v1.33 · 25/10/2026
- Pistas só com fonte (ex.: Retorno B1) agora têm campo Name na tela do canal; Retorno B1 e B2 chamam-se Mix L-B e Mix R-B por padrão. O nome vale no app e na DAW (o export do Scorpio não grava nomes de canal).
- Cena base: mixdown B nos canais 17 e 18; a colinha (23–32) não vem armada, então não entra na DAW.

## v1.32 · 25/10/2026
- Ordem vertical do mixer: console, depois a tela do canal selecionado e, por último, a simulação da DAW.

## v1.31 · 25/10/2026
- Simulação da DAW: Mix L e Mix R (bus L/R do Scorpio) como as duas primeiras faixas; o retorno B vira Mix L-B e Mix R-B; sai o texto das pistas desarmadas e o aviso de mixdown; a caixa pode ser recolhida (fica lembrado neste aparelho).

## v1.30 · 25/10/2026
- Corrigido: o mixer não abria (tela em branco) quando havia uma pista só com fonte, como Retorno B, nos canais 1–16.

## v1.29 · 25/10/2026
- A simulação da DAW saiu do menu de baixo e ficou fixa embaixo do console do mixer: faixas como numa DAW (em ordem de canal, só as armadas), na cor de cada função, acompanhando a cena escolhida. Mixdown (Retorno B1/B2) entra como faixa laranja.
- Cena base nova: Retorno B1 e B2 em 21–22, armados, para o mixdown. Cenas já salvas não mudam: ponha o Source das pistas 21 e 22 em Retorno B1 e B2.
- Saiu o botão "Ø polaridade" e as marcas de polaridade do mixer (continuam no Carômetro e na Input list); no canal, a tela avisa que a cápsula é invertida.
- Faixas do mixer: "Fixos" virou "Principais"; a faixa "Goose e reserva" saiu (15–22 são "Livres").

## v1.28 · 25/10/2026
- O endereço da planilha agora vem embutido no app: aparelhos novos pedem só a senha. Um endereço antigo guardado no aparelho ainda tem prioridade (use Desconectar na aba Técnico para limpar).

## v1.27 · 25/10/2026
- Corrigido: com dados já guardados no aparelho, o aviso "Sem conexão" escondia o campo da senha. Agora o campo da senha aparece.

## v1.26 · 24/10/2026
- Senha da planilha: se a propriedade SENHA existir no Apps Script, o app pede a senha em cada aparelho (guardada só ali). Sem a propriedade, tudo segue aberto como antes.
- Aba Técnico: painel "Senha da planilha" (guardar / apagar deste aparelho). Se a senha estiver errada, as alterações pendentes ficam na fila até acertar.

## v1.25 · 24/10/2026
- Faixa "Time de trás · Clara" agora cobre os canais 9–14 (antes 17–22); goose e reserva em 15–16.
- Nova tela "Na DAW" no mixer (barra de baixo): as pistas armadas na ordem em que entram no arquivo (1, 2, 3…), com o canal de origem, e uma grade com os episódios nas colunas mostrando quem mudou de posição em relação ao episódio anterior. Pistas desarmadas somem do arquivo e as seguintes sobem.

## v1.24 · 24/10/2026
- Novo layout padrão do mixer: fixos 1–3, time da frente 4–8, time de trás 9–13 (o bloco da Clara), boom 14, gooseneck 15, livres 17–22 e colinha 23–32. Sem cópias.
- Posições novas "Time da frente" (o time com mais gente no episódio; empate: Time A) e "Time de trás". O app resolve por episódio, então o mesmo layout vale em todos.
- Saídas X1–X5 para o 633 passam a sair do ISO dos canais 9–13. A marca "X → 633" aparece nos canais que alimentam essas saídas, e o aviso da Clara confere isso.
- Cenas já salvas não são alteradas.

## v1.23 · 24/10/2026
- Pista com fonte sem pessoa (ex.: RTN B1) já nasce ligada e armada, como as outras.

## v1.22 · 23/10/2026
- Carômetro: os chips "problema(s)" e "aviso(s)" abrem a lista, pessoa por pessoa, com o texto de cada um; tocar na pessoa abre o editor.
- Card: some o "participante 23"; fica só host e mentor.
- Cápsulas: o nome perde a letra da cor (COS11 B bege vira COS11) e, na escolha, o card do botão fica na cor da lapela (bege, preta ou marrom).

## v1.21 · 23/10/2026
- Source do canal mostra todas as entradas do gravador: IN 1–16, AES 1/2/5/6, Retornos A1–C2, SL-6 A1–C2 e Dante 1–32 (recolhido). Embaixo de cada uma, quem está com o transmissor dela no episódio.
- Pista com fonte sem pessoa (ex.: RTN B1) aparece com o nome da entrada, em cinza tracejado.
- Códigos de settings dos Retornos e SL-6 como fonte de canal ainda não confirmados: o export mantém a fonte que já está no gravador.
- Ctrl+C / Ctrl+V nas pistas: copia as selecionadas (quem/fonte + ajustes) e cola a partir da pista clicada, em sequência, como células de planilha. Também por botões Copiar/Colar. Um Ctrl+Z desfaz a colagem inteira e dá para colar em outra cena.

## v1.20 · 2026-10-23
- Cenas em ordem definida: botões ◀ ▶ no mixer movem a cena atual (a ordem vai para a planilha, coluna Posição da aba Cenas).

## v1.19 · 2026-10-23
- Tela do canal: "Quem" (escolher pelo nome, por grupo: host e mentores, time A, time B, boom e gooseneck) e "Source" (escolher pela entrada: AES 1, LINE 2… LINE 13/14 da sala dos mentores, MIC). Pelo nome, a fonte vem do Carômetro; pela fonte, a pessoa vem do Carômetro.
- Cópia de canal é detectada pela entrada (mesma fonte), não pela pessoa.
- Indicador de avisos no topo do mixer (abre a lista de avisos).

## v1.18 · 2026-10-23
- Mixer: arrastar uma pista não troca mais o conteúdo de lugar (era o que fazia canais "desligarem" ao tentar mexer no fader). Clicar no canal só seleciona.

## v1.17 · 2026-10-23
- Copiar canal igual à tela "Copy Channel" do Scorpio: canal de origem, grade 1–32 de destinos (vários), "Settings to Copy" e botão Copy. Uma ação, um desfazer.
- Tela do canal: saiu o "Trocar" (no computador continua arrastando uma pista sobre a outra); "Esvaziar" virou "Limpar canal".
- Avisos do mixer recolhidos num item "Avisos (n)", com contador de importantes.

## v1.16 · 2026-10-23
- Mixer: Delete (ou "Esvaziar pistas") esvazia as pistas selecionadas, com desfazer.
- Nova cena com escolha do modelo: cópia completa de qualquer cena ou a estrutura base.
- "Colar de outra cena": copia pistas, canais e/ou buses e saídas de outra cena para a atual.
- ARM em destaque: LED vermelho aceso e o número do canal em vermelho nas pistas armadas.
- Canal com ON desligado fica esmaecido (v1.15).

## v1.14 · 2026-10-23
- Times passam a se chamar Time A e Time B (na planilha: A e B; valores antigos ainda são lidos).
- Mixer: cores de fundo por função configuráveis (host, mentores, time A, time B, boom, gooseneck), salvas no aparelho; os cards do Carômetro seguem as cores dos times.
- Mixer: barra de bancos e páginas colada embaixo do console.
- Mixer: histórico de mudanças (troca de pistas, ON/ARM, envios, ajustes, buses, saídas, desfazer/refazer, cenas), guardado no aparelho.
- Carômetro mostra só o primeiro nome (nome completo no editor e ao passar o mouse).
- Polaridade: Sanken e Shure invertidos, DPA normal (regra aplicada quando a coluna está vazia).
- Transmissores de monitoração ganham "Já ajustei" na input list.
- Planilha: blocos/bandas numa aba própria (Blocos); a aba de modelos virou "Modelos".

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
