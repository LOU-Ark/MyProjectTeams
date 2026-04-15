// Aurora Documentation & Gantt Engine v8.0.0 (Fidelity Hardening)
let currentMode = 'hyper'; 
async function renderContent(docId) {
    console.log("[Engine] Booting Core v8.0.0: " + docId);
    try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark' });
        const md = window.projectDocs[docId] || `# ⏳ Pending \n\n成果物は準備中です。`;

        // 1. Data Analysis (Fidelity Filter Strategy)
        const tasks = [];
        const tableRowRegex = /\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|(?:\s*([^|]+?)\s*\|)?/g;
        let match;
        while ((match = tableRowRegex.exec(md)) !== null) {
            const rawPhase = match[1].trim().replace(/\*\*/g, '');
            const rawId = match[2].trim().replace(/`/g, '');
            const rawTitle = match[3].trim();

            // --- Fidelity Validation Rules ---
            // 1. Skip obvious headers or separators
            if (rawId === 'ID' || rawId === 'Task ID' || rawId.includes('---')) continue;
            
            // 2. ID Pattern Validation (Must be TSK-xxx or NN-AAAA)
            const isWbsPattern = rawId.match(/^TSK-\d+$/) || rawId.match(/^\d{2}-[A-Z0-9]+$/);
            
            // 3. Negative Keywords (Directory context)
            const hasNegativeKeywords = (rawId + rawPhase + rawTitle).match(/[フォルダ|役割|ディレクトリ|ファイル|Requirements]/);

            // Execute filtering
            if (!isWbsPattern || hasNegativeKeywords) continue;
            
            // Extract Meta Data
            const hMatch = rawTitle.match(/H:\s*(\d+)d/);
            const aiMatch = rawTitle.match(/AI:\s*(\d+)m/);
            const title = rawTitle.replace(/\(.*?\)/g, '').trim();
            
            tasks.push({ 
                phase: rawPhase, 
                id: rawId, 
                name: title, 
                h_days: hMatch ? parseInt(hMatch[1]) : 1,
                ai_mins: aiMatch ? parseInt(aiMatch[1]) : 15,
                status: (match[5] || 'Done').trim(),
                summary: match[4].trim()
            });
        }
        window.currentTasks = tasks;

        // HUD Calculation
        const totalH = tasks.reduce((sum, t) => sum + t.h_days, 0) || 1;
        const totalAI = tasks.reduce((sum, t) => sum + t.ai_mins, 0) || 1;
        const acceleration = totalAI > 0 ? Math.round((totalH * 1440) / totalAI) : 0;

        // Render Markdown
        const view = document.getElementById('view');
        view.innerHTML = marked.parse(md);

        // Mermaid Processing
        const codeBlocks = view.querySelectorAll('pre code.language-mermaid');
        codeBlocks.forEach(code => {
            const container = document.createElement('div');
            const trimmedCode = code.innerText.trim();
            if (trimmedCode.startsWith('gantt') && (md.includes('進捗可視化') || md.includes('Gantt'))) {
                container.className = 'hyper-gantt-root-anchor';
                container.id = 'hyper-gantt-target';
                const pre = code.parentElement;
                pre.parentNode.replaceChild(container, pre);
            } else {
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.innerText = trimmedCode;
                const pre = code.parentElement;
                pre.parentNode.replaceChild(div, pre);
            }
        });

        // Inject HUD
        const anchor = document.getElementById('hyper-gantt-target');
        if (anchor) {
            const h2 = Array.from(view.querySelectorAll('h2')).find(h => h.innerText.includes('進捗可視化') || h.innerText.includes('Gantt'));
            if (h2) {
                const wrapper = document.createElement('div');
                wrapper.className = 'h2-wrapper';
                h2.parentNode.insertBefore(wrapper, h2);
                wrapper.appendChild(h2);
                wrapper.innerHTML += `
                    <div class="toggle-container-inline">
                        <button class="tgl-btn ${currentMode==='calendar'?'active':''}" onclick="setGanttMode('calendar')">CALENDAR</button>
                        <button class="tgl-btn ${currentMode==='hyper'?'active':''}" onclick="setGanttMode('hyper')">AI HYPER</button>
                    </div>
                    <button class="fs-btn-inline" onclick="window.openFullscreen()">ANALYSIS HUD</button>`;
                
                const kpiRow = document.createElement('div');
                kpiRow.className = 'kpi-row-full';
                kpiRow.innerHTML = `
                    <div class="kpi-card-lux"><div class="kpi-v">${totalH.toFixed(1)}d</div><div class="kpi-l">Human Plan</div></div>
                    <div class="kpi-card-lux"><div class="kpi-v">${totalAI}m</div><div class="kpi-l">AI Actual</div></div>
                    <div class="kpi-card-lux accent"><div class="kpi-v">${acceleration}x</div><div class="kpi-l">Acceleration</div></div>
                `;
                wrapper.parentNode.insertBefore(kpiRow, wrapper.nextSibling);
            }
            renderHyperGantt('hyper-gantt-target', tasks, totalH, totalAI);
        }

        // Beautify Tables
        const tables = view.querySelectorAll('table');
        tables.forEach(table => {
            if (table.innerText.includes('Phase') || table.innerText.includes('Task ID')) beautifyWBSTable(table);
        });

        await mermaid.run();
    } catch (error) { console.error("Engine Incident:", error); }
}

function renderHyperGantt(targetId, tasks, totalH, totalAI) {
    const root = document.getElementById(targetId);
    if (!root) return;
    root.innerHTML = `<div class="g-header-row"><div class="g-h-label">WBS ITEM / TASK</div><div class="g-h-plot">TIMELINE (${currentMode.toUpperCase()})</div></div>`;
    
    let accAI = 0;
    let accH = 0;
    tasks.forEach(t => {
        const row = document.createElement('div');
        row.className = 'g-row-new';
        let leftP = currentMode === 'calendar' ? (accH / totalH) * 100 : (accAI / totalAI) * 100;
        let widthP = currentMode === 'calendar' ? (t.h_days / totalH) * 100 : (t.ai_mins / totalAI) * 100;
        if (currentMode === 'calendar') accH += t.h_days; else accAI += t.ai_mins;

        row.innerHTML = `
            <div class="g-row-info"><div class="g-row-phase">${t.phase}</div><div class="g-row-task"><span class="tsk-badge">${t.id}</span> ${t.name}</div></div>
            <div class="g-row-plot">
                <div class="g-bar-group">
                    <div class="g-bar-bg"></div>
                    <div class="g-bar-fill lux" style="left:${leftP}%; width:${widthP}%">
                        <span class="g-bar-label">${currentMode==='calendar'?(t.h_days+'d'):(t.ai_mins+'m')}</span>
                    </div>
                </div>
            </div>
        `;
        root.appendChild(row);
    });
}

function beautifyWBSTable(table) {
    const parent = table.parentNode;
    const container = document.createElement('div');
    container.className = 'wbs-container';
    const rows = Array.from(table.querySelectorAll('tr')).slice(1);
    rows.forEach(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length < 4) return;
        const card = document.createElement('div');
        card.className = 'wbs-card';
        card.innerHTML = `
            <div class="wbs-card-side"><span class="wbs-phase">${cols[0].innerText}</span><span class="wbs-id">${cols[1].innerText}</span></div>
            <div class="wbs-card-main"><div class="wbs-title">${cols[2].innerText}</div><div class="wbs-desc">${cols[3].innerText}</div></div>
            <div class="wbs-status-badge">${cols[4] ? cols[4].innerText : 'Done'}</div>
        `;
        container.appendChild(card);
    });
    parent.replaceChild(container, table);
}

window.setGanttMode = (mode) => {
    currentMode = mode;
    const activeDocId = document.querySelector('.nav-item.active')?.id.replace('nav-', '') || 'dashboard';
    renderContent(activeDocId);
};

window.openFullscreen = () => {
    document.getElementById('fullscreen-overlay').style.display = 'flex';
    const totalH = (window.currentTasks || []).reduce((sum, t) => sum + t.h_days, 0) || 1;
    const totalAI = (window.currentTasks || []).reduce((sum, t) => sum + t.ai_mins, 0) || 1;
    renderHyperGantt('fs-gantt-target', window.currentTasks || [], totalH, totalAI);
};

window.closeFullscreen = () => { document.getElementById('fullscreen-overlay').style.display = 'none'; };
window.switchDoc = (id) => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const item = document.getElementById('nav-' + id);
    if (item) item.classList.add('active');
    renderContent(id);
};
function renderSidebar() {
    const root = document.getElementById('nav-target-root');
    if (!root) return;
    const docs = window.projectDocs || {};
    const keys = Object.keys(docs).sort();
    let html = ``;
    const masterKeys = keys.filter(k => k.includes('Master') || k.match(/^\d{2}_/));
    if (masterKeys.length > 0) {
        html += `<div class="nav-group">Intelligence & Master</div>`;
        masterKeys.forEach(k => {
            const label = k.replace(/^\d{2}_/, '').replace(/_/g, ' ');
            html += `<div id="nav-${k}" class="nav-item" onclick="switchDoc('${k}')">${label}</div>`;
        });
    }
    const phases = [...new Set(keys.filter(k => k.toLowerCase().includes('phase')).map(k => {
        const m = k.match(/Phase_(\d+)/i); return m ? m[1] : null;
    }).filter(v => v))].sort((a,b) => a-b);
    if (phases.length > 0) {
        html += `<div class="nav-group">🚀 Phases & Evidence</div>`;
        phases.forEach(p => {
            html += `<div class="nav-item noselect" style="opacity:0.6; pointer-events:none; font-size:0.65rem; margin-top:10px;">PHASE ${p}</div>`;
            const phaseKeys = keys.filter(k => k.includes(`Phase_${p}_`) || k.includes(`Phase_${p.padStart(2,'0')}_`));
            phaseKeys.forEach(k => {
                const label = k.replace(/Phase_\d+_?/, '').replace(/_/g, ' ');
                html += `<div id="nav-${k}" class="nav-item sub" onclick="switchDoc('${k}')">${label}</div>`;
            });
        });
    }
    const alreadyDisplayed = new Set([...masterKeys]);
    phases.forEach(p => {
        const pKeys = keys.filter(k => k.includes(`Phase_${p}_`) || k.includes(`Phase_${p.padStart(2,'0')}_`));
        pKeys.forEach(pk => alreadyDisplayed.add(pk));
    });
    const remainingKeys = keys.filter(k => !alreadyDisplayed.has(k));
    if (remainingKeys.length > 0) {
        const closingKeys = remainingKeys.filter(k => k.toLowerCase().includes('delivery') || k.toLowerCase().includes('retro'));
        const trueOthers = remainingKeys.filter(k => !closingKeys.includes(k));
        if (closingKeys.length > 0) {
            html += `<div class="nav-group">🏁 Project Closing</div>`;
            closingKeys.forEach(k => {
                const label = k.replace(/_/g, ' ');
                html += `<div id="nav-${k}" class="nav-item" onclick="switchDoc('${k}')">${label}</div>`;
            });
        }
        if (trueOthers.length > 0) {
            html += `<div class="nav-group">📁 General Assets</div>`;
            trueOthers.forEach(k => {
                const label = k.replace(/_/g, ' ');
                html += `<div id="nav-${k}" class="nav-item" onclick="switchDoc('${k}')">${label}</div>`;
            });
        }
    }
    root.innerHTML = html;
}
