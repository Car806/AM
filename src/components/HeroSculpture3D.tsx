import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface HeroSculpture3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

function createBrushedMetalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 1) {
      const shade = 114 + Math.floor(Math.sin(y * 0.75) * 12 + ((y * 37) % 22));
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export const HeroSculpture3D: React.FC<HeroSculpture3DProps> = ({ scrollProgressRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      const isSoftwareGl = detectSoftwareWebGL();
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = false;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
      camera.position.set(0, 0.1, 7.8);

      // Studio reflections
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const envScene = new RoomEnvironment();
      const envRT = pmremGenerator.fromScene(envScene, 0.04);
      scene.environment = envRT.texture;
      envScene.dispose();
      pmremGenerator.dispose();

      const brushedTex = createBrushedMetalTexture();
      brushedTex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

      // Material contrast (>= 0.25 roughness separation between adjacent parts)
      const brushedChromeMat = new THREE.MeshPhysicalMaterial({
        color: 0xd8dee5,
        metalness: 0.96,
        roughness: 0.16,
        roughnessMap: brushedTex,
        bumpMap: brushedTex,
        bumpScale: 0.006,
        clearcoat: 0.45,
        clearcoatRoughness: 0.12,
        anisotropy: 0.8,
        envMapIntensity: 1.3,
      });

      const matteGraphiteSteelMat = new THREE.MeshStandardMaterial({
        color: 0x171c23,
        metalness: 0.88,
        roughness: 0.48,
        roughnessMap: brushedTex,
        envMapIntensity: 1.0,
      });

      const obsidianGlossMat = new THREE.MeshPhysicalMaterial({
        color: 0x07090d,
        metalness: 0.7,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.45,
      });

      const smokedCrystalMat = new THREE.MeshPhysicalMaterial({
        color: 0x111a26,
        metalness: 0.12,
        roughness: 0.08,
        transparent: true,
        opacity: 0.58,
        clearcoat: 1.0,
        envMapIntensity: 1.5,
      });

      // Composite 7-part architectural brushed-metal monolith sculpture
      const sculpture = new THREE.Group();
      scene.add(sculpture);
      const geometriesToDispose: THREE.BufferGeometry[] = [];

      // Part 1: Sweeping primary brushed chrome monolith wing
      const wingShape = new THREE.Shape();
      wingShape.moveTo(-1.15, -2.05);
      wingShape.quadraticCurveTo(-0.35, -0.25, 0.92, 2.15);
      wingShape.lineTo(1.48, 1.85);
      wingShape.quadraticCurveTo(0.28, -0.45, -0.58, -2.18);
      wingShape.closePath();

      const wingGeo = new THREE.ExtrudeGeometry(wingShape, {
        depth: 0.34,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.06,
        bevelThickness: 0.07,
        curveSegments: 28,
      });
      wingGeo.center();
      geometriesToDispose.push(wingGeo);

      const primaryWing = new THREE.Mesh(wingGeo, brushedChromeMat);
      primaryWing.rotation.set(0.16, -0.34, 0.08);
      sculpture.add(primaryWing);

      // Part 2: Interlocking matte graphite-steel architectural slab
      const slabShape = new THREE.Shape();
      slabShape.moveTo(-1.65, 1.05);
      slabShape.lineTo(1.25, -0.28);
      slabShape.lineTo(1.08, -1.08);
      slabShape.lineTo(-1.75, 0.32);
      slabShape.closePath();

      const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
        depth: 0.24,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.055,
      });
      slabGeo.center();
      geometriesToDispose.push(slabGeo);

      const graphiteSlab = new THREE.Mesh(slabGeo, matteGraphiteSteelMat);
      graphiteSlab.position.set(-0.22, -0.1, -0.34);
      graphiteSlab.rotation.set(-0.14, 0.38, -0.22);
      sculpture.add(graphiteSlab);

      // Part 3: Deep obsidian glossy spine fin
      const spineShape = new THREE.Shape();
      spineShape.moveTo(-0.15, -1.78);
      spineShape.lineTo(0.68, -0.18);
      spineShape.lineTo(0.2, 1.68);
      spineShape.lineTo(-0.42, 0.32);
      spineShape.closePath();

      const spineGeo = new THREE.ExtrudeGeometry(spineShape, {
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.035,
        bevelThickness: 0.045,
      });
      spineGeo.center();
      geometriesToDispose.push(spineGeo);

      const obsidianSpine = new THREE.Mesh(spineGeo, obsidianGlossMat);
      obsidianSpine.position.set(0.36, 0.14, 0.36);
      obsidianSpine.rotation.set(0.24, -0.58, 0.14);
      sculpture.add(obsidianSpine);

      // Part 4: Sculptural brushed chrome rib arc (catches orange + blue edge reflections)
      const arcCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.35, -0.92, 0.58),
        new THREE.Vector3(-0.3, 0.24, 0.92),
        new THREE.Vector3(0.82, 0.88, 0.32),
        new THREE.Vector3(1.48, 0.28, -0.58),
      ]);
      const arcGeo = new THREE.TubeGeometry(arcCurve, 44, 0.095, 16, false);
      geometriesToDispose.push(arcGeo);
      const chromeArc = new THREE.Mesh(arcGeo, brushedChromeMat);
      sculpture.add(chromeArc);

      // Part 5: Smoked crystal refraction wedge
      const crystalGeo = new THREE.BoxGeometry(1.55, 0.68, 0.11);
      geometriesToDispose.push(crystalGeo);
      const smokedCrystal = new THREE.Mesh(crystalGeo, smokedCrystalMat);
      smokedCrystal.position.set(-0.38, 0.45, 0.48);
      smokedCrystal.rotation.set(0.28, 0.46, -0.34);
      sculpture.add(smokedCrystal);

      // Part 6: Chamfered industrial base blade
      const baseBladeGeo = new THREE.BoxGeometry(1.9, 0.26, 0.44);
      geometriesToDispose.push(baseBladeGeo);
      const baseBlade = new THREE.Mesh(baseBladeGeo, matteGraphiteSteelMat);
      baseBlade.position.set(0.18, -1.25, 0.12);
      baseBlade.rotation.set(0.18, -0.38, 0.28);
      sculpture.add(baseBlade);

      // Part 7: Polished chrome counterweight prism
      const counterGeo = new THREE.CylinderGeometry(0.18, 0.28, 0.92, 6);
      geometriesToDispose.push(counterGeo);
      const counterweight = new THREE.Mesh(counterGeo, brushedChromeMat);
      counterweight.position.set(1.06, -0.82, 0.26);
      counterweight.rotation.set(0.38, 0.28, -0.74);
      sculpture.add(counterweight);

      const getAnchorForWidth = (w: number) => {
        if (w >= 1024) {
          return { x: 1.55, y: 0.02, z: 0, scale: 1.04 };
        }
        if (w >= 640) {
          return { x: 1.15, y: 0.1, z: -0.45, scale: 0.84 };
        }
        // On narrow mobile screens, anchor upper-right so hero copy below/left has unobstructed contrast
        return { x: 0.96, y: 1.48, z: -1.65, scale: 0.62 };
      };

      const applyAnchor = (w: number) => {
        const a = getAnchorForWidth(w);
        sculpture.position.set(a.x, a.y, a.z);
        sculpture.scale.setScalar(a.scale);
      };
      applyAnchor(width);

      // Balanced warm orange / cool ice-blue lighting rig
      const hemiFill = new THREE.HemisphereLight(0x7debff, 0x050608, 0.42);
      scene.add(hemiFill);

      const orangeKey = new THREE.DirectionalLight(0xff5a1f, 4.1);
      orangeKey.position.set(5.4, -2.0, 3.8);
      scene.add(orangeKey);

      const orangeRim = new THREE.PointLight(0xff7a32, 20, 15, 1.5);
      orangeRim.position.set(3.2, -1.5, 2.2);
      scene.add(orangeRim);

      const iceKey = new THREE.DirectionalLight(0x7debff, 3.6);
      iceKey.position.set(-5.6, 4.2, 3.6);
      scene.add(iceKey);

      const iceRim = new THREE.PointLight(0x42bfff, 16, 15, 1.5);
      iceRim.position.set(-3.0, 2.5, 2.0);
      scene.add(iceRim);

      const topSpecular = new THREE.DirectionalLight(0xf5f7fa, 1.35);
      topSpecular.position.set(0.5, 4.8, 5.2);
      scene.add(topSpecular);

      const pointerTarget = { x: 0, y: 0 };
      const pointerCurrent = { x: 0, y: 0 };

      const onPointerMove = (e: PointerEvent) => {
        if (prefersReducedMotion) return;
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        pointerTarget.x = nx * 0.22;
        pointerTarget.y = ny * 0.14;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      let isInView = true;
      const observer = new IntersectionObserver(
        (entries) => {
          isInView = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.02 }
      );
      observer.observe(container);

      let disposed = false;
      let frameId = 0;
      const startTime = performance.now();
      let lastTime = startTime;
      let smoothedScroll = 0;

      const renderFrame = (dt: number, elapsed: number) => {
        const targetScroll = scrollProgressRef.current;
        const dampFactor = 1 - Math.exp(-5.5 * Math.min(dt, 0.1));
        smoothedScroll += (targetScroll - smoothedScroll) * dampFactor;

        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * dampFactor;
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * dampFactor;

        const idleRotY = prefersReducedMotion
          ? 0.22
          : Math.sin(elapsed * 0.28) * 0.18 + elapsed * 0.08 + 0.2;
        const idleRotX = prefersReducedMotion ? 0.06 : Math.cos(elapsed * 0.22) * 0.08 + 0.04;

        sculpture.rotation.y = idleRotY + smoothedScroll * 1.15 + pointerCurrent.x * 0.65;
        sculpture.rotation.x = idleRotX - smoothedScroll * 0.32 + pointerCurrent.y * 0.45;
        sculpture.rotation.z = smoothedScroll * 0.16;

        const w = container.clientWidth || window.innerWidth;
        const anchor = getAnchorForWidth(w);
        sculpture.position.x = anchor.x - smoothedScroll * (w >= 1024 ? 2.65 : 1.4);
        sculpture.position.y = anchor.y - smoothedScroll * 0.35;
        sculpture.position.z = anchor.z;

        if (!prefersReducedMotion) {
          orangeRim.position.y = -1.5 + Math.sin(elapsed * 0.6) * 0.45;
          iceRim.position.y = 2.5 + Math.cos(elapsed * 0.5) * 0.4;
        }

        renderer.render(scene, camera);
      };

      const onResize = () => {
        if (!container || disposed) return;
        const nw = container.clientWidth || window.innerWidth;
        const nh = container.clientHeight || window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
        applyAnchor(nw);
        const now = performance.now();
        renderFrame(0.016, (now - startTime) * 0.001);
      };
      window.addEventListener('resize', onResize);

      function afterDraw(cb: () => void) {
        if (disposed) return;
        const gl = renderer.getContext() as WebGL2RenderingContext;
        const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (!sync) {
          frameId = window.setTimeout(cb, 80);
          return;
        }
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      }

      // Immediate synchronous first render so screenshot / first paint is never blank
      renderFrame(0.016, 0);

      const tick = () => {
        if (disposed) return;
        const now = performance.now();
        const dt = (now - lastTime) * 0.001;
        const elapsed = (now - startTime) * 0.001;
        lastTime = now;

        if (isInView) {
          renderFrame(dt, elapsed);
        }

        if (prefersReducedMotion) return;

        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      };

      if (!prefersReducedMotion) {
        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      }

      return () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
        observer.disconnect();
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);

        geometriesToDispose.forEach((g) => g.dispose());
        brushedChromeMat.dispose();
        matteGraphiteSteelMat.dispose();
        obsidianGlossMat.dispose();
        smokedCrystalMat.dispose();
        brushedTex.dispose();
        envRT.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      setFallbackActive(true);
    }
  }, [scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      data-testid="hero-3d-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {fallbackActive && (
        <div className="absolute inset-0 flex items-center justify-end pr-[10%]">
          <div className="relative w-[420px] h-[420px] rotate-12 opacity-85">
            <div className="absolute inset-8 border border-[#7DEBFF]/30 bg-gradient-to-br from-[#D8DEE5]/20 via-[#171C23] to-[#050608] shadow-[inset_0_0_60px_rgba(125,235,255,0.2)]" />
            <div className="absolute inset-16 -rotate-24 border border-[#FF5A1F]/40 bg-gradient-to-tl from-[#FF5A1F]/25 via-[#0A0D12] to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
};
