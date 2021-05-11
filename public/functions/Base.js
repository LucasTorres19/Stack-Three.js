import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

export default function base(){
    const geometry = new THREE.BoxGeometry(5,30,5);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const base = new THREE.Mesh( geometry, material );
    base.position.set(0,base.position.y - base.geometry.parameters.height / 2,0)
    return base
}