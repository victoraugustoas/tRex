export default class Nuvem {
    constructor(deserto, FPS) {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "-200px";
        this.element.style.top = Math.floor(Math.random() * 120) + "px";
        deserto.element.appendChild(this.element);

        this.scale = 1
        this.passoNuvem = Math.random() * 2 + 1
        this.element.style.right = (parseInt(this.element.style.right) + this.passoNuvem) + "px"
        this.element.style.transform = `scale(${this.scale})`
    }

    mover() {
        setInterval(() => {
            this.passoNuvem = Math.random() * 2 + 1
            this.scale = Math.random() * 1 + 1
            if (parseInt(this.element.style.right) > 750) {
                this.element.style.top = Math.floor(Math.random() * 120) + "px";
                this.element.style.right = "-200px"
                this.element.style.transform = `scale(${this.scale})`
            }
            this.element.style.right = (parseInt(this.element.style.right) + this.passoNuvem) + "px"
        }, 1000 / this.FPS)
    }
}