// Aurora Documentation & Gantt Engine v3.7 (Integrated Dashboard Edition)
async function renderContent(docId) {
    try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark' });
        const md = window.projectDocs[docId] || `# ⏳ Pending`;

        // 1. Data Analysis (Phase & Task Extraction)
        const groups = []; 
        let currentGroup = { title: "General", tasks: [] };
        
        const lines = md.split('\n');
        lines.forEach(line => {
            const sectionMatch = line.match(/section\s+([^:\n]+)/);
            if (sectionMatch) {
                if (currentGroup.tasks.length > 0) groups.push(currentGroup);
                currentGroup = { title: sectionMatch[1].trim(), tasks: [] };
            }
            const taskMatch = line.match(/([^\n:]+)\s*:\s*(TSK-\d+),\s*[^,]+,\s*(\d+)d/);
            if (taskMatch) {
                currentGroup.tasks.push({ id: taskMatch[2], name: taskMatch[1].trim(), days: parseInt(taskMatch[3]) });
            }
        });
        if (currentGroup.tasks.length > 0) groups.push(currentGroup);

        const totalTasks = groups.reduce((acc, g) => acc + 1 + g.tasks.length, 0);
        const totalProjectDays = groups.reduce((acc, g) => acc + g.tasks.reduce((ts, t) => ts + t.days, 0), 0);

        // 2. DOM Rendering
        const view = document.getElementById('view');
        const processedMd = md.replace(/```mermaid[\s\S]*?```/g, '<div class="hyper-gantt-root-anchor"></div>');
        view.innerHTML = marked.parse(processedMd);

        // 3. Grid Gantt Injection
        if (docId === 'dashboard' || docId === '02') {
            const h2Tags = Array.from(view.querySelectorAll('h2'));
            const anchorH2 = h2Tags.find(h => h.innerText.includes('進捗可視化') || h.innerText.includes('Gantt Chart'));
            
            if (anchorH2) {
                const wrapper = document.createElement('div');
                wrapper.className = 'h2-wrapper';
                anchorH2.parentNode.insertBefore(wrapper, anchorH2); wrapper.appendChild(anchorH2);
                wrapper.innerHTML += `<button class="fs-btn-inline" onclick="window.openFullscreen()">ANALYSIS HUD</button>`;

                const ganttContainer = document.createElement('div');
                ganttContainer.id = 'g-root-inline';
                ganttContainer.className = 'gantt-root-inline';
                wrapper.parentNode.insertBefore(ganttContainer, wrapper.nextSibling);

                renderGridGantt('g-root-inline', groups, totalProjectDays);
            }
        }

        await mermaid.run();
    } catch (error) { console.error("Engine v3.7 Incident:", error); }
}

function renderGridGantt(targetId, groups, totalDays) {
    const root = document.getElementById(targetId);
    if (!root) return;
    
    root.innerHTML = `<div class="g-header"><div class="g-col-label">PHASE / TASK</div><div class="g-col-label">TIMELINE</div></div>`;
    
    let accDays = 0;
    groups.forEach(group => {
        // Phase Row
        const pRow = document.createElement('div');
        pRow.className = 'g-row phase-row';
        pRow.innerHTML = `<div class="g-label-cell phase-text">${group.title}</div><div class="g-plot-cell"></div>`;
        root.appendChild(pRow);

        // Task Rows
        group.tasks.forEach(t => {
            const tRow = document.createElement('div');
            tRow.className = 'g-row';
            const leftP = (accDays / totalDays) * 100;
            const widthP = (t.days / totalDays) * 100;
            
            tRow.innerHTML = `
                <div class="g-label-cell"><span class="tsk-id">${t.id}</span><span class="task-text">${t.name}</span></div>
                <div class="g-plot-cell">
                    <div class="g-bar-container" style="left:${leftP}%; width:${widthP}%">
                        <div class="g-bar-human"></div>
                        <div class="g-bar-ai" style="width:20%"></div>
                    </div>
                </div>
            `;
            root.appendChild(tRow);
            accDays += t.days;
        });
    });
}

window.openFullscreen = () => {
    document.getElementById('fullscreen-overlay').style.display = 'flex';
    // Re-render in fullscreen container
    renderContent(window.currentActiveDoc || 'dashboard'); 
};
window.closeFullscreen = () => { document.getElementById('fullscreen-overlay').style.display = 'none'; };

window.switchDoc = (id) => {
    window.currentActiveDoc = id;
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.getElementById('nav-' + id).classList.add('active');
    renderContent(id);
};

window.onload = () => renderContent('dashboard');
