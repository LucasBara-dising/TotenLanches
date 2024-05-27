document.addEventListener('DOMContentLoaded', function () {
    //combo
    fetch('./json/combosRepouse.json').then((response) => {
        response.json().then((dados) => {
          //posso manipular o json aqui
    
          for(i=0; i<dados.combo_Hamburguer.length; i++){
            criaCard(dados.combo_Hamburguer, i, dados.combo_Hamburguer[i].valor, "conteinerHambuerger", "Hambuerger", "combo")
          }

          for(i=0; i<dados.combo_Salsicha.length; i++){
            criaCard(dados.combo_Salsicha, i, dados.combo_Salsicha[i].valor, "conteinerSalsicha", "Salsicha", "combo")
          }

          for(i=0; i<dados.combo_Veg.length; i++){
            criaCard(dados.combo_Veg, i, dados.combo_Veg[i].valor, "conteinerVegetariano", "Vegetariano", "combo")
          }
        });
    })
})



