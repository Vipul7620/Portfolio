
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeDCube = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    sceneRef.current = new THREE.Scene();
    
    // Camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      1, // We'll set the proper aspect ratio later
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;
    
    // Renderer
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current.setClearColor(0x000000, 0); // Transparent background
    
    // Add to DOM
    containerRef.current.appendChild(rendererRef.current.domElement);
    
    // Create cube with custom materials
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    
    // Create materials with text "VMV" for each face
    const loader = new THREE.TextureLoader();
    
    // Create a canvas to draw the "VMV" text
    const createTextCanvas = (color: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (!context) return canvas;
      
      // Background
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Text
      context.fillStyle = 'white';
      context.font = 'bold 100px Montserrat';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('VMV', canvas.width / 2, canvas.height / 2);
      
      // Add a simple border
      context.strokeStyle = 'white';
      context.lineWidth = 5;
      context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      
      return canvas;
    };
    
    // Create materials with different colors
    const materials = [
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createTextCanvas('#8b5cf6')) }), // Purple
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createTextCanvas('#3b82f6')) }), // Blue
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createTextCanvas('#14b8a6')) }), // Teal
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createTextCanvas('#ec4899')) }), // Pink
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createTextCanvas('#f97316')) }), // Orange
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(createTextCanvas('#eab308')) })  // Yellow
    ];
    
    cubeRef.current = new THREE.Mesh(geometry, materials);
    sceneRef.current.add(cubeRef.current);
    
    // Resize handler
    const handleResize = () => {
      const width = containerRef.current?.clientWidth || 200;
      const height = containerRef.current?.clientHeight || 200;
      
      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    
    // Add listeners
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeDCube;
