let qtnGrande = 0
let qtnMedio= 0
let qtnPequeno = 0
let qtnEspecial = 0
let totalValor=0

var valor_grande 
var valor_medio
var valor_pequeno
var valor_especial

// ---- Seleção de itens, carrinho de compras e cálculo de valor ca compra -----------    
document.addEventListener('DOMContentLoaded', function () {
    fetch('./json/acompanhamentoRepouse.json').then((response) => {
        response.json().then((dados) => {
          //posso manipular o json aqui

        valor_grande = dados.valor_grande
        valor_medio = dados.valor_medio
        valor_pequeno = dados.valor_pequeno
        valor_especial = dados.valor_especial
    
          for(i=0; i<dados.grande.length; i++){
            criaCard(dados.grande, i, valor_grande, "conteinerGrande", "Grande")
          }

          for(i=0; i<dados.medio.length; i++){
            criaCard(dados.medio, i, valor_medio, "conteinerMedio", "Medio")
          }

          for(i=0; i<dados.pequeno.length; i++){
            criaCard(dados.pequeno, i, valor_pequeno, "conteinerPequeno", "Pequeno")
          }

          for(i=0; i<dados.especial.length; i++){
            criaCard(dados.especial, i, valor_especial, "conteinerEspecial", "Especial")
          }
        });
    })

    
    QtnSelectedItems.set('Grande', 0);
    QtnSelectedItems.set('Medio', 0);
    QtnSelectedItems.set('Pequeno', 0); 
    QtnSelectedItems.set('Especial', 0); 

    function criaCard(objItem, i, valor_item, conteiner, categoria){
        let box = document.createElement('div');
        box.className="col-6 mt-3"
        box.id=objItem[i].nome
        
        let boxImg = document.createElement('div');
        boxImg.className="card-body"
  
        let img = document.createElement('img');
        img.className="img-batata"
        img.src=objItem[i].imagem_url

        let imgCkeck = document.createElement('img');
        imgCkeck.className="check"
        imgCkeck.src="./imagens/check.jpg"
        imgCkeck.style.visibility="hidden"

        let textItem = document.createElement('H6');
        textItem.className="card-footer mt-3 text-center"
        textItem.innerHTML= objItem[i].nome
        
        const conteinerItem = document.getElementById(conteiner);
        conteinerItem.appendChild(box)

        box.onclick=function(){  
            checkItem(this.id, imgCkeck, categoria, valor_item)
        }

        box.appendChild(boxImg)
        boxImg.appendChild(img)
        boxImg.appendChild(imgCkeck)

        box.appendChild(textItem)
    }

    function checkItem(idBox, imgCkeck, categoria){
        if(selectedItems.includes(idBox)==true){
            imgCkeck.style.visibility="hidden"
            removeByElement(selectedItems, idBox)
            switch(categoria){
                case "Grande":
                    qtnGrande--
                    QtnSelectedItems.set(categoria, qtnGrande)
                    break;
                case "Medio": 
                    qtnMedio--
                    QtnSelectedItems.set(categoria, qtnMedio)
                    break;
                case "Pequeno":
                    qtnPequeno--
                    QtnSelectedItems.set(categoria, qtnPequeno)
                    break;
                case "Especial":
                    qtnEspecial--
                    QtnSelectedItems.set(categoria, qtnEspecial)
                    break;
                default:
                    qtnGrande--
                    QtnSelectedItems.set(categoria, qtnGrande)
            }
            
        }else{
            imgCkeck.style.visibility="visible"
            selectedItems.push(idBox)
            switch(categoria){
                case "Grande":
                    qtnGrande++
                    console.log(qtnGrande)
                    QtnSelectedItems.set(categoria, qtnGrande)
                    break;
                case "Medio": 
                    qtnMedio++
                    QtnSelectedItems.set(categoria, qtnMedio)
                    break;
                case "Pequeno":
                    qtnPequeno++
                    QtnSelectedItems.set(categoria, qtnPequeno)
                    break;
                case "Especial":
                    qtnEspecial++
                    QtnSelectedItems.set(categoria, qtnEspecial)
                    break;
                default:
                    qtnGrande++
                    QtnSelectedItems.set(categoria, qtnGrande)
            }
        }
        saveBebida();
        localStorage.setItem("selectedItems", selectedItems);

        let txtTotalPrice = document.getElementById('txtTotal'); //elemento onde será exibido o preço total
        txtTotalPrice.textContent = "R$: " + total().toFixed(2);
    }

    function total(){
        
        return valorPedido + (QtnSelectedItems.get("Grande") * valor_grande) + (QtnSelectedItems.get("Medio") * valor_medio) + 
            (QtnSelectedItems.get("Pequeno") * valor_pequeno) + (QtnSelectedItems.get("Especial") * valor_especial)
    }

    // Adiciona um evento de clique ao botão 'Add ao Carrinho'
    document.getElementById('addToCartButton').addEventListener('click', () => {
        // Atualiza o texto dentro do elemento totalPrice com o total dos itens selecionados
        let totalPrice = document.getElementById('totalPrice'); //elemento onde será exibido o preço total
        totalPrice.textContent = "Total R$ " + total().toFixed(2);
    });
})

fetch('./json/sampleIngredintes.json').then((response) => {
        response.json().then((dados) => {
        //posso manipular o json aqui

        const carrinho = document.getElementById("addToCartButton");
        carrinho.addEventListener("click", function() {
            //funcion na pagina criaJsonGreal
            geraTextIngrientes(dados.paes, dados.queijos, dados.molhos, dados.salada, dados.extra, dados.hamburger,valorPedido)
        })
    
    })
})