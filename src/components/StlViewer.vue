<template>
    <div class="stl-viewer">
      <div ref="container" class="viewer-container"></div>
      <div class="viewer-controls">
        <button @click="resetView" class="control-btn">
          <i class="fas fa-sync"></i> Reset
        </button>
        <button @click="toggleRotation" class="control-btn">
          <i class="fas fa-redo"></i> Rotação
        </button>
        <button @click="toggleWireframe" class="control-btn">
          <i class="fas fa-vector-square"></i> Wireframe
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import * as THREE from 'three'
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  
  export default {
    name: 'StlViewer',
    props: {
      fileUrl: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        mesh: null,
        isRotating: false,
        animationId: null
      }
    },
    mounted() {
      this.initScene()
      this.loadModel()
      window.addEventListener('resize', this.onWindowResize)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.onWindowResize)
      this.cleanup()
    },
    methods: {
      initScene() {
        // Cena
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xf0f0f0)
  
        // Câmera
        this.camera = new THREE.PerspectiveCamera(
          75,
          this.$refs.container.clientWidth / this.$refs.container.clientHeight,
          0.1,
          1000
        )
        this.camera.position.z = 100
  
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(
          this.$refs.container.clientWidth,
          this.$refs.container.clientHeight
        )
        this.$refs.container.appendChild(this.renderer.domElement)
  
        // Controles
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
  
        // Luzes
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(0, 0, 1)
        this.scene.add(light)
  
        const ambientLight = new THREE.AmbientLight(0x404040)
        this.scene.add(ambientLight)
  
        this.animate()
      },
      loadModel() {
        const loader = new STLLoader()
        loader.load(
          this.fileUrl,
          (geometry) => {
            try {
              geometry.center()
              const material = new THREE.MeshPhongMaterial({
                color: 0x3498db,
                specular: 0x111111,
                shininess: 200
              })
              
              if (this.mesh) {
                this.scene.remove(this.mesh)
              }
              
              this.mesh = new THREE.Mesh(geometry, material)
              this.scene.add(this.mesh)
              this.fitCameraToObject()
            } catch (error) {
              console.error('Erro ao processar geometria:', error)
            }
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% carregado')
          },
          (error) => {
            console.error('Erro ao carregar STL:', error)
          }
        )
      },
      fitCameraToObject() {
        const box = new THREE.Box3().setFromObject(this.mesh)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = this.camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))
        
        this.camera.position.z = cameraZ * 1.5
        this.camera.updateProjectionMatrix()
        
        this.controls.target.copy(center)
        this.controls.update()
      },
      animate() {
        this.animationId = requestAnimationFrame(this.animate)
        
        if (this.isRotating && this.mesh) {
          this.mesh.rotation.y += 0.01
        }
        
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
      },
      cleanup() {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId)
        }
        if (this.renderer) {
          this.renderer.dispose()
        }
      },
      onWindowResize() {
        if (this.camera && this.renderer) {
          this.camera.aspect = this.$refs.container.clientWidth / this.$refs.container.clientHeight
          this.camera.updateProjectionMatrix()
          this.renderer.setSize(
            this.$refs.container.clientWidth,
            this.$refs.container.clientHeight
          )
        }
      },
      resetView() {
        if (this.controls) {
          this.controls.reset()
        }
      },
      toggleRotation() {
        this.isRotating = !this.isRotating
      },
      toggleWireframe() {
        if (this.mesh) {
          this.mesh.material.wireframe = !this.mesh.material.wireframe
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .stl-viewer {
    width: 100%;
    height: 400px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .viewer-container {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
  }
  
  .viewer-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .control-btn {
    padding: 8px 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .control-btn:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .control-btn:active {
    transform: translateY(0);
  }
  
  .control-btn i {
    font-size: 12px;
  }
  </style> 