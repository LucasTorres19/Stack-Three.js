import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import Base from './functions/Base.js'
import Cube from './functions/Cube.js'
import * as global from './functions/global.js';
import gameProps from './functions/gameProps.js'

const axes = new THREE.AxesHelper();
axes.scale.set( 10, 10, 10);

const setup = function () {
    global.scene.add( gameProps.base );
    global.scene.add( gameProps.cube );
    global.scene.add( axes )
    global.camera.position.set( 30, 30, 30 ); 
    global.camera.lookAt( global.scene.position ); 
    global.setsize()
    global.resize()
    document.addEventListener('click', () => {
        gameProps.clicked = true
    }, false)
}
const AnimationLose = function () {
    gameProps.clicked = false
    const AnimationLoseId = requestAnimationFrame( AnimationLose )

    gameProps.cube.position.y -= gameProps.velocidad
    if(gameProps.cube.position.y <= -global.d * global.aspect - 10){
        global.scene.remove( gameProps.cube )
        animate()
        cancelAnimationFrame(AnimationLoseId)
        gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,Number(!gameProps.cube.spawn))
        global.scene.add( gameProps.cube );
    }
    global.renderer.render( global.scene, global.camera );
}

const animate = function () {
    
    gameProps.animateId = requestAnimationFrame( animate );

    if (gameProps.clicked){ 
        if(gameProps.LoseCheck()){
            cancelAnimationFrame( gameProps.animateId )
            AnimationLose()
            gameProps.reset()
            
            
        } else {
            // cambiamos el obj
            const prevCube = gameProps.cubes[gameProps.cubes.length - 1]
            if (gameProps.cube.spawn){
                gameProps.ancho -= Math.abs(gameProps.cube.position.z-prevCube.position.z )
            }else {
                gameProps.largo -= Math.abs(gameProps.cube.position.x-prevCube.position.x )
            
            }
            gameProps.cubes.push(gameProps.cube)
            gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,Number(!gameProps.cube.spawn))
            global.scene.add( gameProps.cube )
        }
        gameProps.clicked = false
    } else {
        gameProps.Movement(gameProps.cube)
    }

    global.renderer.render( global.scene, global.camera );
    
};

setup()
animate();