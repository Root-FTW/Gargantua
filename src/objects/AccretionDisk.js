import * as THREE from 'three';
import { CONSTANTS } from '../utils/Constants.js';
import { vertexShader, fragmentShader } from '../shaders/disk/index.js';

export class AccretionDisk extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.RingGeometry(CONSTANTS.DISK_INNER_RADIUS, CONSTANTS.DISK_OUTER_RADIUS, 256, 128);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uColorHot: { value: CONSTANTS.COLORS.HOT },
                uColorMid1: { value: CONSTANTS.COLORS.MID1 },
                uColorMid2: { value: CONSTANTS.COLORS.MID2 },
                uColorMid3: { value: CONSTANTS.COLORS.MID3 },
                uColorOuter: { value: CONSTANTS.COLORS.OUTER },
                uNoiseScale: { value: 2.5 },
                uFlowSpeed: { value: 0.22 },
                uDensity: { value: 1.3 }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        super(geometry, material);

        this.rotation.x = CONSTANTS.DISK_TILT_ANGLE;
        this.renderOrder = 1;
    }

    update(elapsedTime, deltaTime) {
        this.material.uniforms.uTime.value = elapsedTime;
        this.rotation.z += deltaTime * 0.005;
    }
}
