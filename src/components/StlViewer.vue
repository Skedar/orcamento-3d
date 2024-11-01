<template>
  <div class="stl-viewer">
    <div ref="container" class="viewer-container"></div>
    <div class="viewer-controls">
      <button @click="resetView" class="control-button">
        <i class="fas fa-sync"></i> Reset
      </button>
      <button @click="toggleRotation" class="control-button">
        <i class="fas fa-redo"></i> Rotação
      </button>
      <button @click="toggleWireframe" class="control-button">
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
    file: {
      type: File,
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
      isRotating: false
    }
  },
  watch: {
    file: {
      handler(newFile) {
        if (newFile) {
          this.loadModel(newFile)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.initScene()
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
    this.cleanup()
  },
  methods: {
    initScene() {
      // Configuração da cena
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xf0f0f0)

      // Configuração da câmera
      const container = this.$refs.container
      const aspect = container.clientWidth / container.clientHeight
      this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
      this.camera.position.z = 100

      // Configuração do renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)

      // Configuração dos controles
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.05

      // Iluminação
      const ambientLight = new THREE.AmbientLight(0x404040)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(1, 1, 1)
      this.scene.add(ambientLight)
      this.scene.add(directionalLight)

      this.animate()
    },
    loadModel(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const loader = new STLLoader()
        try {
          const geometry = loader.parse(e.target.result)
          
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
          this.centerCamera()
        } catch (error) {
          console.error('Erro ao carregar modelo:', error)
        }
      }
      reader.readAsArrayBuffer(file)
    },
    centerCamera() {
      if (this.mesh) {
        const box = new THREE.Box3().setFromObject(this.mesh)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = this.camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
        
        this.camera.position.z = cameraZ * 1.5
        this.controls.target.copy(center)
        this.camera.updateProjectionMatrix()
        this.controls.update()
      }
    },
    animate() {
      requestAnimationFrame(this.animate)
      
      if (this.isRotating && this.mesh) {
        this.mesh.rotation.y += 0.01
      }
      
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize() {
      const container = this.$refs.container
      this.camera.aspect = container.clientWidth / container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(container.clientWidth, container.clientHeight)
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
    },
    cleanup() {
      if (this.renderer) {
        this.renderer.dispose()
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
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.viewer-container {
  width: 100%;
  height: 100%;
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

.control-button {
  padding: 8px 16px;
  border: none;
  border-radius: 15px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.control-button:hover {
  background: #f0f0f0;
}

.control-button i {
  font-size: 12px;
}
</style> 