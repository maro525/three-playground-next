uniform float uTime;

varying vec2 vUv;


// random
float N21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p+23.45);
    return fract(p.x * p.y);
}

vec2 N22(vec2 p) {
    float n = N21(p);
    return vec2(n, N21(p+n));
}



// YUV to RGB matrix
mat3 yuv2rgb = mat3(1.0, 0.0, 1.13983,
                    1.0, -0.39465, -0.58060,
                    1.0, 2.03211, 0.0);

// RGB to YUV matrix
mat3 rgb2yuv = mat3(0.2126, 0.7152, 0.0722,
                    -0.09991, -0.33609, 0.43600,
                    0.615, -0.5586, -0.05639);

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
    float a = atan(st.y, st.x) + sin(t * 10.0) * 10.0;

    float f = radius + sin(a * 200.0) * 0.0001;
    float m = noise(st + t) * power;
    f += (1.0 + sin(a * 2.0 + t * 0.1)) * m;


    float sm = 0.006;
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

    // noise
    float n = noise(uv);
    float nt = n + t;
    nt = fract(nt);
    float smooth_nt = smoothstep(0.0, 1.0, nt);

    // radius
    float radius = 0.3;

    vec3 color = vec3(0.0);

    float _p = 0.01 * (sin(t) + 1.0) / 2.0;

    float speed = 1.0 * (sin(t * 10.0) + 1.0) / 2.0;
    float delay = 0.1 * (sin(t * 2.0) + 1.0) / 2.0;

    float base = 0.5 * (sin(t * 1.0) + 1.0) / 2.0;
    float base2 = 0.1 * (sin(t * 1.0) + 1.0) / 2.0;
    float base3 = 0.2 * (sin(t * 2.0) + 1.0) / 2.0;

    /* for ( int i =0; i < 40; i++ ) { */

    /*     // amp */
    /*     float p = sin(speed * t + float(i) * 0.5) * _p + _p + 0.5; */
    /*     float pp = pow(p, 5.0); */

    /*     float r1 = shapeBorder(uv, radius, 0.001, pp, float(i) * delay); */
    /*     // float r1 = shape(uv, radius, p, 0.1); */
    /*     // vec3 c1 = yuv2rgb * vec3(base, base2, base3 + float(i) * 0.01); */
    /*     // vec3 c1 = vec3(0.1, 0.2, 0.1 + float(i) * 0.01); */
    /*     vec3 c1 = vec3(0.1, 0.1, 0.8); */
    /*     color += c1 * r1; */
    /* } */

    for ( int i =0; i < 40; i++ ) {

        // amp
        float p = sin(speed * t + float(i) * 3.5) * _p + _p + 0.2;
        float pp = pow(p, 2.0);

        float r1 = shapeBorder(uv, radius + 0.005, 0.001, pp, float(i) * delay);
        // float r1 = shape(uv, radius, p, 0.1);
        // vec3 c1 = yuv2rgb * vec3(base, base2, base3 + float(i) * 0.01);
        // vec3 c1 = vec3(0.1, 0.2, 0.1 + float(i) * 0.01);
        vec3 c1 = vec3(0.1, 0.1, 0.8);
        color += c1 * r1;
    }


    // float opacity = 0.2 + length(uv);
    float opacity = 1.0;

    // color = yuv2rgb * vec3(0.4, uv.x, uv.y);
    // color = vec3(uv.x, uv.x, uv.x);
    gl_FragColor = vec4(color, opacity);
}
