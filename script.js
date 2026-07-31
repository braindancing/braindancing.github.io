/* ============================================================
   BRAINDANCING — Lógica do Criador de Personagem
   ============================================================ */

const state = {
  step: 0,
  name: "",
  role: "",
  bio: "",
  skills: {},          // id -> pontos
  cyber: {},           // partId -> [indices selecionados]
  weapons: { pesada: "", pistola: "", maos: "" },
  weaponCat: { pesada: "fogo", pistola: "fogo", maos: "lamina" },
  items: [],           // nomes selecionados
  hacks: [],           // indices selecionados
};

// inicializa skills em 0
SKILLS.forEach(s => state.skills[s.id] = 0);

// ---------------- HELPERS DE CÁLCULO ----------------
function pointsUsed() {
  return Object.values(state.skills).reduce((a, b) => a + b, 0);
}
function pointsRemaining() {
  return SKILL_POINTS - pointsUsed();
}
function getVida() {
  return BASE_VIDA + (state.skills.corpo || 0) * 10;
}
function getSanidade() {
  return BASE_SANIDADE + (state.skills.intel || 0) * 10;
}
function getRamTotal() {
  return (state.skills.intel || 0) * 2;
}
function getRamUsed() {
  return state.hacks.reduce((sum, i) => sum + HACKS[i].custo, 0);
}
function getItemLimit() {
  return 5 + (state.skills.corpo || 0);
}
function countCyberSelected() {
  return Object.values(state.cyber).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0);
}

// ---------------- STEPPER ----------------
const steps = document.querySelectorAll(".step");
const panels = document.querySelectorAll(".panel");

function goToStep(n) {
  state.step = n;
  steps.forEach((el, i) => {
    el.classList.toggle("active", i === n);
    el.classList.toggle("done", i < n);
  });
  panels.forEach(p => p.classList.toggle("active", Number(p.dataset.panel) === n));
  // Recalcula cada painel ao entrar nele, pois limites (RAM, itens) dependem
  // dos pontos de perícia definidos no passo anterior.
  if (n === 1) renderSkills();
  if (n === 2) renderCyber();
  if (n === 3) { renderWeapons(); renderItems(); }
  if (n === 4) renderHacks();
  if (n === 5) renderSheet();
  updateSidebar();
  document.getElementById("criador").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => goToStep(Math.min(state.step + 1, panels.length - 1)));
});
document.querySelectorAll("[data-prev]").forEach(btn => {
  btn.addEventListener("click", () => goToStep(Math.max(state.step - 1, 0)));
});
steps.forEach(stepEl => {
  stepEl.addEventListener("click", () => {
    const target = Number(stepEl.dataset.step);
    if (target <= state.step || stepEl.classList.contains("done")) goToStep(target);
  });
  stepEl.style.cursor = "pointer";
});

// ---------------- STEP 0: Identidade ----------------
const charName = document.getElementById("charName");
const charRole = document.getElementById("charRole");
const charBio = document.getElementById("charBio");

charName.addEventListener("input", () => { state.name = charName.value; updateSidebar(); });
charRole.addEventListener("change", () => { state.role = charRole.value; updateSidebar(); });
charBio.addEventListener("input", () => { state.bio = charBio.value; });

// ---------------- STEP 1: Atributos / Perícias ----------------
const skillsContainer = document.getElementById("skillsContainer");
const pointsRemainingEl = document.getElementById("pointsRemaining");
const derivedStatsEl = document.getElementById("derivedStats");

function renderSkills() {
  skillsContainer.innerHTML = "";
  SKILLS.forEach(skill => {
    const val = state.skills[skill.id];
    const row = document.createElement("div");
    row.className = "skill-row";
    row.innerHTML = `
      <div class="skill-name">${skill.nome}<small>${skill.desc}</small></div>
      <div class="skill-controls">
        <button type="button" data-act="dec" ${val <= 0 ? "disabled" : ""}>−</button>
        <span class="skill-value">${val}</span>
        <button type="button" data-act="inc" ${pointsRemaining() <= 0 ? "disabled" : ""}>+</button>
      </div>
    `;
    row.querySelector('[data-act="inc"]').addEventListener("click", () => {
      if (pointsRemaining() > 0) { state.skills[skill.id]++; renderSkills(); updateSidebar(); }
    });
    row.querySelector('[data-act="dec"]').addEventListener("click", () => {
      if (val > 0) { state.skills[skill.id]--; renderSkills(); updateSidebar(); }
    });
    skillsContainer.appendChild(row);
  });
  pointsRemainingEl.textContent = pointsRemaining();
  derivedStatsEl.innerHTML = `
    <div class="derived-chip">❤ Vida: <b>${getVida()}</b></div>
    <div class="derived-chip">🧠 Sanidade: <b>${getSanidade()}</b></div>
    <div class="derived-chip">💾 RAM: <b>${getRamTotal()}</b></div>
  `;
}

