
// ---- Seleção de itens, carrinho de compras e cálculo de valor ca compra -----------

document.addEventListener('DOMContentLoaded', function () {
    let selectedItems = []; // Array para armazenar os itens selecionados pelo usuário
    let cards = document.querySelectorAll(".col-4");
    let existingCheck;

    cards.forEach((card) => {
        card.addEventListener('click', handleClick)
    })

    function handleClick(){

        existingCheck = this.querySelector('.check'); //'this' é cada card selecionado
        let itemName = this.querySelector('.card-footer').textContent;
        let itemAddCheck = this.querySelector('.card-body');

        if (existingCheck) { // Se o item já estiver selecionado, remova-o da lista
            itemAddCheck.removeChild(existingCheck);
            selectedItems = selectedItems.filter(item => item.name !== itemName);//vai manter no array somente elementos com nomes diferentes
        } else { // Se o item não estiver selecionado, adicione-o à lista
            let checkClone = document.createElement('img');
            checkClone.src = "./img/check.jpg";
            checkClone.classList.add('check');

            itemAddCheck.appendChild(checkClone);
           
            if(!selectedItems.some(item => item.name === itemName)){
                selectedItems.push({ name: itemName });
               
            }
        }
    };

    // função para guardar os itens (nomes) no carrinho 
    function saveName(){
        let cartItems = document.getElementById('cartItems')
        // Limpa o conteúdo atual do carrinho para não ficar com itens duplicados
        cartItems.innerHTML = "";
        selectedItems.forEach(item=>{
            let list = document.createElement('li');
            let itemName = document.createTextNode(item.name);
            let inputQty = document.createElement('input');
            list.style.display = "flex";
            list.style.marginTop = "10px";
            inputQty.value = 1;
            inputQty.name = "increment";    
            inputQty.classList = "increment";
            inputQty.style.cursor = "pointer";
            inputQty.style.height = '20px';
            inputQty.style.width = "20px";
            inputQty.style.marginLeft = "-10%";
            inputQty.style.marginTop = "-8%";
            inputQty.style.backgroundColor = "grey";
            list.appendChild(itemName); 
            cartItems.appendChild(list);
            cartItems.appendChild(inputQty);

        })     
    }
    //função para informar a quantidade de produtos do carrinho 
    //será chamada no evento de click de cada card.
    function quantityOfProducts(){
        let quantityOfProducts = document.querySelector('.quantityOfProducts');
        quantityOfProducts.innerHTML = selectedItems.length;
        quantityOfProducts.style.color = 'whitesmoke';
        quantityOfProducts.top = '15%';
        if(selectedItems.length == 0){
            quantityOfProducts.innerHTML = '';
        }
    }


    let totalPrice = document.getElementById('totalPrice'); // Seleciona o elemento onde será exibido o preço total
    let selectedItemsTotal = 0; // Inicializa o total dos itens selecionados como zero
          
    // Adiciona um evento de clique a cada card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            let input = card.querySelector('input[name="prices"]'); // Seleciona o input correspondente ao card clicado
            let price = parseFloat(input.value); // Obtém o valor do input convertido para número
            
            

            if (card.classList.contains('selected')) { // Se o card já estiver selecionado, subtrai o valor do total
                selectedItemsTotal -= price;  
            } else { // Se o card não estiver selecionado, ao ser clicado, será selecionado e adicionado o valor ao total
                selectedItemsTotal += price;
                
            }

            card.classList.toggle('selected'); // Adiciona ou remove a classe 'selected' do card
            saveName();
            quantityOfProducts();
        });

    });

    // Adiciona um evento de clique ao botão 'Add ao Carrinho'
    document.getElementById('addToCartButton').addEventListener('click', () => {
        // Atualiza o texto dentro do elemento totalPrice com o total dos itens selecionados
        totalPrice.textContent = "Total R$ " + selectedItemsTotal.toFixed(2);
    });

    // Mostra os itens do carrinho com o total da compra
    let images = document.querySelectorAll('.show');
    let checkout = document.querySelector('.checkout')
    
    images.forEach(image=>{
        image.addEventListener('click', ()=>{
            checkout.classList.toggle('visible');
            if(checkout.classList.contains('visible')){
            checkout.style.width = '61vh';
            checkout.style.height = '90vh';
            checkout.style.left = '13%';
            checkout.style.top = '0%';
            checkout.style.color = 'whitesmoke';
            checkout.style.backgroundColor = 'rgb(35,40,43,.98';
            checkout.style.display = 'block';
            }else{
                checkout.style.display = 'none';
            }
        })
    })
    

    let btn = document.querySelector('.close')
    btn.addEventListener('click', ()=>{
        
        if(btn.click){
            checkout.style.display = 'none';
            checkout.classList.toggle('visible');
        }
    })
})