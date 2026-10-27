# Trilha original 40s, 120 BPM, Lá menor (Am-F-C-G), sincronizada com o "Mito ou verdade?".
import numpy as np, wave, sys, os

SR = 44100; DUR = 40.0; N = int(SR * DUR)
BEAT = 0.5; BAR = 2.0
rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)

def t_(n): return np.arange(n) / SR
def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR); j = min(N, i + len(sig))
    if j <= i: return
    s = sig[:j - i] * gain
    L[i:j] += s * np.sqrt(0.5 * (1 - pan)) * 1.414 / 1.414
    R[i:j] += s * np.sqrt(0.5 * (1 + pan)) * 1.414 / 1.414
def env(n, a, d, curve=4.0):
    t = t_(n); e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-curve * np.maximum(0, t - a) / d)
    return e
def onepole_lp(x, cut):  # cut pode ser array
    y = np.zeros_like(x); c = np.broadcast_to(np.asarray(cut, float), x.shape)
    a = 1 - np.exp(-2 * np.pi * c / SR); acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc); y[i] = acc
    return y
def hz(m): return 440 * 2 ** ((m - 69) / 12)

# ---- instrumentos ----
def kick(g=1.0):
    n = int(0.45 * SR); t = t_(n)
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 7) * g + rng.normal(0, 1, n) * np.exp(-t * 300) * 0.15
def clap():
    n = int(0.25 * SR); t = t_(n); nz = rng.normal(0, 1, n)
    e = np.exp(-t * 22) + 0.6 * np.exp(-np.maximum(0, t - 0.012) * 30) * (t > 0.012)
    return np.diff(np.concatenate([[0], nz]))[:n] * e * 0.35
def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR); t = t_(n); nz = rng.normal(0, 1, n)
    hp = np.diff(np.concatenate([[0], nz]))
    return hp * np.exp(-t * (18 if open_ else 90)) * 0.12
def bass(m, dur):
    n = int(dur * SR); t = t_(n); f = hz(m)
    s = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + np.sin(2 * np.pi * f * t)
    return onepole_lp(s, 500) * env(n, 0.005, dur * 0.9, 2.5) * 0.55
def pluck(m, dur=0.35):
    n = int(dur * SR); t = t_(n); f = hz(m)
    s = (np.sin(2*np.pi*f*t) + 0.5*np.sin(2*np.pi*2*f*t) + 0.25*np.sin(2*np.pi*3*f*t)) * np.exp(-t * 9)
    return s * 0.16
def pad(notes, dur):
    n = int(dur * SR); t = t_(n); s = np.zeros(n)
    for m in notes:
        for det in (-0.12, 0, 0.12):
            f = hz(m + det); s += 2 * ((f * t + rng.random()) % 1) - 1
    s = onepole_lp(s / (len(notes) * 3), 1400)
    e = np.minimum(1, t / 0.4) * np.minimum(1, (dur - t) / 0.4)
    return s * e * 0.22
def impact(g=1.0):
    n = int(2.2 * SR); t = t_(n)
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t * 6)) / SR) * np.exp(-t * 1.8)
    nz = onepole_lp(rng.normal(0, 1, n), 3000) * np.exp(-t * 5) * 0.5
    return (boom + nz) * 0.8 * g
def whoosh(dur=0.6):
    n = int(dur * SR); t = t_(n); x = t / dur
    cut = 300 + 7000 * np.sin(np.pi * x) ** 2
    s = onepole_lp(rng.normal(0, 1, n), cut) * np.sin(np.pi * x) ** 1.5
    return s * 0.55
def riser(dur):
    n = int(dur * SR); t = t_(n); x = t / dur
    s = onepole_lp(rng.normal(0, 1, n), 200 + 6000 * x ** 2) * x ** 2 * 0.5
    tone = np.sin(2 * np.pi * np.cumsum(hz(57) * (1 + 3 * x ** 2)) / SR) * x ** 3 * 0.12
    return s + tone

# Progressão: Am F C G (1 acorde por compasso de 2s)
CH = [(57, [57, 60, 64, 69]), (53, [53, 57, 60, 65]), (48, [55, 60, 64, 67]), (55, [55, 59, 62, 67])]
def chord(bar): return CH[bar % 4]

# ---- estrutura do "Mito ou verdade?" (40s) ----
T_OPEN, T_ITEM, N_ITENS = 4.0, 6.0, 5
STAMP_AT = 2.4
T_END = T_OPEN + N_ITENS * T_ITEM  # 34s

