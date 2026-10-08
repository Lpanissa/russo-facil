/* Ajustes extras: temas, voz masculina/feminina e professor(a) */
(function () {
  const lg = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
  const sv = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  // Professor masculino DESLIGADO por enquanto (só a babushka ensina). Para voltar no futuro, troque para true.
  const MASC_ATIVO = false;
  let TEMA = lg('russo_tema', 'folk'), VOZ = lg('russo_voz', 'f'), VNOME = lg('russo_vnome', '');
  if (!MASC_ATIVO) VOZ = 'f';
  const TEMAS = {
    folk: ['Folk', 'Vinho, vermelho e dourado', 'linear-gradient(135deg,#c8102e 50%,#f0b429 50%)', '#160a10'],
    gzhel: ['Gzhel', 'Azul e branco, claro', 'linear-gradient(135deg,#1f46c8 50%,#ffffff 50%)', '#eaf0ff'],
    noite: ['Noite de Moscou', 'Azul-noite com prata', 'linear-gradient(135deg,#0a1228 50%,#d5def5 50%)', '#0a1228']
  };
  function aplicaTema() {
    if (!TEMAS[TEMA]) TEMA = 'folk';
    document.documentElement.setAttribute('data-tema', TEMA);
    const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = TEMAS[TEMA][3];
  }
  aplicaTema();

  /* professor russo (voz masculina) */
  function homem(o) {
    const id = 'm' + Math.random().toString(36).slice(2, 7);
    const draw = `
     <path d="M18 128 C6 96 20 60 50 54 C80 60 94 96 82 128Z" fill="#c8102e"/>
     <path d="M50 58 L50 126" stroke="#f0b429" stroke-width="5"/>
     <path d="M44 66h12M44 76h12M44 86h12" stroke="#fff4d6" stroke-width="2" stroke-dasharray="3 3"/>
     <rect x="20" y="108" width="60" height="8" fill="#3a1b27"/><rect x="45" y="106" width="10" height="12" rx="2" fill="#f0b429"/>
     <circle cx="50" cy="38" r="22" fill="#ffd9b8"/>
     <path d="M25 38 Q22 64 36 70 Q50 82 64 70 Q78 64 75 38 Q70 56 50 56 Q30 56 25 38Z" fill="#9a6a38"/>
     <path d="M36 50 Q50 44 64 50 Q58 58 50 55 Q42 58 36 50Z" fill="#7b5128"/>
     <path d="M44 62 Q50 66 56 62" stroke="#e8a5a0" stroke-width="2.4" fill="none" stroke-linecap="round"/>
     <circle cx="50" cy="45" r="4.2" fill="#f3a98a"/>
     <path d="M34 31 Q40 27 46 31M54 31 Q60 27 66 31" stroke="#5a3a1a" stroke-width="3" fill="none" stroke-linecap="round"/>
     <g class="${o.mascot ? 'eye' : ''}"><circle cx="41" cy="37" r="2.6" fill="#222"/><circle cx="59" cy="37" r="2.6" fill="#222"/></g>
     <path d="M23 34 C20 4 80 4 77 34 Q50 24 23 34Z" fill="#6b4a2f"/>
     <path d="M23 30 C20 44 24 58 30 60 Q36 58 35 42 L35 30Z M77 30 C80 44 76 58 70 60 Q64 58 65 42 L65 30Z" fill="#7d5a3a"/>
     <path d="M26 24 Q50 12 74 24" stroke="#9a7650" stroke-width="3" fill="none" stroke-dasharray="2 4" stroke-linecap="round"/>
     <path d="M50 12 l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8Z" fill="#c8102e" stroke="#f0b429" stroke-width="1"/>
     ${o.mascot ? `<g class="arm"><ellipse cx="86" cy="82" rx="8" ry="12" fill="#c8102e" transform="rotate(-20 86 82)"/><circle cx="91" cy="70" r="5.5" fill="#ffd9b8"/></g>` : ''}`;
    return `<svg class="doll ${o.cls || ''} ${o.open ? 'open' : ''} ${o.mascot ? 'mascot' : ''}" width="${o.size || 140}" height="${(o.size || 140) * 1.3}" viewBox="-6 0 112 134" aria-hidden="true"><defs><clipPath id="t${id}"><rect x="-10" y="-10" width="130" height="86"/></clipPath><clipPath id="b${id}"><rect x="-10" y="76" width="130" height="70"/></clipPath></defs><g class="dbot"><g clip-path="url(#b${id})">${draw}</g></g><g class="dtop"><g clip-path="url(#t${id})">${draw}</g></g></svg>`;
  }
  const dollOrig = doll;
  doll = function (o) {
    o = o || {};
    return (o.mascot && (o.forceVoz || VOZ) === 'm') ? homem(o) : dollOrig(o);
  };

  /* voz */
  const FEM = /milena|tat[iy]ana|svetlana|irina|kat[iy]a|anna|[yj]elena|elena|olga|alena|female|femin|жен/i;
  const MASC = /yuri|pavel|dmitr|maxim|ivan|aleks|alexand|\bmale\b|masc|муж/i;
  const ruVozes = () => (window.speechSynthesis && speechSynthesis.getVoices() || []).filter(v => /^ru/i.test(v.lang));
  function escolheVoz() {
    const vs = ruVozes();
    const pick = VNOME && vs.find(x => x.name === VNOME);
    if (pick) return { v: pick, achou: true, manual: true };
    const re = VOZ === 'm' ? MASC : FEM, outra = VOZ === 'm' ? FEM : MASC;
    const v = vs.find(x => re.test(x.name)) || null;
    return { v: v || vs.find(x => !outra.test(x.name)) || vs[0] || null, achou: !!v };
  }
  speak = function (t) {
    if (!window.speechSynthesis) return modal({ icon: '🔇', title: 'Sem áudio', text: 'Seu aparelho não tem áudio de voz.' });
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(t).replace(/[«»]/g, '')), r = escolheVoz();
    u.lang = 'ru-RU'; if (r.v) u.voice = r.v; u.rate = .85;
    u.pitch = (r.manual || r.achou) ? 1 : (VOZ === 'm' ? .8 : 1.1);
    speechSynthesis.speak(u);
  };

  /* ajustes */
  const cfg0 = cfg;
  cfg = function () {
    const t = Object.keys(TEMAS).map(k => `<button class="op ${k === TEMA ? 'on' : ''}" data-tema="${k}"><span class="sw" style="background:${TEMAS[k][2]}"></span><span><b>${TEMAS[k][0]}</b><small>${TEMAS[k][1]}</small></span></button>`).join('');
    const vz = `<button class="op ${VOZ === 'f' ? 'on' : ''}" data-voz="f">${dollOrig({ mascot: true, size: 44 })}<span><b>Voz feminina</b><small>Professora: a babushka, a matriarca</small></span></button>` + (MASC_ATIVO ? `<button class="op ${VOZ === 'm' ? 'on' : ''}" data-voz="m">${homem({ mascot: true, size: 44 })}<span><b>Voz masculina</b><small>Professor: um russo de ushanka e barba</small></span></button>` : '');
    let extra = `<div class="card"><b>Tema do aplicativo</b><div class="opcoes">${t}</div></div><div class="card"><b>Voz e professor(a)</b><p class="mut small">A voz muda o áudio das palavras e quem ensina você no app.</p><div class="opcoes">${vz}</div><div style="height:10px"></div><button class="btn ghost" data-say="Здравствуйте! Меня зовут Анна.">🔊 Ouvir a voz escolhida</button></div>`;
    const vs = ruVozes();
    const lista = vs.length ? vs.map((v, i) => `<button class="op ${v.name === VNOME ? 'on' : ''}" data-vname="${v.name.replace(/"/g, '')}"><span class="sw" style="background:linear-gradient(135deg,#c8102e,#f0b429)"></span><span><b>${v.name.replace(/</g, '')}</b><small>Toque para escolher e ouvir</small></span></button>`).join('') : '<p class="mut small">Nenhuma voz russa encontrada neste aparelho.</p>';
    extra += `<div class="card"><b>Outras vozes deste aparelho</b><p class="mut small">Quer uma voz mais natural? Baixe uma voz russa melhor no seu celular (é grátis) e escolha aqui embaixo.</p><details style="margin:8px 0"><summary><b>Como baixar mais vozes</b></summary><p class="mut small"><b>Android:</b> abra os Ajustes do celular, procure por “Saída de texto para fala” (fica em Idioma e entrada ou Gerenciamento geral), toque no mecanismo do Google, depois em “Instalar dados de voz” e baixe o Русский (russo).</p><p class="mut small"><b>iPhone:</b> Ajustes &gt; Acessibilidade &gt; Conteúdo Falado &gt; Voz &gt; Russo, e baixe uma voz marcada como “Aprimorada” ou “Premium”.</p><p class="mut small">Os nomes dos menus mudam um pouco de celular para celular. Quando terminar o download, volte aqui e toque em “Atualizar lista”.</p></details><button class="btn ghost" data-recarrega="1">🔄 Atualizar lista de vozes</button><div style="height:10px"></div><p class="mut small">Se a voz soou estranha, escolha outra da lista.</p><div class="opcoes">${lista}</div>${VNOME ? '<div style="height:10px"></div><button class="btn ghost" data-vname="">Voltar ao automático</button>' : ''}</div>`;
    return cfg0().replace('<div class="card"><b>Zerar progresso</b>', extra + '<div class="card"><b>Zerar progresso</b>');
  };
  document.addEventListener('click', e => {
    if (e.target.closest && e.target.closest('[data-recarrega]')) { try { speechSynthesis.getVoices(); } catch (x) {} setTimeout(render, 400); return; }
    const b = e.target.closest && e.target.closest('[data-tema],[data-voz],[data-vname]');
    if (!b || b === document.documentElement) return;
    if (b.dataset.tema) { TEMA = b.dataset.tema; sv('russo_tema', TEMA); aplicaTema(); }
    if (b.dataset.voz) { VOZ = MASC_ATIVO ? b.dataset.voz : 'f'; sv('russo_voz', VOZ); VNOME = ''; sv('russo_vnome', ''); }
    if (b.dataset.vname !== undefined) { VNOME = b.dataset.vname; sv('russo_vnome', VNOME); render(); if (VNOME) setTimeout(() => speak('Здравствуйте! Меня зовут Анна.'), 150); return; }
    render();
  });
  render();
})();
