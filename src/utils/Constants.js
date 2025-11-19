import * as THREE from 'three';

export const CONSTANTS = {
    BLACK_HOLE_RADIUS: 1.3,
    DISK_INNER_RADIUS: 1.5, // BLACK_HOLE_RADIUS + 0.2
    DISK_OUTER_RADIUS: 8.0,
    DISK_TILT_ANGLE: Math.PI / 3.0,
    STAR_FIELD_RADIUS: 2000,
    STAR_COUNT_LOW: 75000,
    STAR_COUNT_MEDIUM: 100000,
    STAR_COUNT_HIGH: 150000,
    COLORS: {
        HOT: new THREE.Color(0xffffff),
        MID1: new THREE.Color(0xff7733),
        MID2: new THREE.Color(0xff4477),
        MID3: new THREE.Color(0x7744ff),
        OUTER: new THREE.Color(0x4477ff),
        GLOW: new THREE.Color(0xff661a) // vec3(1.0, 0.4, 0.1)
    }
};
