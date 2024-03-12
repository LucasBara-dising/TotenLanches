fetch('./json/sampleIngredintes.json').then((response) => {
    response.json().then((dados)=>{
        //posso manipular o json aqui
        dados.paes.map((pao) =>{
            console.log("Nome do pão: " + pao.nome)
            console.log("Img do pão: " + pao.imagem)

            //criar funtion que gera os itens no carrosel
        })
    })
})
    