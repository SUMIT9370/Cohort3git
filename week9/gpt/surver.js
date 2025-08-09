// Mini ChatGPT — Express server + improved UI + real LLM integration (one file)
// Save as server.js
// Requires: Node 18+ (has global fetch), or install node-fetch for older Node.
// Install: npm init -y && npm install express dotenv
// Run: Create a .env file with OPENAI_API_KEY and MODEL (e.g. gpt-4o-mini or gpt-4o). Then: node server.js

/*
Features:
- Single file: server + frontend
- Improved UI (chat bubbles, avatars, message history)
- Server-side LLM integration: OpenAI (via REST). Uses env var OPENAI_API_KEY.
- Safe: API key never sent to client
- Easy to swap provider: find the comment marked === PROVIDER SWITCH ===
*/

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple static page serving from memory (single-file convenience)
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Mini ChatGPT — Improved</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  :root{--bg:#0f1724;--card:#0b1220;--muted:#98a0b3;--accent:#7c3aed}
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,system-ui,Arial;background:linear-gradient(180deg,#071025 0%, #071426 100%);color:#e6eef8}
  .container{max-width:900px;margin:32px auto;border-radius:12px;overflow:hidden;box-shadow:0 10px 40px rgba(2,6,23,0.6)}
  .panel{display:grid;grid-template-columns:360px 1fr}
  .left{background:linear-gradient(180deg,#071025 0%, #08122a 100%);padding:18px}
  .brand{font-weight:700;font-size:18px;margin-bottom:12px}
  .history{height:600px;overflow:auto;border-radius:8px;padding:10px;background:rgba(255,255,255,0.02)}
  .session{padding:8px;border-radius:8px;margin-bottom:8px;background:rgba(255,255,255,0.01);cursor:pointer}
  .session:hover{background:rgba(255,255,255,0.03)}
  .right{background:var(--card);padding:18px;display:flex;flex-direction:column}
  .messages{flex:1;overflow:auto;padding:12px;border-radius:8px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))}
  .row{display:flex;margin-bottom:10px;align-items:flex-end}
  .row.user{justify-content:flex-end}
  .bubble{max-width:70%;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,0.03);line-height:1.4}
  .bubble.user{background:linear-gradient(90deg,#4f46e5,#06b6d4);color:white;border-radius:14px}
  .avatar{width:36px;height:36px;border-radius:50%;display:inline-block;margin-right:8px;flex-shrink:0;background:#0ea5a4;color:#012;text-align:center;line-height:36px;font-weight:700}
  .inputRow{display:flex;gap:8px;padding-top:12px}
  input[type=text]{flex:1;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit}
  button{padding:10px 14px;border-radius:10px;border:none;background:var(--accent);color:white;font-weight:600}
  .meta{font-size:12px;color:var(--muted);margin-top:8px}
  .small{font-size:13px;color:var(--muted)}
  .systemNote{font-size:12px;color:#ffd700;margin-bottom:8px}
</style>
</head>
<body>
  <div class="container">
    <div class="panel">
      <div class="left">
        <div class="brand">Mini ChatGPT — local demo</div>
        <div class="systemNote">Server-powered LLM — your API key stays on the server.</div>
        <div class="history" id="history"></div>
        <div class="meta">Tip: use short prompts. Model: <span id="modelName">(unknown)</span></div>
      </div>
      <div class="right">
        <div class="messages" id="messages"></div>
        <div class="inputRow">
          <input id="prompt" type="text" placeholder="Type a message — hit Enter or Send" />
          <button id="send">Send</button>
        </div>
        <div class="meta">Local demo. Don't paste secrets here.</div>
      </div>
    </div>
  </div>

<script>
const messagesEl = document.getElementById('messages');
const promptEl = document.getElementById('prompt');
const sendBtn = document.getElementById('send');
const historyEl = document.getElementById('history');
const modelNameEl = document.getElementById('modelName');

let sessions = [];
let currentSession = {id:Date.now(), title:'New chat', messages:[]};
function renderHistory(){
  historyEl.innerHTML = '';
  sessions.concat([currentSession]).slice().reverse().forEach(s=>{
    const d = document.createElement('div');
    d.className = 'session';
    d.innerText = s.title;
    d.onclick = ()=>{ currentSession = s; renderMessages(); }
    historyEl.appendChild(d);
  });
}

function renderMessages(){
  messagesEl.innerHTML = '';
  currentSession.messages.forEach(m=>{
    const r = document.createElement('div');
    r.className = 'row ' + (m.role==='user'? 'user':'');
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + (m.role==='user'? 'user':'');
    bubble.innerText = m.content;
    if(m.role==='assistant'){
      const left = document.createElement('div');
      left.style.display='flex';
      const av = document.createElement('div'); av.className='avatar'; av.innerText='AI';
      left.appendChild(av);
      left.appendChild(bubble);
      r.appendChild(left);
    } else {
      r.appendChild(bubble);
    }
    messagesEl.appendChild(r);
  });
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage(){
  const text = promptEl.value.trim();
  if(!text) return;
  // push user message
  currentSession.messages.push({role:'user',content:text});
  renderMessages();
  promptEl.value = '';
  // show temporary assistant bubble
  currentSession.messages.push({role:'assistant',content:'...thinking'});
  renderMessages();

  try{
    const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text, sessionId: currentSession.id})});
    const data = await res.json();
    // replace last assistant placeholder
    if(currentSession.messages.length>0 && currentSession.messages[currentSession.messages.length-1].content==='...thinking'){
      currentSession.messages.pop();
    }
    currentSession.messages.push({role:'assistant',content:data.reply});
    // update title if empty
    if(!currentSession.title || currentSession.title==='New chat'){
      currentSession.title = text.slice(0,30) + (text.length>30? '...':'');
      sessions.push(currentSession);
      currentSession = {id:Date.now(), title:'New chat', messages:[]};
    }
    renderHistory(); renderMessages();
  }catch(err){
    console.error(err);
    if(currentSession.messages.length>0 && currentSession.messages[currentSession.messages.length-1].content==='...thinking'){
      currentSession.messages.pop();
    }
    currentSession.messages.push({role:'assistant',content:'Error: could not reach server'});
    renderMessages();
  }
}

sendBtn.onclick = sendMessage;
promptEl.onkeydown = (e)=>{ if(e.key==='Enter') sendMessage(); }

// fetch server info (model name)
fetch('/api/info').then(r=>r.json()).then(j=>{ modelNameEl.innerText = j.model || '(none)'; }).catch(()=>{});

renderHistory(); renderMessages();
</script>
</body>
</html>`;

app.get('/', (req, res) => res.type('html').send(html));

// Simple info route so client can show model name
app.get('/api/info', (req, res) => {
  res.json({ model: process.env.MODEL || 'openai (env MODEL not set)' });
});

// === PROVIDER SWITCH ===
// By default this file calls OpenAI's Chat Completions endpoint.
// To switch to Google Gemini or another provider, replace the fetch logic below with that provider's REST call and adapt headers/body.

app.post('/api/chat', async (req, res) => {
  try{
    const { message, sessionId } = req.body || {};
    if(!message) return res.status(400).json({ error: 'no message' });

    // Build messages payload. For a real app you'd persist conversation and send history.
    const systemPrompt = process.env.SYSTEM_PROMPT || "You are a helpful assistant.";
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ];

    // ===== OPENAI CALL =====
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if(!OPENAI_API_KEY) return res.status(500).json({ error: 'Server missing OPENAI_API_KEY in env' });

    const model = process.env.MODEL || 'gpt-4o-mini';

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({ model, messages, max_tokens: 800 })
    });

    if(!resp.ok){
      const txt = await resp.text();
      console.error('OpenAI error', resp.status, txt);
      return res.status(502).json({ error: 'LLM provider error', details: txt });
    }

    const j = await resp.json();
    // pick the assistant text safely
    const reply = j.choices && j.choices[0] && (j.choices[0].message?.content || j.choices[0].text) || 'No reply';
    return res.json({ reply });

  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'server error', details: String(err) });
  }
});

app.listen(port, ()=> console.log(`Mini ChatGPT (LLM) running — http://localhost:${port}`));

/*
Notes & quick troubleshooting:
1) If you get a 500 about OPENAI_API_KEY: create .env with OPENAI_API_KEY=sk-... and MODEL=gpt-4o-mini (or gpt-4o, gpt-4o-mini-instruct).
2) Node version: this file uses ES modules (import). Run with node >= 18 and use package.json "type":"module" or run with --input-type=module. Easiest:
   - Add to package.json: { "type": "module" }
3) Want Gemini instead? Replace the /api/chat fetch block with the Gemini REST call (or the provider you prefer). Keep the same response shape.
4) This demo sends a single-turn context. For multi-turn, store session messages server-side and pass them in the provider payload.

Security tips:
- Never put your API key in client-side code.
- For production, add rate limits and authentication.

If this works for you, I can:
- Add streaming responses so assistant appears progressively.
- Persist sessions (JSON file or simple DB like SQLite).
- Make the UI prettier (avatars, markdown rendering, code blocks).

You're being honest — say which of those you want and I'll add the code.*/