def tick(m):
    n = int(0.06 * SR); t = t_(n)
    return np.sin(2 * np.pi * hz(m) * t) * np.exp(-t * 60) * 0.25

# abertura: MITO?/VERDADE? piscando a cada 0,3s, depois impacto no título
for k in range(4):
    add(pluck(64 if k % 2 == 0 else 69, 0.3) * 2.0, k * 0.3, 1.0, -0.3 + 0.6 * (k % 2))
    add(kick(0.6), k * 0.3)
add(impact(0.9), 1.2)
add(pad(CH[0][1], 2.9), 1.2, 0.9)
for i in range(5): add(hat(), 1.2 + i * 0.5, 0.6, 0.2)
add(riser(1.5), 2.5, 0.6)
for w in (3.7, T_END - 0.3): add(whoosh(0.6), w, 1.0, -0.3); add(whoosh(0.6), w + 0.02, 0.9, 0.3)

for i in range(N_ITENS):
    s0 = T_OPEN + i * T_ITEM
    if i > 0: add(whoosh(0.5), s0 - 0.35, 0.7)
    for b in range(3):
        root, notes = chord(i * 3 + b)
        add(pad(notes, BAR + 0.3), s0 + b * BAR, 1.0)
    # carimbo
    add(impact(0.75), s0 + STAMP_AT); add(clap(), s0 + STAMP_AT, 2.0)
    # tique-taque do "pensa aí", subindo de tom
    for k, tt in enumerate(np.arange(0.7, STAMP_AT - 0.15, 0.25)):
        add(tick(81 + (k % 2) * 5 + k // 2), s0 + tt, 1.0, 0.25 if k % 2 else -0.25)

steps = np.arange(T_OPEN, T_END, BEAT / 2)
for k, s in enumerate(steps):
    lt = (s - T_OPEN) % T_ITEM
    beat_pos = k % 4
    root, notes = chord(int((s - T_OPEN) // BAR))
    tension = 0.6 <= lt < STAMP_AT
    if tension:
        if beat_pos == 0: add(hat(), s, 0.5)
        if k % 2 == 0: add(bass(root - 12, BEAT / 2 * 0.5), s, 0.35)
        continue
    if beat_pos == 0: add(kick(1.0), s)
    if beat_pos == 2: add(hat(open_=True), s, 0.8, 0.25)
    else: add(hat(), s, 0.6 + 0.3 * (k % 2), -0.2)
    if beat_pos == 0 and int(s / BEAT) % 2 == 1: add(clap(), s, 1.0)
    if k % 2 == 0: add(bass(root - 12 + (12 if (k // 2) % 4 == 3 else 0), BEAT / 2 * 0.9), s, 0.8 if beat_pos else 1.0)
    if lt >= STAMP_AT:
        seq = [notes[0], notes[2], notes[1] + 12, notes[3], notes[2] + 12, notes[1], notes[3], notes[0] + 12]
        add(pluck(seq[k % 8] + 12), s, 1.0, 0.35 if k % 2 else -0.35)

# final 34–40s
add(impact(1.0), T_END)
for i in range(8):
    s = T_END + i * BEAT * 1.5
    if s < T_END + 4: add(kick(0.7), s) if i % 2 == 0 else add(hat(True), s, 0.6)
for i, m in enumerate([69, 72, 76, 81, 76, 72, 69, 64]):
    add(pluck(m, 0.6), T_END + i * 0.5, 0.9, -0.3 + 0.6 * (i % 2))
add(pad([45, 57, 60, 64, 69], 6.0), T_END, 1.1)

# ---- mix: eco simples, compressão suave, fade final ----
def echo(x, d, fb, mix):
    y = x.copy(); D = int(d * SR)
    for k in range(1, 5): y[D * k:] += x[:-D * k] * (fb ** k) * mix
    return y
L = echo(L, 0.375, 0.45, 0.35); R = echo(R, 0.25, 0.45, 0.35)
st = np.stack([L, R], 1)
st = np.tanh(st * 1.4) / np.tanh(1.4)
fade = np.ones(N); fn = int(1.2 * SR); fade[-fn:] = np.linspace(1, 0, fn) ** 1.5
st *= fade[:, None]
st /= np.max(np.abs(st)) / 0.89
out = (st * 32767).astype(np.int16)
os.makedirs(os.path.dirname(os.path.abspath(sys.argv[1])), exist_ok=True)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes())
print('ok')
