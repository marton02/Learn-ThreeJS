import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(loadingManager)

const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/Roughness.jpg")
const matcapTexture = textureLoader.load("/textures/matcaps/8.png")
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
scene.add(pointLight)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

/**
 * Environment
 */

const rgbeLoader = new RGBELoader()
rgbeLoader.load("/textures/environmentMap/2k.hdr",(envMap)=>{
    envMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = envMap
    scene.environment = envMap
})

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
 * Objects
 */

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = "green" //only works at init
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.generateMipmaps = false
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// gui.add(material,"metalness").min(0).max(1).step(0.0001)
// gui.add(material,"roughness").min(0).max(1).step(0.0001)

const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
material.side = THREE.DoubleSide

gui.add(material,"metalness").min(0).max(1).step(0.0001)
gui.add(material,"roughness").min(0).max(1).step(0.0001)

// Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material,"clearcoat").min(0).max(1).step(0.0001)
// gui.add(material,"clearcoatRoughness").min(0).max(1).step(0.0001)

// Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)
// gui.add(material,"sheen").min(0).max(1).step(0.0001)
// gui.add(material,"sheenRoughness").min(0).max(1).step(0.0001)
// gui.addColor(material,"sheenColor")

// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]
// gui.add(material,"iridescence").min(0).max(1).step(0.0001)
// gui.add(material,"iridescenceIOR").min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange,"0").min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange,"1").min(1).max(1000).step(1)

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5
gui.add(material,"transmission").min(0).max(1).step(0.0001)
gui.add(material,"ior").min(1).max(10).step(0.0001)
gui.add(material,"thickness").min(0).max(1).step(0.0001)



const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64)
const sphereMesh = new THREE.Mesh(sphereGeometry,material)
sphereMesh.position.x = 2

const planeGeometry = new THREE.PlaneGeometry(1,1, 100, 100)
const planeMesh = new THREE.Mesh(planeGeometry, material)

const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,64,128), material)
torusMesh.position.x = -2

scene.add(sphereMesh, planeMesh, torusMesh)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphereMesh.rotation.y = 0.1 * elapsedTime
    planeMesh.rotation.y = 0.1 * elapsedTime
    torusMesh.rotation.y = 0.1 * elapsedTime
    
    sphereMesh.rotation.x = -0.1 * elapsedTime
    planeMesh.rotation.x = -0.1 * elapsedTime
    torusMesh.rotation.x = -0.1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()