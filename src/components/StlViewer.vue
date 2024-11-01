<template>
  <div ref="container" class="stl-viewer"></div>
</template>

<script>
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'StlViewer',
  props: {
    fileUrl: String
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      model: null,
      animationId: null
    }
  },
  methods: {
    initScene() {
      if (!this.$refs.container) return

      const container = this.$refs.container
      
      // Cena
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xffffff)

      // Câmera
      this.camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      )
      this.camera.position.set(0, 0, 5)

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        powerPreference: "high-performance"
      })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.innerHTML = ''
      container.appendChild(this.renderer.domElement)

      // Controles
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.05

      // Luzes
      const ambientLight = new THREE.AmbientLight(0x404040)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(0, 1, 2)
      this.scene.add(ambientLight, directionalLight)

      window.addEventListener('resize', this.onWindowResize)
    },

    onWindowResize() {
      if (!this.$refs.container || !this.camera || !this.renderer) return
      
      const container = this.$refs.container
      this.camera.aspect = container.clientWidth / container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(container.clientWidth, container.clientHeight)
    },

    async loadModel() {
      if (!this.fileUrl) return

      try {
        const loader = new STLLoader()
        const geometry = await loader.loadAsync(this.fileUrl)
        
        const material = new THREE.MeshPhongMaterial({
          color: 0x00ff00,
          shininess: 30,
          flatShading: true
        })

        if (this.model) {
          this.scene.remove(this.model)
          this.model.geometry.dispose()
          this.model.material.dispose()
        }

        this.model = new THREE.Mesh(geometry, material)
        this.scene.add(this.model)

        // Centralizar modelo
        geometry.computeBoundingBox()
        const center = new THREE.Vector3()
        geometry.boundingBox.getCenter(center)
        this.model.position.sub(center)
        
        // Ajustar câmera
        const box = new THREE.Box3().setFromObject(this.model)
        const size = box.getSize(new THREE.Vector3())
        const distance = Math.max(size.x, size.y, size.z) * 2
        this.camera.position.set(0, 0, distance)
        this.camera.lookAt(0, 0, 0)
        
      } catch (error) {
        console.error('Erro ao carregar modelo:', error)
      }
    },

    animate() {
      if (!this.renderer || !this.scene || !this.camera) return
      
      this.animationId = requestAnimationFrame(this.animate)
      this.controls?.update()
      this.renderer.render(this.scene, this.camera)
    },

    cleanup() {
      window.removeEventListener('resize', this.onWindowResize)
      
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }

      if (this.model) {
        this.model.geometry.dispose()
        this.model.material.dispose()
      }

      if (this.renderer) {
        this.renderer.dispose()
      }

      if (this.controls) {
        this.controls.dispose()
      }
    }
  },
  watch: {
    fileUrl: {
      handler() {
        this.loadModel()
      }
    }
  },
  mounted() {
    this.initScene()
    this.animate()
  },
  beforeUnmount() {
    this.cleanup()
  }
}
</script>

<style scoped>
.stl-viewer {
  width: 100%;
  height: 400px;
  background: #f5f5f5;
}
</style> 