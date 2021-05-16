import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import {d, aspect,scene} from './global.js';
import addBorder from './Border.js'

export default function Cube(width,height,depth,spawn,x=0,z=0){
    const geometry = new THREE.BoxGeometry(width,height,depth);
    const material = new THREE.MeshBasicMaterial( { color: 'red' } );
    const Cube = new THREE.Mesh( geometry, material );
    addBorder(Cube)
    Cube.spawn = spawn
    if (spawn){
        Cube.position.set(x,-scene.position.y + height/2 ,d * aspect)
    } else {
        Cube.position.set(d * aspect,-scene.position.y+ height/2 ,z)
    }

    return Cube
}