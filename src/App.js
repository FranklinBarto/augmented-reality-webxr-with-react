import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


function App() {

  const ref = useRef()
      
  // Init renderer
  const renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Init Scene
  const scene = new THREE.Scene()

  // Add Grid
  const gridHelper = new THREE.GridHelper(10,10)
  scene.add(gridHelper)

  // Add a square
  const geometry = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
  const cube = new THREE.Mesh(geometry,material)
  
  scene.add(cube)

  // Add lights 
  const AmbientLight = new THREE.AmbientLight(0x404040)
  scene.add(AmbientLight)

  // Init Camera
  const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
  camera.position.set(5,3,5)

  // Init Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0,0,0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  // Animate 
  function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene,camera)
  }

  useEffect(()=>{
    if(ref.current){
      ref.current.appendChild(renderer.domElement)
    }
    animate()
  },[])
  
  return (
    <div className="App" id='App' ref={ref}>
      
    </div>
  );
}

export default App;
