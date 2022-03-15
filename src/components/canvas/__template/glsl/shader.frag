uniform float uTime;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    vec3 color = vec3(fract(uTime));

    gl_FragColor = vec4(color, 1.0);
}
