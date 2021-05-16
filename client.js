import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import Base from './functions/Base.js'
import Cube from './functions/Cube.js'
import * as global from './functions/global.js';
import gameProps from './functions/gameProps.js'
// const axes = new THREE.AxesHelper();
// axes.scale.set( 10, 10, 10);

const setup = function () {
    const Circle = document.getElementById('circle')
    Circle.style.left = '45vw'
    Circle.style.top = '45vh'
    Circle.addEventListener('click', function(){
        console.log("Circle")
        gameProps.points += 10
        gameProps.UpdatePoints()
        const x = Math.floor((Math.random()*95) + 1)
        const y = Math.floor((Math.random()*95) + 1)
        Circle.style.left = x + 'vw'
        Circle.style.top = y + 'vh'
    })
    global.scene.add( gameProps.base );
    global.scene.add( gameProps.cube );
    // global.scene.add( axes )
    global.camera.position.set( 30, 30, 30 ); 
    global.camera.lookAt( global.scene.position ); 
    global.setsize()
    global.resize()
    document.getElementsByTagName('canvas')[0].addEventListener('click', () => {
        if (!(gameProps.points - 7 <=0)){
            gameProps.points -= 7
        } else {
            gameProps.points = 0
        }
        gameProps.UpdatePoints()

    }, false)
    document.addEventListener('keypress', (e) => {
        if (e.key === " "){
            gameProps.clicked = true
        }
    }, false)
    // const circle = Circle(gameProps.largo, gameProps.ancho)
    // console.log(circle.position)
    // global.scene.add( circle )
}

const UpScene = function(count){
    const UpSceneId = requestAnimationFrame( function(){
        UpScene(count)
    } );
    global.scene.position.y -= 0.1
    count += 0.1
    if (count >= gameProps.alto){
        cancelAnimationFrame( UpSceneId )
        gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,Number(!gameProps.cube.spawn), gameProps.cube.position.x, gameProps.cube.position.z)
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
            AnimationLose(gameProps.cube)
            gameProps.reset()
            
            
        } else {
            gameProps.points += 15
            gameProps.UpdatePoints()
            // cambiamos el obj
            let prevCube = gameProps.cubes[gameProps.cubes.length - 1]
            let cubeFalling = {};
            if (gameProps.cube.spawn){
                const prevAncho = gameProps.ancho
                gameProps.ancho -= Math.abs(gameProps.cube.position.z-prevCube.position.z )
                const cubeFallingAncho = prevAncho-gameProps.ancho
                cubeFalling = Cube(gameProps.largo,gameProps.alto,cubeFallingAncho,prevCube.spawn)
                cubeFalling.position.x = gameProps.cube.position.x
                if (gameProps.cube.position.z > prevCube.position.z){

                    gameProps.cube.position.z = ((prevCube.position.z + prevAncho/2) - gameProps.ancho/2)
                    cubeFalling.position.z = gameProps.cube.position.z + gameProps.ancho/2 + cubeFallingAncho/2
                } else{
                    gameProps.cube.position.z = ((prevCube.position.z - prevAncho/2) + gameProps.ancho/2)
                    cubeFalling.position.z = gameProps.cube.position.z - gameProps.ancho/2 - cubeFallingAncho/2
                }
            }else {
                const prevLargo = gameProps.largo
                gameProps.largo -= Math.abs(gameProps.cube.position.x-prevCube.position.x )
                const cubeFallingLargo = prevLargo-gameProps.largo
                cubeFalling = Cube(cubeFallingLargo,gameProps.alto,gameProps.ancho,prevCube.spawn)
                cubeFalling.position.z = gameProps.cube.position.z
                if (gameProps.cube.position.x > prevCube.position.x){
                    gameProps.cube.position.x = ((prevCube.position.x + prevLargo/2) - gameProps.largo/2)
                    cubeFalling.position.x = gameProps.cube.position.x + gameProps.largo/2 + cubeFallingLargo/2
                } else {
                    gameProps.cube.position.x = ((prevCube.position.x - prevLargo/2) + gameProps.largo/2)
                    cubeFalling.position.x = gameProps.cube.position.x - gameProps.largo/2 - cubeFallingLargo/2
                }
                
            }
            global.scene.add( cubeFalling )
            AnimationLose( cubeFalling )
            global.scene.remove( gameProps.cube )

            
            prevCube = gameProps.cube
            gameProps.cube = Cube(gameProps.largo, gameProps.alto, gameProps.ancho, prevCube.spawn)
            gameProps.cube.position.set(prevCube.position.x, prevCube.position.y, prevCube.position.z)
            global.scene.add( gameProps.cube )
            gameProps.cubes.push(gameProps.cube)
            UpScene(0)
            
            cancelAnimationFrame( gameProps.animateId )

        }
        gameProps.clicked = false
    } else {
        gameProps.Movement(gameProps.cube)
    }

    global.renderer.render( global.scene, global.camera );
    
};

const AnimationLose = function (obj) {
    if (obj === gameProps.cube){
    gameProps.clicked = false
    }
    const AnimationLoseId = requestAnimationFrame( function(){
        AnimationLose(obj)
    } )

    obj.position.y -= gameProps.velocidad
    if(obj.position.y <= -global.d * global.aspect){
        global.scene.remove( obj )
        cancelAnimationFrame(AnimationLoseId)
        if (obj === gameProps.cube){
            animate()
            gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,Number(!gameProps.cube.spawn))
            global.scene.add( gameProps.cube );
        }
    }
    global.renderer.render( global.scene, global.camera );
}

setup()
animate();