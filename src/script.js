import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
const debugObject = {};

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128)

// Colors
debugObject.deepColor = '#0000ff';
debugObject.surfaceColor = '#8888ff';

// Material
const waterMaterial = new THREE.ShaderMaterial(
    {
        fragmentShader:waterFragmentShader,
        vertexShader: waterVertexShader,
        uniforms: {
            uTime: { value: 0 },
            uSpeed: { value: 0.2 },

            uBigWavesElevation : { value: 0.2 },
            uBigWavesFrequency: { value: new THREE.Vector3(4, 1.5) },

            uDeepColor: { value : new THREE.Color(debugObject.deepColor)},
            uSurfaceColor: { value : new THREE.Color(debugObject.surfaceColor)},

            uColorOffset: { value : 0.5},
            uColorMultiplied: { value : 0.5 }
        }
    }
)

//UI
gui.add(waterMaterial.uniforms.uSpeed, 'value').min(0).max(4).step(0.01).name('uSpeed');
gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation');
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX');
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY');
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset');
gui.add(waterMaterial.uniforms.uColorMultiplied, 'value').min(0).max(10).step(0.001).name('uColorMultiplied');

gui
    .addColor(debugObject, 'deepColor')
    .name('deepColor')
    .onChange(()=>{
        waterMaterial.uniforms.uDeepColor.value.set(debugObject.deepColor);
    })
gui
    .addColor(debugObject, 'surfaceColor')
    .name('surfaceColor')
    .onChange(()=>{
        waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor);
    })

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    waterMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()