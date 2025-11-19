import * as THREE from 'three';
import { CONSTANTS } from '../utils/Constants.js';
import { vertexShader, fragmentShader } from '../shaders/horizon/index.js';

export class BlackHole extends THREE.Group {
    constructor(camera) {
        super();
        this.camera = camera;

        this.initBlackHole();
        this.initEventHorizon();
    }

    initBlackHole() {
        const geometry = new THREE.SphereGeometry(CONSTANTS.BLACK_HOLE_RADIUS, 128, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.renderOrder = 0;
        this.add(this.mesh);
    }

    initEventHorizon() {
        const geometry = new THREE.SphereGeometry(CONSTANTS.BLACK_HOLE_RADIUS * 1.05, 128, 64);
        this.horizonMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uCameraPosition: { value: new THREE.Vector3() }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });

        this.horizonMesh = new THREE.Mesh(geometry, this.horizonMaterial);
        this.add(this.horizonMesh);
    }

    update(elapsedTime) {
        if (this.horizonMaterial) {
            this.horizonMaterial.uniforms.uTime.value = elapsedTime;
            this.horizonMaterial.uniforms.uCameraPosition.value.copy(this.camera.position);
        }
    }
}
