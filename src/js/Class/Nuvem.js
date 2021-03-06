export default class Nuvem {
    constructor(deserto, FPS) {
        this.FPS = FPS
        this.deserto = deserto
        this.tick = 0 // frames para contagem de pontos

        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "-50px";
        this.element.style.top = Math.floor(Math.random() * (this.deserto.element.offsetHeight - 50)) + "px";
        deserto.element.appendChild(this.element);

        this.scale = 1
        this.passoNuvem = 0.5
        this.element.style.right = (parseInt(this.element.style.right) + this.passoNuvem) + "px"
        this.element.style.transform = `scale(${this.scale})`

        this.movendo = true
    }

    mover() {
        if (this.movendo) {
            this.movendo = setInterval(() => {
                this.tick++
                this.scale = Math.random() * 1 + 1

                if (parseInt(this.element.style.right) > window.innerWidth + 100) {
                    this.element.style.top = Math.floor(Math.random() * (this.deserto.element.offsetHeight - 50)) + "px";
                    this.element.style.right = "-200px"
                    this.element.style.transform = `scale(${this.scale})`
                }
                if (this.tick / 2000 == 1) {
                    this.passoNuvem += 0.3
                    this.tick = 0
                }

                this.element.style.right = (parseFloat(this.element.style.right) + this.passoNuvem) + "px"
            }, 1000 / this.FPS)
        }
    }

    pause() {
        clearInterval(this.movendo)
        this.movendo = false
    }

    resume() {
        this.movendo = true
        this.mover()
    }

    gameOver() {
        clearInterval(this.movendo)
        this.movendo = false
    }
}