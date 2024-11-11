uniform vec3 uDeepColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplied;


varying float vElevation;

void main(){
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplied;
    vec3 color = mix(uDeepColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}