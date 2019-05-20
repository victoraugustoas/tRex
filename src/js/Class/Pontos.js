export default class Pontos {
    constructor(deserto) {
        this.pontos = 0 //pontuacao do jogador
        this.tick = 0 // frames para contagem de pontos

        // criando o elemento dque mostrara os pontos
        this.element = document.createElement('div')
        this.element.className = 'pontuacao'
        deserto.element.appendChild(this.element)

        // posicao dos digitos que estao no sprite
        this.numeros = {
            0: { pos: '-484px' },
            1: { pos: '-495px' },
            2: { pos: '-504px' },
            3: { pos: '-514px' },
            4: { pos: '-524px' },
            5: { pos: '-534px' },
            6: { pos: '-544px' },
            7: { pos: '-554px' },
            8: { pos: '-564px' },
            9: { pos: '-574px' }
        }

        //  inicialização dos prontos
        this.digitos = []

        for (let i = 0; i < 6; i++) {
            let div = document.createElement('div')
            div.className = 'pontos'
            div.style.backgroundPositionX = this.numeros[Object.keys(this.numeros)[i]]
            this.element.appendChild(div)

            this.digitos.push(div)
            this.digitos[i].style.backgroundPositionX = this.numeros['0'].pos
        }
    }

    displayPontos() {
        let str = `${this.pontos}`

        let j = this.digitos.length - 1
        for (let i = str.length - 1; i > -1; i-- , j--) {
            let num = str[i]
            this.digitos[j].style.backgroundPositionX = this.numeros[num].pos
        }
    }

    contaPontos() {
        // a cada 30 frames, mais um ponto
        this.tick++
        if (this.tick / 30 == 1) {
            this.pontos++
            this.tick = 0
        }
    }
}