/**
 * Aurora Project Directory Scanner v1.5 (Loud Debug)
 */

window.projectDocs = {}; 

function debug(msg, type = 'info') {
    console.log(`[Scanner] ${msg}`);
}

async function runAutoScan() {
    debug("Initializing Scan Sequence...");
    // 優先的に管理フォルダを掘り下げる
    const targets = ['/management/', '/'];
    
    for (const path of targets) {
        debug(`Probing path: ${path}`);
        await scanRecursive(path);
    }
    
    const count = Object.keys(window.projectDocs).length;
    debug(`Scan Complete. Found ${count} documents.`, count > 0 ? 'info' : 'error');
}

async function scanRecursive(url) {
    try {
        // キャッシュを完全にバイパスして通信
        const response = await fetch(url, { cache: "no-store", headers: { 'pragma': 'no-cache', 'cache-control': 'no-cache' } });
        
        if (!response.ok) {
            debug(`Access Denied: ${url} (Status: ${response.status})`, 'error');
            return;
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'));

        debug(`Processing ${links.length} links in ${url}...`);

        for (const link of links) {
            const href = link.getAttribute('href');
            
            // 下記のパターンは無視
            if (!href || href === '../' || href === './' || href.startsWith('.') || href.startsWith('?')) continue;
            if (href.includes('product') || href.includes('node_modules')) continue;

            // window.location.origin を基準にして絶対URLを作る
            const base = new URL(url, window.location.origin);
            const fullUrl = new URL(href, base).href;
            const pathname = new URL(fullUrl).pathname;

            if (pathname.endsWith('.md')) {
                debug(`Loading Document: ${pathname}`);
                try {
                    const fileRes = await fetch(fullUrl, { cache: "no-store" });
                    const mdText = await fileRes.text();
                    const docId = pathname.split('/').pop().replace('.md', '');
                    window.projectDocs[docId] = mdText;
                    debug(`Success: ${docId}`);
                } catch (e) {
                    debug(`Error loading ${pathname}: ${e.message}`, 'error');
                }
                
            } else if (href.endsWith('/')) {
                // ディレクトリを深掘り
                if (pathname.replace(/\/$/, '').split('/').length < 8) {
                    await scanRecursive(fullUrl);
                }
            }
        }
    } catch (err) {
        debug(`Critical Error at ${url}: ${err.message}`, 'error');
    }
}
