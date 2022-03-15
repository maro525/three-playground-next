uniform vec2 uResolution;

varying vec2 vUv;

void main() {

  float aspect = uResolution.x / uResolution.y;

  vUv = uv * 2.0 - 1.0;
  vUv.x *= aspect;


  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
