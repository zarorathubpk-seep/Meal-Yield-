// Premium Pixar-inspired 3D cartoon chef character assembled procedurally with Three.js
// Compliant with Three.js skill:
// - 3-12 composite parts across silhouette scales
// - Procedural PBR materials (uniform cloth, golden skin, glossy copper cloche, felt hat)
// - RoomEnvironment procedural studio reflections
// - Facial features: expressive anime eyes, rosy cheeks, mustache, moving smile mouth
// - Articulated rig: head, torso, waving arm, cloche platter arm, legs, rotating plate

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type ChefAction = 'idle' | 'wave' | 'dance' | 'laugh' | 'present' | 'talk';

export class Chef3DScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public rootGroup: THREE.Group;

  // Rig components for kinetic animation
  private chefRig!: {
    headGroup: THREE.Group;
    hatGroup: THREE.Group;
    bodyGroup: THREE.Group;
    leftArmGroup: THREE.Group;
    rightArmGroup: THREE.Group;
    leftLegGroup: THREE.Group;
    rightLegGroup: THREE.Group;
    clocheGroup: THREE.Group;
    mouthMesh: THREE.Mesh;
    leftEye: THREE.Mesh;
    rightEye: THREE.Mesh;
    leftPupil: THREE.Mesh;
    rightPupil: THREE.Mesh;
    leftArmLower: THREE.Group;
    rightArmLower: THREE.Group;
  };

  private isSoftwareGl: boolean;
  private animFrameId = 0;
  private clock = new THREE.Clock();
  private currentAction: ChefAction = 'idle';
  private actionTimer = 0;
  private isSpeaking = false;
  private blinkTimer = 0;
  private isBlinking = false;
  private mouseRotateTarget = 0;
  private mouseRotateCurrent = 0;
  private isHovered = false;

  constructor(container: HTMLDivElement) {
    this.scene = new THREE.Scene();

    const width = container.clientWidth || 120;
    const height = container.clientHeight || 135;

    this.camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    this.camera.position.set(0, 0.95, 4.05);

    // Detect software rendering
    this.isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // Studio Environment map via RoomEnvironment
    try {
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    } catch {
      // fallback to basic lights
    }

    // 3-Point Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.2);
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = !this.isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 512;
      keyLight.shadow.mapSize.height = 512;
      keyLight.shadow.bias = -0.001;
    }
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdaf2ff, 1.2);
    fillLight.position.set(-3, 2, 2);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffd199, 1.8);
    rimLight.position.set(0, 3, -3);
    this.scene.add(rimLight);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x3d3024, 0.7);
    this.scene.add(hemi);

    // Root Group
    this.rootGroup = new THREE.Group();
    this.rootGroup.position.set(0, -0.1, 0);
    this.scene.add(this.rootGroup);

    // Build the 3D Chef Character
    this.buildChefCharacter();

    // Soft ground contact shadow
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x142018,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    this.rootGroup.add(shadowPlane);

    // Start Animation Loop
    this.animate();
  }

  private buildChefCharacter() {
    // PBR Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffd1b3,
      roughness: 0.55,
      metalness: 0.05,
    });

    const chefCoatMat = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.35,
      metalness: 0.05,
    });

    const chefTrimMat = new THREE.MeshStandardMaterial({
      color: 0x143d2b, // Meal Yield Forest Green
      roughness: 0.4,
      metalness: 0.1,
    });

    const chefRedScarfMat = new THREE.MeshStandardMaterial({
      color: 0xc85a32, // Meal Yield Warm Terracotta Accent
      roughness: 0.5,
      metalness: 0.05,
    });

    const hatMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.02,
    });

    const eyeWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });

    const pupilMat = new THREE.MeshStandardMaterial({
      color: 0x111c14,
      roughness: 0.1,
    });

    const clocheTrayMat = new THREE.MeshStandardMaterial({
      color: 0xe6e6e6,
      roughness: 0.2,
      metalness: 0.85,
    });

    const clocheDomeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Polished royal gold
      roughness: 0.18,
      metalness: 0.9,
    });

    const shoesMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4,
    });

    // 1. TORSO / CHEF COAT (Chubby cute cartoon silhouette)
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, 0.7, 0);

    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.46, 0.7, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, chefCoatMat);
    torsoMesh.castShadow = true;
    bodyGroup.add(torsoMesh);

    // Chef coat buttons (double breasted)
    for (let row = -1; row <= 1; row++) {
      for (let col of [-0.09, 0.09]) {
        const btnGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12);
        const btn = new THREE.Mesh(btnGeo, chefTrimMat);
        btn.rotation.x = Math.PI / 2;
        btn.position.set(col, row * 0.15 + 0.05, 0.43);
        bodyGroup.add(btn);
      }
    }

    // Chef Neckerchief Scarf
    const scarfGeo = new THREE.TorusGeometry(0.35, 0.07, 12, 24);
    const scarf = new THREE.Mesh(scarfGeo, chefRedScarfMat);
    scarf.rotation.x = Math.PI / 2;
    scarf.position.set(0, 0.38, 0);
    bodyGroup.add(scarf);

    // Scarf knot & tails
    const knotGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const knot = new THREE.Mesh(knotGeo, chefRedScarfMat);
    knot.position.set(0, 0.36, 0.38);
    bodyGroup.add(knot);

    // 2. HEAD GROUP
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);

    // Chubby face sphere
    const headGeo = new THREE.SphereGeometry(0.42, 24, 24);
    headGeo.scale(1.05, 1.0, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Rosy Cheeks
    const cheekMat = new THREE.MeshBasicMaterial({
      color: 0xff8c8c,
      transparent: true,
      opacity: 0.6,
    });
    [-0.24, 0.24].forEach((x) => {
      const cheekGeo = new THREE.SphereGeometry(0.09, 12, 12);
      cheekGeo.scale(1, 0.6, 0.3);
      const cheek = new THREE.Mesh(cheekGeo, cheekMat);
      cheek.position.set(x, -0.06, 0.38);
      headGroup.add(cheek);
    });

    // Cute Round Nose
    const noseGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, 0.02, 0.43);
    headGroup.add(nose);

    // Big Pixar Expressive Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), eyeWhiteMat);
    leftEye.position.set(-0.14, 0.12, 0.37);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), eyeWhiteMat);
    rightEye.position.set(0.14, 0.12, 0.37);
    headGroup.add(rightEye);

    // Pupils with catchlight reflections
    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), pupilMat);
    leftPupil.position.set(-0.14, 0.12, 0.44);
    headGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), pupilMat);
    rightPupil.position.set(0.14, 0.12, 0.44);
    headGroup.add(rightPupil);

    // Gentle eyebrows
    const browGeo = new THREE.BoxGeometry(0.1, 0.025, 0.02);
    const browMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b });
    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.15, 0.23, 0.4);
    leftBrow.rotation.z = 0.1;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.15, 0.23, 0.4);
    rightBrow.rotation.z = -0.1;
    headGroup.add(rightBrow);

    // French Curled Chef Mustache
    const mustacheGroup = new THREE.Group();
    mustacheGroup.position.set(0, -0.06, 0.42);
    const stacheMat = new THREE.MeshStandardMaterial({ color: 0x3d2010, roughness: 0.5 });
    [-0.08, 0.08].forEach((x, i) => {
      const halfGeo = new THREE.CylinderGeometry(0.03, 0.005, 0.16, 12);
      const half = new THREE.Mesh(halfGeo, stacheMat);
      half.rotation.z = (i === 0 ? 1 : -1) * (Math.PI / 2.3);
      half.position.set(x, 0, 0);
      mustacheGroup.add(half);
    });
    headGroup.add(mustacheGroup);

    // Animated Mouth (scales when talking/smiling)
    const mouthGeo = new THREE.TorusGeometry(0.08, 0.025, 8, 16, Math.PI);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x7a1818 });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.rotation.z = Math.PI;
    mouthMesh.position.set(0, -0.16, 0.38);
    headGroup.add(mouthMesh);

    // 3. ICONIC CHEF TOQUE HAT
    const hatGroup = new THREE.Group();
    hatGroup.position.set(0, 0.38, 0);

    // Hat headband
    const hatBandGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.14, 24);
    const hatBand = new THREE.Mesh(hatBandGeo, chefTrimMat);
    hatGroup.add(hatBand);

    // Puffy top (composite clouds of pleats)
    const hatPuffGeo = new THREE.CylinderGeometry(0.48, 0.35, 0.45, 24);
    const hatPuff = new THREE.Mesh(hatPuffGeo, hatMat);
    hatPuff.position.set(0, 0.25, 0);
    hatPuff.castShadow = true;
    hatGroup.add(hatPuff);

    // Mushroom cloud top
    const hatTopGeo = new THREE.SphereGeometry(0.48, 20, 20);
    hatTopGeo.scale(1.0, 0.5, 1.0);
    const hatTop = new THREE.Mesh(hatTopGeo, hatMat);
    hatTop.position.set(0, 0.48, 0);
    hatGroup.add(hatTop);

    headGroup.add(hatGroup);

    // 4. ARMS & HANDS
    // Left Arm (Interactive waving/gesturing arm)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.46, 0.95, 0);

    const bicepGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.3, 16);
    const leftBicep = new THREE.Mesh(bicepGeo, chefCoatMat);
    leftBicep.position.set(0, -0.15, 0);
    leftArmGroup.add(leftBicep);

    const leftArmLower = new THREE.Group();
    leftArmLower.position.set(0, -0.3, 0);
    const forearmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.28, 16);
    const leftForearm = new THREE.Mesh(forearmGeo, chefCoatMat);
    leftForearm.position.set(0, -0.14, 0);
    leftArmLower.add(leftForearm);

    // Hand mitten/fingers
    const handGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(0, -0.28, 0);
    leftArmLower.add(leftHand);

    leftArmGroup.add(leftArmLower);

    // Right Arm (Serving cloche tray arm)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.46, 0.95, 0);

    const rightBicep = new THREE.Mesh(bicepGeo, chefCoatMat);
    rightBicep.position.set(0, -0.15, 0);
    rightArmGroup.add(rightBicep);

    const rightArmLower = new THREE.Group();
    rightArmLower.position.set(0, -0.3, 0);
    const rightForearm = new THREE.Mesh(forearmGeo, chefCoatMat);
    rightForearm.position.set(0, -0.14, 0);
    rightArmLower.add(rightForearm);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0, -0.28, 0);
    rightArmLower.add(rightHand);

    // Cloche Platter & Serving Dome
    const clocheGroup = new THREE.Group();
    clocheGroup.position.set(0, -0.32, 0.1);

    // Flat Platter Tray
    const trayGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.025, 24);
    const tray = new THREE.Mesh(trayGeo, clocheTrayMat);
    tray.castShadow = true;
    clocheGroup.add(tray);

    // Golden Serving Dome (Cloche)
    const domeGeo = new THREE.SphereGeometry(0.24, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, clocheDomeMat);
    dome.position.set(0, 0.015, 0);
    dome.castShadow = true;
    clocheGroup.add(dome);

    // Cloche Knob Handle
    const knobGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const knob = new THREE.Mesh(knobGeo, clocheDomeMat);
    knob.position.set(0, 0.25, 0);
    clocheGroup.add(knob);

    rightArmLower.add(clocheGroup);
    rightArmGroup.add(rightArmLower);

    // 5. LEGS & SHOES
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.18, 0.35, 0);
    const legGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.35, 16);
    const leftPants = new THREE.Mesh(legGeo, chefTrimMat);
    leftPants.position.set(0, -0.15, 0);
    leftLegGroup.add(leftPants);
    const shoeGeo = new THREE.BoxGeometry(0.14, 0.1, 0.24);
    const leftShoe = new THREE.Mesh(shoeGeo, shoesMat);
    leftShoe.position.set(0, -0.32, 0.04);
    leftLegGroup.add(leftShoe);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.18, 0.35, 0);
    const rightPants = new THREE.Mesh(legGeo, chefTrimMat);
    rightPants.position.set(0, -0.15, 0);
    rightLegGroup.add(rightPants);
    const rightShoe = new THREE.Mesh(shoeGeo, shoesMat);
    rightShoe.position.set(0, -0.32, 0.04);
    rightLegGroup.add(rightShoe);

    // Assemble all into root
    this.rootGroup.add(bodyGroup);
    this.rootGroup.add(headGroup);
    this.rootGroup.add(leftArmGroup);
    this.rootGroup.add(rightArmGroup);
    this.rootGroup.add(leftLegGroup);
    this.rootGroup.add(rightLegGroup);

    this.chefRig = {
      headGroup,
      hatGroup,
      bodyGroup,
      leftArmGroup,
      rightArmGroup,
      leftLegGroup,
      rightLegGroup,
      clocheGroup,
      mouthMesh,
      leftEye,
      rightEye,
      leftPupil,
      rightPupil,
      leftArmLower,
      rightArmLower,
    };
  }

  public setAction(action: ChefAction, duration = 3.5) {
    this.currentAction = action;
    this.actionTimer = duration;
  }

  public setSpeaking(speaking: boolean) {
    this.isSpeaking = speaking;
  }

  public setMouseRotation(normX: number) {
    // normX between -1 and 1
    this.mouseRotateTarget = normX * 0.8;
  }

  public setHovered(hovered: boolean) {
    this.isHovered = hovered;
  }

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const dt = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth rotational damping toward mouse angle
    this.mouseRotateCurrent = THREE.MathUtils.damp(
      this.mouseRotateCurrent,
      this.mouseRotateTarget,
      5,
      dt
    );
    this.rootGroup.rotation.y = this.mouseRotateCurrent;

    // Action timer countdown
    if (this.actionTimer > 0) {
      this.actionTimer -= dt;
      if (this.actionTimer <= 0) {
        this.currentAction = 'idle';
      }
    }

    // Natural Eye Blinking
    this.blinkTimer += dt;
    if (!this.isBlinking && this.blinkTimer > 3.2 + Math.sin(time) * 1.5) {
      this.isBlinking = true;
      this.blinkTimer = 0;
    }
    if (this.isBlinking) {
      this.chefRig.leftEye.scale.y = 0.1;
      this.chefRig.rightEye.scale.y = 0.1;
      if (this.blinkTimer > 0.14) {
        this.isBlinking = false;
        this.chefRig.leftEye.scale.y = 1;
        this.chefRig.rightEye.scale.y = 1;
        this.blinkTimer = 0;
      }
    }

    // Talking mouth movement
    if (this.isSpeaking) {
      const talkVal = Math.abs(Math.sin(time * 16));
      this.chefRig.mouthMesh.scale.set(1 + talkVal * 0.4, 1 + talkVal * 1.2, 1);
      this.chefRig.headGroup.rotation.x = Math.sin(time * 8) * 0.08;
    } else {
      this.chefRig.mouthMesh.scale.set(1, 1, 1);
      this.chefRig.headGroup.rotation.x = 0;
    }

    // Idle breathing & gentle bobbing
    const breath = Math.sin(time * 2.5);
    this.chefRig.bodyGroup.position.y = 0.7 + breath * 0.02;
    this.chefRig.headGroup.position.y = 1.25 + breath * 0.03;
    this.chefRig.hatGroup.rotation.z = Math.sin(time * 1.8) * 0.03;

    // Execute active character behavior
    switch (this.currentAction) {
      case 'idle': {
        // Natural hospitable posture
        // Left arm rests gently
        this.chefRig.leftArmGroup.rotation.z = 0.2 + breath * 0.05;
        this.chefRig.leftArmGroup.rotation.x = 0.1;
        this.chefRig.leftArmLower.rotation.x = 0.2;

        // Right arm proudly cradles the golden cloche
        this.chefRig.rightArmGroup.rotation.z = -0.3;
        this.chefRig.rightArmGroup.rotation.x = -0.4;
        this.chefRig.rightArmLower.rotation.x = -0.7;

        // Subtle head tilt
        this.chefRig.headGroup.rotation.z = Math.sin(time * 1.2) * 0.04;
        this.chefRig.headGroup.rotation.y = Math.cos(time * 0.9) * 0.08;
        break;
      }

      case 'wave': {
        // Friendly welcoming wave with left hand
        this.chefRig.leftArmGroup.rotation.z = Math.PI / 1.5;
        this.chefRig.leftArmGroup.rotation.x = 0;
        this.chefRig.leftArmLower.rotation.z = Math.sin(time * 12) * 0.45;
        this.chefRig.headGroup.rotation.z = 0.1;
        break;
      }

      case 'dance': {
        // Joyful kitchen boogie dance!
        const danceStep = Math.sin(time * 7);
        this.rootGroup.position.y = -0.9 + Math.abs(Math.cos(time * 7)) * 0.15;
        this.chefRig.bodyGroup.rotation.z = danceStep * 0.12;
        this.chefRig.headGroup.rotation.z = -danceStep * 0.15;

        // Pumping arms
        this.chefRig.leftArmGroup.rotation.x = Math.sin(time * 7) * 0.8;
        this.chefRig.rightArmGroup.rotation.x = -Math.sin(time * 7) * 0.8;

        // Stepping feet
        this.chefRig.leftLegGroup.rotation.x = -danceStep * 0.4;
        this.chefRig.rightLegGroup.rotation.x = danceStep * 0.4;
        break;
      }

      case 'laugh': {
        // Hearty chef chuckle
        const laughJiggle = Math.sin(time * 18) * 0.06;
        this.chefRig.headGroup.position.y = 1.25 + laughJiggle;
        this.chefRig.headGroup.rotation.x = -0.15 + laughJiggle;
        this.chefRig.hatGroup.rotation.z = laughJiggle * 1.5;
        this.chefRig.mouthMesh.scale.set(1.4, 2.0, 1);
        break;
      }

      case 'present': {
        // Grand meal reveal gesture! Holds up the golden cloche
        this.chefRig.rightArmGroup.rotation.x = -0.8;
        this.chefRig.rightArmGroup.rotation.z = -0.5;
        this.chefRig.rightArmLower.rotation.x = -0.9;
        this.chefRig.clocheGroup.rotation.y = time * 2; // slowly spins the platter
        this.chefRig.headGroup.rotation.y = 0.2;
        break;
      }
    }

    this.renderer.render(this.scene, this.camera);
  };

  public resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    cancelAnimationFrame(this.animFrameId);
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
