export default class Pontos {
    constructor(pontuacao) {
        this.pontos = 0
        this.numeros = {
            0: { pos: '-484px' },
            1: { pos: '-495px' },
            2: { pos: '-504px' },
            3: { pos: '-514px' },
            4: { pos: '-524px' }
        }

        this.digitos = []

        for (let i = 0; i < 1; i++) {
            let div = document.createElement('div')
            div.className = 'pontos'
            div.style.backgroundPositionX = this.numeros[Object.keys(this.numeros)[i]]
            pontuacao.appendChild(div)

            this.digitos.push(div)
        }
        this.digitos[0].style.backgroundPositionX = this.numeros['0'].pos
    }

    contaPontos() {
        setInterval(() => {
            this.pontos++
        }, 100)
    }
}