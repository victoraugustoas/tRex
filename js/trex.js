(function() {

    const FPS = 60;
    const numberOfClouds = 7;
    let start = false
    var gameLoop;
    var deserto;
    var dino;
    var nuvens = [];
    let pontos = 0;
    let pontuacao = null

    function init() {
        deserto = new Deserto();
        dino = new Dino();

        pontuacao = document.createElement('div')
        document.body.appendChild(pontuacao)

        for (let i = 0; i < numberOfClouds; i++) {
            nuvens.push(new Nuvem())
        }

        diaNoite()
        pontos = new Pontos()
        pontos.contaPontos()
    }

    function keys() {
        window.addEventListener("keydown", function(e) {
            if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
        });

        window.addEventListener("keyup", (e) => {
            console.log('oi')
            if (e.key == "ArrowUp") {
                if (!start) {
                    gameLoop = setInterval(run, 1000 / FPS);
                    start = true

                    dino.moverPernas()
                    let i = 0;
                    let loopNuvens = setInterval(() => {
                        if (i < nuvens.length) {
                            nuvens[i].mover()
                        } else {
                            clearInterval(loopNuvens)
                        }
                        i++
                    }, 1000);
                }
            }
        })

    }

    class Deserto {
        constructor() {
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
            this.aceleracao += FPS
            if (this.aceleracao / 1000 > 1) {
                this.passoChao += 0.05
                this.aceleracao = FPS
            }
            this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - (this.passoChao)) + "px"
        }
    }

    class Dino {
        constructor() {
            this.velocidadePernas = 100
            this.sprites = {
                'correr1': '-766px',
                'correr2': '-810px',
                'pulando': '-676px'
            };
            this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
            this.alturaMaxima = "80px";
            this.element = document.createElement("div");
            this.element.className = "dino";
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = "0px";
            deserto.element.appendChild(this.element);
        }

        moverPernas() {
            setInterval(() => {
                if (this.status == 0) {
                    this.element.style.backgroundPositionX =
                        (this.element.style.backgroundPositionX == this.sprites.correr1) ?
                        this.sprites.correr2 : this.sprites.correr1;
                }
            }, this.velocidadePernas)
        }

        correr() {
            if (this.status == 1) {
                this.element.style.backgroundPositionX = this.sprites.pulando;
                this.element.style.bottom = (parseInt(this.element.style.bottom) + 4) + "px";
                if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
            } else if (this.status == 2) {
                this.element.style.bottom = (parseInt(this.element.style.bottom) - 4) + "px";
                if (this.element.style.bottom == "0px") this.status = 0;
            }
        }
    }

    class Nuvem {
        constructor() {
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
            }, 1000 / FPS)
        }
    }

    class Pontos {
        constructor() {
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

    function displayPontos() {
        let str = `${pontos}`
        let qtdDigitos = 6 - str.length
        let points = ''

        for (let i = 0; i < str.length; i++) {

        }
        return points + pontos
    }

    function diaNoite() {
        let diaNoite = false
        setInterval(() => {
            if (diaNoite) {
                document.body.style.backgroundColor = '#fff'
                diaNoite = false
            } else {
                document.body.style.backgroundColor = '#000'
                diaNoite = true
            }
        }, 60000)
    }

    function run() {
        dino.correr();
        deserto.mover();
        displayPontos()
            //Em caso de game over
            //clearInterval(gameLoop);
    }
    init()
    keys()
})();