let itensSelectPao=[]
let itensSelectQueijos=[]
let itensSelectMolhos=[]
let itensSelectSalada=[]
let itensSelectHamburger=[]
let valorPedido=23.00

fetch('./json/sampleIngredintes.json').then((response) => {
response.json().then((dados) => {
  //posso manipular o json aqui
  const sizeJson = dados.paes.length
  criaSlider("AddImgPao","btnLeftPao", "btnRightPao", "divImgPao", 
  "infoTitlePao", "checkItemPao", itensSelectPao , dados.paes, sizeJson, 0,1)

  //queijos
  const sizeJsonQueijos = dados.queijos.length
  criaSlider("AddImgQueijos","btnLeftQueijos", "btnRightQueijos", "divImgQueijos", 
  "infoTitleQueijos", "checkItemQueijos", itensSelectQueijos , dados.queijos, 
  sizeJsonQueijos, 0,2)

  //Molhos
  const sizeJsonMolhos = dados.molhos.length
  criaSlider("AddImgMolhos","btnLeftMolhos", "btnRightMolhos", "divImgMolhos", 
  "infoTitleMolhos", "checkItemMolhos", itensSelectMolhos , dados.molhos, 
  sizeJsonMolhos, 0,2)

  //Salada
  const sizeJsonSalada = dados.salada.length
  criaSlider("AddImgSalada","btnLeftSalada", "btnRightSalada", "divImgSalada", 
  "infoTitleSalada", "checkItemSalada", itensSelectSalada , dados.salada, 
  sizeJsonSalada, 0,3)

  //Hamburger
  const sizeJsonHamburger = dados.hamburger.length
  criaSlider("AddImgHamburger","btnLeftHamburger", "btnRightHamburger", "divImgHamburger", 
  "infoTitleHamburger", "checkItemHamburger", itensSelectHamburger , dados.hamburger, 
  sizeJsonHamburger, 0,1)

  const btnOK = document.getElementById("btnOK");
  btnOK.addEventListener("click", function() {
    geraJson(dados.paes, dados.queijos, dados.molhos, dados.salada, dados.hamburger,valorPedido)
  });
  
  });
})

function criaSlider(divAddImg, btnLeft, btnRight, divImg, divTitle, imgMarkItem, arrayItemIngredient, objIngredient, sizeobjIngredient, currentImg, limiteItens){
  //passa o lugar dos carrosel e onde vai receber a img e titulo
  showItem(divImg, divTitle, imgMarkItem, arrayItemIngredient, objIngredient, currentImg)

   const addImgs = document.getElementById(divAddImg);
   const rightButton = document.getElementById(btnRight);
   const leftButton = document.getElementById(btnLeft);

    addImgs.addEventListener("click", function() {
      if(arrayItemIngredient.includes(currentImg)==true){
        removeByElement(arrayItemIngredient,currentImg)
        
      }else{
        //execeção para o pão
        if(arrayItemIngredient==itensSelectPao && arrayItemIngredient.length>=limiteItens){
          arrayItemIngredient=[]
        }

        //adiona valor extra para cada item a mais
        if(arrayItemIngredient.length>=limiteItens){  
          valorPedido+=1.50
          updateTotal(valorPedido)
        }
        arrayItemIngredient.push(currentImg)
      }
      checkItemSelect(arrayItemIngredient, currentImg, imgMarkItem)
    });

    rightButton.addEventListener("click", function() {
      currentImg++
      if(currentImg==sizeobjIngredient){
        currentImg=0
      }
      showItem(divImg, divTitle, imgMarkItem,arrayItemIngredient, objIngredient, currentImg)
        });
      
      leftButton.addEventListener("click", function() {
        currentImg--
        if(currentImg==-1){
          currentImg=sizeobjIngredient-1
        }
        showItem(divImg, divTitle, imgMarkItem, arrayItemIngredient, objIngredient, currentImg)
      });
}

function showItem(divImg, divTitle, imgMarkItem, arrayItemIngredient, objIngredient, currentImg){
  const singleImg = document.getElementById(divImg)
  singleImg.src = objIngredient[currentImg].imagem_url

  //titulo
  const infoTitle = document.getElementById(divTitle);
  infoTitle.innerHTML = objIngredient[currentImg].nome;

  checkItemSelect(arrayItemIngredient, currentImg, imgMarkItem)
}

function checkItemSelect(arrayItem, idIngredient,checkItem){
  const checkItemImg = document.getElementById(checkItem);
  if(arrayItem.includes(idIngredient)==true){
    checkItemImg.style.visibility="visible"
   }else{
    checkItemImg.style.visibility="hidden"
   }
}

function updateTotal(total){
  const txtTotal = document.getElementById("txtTotal")
  txtTotal.innerHTML="R$: "+total
}

function removeByElement(array, item){
  const index = array.indexOf(item);
  if (index > -1) { 
    array.splice(index, 1); 
  }
}

function geraJson(paes, queijos, molhos, saladas, hamburger, total){
  const pedido = {
    id: 5,
    firstName: "Maria",
    preco: total,
    status: "não pago",
    pao: {
      name: paes[0].nome
    },
    queijos: [
      geraItensJson(itensSelectQueijos.length, queijos)
    ],
    molhos: [
      geraItensJson(itensSelectMolhos.length, molhos)
    ],
    saladas: [
      geraItensJson(itensSelectSalada.length, saladas)
    ],
    hamburger: [
      geraItensJson(itensSelectHamburger.length, hamburger)
    ]
    
  };

  // converting user to JSON
  const pedidoJSON = JSON.stringify(pedido);
  console.log(pedidoJSON)
}

function geraItensJson(sizeArray, objIngredient){
  let q=[]
  for (let i = 0; i < sizeArray; i++) {
    q.push(geraItensJsonT(i,objIngredient))
   return q
  }
  
}

//TO DO: crai objeto json para varios itens
function geraItensJsonT(k, objIngredient){
  let myJson = {}
  var objName = 'Item' + (k+1);
  var objValue = objIngredient[k].nome;
  console.log(myJson)
  return myJson[objName] = objValue;
}
 