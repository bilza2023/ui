🧩 15 Core Animation Primitives (value-transform styles)
#	Name	What the curve looks like	Typical use-cases	Math / Implementation note
1	Linear Tween	straight line 0→1	slides, simple moves	k = (t-start)/(end-start)
2	Ease-In	slow → fast	things “taking off”	cubic or quad: k^3
3	Ease-Out	fast → slow	things “settling”	1-(1-k)^3
4	Ease-In-Out	slow-fast-slow	polished moves	cubicBezier(.42,0,.58,1)
5	Step / Jump	sudden change	counters, score ticks	floor(k × steps)
6	Ping-Pong (Yoyo)	forward then reverse	back-and-forth sliders	k = (k<=.5)?2k:2(1-k)
7	Sine Oscillation	wave around a base	wiggle, rope, audio meter	value = base + A·sin(ωt)
8	Vibrate / Shake	high-freq jitter	button press feedback	small-A sine with random phase
9	Pulse	grow-shrink-grow	heartbeat, emphasis	scale = base + A·sin(πk)
10	Bounce-Out	fast drop, bounces up	ball drop, list pop	piece-wise poly easing
11	Back-Overshoot	go past then settle	elastic UI panels	(s+1)k^3 − s k^2
12	Elastic	springy overshoot many times	drawer, rubber band	sin(-13π/2 (k+1)) · 2^(-10k)
13	Random Jitter	noise around value	candle