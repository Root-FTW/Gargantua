varying vec2 vUv;
varying float vRadius;
varying float vAngle;
void main() {
    vUv = uv;
    vRadius = length(position.xy);
    vAngle = atan(position.y, position.x);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
