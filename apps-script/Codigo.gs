/**
 * Perícia Lab · Carômetro
 * Ponte entre o app (página no GitHub) e a planilha "Perícia Lab · Banco de equipamento".
 *
 * Instalação (uma vez):
 * 1. Na planilha, Extensões > Apps Script. Apague o que houver e cole este arquivo inteiro.
 * 2. Salve. Rode a função "testar" uma vez e autorize o acesso (planilha e Drive).
 * 3. Implantar > Nova implantação > tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 * 4. Copie o endereço que termina em /exec e cole na aba Técnico do app.
 * Ao mudar este código depois: Implantar > Gerenciar implantações > editar > Nova versão.
 */

const ABAS = {
  tx: 'Transmissores',
  rx: 'Receptores',
  cap: 'Cápsulas',
  elenco: 'Elenco',
  esc: 'Escalação',
  eps: 'Episódios',
  imp: 'Importações'
};
const PASTA_FOTOS = 'Perícia Lab · Fotos';
const ABA_CENAS = 'Cenas';
const VERSAO_SCRIPT = '1.40';

/* ───────── entrada ───────── */

/* Senha: defina a propriedade SENHA em Configurações do projeto › Propriedades do script.
   Sem a propriedade, a planilha responde a qualquer pessoa que tenha o endereço /exec. */
function senhaOk_(k) {
  const s = PropertiesService.getScriptProperties().getProperty('SENHA');
  return !s || String(k || '') === s;
}
function negado_() {
  return json_({ ok: false, senha: true, erro: 'Senha necessária' });
}

function doGet(e) {
  if (!senhaOk_(e && e.parameter && e.parameter.k)) return negado_();
  try {
    return json_({ ok: true, dados: lerTudo_() });
  } catch (err) {
    return json_({ ok: false, erro: String(err && err.message || err) });
  }
}

