import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 'skyblue' );
let aspect = window.innerWidth / window.innerHeight;
const d = 20;
const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 )

const renderer = new THREE.WebGLRenderer();

function setsize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}
function resize(){
    window.addEventListener('resize', () => {
        aspect = window.innerWidth / window.innerHeight;
        
        camera.left = - d * aspect;
        camera.right = d * aspect;
        camera.top = d;
        camera.bottom = - d;

        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render( scene, camera );
    }, false);
}

export{scene,aspect,d,camera,renderer,resize,setsize};