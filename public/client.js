import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import setup from './functions/setup.js'

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const d = 20;
const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 )

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render( scene, camera );
}, false);


const setup = function () {
    const base = base()
    scene.add( base );
    camera.position.set( 20, 20, 20 ); 
    camera.lookAt( scene.position ); 
}

const animate = function () {
    requestAnimationFrame( animate );
    // cube.position.x += 0.1
    
    renderer.render( scene, camera );
    
};



setup()
animate();