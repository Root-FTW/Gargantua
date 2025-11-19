import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Renderer } from './Renderer.js';
import { BlackHole } from '../objects/BlackHole.js';
import { AccretionDisk } from '../objects/AccretionDisk.js';
import { StarField } from '../objects/StarField.js';
import { AudioController } from '../utils/AudioController.js';

export class App {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x020104, 0.025);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
        this.camera.position.set(-6.5, 5.0, 6.5);

        this.renderer = new Renderer(this.scene, this.camera);

        this.controls = new OrbitControls(this.camera, this.renderer.instance.domElement);
        this.setupControls();

        this.audioController = new AudioController();
        this.clock = new THREE.Clock();

        this.initObjects();
        this.animate();

        // Initialize audio on first user interaction if not already playing
        document.addEventListener('click', () => this.audioController.init(), { once: true });
    }

    setupControls() {
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.035;
        this.controls.rotateSpeed = this.renderer.isMobile ? 0.6 : 0.4;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.1;
        this.controls.target.set(0, 0, 0);
        this.controls.minDistance = 2.5;
        this.controls.maxDistance = 100;
        this.controls.enablePan = false;

        if (this.renderer.isMobile) {
            this.controls.touches = {
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN
            };
        }
    }

    initObjects() {
        this.blackHole = new BlackHole(this.camera);
        this.scene.add(this.blackHole);

        this.accretionDisk = new AccretionDisk();
        this.scene.add(this.accretionDisk);

        this.starField = new StarField(this.renderer.instance);
        this.scene.add(this.starField);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();
        const deltaTime = this.clock.getDelta();

        this.controls.update();

        // Update objects
        this.blackHole.update(elapsedTime);
        this.accretionDisk.update(elapsedTime, deltaTime);
        this.starField.update(elapsedTime, deltaTime);

        // Update lensing effect
        this.renderer.updateLensing(this.blackHole.mesh.position);

        this.renderer.render(deltaTime);
    }
}
