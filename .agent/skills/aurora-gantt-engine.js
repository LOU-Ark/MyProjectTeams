/**
 * Aurora Ultra Gantt Engine (Enterprise Ultra v4.0)
 * 修復項目: タスクID抽出(01, 02等)、左側ラベルのSticky(固定)表示の完全強化。
 */

function renderEnterpriseGantt(raw, mount, isFullscreen = false) {
    if (!mount) return;
    const items = []; const tasksById = {}; 
    const statusTags = ['done', 'active', 'crit', 'milestone'];
    let lastTaskEnd = dayjs().startOf('month');

    // 1. Parsing
    raw.split(/[\r\n]+/).forEach((line, idx) => {
        const l = line.trim();
        if(!l || l.startsWith('%%') || l.startsWith('gantt') || l.startsWith('title')) return;
        if(l.startsWith('section ')) { items.push({ type: 'section', name: l.replace('section ','').trim() }); return; }
        const cIdx = l.indexOf(':'); if(cIdx === -1) return;
        const taskName = l.substring(0, cIdx).trim();
        const meta = l.substring(cIdx+1).split(',').map(m => m.trim());
        let tid = '', timing = '', dur = 1, status = '';
        meta.forEach(m => {
            if(statusTags.includes(m)) { status = m; }
            else if(m.startsWith('after ') || m.match(/^\d{4}-\d{2}-\d{2}$/)) { timing = m; }
            else if(m.match(/^\d+d$/)) { dur = parseInt(m); }
            else if(m && !tid) { tid = m; }
        });
        if(!tid) tid = 'TSK-' + (idx < 10 ? '0' + idx : idx);
        let start;
        if(timing.startsWith('after ')) {
            const dId = timing.replace('after ','').trim();
            start = tasksById[dId] ? tasksById[dId].end : lastTaskEnd;
        } else if(dayjs(timing).isValid() && timing.match(/^\d{4}/)) {
            start = dayjs(timing);
        } else { start = lastTaskEnd; }
        const end = start.add(dur, 'day');
        const task = { type: 'task', id: tid, name: taskName, start, end, dur, status };
        items.push(task); tasksById[tid] = task; lastTaskEnd = end;
    });

    if(items.length === 0) return;
    let minDate = dayjs('2099-12-31'); let maxDate = dayjs('1970-01-01');
    items.filter(i => i.type === 'task').forEach(t => {
        if(t.start.isBefore(minDate)) minDate = t.start;
        if(t.end.isAfter(maxDate)) maxDate = t.end;
    });
    minDate = minDate.subtract(2, 'day'); maxDate = maxDate.add(5, 'day');
    const totalDays = maxDate.diff(minDate, 'day'); 

    // Scaling
    let labelW, dayW, rowH;
    if (isFullscreen) {
        const containerW = window.innerWidth - 80;
        const containerH = window.innerHeight - 150;
        labelW = Math.max(220, containerW * 0.18);
        dayW = (containerW - labelW) / totalDays;
        rowH = Math.max(35, (containerH - 60) / items.length);
        mount.style.overflow = 'hidden';
    } else {
        labelW = 200; dayW = 52; rowH = 48;
        mount.style.overflowX = 'auto'; mount.style.overflowY = 'hidden';
    }
    const gridW = totalDays * dayW;

    mount.innerHTML = '';
    // WRAPPER: ここに overflow-x: auto を含め、ラベルを sticky にする。
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `display:grid; grid-template-columns:${labelW}px ${gridW}px; background:#050608; border:1px solid #222; border-radius:15px; overflow:hidden; min-width:max-content; position:relative;`;

    // A. 2-Tier Header
    const headerLead = document.createElement('div');
    headerLead.style.cssText = `background:#0a0b0e; border-bottom:1px solid #333; position:sticky; left:0; z-index:20; grid-row:1/3;`;
    
    const monthTrack = document.createElement('div');
    monthTrack.style.cssText = `display:flex; background:#0a0b0e; height:24px; border-bottom:1px solid #222; width:${gridW}px;`;
    
    const dayTrack = document.createElement('div');
    dayTrack.style.cssText = `display:flex; background:#000; height:32px; border-bottom:2px solid #00f2fe; width:${gridW}px;`;
    
    let currentMonth = "";
    for(let i=0; i<totalDays; i++) {
        const d = minDate.add(i, 'day');
        const mStr = d.format('YYYY MMM');
        if(mStr !== currentMonth) {
            const mSpan = document.createElement('div');
            mSpan.style.cssText = `padding:4px 10px; font-size:10px; color:#00f2fe; white-space:nowrap; border-right:1px solid #222;`;
            mSpan.textContent = mStr;
            monthTrack.appendChild(mSpan);
            currentMonth = mStr;
        }
        const dayCell = document.createElement('div');
        const isW = d.day() === 0 || d.day() === 6;
        dayCell.style.cssText = `width:${dayW}px; flex-shrink:0; font-size:10px; color:${isW ? '#ff4757' : '#555'}; text-align:center; line-height:32px; border-right:1px solid rgba(255,255,255,0.05); background:${isW ? 'rgba(255,71,87,0.03)' : 'transparent'};`;
        dayCell.textContent = d.format('D');
        dayTrack.appendChild(dayCell);
    }
    wrapper.appendChild(headerLead);
    wrapper.appendChild(monthTrack);
    wrapper.appendChild(dayTrack);

    // B. Rows
    items.forEach(item => {
        if(item.type === 'section') {
            const s = document.createElement('div');
            s.style.cssText = `grid-column:1/3; background:linear-gradient(90deg, #0a0b0e, transparent); color:#00f2fe; padding:12px 20px; font-size:11px; font-weight:600; text-transform:uppercase; border-bottom:1px solid #222; letter-spacing:2.5px; position:sticky; left:0; z-index:15;`;
            s.textContent = item.name;
            wrapper.appendChild(s);
        } else {
            const label = document.createElement('div');
            label.style.cssText = `padding:0 20px; height:${rowH}px; line-height:${rowH}px; border-bottom:1px solid #111; color:#aaa; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; background:#050608; position:sticky; left:0; z-index:10; border-right:1px solid #222; box-shadow:5px 0 15px rgba(0,0,0,0.5);`;
            label.textContent = item.name;

            const track = document.createElement('div');
            track.style.cssText = `position:relative; height:${rowH}px; border-bottom:1px solid #111; background:repeating-linear-gradient(90deg, transparent, transparent ${dayW-1}px, rgba(255,255,255,0.02) ${dayW-1}px, rgba(255,255,255,0.02) ${dayW}px);`;

            const bar = document.createElement('div');
            const left = item.start.diff(minDate, 'day') * dayW;
            const width = item.dur * dayW;
            const color = item.status === 'done' ? '#2ecc71' : (item.status === 'active' ? '#3498db' : '#00f2fe');
            const barH = rowH * 0.6;
            const barTop = (rowH - barH) / 2;
            
            bar.style.cssText = `position:absolute; top:${barTop}px; left:${left}px; width:${width}px; height:${barH}px; border-radius:6px; background:linear-gradient(135deg, ${color}cc, ${color}); box-shadow:0 4px 15px ${color}33; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#fff; transition:0.2s; border:1px solid rgba(255,255,255,0.1);`;
            
            // ID抽出: TSK-01 -> 01
            const displayId = item.id.includes('-') ? item.id.split('-').pop() : item.id;
            bar.textContent = displayId;

            bar.onmouseover = (e) => {
                const tt = document.getElementById('tooltip');
                if(!tt) return;
                bar.style.filter = 'brightness(1.2)'; bar.style.transform = 'scale(1.02)';
                tt.innerHTML = `<div style="color:#00f2fe; font-weight:600; margin-bottom:4px; font-size:13px;">${item.name}</div>` +
                               `<div style="font-size:11px; color:#888;">ID: ${item.id} | ${item.dur} Days</div>` +
                               `<div style="font-size:11px; margin-top:4px; color:#fff;">${item.start.format('MM/DD')} - ${item.end.format('MM/DD')}</div>`;
                tt.style.display = 'block';
            };
            bar.onmousemove = (e) => {
                const tt = document.getElementById('tooltip');
                if(!tt) return;
                let tx = e.pageX + 20; let ty = e.pageY + 20;
                if(tx + 220 > window.innerWidth) tx = e.pageX - 240;
                if(ty + 100 > window.innerHeight) ty = e.pageY - 120;
                tt.style.left = tx + 'px'; tt.style.top = ty + 'px';
            };
            bar.onmouseout = () => {
                const tt = document.getElementById('tooltip');
                if(tt) tt.style.display = 'none';
                bar.style.filter = ''; bar.style.transform = '';
            };

            track.appendChild(bar);
            wrapper.appendChild(label);
            wrapper.appendChild(track);
        }
    });

    mount.appendChild(wrapper);

    // Today Line
    const todayLeft = dayjs().diff(minDate, 'day') * dayW;
    if(todayLeft > 0 && todayLeft < gridW) {
        const line = document.createElement('div');
        line.style.cssText = `position:absolute; top:0; left:${todayLeft + labelW}px; width:2px; height:100%; background:#ff4757; z-index:30; pointer-events:none; box-shadow:0 0 10px #ff4757;`;
        wrapper.appendChild(line);
    }
}
