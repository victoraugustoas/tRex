export default class Colisor {

    colisaoHorizontal(elementA, elementB) {
        return elementA.right >= elementB.left && elementA.bottom >= elementB.top && elementB.left > 0
    }

    houveColisaoCacto(elementA, elementB) {
        const a = elementA.getBoundingClientRect()
        const b = elementB.getBoundingClientRect()

        if (this.colisaoHorizontal(a, b)) {
            return true
        } else {
            return false
        }
    }

    colisaoVertical(elementA, elementB) {
        return (elementA.top <= elementB.bottom && elementA.bottom >= elementB.top) && elementA.right >= elementB.left && elementB.left > 0
    }

    houveColisaoPterossauro(elementA, elementB) {
        const a = elementA.getBoundingClientRect()
        const b = elementB.getBoundingClientRect()

        if (this.colisaoVertical(a, b)) {
            return true
        } else {
            return false
        }
    }

}