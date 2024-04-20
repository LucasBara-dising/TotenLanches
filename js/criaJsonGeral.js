let valorPedido=22.99

let itensSelectPao=[]
let itensSelectQueijos=[]
let itensSelectMolhos=[]
let itensSelectSalada=[]
let itensSelectExtra=[]
let itensSelectHamburger=[]

// Array para armazenar os itens selecionados pelo usuário
let selectedItems = []
let QtnSelectedItems = new Map();

localStorage.setItem("itensSelectPao", itensSelectPao);
localStorage.setItem("itensSelectQueijos", itensSelectQueijos);
localStorage.setItem("itensSelectMolhos", itensSelectMolhos);
localStorage.setItem("itensSelectSalada", itensSelectSalada);
localStorage.setItem("itensSelectExtra", itensSelectExtra);
localStorage.setItem("itensSelectHamburger", itensSelectHamburger);


localStorage.setItem("selectedItems", selectedItems);
localStorage.setItem("QtnSelectedItems", QtnSelectedItems);

localStorage.setItem("valorPedido", valorPedido);


//le todos os itens selecionados
function geraTextIngrientes(objPaes, objQueijos, objMolhos, objSaladas, objExtra, objHamburger, total){
    var arrIngred=[]
  
    //gera itens
    retornaItens(arrIngred,itensSelectPao, objPaes)
    retornaItens(arrIngred,itensSelectQueijos, objQueijos)
    retornaItens(arrIngred,itensSelectMolhos, objMolhos)
    retornaItens(arrIngred,itensSelectSalada, objSaladas)
    retornaItens(arrIngred,itensSelectExtra, objExtra)
    retornaItens(arrIngred,itensSelectHamburger, objHamburger)
  
    var textIngred=""
    for (i = 0; i < arrIngred.length; i++)
    textIngred+=(arrIngred[i] + ", ");
  
    const lancheIngredintes = document.getElementById("lancheIngredintes");
    lancheIngredintes.innerHTML=textIngred

    console.log(selectedItems)
    saveBebida()
  }
  
  function geraJson(objPaes, objQueijos, objMolhos, objSaladas, objExtra, objHamburger, total){
    //inicia arrays
    let pao= []
    let queijo= []
    let molho= []
    let salada= []
    let extra= []
    let hamburger= []
  
    //gera itens
    geraItensJson(itensSelectPao, pao, objPaes)
    geraItensJson(itensSelectQueijos, queijo, objQueijos)
    geraItensJson(itensSelectMolhos, molho, objMolhos)
    geraItensJson(itensSelectSalada, salada, objSaladas)
    geraItensJson(itensSelectExtra, extra, objExtra)
    geraItensJson(itensSelectHamburger, hamburger, objHamburger)
  
    let pedido = [{
      "Id":2,  
      "firstName": "Maria",
      "preco": total,
      "status": "não pago",
      pao,
      queijo,
      molho,
      salada,
      extra,
      hamburger,
    }];
  
    // converting array pedido para JSON
    const pedidoJSON = JSON.stringify(pedido, null, 2);
    console.log(pedidoJSON)
  }
  
  function geraItensJson(arraySelect, arrayItem, objIngredient){
    arraySelect.forEach(element => {
      var objValue = objIngredient[element].nome;
      arrayItem.push({ "nome" : objValue });
    });
  }
  
  function retornaItens( arrayIngredient, arraySelect, objIngredient){
     arraySelect.forEach(element=>{
      arrayIngredient.push(objIngredient[element].nome)
    });
  }

   // função para guardar os itens (nomes) no carrinho 
   function saveBebida(){
    let cartItems = document.getElementById('cartItems')
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

  function removeByElement(array, item){
    const index = array.indexOf(item);
    if (index > -1) { 
      array.splice(index, 1); 
    }
}

