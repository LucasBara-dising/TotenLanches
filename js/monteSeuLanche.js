fetch('./json/sampleIngredintes.json').then((response) => {
    response.json().then((dados)=>{
        //posso manipular o json aqui
        dados.paes.map((pao) =>{
            //funtion que gera os itens no carrosel
            ingredientesItens(pao.imagem, pao.nome,'carrosel-pao')
        })
    })
})

//#funtion para add um post
function ingredientesItens(img, nome, idCarrosel) {
    const posts = document.getElementById(idCarrosel)

    const itemIngredinete = document.createElement('div')
    itemIngredinete.classList.add('carousel-item')

    const labelCard = document.createElement('label')
    labelCard.htmlFor="select"
    labelCard.id="labelCard"

    const boxImg = document.createElement('div')
    boxImg.classList.add('text-center')

    //#Img Ingrediente
    const foto = document.createElement('img')
    foto.classList.add('img-monte')
    foto.src = img

    const titleCard = document.createElement('div')
    titleCard.classList.add('card-body')

    //#nome do Ingrediente
    const nomeIngrediente = document.createElement('h5')
    nomeIngrediente.classList.add('card-title')
    nomeIngrediente.classList.add('text-center')
    nomeIngrediente.innerText = nome

    const chbox= document.createElement('input')
    chbox.type="checkbox"
    chbox.id="select"
    chbox.onchange=selectItem()

    posts.appendChild(itemIngredinete)

    itemIngredinete.appendChild(labelCard)
    labelCard.appendChild(boxImg)
    boxImg.appendChild(foto)

    itemIngredinete.appendChild(titleCard)
    titleCard.appendChild(nomeIngrediente)
    titleCard.appendChild(chbox)
}


function selectItem(){
    let ckBoxSelect= document.getElementById('Brioche')
    let imgCheck=document.getElementById('Pão Brioche')

    if(ckBoxSelect.checked==true){
        imgCheck.style.visibility= "visible"
    }else{
        imgCheck.style.visibility= "hidden"
    }
}

    