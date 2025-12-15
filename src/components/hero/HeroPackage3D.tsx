'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Box } from '@chakra-ui/react';
import { getImagePath } from '@/imagesPath';

function AnimatedPackage() {
    const groupRef = useRef<THREE.Group>(null);

    const obj = useLoader(OBJLoader, getImagePath('/package3d/base.obj'));

    const diffuseMap = useLoader(THREE.TextureLoader, getImagePath('/package3d/texture_diffuse.png'));
    const normalMap = useLoader(THREE.TextureLoader, getImagePath('/package3d/texture_normal.png'));
    const metallicMap = useLoader(THREE.TextureLoader, getImagePath('/package3d/texture_metallic.png'));
    const roughnessMap = useLoader(THREE.TextureLoader, getImagePath('/package3d/texture_roughness.png'));

    [diffuseMap, normalMap, metallicMap, roughnessMap].forEach((texture) => {
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.flipY = true;
    });

    diffuseMap.colorSpace = THREE.SRGBColorSpace;

    useFrame((state) => {
        if (!groupRef.current) return;

        groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;

        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    });

    const clonedObj = obj.clone();
    clonedObj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: diffuseMap,
                normalMap: normalMap,
                metalnessMap: metallicMap,
                roughnessMap: roughnessMap,
                metalness: 1,
                roughness: 1,
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={clonedObj} scale={1.5} />
        </group>
    );
}

export default function HeroPackage3D() {
    return (
        <Box w={"full"} h={"450px"}>
            <Canvas
                camera={{ position: [3, 2, 4], fov: 50 }}
                className="cursor-grab active:cursor-grabbing"
            >
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#FB8500" />

                <directionalLight
                    position={[0, 10, 0]}
                    intensity={1.2}
                    castShadow
                />
                <spotLight
                    position={[0, 8, 0]}
                    angle={0.5}
                    penumbra={1}
                    intensity={0.8}
                    castShadow
                />

                <Suspense fallback={null}>
                    <AnimatedPackage />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </Box>
    );
}
