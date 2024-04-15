let qtnSuc = 0
let qtnRefri= 0
let qtnAgua = 0
let totalValor=0

var valor_suco 
var valor_refri
var valor_agua

// ---- Seleção de itens, carrinho de compras e cálculo de valor ca compra -----------    
document.addEventListener('DOMContentLoaded', function () {
    fetch('./json/bebidasRepouse.json').then((response) => {
        response.json().then((dados) => {
          //posso manipular o json aqui

        valor_suco = dados.valor_suco
        valor_refri = dados.valor_refri
        valor_agua = dados.valor_agua
    
          for(i=0; i<dados.sucos.length; i++){
            criaCard(dados.sucos, i, valor_suco, "conteinerSucos", "Suco")
          }

          for(i=0; i<dados.refrigerantes.length; i++){
            criaCard(dados.refrigerantes, i, valor_refri, "conteinerRefri", "Refrigerante")
          }

          for(i=0; i<dados.agua.length; i++){
            criaCard(dados.agua, i, valor_agua, "conteinerAgua", "Agua")
          }
        });
    })

    let selectedItems = [];// Array para armazenar os itens selecionados pelo usuário
    let QtnSelectedItems = new Map();
    
    QtnSelectedItems.set('Suco', 0);
    QtnSelectedItems.set('Refrigerante', 0);
    QtnSelectedItems.set('Agua', 0); 

    function removeByElement(array, item){
        const index = array.indexOf(item);
        if (index > -1) { 
          array.splice(index, 1); 
        }
    }

    function criaCard(objItem, i, valor_item, conteiner, categoria){
        let box = document.createElement('div');
        box.className="col-4 mt-3"
        box.id=objItem[i].nome
        
        let boxImg = document.createElement('div');
        boxImg.className="card-body"
  
        let img = document.createElement('img');
        img.className="img-fluid"
        img.src=objItem[i].imagem_url

        let imgCkeck = document.createElement('img');
        imgCkeck.className="check"
        imgCkeck.src="./img/check.jpg"
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
                case "suco":
                    qtnSuc--
                    QtnSelectedItems.set(categoria, qtnSuc)
                    break;
                case "Refrigerante": 
                    qtnRefri--
                    QtnSelectedItems.set(categoria, qtnRefri)
                    break;
                case "Agua":
                    qtnAgua--
                    QtnSelectedItems.set(categoria, qtnAgua)
                    break;
                default:
                    qtnSuc--
                    QtnSelectedItems.set(categoria, qtnSuc)
                   
            }
            
        }else{
            imgCkeck.style.visibility="visible"
            selectedItems.push(idBox)
            saveName();
            switch(categoria){
                case "suco":
                    qtnSuc++
                    QtnSelectedItems.set(categoria, qtnSuc)
                    break;
                case "Refrigerante": 
                    qtnRefri++
                    QtnSelectedItems.set(categoria, qtnRefri)
                    break;
                case "Agua":
                    qtnAgua++
                    QtnSelectedItems.set(categoria, qtnAgua)
                    break;
                default:
                    qtnSuc++
                    QtnSelectedItems.set(categoria, qtnSuc)
            }
        }
        total()

        let txtTotalPrice = document.getElementById('txtTotal'); //elemento onde será exibido o preço total
        txtTotalPrice.textContent = "R$: " + total().toFixed(2);
    }


    const carrinho = document.getElementById("addToCartButton");
    carrinho.addEventListener("click", function() {
        //funcion na pagina criaJsonGreal
        //geraTextIngrientes(dados.paes, dados.queijos, dados.molhos, dados.salada, dados.extra, dados.hamburger,valorPedido)
    })

    // função para guardar os itens (nomes) no carrinho 
    function saveName(){
        let cartItems = document.getElementById('cartItems')
        // Limpa o conteúdo atual do carrinho para não ficar com itens duplicados
        cartItems.innerHTML = "";
        selectedItems.forEach(item=>{
            let list = document.createElement('li');
            let textContent= "1x "+item
            let itemName = document.createTextNode(textContent);
            list.style.display = "flex";
            list.style.marginTop = "10px";
            list.appendChild(itemName); 
            cartItems.appendChild(list);
        })     
    }

    //função para informar a quantidade de produtos do carrinho 
    //TO DO alterar quantidade

    function total(){
        return (QtnSelectedItems.get("Suco") * valor_suco) + (QtnSelectedItems.get("Refrigerante") * valor_refri) + (QtnSelectedItems.get("Agua") * valor_agua)
    }
 
    // Adiciona um evento de clique ao botão 'Add ao Carrinho'
    document.getElementById('addToCartButton').addEventListener('click', () => {
        // Atualiza o texto dentro do elemento totalPrice com o total dos itens selecionados
        let totalPrice = document.getElementById('totalPrice'); //elemento onde será exibido o preço total
        totalPrice.textContent = "Total R$ " + total().toFixed(2);
    });
})