let valorPedido=23.00

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