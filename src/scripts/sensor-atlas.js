import * as THREE from "three";

const mount = document.querySelector("[data-atlas-scene]");

if (mount instanceof HTMLElement) {
  const stage = mount.closest("[data-atlas-stage]");
  const nodeElements = stage ? Array.from(stage.querySelectorAll("[data-atlas-node]")) : [];
  const routeStops = Array.from(document.querySelectorAll("[data-route-stop]"));
  const readout = stage?.querySelector("[data-atlas-readout]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const routeMeta = [
    { key: "ring", color: 0xa60b16, angle: -2.55, tiltX: -0.05, tiltY: -0.12 },
    { key: "ble", color: 0x2366b8, angle: -0.85, tiltX: -0.04, tiltY: 0.16 },
    { key: "android", color: 0x15845f, angle: 0.02, tiltX: 0.02, tiltY: 0.22 },
    { key: "cloud", color: 0x7750b8, angle: 0.74, tiltX: 0.08, tiltY: 0.14 },
    { key: "agent", color: 0xe5a329, angle: 1.58, tiltX: 0.14, tiltY: 0.02 },
    { key: "imu", color: 0x1796a8, angle: 2.36, tiltX: 0.05, tiltY: -0.18 }
  ];
  const routeStopMap = new Map([
    ["01", "ring"],
    ["02", "imu"],
    ["03", "android"],
    ["04", "cloud"],
    ["05", "agent"]
  ]);
  const routeRecords = [];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.2, 6.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0xffffff, 0);
  mount.appendChild(renderer.domElement);

  const root = new THREE.Group();
  root.rotation.x = -0.52;
  root.rotation.y = 0.58;
  root.rotation.z = -0.08;
  root.scale.setScalar(0.88);
  scene.add(root);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.22, 36, 160),
    new THREE.MeshPhongMaterial({
      color: 0xded9d1,
      specular: 0xffffff,
      shininess: 72
    })
  );
  root.add(ring);

  const inner = new THREE.Mesh(
    new THREE.TorusGeometry(1.02, 0.05, 20, 120),
    new THREE.MeshStandardMaterial({
      color: 0x1b2433,
      metalness: 0.18,
      roughness: 0.5
    })
  );
  inner.rotation.z = 0.18;
  root.add(inner);

  const sensorMaterial = new THREE.MeshStandardMaterial({
    color: 0x101827,
    metalness: 0.18,
    roughness: 0.38
  });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xfff0cc });
  const sensorGroup = new THREE.Group();
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.1), sensorMaterial);
    block.position.set(Math.cos(angle) * 1.06, Math.sin(angle) * 1.06, -0.2);
    block.rotation.z = angle;
    sensorGroup.add(block);
  }
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), glowMaterial);
  glow.position.set(0.48, -0.78, -0.12);
  sensorGroup.add(glow);
  root.add(sensorGroup);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 4, 5);
  scene.add(light);
  const fillLight = new THREE.DirectionalLight(0xffffff, 1.6);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdbe7f8, 2.4));
  scene.add(new THREE.AmbientLight(0xffffff, 3.4));

  const routeGroup = new THREE.Group();
  scene.add(routeGroup);

  function makeRoute(meta) {
    const points = [];
    for (let i = 0; i < 80; i += 1) {
      const t = i / 79;
      const radius = 1.15 + t * 1.95;
      const bend = Math.sin(t * Math.PI) * 0.32;
      points.push(
        new THREE.Vector3(
          Math.cos(meta.angle + bend) * radius,
          Math.sin(meta.angle + bend) * radius * 0.72,
          -0.35 + Math.sin(t * Math.PI * 2) * 0.08
        )
      );
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: meta.color,
      transparent: true,
      opacity: 0.52
    });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial);
    routeGroup.add(line);

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(18 * 3);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: meta.color,
      size: 0.035,
      transparent: true,
      opacity: 0.72
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    routeGroup.add(particles);

    routeRecords.push({
      ...meta,
      points,
      line,
      particles,
      lineMaterial,
      particleMaterial
    });
  }

  routeMeta.forEach(makeRoute);

  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);
  for (let i = 0; i < 5; i += 1) {
    const curve = new THREE.EllipseCurve(0, 0, 1.35 + i * 0.38, 0.72 + i * 0.22, 0, Math.PI * 2);
    const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, point.y, -0.52));
    orbitGroup.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: i % 2 ? 0x173f7a : 0xa60b16,
          transparent: true,
          opacity: 0.1 + i * 0.025
        })
      )
    );
  }

  const pointer = { x: 0, y: 0, strength: 0 };
  let activeKey = "";
  let lockedKey = "";

  function setReadout(element) {
    if (!(readout instanceof HTMLElement)) return;
    const overline = readout.querySelector("span");
    const title = readout.querySelector("strong");
    const body = readout.querySelector("p");
    if (!overline || !title || !body) return;
    if (!element) {
      overline.textContent = "Explore route";
      title.textContent = "Sensor Atlas";
      body.textContent = "悬停或点击节点，查看信号从设备到智能体的流动路径。";
      return;
    }
    overline.textContent = element.dataset.detail || "Signal route";
    title.textContent = element.dataset.title || "Sensor Atlas";
    body.textContent = element.dataset.text || "";
  }

  function setActiveRoute(key, { lock = false } = {}) {
    if (lock) lockedKey = lockedKey === key ? "" : key;
    activeKey = key || lockedKey || "";
    const activeElement = nodeElements.find((node) => node.dataset.atlasNode === activeKey);
    setReadout(activeElement);

    stage?.classList.toggle("has-active", Boolean(activeKey));
    nodeElements.forEach((node) => {
      const isActive = node.dataset.atlasNode === activeKey;
      node.classList.toggle("is-active", isActive);
      node.classList.toggle("is-muted", Boolean(activeKey) && !isActive);
      node.setAttribute("aria-pressed", lockedKey === node.dataset.atlasNode ? "true" : "false");
    });

    routeStops.forEach((stop) => {
      const stopKey = routeStopMap.get(stop.dataset.routeStop || "");
      const isActive = stopKey === activeKey || (activeKey === "ble" && stopKey === "android");
      stop.classList.toggle("is-active", isActive);
    });

    routeRecords.forEach((record) => {
      const isActive = record.key === activeKey;
      const noActive = !activeKey;
      record.lineMaterial.opacity = noActive ? 0.52 : isActive ? 0.92 : 0.1;
      record.particleMaterial.opacity = noActive ? 0.72 : isActive ? 1 : 0.12;
      record.particleMaterial.size = noActive ? 0.035 : isActive ? 0.06 : 0.024;
    });
  }

  function resize() {
    const rect = mount.getBoundingClientRect();
    const width = Math.max(320, rect.width);
    const height = Math.max(320, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate(now = 0) {
    const time = reducedMotion.matches ? 2.6 : now / 1000;
    const activeRecord = routeRecords.find((record) => record.key === activeKey);
    const targetY = 0.58 + pointer.x * (0.2 + pointer.strength * 0.12) + (activeRecord?.tiltY || 0);
    const targetX = -0.52 + pointer.y * (0.15 + pointer.strength * 0.08) + (activeRecord?.tiltX || 0);
    root.rotation.y += (targetY - root.rotation.y) * 0.05;
    root.rotation.x += (targetX - root.rotation.x) * 0.05;
    root.rotation.z = -0.08 + Math.sin(time * 0.34) * 0.035;
    sensorGroup.rotation.z = -time * (0.22 + pointer.strength * 0.18 + (activeKey ? 0.08 : 0));
    routeGroup.rotation.z = Math.sin(time * 0.18) * (0.035 + pointer.strength * 0.025);
    orbitGroup.rotation.z = time * (0.025 + pointer.strength * 0.018);

    routeRecords.forEach((record, routeIndex) => {
      const isActive = record.key === activeKey;
      const speed = 12 + pointer.strength * 18 + (isActive ? 16 : 0);
      const positions = record.particles.geometry.attributes.position.array;
      for (let i = 0; i < 18; i += 1) {
        const cursor = Math.floor((time * speed + i * 5 + routeIndex * 11) % record.points.length);
        const point = record.points[cursor];
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }
      record.particles.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
    if (!reducedMotion.matches) window.requestAnimationFrame(animate);
  }

  const pointerTarget = stage || mount;
  pointerTarget.addEventListener("pointermove", (event) => {
    const rect = pointerTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    pointer.x = normalizedX * 2;
    pointer.y = normalizedY * 2;
    pointer.strength = Math.max(0, 1 - Math.hypot(normalizedX, normalizedY) * 1.65);
  });

  pointerTarget.addEventListener("pointerleave", () => {
    pointer.x = 0;
    pointer.y = 0;
    pointer.strength = 0;
    if (!lockedKey) setActiveRoute("");
  });

  nodeElements.forEach((node) => {
    const key = node.dataset.atlasNode || "";
    node.addEventListener("pointerenter", () => setActiveRoute(key));
    node.addEventListener("focus", () => setActiveRoute(key));
    node.addEventListener("pointerleave", () => {
      if (lockedKey) setActiveRoute(lockedKey);
      else setActiveRoute("");
    });
    node.addEventListener("blur", () => {
      if (lockedKey) setActiveRoute(lockedKey);
      else setActiveRoute("");
    });
    node.addEventListener("click", () => setActiveRoute(key, { lock: true }));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveRoute(key, { lock: true });
      }
    });
  });

  const routeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          entry.target.classList.add("is-revealed");
          routeObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px 24% 0px", threshold: 0.02 }
  );
  routeStops.forEach((stop, index) => {
    stop.classList.add("is-pending");
    stop.style.transitionDelay = `${index * 70}ms`;
    routeObserver.observe(stop);
  });

  const observer = new ResizeObserver(() => {
    resize();
    renderer.render(scene, camera);
  });
  observer.observe(mount);
  reducedMotion.addEventListener("change", () => animate());
  resize();
  setActiveRoute("");
  animate();
}
