uniform float time;
uniform float progress;
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;

uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;


void main() {

    // vec3 color = vec3(1.0, 0.0, 0.0);
    // gl_FragColor = vec4(color, 1.0);


    gl_FragColor = vec4(vUv, 0.0, 1.);

}
