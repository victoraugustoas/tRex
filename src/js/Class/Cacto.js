export default class Cacto {
    constructor(deserto) {
        this.tick = 0 // frames para contagem de pontos
        this.sprites = {
            0: { pos: '-228px' },
            1: { pos: '-262px' },
            2: { pos: '-296px' },
            3: { pos: '-332px' },
            4: { pos: '-382px' },
            5: { pos: '-407px' }
        }

        this.passoCacto = 3 // qtd de pixels q o cacto ira percorrer a cada frame

        this.element = document.createElement('div')
        this.element.className = 'groupCacto'

        this.qtdCactos = Math.random() * 4
        this.cactos = []

        this.redefinirGrupo()

        this.element.style.right = (Math.random() * window.innerWidth + 100) * -1 + 'px'
        deserto.element.appendChild(this.element)
    }

    redefinirGrupo() {
        this.qtdCactos = Math.random() * 4
        this.cactos.forEach((ele) => {
            ele.remove()
        })
        this.cactos = []
        for (let i = 0; i < this.qtdCactos; i++) {
            let figureCacto = parseInt(Math.random() * 4)

            let element = document.createElement('div')
            element.className = 'cacto'
            element.style.backgroundPositionX = this.sprites[`${figureCacto}`].pos

            if (figureCacto == 0 || figureCacto == 1 || figureCacto == 2) {
                element.style.height = '37px'
                element.style.width = '17px'
            }

            this.element.appendChild(element)

            this.cactos.push(element)
        }
    }

    mover() {
        this.tick++;
        if (this.tick / 1000 == 1) {
            this.passoCacto += 1
            this.tick = 0
        }
        if (parseInt(this.element.style.right) > window.innerWidth + 100) {
            this.element.style.right = '-500px'
            this.redefinirGrupo()
        }
        this.element.style.right = parseFloat(this.element.style.right) + this.passoCacto + 'px'
    }
}