// ---------------- STEP 2: Cibernéticas ----------------
const cyberContainer = document.getElementById("cyberContainer");

function renderCyber() {
  cyberContainer.innerHTML = "";
  CYBER_PARTS.forEach(part => {
    if (!state.cyber[part.id]) state.cyber[part.id] = [];
    const selected = state.cyber[part.id];

    const partEl = document.createElement("div");
    partEl.className = "cyber-part";
    partEl.innerHTML = `
      <div class="cyber-part-header">
        <span>${part.icon}</span> ${part.nome}
        <span class="cyber-part-slots">${selected.length}/${part.slots} slots ${part.subtitulo ? "· " + part.subtitulo : ""}</span>
      </div>
      <div class="cyber-items"></div>
    `;
    const itemsWrap = partEl.querySelector(".cyber-items");

    part.itens.forEach((item, idx) => {
      const isSelected = selected.includes(idx);
      const isFull = selected.length >= part.slots && !isSelected;
      const isLocked = !!item.especial;
      const el = document.createElement("div");
      el.className = "cyber-item" + (isSelected ? " selected" : "") + ((isFull || isLocked) ? " disabled" : "");
      el.innerHTML = `
        <div class="cyber-item-title">
          ${isSelected ? '<span class="check">●</span>' : ""} ${item.nome}
          ${isLocked ? '<span class="special-badge">missão</span>' : ""}
        </div>
        <div class="cyber-item-desc">${item.desc}</div>
      `;
      if (!isLocked) {
        el.addEventListener("click", () => {
          const arr = state.cyber[part.id];
          const pos = arr.indexOf(idx);
          if (pos >= 0) {
            arr.splice(pos, 1);
          } else if (arr.length < part.slots) {
            arr.push(idx);
          }
          renderCyber();
          updateSidebar();
        });
      }
      itemsWrap.appendChild(el);
    });

    cyberContainer.appendChild(partEl);
  });
}

// ---------------- STEP 3: Armas & Itens ----------------
const weaponsGrid = document.getElementById("weaponsGrid");
const itemsGrid = document.getElementById("itemsGrid");
const itemLimitLabel = document.getElementById("itemLimitLabel");
const itemLimitLabel2 = document.getElementById("itemLimitLabel2");
const customItemInput=document.getElementById("customItemInput");
const addCustomItem=document.getElementById("addCustomItem");

function renderWeapons() {
  weaponsGrid.innerHTML = "";
  const slots = [
    { key: "pesada", label: "Arma Pesada", allowed: ["fogo", "inteligente", "tecnologica"] },
    { key: "pistola", label: "Pistola", allowed: ["fogo", "inteligente", "tecnologica"] },
    { key: "maos", label: "Arma de Mão", allowed: ["lamina", "maos"] },
  ];
  slots.forEach(slot => {
    const wrap = document.createElement("div");
    wrap.className = "weapon-slot";
    const catOptions = WEAPON_CATEGORIES.filter(c => slot.allowed.includes(c.id))
      .map(c => `<option value="${c.id}" ${state.weaponCat[slot.key] === c.id ? "selected" : ""}>${c.nome}</option>`)
      .join("");
    wrap.innerHTML = `
      <h5>${slot.label}</h5>
      <div class="form-row">
        <label>Categoria</label>
        <select data-cat="${slot.key}">${catOptions}</select>
      </div>
      <div class="form-row">
        <label>Nome da arma</label>
        <input type="text" data-name="${slot.key}" placeholder="ex: Nekomata" value="${state.weapons[slot.key]}">
      </div>
    `;
    wrap.querySelector(`[data-cat="${slot.key}"]`).addEventListener("change", e => {
      state.weaponCat[slot.key] = e.target.value;
    });
    wrap.querySelector(`[data-name="${slot.key}"]`).addEventListener("input", e => {
      state.weapons[slot.key] = e.target.value;
    });
    weaponsGrid.appendChild(wrap);
  });
}

