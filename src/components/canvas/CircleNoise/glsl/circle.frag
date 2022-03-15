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

    float tt = (sin(uTime * 0.4) + 1.0) / 2.0;
    float t = uTime * tt * .3 + delay;

    float r = length(st);
    float a = atan(st.y, st.x);

    float f = radius;
    float m = noise(st + t) * power;
    f += sin(a) * m;

    float sm = 0.2;
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

    float r = 0.0;
    float g = 0.5;
    float b = 1.0;
    vec3 sky = vec3(r, g, b);
    // vec3 sky = vec3(0., 0., .8);

    radius *= 0.8;

    float w = 0.1;

    float s1 = shapeBorder(uv, radius, w, .3, 0.4);
    color += s1 * sky;

    float s2 = shapeBorder(uv, radius, w, .22, 0.8);
    sky.b += 0.01;
    // color += s2 * sky;

    float s3 = shapeBorder(uv, radius, w, .24, 1.2);
    sky.b += 0.01;
    // color += s3 * sky;

    float s4 = shapeBorder(uv, radius, w, .26, 1.3);
    sky.b += 0.01;
    // color += s4 * sky;

    float opacity = 0.5;
    if (s1 == 0.0 && s2 == 0.0 && s3 == 0.0) discard;

    if (color.r > r) color.r = r;
    if (color.g > g) color.g = g;
    if (color.b > b) color.b = b;


    // color = vec3(uv.x, uv.y, 0.0);
    gl_FragColor = vec4(color, opacity);
}
