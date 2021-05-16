import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import {d, aspect,scene, camera} from './global.js';
import addBorder from './Border.js'

export default function Circle(largo,ancho){
    const geometry = new THREE.CircleGeometry( 2, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const Circle = new THREE.Mesh( geometry, material );
    
    var ranNum = Math.ceil(Math.random() * 15) * (Math.round(Math.random()) ? 1 : -1)
    const Y = scene.position.y + ranNum
    const X = (scene.position.x + largo/2 + (Math.random() * (d*aspect))) * (Math.round(Math.random()) ? 1 : -1)
    const Z = (scene.position.z + ancho/2 + (Math.random() * (d*aspect))) * (Math.round(Math.random()) ? 1 : -1)
    Circle.position.set(d*aspect, 10,d*aspect)
    Circle.lookAt( camera.position ) 

    return Circle
}