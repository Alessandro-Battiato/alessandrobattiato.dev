### 3D Hero Section Globe

Install react-three-fiber.

Create `/src/components/3d/Globe.tsx`.

Requirements:

- A 3D globe-like animated object placed on the center-right side of the hero-section, basically intersecting with the radial gradient, it is mandatory to use the provided screenshots 'globe-dark-reference' and 'globe-light-reference' inside the /src/assets folder as a visual reference. Keep in mind how the globe reacts to the dark/light themes.
- The design, including the three-js code, was created using Google Stitch, as an appendix of this file, you can find the original code beneath.
- After a theme switch, ensure both rings update opacity and color, and also update all the lights in the scene accordingly. Check that the particles contained inside the globe also change color, do not initially calculate the color and keep the same one after the theme switches.
- Ensure the animation is the same for all devices, regardless of their refresh rate (for instance, the speed of the rotation should be the same across all devices)
- Instead of using a Math.random to place the particles inside the globe, introduce a seed so as to still guarantee a certain degree of randomness while still providing the same visual experience for all users visiting the website or for each refresh.

### Check when done

- final code is written in react-three-fiber
- the 3D globe reacts to mouse movement and changes colors on theme switching
- new components compile without TypeScript errors
- no lint errors

The code beneath is the main source of the 3D globe that we need to create, provided by Google Stitch, written in plain Three.js although using an extremely old version (r125), use the following snippet only as a reference against the requirements defined above, but priority goes to the most recent R3F code conventions:

