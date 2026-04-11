const fs = require('fs');
const path = require('path');

/**
 * Aurora Project Playbook Generator v23.0
 * 特徴: 
 * 1. リンク・インターセプター: MD内の相対リンクをポータル内遷移に変換。
 * 2. 内部コンテンツ遷移時のサイドバー同期機能。
 * 3. 動的ガントチャート & スティッキーラベルの継承。
 */

function generatePortal() {
    const projectRoot = process.cwd();
    const portalRoot = path.join(projectRoot, 'management/08_Documentation_Portal');
    const assetsDir = path.join(portalRoot, 'assets');

    if (!fs.existsSync(portalRoot)) fs.mkdirSync(portalRoot, { recursive: true });
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

    const engineCode = fs.readFileSync(path.join(projectRoot, '.agent/skills/aurora-gantt-engine.js'), 'utf8');

    const docConfig = [
        { section: "00 Project Master", items: { "Master Report": "management/00_Master/00_Master_Report.md" } },
        { section: "01 Requirements", items: { "Requirement Spec": "management/01_Requirements/01_Requirements.md" } },
        { section: "02 Planning", items: { "WBS & Planning": "management/02_Planning/02_Planning.md" } },
        { section: "03 Implementation", items: {
            "Phase 01 Report": "management/03_Implementation/Phase_01/Phase_01_Report.md",
            "Phase 02 Report": "management/03_Implementation/Phase_02/Phase_02_Report.md",
            "Phase 03 Report": "management/03_Implementation/Phase_03/Phase_03_Report.md",
            "Phase 04 Report": "management/03_Implementation/Phase_04/Phase_04_Report.md"
        } },
        { section: "04 Quality Gate", items: { 
            "QA Report": "management/04_Quality_Gate/04_Quality_Report.md",
            "Ph1 Verify Log": "management/04_Quality_Gate/02_Verification_Log_Phase_01.md",
            "Ph2 Verify Log": "management/04_Quality_Gate/02_Verification_Log_Phase_02.md",
            "Ph3 Verify Log": "management/04_Quality_Gate/02_Verification_Log_Phase_03.md"
        } },
        { section: "06 Delivery", items: { 
            "Release Notes": "management/06_Delivery/06-release-notes.md",
            "Delivery Note": "management/06_Delivery/06-delivery-note.md"
        } },
        { section: "07 Retrospective", items: { 
            "Team Retro": "management/07_Team_Retrospective/TEAM_EVOLUTION_REPORT_INC-003.md" 
        } }
    ];

    let liveGanttCode = "";
    const planningPath = path.join(projectRoot, "management/02_Planning/02_Planning.md");
    if(fs.existsSync(planningPath)) {
        const planningContent = fs.readFileSync(planningPath, 'utf8');
        const m = planningContent.match(/```mermaid[\s\S]*?gantt[\s\S]*?```/);
        if(m) liveGanttCode = m[0];
    }

    function processMarkdown(content, baseDir, isMaster = false) {
        if(isMaster && liveGanttCode) {
            content = content.replace(/!\[Current Status\]\(.*?\)/, liveGanttCode);
        }

        const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
        return content.replace(imgRegex, (match, alt, imgPath) => {
            let fileName = path.basename(imgPath);
            let fullPath = path.isAbsolute(imgPath) ? imgPath : path.resolve(baseDir, imgPath);
            if (fs.existsSync(fullPath)) {
                fs.copyFileSync(fullPath, path.join(assetsDir, fileName));
                return '![' + alt + '](./assets/' + fileName + ')';
            }
            return match;
        });
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
                content = processMarkdown(content, path.dirname(fullPath), label === "Master Report");
                docsData[conf.section][label] = content;
                pathMap[relPath] = [conf.section, label];
            } else {
                docsData[conf.section][label] = "# " + label + "\n\n> 現在この資料は準備中です。";
            }
        }
    });

    const safeDocsJson = JSON.stringify(docsData).replace(/<\/script>/g, '<\\/script>');
    const safePathMapJson = JSON.stringify(pathMap);
    
    let html = '<!DOCTYPE html>\n<html lang="ja">\n<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Aurora Project Playbook</title>\n' +
        '    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">\n' +
        '    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>\n' +
        '    <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>\n' +
        '    <style>\n' +
        '        body { background: #010204; color: #fff; font-family: "Outfit", sans-serif; margin: 0; display: flex; height: 100vh; overflow: hidden; }\n' +
        '        aside { width: 320px; background: #000; border-right: 1px solid #111; padding: 30px; overflow-y: auto; flex-shrink: 0; }\n' +
        '        .nav-label { color: #555; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px; margin: 40px 0 10px 10px; }\n' +
        '        .nav-item { padding: 12px 15px; border-radius: 12px; cursor: pointer; color: #888; font-size: 0.85rem; margin-bottom: 5px; transition: all 0.2s; }\n' +
        '        .nav-item:hover, .nav-item.active { background: rgba(0,242,254,0.1); color: #00f2fe; }\n' +
        '        main { flex: 1; padding: 60px; overflow-y: auto; background: #020306; scroll-behavior: smooth; }\n' +
        '        .content-card { max-width: 1000px; margin: 0 auto; background: rgba(255,255,255,0.02); padding: 60px; border-radius: 40px; border: 1px solid #111; box-shadow: 0 40px 100px rgba(0,0,0,0.6); }\n' +
        '        .content-card img { max-width: 100%; max-height: 60vh; margin: 30px auto; display: block; border-radius: 20px; border: 1px solid #333; object-fit: contain; }\n' +
        '        .gantt-action-btn { background: #00f2fe; color: #000; border: none; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; margin-left: 15px; font-size: 1.2rem; vertical-align: middle; transition: 0.3s; }\n' +
        '        .gantt-action-btn:hover { background: #fff; transform: scale(1.1); }\n' +
        '        .gantt-container { margin: 40px 0; border-radius: 15px; border: 1px solid #222; overflow-x: auto; background: #050608; position: relative; }\n' +
        '        #tooltip { position: fixed; display: none; background: rgba(10, 15, 25, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(0, 242, 254, 0.3); padding: 15px; border-radius: 16px; z-index: 9999; pointer-events: none; color: #fff; box-shadow: 0 10px 40px rgba(0,0,0,0.8); min-width: 220px; }\n' +
        '    </style>\n' +
        '</head>\n' +
        '<body>\n' +
        '    <aside id="sidebar"><div style="font-size:2.2rem; font-weight:600; margin-bottom:50px; color:#00f2fe; letter-spacing:-2px;">Aurora Playbook</div></aside>\n' +
        '    <main id="main-scroll"><div id="content-area" class="content-card"></div></main>\n' +
        '    <div id="tooltip"></div>\n' +
        '    <script>\n' +
        '        ' + engineCode + '\n\n' +
        '        var docs = ' + safeDocsJson + ';\n' +
        '        var pathMap = ' + safePathMapJson + ';\n' +
        '\n' +
        '        function loadDoc(section, file, element) {\n' +
        '            document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));\n' +
        '            if(!element) {\n' +
        '                // サイドバーから対応する項目を探してアクティブにする\n' +
        '                element = Array.from(document.querySelectorAll(".nav-item")).find(i => i.textContent === file);\n' +
        '            }\n' +
        '            if(element) element.classList.add("active");\n' +
        '            \n' +
        '            var area = document.getElementById("content-area");\n' +
        '            area.innerHTML = marked.parse(docs[section][file] || "");\n' +
        '            area.querySelectorAll("pre").forEach(pre => {\n' +
        '                var code = pre.querySelector("code");\n' +
        '                if(code && code.textContent.includes("gantt")) {\n' +
        '                    var prev = pre.previousElementSibling;\n' +
        '                    var heading = null;\n' +
        '                    while(prev) {\n' +
        '                        if(prev.tagName && prev.tagName.startsWith("H")) { heading = prev; break; }\n' +
        '                        prev = prev.previousElementSibling;\n' +
        '                    }\n' +
        '                    if(heading) {\n' +
        '                        var btn = document.createElement("button");\n' +
        '                        btn.className = "gantt-action-btn"; btn.innerHTML = "⛶";\n' +
        '                        btn.onclick = function() { window.openGanttFullscreen(code.textContent); };\n' +
        '                        heading.appendChild(btn);\n' +
        '                    }\n' +
        '                    var div = document.createElement("div");\n' +
        '                    div.className = "gantt-container";\n' +
        '                    pre.parentNode.replaceChild(div, pre);\n' +
        '                    if(typeof renderEnterpriseGantt === "function") {\n' +
        '                        var cleanCode = code.textContent.replace(/^mermaid\\s+/, "").trim();\n' +
        '                        renderEnterpriseGantt(cleanCode, div, false);\n' +
        '                    }\n' +
        '                }\n' +
        '            });\n' +
        '            document.getElementById("main-scroll").scrollTop = 0;\n' +
        '        }\n' +
        '\n' +
        '        // リンクインターセプター\n' +
        '        document.addEventListener("click", function(e) {\n' +
        '            const link = e.target.closest("a");\n' +
        '            if (!link) return;\n' +
        '            const href = link.getAttribute("href");\n' +
        '            if (!href) return;\n' +
        '\n' +
        '            // Markdownリンクの判定 (.md)\n' +
        '            if (href.includes(".md")) {\n' +
        '                e.preventDefault();\n' +
        '                // 相対パスの解決（management/ からのパスに正規化）\n' +
        '                let targetPath = href.replace(/^(\\.\\.\\/)+/, ""); // ../ を除去\n' +
        '                // pathMap から検索（後方一致などで柔軟に対応）\n' +
        '                for (let p in pathMap) {\n' +
        '                    if (p.endsWith(targetPath)) {\n' +
        '                        loadDoc(pathMap[p][0], pathMap[p][1]);\n' +
        '                        return;\n' +
        '                    }\n' +
        '                }\n' +
        '                console.warn("Target not found in pathMap:", href);\n' +
        '            }\n' +
        '        });\n' +
        '\n' +
        '        window.openGanttFullscreen = function(rawCode) {\n' +
        '            var s = renderEnterpriseGantt.toString();\n' +
        '            var h = "<!DOCTYPE html><html><head><meta charset=\'UTF-8\'><title>Aurora Ultra Gantt View</title>" +\n' +
        '                    "<script src=\'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js\'></" + "script>" +\n' +
        '                    "<style>body{background:#010204;color:#fff;margin:0;padding:40px;height:100vh;display:flex;align-items:center;box-sizing:border-box;overflow:hidden;font-family:sans-serif;}#mount{width:100%;height:100%;}#tooltip{position:fixed;display:none;background:rgba(10,15,25,0.85);backdrop-filter:blur(20px);border:1px solid rgba(0,242,254,0.3);padding:15px;border-radius:16px;z-index:9999;pointer-events:none;color:#fff;box-shadow:0 10px 40px rgba(0,0,0,0.8);min-width:220px;}</style></head>" +\n' +
        '                    "<body><div id=\'mount\'></div><div id=\'tooltip\'></div><script>" +\n' +
        '                    "const renderEnterpriseGantt = " + s + ";" +\n' +
        '                    "renderEnterpriseGantt(decodeURIComponent(escape(atob(\'" + btoa(unescape(encodeURIComponent(rawCode.replace(/^mermaid\\s+/, "").trim()))) + "\'))), document.getElementById(\'mount\'), true);" +\n' +
        '                    "</" + "script></body></html>";\n' +
        '            var w = window.open("", "_blank");\n' +
        '            w.document.open(); w.document.write(h); w.document.close();\n' +
        '        };\n' +
        '\n' +
        '        window.onload = function() {\n' +
        '            var sidebar = document.getElementById("sidebar");\n' +
        '            for (var section in docs) {\n' +
        '                var secLabel = document.createElement("div");\n' +
        '                secLabel.className = "nav-label";\n' +
        '                secLabel.textContent = section;\n' +
        '                sidebar.appendChild(secLabel);\n' +
        '                for (var label in docs[section]) {\n' +
        '                    var item = document.createElement("div");\n' +
        '                    item.className = "nav-item";\n' +
        '                    item.textContent = label;\n' +
        '                    (function(s, l, el){\n' +
        '                        item.onclick = function() { loadDoc(s, l, el); };\n' +
        '                    })(section, label, item);\n' +
        '                    sidebar.appendChild(item);\n' +
        '                }\n' +
        '            }\n' +
        '            const groups = Object.keys(docs);\n' +
        '            if(groups.length > 0) {\n' +
        '                loadDoc(groups[0], Object.keys(docs[groups[0]])[0], document.querySelector(".nav-item"));\n' +
        '            }\n' +
        '        };\n' +
        '    </script>\n' +
        '</body>\n' +
        '</html>';

    fs.writeFileSync(path.join(portalRoot, 'index.html'), html);
    console.log('BUILD v23.0 SUCCESS: Project Navigation & Link Hijacking Enabled.');
}

generatePortal();
