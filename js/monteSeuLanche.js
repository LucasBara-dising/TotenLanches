let itensSelectPao=[]
let itensSelectQueijos=[]
let itensSelectMolhos=[]
let itensSelectSalada=[]
let itensSelectExtra=[]
let itensSelectHamburger=[]

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

  //Extra
  const sizeJsonExtra = dados.extra.length
  criaSlider("AddImgExtra","btnLeftExtra", "btnRightExtra", "divImgExtra", 
  "infoTitleExtra", "checkItemExtra", itensSelectExtra , dados.extra, 
  sizeJsonExtra, 0,1)

  //Hamburger
  const sizeJsonHamburger = dados.hamburger.length
  criaSlider("AddImgHamburger","btnLeftHamburger", "btnRightHamburger", "divImgHamburger", 
  "infoTitleHamburger", "checkItemHamburger", itensSelectHamburger , dados.hamburger, 
  sizeJsonHamburger, 0,1)

  const btnOK = document.getElementById("btnOK");
  btnOK.addEventListener("click", function() {
    const btnOKModel = document.getElementById("btnOKModel");
    btnOKModel.style.display="block"
    const txtTotal = document.getElementById("totalPrice");
    txtTotal.style.display="none"
    geraJson(dados.paes, dados.queijos, dados.molhos, dados.salada, dados.extra, dados.hamburger,valorPedido)
  });

  const carrinho = document.getElementById("addToCartButton");
  carrinho.addEventListener("click", function() {
    const btnOKModel = document.getElementById("btnOKModel");
    btnOKModel.style.display="none"
    const txtTotal = document.getElementById("totalPrice");
    txtTotal.style.display="block"

    //funcion na pagina criaJsonGeral
    geraTextIngrientes(dados.paes, dados.queijos, dados.molhos, dados.salada, dados.extra, dados.hamburger,valorPedido)
  })
  
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

    //mecanica apra passar para o proximo a direita
    rightButton.addEventListener("click", function() {
      currentImg++
      if(currentImg==sizeobjIngredient){
        currentImg=0
      }
      showItem(divImg, divTitle, imgMarkItem,arrayItemIngredient, objIngredient, currentImg)
        });
      
    //mecanica apra passar para o proximo a esquerda
    leftButton.addEventListener("click", function() {
      currentImg--
      if(currentImg==-1){
        currentImg=sizeobjIngredient-1
      }
      showItem(divImg, divTitle, imgMarkItem, arrayItemIngredient, objIngredient, currentImg)
    });
}

//recebe o item e mostra a img com o texto
function showItem(divImg, divTitle, imgMarkItem, arrayItemIngredient, objIngredient, currentImg){
  const singleImg = document.getElementById(divImg)
  singleImg.src = objIngredient[currentImg].imagem_url

  //titulo
  const infoTitle = document.getElementById(divTitle);
  infoTitle.innerHTML = objIngredient[currentImg].nome;

  checkItemSelect(arrayItemIngredient, currentImg, imgMarkItem)
}

//remove ou mostra o check
function checkItemSelect(arrayItem, idIngredient,checkItem){
  const checkItemImg = document.getElementById(checkItem);
  if(arrayItem.includes(idIngredient)==true){
    checkItemImg.style.visibility="visible"
   }else{
    checkItemImg.style.visibility="hidden"
   }
}

//atualiza o total
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
