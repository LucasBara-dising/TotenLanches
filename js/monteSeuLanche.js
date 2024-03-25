let itensSelectPao=[]
let itensSelectQueijos=[]
let itensSelectMolhos=[]
let itensSelectSalada=[]
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
  sizeJsonQueijos, 0,1)

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
  sizeJsonHamburger, 0,2)

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
        if(arrayItemIngredient.length>=limiteItens){
          arrayItemIngredient=[]
        }
        arrayItemIngredient.push(currentImg)
      }
      checkItemSelect(arrayItemIngredient, currentImg, imgMarkItem)
      console.log(arrayItemIngredient)
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

function removeByElement(array, item){
  const index = array.indexOf(item);
  if (index > -1) { 
    array.splice(index, 1); 
  }
}