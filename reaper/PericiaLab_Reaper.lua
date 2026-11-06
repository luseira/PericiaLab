-- Perícia Lab · Carômetro → Reaper
-- Renomeia e colore as pistas 1 a 16 do projeto aberto a partir do arquivo
-- exportado no site (Mixer › "Exportar para o Reaper").
-- Não mexe em entradas, roteamento, volume, plugins nem itens gravados.
-- Tudo fica num único passo de desfazer (Ctrl/Cmd+Z volta tudo).

local TITULO = "Perícia Lab"

local ok, caminho = reaper.GetUserFileNameForRead("", "Escolha o arquivo do Carômetro (Perícia Lab)", "txt")
if not ok or caminho == "" then return end

local f = io.open(caminho, "r")
if not f then
  reaper.ShowMessageBox("Não consegui abrir o arquivo:\n" .. caminho, TITULO, 0)
  return
end

local primeira = f:read("*l") or ""
if not primeira:find("PERICIALAB%-REAPER") then
  f:close()
  reaper.ShowMessageBox("Este arquivo não veio do Carômetro do Perícia Lab.\nNada foi alterado.", TITULO, 0)
  return
end

local linhas = {}
for linha in f:lines() do
  local num, nome, cor = linha:match("^(%d+)\t([^\t]*)\t?(#?%x*)")
  num = tonumber(num)
  if num and num >= 1 and num <= 64 then
    linhas[#linhas + 1] = { num = num, nome = nome, cor = cor }
  end
end
f:close()

if #linhas == 0 then
  reaper.ShowMessageBox("O arquivo não tem nenhuma pista. Nada foi alterado.", TITULO, 0)
  return
end

reaper.Undo_BeginBlock()
reaper.PreventUIRefresh(1)

local criadas = 0
for _, l in ipairs(linhas) do
  while reaper.CountTracks(0) < l.num do
    reaper.InsertTrackAtIndex(reaper.CountTracks(0), true)
    criadas = criadas + 1
  end
  local pista = reaper.GetTrack(0, l.num - 1)
  reaper.GetSetMediaTrackInfo_String(pista, "P_NAME", l.nome, true)
  if l.cor and #l.cor == 7 then
    local r = tonumber(l.cor:sub(2, 3), 16)
    local g = tonumber(l.cor:sub(4, 5), 16)
    local b = tonumber(l.cor:sub(6, 7), 16)
    reaper.SetTrackColor(pista, reaper.ColorToNative(r, g, b))
  else
    reaper.SetMediaTrackInfo_Value(pista, "I_CUSTOMCOLOR", 0)
  end
end

reaper.PreventUIRefresh(-1)
reaper.TrackList_AdjustWindows(false)
reaper.UpdateArrange()
reaper.Undo_EndBlock("Perícia Lab: nomes e cores das pistas", -1)

local msg = #linhas .. " pistas renomeadas."
if criadas > 0 then msg = msg .. "\n" .. criadas .. " pista(s) criada(s) porque o projeto tinha menos de " .. linhas[#linhas].num .. "." end
reaper.ShowMessageBox(msg, TITULO, 0)
