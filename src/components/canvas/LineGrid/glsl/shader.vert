uniform vec3 uStart;
uniform vec3 uGoal;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec2 vStart;
varying vec2 vGoal;

vec2 fix(vec4 i, float aspect) {

    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
}

void main() {

  float aspect = uResolution.x / uResolution.y;

  vUv = uv * 2.0 - 1.0;
  vUv.x *= aspect;

  mat4 m = projectionMatrix * modelViewMatrix;
  vec4 startPos = m * vec4( uStart, 1.0 );
  vec4 goalPos = m * vec4 ( uGoal, 1.0 );

  vStart = startPos.xy;
  vGoal = goalPos.xy;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
