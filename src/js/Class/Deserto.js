export default class Deserto {
    constructor(FPS) {
        this.tick = 0 // frames para contagem de pontos

        this.element = document.getElementById('deserto');
        this.element.className = "deserto";

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";

        this.element.appendChild(this.chao);
        this.passoChao = 3 // qtd de pixels q o deserto ira percorrer a cada frame
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

    destroi() {
        let nodeList = this.element.childNodes
        while (nodeList.length != 0) {
            nodeList.forEach((ele) => ele.parentNode.removeChild(ele))
        }
    }
}