import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import Base from './functions/Base.js'
import * as global from './functions/global.js';

const setup = function () {
    const base = Base()
    global.scene.add( base );
    global.camera.position.set( 20, 20, 20 ); 
    global.camera.lookAt( global.scene.position ); 
    global.setsize()
}

const animate = function () {
    global.resize()
    requestAnimationFrame( animate );
    // cube.position.x += 0.1
    
    global.renderer.render( global.scene, global.camera );
    
};

setup()
animate();