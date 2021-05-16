import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import {d, aspect} from './global.js';
export default function Cube(x,y,z,spawn){
    const geometry = new THREE.BoxGeometry(x,y,z);
    const material = new THREE.MeshBasicMaterial( { color: 'red' } );
    const Cube = new THREE.Mesh( geometry, material );
    Cube.spawn = spawn
    if (spawn){
        Cube.position.set(0,y/2,d * aspect)
    } else {
        Cube.position.set(d * aspect,y/2,0)
    }

    return Cube
}