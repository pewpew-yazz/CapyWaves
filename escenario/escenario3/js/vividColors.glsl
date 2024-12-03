precision mediump float;

uniform sampler2D uMainSampler; // Textura principal
varying vec2 outTexCoord;

void main() {
    vec4 color = texture2D(uMainSampler, outTexCoord);

    // Aumenta la saturación
    float intensity = 1.3; // Ajusta este valor para más o menos saturación
    vec3 gray = vec3(0.3, 0.59, 0.11) * dot(color.rgb, vec3(0.3, 0.59, 0.11));
    color.rgb = mix(gray, color.rgb, intensity);

    // Aumenta el brillo
    color.rgb *= 1.1; // Ajusta este valor para más o menos brillo

    gl_FragColor = color;
}
