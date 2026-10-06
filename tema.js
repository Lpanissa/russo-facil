/* Tema russo: proverbios, torres de cebola e neve (sem mexer no app.js) */
(function () {
  const PROV = [
    ['Тише едешь — дальше будешь', 'Devagar se vai ao longe.'],
    ['Без труда не вынешь и рыбку из пруда', 'Sem esforço não se tira nem um peixinho do lago.'],
    ['Повторение — мать учения', 'A repetição é a mãe do aprendizado.'],
    ['Лучше поздно, чем никогда', 'Antes tarde do que nunca.'],
    ['Старый друг лучше новых двух', 'Um velho amigo vale mais que dois novos.'],
    ['Утро вечера мудренее', 'A manhã é mais sábia que a noite.'],
    ['Хлеб всему голова', 'O pão é a cabeça de tudo.'],
    ['Семь раз отмерь, один раз отрежь', 'Meça sete vezes, corte uma.']
  ];
  function domes() {
    const T = [[38, 34, 'a'], [100, 52, 'b'], [160, 70, 'c'], [220, 52, 'b'], [282, 34, 'a']];
    const fills = { a: 'url(#pa)', b: 'url(#pb)', c: 'url(#pc)' };
    let s = '<svg class="domes" viewBox="0 0 320 120" aria-hidden="true"><defs>' +
      '<pattern id="pa" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="8" height="8" fill="#c8102e"/><rect width="4" height="8" fill="#f0b429"/></pattern>' +
      '<pattern id="pb" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)"><rect width="8" height="8" fill="#2a5bd7"/><rect width="4" height="8" fill="#fbf1e1"/></pattern>' +
      '<pattern id="pc" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#3aa76d"/><path d="M5 0L10 5 5 10 0 5Z" fill="#f0b429"/></pattern></defs>';
    s += '<rect x="0" y="108" width="320" height="12" fill="#8e0f25"/>';
    T.forEach(([x, h, k]) => {
      const top = 108 - h, w = 16 + h / 5;
      s += `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${h}" fill="#f1e2c0"/>`;
      s += `<path d="M${x - w / 2 - 3} ${top} h${w + 6} v-4 h-${w + 6}Z" fill="#8e0f25"/>`;
      s += `<path d="M${x - w / 2 - 1} ${top - 4} C${x - w / 2 - 14} ${top - 26} ${x - 4} ${top - 34} ${x} ${top - 60 + (70 - h) / 4} C${x + 4} ${top - 34} ${x + w / 2 + 14} ${top - 26} ${x + w / 2 + 1} ${top - 4}Z" fill="${fills[k]}" stroke="#fff2c4" stroke-width="1.2"/>`;
      s += `<circle cx="${x}" cy="${top - 60 + (70 - h) / 4 - 3}" r="3.2" fill="#f0b429"/>`;
      s += `<path d="M${x - 3.5} ${top + 16} v-8 a3.5 3.5 0 0 1 7 0 v8Z" fill="#3a1b27"/>`;
      if (h > 40) s += `<path d="M${x - 3.5} ${top + 36} v-8 a3.5 3.5 0 0 1 7 0 v8Z" fill="#3a1b27"/>`;
    });
    return s + '</svg>';
  }
  const sn = document.createElement('div'); sn.className = 'snow'; sn.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 20; i++) {
    const f = document.createElement('i');
    f.style.cssText = `left:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--d:${9 + Math.random() * 10}s;--l:-${Math.random() * 14}s;--x:${(Math.random() * 60 - 30).toFixed(0)}px`;
    sn.appendChild(f);
  }
  document.body.appendChild(sn);

  const _home = home;
  home = function () {
    const p = PROV[new Date().getDate() % PROV.length];
    const card = `<div class="proverb"><div class="pk">Пословица дня · provérbio do dia</div><div class="pr">«${p[0]}»</div><div class="mut small">${p[1]}</div><button class="btn ghost" data-say="${p[0]}">🔊 Ouvir</button></div>`;
    return _home().replace('<div class="card"><b>Seu progresso</b>', card + '<div class="card"><b>Seu progresso</b>') + domes();
  };
  const _landing = landing;
  landing = function () {
    _landing();
    const hero = document.querySelector('.hero');
    if (hero) { hero.insertAdjacentHTML('afterbegin', domes()); hero.insertAdjacentHTML('beforeend', '<div class="orn"></div><p class="script" style="font-size:24px;margin:6px 0 0;color:#f0b429">Добро пожаловать!</p><div class="mut small">Bem-vindo!</div>'); }
    const w = document.querySelector('.wrap');
    if (w) w.insertAdjacentHTML('beforeend', domes());
  };
  render();
})();
/* Arte popular pintada a mão: khokhloma e gzhel */
(function () {
  const defs = document.createElement('div');
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  defs.innerHTML = '<svg width="0" height="0"><filter id="wob"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></svg>';
  document.body.appendChild(defs);
  function leaf(x, y, r, c) { return `<path d="M${x} ${y} q8 -14 18 -4 q-6 14 -18 4Z" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`; }
  window.khokhloma = function () {
    let s = '<svg class="khokh" viewBox="0 0 320 54" aria-hidden="true"><rect width="320" height="54" rx="10" fill="#14080c"/><g filter="url(#wob)">';
    s += '<path d="M8 28 C50 2 90 54 130 28 S210 2 250 28 S300 46 314 26" fill="none" stroke="#f0b429" stroke-width="3.2" stroke-linecap="round"/>';
    for (let i = 0; i < 6; i++) {
      const x = 28 + i * 52, up = i % 2 === 0;
      s += leaf(x, up ? 18 : 38, up ? -30 : 150, '#f0b429');
      s += `<circle cx="${x + 14}" cy="${up ? 36 : 14}" r="5.4" fill="#c8102e" stroke="#f0b429" stroke-width="1.2"/>`;
      s += `<circle cx="${x + 24}" cy="${up ? 30 : 20}" r="3.2" fill="#c8102e"/>`;
      s += `<path d="M${x - 2} ${up ? 40 : 12} q-8 6 -4 12" fill="none" stroke="#f0b429" stroke-width="2" stroke-linecap="round"/>`;
    }
    return s + '</g></svg>';
  };
  window.gzhel = function () {
    let s = '<svg class="khokh" viewBox="0 0 320 44" aria-hidden="true"><rect width="320" height="44" rx="10" fill="#f4f7ff"/><g filter="url(#wob)" fill="none" stroke="#1f46c8" stroke-linecap="round">';
    for (let i = 0; i < 7; i++) {
      const x = 24 + i * 45;
      s += `<circle cx="${x}" cy="22" r="9" stroke-width="2.4"/><circle cx="${x}" cy="22" r="3" fill="#1f46c8"/>`;
      for (let a = 0; a < 6; a++) { const t = a * Math.PI / 3; s += `<ellipse cx="${(x + Math.cos(t) * 14).toFixed(1)}" cy="${(22 + Math.sin(t) * 14).toFixed(1)}" rx="4" ry="2.4" stroke-width="1.6" transform="rotate(${a * 60} ${(x + Math.cos(t) * 14).toFixed(1)} ${(22 + Math.sin(t) * 14).toFixed(1)})"/>`; }
      if (i < 6) s += `<path d="M${x + 16} 22 q 6 -9 13 0 q 6 9 12 0" stroke-width="1.8"/>`;
    }
    return s + '</g></svg>';
  };
  const h2 = home;
  home = function () {
    return h2().replace('<div class="card"><b>Seu progresso</b>', window.khokhloma() + '<div class="card"><b>Seu progresso</b>').replace(/(<svg class="domes")/, window.gzhel() + '$1');
  };
  const l2 = landing;
  landing = function () {
    l2();
    const w = document.querySelector('.wrap'), f = document.querySelector('.feat');
    if (f) f.insertAdjacentHTML('beforebegin', window.khokhloma());
    if (w) w.insertAdjacentHTML('beforeend', window.gzhel());
  };
  render();
})();
