import * as global from './global.js';
import Cube from './Cube.js'
import Base from './Base.js'
const gameProps = {
    animateId: 0,
    velocidad: 0.4,
    points: 0,
    largo: 10,
    ancho: 10,
    alto: 2,
    cubes: [],
    clicked: false,
    back: false,
    reset: function(){
        this.cubes.forEach((cube, i) => {
            if (i){
                global.scene.remove( cube )
            }
        })

        global.scene.position.y = 0
        this.points = 0
        this.UpdatePoints()
        this.velocidad = 0.4
        this.largo = 10
        this.ancho = 10
        this.alto = 2
        this.cubes = [this.base]
        this.clicked = false
        this.back = false
        this.cubes[0].position.y = -15
    },
    Movements: function(axe){
        if (this.back){
            axe += this.velocidad
            if (axe >= global.d * global.aspect){
                this.back = false
            }
        }else {
            axe -= this.velocidad
            if (axe <= - global.d * global.aspect){
                this.back = true
            }
        }
        return axe
    },
    Movement: function(cube){
        if (cube.spawn){
            cube.position.z = this.Movements(cube.position.z)
        } else {
            cube.position.x = this.Movements(cube.position.x)
        }
    },
    LoseCheck: function(){
        const prevCube = this.cubes[this.cubes.length -1]
        const width = prevCube.geometry.parameters.width
        const depth = prevCube.geometry.parameters.depth
        if (this.cube.spawn){
            if (this.cube.position.z <= prevCube.position.z - depth || this.cube.position.z >= prevCube.position.z + depth){
                return true;
            }
        } else {
            if (this.cube.position.x >= prevCube.position.x + width || this.cube.position.x <= prevCube.position.x - width){
                return true;   
            }
        }
        return false
    },
    UpdatePoints: function(){
        document.getElementById('Points').innerHTML = this.points
    }


}
gameProps.cube = Cube(gameProps.largo,gameProps.alto,gameProps.ancho,0)
gameProps.base = Base(gameProps.largo)
gameProps.cubes.push(gameProps.base)


export default gameProps