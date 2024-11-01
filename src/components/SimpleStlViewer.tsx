import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { BufferGeometry } from 'three';

const SimpleStlViewer = ({ url }: { url: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);
    
    // Luz básica
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);

    // Carregar o STL
    const loader = new STLLoader();
    loader.load(url, (geometry: BufferGeometry) => {
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Centralizar o modelo
      geometry.center();
      scene.add(mesh);
      
      // Posicionar câmera
      camera.position.z = 5;
      
      // Renderizar uma vez
      renderer.render(scene, camera);
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [url]);

  return <div ref={containerRef} style={{ width: 300, height: 300 }} />;
};

export default SimpleStlViewer; 