import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { vertexShader, fragmentShader } from '../shaders/lensing/index.js';

export class Renderer {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Device detection
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        this.initRenderer();
        this.initComposer();
        this.setupResize();
    }

    initRenderer() {
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true
        });

        this.instance.setSize(this.width, this.height);

        const pixelRatio = this.isMobile ? Math.min(window.devicePixelRatio, 2) : Math.min(window.devicePixelRatio, 1.5);
        this.instance.setPixelRatio(pixelRatio);

        this.instance.outputColorSpace = THREE.SRGBColorSpace;
        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = 1.2;

        document.body.appendChild(this.instance.domElement);

        // Accessibility
        this.instance.domElement.setAttribute('role', 'img');
        this.instance.domElement.setAttribute('aria-label', 'Interactive 3D simulation of a black hole');
    }

    initComposer() {
        this.composer = new EffectComposer(this.instance);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.width, this.height),
            0.8, 0.7, 0.8
        );
        this.composer.addPass(this.bloomPass);

        const lensingShader = {
            uniforms: {
                "tDiffuse": { value: null },
                "blackHoleScreenPos": { value: new THREE.Vector2(0.5, 0.5) },
                "lensingStrength": { value: 0.12 },
                "lensingRadius": { value: 0.3 },
                "aspectRatio": { value: this.width / this.height },
                "chromaticAberration": { value: 0.005 }
            },
            vertexShader,
            fragmentShader
        };

        this.lensingPass = new ShaderPass(lensingShader);
        this.composer.addPass(this.lensingPass);
    }

    setupResize() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.onResize(), 100);
            setTimeout(() => this.onResize(), 500);
        });
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        const pixelRatio = this.isMobile ? Math.min(window.devicePixelRatio, 2) : Math.min(window.devicePixelRatio, 1.5);
        this.instance.setPixelRatio(pixelRatio);
        this.instance.setSize(this.width, this.height);

        this.composer.setSize(this.width, this.height);
        this.bloomPass.resolution.set(this.width, this.height);
        this.lensingPass.uniforms.aspectRatio.value = this.width / this.height;

        // Mobile portrait adjustment
        if (this.isMobile && this.height > this.width) {
            this.camera.position.set(-8, 6, 8);
        } else {
            this.camera.position.set(-6.5, 5.0, 6.5);
        }
    }

    updateLensing(blackHolePosition) {
        const screenPos = blackHolePosition.clone().project(this.camera);
        this.lensingPass.uniforms.blackHoleScreenPos.value.set(
            (screenPos.x + 1) / 2,
            (screenPos.y + 1) / 2
        );
    }

    render(deltaTime) {
        this.composer.render(deltaTime);
    }
}