<!-- STITCH_THREEJS_START:ANIMATION_32 class="fixed inset-0 w-full h-full bg-transparent" -->
<div class="fixed inset-0 w-full h-full bg-transparent" style="display:block;">
<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
<div id="threejs-container-ANIMATION_32" style="width:100%;height:100%"></div>
<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_32');
  const devicePixelRatio = window.devicePixelRatio || 1;
  (function() {
  const container = document.getElementById('threejs-hero-container') || document.getElementById('threejs-container') || document.body;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
// Camera esattamente identica a Demo 3 / SCREEN_6 (FOV 40, dist 11)
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
camera.position.set(0, 0, 11);

let renderer;
try {
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch(e) {
return;
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(width, height);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.inset = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
renderer.domElement.style.pointerEvents = 'none';
renderer.domElement.style.zIndex = '0';
container.appendChild(renderer.domElement);

// Group that holds the sculpture
const sculptureGroup = new THREE.Group();
scene.add(sculptureGroup);

function getTheme() {
const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
return {
isDark: isDark,
wireColor: isDark ? 0x3b82f6 : 0x2563eb,
coreGlow: isDark ? 0x60a5fa : 0x1d4ed8,
ringColor: isDark ? 0x1e293b : 0xe2e8f0,
coreBright: isDark ? 0xffffff : 0x60a5fa,
coreDeep: isDark ? 0x3b82f6 : 0x1e3a8a,
lightIntensity: isDark ? 2.5 : 3.2
};
}

let theme = getTheme();

// 1. Globo esterno: ESATTAMENTE identico a Demo 3 (IcosahedronGeometry 3.6, 3)
const outerGeo = new THREE.IcosahedronGeometry(3.6, 3);
const outerMat = new THREE.MeshStandardMaterial({
color: theme.wireColor,
wireframe: true,
transparent: true,
opacity: theme.isDark ? 0.35 : 0.45,
roughness: 0.2,
metalness: 0.8
});
const outerMesh = new THREE.Mesh(outerGeo, outerMat);
sculptureGroup.add(outerMesh);

// 2. Anelli orbitali: ESATTAMENTE identici a Demo 3 (TorusGeometry 4.3, 0.018)
const ringGeo = new THREE.TorusGeometry(4.3, 0.018, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({
color: theme.coreGlow,
transparent: true,
opacity: theme.isDark ? 0.4 : 0.35
});
const ring1 = new THREE.Mesh(ringGeo, ringMat);
ring1.rotation.x = Math.PI / 3;
sculptureGroup.add(ring1);

const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
ring2.rotation.y = Math.PI / 4;
ring2.rotation.x = -Math.PI / 6;
sculptureGroup.add(ring2);

// 3. AGGIUNTA DEL NUCLEO CENTRALE DI PARTICELLE LUMINOSE (identico a SCREEN*9 / SCREEN_12)
const pCount = 1800;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(pCount * 3);
const pBaseRadius = new Float32Array(pCount);
const pTheta = new Float32Array(pCount);
const pPhi = new Float32Array(pCount);
const pSpeed = new Float32Array(pCount);
const pColors = new Float32Array(pCount \_ 3);

const colorCore = new THREE.Color(theme.coreDeep);
const colorBright = new THREE.Color(theme.coreBright);
const coreRadius = 1.45; // Nucleo compatto centrale dentro la sfera di raggio 3.6

for (let i = 0; i < pCount; i++) {
const i3 = i _ 3;
const r = Math.pow(Math.random(), 1.35) _ coreRadius;
const th = Math.random() _ Math.PI _ 2;
const ph = Math.acos(2 \* Math.random() - 1);

    pBaseRadius[i] = r;
    pTheta[i] = th;
    pPhi[i] = ph;
    pSpeed[i] = 0.5 + Math.random() * 0.9;

    pPos[i3] = r * Math.sin(ph) * Math.cos(th);
    pPos[i3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pPos[i3 + 2] = r * Math.cos(ph);

    const isCenterGlow = r < coreRadius * 0.45;
    const c = isCenterGlow ? colorBright : colorCore.clone().lerp(colorBright, Math.random() * 0.7);
    pColors[i3] = c.r;
    pColors[i3 + 1] = c.g;
    pColors[i3 + 2] = c.b;

}

pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

// Texture ad alta nitidezza per i punti luce
const dotCanvas = document.createElement('canvas');
dotCanvas.width = 64;
dotCanvas.height = 64;
const dotCtx = dotCanvas.getContext('2d');
const radGrad = dotCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
radGrad.addColorStop(0, 'rgba(255,255,255,1.0)');
radGrad.addColorStop(0.3, 'rgba(224,242,254,0.92)');
radGrad.addColorStop(0.7, 'rgba(59,130,246,0.4)');
radGrad.addColorStop(1, 'rgba(0,0,0,0)');
dotCtx.fillStyle = radGrad;
dotCtx.fillRect(0, 0, 64, 64);
const dotTexture = new THREE.CanvasTexture(dotCanvas);

const pMat = new THREE.PointsMaterial({
size: 0.18,
vertexColors: true,
transparent: true,
opacity: 0.98,
map: dotTexture,
blending: THREE.AdditiveBlending,
depthWrite: false
});

const particleSphere = new THREE.Points(pGeo, pMat);
sculptureGroup.add(particleSphere);

// Lighting setup identico a Demo 3
const ambientLight = new THREE.AmbientLight(0xffffff, theme.isDark ? 0.6 : 0.9);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x3b82f6, theme.lightIntensity, 25);
pointLight1.position.set(5, 5, 6);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x60a5fa, theme.lightIntensity \* 0.7, 20);
pointLight2.position.set(-6, -4, 4);
scene.add(pointLight2);

// Posizionamento scultura identico a Demo 3 (3.2, 0.2, 0 su desktop)
function adjustPosition() {
if (window.innerWidth > 960) {
sculptureGroup.position.set(3.2, 0.2, 0);
sculptureGroup.scale.setScalar(1.0);
} else {
sculptureGroup.position.set(0, 0.8, -2);
sculptureGroup.scale.setScalar(0.75);
}
}
adjustPosition();

// Mouse interaction with smooth lerp (identico a Demo 3)
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
window.addEventListener('mousemove', (e) => {
mouse.targetX = (e.clientX / window.innerWidth) _ 2 - 1;
mouse.targetY = -(e.clientY / window.innerHeight) _ 2 + 1;
});

// Theme change updater
function onThemeChange() {
theme = getTheme();
outerMat.color.setHex(theme.wireColor);
outerMat.opacity = theme.isDark ? 0.35 : 0.45;
ringMat.color.setHex(theme.coreGlow);
ring2.material.color.setHex(theme.coreGlow);
pMat.opacity = theme.isDark ? 0.98 : 0.85;
ambientLight.intensity = theme.isDark ? 0.6 : 0.9;
pointLight1.intensity = theme.lightIntensity;
}
window.addEventListener('theme-changed', onThemeChange);
window.addEventListener('themechange', onThemeChange);

// Animation loop: rotazione identica a Demo 3 + pulsazione armonica nucleo particelle
let clock = new THREE.Clock();
function animate() {
requestAnimationFrame(animate);
const dt = clock.getDelta();
const t = clock.getElapsedTime();

    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Organic slow rotation + mouse tilt (identico a Demo 3)
    sculptureGroup.rotation.y = t * 0.12 + mouse.x * 0.45;
    sculptureGroup.rotation.x = Math.sin(t * 0.08) * 0.15 + mouse.y * 0.35;

    outerMesh.rotation.z = -t * 0.04;

    ring1.rotation.z = t * 0.15;
    ring2.rotation.z = -t * 0.12;

    // Movimento armonico del nucleo centrale di particelle
    const pPositions = pGeo.attributes.position.array;
    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      const currentTheta = pTheta[i] + t * 0.18 * pSpeed[i];
      const currentPhi = pPhi[i] + Math.sin(t * 0.8 + i) * 0.02;

      const breathing = 1.0 + Math.sin(t * 1.8 + i * 0.1) * 0.08;
      const r = pBaseRadius[i] * breathing;

      pPositions[i3] = r * Math.sin(currentPhi) * Math.cos(currentTheta);
      pPositions[i3 + 1] = r * Math.sin(currentPhi) * Math.sin(currentTheta);
      pPositions[i3 + 2] = r * Math.cos(currentPhi);
    }
    pGeo.attributes.position.needsUpdate = true;

    particleSphere.rotation.y = t * 0.06;
    particleSphere.rotation.z = Math.sin(t * 0.04) * 0.05;

    renderer.render(scene, camera);

}
animate();

window.addEventListener('resize', () => {
const w = container.clientWidth || window.innerWidth;
const h = container.clientHeight || window.innerHeight;
camera.aspect = w / h;
camera.updateProjectionMatrix();
renderer.setSize(w, h);
adjustPosition();
});
})();
})();
</script>

</div>
<!-- STITCH_THREEJS_END:ANIMATION_32 -->
