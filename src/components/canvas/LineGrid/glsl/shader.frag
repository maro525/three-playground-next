uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;

uniform vec2 uResolution;

varying vec2 vUv;

varying vec2 vStart;
varying vec2 vGoal;

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

float Sparkle(vec2 uv, vec2 pos, float size) {
    float m = 0.0;

    vec2 j = (pos - uv) * (20.0 / size);
    float sp = 1. / dot(j, j);

    // m += sp;

    float t = uTime * 0.8;
    m += sp * (sin(t) * .4 + .6);


    return m;
}


void main() {

    vec2 uv = vUv;

    float m;

    float circleSize = 1.0;
    vec2 center = vec2(0., 0.);
    m += Sparkle(uv, center, circleSize);

    m += Sparkle(uv, vStart, circleSize);
    m += Sparkle(uv, vGoal, circleSize);


    float size = 5.0;
    // m += Layer(uv*size+i*20.);
    m += Line(uv*size, vStart, vGoal);

    vec3 col = m * uColor;

    // if (gv.x > .48 || gv.y > .48) col = vec3(1, 0, 0);

    float opacity = uOpacity;

    gl_FragColor = vec4(col, opacity);
    // gl_FragColor = vec4(uv.x, uv.y, 1.0, 1.0);
}
