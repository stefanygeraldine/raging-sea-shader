void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x );


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectPosition = projectionMatrix * viewPosition;

    gl_Position = projectPosition;
}