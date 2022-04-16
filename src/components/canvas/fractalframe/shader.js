import { noise3d } from "@/utils/shader/noise3d.glsl"

export const fragShader = `
  uniform float uTime;

  varying vec2 uv;

  void main() {
    vec2 uv = vUv;
    float time = uTime;

    vec3 color = vec3(0.1);

    gl_FragColor = vec4(color, 1.0);
  }
`

export const vertexShader = `

  uniform vec2 uResolution;

  varying vec2 vUv;

  uniform float uTime;

  ${noise3d}


  void main() {

    float aspect = uResolution.x / uResolution.y;

    vUv = uv * 2.0 - 1.0;
    vUv.x *= aspect;

    float time = uTime;

    float tx = 1.0 * snoise(vec3(0.0, 1.0, time));
    //float tx = 0.0;
    //float tz = 1.0 * sin(position.x);
    float tz = 0.0;
    vec3 p = vec3(position.x + tx, position.y, position.z + tz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
