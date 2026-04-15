/**
 * Aurora Hyper-Gantt Engine (v6.1 - Super Vibrant & Screen Fit)
 * リクエスト対応: 予定期間を鮮やかなトーンへ、画面内フィットの最適化。
 */

function renderEnterpriseGantt(raw, mount, isFullscreen = false) {
    try {
        if (!mount) return;
        const items = []; const tasksById = {}; 
        const statusTags = ['done', 'active', 'crit', 'milestone'];
        const today = dayjs().startOf('day');
        let lastTaskEnd = today.add(10, 'hour'); 

        let isTimeScale = raw.includes('HH:mm') || raw.includes('HH:00');
        const unit = isTimeScale ? 'minute' : 'day';

        // 1. Parsing
        raw.split(/[\r\n]+/).forEach((line, idx) => {
            try {
                const l = line.trim();
                if(!l || l.startsWith('%%') || l.startsWith('gantt') || l.startsWith('title') || l.startsWith('dateFormat') || l.startsWith('axisFormat')) return;
                
                if(l.startsWith('section ')) { 
                    items.push({ type: 'section', name: l.replace('section ','').trim() }); 
                    return; 
                }
                
                const cIdx = l.indexOf(':'); if(cIdx === -1) return;
                const taskName = l.substring(0, cIdx).trim();
                const meta = l.substring(cIdx+1).split(',').map(m => m.trim());
                
                let tid = '', timing = '', durVal = 1, durUnit = unit, status = '';
                
                meta.forEach(m => {
                    if(statusTags.includes(m)) { status = m; }
                    else if(m.startsWith('after ') || m.match(/^\d{4}-\d{2}-\d{2}$/) || m.match(/^\d{2}:\d{2}$/)) { timing = m; }
                    else if(m.match(/^\d+m$/)) { durVal = parseInt(m); durUnit = 'minute'; }
                    else if(m.match(/^\d+d$/)) { durVal = parseInt(m); durUnit = 'day'; }
                    else if(m && !tid) { tid = m; }
                });

                if(!tid) tid = 'TSK-' + (idx < 10 ? '0' + idx : idx);

                let start;
                if(timing.startsWith('after ')) {
                    const dId = timing.replace('after ','').trim();
                    start = tasksById[dId] ? tasksById[dId].end : lastTaskEnd;
                } else if(timing.match(/^\d{2}:\d{2}$/)) {
                    const [h, m] = timing.split(':');
                    start = today.add(parseInt(h), 'hour').add(parseInt(m), 'minute');
                } else if(dayjs(timing).isValid() && timing.match(/^\d{4}/)) {
                    start = dayjs(timing);
                } else {
                    start = lastTaskEnd;
                }

                if(!start || !start.isValid()) start = lastTaskEnd;

                const end = start.add(durVal, durUnit);
                const task = { type: 'task', id: tid, name: taskName, start, end, dur: durVal, unit: durUnit, status };
                items.push(task); tasksById[tid] = task; lastTaskEnd = end;
            } catch(e) { console.warn("Parse error:", e); }
        });

        if(items.length === 0) return;
        
        let minDate = dayjs('2099-12-31'); let maxDate = dayjs('1970-01-01');
        items.filter(i => i.type === 'task').forEach(t => {
            if(t.start.isBefore(minDate)) minDate = t.start;
            if(t.end.isAfter(maxDate)) maxDate = t.end;
        });

        // Dynamic Padding
        if(isTimeScale) { minDate = minDate.subtract(30, 'minute'); maxDate = maxDate.add(60, 'minute'); }
        else { minDate = minDate.subtract(1, 'day'); maxDate = maxDate.add(2, 'day'); }

        const totalUnits = maxDate.diff(minDate, isTimeScale ? 'minute' : 'day');
        
        // --- SCREEN FIT CALCULATION (VIBRANT ADJUST) ---
        const mountW = mount.clientWidth || 1000;
        const labelW = isFullscreen ? 260 : 180;
        // 使用可能な横幅に合わせて unitW を決定 (最小値 4px)
        const unitW = Math.max(4, (mountW - labelW - 60) / totalUnits); 
        const gridW = totalUnits * unitW;

        mount.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `display:grid; grid-template-columns:${labelW}px ${gridW}px; background:#010204; border:1px solid #1a1b25; border-radius:16px; overflow:hidden; position:relative; box-shadow:0 30px 60px rgba(0,0,0,0.8);`;

        // Headers
        const hLead = document.createElement('div'); hLead.style.cssText = `background:#000; border-bottom:1px solid #222; position:sticky; left:0; z-index:20; grid-row:1/3;`;
        const t1 = document.createElement('div'); t1.style.cssText = `background:#05060f; height:24px; border-bottom:1px solid #111; width:${gridW}px; display:flex; font-size:9px; color:#666;`;
        const t2 = document.createElement('div'); t2.style.cssText = `background:#000; height:32px; border-bottom:2px solid #00f2fe; width:${gridW}px; display:flex; position:relative;`;
        
        // Scale Marks
        for(let i=0; i<=10; i++) {
            const mark = document.createElement('div');
            mark.style.cssText = `position:absolute; left:${(i/10)*100}%; border-left:1px solid rgba(255,255,255,0.08); height:100%; padding-left:5px; font-size:8px; line-height:24px;`;
            mark.textContent = isTimeScale ? `${i*15}m` : `DAY ${i}`;
            t1.appendChild(mark);
        }

        wrapper.appendChild(hLead); wrapper.appendChild(t1); wrapper.appendChild(t2);

        items.forEach(item => {
            if(item.type === 'section') {
                const s = document.createElement('div');
                s.style.cssText = `grid-column:1/3; background:linear-gradient(90deg, #0a0b18, #000); color:#00f2fe; padding:10px 20px; font-size:10px; font-weight:700; border-bottom:1px solid #222; position:sticky; left:0; z-index:15; letter-spacing:2px; text-shadow:0 0 5px #00f2fe;`;
                s.textContent = item.name.toUpperCase();
                wrapper.appendChild(s);
            } else {
                const l = document.createElement('div');
                const rowH = 50;
                l.style.cssText = `padding:0 20px; height:${rowH}px; display:flex; align-items:center; border-bottom:1px solid #111; color:#ccc; font-size:11px; background:#000; position:sticky; left:0; z-index:10; border-right:1px solid #1a1b25;`;
                l.textContent = item.name;
                
                const tr = document.createElement('div');
                tr.style.cssText = `position:relative; height:${rowH}px; border-bottom:1px solid #111; background:rgba(255,255,255,0.01);`;
                
                const left = item.start.diff(minDate, isTimeScale ? 'minute' : 'day') * unitW;
                const width = Math.max(12, (item.end.diff(item.start, isTimeScale ? 'minute' : 'day')) * unitW);
                
                // --- PLANNED BAR (VIBRANT TONE) ---
                const hBar = document.createElement('div');
                hBar.style.cssText = `position:absolute; top:28%; left:${left}px; width:${width}px; height:44%; border-radius:4px; border:1px solid #00f2fe; background:rgba(0, 242, 254, 0.08); box-shadow: 0 0 8px rgba(0, 242, 254, 0.2); transition:0.3s; z-index:4;`;
                
                // --- AI ACTUAL BAR (NEON GLOW) ---
                if(item.status === 'done' || item.status === 'active') {
                    const aBar = document.createElement('div');
                    const aiW = item.status === 'done' ? (width * 0.95) : 6; 
                    aBar.style.cssText = `position:absolute; top:46%; left:${left + 2}px; width:${aiW}px; height:10%; border-radius:100px; background:linear-gradient(90deg, #00f2fe, #7028e4); box-shadow:0 0 15px #00f2fe, 0 0 30px #7028e4; z-index:10;`;
                    tr.appendChild(aBar);
                }

                tr.appendChild(hBar); wrapper.appendChild(l); wrapper.appendChild(tr);
            }
        });
        mount.appendChild(wrapper);

    } catch(err) {
        console.error("Engine Error:", err);
        mount.innerHTML = `<div style="color:red; padding:20px;">Render Error: ${err.message}</div>`;
    }
}
