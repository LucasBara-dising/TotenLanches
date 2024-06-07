let valorPedido=22.99
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

//valores dos combos
let valor_grande_combo = 2.90
let valor_medio_combo = 0
let valor_pequeno_combo = 0
let valor_especial_combo = 5.90

let selectedCombo = new Map();
let selectedComboObj =[]


document.addEventListener('DOMContentLoaded', function () {
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
    img.className= tipo=="acompanhamento" ? "img-batata" : "img-fluid"
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
        switch(tipo){
            case "bebida": 
                checkItemForBebida(this.id, imgCkeck, categoria) 
                break;
            case "acompanhamento": 
                checkItemForAcompanhamento(this.id, imgCkeck, categoria)
                break;
            case "combo": 
                checkItemForCombo(this.id, imgCkeck, objItem[i], valor_item)
                console.log(valor_item)
                break;
        }

        let tipoPedido=""

        if (window.location.pathname=="/montaLanche"){
            tipoPedido="montaLanche"
        }

        if (window.location.pathname=="/combos"){
            tipoPedido="combo"
        }

        let txtTotalPriceFooter = document.getElementById('txtTotal'); //elemento onde será exibido o preço total
        txtTotalPriceFooter.textContent = "R$: " + total(tipoPedido).toFixed(2);

        let totalPriceCarrinho = document.getElementById('totalPrice'); //elemento onde será exibido o preço total
        totalPriceCarrinho.textContent = "Total R$ " + total(tipoPedido).toFixed(2);
    }

    box.appendChild(boxImg)
    boxImg.appendChild(img)
    boxImg.appendChild(imgCkeck)

    box.appendChild(textItem)

    if(tipo=="combo"){
        let precoItem = document.createElement('H6');
        precoItem.className="card-footer mt-3 text-center"
        precoItem.innerHTML= "R$: "+objItem[i].valor
        box.appendChild(precoItem)
    }
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

function checkItemForCombo(idBox, imgCkeck, objItem, valor_item){
    if(selectedCombo.has(idBox)==true){
        imgCkeck.style.visibility="hidden"
        selectedCombo.delete(idBox);
        removeByElement(selectedComboObj, objItem)
    }else{
        imgCkeck.style.visibility="visible"
        selectedCombo.set(idBox, valor_item);
        selectedComboObj.push(objItem)
    }
    saveNoCarrinho("Hambuerger");
}


 // função para guardar os itens (nomes) no carrinho 
 function saveNoCarrinho(tipo){
    let tipoSelect
    let selectedItems
    
    switch(tipo){
        case "Bebida": 
            tipoSelect= "cartItemsBebida"
            selectedItems = selectedBebidas
            break;
        case "Acompanhamento": 
            tipoSelect = "cartItemsAcompanhamento"
            selectedItems = selectedAcompanhamento
            break;
        case "Hambuerger": 
            tipoSelect = "lancheIngredintes"
            selectedItems = selectedCombo
            break;
    }

    let cartItems = document.getElementById(tipoSelect)

    // Limpa o conteúdo atual do carrinho para não ficar com itens duplicados
    cartItems.innerHTML = "";
    
    selectedItems.forEach((item,key)=>{
        let list = document.createElement('li');
        let textContent =  tipo=="Hambuerger" ? "1x "+ key : "1x "+item
        let itemName = document.createTextNode(textContent);
        list.style.display = "flex";
        list.style.marginTop = "10px";
        list.appendChild(itemName); 
        cartItems.appendChild(list);
    })     
  }

  function total(tipo){

    let total
    if(tipo=="combo"){
        let somaCombo = 0;

        selectedCombo.forEach(value => {
            somaCombo += value;
        });

        total= somaCombo + somaPedCombo()

    }else{
        total = valorPedido + somaMontaPedido()
    }

    console.log(total)

    return total
}

function somaPedCombo(){
    return (QtnSelectedBebidas.get("Suco") * valor_suco_combo) + 
        (QtnSelectedBebidas.get("Refrigerante") * valor_refri_combo) + 
        (QtnSelectedBebidas.get("Agua") * valor_agua_combo)+ 
        (QtnSelectedAcompanhamento.get("Grande") * valor_grande_combo) + 
        (QtnSelectedAcompanhamento.get("Medio") * valor_medio_combo) + 
        (QtnSelectedAcompanhamento.get("Pequeno") * valor_pequeno_combo) + 
        (QtnSelectedAcompanhamento.get("Especial") * valor_especial_combo)
}

function somaMontaPedido(){
     return (QtnSelectedBebidas.get("Suco") * valor_suco) + 
            (QtnSelectedBebidas.get("Refrigerante") * valor_refri) + 
            (QtnSelectedBebidas.get("Agua") * valor_agua)+ 
            (QtnSelectedAcompanhamento.get("Grande") * valor_grande) + 
            (QtnSelectedAcompanhamento.get("Medio") * valor_medio) + 
            (QtnSelectedAcompanhamento.get("Pequeno") * valor_pequeno) + 
            (QtnSelectedAcompanhamento.get("Especial") * valor_especial)
}

