uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

float DistLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float v = dot(pa, ba) / dot(ba, ba);
    float t = clamp(v, 0., 1.);
    return length(pa - ba * t);
}

float N21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p+23.45);
    return fract(p.x * p.y);
}

vec2 N22(vec2 p) {
    float n = N21(p);
    return vec2(n, N21(p+n));
}

vec2 GetPos(vec2 id, vec2 offs) {

    vec2 n = N22(id+offs) * uTime;

    return offs + sin(n) * .4;
}

float Line(vec2 p, vec2 a, vec2 b) {
    float d = DistLine(p, a, b);
    float m = smoothstep(.03, .01, d);
    float d2 = length(a-b);
    m *= smoothstep(1.2, .8, d2) * .5 + smoothstep(.05, .03, abs(d2-0.75));
    return m;
}


float Layer(vec2 uv) {

    float m = 0.;

    vec2 gv = fract(uv) - .5;
    vec2 id = floor(uv);

    // vec2 p = GetPos(id);

    // float d = length(gv-p);
    // m = smoothstep(.1, .01, d);
    // vec3 col = vec3(m);

    vec2 p[9];


    int i = 0;
    for(float y=-1.; y<=1.; y++) {
        for (float x=-1.; x<=1.; x++) {
            p[i++] = GetPos(id, vec2(x, y));
        }
    }

    float t = uTime * 10.;
    for (int i=0; i<9; i++) {
        m += Line(gv, p[4], p[i]);

        vec2 j = (p[i] - gv) * 20.;
        float sparkle = 1./dot(j, j);

        m += sparkle*(sin(t+fract(p[i].x)*10.) *.5 + .5);
    }
    m += Line(gv, p[1], p[3]);
    m += Line(gv, p[1], p[5]);
    m += Line(gv, p[5], p[7]);
    m += Line(gv, p[3], p[7]);

    return m;

}


void main() {

    vec2 uv = vUv * 2. - 1.0;
    vec2 mouse = uMouse;

    // float d = DistLine(uv, vec2(0.0), vec2(1));
    float m = 0.;
    float t = uTime * .1;

    float s = sin(t);
    float c = cos(t);
    mat2 rot = mat2(c, -s, s, c);

    float gradient = uv.y;
    uv *= rot;
    mouse *= rot;

    for (float i=0.; i<1.; i+= 1./4.) {
        float z = fract(i+t);
        float size = mix(10., .5, z);
        float fade = smoothstep(0., .5, z) * smoothstep(1., .8, z);
        m += Layer(uv*size+i*20. - mouse) * fade;
    }

    vec3 base = sin(t*5.*vec3(.345, .456, .657))*.4 + .6;
    vec3 col = m * base;

    float p = sin(t * 10. + cos(t) * 0.5) * .15 + .4;
    col -= gradient * base * p;

    // if (gv.x > .48 || gv.y > .48) col = vec3(1, 0, 0);

    gl_FragColor = vec4(col, 1.0);
}
