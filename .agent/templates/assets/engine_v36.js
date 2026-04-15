// Aurora Documentation & Gantt Engine v3.6 (Restoration Edition)
const linkMap = { "00_Master_Report": "dashboard", "01-requirements-doc": "01", "02-planning-wbs": "02", "team-report": "context" };
let currentTasks = []; 

async function renderContent(docId) {
    try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark' });
        const md = window.projectDocs[docId] || `# ⏳ Pending \n\n成果物は準備中です。`;

        // 1. Data Analysis (ID & Full Name)
        const tasks = []; 
        const taskRegex = /([^\n:]+)\s*:\s*(TSK-\d+),\s*[^,]+,\s*(\d+)d/g;
        let match;
        while ((match = taskRegex.exec(md)) !== null) {
            tasks.push({ id: match[2], name: match[1].trim(), days: parseInt(match[3]) });
        }
        currentTasks = tasks;
        const totalDays = tasks.reduce((sum, t) => sum + t.days, 0);

        // 2. DOM Rendering
        const view = document.getElementById('view');
        const processedMd = md.replace(/```mermaid[\s\S]*?```/g, '<div class="hyper-gantt-root-anchor"></div>');
        view.innerHTML = marked.parse(processedMd);

        // 3. HUD and Gantt Injection
        if (docId === 'dashboard' || docId === '02') {
            const h2Tags = Array.from(view.querySelectorAll('h2'));
            const anchorH2 = h2Tags.find(h => h.innerText.includes('進捗可視化') || h.innerText.includes('Gantt Chart'));
            
            if (anchorH2) {
                // Ensure single injection via class check
                if (!anchorH2.parentElement.classList.contains('h2-wrapper')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'h2-wrapper';
                    anchorH2.parentNode.insertBefore(wrapper, anchorH2);
                    wrapper.appendChild(anchorH2);
                    wrapper.innerHTML += `<button class="fs-btn-inline" onclick="window.openFullscreen()">ANALYSIS HUD</button>`;

                    const kpiRow = document.createElement('div');
                    kpiRow.className = 'kpi-row';
                    kpiRow.innerHTML = `
                        <div class="kpi-card"><div class="kpi-v">${totalDays}.0 Days</div><div class="kpi-l">Human Plan</div></div>
                        <div class="kpi-card"><div class="kpi-v">110 Min</div><div class="kpi-l">AI Actual</div></div>
                        <div class="kpi-card"><div class="kpi-v">131x</div><div class="kpi-l">Acceleration</div></div>
                    `;
                    wrapper.parentNode.insertBefore(kpiRow, wrapper.nextSibling);

                    const ganttContainer = document.createElement('div');
                    ganttContainer.id = 'g-root-inline';
                    ganttContainer.className = 'gantt-root-inline';
                    kpiRow.parentNode.insertBefore(ganttContainer, kpiRow.nextSibling);

                    renderHyperGantt('g-root-inline', tasks, totalDays);
                }
            }
        }

        const codes = document.querySelectorAll('code.language-mermaid');
        for (const code of codes) {
            const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
            code.parentElement.outerHTML = `<div class="mermaid-container"><div class="mermaid" id="${id}">${code.innerText}</div></div>`;
        }
        await mermaid.run();
    } catch (error) { console.error("Engine Incident:", error); }
}

function renderHyperGantt(targetId, tasks, totalDays) {
    const root = document.getElementById(targetId);
    if (!root) return;
    root.innerHTML = `<div class="g-row g-header"><div class="g-label">WBS ID / TASK</div><div class="g-plot"></div></div>`;
    let acc = 0;
    tasks.forEach(t => {
        const row = document.createElement('div');
        row.className = 'g-row';
        row.innerHTML = `<div class="g-label"><span class="tsk-id">${t.id}</span> ${t.name}</div><div class="g-plot"></div>`;
        root.appendChild(row);
        const plot = row.querySelector('.g-plot');
        const leftP = (acc / totalDays) * 100;
        const widthP = (t.days / totalDays) * 100;
        plot.innerHTML = `
            <div class="g-bar-human" style="left:${leftP}%; width:${widthP}%"></div>
            <div class="g-bar-ai" style="left:${leftP}%; width:${widthP * 0.2}%"></div>
        `;
        acc += t.days;
    });
}

window.openFullscreen = () => {
    document.getElementById('fullscreen-overlay').style.display = 'flex';
    const totalDays = currentTasks.reduce((sum, t) => sum + t.days, 0);
    renderHyperGantt('fs-gantt-target', currentTasks, totalDays);
    window.setGanttMode('human');
};

window.closeFullscreen = () => { document.getElementById('fullscreen-overlay').style.display = 'none'; };

window.setGanttMode = (mode) => {
    const target = document.getElementById('fs-gantt-target');
    const btnH = document.getElementById('btn-human'); const btnA = document.getElementById('btn-ai');
    if (mode === 'ai') { target.classList.add('ai-mode'); btnA.classList.add('active'); btnH.classList.remove('active'); }
    else { target.classList.remove('ai-mode'); btnH.classList.add('active'); btnA.classList.remove('active'); }
};

window.switchDoc = (id) => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.getElementById('nav-' + id).classList.add('active');
    renderContent(id);
};

window.onload = () => renderContent('dashboard');
