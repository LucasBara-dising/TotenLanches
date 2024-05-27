//-------------Bebida----------------
let selectedBebidas = []
let QtnSelectedBebidas = new Map();

QtnSelectedBebidas.set('Suco', 0);
QtnSelectedBebidas.set('Refrigerante', 0);
QtnSelectedBebidas.set('Agua', 0); 

let qtnSuc = 0
let qtnRefri= 0
let qtnAgua = 0

//valores dos combos
let valor_suco_combo = 2.90
let valor_refri_combo = 0
let valor_agua_combo = 0

//valores dos combos
let valor_suco
let valor_refri
let valor_agua

document.addEventListener('DOMContentLoaded', function () {
    //Bebida
    fetch('./json/bebidasRepouse.json').then((response) => {
        response.json().then((dados) => {

        valor_suco = dados.valor_suco
        valor_refri = dados.valor_refri
        valor_agua = dados.valor_agua
    
          for(i=0; i<dados.sucos.length; i++){
            criaCard(dados.sucos, i, valor_suco, "conteinerSucos", "Suco", "bebida")
          }

          for(i=0; i<dados.refrigerantes.length; i++){
            criaCard(dados.refrigerantes, i, valor_refri, "conteinerRefri", "Refrigerante", "bebida")
          }

          for(i=0; i<dados.agua.length; i++){
            criaCard(dados.agua, i, valor_agua, "conteinerAgua", "Agua", "bebida")
          }
        });
    })
})