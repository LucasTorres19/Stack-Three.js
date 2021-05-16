import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import addBorder from './Border.js'
export default function base(tamaño){
    const geometry = new THREE.BoxGeometry(tamaño,30,tamaño);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const base = new THREE.Mesh( geometry, material );
    addBorder(base)
    base.position.set(0,base.position.y - base.geometry.parameters.height / 2,0)
    return base
}