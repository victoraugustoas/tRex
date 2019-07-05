import axios from 'axios'
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
let pontos = null
let hipontos = 0
let pauseGame = false

let divGameOver = null
let textGameOver = null
let buttonRestart = null

let loopNuvens = null
let posNuvem = 0

const colisor = new Colisor()

const numberOfPterossauros = 1
let pterossauros = []

const numberOfCactos = 1
let cactos = []

async function init() {
    deserto = new Deserto(FPS);
    dino = new Dino(deserto);

    for (let i = 0; i < numberOfClouds; i++) {
        nuvens.push(new Nuvem(deserto, FPS))
    }

    for (let i = 0; i < numberOfPterossauros; i++) {
        pterossauros.push(new Pterossauro(deserto, FPS))
    }
    try {
        let pontuacao_max = await axios.get('/pontuacao_max')
        console.log('jogo', pontuacao_max.data)
        pontos = new Pontos(deserto, pontuacao_max.data)
        hipontos = pontuacao_max.data
    } catch (err) {
        pontos = new Pontos(deserto, hipontos)
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
        if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1
    })
    window.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowDown' && dino.status == 0) dino.status = 3
    })
    window.addEventListener('keyup', function (e) {
        if (dino.status == 3) dino.status = 0
    })
    window.addEventListener('keypress', (e) => {
        if (e.key == 'p') {
            pause()
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
                posNuvem = 0
                let flag = true
                loopNuvens = setInterval(() => {
                    if (posNuvem == 0 && flag) {
                        nuvens[posNuvem].mover()
                        flag = false
                    }
                    if (parseInt(nuvens[posNuvem].element.style.right) > (window.innerWidth / 2)) {
                        posNuvem++
                        if (posNuvem < nuvens.length) {
                            nuvens[posNuvem].mover()
                        } else {
                            clearInterval(loopNuvens)
                        }
                    }
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

function refazerReferencias() {
    clearInterval(loopNuvens)
    nuvens = [];

    start = false
    deserto.destroi()
    deserto = null
    dino = null
    pauseGame = false

    divGameOver = null
    textGameOver = null
    buttonRestart = null

    pterossauros = []

    cactos = []
}

function restart() {
    if (pontos.pontos > hipontos) {
        hipontos = pontos.pontos
    }
    divGameOver.removeChild(buttonRestart)
    divGameOver.removeChild(textGameOver)
    deserto.element.removeChild(divGameOver)

    refazerReferencias()
    init()
}

function pause() {
    if (pauseGame == false) {
        dino.pause()
        pterossauros.forEach((ele) => ele.pause())
        nuvens.forEach((ele) => ele.pause())
        clearInterval(loopNuvens)
        clearInterval(gameLoop)

        pauseGame = true
    } else {
        dino.resume()
        pterossauros.forEach((ele) => ele.resume())


        nuvens.forEach((ele, idx) => {
            if (idx <= posNuvem) {
                ele.resume()
            }
        })
        let flag = false
        loopNuvens = setInterval(() => {
            if (posNuvem == 0 && flag) {
                nuvens[posNuvem].mover()
                flag = false
            }
            if (parseInt(nuvens[posNuvem].element.style.right) > (window.innerWidth / 2)) {
                posNuvem++
                if (posNuvem < nuvens.length) {
                    nuvens[posNuvem].resume()
                } else {
                    clearInterval(loopNuvens)
                }
            }
        }, 1000);


        gameLoop = setInterval(run, 1000 / FPS);

        pauseGame = false
    }
}

function gameOver() {

    try {
        axios.post('/pontuacao', {
            pontuacao: pontos.pontos,
            _csrf: document.getElementById('_csrf').value
        })
    } catch (err) { }

    clearInterval(gameLoop);
    function over(ele) { ele.gameOver() }

    pterossauros.forEach(over)
    nuvens.forEach(over)
    dino.gameOver()

    divGameOver = document.createElement('div')
    divGameOver.className = 'gameOver'

    buttonRestart = document.createElement('div')
    buttonRestart.className = 'buttonRestart'
    buttonRestart.onclick = () => restart()

    textGameOver = document.createElement('div')
    textGameOver.className = 'textGameOver'

    divGameOver.appendChild(textGameOver)
    divGameOver.appendChild(buttonRestart)

    deserto.element.appendChild(divGameOver)
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
            gameOver()
        }
    } catch (e) { }
    try {
        if (colisor.houveColisaoPterossauro(dino.element, pterossauros[0].element)) {
            //Em caso de game over
            gameOver()
        }
    } catch (e) { }
}
init()
keys()