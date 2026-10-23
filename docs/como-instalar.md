# Perícia Lab · Carômetro

App para os assistentes de som escalarem, episódio a episódio, qual transmissor e qual cápsula cada pessoa usa. Receptor, input do Scorpio, canal, frequência, bloco e modulação vêm prontos da planilha **Perícia Lab · Banco de equipamento** (Drive, pasta Pericia Lab).

## Arquivos

- `index.html`: o app. Uma página só, sem dependências além das fontes do Google.
- `Codigo.gs`: o Apps Script que liga o app à planilha.

## 1. Ligar a planilha (uma vez)

1. Abra a planilha **Perícia Lab · Banco de equipamento**.
2. Extensões > Apps Script. Apague o conteúdo e cole o `Codigo.gs` inteiro. Salve.
3. No menu de funções, escolha `testar` e clique em Executar. Autorize o acesso (planilha e Drive; o Drive é para guardar as fotos).
4. Implantar > Nova implantação > tipo **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Copie o endereço que termina em `/exec`.

Se mudar o `Codigo.gs` depois: Implantar > Gerenciar implantações > lápis > Versão: Nova versão. O endereço continua o mesmo.

## 2. Publicar no GitHub Pages

1. Crie um repositório (pode ser privado no plano pago, ou público) e suba o `index.html`.
2. Settings > Pages > Branch `main`, pasta `/root`. Em um minuto a página fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
3. Abra a página, vá na aba **Técnico**, cole o endereço `/exec` e clique em **Salvar e conectar**.
4. Ainda na aba Técnico, copie o **link de convite** e mande para a equipe (WhatsApp, e-mail). Quem abrir esse link fica conectado.

O endereço do Apps Script não fica no código, então pode deixar o repositório público. Só não publique o link de convite: quem tiver esse link consegue editar a planilha.

Sem endereço configurado, a página abre em **modo demonstração**, com os dados de exemplo e alterações guardadas só no aparelho.

## Como funciona no set

- **Carômetro**: escolha o episódio e toque na pessoa. Escolha transmissor e cápsula; o resto aparece sozinho. Transmissor ou cápsula que já estão com outra pessoa ficam bloqueados.
- Cada episódio herda a escalação do anterior. Mudar algo no EP 3 vale do EP 3 em diante.
- **Eliminado ao final do EP**: a pessoa sai dos episódios seguintes (fica em cinza em "Fora do jogo") e o equipamento dela fica livre.
- Transmissor devolvido some das opções a partir do episódio seguinte. Se alguém ainda estava com ele, o card fica vermelho.
- **Input list**: fichas ou tabela, ordenadas por transmissor, canal do gravador, colinha ou nome. "Imprimir / salvar PDF" gera o documento do episódio (a tabela sai em paisagem).
- **Devolução**: o que separar ao final de cada episódio e quem precisa trocar de transmissor no seguinte.
- **Técnico**: importar o report do Wireless Designer. A página mostra o que mudou e só grava quando você confirma. Cada frequência alterada volta a "não ajustado" até alguém tocar em **Já ajustei** no card.

Sem internet, a página mostra os últimos dados que carregou e guarda as alterações para enviar quando a conexão voltar.
