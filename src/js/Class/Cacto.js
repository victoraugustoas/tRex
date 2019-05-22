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

        this.passoCacto = 2 // qtd de pixels q o cacto ira percorrer a cada frame

        this.groupCactos = document.createElement('div')
        this.groupCactos.className = 'groupCacto'

        this.qtdCactos = Math.random() * 4
        this.cactos = []

        for (let i = 0; i < this.qtdCactos; i++) {
            let figureCacto = parseInt(Math.random() * 5)

            let element = document.createElement('div')
            element.className = 'cacto'
            element.style.backgroundPositionX = this.sprites[`${figureCacto}`].pos

            this.groupCactos.appendChild(element)

            this.cactos.push(element)
        }
        this.groupCactos.style.right = (Math.random() * 500) * -1 + 'px'
        deserto.element.appendChild(this.groupCactos)
    }

    redefinirGrupo() {
        this.qtdCactos = Math.random() * 4
        this.cactos.forEach((ele) => {
            ele.remove()
        })
        this.cactos = []
        for (let i = 0; i < this.qtdCactos; i++) {
            let figureCacto = parseInt(Math.random() * 5)

            let element = document.createElement('div')
            element.className = 'cacto'
            element.style.backgroundPositionX = this.sprites[`${figureCacto}`].pos

            this.groupCactos.appendChild(element)

            this.cactos.push(element)
        }
    }

    mover() {
        this.tick++;
        if (this.tick / 1000 == 1) {
            this.passoCacto += 1
            this.tick = 0
        }
        if (parseInt(this.groupCactos.style.right) > 1200) {
            this.groupCactos.style.right = '-500px'
            let num = parseInt(Math.random() * 5)
            this.redefinirGrupo()
        }
        this.groupCactos.style.right = parseFloat(this.groupCactos.style.right) + this.passoCacto + 'px'
    }
}