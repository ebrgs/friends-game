class Amigo {
    constructor(){

    }

    static movimentarFruta() {
        const caixasAmigos = document.querySelectorAll(".caixa_amigo")
        console.log(caixasAmigos)
        let amigoPuxado

        document.addEventListener("dragstart", (event) => {
            event.target.classList.add("dragging")
            amigoPuxado = event.target
        })

        document.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging")
        })

        caixasAmigos.forEach((amigo) => {
            amigo.addEventListener("dragover", (event) => {
                if(amigo.childNodes.length < 1 || amigo.classList[0] == "box_amigos") {
                    const dragging = document.querySelector(".dragging")
                    const applyAfter = this.pegarNovaPosicao(amigo, event.clientY)
            
                    if(applyAfter) {
                        applyAfter.insertAdjacentElement("afterend", dragging)
                    } else {
                        amigo.prepend(dragging)
                    }
                }
            })
        })
    }

    static pegarNovaPosicao(amigo, posY) {
        const amigos = amigo.querySelectorAll(".caixa_amigo:not(.dragging)")
        let result
    
        for (let caixaReferencia of amigos) {
            const box = caixaReferencia.getBoundingClientRect()
            const boxCenterY = box.y + box.height / 2
    
            if (posY >= boxCenterY) result = caixaReferencia
        }
    
        return result
    }

    static verificarFinal() {
        const caixaCaixas = document.querySelector('.box_box')
        const amigos = caixaCaixas.getElementsByClassName('amigo')
        
        if (amigos.length == 5) {
            const caixas = caixaCaixas.querySelectorAll('.caixa_amigo')
            caixas.forEach((caixa) => {
                if(caixa.classList[1] == caixa.children[0].classList[1]){
                    caixa.style.backgroundColor = 'green'
                    caixa.children[0].setAttribute('draggable', 'false')
                    caixa.classList.add('certa')
                    caixa.children[0].classList.add('certa')
                    console.log(caixa.children[0])
                }
            })

        } else {
            const caixas = caixaCaixas.querySelectorAll('.caixa_amigo')
            caixas.forEach((caixa) => {
                if (caixa.classList.contains('certa')){
                    console.log('oi')
                } else {
                    caixa.style.backgroundColor = 'red'
                    setTimeout(() => {
                        caixa.style.backgroundColor = 'white'
                    }, [1000])
                }
            })
        }
    }
}
function resetGame() {
    const botaoReset = document.querySelector('.reset')
    botaoReset.addEventListener('click', () => {
        window.location.reload()
    })
}

const botaoVerificar = document.querySelector('.verificar')
botaoVerificar.addEventListener("click", () => {
    Amigo.verificarFinal()
})

resetGame()
Amigo.movimentarFruta()