function renderItems() {
  const limit = getItemLimit();
  itemLimitLabel.textContent = limit;
  itemLimitLabel2.textContent = limit;
  itemsGrid.innerHTML = "";
  ITEMS_EXEMPLO.forEach(itemName => {
    const isSelected = state.items.includes(itemName);
    const isFull = state.items.length >= limit && !isSelected;
    const chip = document.createElement("div");
    chip.className = "item-chip" + (isSelected ? " selected" : "") + (isFull ? " disabled" : "");
    chip.textContent = itemName;
    chip.addEventListener("click", () => {
      const pos = state.items.indexOf(itemName);
      if (pos >= 0) state.items.splice(pos, 1);
      else if (state.items.length < getItemLimit()) state.items.push(itemName);
      renderItems();
      updateSidebar();
    });
    itemsGrid.appendChild(chip);
  });
}
addCustomItem?.addEventListener("click",()=>{const v=customItemInput.value.trim();if(!v)return;if(!state.items.includes(v)&&state.items.length<getItemLimit())state.items.push(v);customItemInput.value="";renderItems();updateSidebar();});

// ---------------- STEP 4: Hacks ----------------
const hacksContainer = document.getElementById("hacksContainer");
const ramUsedEl = document.getElementById("ramUsed");
const ramTotalEl = document.getElementById("ramTotal");

function renderHacks() {
  ramTotalEl.textContent = getRamTotal();
  ramUsedEl.textContent = getRamUsed();
  hacksContainer.innerHTML = "";
  HACKS.forEach((hack, idx) => {
    const isSelected = state.hacks.includes(idx);
    const wouldExceed = false;
    const el = document.createElement("div");
    el.className = "hack-item" + (isSelected ? " selected" : "") ;
    el.innerHTML = `
      <div class="hack-item-title"><span>${hack.nome}</span><span class="hack-cost">${hack.custo} RAM</span></div>
      <div class="hack-item-desc">${hack.desc}</div>
    `;
    el.addEventListener("click", () => {
      const pos = state.hacks.indexOf(idx);
      if (pos >= 0) {
        state.hacks.splice(pos, 1);
      } else {
        state.hacks.push(idx);
      }
      renderHacks();
      updateSidebar();
    });
    hacksContainer.appendChild(el);
  });
}

// ---------------- STEP 5: Ficha Final ----------------
const sheetOutput = document.getElementById("sheetOutput");

function buildSheetData() {
  const cyberList = [];
  CYBER_PARTS.forEach(part => {
    (state.cyber[part.id] || []).forEach(idx => {
      cyberList.push(`${part.nome}: ${part.itens[idx].nome}`);
    });
  });
  const hackList = state.hacks.map(i => `${HACKS[i].nome} (${HACKS[i].custo} RAM)`);
  return {
    nome: state.name || "Sem nome",
    arquetipo: state.role || "—",
    bio: state.bio || "—",
    nivel: BASE_LEVEL,
    pericias: SKILLS.map(s => ({ nome: s.nome, valor: state.skills[s.id] })),
    vida: getVida(),
    sanidade: getSanidade(),
    ram: getRamTotal(),
    armas: {
      pesada: `${state.weapons.pesada || "—"} (${WEAPON_CATEGORIES.find(c=>c.id===state.weaponCat.pesada)?.nome})`,
      pistola: `${state.weapons.pistola || "—"} (${WEAPON_CATEGORIES.find(c=>c.id===state.weaponCat.pistola)?.nome})`,
      maos: `${state.weapons.maos || "—"} (${WEAPON_CATEGORIES.find(c=>c.id===state.weaponCat.maos)?.nome})`,
    },
    itens: state.items,
    cyberneticas: cyberList,
    hacks: hackList,
  };
}

