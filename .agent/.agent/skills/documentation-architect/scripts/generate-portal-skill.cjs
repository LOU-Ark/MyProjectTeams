const fs = require('fs');
const path = require('path');

/**
 * Aurora Project Playbook Generator v23.2 (Super Resilient)
 */

function generatePortal() {
    const projectRoot = process.cwd();
    const portalRoot = path.join(projectRoot, 'management/08_Documentation_Portal');
    const assetsDir = path.join(portalRoot, 'assets');

    if (!fs.existsSync(portalRoot)) fs.mkdirSync(portalRoot, { recursive: true });
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

    const engineCode = fs.readFileSync(path.join(projectRoot, '.agent/skills/aurora-gantt-engine.js'), 'utf8');

    const docConfig = [
        { section: "00 Project Master", items: { "Master Dashboard": "management/00_Master/00_Master_Report.md" } },
        { section: "01 Requirements", items: { "Requirement Spec": "management/01_Requirements/01_Requirements.md", "Project Scope": "management/01_Requirements/01_Project_Scope.md" } },
        { section: "02 Planning", items: { "Physical WBS & Gantt": "management/02_Planning/02_Planning.md" } },
        { section: "03 Implementation", items: {
            "Phase 01 Report": "management/03_Implementation/Phase_01/Phase_01_Report.md",
            "Phase 02 Report": "management/03_Implementation/Phase_02/Phase_02_Report.md",
            "Phase 03 Report": "management/03_Implementation/Phase_03/Phase_03_Report.md"
        } },
        { section: "07 Team Analytics", items: { 
            "Project Retrospective": "management/07_Team_Analytics/Project_Retrospective.md",
            "Evolution Report": "management/07_Team_Analytics/Evolution_Report.md"
        } },
        { section: "09 Team Evolution", items: { 
            "Initial Standards": "management/00_Team_Definition/Team_Standards.md",
            "Improved Master Index": ".agent/rules/GVN-000-MASTER-INDEX.md",
            "Impact Report": "management/07_Team_Analytics/Evolution_Report.md"
        } }
    ];

    function processMarkdown(content, isMaster = false) {
        // Remove ANY existence of [🏠 Home ] just in case
        content = content.replace(/\[🏠 Home \]/g, "[🏠 00_Master ]");
        return content;
    }

    const docsData = {};
    const pathMap = {};
    docConfig.forEach(conf => {
        docsData[conf.section] = {};
        for (const label in conf.items) {
            const relPath = conf.items[label].replace(/\\/g, '/');
            const fullPath = path.join(projectRoot, relPath);
            if (fs.existsSync(fullPath)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                content = processMarkdown(content, label === "Master Dashboard");
                docsData[conf.section][label] = content;
                pathMap[relPath] = [conf.section, label];
            } else {
                docsData[conf.section][label] = "# " + label + "\n\n> Document Ready.";
            }
        }
    });

    const safeDocsJson = JSON.stringify(docsData).replace(/<\/script>/g, '<\\/script>');
    const safePathMapJson = JSON.stringify(pathMap);
    
    let html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Aurora Playbook v23.2</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
    <style>
        body { background: #010204; color: #fff; font-family: "Outfit", sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }
        aside { width: 320px; background: #000; border-right: 1px solid #111; padding: 30px 30px 150px 30px; overflow-y: auto; flex-shrink: 0; }
        .nav-label { color: #555; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px; margin: 40px 0 10px 10px; }
        .nav-item { padding: 12px 15px; border-radius: 12px; cursor: pointer; color: #888; font-size: 0.85rem; margin-bottom: 5px; transition: all 0.2s; }
        .nav-item:hover, .nav-item.active { background: rgba(0,242,254,0.1); color: #00f2fe; }
        main { flex: 1; padding: 60px; overflow-y: auto; background: #020306; scroll-behavior: smooth; }
        .content-card { max-width: 1400px; margin: 0 auto; background: rgba(255,255,255,0.02); padding: 40px; border-radius: 40px; border: 1px solid #111; box-shadow: 0 40px 100px rgba(0,0,0,0.6); }
        .gantt-container { margin: 40px 0; border-radius: 15px; border: 1px solid #222; overflow-x: auto; background: #050608; min-height: 200px; }
    </style>
</head>
<body>
    <aside id="sidebar"><div style="font-size:2.2rem; font-weight:600; margin-bottom:50px; color:#00f2fe; letter-spacing:-2px;">Aurora v24.0</div></aside>
    <main id="main-scroll"><div id="content-area" class="content-card"></div></main>
    <script>
        ${engineCode}
        var docs = ${safeDocsJson};
        var pathMap = ${safePathMapJson};

        function loadDoc(section, file) {
            document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
            var element = Array.from(document.querySelectorAll(".nav-item")).find(i => i.textContent === file);
            if(element) element.classList.add("active");
            
            var area = document.getElementById("content-area");
            area.innerHTML = marked.parse(docs[section][file] || "");
            area.querySelectorAll("pre code").forEach(code => {
                if(code.textContent.includes("gantt")) {
                    var pre = code.parentNode;
                    var div = document.createElement("div");
                    div.className = "gantt-container";
                    pre.parentNode.replaceChild(div, pre);
                    try {
                        renderEnterpriseGantt(code.textContent.replace(/^mermaid\\s+/, "").trim(), div, false);
                    } catch(e) { console.error("Gantt Error:", e); }
                }
            });
            document.getElementById("main-scroll").scrollTop = 0;
        }

        window.onload = function() {
            var sidebar = document.getElementById("sidebar");
            Object.keys(docs).forEach(section => {
                var secLabel = document.createElement("div");
                secLabel.className = "nav-label";
                secLabel.textContent = section;
                sidebar.appendChild(secLabel);
                Object.keys(docs[section]).forEach(label => {
                    var item = document.createElement("div");
                    item.className = "nav-item";
                    item.textContent = label;
                    item.onclick = function() { loadDoc(section, label); };
                    sidebar.appendChild(item);
                });
            });
            var s = Object.keys(docs);
            if(s.length > 0) loadDoc(s[0], Object.keys(docs[s[0]])[0]);
        };
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(portalRoot, 'index.html'), html, 'utf8');
    console.log('BUILD v24.0 SUCCESS: Hyper-Gantt Integration Completed.');
}

generatePortal();
