let valorPedido=22.99

//-------------Bebida----------------
let selectedBebidas = []
let QtnSelectedBebidas = new Map();

QtnSelectedBebidas.set('Suco', 0);
QtnSelectedBebidas.set('Refrigerante', 0);
QtnSelectedBebidas.set('Agua', 0); 

let qtnSuc = 0
let qtnRefri= 0
let qtnAgua = 0

//---------------Acompanhamento-----------------
let selectedAcompanhamento = []
let QtnSelectedAcompanhamento = new Map();

QtnSelectedAcompanhamento.set('Grande', 0);
QtnSelectedAcompanhamento.set('Medio', 0);
QtnSelectedAcompanhamento.set('Pequeno', 0); 
QtnSelectedAcompanhamento.set('Especial', 0); 

let qtnGrande = 0
let qtnMedio= 0
let qtnPequeno = 0
let qtnEspecial = 0


document.addEventListener('DOMContentLoaded', function () {
    //Bebida
    fetch('./json/bebidasRepouse.json').then((response) => {
        response.json().then((dados) => {
          //posso manipular o json aqui

        valor_suco = dados.valor_suco
        valor_refri = dados.valor_refri
        valor_agua = dados.valor_agua
    
          for(i=0; i<dados.sucos.length; i++){
            criaCard(dados.sucos, i, valor_suco, "conteinerSucos", "Suco", "bebida")
          }

          for(i=0; i<dados.refrigerantes.length; i++){
            criaCard(dados.refrigerantes, i, valor_refri, "conteinerRefri", "Refrigerante", "bebida")
          }

          for(i=0; i<dados.agua.length; i++){
            criaCard(dados.agua, i, valor_agua, "conteinerAgua", "Agua", "bebida")
          }
        });
    })

    //acompanhamento
    fetch('./json/acompanhamentoRepouse.json').then((response) => {
        response.json().then((dados) => {

        valor_grande = dados.valor_grande
        valor_medio = dados.valor_medio
        valor_pequeno = dados.valor_pequeno
        valor_especial = dados.valor_especial
    
          for(i=0; i<dados.grande.length; i++){
            criaCard(dados.grande, i, valor_grande, "conteinerGrande", "Grande", "acompanhamento")
          }

          for(i=0; i<dados.medio.length; i++){
            criaCard(dados.medio, i, valor_medio, "conteinerMedio", "Medio", "acompanhamento")
          }

          for(i=0; i<dados.pequeno.length; i++){
            criaCard(dados.pequeno, i, valor_pequeno, "conteinerPequeno", "Pequeno", "acompanhamento")
          }

          for(i=0; i<dados.especial.length; i++){
            criaCard(dados.especial, i, valor_especial, "conteinerEspecial", "Especial", "acompanhamento")
          }
        });
    })

})


function criaCard(objItem, i, valor_item, conteiner, categoria, tipo){
    let box = document.createElement('div');
    box.className= tipo=="bebida" ?"col-4 mt-3" : "col-6 mt-3"
    box.id=objItem[i].nome
    
    let boxImg = document.createElement('div');
    boxImg.className="card-body"

    let img = document.createElement('img');
    img.className= tipo=="bebida" ? "img-fluid" : "img-batata"
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
        if(tipo=="bebida"){
            checkItemForBebida(this.id, imgCkeck, categoria, valor_item)
        }else{
            checkItemForAcompanhamento(this.id, imgCkeck, categoria, valor_item)
        }

        let txtTotalPriceFooter = document.getElementById('txtTotal'); //elemento onde será exibido o preço total
        txtTotalPriceFooter.textContent = "R$: " + total().toFixed(2);

        let totalPriceCarrinho = document.getElementById('totalPrice'); //elemento onde será exibido o preço total
        totalPriceCarrinho.textContent = "Total R$ " + total().toFixed(2);
    }

    box.appendChild(boxImg)
    boxImg.appendChild(img)
    boxImg.appendChild(imgCkeck)

    box.appendChild(textItem)
}

