import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

export default function Cube(x,z,spawn){
    let y = 2
    const geometry = new THREE.BoxGeometry(x,y,z);
    const material = new THREE.MeshBasicMaterial( { color: 'red' } );
    const Cube = new THREE.Mesh( geometry, material );
    Cube.spawn = spawn
    if (spawn){
        Cube.position.set(0,y/2,50)
    } else {
        Cube.position.set(50,y/2,0)
    }

    return Cube
}