import * as THREE from 'three';
import { CONSTANTS } from '../utils/Constants.js';
import { vertexShader, fragmentShader } from '../shaders/stars/index.js';

export class StarField extends THREE.Points {
    constructor(renderer) {
        const geometry = new THREE.BufferGeometry();

        // Determine star count based on device capabilities
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = isMobile && (navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4);

        const starCount = isLowEnd ? CONSTANTS.STAR_COUNT_LOW : isMobile ? CONSTANTS.STAR_COUNT_MEDIUM : CONSTANTS.STAR_COUNT_HIGH;

        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        const starTwinkle = new Float32Array(starCount);

        const starPalette = [
            new THREE.Color(0x88aaff), new THREE.Color(0xffaaff), new THREE.Color(0xaaffff),
            new THREE.Color(0xffddaa), new THREE.Color(0xffeecc), new THREE.Color(0xffffff),
            new THREE.Color(0xff8888), new THREE.Color(0x88ff88), new THREE.Color(0xffff88),
            new THREE.Color(0x88ffff)
        ];

        // Reusable color object to avoid GC
        const tempColor = new THREE.Color();

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const phi = Math.acos(-1 + (2 * i) / starCount);
            const theta = Math.sqrt(starCount * Math.PI) * phi;
            const radius = Math.cbrt(Math.random()) * CONSTANTS.STAR_FIELD_RADIUS + 100;

            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);

            const paletteColor = starPalette[Math.floor(Math.random() * starPalette.length)];
            tempColor.copy(paletteColor).multiplyScalar(Math.random() * 0.7 + 0.3);

            starColors[i3] = tempColor.r;
            starColors[i3 + 1] = tempColor.g;
            starColors[i3 + 2] = tempColor.b;

            starSizes[i] = THREE.MathUtils.randFloat(0.6, 3.0);
            starTwinkle[i] = Math.random() * Math.PI * 2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
        geometry.setAttribute('twinkle', new THREE.BufferAttribute(starTwinkle, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: renderer.getPixelRatio() }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        super(geometry, material);
    }

    update(elapsedTime, deltaTime) {
        this.material.uniforms.uTime.value = elapsedTime;
        this.rotation.y += deltaTime * 0.003;
        this.rotation.x += deltaTime * 0.001;
    }
}
