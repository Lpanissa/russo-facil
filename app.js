/* Russo Fácil — app (JS puro, sem build) */
const CFG = window.RUSSO_CONFIG || {};
const $app = document.getElementById('app');
const KEY = 'russofacil.v1';
const today = () => new Date().toISOString().slice(0, 10);
const dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (arr, n, not) => shuffle(arr.filter(x => x !== not)).slice(0, n);

/* ---------- estado ---------- */
const blank = () => ({ started: false, xp: 0, streak: 0, lastDay: null, done: {}, perfect: 0, srs: {}, ach: {}, user: null });
let S = blank();
try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} cloudPush(); }
const level = () => Math.floor(S.xp / 150) + 1;

/* ---------- áudio ---------- */
let ruVoice = null;
function loadVoices() { const v = (window.speechSynthesis && speechSynthesis.getVoices()) || []; ruVoice = v.find(x => /^ru/i.test(x.lang)) || null; }
if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speak(t) {
  if (!window.speechSynthesis) return modal({ icon: '🔇', title: 'Sem áudio', text: 'Seu aparelho não tem áudio de voz.' });
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t.replace(/[«»]/g, '')); u.lang = 'ru-RU'; if (ruVoice) u.voice = ruVoice; u.rate = .85;
  speechSynthesis.speak(u);
}


/* ---------- desenhos (SVG) ---------- */
let svgId = 0;
function doll(o) {
  o = Object.assign({ body: '#e63946', scarf: '#2f5bff', size: 140, cls: '', open: false, mascot: false }, o);
  const id = 'd' + (++svgId);
  const draw = `
   <path d="M18 128 C2 92 18 52 50 46 C82 52 98 92 82 128 Z" fill="${o.body}"/>
   <ellipse cx="50" cy="98" rx="23" ry="27" fill="#fff4d6"/>
   <circle cx="50" cy="86" r="5" fill="#ffc83d"/><circle cx="43" cy="95" r="4" fill="#e63946"/><circle cx="57" cy="95" r="4" fill="#2f5bff"/><circle cx="50" cy="103" r="4" fill="#2fbf71"/>
   <path d="M20 120 Q50 132 80 120" stroke="#ffc83d" stroke-width="5" fill="none"/>
   <circle cx="50" cy="38" r="23" fill="#ffe0c2"/>
   <path d="M24 42 C22 8 78 8 76 42 C68 26 32 26 24 42Z" fill="${o.scarf}"/>
   <path d="M24 42 C24 55 30 62 34 62 L34 42Z M76 42 C76 55 70 62 66 62 L66 42Z" fill="${o.scarf}"/>
   <circle cx="50" cy="19" r="3" fill="#ffc83d"/><circle cx="36" cy="25" r="2.4" fill="#ffc83d"/><circle cx="64" cy="25" r="2.4" fill="#ffc83d"/>
   <g class="${o.mascot ? 'eye' : ''}"><circle cx="42" cy="40" r="2.6" fill="#222"/><circle cx="58" cy="40" r="2.6" fill="#222"/></g>
   <circle cx="37" cy="48" r="4" fill="#ff9aa2" opacity=".7"/><circle cx="63" cy="48" r="4" fill="#ff9aa2" opacity=".7"/>
   <path d="M44 51 Q50 57 56 51" stroke="#b5483f" stroke-width="2" fill="none" stroke-linecap="round"/>
   ${o.mascot ? `<g class="arm"><ellipse cx="86" cy="82" rx="7" ry="11" fill="#ffe0c2" transform="rotate(-20 86 82)"/></g>` : ''}`;
  return `<svg class="doll ${o.cls} ${o.open ? 'open' : ''} ${o.mascot ? 'mascot' : ''}" width="${o.size}" height="${o.size * 1.3}" viewBox="-6 0 112 134" aria-hidden="true">
   <defs><clipPath id="t${id}"><rect x="-10" y="-10" width="130" height="86"/></clipPath><clipPath id="b${id}"><rect x="-10" y="76" width="130" height="70"/></clipPath></defs>
   <g class="dbot"><g clip-path="url(#b${id})">${draw}</g></g><g class="dtop"><g clip-path="url(#t${id})">${draw}</g></g></svg>`;
}
const DOLLS = [
  { body: '#e63946', scarf: '#2f5bff', w: 'матрёшка', t: 'matriôshka', p: 'boneca russa', f: 'As matrioskas surgiram no fim do século XIX e cada boneca se encaixa dentro da maior.' },
  { body: '#2f5bff', scarf: '#e63946', w: 'бабушка', t: 'bábushka', p: 'avó', f: 'Em russo, «бабушка» é simplesmente a vovó, e o lenço na cabeça virou o símbolo dela.' },
  { body: '#2fbf71', scarf: '#ffc83d', w: 'чай', t: 'tchai', p: 'chá', f: 'Chá é quase uma instituição na Rússia, tradicionalmente servido com o samovar.' },
  { body: '#ff8a3d', scarf: '#7a3df0', w: 'борщ', t: 'borshtch', p: 'sopa de beterraba', f: 'O borsch é uma sopa de beterraba, comida típica da Rússia e da Ucrânia.' },
  { body: '#a45cf0', scarf: '#2fbf71', w: 'спасибо', t: 'spassíba', p: 'obrigado(a)', f: 'A palavra «спасибо» vem de uma expressão antiga que significa «Deus salve».' },
  { body: '#ffc83d', scarf: '#e63946', w: 'до свидания', t: 'da svidánia', p: 'até logo', f: 'Literalmente, «до свидания» quer dizer «até o reencontro».' }
];
const GREET = [['Привет!', 'Olá!'], ['Молодец!', 'Muito bem!'], ['Давай учиться!', 'Vamos estudar!'], ['Не сдавайся!', 'Não desista!'], ['Хорошо!', 'Ótimo!']];
function confetti() {
  const e = ['🎉', '⭐', '🪆', '❄️', '🔥', '💙', '❤️'];
  for (let i = 0; i < 28; i++) {
    const c = document.createElement('div'); c.className = 'confetti'; c.textContent = e[i % e.length];
    c.style.left = Math.random() * 100 + 'vw'; c.style.animationDuration = 2 + Math.random() * 2.5 + 's'; c.style.animationDelay = Math.random() * .8 + 's';
    document.body.appendChild(c); setTimeout(() => c.remove(), 5500);
  }
}

