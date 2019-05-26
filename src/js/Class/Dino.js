export default class Dino {
    constructor(deserto) {
        this.velocidadePernas = 10
        this.sprites = {
            'correr1': '-765px',
            'correr2': '-809px',
            'pulando': '-676px',
            'agachado1': '-941px',
            'agachado2': '-1000px'
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = "140px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.pulando;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);

        this.correndo = true
    }

    moverPernas() {
        if (this.correndo) {
            this.correndo = setInterval(() => {
                if (this.status == 0) {
                    this.element.style.width = '46px'
                    this.element.style.height = '45px'
                    this.element.style.backgroundPositionY = '-3px'
                    this.element.style.backgroundPositionX =
                        (this.element.style.backgroundPositionX == this.sprites.correr1) ?
                            this.sprites.correr2 : this.sprites.correr1;
                }
                if (this.status == 3) {
                    if (this.element.style.backgroundPositionX == this.sprites.agachado1) {
                        this.element.style.backgroundPositionX = this.sprites.agachado2
                        this.element.style.width = '59px'
                        this.element.style.height = '30px'
                        this.element.style.backgroundPositionY = '-19px'
                    } else {
                        this.element.style.backgroundPositionX = this.sprites.agachado1
                        this.element.style.width = '59px'
                        this.element.style.height = '30px'
                        this.element.style.backgroundPositionY = '-19px'
                    }
                }
            }, 1000 / this.velocidadePernas)
        }
    }

    correr() {
        if (this.status == 1) { // pulando
            this.element.style.backgroundPositionX = this.sprites.pulando; // seta a imagem do dino pulando
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 4) + "px";
            if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
        } else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 4) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
    }

    pause() {
        clearInterval(this.correndo)
    }

    resume() {
        this.moverPernas()
    }

    gameOver() {
        clearInterval(this.correndo)
        this.correndo = false
    }
}