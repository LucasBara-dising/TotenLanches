
let itensSelectPao=[]
let itensSelectQueijos=[]
let itensSelectMolhos=[]
let itensSelectSalada=[]
let itensSelectExtra=[]
let itensSelectHamburger=[]
let pedido

// id
let IdUnico = gerarIdUnico()
let totalPedio=0

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

    saveNoCarrinho("Bebida")
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
      "Id":IdUnico,  
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
  
    // converting array pedido para JSON
    const pedidoJSON = convertToJson(pedido)
    console.log(pedidoJSON)
  }

  function gerarIdUnico() {
    // Obter data e hora atuais como um timestamp numérico
    const timestamp = Date.now();
    // Converter timestamp para uma string hexadecimal
    const idHex = timestamp.toString(8);
    // Pegar os primeiros 6 dígitos hexadecimais
    const primeiros6Digitos = idHex.substring(4, 7);
  
    // Gerar um número aleatório entre 0 e 9
    const numeroAleatorio = Math.floor(Math.random() * 99);
  
    // Adicionar o número aleatório aos primeiros 6 dígitos
    const idUnico = `${primeiros6Digitos}${numeroAleatorio}`;
  
    // Retornar o ID único
    return idUnico;
  }

  function geraJsonFromCombo(){
    let combo= selectedComboObj
    let bebida= selectedBebidas
    let acompanhamento= selectedAcompanhamento

    totalPedio=total("combo")

    pedido = [{
      "Id":IdUnico,  
      "preco": totalPedio,
      "status": "não pago",
      combo,
      bebida,
      acompanhamento
    }];
  
    // converting array pedido para JSON
    const pedidoJSON = convertToJson(pedido)
    console.log(pedidoJSON)
  }
 
  
  function geraItensJson(arraySelect, arrayItem, objIngredient){
    console.log("Fora")
    arraySelect.forEach(element => {
      console.log("dentro")
      console.log(objIngredient[element].nome)
      var objValue = objIngredient[element].nome;
      arrayItem.push({ "nome" : objValue });
    });

    console.log(arrayItem)
  }
  
  function retornaItens( arrayIngredient, arraySelect, objIngredient){
     arraySelect.forEach(element=>{
      arrayIngredient.push(objIngredient[element].nome)
    });
  }

  function convertToJson(arrayPedido){
    return  JSON.stringify(arrayPedido, null, 2);
  }

  function removeByElement(array, item){
    const index = array.indexOf(item);
    if (index > -1) { 
      array.splice(index, 1); 
    }
}

