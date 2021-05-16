import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import Base from './functions/Base.js'
import Cube from './functions/Cube.js'
import * as global from './functions/global.js';
import gameProps from './functions/gameProps.js'
import Circle from './functions/Circle.js'
// const axes = new THREE.AxesHelper();
// axes.scale.set( 10, 10, 10);

const setup = function () {

    global.scene.add( gameProps.base );
    global.scene.add( gameProps.cube );
    // global.scene.add( axes )
    global.camera.position.set( 30, 30, 30 ); 
    global.camera.lookAt( global.scene.position ); 
    global.setsize()
    global.resize()
    document.addEventListener('click', () => {
        gameProps.clicked = true
    }, false)
    document.addEventListener('keypress', (e) => {
        if (e.target.key = " "){
            gameProps.clicked = true
        }
    }, false)
    // const circle = Circle(gameProps.largo, gameProps.ancho)
    // console.log(circle.position)
    // global.scene.add( circle )
}

const UpScene = function(count, prevCube){
    const UpSceneId = requestAnimationFrame( function(){
        UpScene(count, prevCube)
    } );
    global.scene.position.y -= 0.1
    count += 0.1
    if (count >= gameProps.alto){
        cancelAnimationFrame( UpSceneId )
        gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,Number(!gameProps.cube.spawn), prevCube.position.x, prevCube.position.z)
        global.scene.add( gameProps.cube )
        animate()
    }
    global.renderer.render( global.scene, global.camera );
}
const animate = function () {
    
    gameProps.animateId = requestAnimationFrame( animate );

    if (gameProps.clicked){ 
        if(gameProps.LoseCheck()){
            cancelAnimationFrame( gameProps.animateId )
            AnimationLose(-global.d * global.aspect)
            gameProps.reset()
            
            
        } else {
            gameProps.UpdatePoints()
            // cambiamos el obj
            let prevCube = gameProps.cubes[gameProps.cubes.length - 1]
            if (gameProps.cube.spawn){
                const prevAncho = gameProps.ancho
                gameProps.ancho -= Math.abs(gameProps.cube.position.z-prevCube.position.z )
                if (gameProps.cube.position.z > prevCube.position.z){
                    gameProps.cube.position.z = ((prevCube.position.z + prevAncho/2) - gameProps.ancho/2)
                } else{
                    gameProps.cube.position.z = ((prevCube.position.z - prevAncho/2) + gameProps.ancho/2)
                }
            }else {
                const prevLargo = gameProps.largo
                gameProps.largo -= Math.abs(gameProps.cube.position.x-prevCube.position.x )
                if (gameProps.cube.position.x > prevCube.position.x){
                    gameProps.cube.position.x = ((prevCube.position.x + prevLargo/2) - gameProps.largo/2)
                } else {
                    gameProps.cube.position.x = ((prevCube.position.x - prevLargo/2) + gameProps.largo/2)
                }
            }
            global.scene.remove( gameProps.cube )

            
            prevCube = gameProps.cube
            gameProps.cube = Cube(gameProps.largo, gameProps.alto, gameProps.ancho, prevCube.spawn)
            gameProps.cube.position.set(prevCube.position.x, prevCube.position.y, prevCube.position.z)
            global.scene.add( gameProps.cube )
            gameProps.cubes.push(gameProps.cube)
            UpScene(0, prevCube)
            
            cancelAnimationFrame( gameProps.animateId )

        }
        gameProps.clicked = false
    } else {
        gameProps.Movement(gameProps.cube)
    }

    global.renderer.render( global.scene, global.camera );
    
};

const AnimationLose = function (finalY) {
    gameProps.clicked = false
    const AnimationLoseId = requestAnimationFrame( function(){
        AnimationLose(finalY)
    } )

    gameProps.cube.position.y -= gameProps.velocidad
    if(gameProps.cube.position.y <= finalY){
        global.scene.remove( gameProps.cube )
        animate()
        cancelAnimationFrame(AnimationLoseId)
        gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,Number(!gameProps.cube.spawn))
        global.scene.add( gameProps.cube );
    }
    global.renderer.render( global.scene, global.camera );
}

setup()
animate();