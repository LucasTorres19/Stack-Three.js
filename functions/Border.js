import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

export default function addBorder(object){
    var geo = new THREE.EdgesGeometry( object.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; 
    object.add( wireframe );
}