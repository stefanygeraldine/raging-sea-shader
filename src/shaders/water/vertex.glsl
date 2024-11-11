uniform float uTime;
uniform float uSpeed;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;

varying float vElevation;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation =   sin(modelPosition.x * uBigWavesFrequency.x + uTime * uSpeed) *
                        sin(modelPosition.z * uBigWavesFrequency.y + uTime * uSpeed) *
                        uBigWavesElevation;

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectPosition = projectionMatrix * viewPosition;

    gl_Position = projectPosition;

    vElevation = elevation;
}