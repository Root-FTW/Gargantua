uniform float uTime;
uniform float uPixelRatio;
attribute float size;
attribute float twinkle;
varying vec3 vColor;
varying float vTwinkle;

void main() {
    vColor = color;
    vTwinkle = sin(uTime * 2.5 + twinkle) * 0.5 + 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
