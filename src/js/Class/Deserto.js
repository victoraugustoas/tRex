export default class Deserto {
    constructor(FPS) {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";

        this.element.appendChild(this.chao);
        this.passoChao = 2
        this.aceleracao = FPS
        this.zeraPosition()
    }

    zeraPosition() {
        setInterval(() => {
            this.chao.style.backgroundPositionX = '0px'
        }, 10000)
    }

    mover() {
        this.aceleracao += this.FPS
        if (this.aceleracao / 1000 > 1) {
            this.passoChao += 0.05
            this.aceleracao = this.FPS
        }
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - (this.passoChao)) + "px"
    }
}