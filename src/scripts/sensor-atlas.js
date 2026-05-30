import * as THREE from "three";

const mount = document.querySelector("[data-atlas-scene]");

if (mount instanceof HTMLElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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

  const routeColors = [0xa60b16, 0x2366b8, 0x15845f, 0x7750b8, 0xe5a329, 0x1796a8];
  const routeAngles = [-2.55, -0.85, 0.02, 0.74, 1.58, 2.36];

  function makeRoute(angle, color) {
    const points = [];
    for (let i = 0; i < 80; i += 1) {
      const t = i / 79;
      const radius = 1.15 + t * 1.95;
      const bend = Math.sin(t * Math.PI) * 0.32;
      points.push(
        new THREE.Vector3(
          Math.cos(angle + bend) * radius,
          Math.sin(angle + bend) * radius * 0.72,
          -0.35 + Math.sin(t * Math.PI * 2) * 0.08
        )
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.52 })
    );
    routeGroup.add(line);

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(18 * 3);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color,
        size: 0.035,
        transparent: true,
        opacity: 0.72
      })
    );
    particles.userData.points = points;
    routeGroup.add(particles);
  }

  routeAngles.forEach((angle, index) => makeRoute(angle, routeColors[index]));

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

  const pointer = { x: 0, y: 0, active: false };

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
    const targetY = 0.58 + pointer.x * 0.22;
    const targetX = -0.52 + pointer.y * 0.16;
    root.rotation.y += (targetY - root.rotation.y) * 0.045;
    root.rotation.x += (targetX - root.rotation.x) * 0.045;
    root.rotation.z = -0.08 + Math.sin(time * 0.34) * 0.035;
    sensorGroup.rotation.z = -time * 0.22;
    routeGroup.rotation.z = Math.sin(time * 0.18) * 0.035;
    orbitGroup.rotation.z = time * 0.025;

    routeGroup.children.forEach((child, routeIndex) => {
      if (!(child instanceof THREE.Points)) return;
      const points = child.userData.points;
      const positions = child.geometry.attributes.position.array;
      for (let i = 0; i < 18; i += 1) {
        const cursor = Math.floor(((time * 12 + i * 5 + routeIndex * 11) % points.length));
        const point = points[cursor];
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }
      child.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
    if (!reducedMotion.matches) window.requestAnimationFrame(animate);
  }

  mount.addEventListener("pointermove", (event) => {
    const rect = mount.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointer.active = true;
  });

  mount.addEventListener("pointerleave", () => {
    pointer.x = 0;
    pointer.y = 0;
    pointer.active = false;
  });

  const observer = new ResizeObserver(() => {
    resize();
    renderer.render(scene, camera);
  });
  observer.observe(mount);
  reducedMotion.addEventListener("change", () => animate());
  resize();
  animate();
}
