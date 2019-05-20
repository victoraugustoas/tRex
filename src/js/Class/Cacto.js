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

        this.cacto = document.createElement('div')
        this.cacto.className = 'cacto'
        this.cacto.style.backgroundPositionX = this.sprites['2'].pos
        this.cacto.style.right = (Math.random() * 500) * -1 + 'px'

        deserto.element.appendChild(this.cacto)
    }

    mover() {
        this.tick++
        if (this.tick / 1000 == 1) {
            this.passoCacto += 1
            this.tick = 0
        }
        if (parseInt(this.cacto.style.right) > 1200) {
            this.cacto.style.right = '-500px'
            let num = parseInt(Math.random() * 5)
            console.log(num)
            this.cacto.style.backgroundPositionX = this.sprites[`${num}`].pos
        }
        this.cacto.style.right = parseFloat(this.cacto.style.right) + this.passoCacto + 'px'
    }
}