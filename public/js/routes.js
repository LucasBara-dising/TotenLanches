  //funções
  //--carrinho--
  $.fn.openCarrinho = function () {
    $('#ModalCarrinho').modal('show')   
    $(".modal-backdrop").css('visibility','visible');
  };

  $.fn.closeCarrinho = function () {
    $('#ModalCarrinho').modal('hide')   
    $(".modal-backdrop").css('visibility','hidden');
  };

  //--Lanche--
  $.fn.openHamburger = function () {  
    $('.conteinerLanche').css('display','block');
    $("#barraIconHamburger").css('display','block');
    $('html,body').scrollTop(0);
  };

  $.fn.closoeHamburger = function () {  
    $('.conteinerLanche').css('display','none');
    $("#barraIconHamburger").css('display','none');
  };


  //--bebiba--
  $.fn.openBebida = function () {  
    $('.conteinerBebida').css('display','block');
    $("#barraIconBebida").css('display','block');
    $('html,body').scrollTop(0);
  };

  $.fn.closeBebida = function () {
    $('.conteinerBebida').css('display','none');
    $("#barraIconBebida").css('display','none');
  };

   //--Acompanhamento--
   $.fn.openAcompanhamento = function () {  
    $('.conteinerAcompanhamento').css('display','block');
    $("#barraIconAcompanhamento").css('display','block');
    $('html,body').scrollTop(0);
  };

  $.fn.closeAcompanhamento = function () {
    $('.conteinerAcompanhamento').css('display','none');
    $("#barraIconAcompanhamento").css('display','none');
  };

  //chamamados
  //chamado inicial
  document.addEventListener('DOMContentLoaded', function () {
    $('#ModalHamburger').modal('show')  
    $("#barraIconHamburger").css('display','block');

    $('.foo').closeBebida(); 
    $('.foo').closeAcompanhamento(); 
  })

  //open carrinho
  $("#btn-open-carrinho").click(function() {
    $('#ModalHamburger').modal('show')  

    $('.foo').openCarrinho();
  });

  $("#btn-close").click(function() {
    $('.foo').closeCarrinho(); 
  });

  //choseer
  $("#iconHamburger").click(function() {
    $('.foo').closeBebida(); 
    $('.foo').closeAcompanhamento();
    $('.foo').openHamburger(); 
  });
 
  $("#iconBebida").click(function() {
    $('.foo').closoeHamburger(); 
    $('.foo').closeAcompanhamento();
    $('.foo').openBebida(); 
  });

  $("#iconAcompanhamento").click(function() {
    $('.foo').closoeHamburger(); 
    $('.foo').closeBebida(); 
    $('.foo').openAcompanhamento(); 
  });

  //btns OK
  $("#btnOKModel").click(function() {
    $('.foo').closoeHamburger(); 
    $('.foo').closeCarrinho(); 
    $('.foo').openBebida();
  });

  $("#btnOKBebida").click(function() {
    $('.foo').closeBebida(); 
    $('.foo').openAcompanhamento();
  });

  $("#btnOKBebida").click(function() {
    $('.foo').closeBebida(); 
    $('.foo').openAcompanhamento();
  });

  $("#btnOKCombo").click(function() {
    $('.foo').closoeHamburger(); 
    $('.foo').openBebida();
  });

  $("#btnOKFinal").click(function() {
    const btnConfirmaModel = document.getElementById("btnOKConfirma");
    btnConfirmaModel.style.display="block"
    const btnOKModel = document.getElementById("btnOKModel");
    btnOKModel.style.display="none"
    const txtTotal = document.getElementById("totalPrice");
    txtTotal.style.display="none"
    $('.foo').openCarrinho();
  });

  $("#btnOKConfirma").click(function(){
    geraJsonFromCombo()
  })

 
  

