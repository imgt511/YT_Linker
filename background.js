/* YT_Linker V24 - Timestamp Link Fix */

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "launch-yt-linker",
    title: "YT_Linker",
    contexts: ["page", "video", "link"],
    documentUrlPatterns: ["*://www.youtube.com/*", "*://m.youtube.com/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "launch-yt-linker") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: launchV24
    });
  }
});

function launchV24() {
    var dashboardUrl = "https://www.youtube.com/feed/playlists";
    var id = 'yt-linker-ui-v24';
    
    var old = document.getElementById(id);
    if (old) old.remove();

    var savedSize = localStorage.getItem('yt_linker_font_size');
    var currentFontSize = savedSize ? parseInt(savedSize, 10) : 18;

    function updateFontSize(newSize) {
        currentFontSize = newSize;
        localStorage.setItem('yt_linker_font_size', newSize);
        
        var t = document.getElementById('yt-linker-title');
        if(t) t.style.fontSize = (newSize + 4) + 'px';
        
        var labels = document.querySelectorAll('.yt-linker-label');
        labels.forEach(function(el){ el.style.fontSize = (newSize - 2) + 'px'; });
        
        var areas = document.querySelectorAll('.yt-linker-area');
        areas.forEach(function(el){ el.style.fontSize = newSize + 'px'; });
        
        var btns = document.querySelectorAll('.yt-linker-btn');
        btns.forEach(function(el){ el.style.fontSize = (newSize - 2) + 'px'; });

        var helpCard = document.getElementById('yt-linker-help-card');
        if(helpCard) helpCard.style.fontSize = newSize + 'px';
    }

    var box = document.createElement('div');
    box.id = id;
    box.style.cssText = 'position:fixed;top:100px;right:40px;width:600px;min-height:300px;background:#0f0f0f;color:#e0e0e0;border:3px solid #39ff14;z-index:2147483647;padding:20px;border-radius:16px;font-family:sans-serif;box-shadow:0 0 25px rgba(57, 255, 20, 0.5);resize:both;overflow:auto;max-width:90vw;max-height:90vh;';

    var head = document.createElement('div');
    head.style.cssText = 'margin-bottom:20px;color:#fff;border-bottom:2px solid #333;padding-bottom:15px;display:flex;justify-content:space-between;cursor:grab;user-select:none;align-items:center;';

    var leftGroup = document.createElement('div');
    leftGroup.style.display = 'flex';
    leftGroup.style.alignItems = 'center';
    leftGroup.style.gap = '10px';

    var title = document.createElement('strong');
    title.id = 'yt-linker-title';
    title.innerText = 'YT_Linker';
    title.style.fontSize = (currentFontSize + 4) + 'px';
    leftGroup.appendChild(title);

    var controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '5px';
    controls.style.marginLeft = '20px';

    var btnDown = document.createElement('button');
    btnDown.innerText = 'A-';
    btnDown.style.cssText = 'background:#222;color:#aaa;border:1px solid #555;padding:2px 8px;cursor:pointer;border-radius:4px;font-weight:bold;font-size:12px;';
    btnDown.onclick = function() { if (currentFontSize > 10) updateFontSize(currentFontSize - 2); };

    var btnUp = document.createElement('button');
    btnUp.innerText = 'A+';
    btnUp.style.cssText = 'background:#222;color:#fff;border:1px solid #555;padding:2px 8px;cursor:pointer;border-radius:4px;font-weight:bold;font-size:12px;';
    btnUp.onclick = function() { if (currentFontSize < 40) updateFontSize(currentFontSize + 2); };
    
    var btnHelp = document.createElement('button');
    btnHelp.innerText = '?';
    btnHelp.style.cssText = 'background:#004400;color:#39ff14;border:1px solid #39ff14;padding:2px 10px;cursor:pointer;border-radius:50%;font-weight:bold;font-size:12px;margin-left:10px;';
    btnHelp.onclick = function() { showHelp(); };

    controls.appendChild(btnDown);
    controls.appendChild(btnUp);
    controls.appendChild(btnHelp);
    leftGroup.appendChild(controls);

    var close = document.createElement('span');
    close.innerText = '✕';
    close.style.cssText = 'cursor:pointer;color:#aaa;padding:5px 15px;font-weight:bold;font-size:24px;background:#222;border-radius:8px;';
    close.onclick = function() { box.remove(); };

    head.appendChild(leftGroup);
    head.appendChild(close);
    box.appendChild(head);

    var isDragging = false;
    var startX, startY, initialLeft, initialTop;
    head.onmousedown = function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA') return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = box.offsetLeft;
        initialTop = box.offsetTop;
        head.style.cursor = 'grabbing';
    };
    document.onmousemove = function(e) {
        if (isDragging) {
            var dx = e.clientX - startX;
            var dy = e.clientY - startY;
            box.style.left = (initialLeft + dx) + 'px';
            box.style.top = (initialTop + dy) + 'px';
            box.style.right = 'auto';
        }
    };
    document.onmouseup = function() {
        isDragging = false;
        head.style.cursor = 'grab';
    };

    function showHelp() {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:2147483648;display:flex;align-items:center;justify-content:center;';
        
        var card = document.createElement('div');
        card.id = 'yt-linker-help-card';
        card.style.cssText = 'background:#111;border:2px solid #39ff14;padding:1.5em;border-radius:12px;color:#eee;max-width:35em;font-family:sans-serif;line-height:1.5;box-shadow:0 0 50px rgba(57,255,20,0.2);overflow-y:auto;max-height:80vh;font-size:' + currentFontSize + 'px;';
        
        card.innerHTML = `
            <h2 style="color:#39ff14;margin-top:0;font-size:1.3em;">⚡️ QUICK GUIDE</h2>
            <p style="margin-bottom:0.5em;font-size:1em;"><strong>1. Resizing</strong></p>
            <div style="color:#aaa;font-size:0.9em;">Main window resizes via corner. Text boxes auto-fit width.</div>
            <p style="margin-bottom:0.5em;font-size:1em;"><strong>2. Voice (🎤)</strong></p>
            <div style="color:#aaa;font-size:0.9em;">Click to Record. Click to Stop.</div>
            <p style="margin-bottom:0.5em;font-size:1em;"><strong>3. Templates</strong></p>
            <ul style="margin-top:0;padding-left:1.2em;color:#aaa;font-size:0.9em;">
                <li><strong>Standard:</strong> Title + Duration</li>
                <li><strong>Timestamp:</strong> Deep link to current time</li>
            </ul>
            <button id="close-help-btn" style="width:100%;background:#39ff14;color:#000;border:none;padding:0.8em;font-weight:bold;margin-top:1em;cursor:pointer;border-radius:6px;font-size:1em;">GOT IT</button>
        `;
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        document.getElementById('close-help-btn').onclick = function() { overlay.remove(); };
        overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    }

    function getData() {
        var t = document.title.replace(/^\(\d+\)\s+/, '').replace(' - YouTube', '');
        var u = window.location.href.split('&')[0];
        var c = "Channel"; try { c = document.querySelector('#channel-name a').innerText; } catch (e) {}
        var d = "Video"; try { d = document.querySelector('.ytp-time-duration').innerText; } catch (e) {}
        return { t: t, u: u, c: c, d: d };
    }

    function getTime() {
        var ct = "00:00"; try { ct = document.querySelector('.ytp-time-current').innerText; } catch (e) {}
        var p = ct.split(':').reverse();
        var s = 0;
        if (p[0]) s += parseInt(p[0]);
        if (p[1]) s += parseInt(p[1]) * 60;
        if (p[2]) s += parseInt(p[2]) * 3600;
        return { disp: ct, sec: s };
    }

    function add(lbl, type) {
        var wrap = document.createElement('div');
        wrap.style.cssText = 'margin-bottom:30px;border-bottom:1px dashed #333;padding-bottom:20px;';

        var hLine = document.createElement('div');
        hLine.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';

        var label = document.createElement('div');
        label.className = 'yt-linker-label';
        label.innerText = lbl;
        label.style.cssText = 'color:#888;font-size:' + (currentFontSize - 2) + 'px;text-transform:uppercase;font-weight:bold;letter-spacing:1px;';
        hLine.appendChild(label);

        if (type === 'timestamp') {
            var sync = document.createElement('span');
            sync.innerText = '↻ SYNC TIME';
            sync.style.cssText = 'color:#39ff14;font-size:14px;cursor:pointer;border:2px solid #39ff14;padding:4px 10px;border-radius:6px;font-weight:bold;';
            hLine.appendChild(sync);
        }

        var inputCont = document.createElement('div');
        inputCont.style.cssText = 'display:flex; align-items:flex-start; gap:10px;';

        var area = document.createElement('textarea');
        area.className = 'yt-linker-area';
        area.style.cssText = 'flex-grow:1;height:90px;background:#1a1a1a;color:#fff;border:2px solid #444;border-radius:8px;padding:12px;box-sizing:border-box;font-family:monospace;font-size:' + currentFontSize + 'px;line-height:1.5;resize:vertical;';

        if (type !== 'playlist') {
            var mic = document.createElement('button');
            mic.innerText = '🎤';
            mic.style.cssText = 'background:#222;border:1px solid #444;border-radius:8px;padding:0;width:40px;height:90px;font-size:24px;cursor:pointer;opacity:0.8;transition:all 0.2s;filter:grayscale(100%);flex-shrink:0;';
            
            if ('webkitSpeechRecognition' in window) {
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = false; 
                recognition.interimResults = false;
                
                mic.onmouseover = function() { if(mic.style.filter) mic.style.borderColor = '#39ff14'; };
                mic.onmouseout = function() { if(mic.style.filter) mic.style.borderColor = '#444'; };

                mic.onclick = function() {
                    if (mic.style.filter === 'none') { 
                        recognition.stop(); 
                        mic.style.filter = 'grayscale(100%)'; 
                        mic.style.borderColor = '#444';
                        mic.style.boxShadow = 'none';
                    } else { 
                        mic.style.filter = 'none'; 
                        mic.style.borderColor = 'red';
                        mic.style.boxShadow = '0 0 10px red';
                        recognition.start(); 
                    }
                };
                recognition.onresult = function(event) {
                    if (event.results[0].isFinal) {
                        var transcript = event.results[0][0].transcript;
                        var val = area.value;
                        var placeholders = ["[Type context here]", "[Describe the moment]", "[Neutral description]"];
                        var found = false;
                        for(var i=0; i<placeholders.length; i++) {
                            if(val.includes(placeholders[i])) {
                                area.value = val.replace(placeholders[i], transcript);
                                found = true;
                                break;
                            }
                        }
                        if(!found) {
                            if(val.includes("🔗")) {
                                var parts = val.split("🔗");
                                area.value = parts[0].trim() + " " + transcript + "\n\n🔗" + parts[1];
                            } else {
                                area.value += " " + transcript;
                            }
                        }
                    }
                };
                recognition.onend = function() {
                    mic.style.filter = 'grayscale(100%)';
                    mic.style.borderColor = '#444';
                    mic.style.boxShadow = 'none';
                };
            } else { mic.style.display = 'none'; }
        }

        inputCont.appendChild(area);
        if (type !== 'playlist') inputCont.appendChild(mic);

        var d = getData(); var t = getTime();
        // LINK FIX: Replaced "?t=" with "&t=" below
        if (type === 'standard') area.value = "**" + d.t + "** 📺 (" + d.d + ")\n\n↳ **Context:** [Type context here]\n\n🔗 " + d.u;
        else if (type === 'timestamp') area.value = "⏩ **Skip to " + t.disp + "** – [Describe the moment]\n\n*\"[Quote or Detail]\"*\n\n🔗 " + d.u + "&t=" + t.sec;
        else if (type === 'safety') area.value = "**[Video]** by " + d.c + " • " + d.d + "\n\n📝 **Summary:** [Neutral description]\n\n🔗 " + d.u;
        else if (type === 'playlist') area.value = d.u;

        if (type === 'timestamp' && sync) {
            sync.onclick = function() {
                var nt = getTime(); var nd = getData();
                // LINK FIX: Replaced "?t=" with "&t=" below
                area.value = "⏩ **Skip to " + nt.disp + "** – [Describe the moment]\n\n*\"[Quote or Detail]\"*\n\n🔗 " + nd.u + "&t=" + nt.sec;
                area.style.borderColor = '#39ff14'; setTimeout(function() { area.style.borderColor = '#444'; }, 500);
            };
        }

        var row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:10px;margin-top:12px;';

        var copyBtn = document.createElement('button');
        copyBtn.className = 'yt-linker-btn';
        copyBtn.style.cssText = 'flex-grow:1;background:#222;color:#39ff14;border:2px solid #39ff14;padding:10px;cursor:pointer;border-radius:8px;font-weight:bold;font-size:' + (currentFontSize - 2) + 'px;text-transform:uppercase;';

        if (type === 'playlist') {
            copyBtn.innerText = 'COPY & OPEN DASHBOARD';
            copyBtn.onclick = function() {
                navigator.clipboard.writeText(area.value);
                window.open(dashboardUrl, '_blank');
                box.remove();
            };
        } else {
            copyBtn.innerText = 'Copy';
            copyBtn.onclick = function() {
                navigator.clipboard.writeText(area.value);
                copyBtn.innerText = 'COPIED!'; copyBtn.style.background = '#39ff14'; copyBtn.style.color = '#000';
                setTimeout(function() { copyBtn.innerText = 'Copy'; copyBtn.style.background = '#222'; copyBtn.style.color = '#39ff14'; }, 1500);
            };
            
            var copyExit = document.createElement('button');
            copyExit.className = 'yt-linker-btn';
            copyExit.innerText = 'Copy & Exit';
            copyExit.style.cssText = 'flex-grow:1;background:#222;color:#00ffff;border:2px solid #00ffff;padding:10px;cursor:pointer;border-radius:8px;font-weight:bold;font-size:' + (currentFontSize - 2) + 'px;text-transform:uppercase;';
            copyExit.onclick = function() { navigator.clipboard.writeText(area.value); box.remove(); };
            row.appendChild(copyExit);
        }

        var kill = document.createElement('button');
        kill.className = 'yt-linker-btn';
        kill.innerText = '✕';
        kill.style.cssText = 'background:#330000;color:#ff4444;border:2px solid #ff4444;padding:10px 18px;cursor:pointer;border-radius:8px;font-weight:bold;font-size:' + (currentFontSize - 2) + 'px;';
        kill.onclick = function() { wrap.remove(); };

        row.insertBefore(copyBtn, row.firstChild);
        row.appendChild(kill);
        wrap.appendChild(hLine);
        wrap.appendChild(inputCont);
        wrap.appendChild(row);
        box.appendChild(wrap);
    }

    add('Standard Context', 'standard');
    add('Timestamp Highlight', 'timestamp');
    add('Safety Summary', 'safety');
    add('Add to Playlist', 'playlist');
    document.body.appendChild(box);
}