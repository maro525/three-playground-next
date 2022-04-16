

export const fragShader = `

  uniform float uTime;

  varying vec2 vUv;

  void main() {

      vec2 uv = vUv;

      vec3 color = vec3(fract(uTime));

      gl_FragColor = vec4(color, 1.0);
  }

`

export const vertShader = `

  uniform vec2 uResolution;

  varying vec2 vUv;

  void main() {

    float aspect = uResolution.x / uResolution.y;

    vUv = uv * 2.0 - 1.0;
    vUv.x *= aspect;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }

`