function renderSheet() {
  const d = buildSheetData();
  sheetOutput.innerHTML = `
    <h4>🪪 Identidade</h4>
    <div class="sheet-row"><span>Nome</span><b>${d.nome}</b></div>
    <div class="sheet-row"><span>Arquétipo</span><b>${d.arquetipo}</b></div>
    <div class="sheet-row"><span>Nível</span><b>${d.nivel}</b></div>
    <p>${d.bio}</p>

    <h4>📊 Atributos</h4>
    <div class="sheet-row"><span>Vida</span><b>${d.vida}</b></div>
    <div class="sheet-row"><span>Sanidade</span><b>${d.sanidade}</b></div>
    <div class="sheet-row"><span>RAM (Techpoints)</span><b>${d.ram}</b></div>
    <ul class="sheet-list">
      ${d.pericias.map(p => `<li><b>${p.nome}:</b> ${p.valor}</li>`).join("")}
    </ul>

    <h4>🔌 Cibernéticas (${d.cyberneticas.length})</h4>
    <ul class="sheet-list">
      ${d.cyberneticas.length ? d.cyberneticas.map(c => `<li>${c}</li>`).join("") : "<li>Nenhuma selecionada</li>"}
    </ul>

    <h4>🔫 Armas</h4>
    <div class="sheet-row"><span>Pesada</span><b>${d.armas.pesada}</b></div>
    <div class="sheet-row"><span>Pistola</span><b>${d.armas.pistola}</b></div>
    <div class="sheet-row"><span>Arma de Mão</span><b>${d.armas.maos}</b></div>

    <h4>🎒 Itens (${d.itens.length})</h4>
    <ul class="sheet-list">
      ${d.itens.length ? d.itens.map(i => `<li>${i}</li>`).join("") : "<li>Nenhum item selecionado</li>"}
    </ul>

    <h4>🖥 Hacks (${d.hacks.length})</h4>
    <ul class="sheet-list">
      ${d.hacks.length ? d.hacks.map(h => `<li>${h}</li>`).join("") : "<li>Nenhum hack selecionado</li>"}
    </ul>
  `;
}

// Export buttons
document.getElementById("btnPrint").addEventListener("click", () => window.print());

document.getElementById("btnDownloadTxt").addEventListener("click", () => {
  const d = buildSheetData();
  const txt = `
BRAINDANCING — FICHA DE PERSONAGEM
====================================
Nome: ${d.nome}
Arquétipo: ${d.arquetipo}
Nível: ${d.nivel}
História: ${d.bio}

ATRIBUTOS
---------
Vida: ${d.vida}
Sanidade: ${d.sanidade}
RAM: ${d.ram}
${d.pericias.map(p => `${p.nome}: ${p.valor}`).join("\n")}

CIBERNÉTICAS
------------
${d.cyberneticas.join("\n") || "Nenhuma"}

ARMAS
-----
Pesada: ${d.armas.pesada}
Pistola: ${d.armas.pistola}
Arma de Mão: ${d.armas.maos}

ITENS
-----
${d.itens.join(", ") || "Nenhum"}

HACKS
-----
${d.hacks.join("\n") || "Nenhum"}
`.trim();
  downloadFile(`${(d.nome || "personagem").replace(/\s+/g,"_")}_ficha.txt`, txt, "text/plain");
});

document.getElementById("btnDownloadJson").addEventListener("click", () => {
  const d = buildSheetData();
  downloadFile(`${(d.nome || "personagem").replace(/\s+/g,"_")}_ficha.json`, JSON.stringify(d, null, 2), "application/json");
});

document.getElementById("btnReset").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja recomeçar? Todos os dados serão perdidos.")) {
    location.reload();
  }
});

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------- SIDEBAR ----------------
function updateSidebar() {
  document.getElementById("sumName").textContent = state.name || "—";
  document.getElementById("sumRole").textContent = state.role || "—";
  document.getElementById("sumVida").textContent = getVida();
  document.getElementById("sumSanidade").textContent = getSanidade();
  document.getElementById("sumRam").textContent = `${getRamUsed()}/${getRamTotal()}`;
  document.getElementById("sumCyber").textContent = countCyberSelected();
  document.getElementById("sumHacks").textContent = state.hacks.length;
  document.getElementById("sumItems").textContent = `${state.items.length}/${getItemLimit()}`;
}

// ---------------- INIT ----------------
function init() {
  renderSkills();
  renderCyber();
  renderWeapons();
  renderItems();
  renderHacks();
  updateSidebar();
}
init();
