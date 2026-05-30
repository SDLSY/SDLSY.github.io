(() => {
  const canvas = document.querySelector("[data-signal-canvas]");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.5, y: 0.5, active: false };
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let start = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(260, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function line(points, color, widthValue, alpha = 1) {
    context.save();
    context.globalAlpha = alpha;
    context.strokeStyle = color;
    context.lineWidth = widthValue;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.stroke();
    context.restore();
  }

  function drawWave(yBase, amplitude, frequency, phase, color, alpha) {
    const points = [];
    const influence = pointer.active ? (pointer.y - 0.5) * 34 : 0;
    for (let x = 0; x <= width; x += 8) {
      const noise = Math.sin(x * 0.017 + phase * 1.6) * 5;
      const y = yBase + influence + Math.sin(x * frequency + phase) * amplitude + noise;
      points.push({ x, y });
    }
    line(points, color, 1.6, alpha);
  }

  function drawTrajectory(phase) {
    const points = [];
    const centerX = width * (0.5 + (pointer.x - 0.5) * 0.06);
    const centerY = height * 0.48;
    const radiusX = width * 0.26;
    const radiusY = height * 0.2;

    for (let i = 0; i < 190; i += 1) {
      const t = i / 188;
      const angle = t * Math.PI * 2.6 + phase * 0.18;
      const wobble = Math.sin(t * Math.PI * 8 + phase) * 18;
      points.push({
        x: centerX + Math.cos(angle) * (radiusX - t * 42) + wobble * 0.4,
        y: centerY + Math.sin(angle * 1.12) * (radiusY - t * 24) + wobble * 0.25
      });
    }
    line(points, "#173f7a", 1.8, 0.74);
    line(points.filter((_, index) => index % 2 === 0), "#167c66", 0.9, 0.42);
  }

  function drawNodes(phase) {
    const nodes = [
      [0.18, 0.28, "Ring"],
      [0.36, 0.42, "BLE"],
      [0.52, 0.29, "Android"],
      [0.68, 0.52, "Cloud"],
      [0.82, 0.34, "Agent"]
    ];

    context.save();
    context.font = "700 12px Inter, system-ui, sans-serif";
    context.textBaseline = "middle";
    nodes.forEach(([nx, ny, label], index) => {
      const pulse = Math.sin(phase * 1.8 + index) * 0.5 + 0.5;
      const x = nx * width;
      const y = ny * height;
      context.beginPath();
      context.fillStyle = `rgba(166, 11, 22, ${0.1 + pulse * 0.08})`;
      context.arc(x, y, 20 + pulse * 6, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.fillStyle = index % 2 === 0 ? "#a60b16" : "#167c66";
      context.arc(x, y, 4.5, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#111827";
      context.fillText(label, x + 12, y - 2);
    });
    context.restore();
  }

  function drawParticles(phase) {
    context.save();
    for (let i = 0; i < 42; i += 1) {
      const t = (phase * 0.05 + i / 42) % 1;
      const x = t * width;
      const lane = i % 3;
      const y = height * (0.24 + lane * 0.21) + Math.sin(t * Math.PI * 4 + i) * 15;
      context.fillStyle = lane === 1 ? "rgba(22,124,102,.58)" : "rgba(23,63,122,.42)";
      context.beginPath();
      context.arc(x, y, lane === 1 ? 2.2 : 1.6, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  }

  function drawAxes() {
    const originX = width * 0.72;
    const originY = height * 0.58;
    const length = Math.min(width, height) * 0.22;
    const axes = [
      [length, 0, "X"],
      [length * 0.42, -length * 0.52, "Y"],
      [0, -length * 0.75, "Z"]
    ];

    context.save();
    context.strokeStyle = "rgba(23,63,122,.22)";
    context.fillStyle = "rgba(23,63,122,.62)";
    context.lineWidth = 1.2;
    context.font = "800 12px Inter, system-ui, sans-serif";
    axes.forEach(([dx, dy, label]) => {
      context.beginPath();
      context.moveTo(originX, originY);
      context.lineTo(originX + dx, originY + dy);
      context.stroke();
      context.fillText(label, originX + dx + 6, originY + dy + 4);
    });
    context.restore();
  }

  function render(now) {
    const elapsed = prefersReducedMotion.matches ? 8 : (now - start) / 1000;
    context.clearRect(0, 0, width, height);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    context.save();
    context.strokeStyle = "rgba(17,24,39,.055)";
    context.lineWidth = 1;
    for (let x = 0; x < width; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += 48) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.restore();

    drawWave(height * 0.25, 20, 0.026, elapsed * 1.1, "#167c66", 0.78);
    drawWave(height * 0.74, 26, 0.018, elapsed * 0.86 + 1.2, "#a60b16", 0.52);
    drawAxes();
    drawTrajectory(elapsed);
    drawNodes(elapsed);
    drawParticles(elapsed);

    if (!prefersReducedMotion.matches) {
      animationFrame = window.requestAnimationFrame(render);
    }
  }

  function startAnimation() {
    window.cancelAnimationFrame(animationFrame);
    start = performance.now();
    render(start);
  }

  const observer = new ResizeObserver(() => {
    resize();
    startAnimation();
  });

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    pointer.active = true;
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  prefersReducedMotion.addEventListener("change", startAnimation);
  observer.observe(canvas);
})();