function checkItemForBebida(idBox, imgCkeck, categoria){
    if(selectedBebidas.includes(idBox)==true){
        imgCkeck.style.visibility="hidden"
        removeByElement(selectedBebidas, idBox)
        switch(categoria){
            case "suco":
                qtnSuc--
                QtnSelectedBebidas.set(categoria, qtnSuc)
                break;
            case "Refrigerante": 
                qtnRefri--
                QtnSelectedBebidas.set(categoria, qtnRefri)
                break;
            case "Agua":
                qtnAgua--
                QtnSelectedBebidas.set(categoria, qtnAgua)
                break;
            default:
                qtnSuc--
                QtnSelectedBebidas.set(categoria, qtnSuc)
        }
        
    }else{
        imgCkeck.style.visibility="visible"
        selectedBebidas.push(idBox)
        switch(categoria){
            case "suco":
                qtnSuc++
                QtnSelectedBebidas.set(categoria, qtnSuc)
                break;
            case "Refrigerante": 
                qtnRefri++
                QtnSelectedBebidas.set(categoria, qtnRefri)
                break;
            case "Agua":
                qtnAgua++
                QtnSelectedBebidas.set(categoria, qtnAgua)
                break;
            default:
                qtnSuc++
                QtnSelectedBebidas.set(categoria, qtnSuc)
        }
    }

    saveNoCarrinho("Bebida");
}

function checkItemForAcompanhamento(idBox, imgCkeck, categoria){
    if(selectedAcompanhamento.includes(idBox)==true){
        imgCkeck.style.visibility="hidden"
        removeByElement(selectedAcompanhamento, idBox)
        switch(categoria){
            case "Grande":
                qtnGrande--
                QtnSelectedAcompanhamento.set(categoria, qtnGrande)
                break;
            case "Medio": 
                qtnMedio--
                QtnSelectedAcompanhamento.set(categoria, qtnMedio)
                break;
            case "Pequeno":
                qtnPequeno--
                QtnSelectedAcompanhamento.set(categoria, qtnPequeno)
                break;
            case "Especial":
                qtnEspecial--
                QtnSelectedAcompanhamento.set(categoria, qtnEspecial)
                break;
            default:
                qtnGrande--
                QtnSelectedAcompanhamento.set(categoria, qtnGrande)
        }
        
    }else{
        imgCkeck.style.visibility="visible"
        selectedAcompanhamento.push(idBox)
        switch(categoria){
            case "Grande":
                qtnGrande++
                console.log(qtnGrande)
                QtnSelectedAcompanhamento.set(categoria, qtnGrande)
                break;
            case "Medio": 
                qtnMedio++
                QtnSelectedAcompanhamento.set(categoria, qtnMedio)
                break;
            case "Pequeno":
                qtnPequeno++
                QtnSelectedAcompanhamento.set(categoria, qtnPequeno)
                break;
            case "Especial":
                qtnEspecial++
                QtnSelectedAcompanhamento.set(categoria, qtnEspecial)
                break;
            default:
                qtnGrande++
                QtnSelectedAcompanhamento.set(categoria, qtnGrande)
        }
    }
    saveNoCarrinho("Acompanhamento")
}


 // função para guardar os itens (nomes) no carrinho 
 function saveNoCarrinho(tipo){
    let cartItems = document.getElementById(tipo=="Bebida" ? "cartItemsBebida" : "cartItemsAcompanhamento")
    let selectedItems = tipo=="Bebida" ? selectedBebidas : selectedAcompanhamento
    // Limpa o conteúdo atual do carrinho para não ficar com itens duplicados
    cartItems.innerHTML = "";
    console.log(selectedItems)
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

  function total(){
    return valorPedido + (QtnSelectedBebidas.get("Suco") * valor_suco) + (QtnSelectedBebidas.get("Refrigerante") * valor_refri) + 
        (QtnSelectedBebidas.get("Agua") * valor_agua)
        + (QtnSelectedAcompanhamento.get("Grande") * valor_grande) + (QtnSelectedAcompanhamento.get("Medio") * valor_medio) + 
        (QtnSelectedAcompanhamento.get("Pequeno") * valor_pequeno) + (QtnSelectedAcompanhamento.get("Especial") * valor_especial)
}

