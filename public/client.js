import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import Base from './functions/Base.js'
import Cube from './functions/Cube.js'
import * as global from './functions/global.js';

const base = Base()
let cube = Cube(10,10,0)

const axes = new THREE.AxesHelper();
axes.scale.set(10, 10, 10);
const setup = function () {
    global.scene.add( base );
    global.scene.add( cube );
    global.scene.add( axes )
    global.camera.position.set( 30, 30, 30 ); 
    global.camera.lookAt( global.scene.position ); 
    global.setsize()
    global.resize()
    document.addEventListener('click', () => {
        onClick()
    }, false)
}

const animate = function () {
    requestAnimationFrame( animate );
    if (cube.spawn){
        cube.position.z -= 0.3
    } else {
        cube.position.x -= 0.3
    }

    
    global.renderer.render( global.scene, global.camera );
    
};

const onClick = function () {
    console.log(cube.spawn)
    cube = Cube(10,10,Number(!cube.spawn))
    global.scene.add( cube );
}
setup()
animate();