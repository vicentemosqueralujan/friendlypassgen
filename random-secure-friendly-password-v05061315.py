"""
[DBG] pipe=brainstorm>caveman>python>review mode=python tokens=low
"""
import secrets
import string
from flask import Flask, jsonify, request, render_template_string

app = Flask(__name__)

_SYMBOLS = "@#*!$%&?"
_FRIENDLY_SYMBOLS = [".", "$"]
_UPPER = string.ascii_uppercase
_LOWER = string.ascii_lowercase
_DIGITS = string.digits

_FRIENDLY_WORDS = [
    "apple", "bison", "coral", "dino", "ember", "fable", "grove", "haven",
    "ivory", "jade", "karma", "lemon", "mango", "noble", "ocean", "panda",
    "quill", "river", "solar", "tiger", "ultra", "violet", "willow", "xenon",
    "yacht", "zephyr", "amber", "blaze", "cedar", "daisy", "eagle", "frost",
    "glacier", "honey", "island", "jungle", "knight", "lotus", "maple",
    "nectar", "orbit", "quest", "ranch", "storm", "tundra",
    "urban", "venom", "walnut", "farm", "pixel", "sigma", "delta", "lunar",
    "comet", "prism", "scout", "forge", "swift", "brave", "crisp",
]


def generate_friendly(length: int) -> str:
    sep = secrets.choice(_FRIENDLY_SYMBOLS)
    num = str(secrets.randbelow(90) + 10)
    word_budget = max(2, length - 3)
    half = word_budget // 2
    w1 = secrets.choice(_FRIENDLY_WORDS)[:max(1, half)]
    w2 = secrets.choice(_FRIENDLY_WORDS)[:max(1, word_budget - len(w1))]
    raw = w1.lower() + sep + w2.capitalize() + num
    if len(raw) < length:
        raw += secrets.choice(_FRIENDLY_WORDS)[: length - len(raw)]
    return raw[:length]


def generate_secure(length: int) -> str:
    pool = _UPPER + _LOWER + _DIGITS + _SYMBOLS
    required = [
        secrets.choice(_UPPER),
        secrets.choice(_LOWER),
        secrets.choice(_DIGITS),
        secrets.choice(_SYMBOLS),
    ]
    remaining = max(0, length - len(required))
    chars = required + [secrets.choice(pool) for _ in range(remaining)]
    for i in range(len(chars) - 1, 0, -1):
        j = secrets.randbelow(i + 1)
        chars[i], chars[j] = chars[j], chars[i]
    return "".join(chars[:length])


HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Password Generator</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22 width=%2232%22 height=%2232%22><text y=%2226%22 font-size=%2228%22>🔒</text></svg>">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, sans-serif; }
  .mode-btn { transition: background 0.15s, color 0.15s; }
  .mode-btn.active { background: #0071E3; color: #fff; }
  .mode-btn:not(.active) { background: #E8E8ED; color: #1D1D1F; }
  #copy-btn { transition: background 0.15s; }
  input[type=range] { accent-color: #0071E3; }
</style>
</head>
<body class="bg-[#F5F5F7] min-h-screen flex items-center justify-center p-6">
  <div class="bg-white rounded-2xl shadow-sm border border-[#D2D2D7] w-full max-w-md p-8">

    <h1 class="text-xl font-bold text-[#1D1D1F] mb-6">🔒 Password Generator</h1>

    <div class="bg-[#F5F5F7] rounded-xl border border-[#D2D2D7] px-6 py-5 mb-6 text-center">
      <span id="pw-display" class="text-2xl font-bold text-[#1D1D1F] break-all select-all tracking-wide"></span>
    </div>

    <div class="flex items-center gap-3 mb-6">
      <button id="gen-btn" onclick="generate()"
        class="flex-1 bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#005BBB] text-white font-semibold rounded-xl py-3 text-sm transition-colors">
        ⚡ Generate
      </button>
      <button id="copy-btn" onclick="copyPassword()"
        class="bg-[#E8E8ED] hover:bg-[#D2D2D7] text-[#1D1D1F] font-semibold rounded-xl py-3 px-5 text-sm transition-colors">
        📋 Copy
      </button>
      <span id="copied-indicator" class="text-[#34C759] text-sm font-medium w-16 text-left opacity-0 transition-opacity">Copied!</span>
    </div>

    <div class="border-t border-[#D2D2D7] mb-5"></div>

    <p class="text-[#1D1D1F] text-sm font-semibold mb-4">⚙️ Settings</p>

    <div class="flex items-center gap-3 mb-5">
      <span class="text-sm text-[#1D1D1F] w-20 shrink-0">📏 Length</span>
      <input id="length-slider" type="range" min="12" max="30" value="12"
        oninput="onSlider(this.value)"
        class="flex-1 h-1.5 rounded-full cursor-pointer" />
      <span id="length-val" class="text-sm text-[#1D1D1F] w-6 text-right font-medium">12</span>
    </div>

    <div class="flex items-center gap-3 mb-6">
      <span class="text-sm text-[#1D1D1F] w-20 shrink-0">🎨 Mode</span>
      <div class="flex gap-2">
        <button id="btn-friendly" onclick="setMode('friendly')"
          class="mode-btn active rounded-lg px-4 py-1.5 text-sm font-medium cursor-pointer">Friendly</button>
        <button id="btn-secure" onclick="setMode('secure')"
          class="mode-btn rounded-lg px-4 py-1.5 text-sm font-medium cursor-pointer">Secure</button>
      </div>
    </div>

    <p class="text-center text-[#FF3B30] text-xs font-medium leading-snug mb-2">
      ⚠️ Disclaimer: Passwords generated are for internal use only. Use at your own responsibility.
    </p>
    <p class="text-center text-[#6E6E73] text-xs">developed by Atlantis Animation IT Team</p>

  </div>

<script>
  let currentMode = 'friendly';
  let currentLength = 12;

  async function generate() {
    const res = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ length: currentLength, mode: currentMode })
    });
    const data = await res.json();
    document.getElementById('pw-display').textContent = data.password;
    const ind = document.getElementById('copied-indicator');
    ind.style.opacity = '0';
  }

  function onSlider(val) {
    currentLength = parseInt(val);
    document.getElementById('length-val').textContent = val;
    generate();
  }

  function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-friendly').classList.toggle('active', mode === 'friendly');
    document.getElementById('btn-secure').classList.toggle('active', mode === 'secure');
    generate();
  }

  async function copyPassword() {
    const pw = document.getElementById('pw-display').textContent;
    if (!pw) return;
    try {
      await navigator.clipboard.writeText(pw);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = pw;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    const ind = document.getElementById('copied-indicator');
    ind.style.opacity = '1';
    setTimeout(() => { ind.style.opacity = '0'; }, 2000);
  }

  generate();
</script>
</body>
</html>"""


@app.route("/")
def index():
    return render_template_string(HTML)


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json(force=True, silent=True) or {}
    try:
        length = max(12, min(30, int(data.get("length", 12))))
    except (ValueError, TypeError):
        length = 12
    mode = data.get("mode", "friendly")
    password = generate_friendly(length) if mode == "friendly" else generate_secure(length)
    return jsonify({"password": password})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
