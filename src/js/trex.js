import '../css/estilos.css'
import Pontos from './Class/Pontos'
import Deserto from './Class/Deserto'
import Dino from './Class/Dino'
import Nuvem from './Class/Nuvem'
import Cacto from './Class/Cacto'
import Pterossauro from './Class/Pterossauro'
import Colisor from './Class/Colisor'

const FPS = 60;
const numberOfClouds = 10;
let nuvens = [];

let start = false
let gameLoop;
let deserto;
let dino;
let pontos = 0
let pauseGame = false
const colisor = new Colisor()

const numberOfPterossauros = 1
let pterossauros = []

const numberOfCactos = 1
let cactos = []

function init() {
    deserto = new Deserto(FPS);
    dino = new Dino(deserto);

    for (let i = 0; i < numberOfClouds; i++) {
        nuvens.push(new Nuvem(deserto, FPS))
    }

    for (let i = 0; i < numberOfPterossauros; i++) {
        pterossauros.push(new Pterossauro(deserto, FPS))
    }

    pontos = new Pontos(deserto, FPS)

    let i = 0
    let loopCactos = setInterval(() => {
        if (i < numberOfCactos) {
            cactos.push(new Cacto(deserto))
        } else {
            clearInterval(loopCactos)
        }
        i++
    }, 1000)
}

function keys() {
    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1
    })
    window.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowDown') dino.status = 3
    })
    window.addEventListener('keyup', function (e) {
        if (dino.status == 3) dino.status = 0
    })
    window.addEventListener('keypress', (e) => {
        if (e.key == 'p') {
            if (pauseGame == false) {
                dino.pause()
                pterossauros.forEach((ele) => ele.pause())
                nuvens.forEach((ele) => ele.pause())
                clearInterval(gameLoop)

                pauseGame = true
            } else {
                dino.resume()
                pterossauros.forEach((ele) => ele.resume())
                nuvens.forEach((ele) => ele.resume())
                gameLoop = setInterval(run, 1000 / FPS);

                pauseGame = false
            }
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key == "ArrowUp") {
            if (!start) {
                start = true

                gameLoop = setInterval(run, 1000 / FPS);
                diaNoite() // o jogo fica alternando entre escuro e claro

                pterossauros.forEach((ele) => {
                    ele.correr()
                    ele.mover()
                })

                // funções assíncronas
                dino.moverPernas()
                let i = 0;
                let loopNuvens = setInterval(() => {
                    if (i < nuvens.length) {
                        nuvens[i].mover()
                    } else {
                        clearInterval(loopNuvens)
                    }
                    i++
                }, 1000);
            }
        }
    })

}

function diaNoite() {
    let diaNoite = false
    setInterval(() => {
        if (diaNoite) {
            document.body.style.backgroundColor = '#fff'
            diaNoite = false
        } else {
            document.body.style.backgroundColor = '#000'
            diaNoite = true
        }
    }, 60000)
}

function gameOver() {
    function over(ele) { ele.gameOver() }

    pterossauros.forEach(over)
    nuvens.forEach(over)
    dino.gameOver()
}

function run() {
    dino.correr();
    deserto.mover();
    pontos.contaPontos()
    pontos.displayPontos()
    cactos.forEach((ele) => ele.mover())
    try {
        if (colisor.houveColisaoCacto(dino.element, cactos[0].element)) {
            //Em caso de game over
            clearInterval(gameLoop);
            gameOver()
        }
    } catch (e) { }
    try {
        if (colisor.houveColisaoPterossauro(dino.element, pterossauros[0].element)) {
            //Em caso de game over
            clearInterval(gameLoop);
            gameOver()
        }
    } catch (e) { }
}
init()
keys()