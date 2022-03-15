uniform float uTime;

varying vec2 vUv;

vec2 random2(vec2 st) {
    st = vec2( dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)) );
    return -1.0 + 2.0 * fract(sin(st) * 43758.2849393);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix( mix( dot( random2(i + vec2(0.0, 0.0) ), f - vec2(0.0, 0.0) ),
                     dot( random2(i + vec2(1.0, 0.0) ), f - vec2(1.0, 0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0, 1.0) ), f - vec2(0.0, 1.0) ),
                     dot( random2(i + vec2(1.0, 1.0) ), f - vec2(1.0, 1.0) ), u.x), u.y);

}

mat2 rotate2d(float _angle) {
 return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

float linearstep(float a, float b, float x) {
    if (x < a) return 0.0;
    else if (x > b) return 1.0;
    else return a + (b - a) / (x - a);
}

float shape(vec2 st, float radius, float power, float delay) {

    float t = uTime * 0.1 + delay;

    float r = length(st);
    float a = atan(st.y, st.x);

    float f = radius;
    float m = noise(st + t) * power;
    f += sin(a * 2.0) * m;

    float sm = 0.02;
    return 1. - smoothstep(f, f+sm, r);
}

float shapeBorder(vec2 st, float radius, float width, float power, float delay) {
    return shape(st, radius + width, power, delay) - shape(st, radius, power, delay);
    // return shape(st, radius, power, delay);
}

float fill(float d, float l) {
    return smoothstep(0.0, 0.01, l-d);
}

void main() {

    vec2 uv = vUv;

    float t = uTime * 0.1;
    float n = noise(uv);

    float nt = n + t;
    nt = fract(nt);
    float smooth_nt = smoothstep(0.0, 1.0, nt);

    float glow = 0.02;
    float radius = 0.5;

    vec3 color = vec3(0.0);

    // float l = 0.;
    // l += fill(length(uv), radius * 0.99) * (1.35 - length(uv - vec2(0., .5)) * 0.8);
    // color += l;

    // color += vec3(1.0) * shapeBorder(uv, 0.8, 0.1, .5, 0.1);

    float r1 = shapeBorder(uv, radius, 0.02, .2, 0.1);
    color += vec3(0.9, 0.2, 0.1) * r1;

    float r2 = shapeBorder(uv, radius, 0.02, .1, 0.1);
    color += vec3(0.1, 0.3, 0.9) * r2;

    float r3 = shapeBorder(uv, radius, 0.02, .5, 0.1);
    color += vec3(0.05, 0.95, 0.5) * r3;

    // color = vec3(uv.x, uv.y, 0.0);
    gl_FragColor = vec4(color, 1.0);
}
