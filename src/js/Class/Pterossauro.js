export default class Pterossauro {
    constructor(deserto, FPS) {
        this.FPS = FPS
        this.deserto = deserto
        this.tick = 0 // frames para contagem de pontos

        this.sprites = {
            0: { pos: '-133px' },
            1: { pos: '-180px' }
        }

        this.element = document.createElement('div')
        this.element.className = 'pterossauroMalucao'
        this.element.style.backgroundPositionX = this.sprites['0'].pos
        this.element.style.right = '-200px'
        this.deserto.element.appendChild(this.element)
        this.passo = 6

        this.correndo = null
        this.movendo = null
    }

    correr() {
        this.correndo = setInterval(() => {
            if (this.element.style.backgroundPositionX == this.sprites['0'].pos) {
                this.element.style.backgroundPositionX = this.sprites['1'].pos
            } else {
                this.element.style.backgroundPositionX = this.sprites['0'].pos
            }
        }, 250)
    }

    mover() {
        this.movendo = setInterval(() => {
            this.tick++

            if (parseInt(this.element.style.right) > window.innerWidth + 100) {
                this.element.style.top = Math.floor(Math.random() * (this.deserto.element.offsetHeight - 50)) + "px";
                this.element.style.right = "-200px"
            }
            if (this.tick / 1000 == 1) {
                this.passo += 0.5
                this.tick = 0
            }

            this.element.style.right = (parseFloat(this.element.style.right) + this.passo) + "px"
        }, 1000 / this.FPS)
    }

    pause() {
        clearInterval(this.correndo)
        clearInterval(this.movendo)
    }

    resume() {
        this.mover()
        this.correr()
    }

    gameOver() {
        clearInterval(this.correndo)
        clearInterval(this.movendo)
    }
}