/* ---------- janelas (substituem alert/confirm) ---------- */
function modal(o) {
  return new Promise(res => {
    const b = document.createElement('div'); b.className = 'mback';
    b.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="micon">${o.icon || doll({ mascot: true, size: 64 })}</div><h3>${o.title}</h3><p class="mut">${o.text}</p><div class="mbtns">${o.cancel ? `<button class="btn ghost" data-r="0">${o.cancel}</button>` : ''}<button class="btn ${o.danger ? 'red' : ''}" data-r="1">${o.ok || 'Entendi'}</button></div></div>`;
    document.body.appendChild(b);
    const close = v => { b.classList.add('out'); setTimeout(() => { b.remove(); res(v); }, 180); };
    b.onclick = e => { if (e.target === b) close(false); };
    b.querySelectorAll('[data-r]').forEach(x => x.onclick = () => close(x.dataset.r === '1'));
  });
}

/* ---------- trilha ---------- */
function buildTrail() {
  const T = [];
  for (let i = 0; i < ALFABETO.length; i += 6) T.push({ id: 'alf' + i / 6, kind: 'alf', nome: 'Alfabeto ' + (i / 6 + 1), icone: 'Аа', items: ALFABETO.slice(i, i + 6) });
  let g = 0;
  VOCAB.forEach((t, i) => {
    [0, 6].forEach(o => T.push({ id: t.id + o, kind: 'voc', nome: t.nome + (o ? ' II' : ''), icone: t.icone, items: t.palavras.slice(o, o + 6), theme: t }));
    if ((i % 2 === 1 || i === VOCAB.length - 1) && g < GRAMATICA.length) { const G = GRAMATICA[g++]; T.push({ id: 'gra_' + G.id, kind: 'gra', nome: G.nome, icone: G.icone, g: G }); }
  });
  while (g < GRAMATICA.length) { const G = GRAMATICA[g++]; T.push({ id: 'gra_' + G.id, kind: 'gra', nome: G.nome, icone: G.icone, g: G }); }
  return T;
}
const TRAIL = buildTrail();
const unlocked = i => i === 0 || S.done[TRAIL[i - 1].id];

/* ---------- lições ---------- */
function mc(prompt, correct, wrongs, extra) { return Object.assign({ prompt, options: shuffle([correct, ...wrongs]), correct }, extra); }
function makeLesson(L) {
  const steps = [], Q = [];
  if (L.kind === 'alf') {
    L.items.forEach(a => steps.push({ type: 'card', big: a[0], title: a[1], sub: a[2], extra: a[3] + ' (' + a[4] + ') — ' + a[5], say: a[3] }));
    const all = ALFABETO;
    L.items.forEach(a => {
      Q.push(mc('Qual é o nome da letra ' + a[0].split(' ')[0] + '?', a[1], pick(all.map(x => x[1]), 3, a[1]).filter(x => x !== a[1]), { big: a[0], say: a[3] }));
      Q.push(mc('Ouça e escolha a letra', a[0], pick(all.map(x => x[0]), 3, a[0]), { audio: a[3], listen: true }));
    });
    L.items.slice(0, 3).forEach(a => Q.push(mc('O que significa «' + a[3] + '»?', a[5], pick(all.map(x => x[5]), 3, a[5]), { say: a[3] })));
  } else if (L.kind === 'voc') {
    const pool = VOCAB.flatMap(t => t.palavras);
    L.items.forEach(w => steps.push({ type: 'card', big: w[0], title: w[1], sub: w[2], say: w[0] }));
    L.items.forEach(w => {
      Q.push(mc('O que significa «' + w[0] + '»?', w[2], pick(pool.map(x => x[2]), 3, w[2]), { say: w[0], key: w[0] + '|' + w[2] }));
      Q.push(mc('Como se diz «' + w[2] + '» em russo?', w[0], pick(pool.map(x => x[0]), 3, w[0]), { key: w[0] + '|' + w[2] }));
    });
    L.items.slice(0, 3).forEach(w => Q.push(mc('Ouça e escolha o significado', w[2], pick(pool.map(x => x[2]), 3, w[2]), { audio: w[0], listen: true, key: w[0] + '|' + w[2] })));
  } else {
    steps.push({ type: 'text', title: L.g.nome, lines: L.g.texto });
    L.g.q.forEach(q => Q.push(mc(q[0], q[1], q[2])));
  }
  return { L, steps, Q: shuffle(Q).slice(0, 12) };
}
function reviewLesson() {
  const now = today(), due = Object.entries(S.srs).filter(([k, v]) => v.due <= now).map(([k]) => k);
  const pool = VOCAB.flatMap(t => t.palavras);
  const Q = shuffle(due).slice(0, 10).map(k => { const [r, p] = k.split('|'); return mc('O que significa «' + r + '»?', p, pick(pool.map(x => x[2]), 3, p), { say: r, key: k }); });
  return { L: { id: 'review', nome: 'Revisão', kind: 'rev' }, steps: [], Q };
}
function srsMark(key, ok) {
  if (!key) return;
  const r = S.srs[key] || { box: 0, due: today() };
  r.box = ok ? Math.min(r.box + 1, 5) : 0;
  const d = new Date(); d.setDate(d.getDate() + (ok ? 2 ** r.box : 0)); r.due = d.toISOString().slice(0, 10);
  S.srs[key] = r;
}

/* ---------- conquistas ---------- */
const ACH = [
  ['primeira', '🌱', 'Primeira lição', 'Complete 1 lição', () => Object.keys(S.done).length >= 1],
  ['dez', '📚', 'Estudioso', 'Complete 10 lições', () => Object.keys(S.done).length >= 10],
  ['alfa', '🔤', 'Alfabeto dominado', 'Termine as 6 lições do alfabeto', () => TRAIL.filter(l => l.kind === 'alf').every(l => S.done[l.id])],
  ['perfeita', '💎', 'Lição perfeita', 'Termine uma lição sem errar', () => S.perfect >= 1],
  ['xp100', '⚡', '100 XP', 'Ganhe 100 XP', () => S.xp >= 100],
  ['xp500', '🔥', '500 XP', 'Ganhe 500 XP', () => S.xp >= 500],
  ['s3', '📆', '3 dias seguidos', 'Estude 3 dias em sequência', () => S.streak >= 3],
  ['s7', '🏆', '7 dias seguidos', 'Estude 7 dias em sequência', () => S.streak >= 7]
];
function checkAch() { const n = []; ACH.forEach(a => { if (!S.ach[a[0]] && a[4]()) { S.ach[a[0]] = today(); n.push(a); } }); return n; }

/* ---------- nuvem (Supabase via REST, sem bibliotecas) ---------- */
const cloudOn = () => !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY);
let sess = null; try { sess = JSON.parse(localStorage.getItem(KEY + '.sess') || 'null'); } catch (e) {}
const H = tok => ({ apikey: CFG.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + (tok || CFG.SUPABASE_ANON_KEY), 'Content-Type': 'application/json' });
async function auth(kind, email, pass) {
  const url = CFG.SUPABASE_URL + (kind === 'signup' ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password');
  const r = await fetch(url, { method: 'POST', headers: H(), body: JSON.stringify({ email, password: pass }) });
  const j = await r.json();
  if (!r.ok) throw new Error(j.msg || j.error_description || j.message || 'Erro ao entrar');
  if (!j.access_token) throw new Error('Conta criada. Confirme o e-mail que enviamos e depois entre.');
  sess = { token: j.access_token, uid: j.user.id, email: j.user.email }; localStorage.setItem(KEY + '.sess', JSON.stringify(sess));
  await cloudPull();
}
async function cloudPull() {
  if (!sess) return;
  try {
    const r = await fetch(CFG.SUPABASE_URL + '/rest/v1/progress?user_id=eq.' + sess.uid + '&select=data', { headers: H(sess.token) });
    const j = await r.json();
    if (Array.isArray(j) && j[0] && j[0].data) {
      const R = j[0].data; const keep = R.xp > S.xp ? R : S;
      S = Object.assign(blank(), keep, { done: Object.assign({}, R.done, S.done), ach: Object.assign({}, R.ach, S.ach), srs: Object.assign({}, R.srs, S.srs), started: true });
      localStorage.setItem(KEY, JSON.stringify(S));
    }
    await cloudPush(true);
  } catch (e) {}
}
let pushT = null;
function cloudPush(now) {
  if (!sess || !cloudOn()) return;
  clearTimeout(pushT);
  pushT = setTimeout(() => fetch(CFG.SUPABASE_URL + '/rest/v1/progress', {
    method: 'POST', headers: Object.assign(H(sess.token), { Prefer: 'resolution=merge-duplicates' }),
    body: JSON.stringify({ user_id: sess.uid, data: S, updated_at: new Date().toISOString() })
  }).catch(() => {}), now ? 0 : 1200);
}
function logout() { sess = null; localStorage.removeItem(KEY + '.sess'); }

/* ---------- telas ---------- */
let view = S.started ? 'home' : 'landing', run = null;
const $ = s => document.querySelector(s);
function go(v) { view = v; render(); window.scrollTo(0, 0); }
function topbar() { return `<div class="top"><span class="pill">🔥 ${S.streak}</span><span class="pill">⭐ ${S.xp} XP · Nv ${level()}</span></div>`; }
function nav() {
  const t = [['home', '🗺️', 'Trilha'], ['review', '🔁', 'Revisar'], ['letters', '🔤', 'Alfabeto'], ['dolls', '🪆', 'Bonecas'], ['ach', '🏆', 'Troféus'], ['cfg', '⚙️', 'Ajustes']];
  return `<div class="nav">${t.map(x => `<button class="${view === x[0] ? 'on' : ''}" data-go="${x[0]}"><b>${x[1]}</b>${x[2]}</button>`).join('')}</div>`;
}
function render() {
  if (view === 'landing') return landing();
  if (view === 'lesson') return lessonView();
  const fn = { home, review: reviewView, letters, dolls: dollsView, ach: achView, cfg, auth: authView }[view] || home;
  $app.innerHTML = topbar() + '<div class="wrap">' + fn() + '</div>' + nav();
  bind();
}
function bind() {
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { if (b.dataset.go === 'review') startReview(); else go(b.dataset.go); });
  document.querySelectorAll('[data-say]').forEach(b => b.onclick = () => speak(b.dataset.say));
  document.querySelectorAll('[data-lesson]').forEach(b => b.onclick = () => startLesson(+b.dataset.lesson));
}

function landing() {
  const price = (n, nome, preco, lista, link, best) => `<div class="card plan ${best ? 'best' : ''}">${best ? '<span class="tag">MAIS ESCOLHIDO</span>' : ''}<h3>${nome}</h3><div class="price">R$ ${preco}</div><div class="mut small">pagamento único · acesso vitalício</div><ul class="ck">${lista.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn ${best ? 'red' : ''}" href="${link}">Quero o ${nome}</a></div>`;
  $app.innerHTML = `<div class="wrap">
  <div class="hero">${doll({mascot:true,size:130,body:"#e63946",scarf:"#2f5bff"})}<div class="ru">Русский</div><h1>Aprenda russo do zero de uma forma divertida e viciante</h1>
  <p class="mut">Alfabeto, vocabulário e gramática em lições curtas de 3 a 5 minutos. Funciona no celular, sem precisar baixar nada.</p>
  <button class="btn red" id="go">Começar grátis agora</button><p class="small mut">Você pode testar a trilha antes de comprar.</p></div>
  <div class="grid2">
   <div class="feat"><b>🔤</b><h3>Alfabeto</h3><span class="mut small">As 33 letras com áudio e treino de leitura.</span></div>
   <div class="feat"><b>💬</b><h3>Vocabulário</h3><span class="mut small">168 palavras e frases em 14 temas.</span></div>
   <div class="feat"><b>🧩</b><h3>Gramática</h3><span class="mut small">8 lições curtas e diretas, sem enrolação.</span></div>
   <div class="feat"><b>🔥</b><h3>Gamificação</h3><span class="mut small">XP, níveis, sequência diária e conquistas.</span></div>
   <div class="feat"><b>🔁</b><h3>Revisão inteligente</h3><span class="mut small">Os erros voltam na hora certa para fixar.</span></div>
   <div class="feat"><b>📱</b><h3>Em qualquer aparelho</h3><span class="mut small">iPhone, Android e computador. Progresso salvo.</span></div></div>
  <h2 style="margin-top:28px">Planos</h2>
  ${price(0, 'Básico', '9,90', ['Alfabeto completo', 'Vocabulário e frases', 'Gramática básica', 'XP, níveis e conquistas'], CFG.LINK_BASICO || '#')}
  ${price(1, 'Premium', '19,90', ['Tudo do Básico', 'Bônus: biblioteca de animes', 'Bônus: receitas russas', 'Bônus: filosofia dos animes', 'Bônus: salas para assistir com amigos', 'Bônus: guia de viagem'], CFG.LINK_PREMIUM || '#', true)}
  <div class="card center"><h3>🛡️ Garantia de 7 dias</h3><span class="mut">Não gostou? Devolvemos 100% do valor, sem burocracia.</span></div>
  <h2>Perguntas frequentes</h2>
  <details><summary>Preciso saber algo de russo?</summary><p class="mut">Não. A trilha começa do zero, pelo alfabeto.</p></details>
  <details><summary>Funciona no iPhone?</summary><p class="mut">Sim. Abra o link no Safari, toque em Compartilhar e em "Adicionar à Tela de Início".</p></details>
  <details><summary>Preciso pagar todo mês?</summary><p class="mut">Não. O pagamento é único e o acesso é vitalício.</p></details>
  <details><summary>E se eu não gostar?</summary><p class="mut">Você tem 7 dias de garantia com reembolso total.</p></details>
  <details><summary>Meu progresso fica salvo?</summary><p class="mut">Sim, no seu aparelho. Se criar uma conta, também na nuvem, para usar em mais de um aparelho.</p></details>
  <button class="btn red" id="go2" style="margin-top:20px">Começar agora</button></div>`;
  const start = () => { S.started = true; save(); go('home'); };
  $('#go').onclick = start; $('#go2').onclick = start;
}

function home() {
  let h = '', lastKind = '';
  const names = { alf: 'Alfabeto cirílico', voc: 'Vocabulário', gra: 'Gramática' };
  const total = TRAIL.length, done = TRAIL.filter(l => S.done[l.id]).length;
  const g = GREET[(new Date().getDate()) % GREET.length];
  h += `<div class="bubble"><b>${g[0]}</b><div class="mut small">${g[1]}</div></div>${doll({ mascot: true, size: 96 })}`;
  h += `<div class="card"><b>Seu progresso</b><div class="bar" style="margin:8px 0"><i style="width:${done / total * 100}%"></i></div><span class="mut small">${done} de ${total} lições</span></div><div class="path">`;
  TRAIL.forEach((l, i) => {
    const ok = unlocked(i), d = S.done[l.id];
    h += `<button class="node ${d ? 'done' : ok ? '' : 'lock'}" ${ok ? `data-lesson="${i}"` : 'disabled'}>${d ? '✓' : ok ? l.icone : '🔒'}<small>${l.nome}</small></button>`;
  });
  return h + '</div><div style="height:30px"></div>';
}

function letters() {
  return `<h2>Alfabeto</h2><p class="mut small">Toque em uma letra para ouvir.</p><div class="letters">${ALFABETO.map(a => `<button class="lt" style="border:0;color:inherit" data-say="${a[3]}">${a[0]}<small>${a[1]}</small></button>`).join('')}</div>`;
}
function achView() {
  return `<h2>Conquistas</h2>` + ACH.map(a => `<div class="card badge ${S.ach[a[0]] ? 'on' : ''}"><b>${a[1]}</b><div><b style="font-size:16px">${a[2]}</b><div class="mut small">${a[3]}</div></div></div>`).join('');
}
function reviewView() { return ''; }
let dollIdx = 0, dollOpen = false;
function dollsView() {
  const got = DOLLS.slice(0, dollIdx);
  const d = DOLLS[Math.min(dollIdx, DOLLS.length - 1)], fin = dollIdx >= DOLLS.length;
  const fact = dollIdx > 0 ? DOLLS[dollIdx - 1] : null;
  return `<h2>Matrioskas</h2><p class="mut small">Abra cada boneca e descubra uma palavra e uma curiosidade da Rússia. +5 XP por boneca nova no dia.</p>
  <div class="dollrow">${DOLLS.map((x, i) => doll({ body: x.body, scarf: x.scarf, size: 34 + i * 0, cls: i < dollIdx ? 'got' : '' })).join('')}</div>
  <div class="stage" id="stage">${fin ? doll({ mascot: true, size: 150, cls: 'got' }) : doll({ body: d.body, scarf: d.scarf, size: 190 - dollIdx * 14, open: false })}</div>
  ${fin ? `<div class="card center fact"><h3>🎉 Você abriu todas!</h3><span class="mut">Volte amanhã para ganhar mais XP.</span></div><button class="btn ghost" id="dreset">Fechar as bonecas de novo</button>`
    : `<button class="btn red" id="dopen">Abrir a boneca</button>`}
  ${fact ? `<div class="card fact"><div style="font-size:30px;font-weight:800">${fact.w}</div><div class="mut">${fact.t} · ${fact.p}</div><p style="margin:8px 0">${fact.f}</p><button class="btn ghost" data-say="${fact.w}">🔊 Ouvir</button></div>` : ''}`;
}
document.addEventListener('click', e => {
  if (e.target.id === 'dreset') { dollIdx = 0; render(); }
  if (e.target.id === 'dopen' && !dollOpen) {
    const st = $('#stage'), sv = st.querySelector('svg'); dollOpen = true; e.target.disabled = true;
    sv.classList.add('shake'); setTimeout(() => { sv.classList.remove('shake'); sv.classList.add('open'); }, 1300);
    setTimeout(() => {
      dollOpen = false;
      if (dollIdx >= (S.dollN || 0) || S.dollDay !== today()) { if (S.dollDay !== today()) { S.dollDay = today(); S.dollN = 0; } if (dollIdx >= S.dollN) { S.xp += 5; S.dollN = dollIdx + 1; save(); } }
      dollIdx++; if (dollIdx >= DOLLS.length) confetti(); render();
    }, 2300);
  }
});

function cfg() {
  const dueN = Object.values(S.srs).filter(v => v.due <= today()).length;
  return `<h2>Ajustes</h2>
  <div class="card"><b>Conta</b>${sess ? `<p class="mut">Conectado como ${sess.email}</p><button class="btn ghost" id="lo">Sair</button>` : cloudOn() ? `<p class="mut small">Crie uma conta para salvar o progresso na nuvem e usar em vários aparelhos.</p><button class="btn" data-go="auth">Entrar / criar conta</button>` : `<p class="mut small">Seu progresso é salvo neste aparelho.</p>`}</div>
  <div class="card"><b>Revisão</b><p class="mut small">${dueN} palavra(s) esperando revisão.</p></div>
  <div class="card"><b>Áudio russo</b><p class="mut small">${ruVoice ? 'Voz russa encontrada: ' + ruVoice.name : 'Se não ouvir nada, instale a voz russa nas configurações de acessibilidade/idioma do seu aparelho.'}</p><button class="btn ghost" data-say="Привет, как дела?">🔊 Testar áudio</button></div>
  <div class="card"><b>Zerar progresso</b><p class="mut small">Apaga XP, sequência e lições deste aparelho.</p><button class="btn red" id="rs">Zerar tudo</button></div>
  `;
}
document.addEventListener('click', e => {
  if (e.target.id === 'rs') modal({ icon: '⚠️', title: 'Zerar o progresso?', text: 'Isso apaga todo o seu XP, sua sequência e suas lições neste aparelho.', ok: 'Zerar tudo', cancel: 'Cancelar', danger: true }).then(ok => { if (ok) { S = Object.assign(blank(), { started: true }); save(); go('home'); } });
  if (e.target.id === 'lo') { logout(); render(); }
});
function authView() {
  return `<h2>Entrar</h2><div class="card"><input id="em" type="email" placeholder="E-mail" autocomplete="email"><input id="pw" type="password" placeholder="Senha (mínimo 6)" autocomplete="current-password"><div id="msg" class="small" style="color:#ff9aa2;min-height:20px"></div><button class="btn" id="in">Entrar</button><div style="height:10px"></div><button class="btn ghost" id="up">Criar conta</button></div>
  <button class="btn ghost" data-go="cfg">Voltar</button>`;
}
document.addEventListener('click', async e => {
  if (e.target.id !== 'in' && e.target.id !== 'up') return;
  const m = $('#msg'); m.textContent = 'Aguarde…';
  try { await auth(e.target.id === 'up' ? 'signup' : 'login', $('#em').value.trim(), $('#pw').value); go('cfg'); } catch (err) { m.textContent = err.message; }
});

/* ---------- jogando uma lição ---------- */
function startLesson(i) { run = Object.assign(makeLesson(TRAIL[i]), { idx: i, step: 0, q: 0, hearts: 5, right: 0, wrong: 0, phase: 'steps' }); if (!run.steps.length) run.phase = 'q'; view = 'lesson'; render(); }
function startReview() {
  const r = reviewLesson();
  if (!r.Q.length) { modal({ icon: '🔁', title: 'Nada para revisar agora', text: 'Faça mais lições e as palavras voltam aqui na hora certa.' }); return; }
  run = Object.assign(r, { idx: -1, step: 0, q: 0, hearts: 5, right: 0, wrong: 0, phase: 'q' }); view = 'lesson'; render();
}
function lessonView() {
  const r = run; let body = '';
  const prog = r.phase === 'steps' ? 0 : r.q / r.Q.length * 100;
  const head = `<div class="top"><button class="exit" id="x">✕</button><div class="bar" style="flex:1"><i style="width:${prog}%"></i></div><span class="pill">❤️ ${r.hearts}</span></div>`;
  if (r.phase === 'steps') {
    const s = r.steps[r.step];
    body = s.type === 'text'
      ? `<h2>${s.title}</h2>${s.lines.map(l => `<div class="card">${l}</div>`).join('')}`
      : `<p class="mut center small">Aprenda (${r.step + 1}/${r.steps.length})</p><div class="big">${s.big}</div><h2 class="center">${s.title}</h2><p class="center mut">${s.sub}</p>${s.extra ? `<p class="center">${s.extra}</p>` : ''}<button class="speak" id="sp">🔊</button>`;
    $app.innerHTML = head + `<div class="wrap">${body}<button class="btn" id="nx" style="margin-top:20px">Continuar</button></div>`;
    $('#x').onclick = () => go('home');
    if ($('#sp')) { $('#sp').onclick = () => speak(s.say); }
    $('#nx').onclick = () => { if (++r.step >= r.steps.length) r.phase = 'q'; render(); };
    return;
  }
  if (r.phase === 'end') return endView(head);
  const q = r.Q[r.q];
  $app.innerHTML = head + `<div class="wrap"><div class="q">${q.prompt}</div>${q.big ? `<div class="big">${q.big.split(' ')[0]}</div>` : ''}${q.listen || q.say ? `<button class="speak" id="sp">🔊</button>` : ''}<div id="ops">${q.options.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div><div id="fb"></div></div>`;
  $('#x').onclick = () => go('home');
  if ($('#sp')) { $('#sp').onclick = () => speak(q.audio || q.say); if (q.listen) setTimeout(() => speak(q.audio), 250); }
  document.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(q, b));
}
function answer(q, b) {
  const r = run, ok = q.options[+b.dataset.i] === q.correct;
  document.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (q.options[+x.dataset.i] === q.correct) x.classList.add('ok'); });
  if (!ok) b.classList.add('bad');
  srsMark(q.key, ok);
  if (ok) { r.right++; S.xp += 10; } else { r.wrong++; r.hearts--; }
  const last = r.q + 1 >= r.Q.length || r.hearts <= 0;
  $('#fb').innerHTML = `<div class="feed ${ok ? 'ok' : 'bad'}">${ok ? 'Correto! +10 XP' : 'Resposta certa: ' + q.correct}</div><button class="btn ${ok ? 'green' : 'red'}" id="nq">${last ? 'Terminar' : 'Continuar'}</button>`;
  $('#nq').onclick = () => { r.q++; if (last) finish(); else render(); };
  save();
}
function finish() {
  const r = run, passed = r.hearts > 0; r.phase = 'end'; r.passed = passed; r.bonus = 0; r.newAch = [];
  if (passed) {
    if (r.L.id !== 'review') S.done[r.L.id] = true;
    if (r.wrong === 0) { r.bonus = 20; S.xp += 20; S.perfect++; }
    const t = today();
    if (S.lastDay !== t) { S.streak = S.lastDay && dayDiff(S.lastDay, t) === 1 ? S.streak + 1 : 1; S.lastDay = t; }
    r.newAch = checkAch();
  }
  save(); render();
}
function endView(head) {
  const r = run;
  $app.innerHTML = head + `<div class="wrap center">${doll({ mascot: true, size: 120, cls: 'hop', body: r.passed ? '#2fbf71' : '#9aa0c3' })}<h1>${r.passed ? 'Lição concluída!' : 'Acabaram as vidas'}</h1>
  <div class="card"><div>✅ Acertos: <b>${r.right}</b> · ❌ Erros: <b>${r.wrong}</b></div>${r.bonus ? '<div class="mut" style="margin-top:6px">💎 Lição perfeita! +20 XP</div>' : ''}<div class="mut" style="margin-top:6px">🔥 Sequência: ${S.streak} dia(s)</div></div>
  ${r.newAch.map(a => `<div class="card badge on"><b>${a[1]}</b><div><b style="font-size:16px">Conquista: ${a[2]}</b><div class="mut small">${a[3]}</div></div></div>`).join('')}
  <button class="btn ${r.passed ? 'green' : 'red'}" id="again">${r.passed ? 'Voltar à trilha' : 'Tentar de novo'}</button></div>`;
  if (r.passed) confetti();
  $('#x').onclick = () => go('home');
  $('#again').onclick = () => { if (!r.passed && r.idx >= 0) startLesson(r.idx); else go('home'); };
}

render();
if (sess) cloudPull();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