function doPost(e) {
  let q0;
  try { q0 = JSON.parse(e.postData.contents); } catch (err) { q0 = {}; }
  if (!senhaOk_(q0.k)) return negado_();
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const q = q0;
    const fn = acoes_()[q.acao];
    if (!fn) throw new Error('Ação desconhecida: ' + q.acao);
    const r = fn(q) || {};
    SpreadsheetApp.flush();
    r.ok = true;
    r.dados = lerTudo_();
    return json_(r);
  } catch (err) {
    return json_({ ok: false, erro: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function acoes_() {
  return { escalar: escalar_, eliminar: eliminar_, ajustado: ajustado_, importar: importar_, foto: foto_, pessoa: pessoa_, cena: cena_, lote: lote_, fotoEquip: fotoEquip_ };
}

// várias alterações numa chamada só (recuperar configuração, zerar tudo)
function lote_(q) {
  const A = acoes_();
  (q.ops || []).forEach(function (op) {
    if (op.acao === 'lote') return;
    const fn = A[op.acao];
    if (!fn) throw new Error('Ação desconhecida: ' + op.acao);
    op.por = op.por || q.por;
    fn(op);
  });
  return {};
}

function testar() {
  const d = lerTudo_();
  Logger.log('Transmissores: %s, elenco: %s, linhas de escalação: %s', d.tx.length, d.elenco.length, d.esc.length);
  pastaFotos_();
}

/* ───────── leitura ───────── */

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function ss_() { return SpreadsheetApp.getActive(); }
function tz_() { return ss_().getSpreadsheetTimeZone(); }
function aba_(nome) {
  const s = ss_().getSheetByName(nome);
  if (!s) throw new Error('Aba não encontrada: ' + nome);
  return s;
}
function cabecalho_(s) {
  return s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0].map(String);
}
function col_(s, nome) {
  const i = cabecalho_(s).indexOf(nome);
  if (i < 0) throw new Error('Coluna "' + nome + '" não encontrada na aba ' + s.getName());
  return i + 1;
}
function tabela_(nome) {
  const s = aba_(nome);
  const v = s.getDataRange().getValues();
  const h = v[0].map(String);
  const out = [];
  for (let r = 1; r < v.length; r++) {
    const linha = v[r];
    if (!linha.some(function (c) { return c !== '' && c !== null; })) continue;
    const o = { _linha: r + 1 };
    h.forEach(function (k, i) {
      if (!k) return;
      let c = linha[i];
      if (c instanceof Date) c = Utilities.formatDate(c, tz_(), 'dd/MM/yyyy HH:mm');
      o[k] = c;
    });
    out.push(o);
  }
  return out;
}
function lerTudo_() {
  const o = { lidoEm: Utilities.formatDate(new Date(), tz_(), 'dd/MM/yyyy HH:mm:ss'), planilha: ss_().getUrl() };
  Object.keys(ABAS).forEach(function (k) { o[k] = tabela_(ABAS[k]); });
  o.imp = o.imp.slice(-15);
  o.cenas = ss_().getSheetByName(ABA_CENAS) ? tabela_(ABA_CENAS) : [];
  o.script = VERSAO_SCRIPT;
  return o;
}
function agora_() {
  return "'" + Utilities.formatDate(new Date(), tz_(), 'dd/MM/yyyy HH:mm');
}
function linhaPor_(s, nomeCol, valor) {
  const c = col_(s, nomeCol), n = s.getLastRow();
  if (n < 2) return 0;
  const v = s.getRange(2, c, n - 1, 1).getValues();
  for (let i = v.length - 1; i >= 0; i--) if (String(v[i][0]) === String(valor)) return i + 2;
  return 0;
}
function valorTx_(v) {
  v = String(v == null ? '' : v).trim();
  return /^\d+$/.test(v) ? Number(v) : v;
}

/* ───────── escalação ───────── */

// Escalação efetiva de cada pessoa num episódio: a linha mais recente com EP <= ep.
function efetivo_(esc, ep) {
  const m = {};
  esc.forEach(function (r, i) {
    const e = Number(r['EP']);
    if (!(e <= ep)) return;
    const id = String(r['ID']), cur = m[id];
    if (!cur || e > cur.ep || (e === cur.ep && i > cur.i)) m[id] = { ep: e, i: i, tx: String(r['TX']), cap: String(r['Cápsula']), time: String(r['Time'] || '') };
  });
  return m;
}
function ativo_(p, ep) {
  const k = parseInt(p['Eliminado após EP'], 10);
  return !(k && ep > k);
}

function escalar_(q) {
  const ep = Number(q.ep), id = String(q.id);
  if (!ep || !id) throw new Error('Faltou episódio ou pessoa.');
  const elenco = tabela_(ABAS.elenco), esc = tabela_(ABAS.esc);
  const nomes = {};
  elenco.forEach(function (p) { nomes[String(p['ID'])] = p; });
  if (!nomes[id]) throw new Error('Pessoa não está no elenco: ' + id);

  // Conferência no servidor: o mesmo transmissor ou cápsula não pode estar com outra pessoa ativa neste EP.
  const ef = efetivo_(esc, ep);
  Object.keys(ef).forEach(function (outro) {
    if (outro === id || !nomes[outro] || !ativo_(nomes[outro], ep)) return;
    if (q.tx !== undefined && String(q.tx) && ef[outro].tx === String(q.tx))
      throw new Error('O TX ' + q.tx + ' já está com ' + nomes[outro]['Nome'] + ' no EP ' + ep + '.');
    if (q.cap !== undefined && String(q.cap) && ef[outro].cap === String(q.cap))
      throw new Error('A cápsula ' + q.cap + ' já está com ' + nomes[outro]['Nome'] + ' no EP ' + ep + '.');
  });

  const s = aba_(ABAS.esc);
  let linha = 0;
  for (let i = esc.length - 1; i >= 0; i--) {
    if (Number(esc[i]['EP']) === ep && String(esc[i]['ID']) === id) { linha = esc[i]._linha; break; }
  }
  const anterior = ef[id] || { tx: '', cap: '', time: '' };
  const atual = linha ? esc.filter(function (r) { return r._linha === linha; })[0] : null;
  const base = atual ? { tx: atual['TX'], cap: atual['Cápsula'], time: atual['Time'], obs: atual['Observações'] }
                     : { tx: anterior.tx, cap: anterior.cap, time: anterior.time || '', obs: '' };
  const novo = {
    tx: q.tx !== undefined ? q.tx : base.tx,
    cap: q.cap !== undefined ? q.cap : base.cap,
    time: q.time !== undefined ? q.time : base.time,
    obs: q.obs !== undefined ? q.obs : base.obs
  };
  if (!linha) linha = s.getLastRow() + 1;
  s.getRange(linha, 1, 1, 9).setValues([[
    ep, id, nomes[id]['Nome'] || id, valorTx_(novo.tx), novo.cap || '', novo.time || '', novo.obs || '', '', q.por || 'app'
  ]]);
  s.getRange(linha, 8).setValue(agora_());
  return {};
}

function eliminar_(q) {
  const s = aba_(ABAS.elenco);
  const l = linhaPor_(s, 'ID', q.id);
  if (!l) throw new Error('Pessoa não encontrada: ' + q.id);
  s.getRange(l, col_(s, 'Eliminado após EP')).setValue(q.ep ? Number(q.ep) : '');
  return {};
}

function ajustado_(q) {
  const s = aba_(ABAS.tx);
  const l = linhaPor_(s, 'TX', valorTx_(q.tx));
  if (!l) throw new Error('Transmissor não encontrado: ' + q.tx);
  s.getRange(l, col_(s, 'Aparelho ajustado')).setValue(!!q.valor);
  return {};
}

/* ───────── report do Wireless Designer ───────── */

// q.itens = [{tx, freq}], q.gerado = data do report, q.naoCasados = [nomes]
function importar_(q) {
  const s = aba_(ABAS.tx);
  const cF = col_(s, 'Freq. (MHz)'), cA = col_(s, 'Aparelho ajustado'), cR = col_(s, 'Report de origem'), cC = col_(s, 'Código');
  const mudancas = [];
  (q.itens || []).forEach(function (it) {
    const l = linhaPor_(s, 'TX', valorTx_(it.tx));
    if (!l) return;
    const antes = Number(s.getRange(l, cF).getValue());
    const depois = Number(it.freq);
    if (!(Math.abs(antes - depois) < 0.0005)) {
      s.getRange(l, cF).setValue(depois);
      s.getRange(l, cA).setValue(false);
      mudancas.push('TX ' + it.tx + ': ' + (antes ? antes.toFixed(3) : '—') + ' → ' + depois.toFixed(3));
    }
    s.getRange(l, cR).setValue("'" + (q.gerado || ''));
    if (it.cod !== undefined && cC) s.getRange(l, cC).setValue("'" + it.cod);
  });
  aba_(ABAS.imp).appendRow([
    "'" + (q.gerado || ''), agora_(), q.por || 'app', (q.itens || []).length,
    mudancas.length ? mudancas.join('; ') : 'Nenhuma frequência mudou',
    (q.naoCasados || []).join(', ')
  ]);
  return { mudancas: mudancas };
}

/* ───────── elenco e fotos ───────── */

function pessoa_(q) {
  const s = aba_(ABAS.elenco);
  let id = String(q.id || '').trim().toUpperCase();
  if (!id) {
    const ids = tabela_(ABAS.elenco).map(function (p) { return String(p['ID']); });
    let n = 1;
    while (ids.indexOf('C' + ('0' + n).slice(-2)) >= 0) n++;
    id = 'C' + ('0' + n).slice(-2);
  }
  let l = linhaPor_(s, 'ID', id);
  if (!l) { l = s.getLastRow() + 1; s.getRange(l, col_(s, 'ID')).setValue(id); }
  if (q.nome !== undefined) s.getRange(l, col_(s, 'Nome')).setValue(q.nome);
  if (q.papel !== undefined) s.getRange(l, col_(s, 'Papel')).setValue(q.papel);
  if (q.colinha !== undefined) s.getRange(l, col_(s, 'Colinha (pista)')).setValue(q.colinha === '' ? '' : Number(q.colinha));
  if (q.pista !== undefined) s.getRange(l, col_(s, 'Nome de pista')).setValue(q.pista);
  return { id: id };
}

function pastaFotos_() {
  const arq = DriveApp.getFileById(ss_().getId());
  const pai = arq.getParents().hasNext() ? arq.getParents().next() : DriveApp.getRootFolder();
  const it = pai.getFoldersByName(PASTA_FOTOS);
  return it.hasNext() ? it.next() : pai.createFolder(PASTA_FOTOS);
}

function foto_(q) {
  const s = aba_(ABAS.elenco);
  const l = linhaPor_(s, 'ID', q.id);
  if (!l) throw new Error('Pessoa não encontrada: ' + q.id);
  const pasta = pastaFotos_();
  const nome = String(q.id) + '.jpg';
  const velhos = pasta.getFilesByName(nome);
  while (velhos.hasNext()) velhos.next().setTrashed(true);
  const blob = Utilities.newBlob(Utilities.base64Decode(q.base64), q.mime || 'image/jpeg', nome);
  const f = pasta.createFile(blob);
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const url = 'https://lh3.googleusercontent.com/d/' + f.getId();
  s.getRange(l, col_(s, 'Foto')).setValue(url);
  return { url: url };
}

// foto de transmissor ou cápsula: q = {aba: 'tx'|'cap', id, base64, mime}
function fotoEquip_(q) {
  const aba = q.aba === 'cap' ? ABAS.cap : ABAS.tx, chave = q.aba === 'cap' ? 'Cápsula' : 'TX';
  const s = aba_(aba);
  const l = linhaPor_(s, chave, q.aba === 'cap' ? String(q.id) : valorTx_(q.id));
  if (!l) throw new Error('Não encontrei ' + chave + ' ' + q.id);
  let c = cabecalho_(s).indexOf('Foto') + 1;
  if (!c) { c = s.getLastColumn() + 1; s.getRange(1, c).setValue('Foto').setFontWeight('bold'); }
  const pasta = pastaFotos_();
  const nome = (q.aba === 'cap' ? 'cap-' : 'tx-') + String(q.id).replace(/[^\w.-]+/g, '_') + '.jpg';
  const velhos = pasta.getFilesByName(nome);
  while (velhos.hasNext()) velhos.next().setTrashed(true);
  const f = pasta.createFile(Utilities.newBlob(Utilities.base64Decode(q.base64), q.mime || 'image/jpeg', nome));
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const url = 'https://lh3.googleusercontent.com/d/' + f.getId();
  s.getRange(l, c).setValue(url);
  return { url: url };
}

/* ───────── cenas do mixer ───────── */

// q = {id, nome, ordem, pistas (JSON com 32 posições), apagar}
function cena_(q) {
  let s = ss_().getSheetByName(ABA_CENAS);
  if (!s) {
    s = ss_().insertSheet(ABA_CENAS);
    s.getRange(1, 1, 1, 6).setValues([['ID', 'Nome', 'Ordem', 'Pistas', 'Atualizado em', 'Por']]).setFontWeight('bold');
    s.setFrozenRows(1);
  }
  const l = linhaPor_(s, 'ID', q.id);
  if (q.apagar) { if (l) s.deleteRow(l); return {}; }
  const linha = l || s.getLastRow() + 1;
  s.getRange(linha, 1, 1, 6).setValues([[q.id, q.nome || q.id, q.ordem || 'alfa', String(q.pistas || '[]'), agora_(), q.por || 'app']]);
  return {};
}
