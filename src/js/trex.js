import '../css/estilos.css'
import Pontos from './Class/Pontos'
import Deserto from './Class/Deserto'
import Dino from './Class/Dino'
import Nuvem from './Class/Nuvem'
import Cacto from './Class/Cacto'
import Pterossauro from './Class/Pterossauro'

const FPS = 60;
const numberOfClouds = 10;
let nuvens = [];

let start = false
let gameLoop;
let deserto;
let dino;
let pontos = 0;

const numberOfCactos = 1
let cactos = []

function init() {
    deserto = new Deserto(FPS);
    dino = new Dino(deserto);

    for (let i = 0; i < numberOfClouds; i++) {
        nuvens.push(new Nuvem(deserto, FPS))
    }

    pontos = new Pontos(deserto, FPS)

    for (let i = 0; i < numberOfCactos; i++) {

    }
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
        if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
    });

    window.addEventListener("keyup", (e) => {
        if (e.key == "ArrowUp") {
            if (!start) {
                start = true

                gameLoop = setInterval(run, 1000 / FPS);
                diaNoite() // o jogo fica alternando entre escuro e claro

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

function run() {
    dino.correr();
    deserto.mover();
    pontos.contaPontos()
    pontos.displayPontos()
    cactos.forEach((ele) => ele.mover())
    //Em caso de game over
    //clearInterval(gameLoop);
}
init()
keys()