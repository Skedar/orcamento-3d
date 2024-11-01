import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface StlViewerProps {
  stlFile: File | null;
  onModelLoad?: (geometry: THREE.BufferGeometry) => void;
}

const StlViewer: React.FC<StlViewerProps> = ({ stlFile, onModelLoad }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inicializar cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Configurar câmera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    cameraRef.current = camera;

    // Configurar renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Adicionar luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Adicionar controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Função de animação
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Carregar arquivo STL quando disponível
  useEffect(() => {
    if (!stlFile || !sceneRef.current) return;

    const loader = new STLLoader();
    const fileUrl = URL.createObjectURL(stlFile);

    loader.load(
      fileUrl,
      (geometry) => {
        // Remover modelo anterior se existir
        if (modelRef.current) {
          sceneRef.current?.remove(modelRef.current);
        }

        // Criar novo material e mesh
        const material = new THREE.MeshPhongMaterial({
          color: 0x00ff00,
          specular: 0x111111,
          shininess: 200
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Centralizar o modelo
        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        if (boundingBox) {
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);
          geometry.translate(-center.x, -center.y, -center.z);
        }

        // Ajustar câmera para visualizar todo o modelo
        if (cameraRef.current && boundingBox) {
          const size = new THREE.Vector3();
          boundingBox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          cameraRef.current.position.z = maxDim * 2;
        }

        // Adicionar à cena
        sceneRef.current?.add(mesh);
        modelRef.current = mesh;

        // Callback com a geometria carregada
        if (onModelLoad) {
          onModelLoad(geometry);
        }

        // Limpar URL
        URL.revokeObjectURL(fileUrl);
      },
      undefined,
      (error) => {
        console.error('Erro ao carregar arquivo STL:', error);
      }
    );
  }, [stlFile, onModelLoad]);

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />;
};

export default StlViewer; 