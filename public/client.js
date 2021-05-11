import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render()
}, false);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );


scene.add( cube );
const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial( { color: 0x123456 } );
const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.x = 1

scene.add( cube2 );
console.log(window.innerWidth / window.innerHeight)
camera.position.z = 5;

const animate = function () {
    requestAnimationFrame( animate );
    
   
    render()
    
};
function render(){
    renderer.render( scene, camera );
}
animate();