varying vec3 vColor;
varying float vTwinkle;

void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= (0.2 + vTwinkle * 0.8);
    
    gl_FragColor = vec4(vColor, alpha);
}
