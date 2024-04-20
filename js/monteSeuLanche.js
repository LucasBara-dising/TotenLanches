
fetch('./json/sampleIngredintes.json').then((response) => {
response.json().then((dados) => {
  //posso manipular o json aqui
  //pao
  criaSlider("Pao","AddImgPao","btnLeftPao", "btnRightPao", "divImgPao", 
  "infoTitlePao","contItensPao", "boxItemPao","checkItemPao", itensSelectPao, dados.paes, 1)

  //queijos
  criaSlider("Queijos", "AddImgQueijos","btnLeftQueijos", "btnRightQueijos", "divImgQueijos", 
  "infoTitleQueijos","contItensQueijo", "boxItemQueijo", "checkItemQueijos", itensSelectQueijos, dados.queijos, 2)

  //Molhos
  criaSlider("Molhos", "AddImgMolhos","btnLeftMolhos", "btnRightMolhos", "divImgMolhos", 
  "infoTitleMolhos", "contItensMolhos", "boxItemMolhos", "checkItemMolhos", itensSelectMolhos , dados.molhos, 3)

  //Salada
  criaSlider("Salada", "AddImgSalada","btnLeftSalada", "btnRightSalada", "divImgSalada", 
  "infoTitleSalada", "contItensSalada", "boxItemSalada", "checkItemSalada", itensSelectSalada , dados.salada, 3)

  //Extra
  criaSlider("Extra", "AddImgExtra","btnLeftExtra", "btnRightExtra", "divImgExtra", 
  "infoTitleExtra", "contItensExtra", "boxItemExtra", "checkItemExtra", itensSelectExtra , dados.extra, 1)

  //Hamburger
  criaSlider("Hamburger", "AddImgHamburger","btnLeftHamburger", "btnRightHamburger", "divImgHamburger", 
  "infoTitleHamburger", "contItensHamburger","BoxItemHamburger", "checkItemHamburger", itensSelectHamburger , dados.hamburger, 1)

  const btnOK = document.getElementById("btnOK");
  btnOK.addEventListener("click", function() {
    const btnOKModel = document.getElementById("btnOKModel");
    btnOKModel.style.display="block"
    const txtTotal = document.getElementById("totalPrice");
    txtTotal.style.display="none"
    //funcion na pagina criaJsonGeral
    geraTextIngrientes(dados.paes, dados.queijos, dados.molhos, dados.salada, dados.extra, dados.hamburger,valorPedido)

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

function criaSlider(categoria, divAddImg, btnLeft, btnRight, divImg, divTitle, contItens, boxItem, imgMarkItem, arrayItemIngredient, objIngredient, limiteItens, currentImg = 0){

  var sizeobjIngredient = objIngredient.length

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
        if(arrayItemIngredient.length>=1 && categoria=="Pao"){
          arrayItemIngredient=[]
        }

        //adiona valor extra para cada item a mais
        if(arrayItemIngredient.length>=limiteItens){  
          valorPedido+=1.90
          updateTotal(valorPedido)
        }
        arrayItemIngredient.push(currentImg)
      }
      checkItemSelect(arrayItemIngredient, currentImg, imgMarkItem)

      geraItensSelect(objIngredient, arrayItemIngredient, boxItem)

      checkLimit(arrayItemIngredient, limiteItens, 1.99, contItens)
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
  //img
  const singleImg = document.getElementById(divImg)
  singleImg.src = objIngredient[currentImg].imagem_url

  //titulo
  const infoTitle = document.getElementById(divTitle);
  infoTitle.innerHTML = objIngredient[currentImg].nome;

  //checka se esta selecionado
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


function geraItensSelect(objIngredient, arrayItem, boxItemQueijo){
  const listboxItens = document.getElementById(boxItemQueijo)
  //limpa a div
  listboxItens.innerHTML = "";
  arrayItem.forEach(element => {
    let list = document.createElement('p');
    let textContent= objIngredient[element].nome
    let itemName = document.createTextNode(textContent);
    list.style.display = "flex";
    list.style.marginTop = "10px";

    let imgCkeck = document.createElement('img');
    imgCkeck.src="imagens/check-mark.png"
    imgCkeck.className="imgcheckItem"

    list.appendChild(imgCkeck); 
    list.appendChild(itemName); 

    listboxItens.appendChild(list);
  });
}

function checkLimit(arrayItem, limiteItens, valorExtra, contItens){
  const contaItens = document.getElementById(contItens)
  if(arrayItem.length>limiteItens){
    contaItens.innerHTML="Ingredientes Extras"

    let extra = document.createElement('p');
    let txtextra = document.createTextNode("+R$" + valorExtra);
    extra.className="fs-4  title-item-normal"

    extra.appendChild(txtextra);
    contaItens.appendChild(extra);

    //mostra texto de extra e adiciona o valor extra ao total
    let valorAMais = arrayItem.length-limiteItens*valorExtra
  }
  else{
    contaItens.innerHTML="Escolha mais "+ (limiteItens-arrayItem.length)+ " opções"
  }
}