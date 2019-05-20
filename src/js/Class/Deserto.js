export default class Deserto {
    constructor(FPS) {
        this.tick = 0 // frames para contagem de pontos

        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";

        this.element.appendChild(this.chao);
        this.passoChao = 2
        this.zeraPosition()
    }

    zeraPosition() {
        setInterval(() => {
            this.chao.style.backgroundPositionX = '0px'
        }, 10000)
    }

    mover() {
        this.tick++
        if (this.tick / 1000 == 1) {
            this.passoChao += 1
            this.tick = 0
        }
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - (this.passoChao)) + "px"
    }
}