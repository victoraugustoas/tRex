import '../css/estilos.css'
import Pontos from './Class/Pontos'
import Deserto from './Class/Deserto'
import Dino from './Class/Dino'
import Nuvem from './Class/Nuvem'

const FPS = 60;
const numberOfClouds = 7;
let start = false
let gameLoop;
let deserto;
let dino;
let nuvens = [];
let pontos = 0;
let pontuacao = null

function init() {
    deserto = new Deserto(FPS);
    dino = new Dino(deserto);

    pontuacao = document.createElement('div')
    document.body.appendChild(pontuacao)

    for (let i = 0; i < numberOfClouds; i++) {
        nuvens.push(new Nuvem(deserto, FPS))
    }

    diaNoite()
    pontos = new Pontos(pontuacao)
    pontos.contaPontos()
}

function keys() {
    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
    });

    window.addEventListener("keyup", (e) => {
        if (e.key == "ArrowUp") {
            if (!start) {
                gameLoop = setInterval(run, 1000 / FPS);
                start = true

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

function displayPontos() {
    let str = `${pontos}`
    let qtdDigitos = 6 - str.length
    let points = ''

    for (let i = 0; i < str.length; i++) {

    }
    return points + pontos
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
    displayPontos()
    //Em caso de game over
    //clearInterval(gameLoop);
}
init()
keys()