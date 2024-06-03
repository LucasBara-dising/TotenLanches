
let itensSelectPao=[]
let itensSelectQueijos=[]
let itensSelectMolhos=[]
let itensSelectSalada=[]
let itensSelectExtra=[]
let itensSelectHamburger=[]
let pedido
// Array para armazenar os itens selecionados pelo usuário
let selectedItems = []
let QtnSelectedItems = new Map();

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
    saveNoCarrinho("Bebida")
  }

  function gerajsonComBebida(){
    console.log(selectedCombo)
  }
  
  function geraJson(objPaes, objQueijos, objMolhos, objSaladas, objExtra, objHamburger, total){
    //inicia arrays
    let pao= []
    let queijo= []
    let molho= []
    let salada= []
    let extra= []
    let hamburger= []
    let bebida= selectedBebidas
    let acompanhamento= selectedAcompanhamento
  
    //gera itens
    geraItensJson(itensSelectPao, pao, objPaes)
    geraItensJson(itensSelectQueijos, queijo, objQueijos)
    geraItensJson(itensSelectMolhos, molho, objMolhos)
    geraItensJson(itensSelectSalada, salada, objSaladas)
    geraItensJson(itensSelectExtra, extra, objExtra)
    geraItensJson(itensSelectHamburger, hamburger, objHamburger)
  
    
    pedido = [{
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
      bebida,
      acompanhamento
    }];

    console.log(pedido)
  
    // converting array pedido para JSON
    const pedidoJSON = JSON.stringify(pedido, null, 2);
    console.log(pedidoJSON)
  }

  function geraJsonFromCombo(){
    let combo= selectedComboObj
    let bebida= selectedBebidas
    let acompanhamento= selectedAcompanhamento
    
    let totalPedio=total("combo")

    pedido = [{
      "Id":2,  
      "firstName": "Maria",
      "preco": totalPedio,
      "status": "não pago",
      combo,
      bebida,
      acompanhamento
    }];

    console.log(pedido)
  
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

  function removeByElement(array, item){
    const index = array.indexOf(item);
    if (index > -1) { 
      array.splice(index, 1); 
    }
}

