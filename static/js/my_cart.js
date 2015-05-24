
$(function() {

  $( "#spinnerbox239779" ).spinner({min: 1, max: 2}).change(function(){
    alert($(this).spinner('value') );
  });


$("#spinnerbox239779" ).spinner("value", 1 );

$("#spinner-block239779 .ui-spinner-up").on('click', function() {

    $("#coupon-field").val("");
    $('#chkoutbtn').addClass('disabled');
    var qty = $(this).parent().children('input').val();
    $.post('/buy/updateQuantity/', {qty:qty,id:239779,products_id: 0,totalQty: 2,face_value:9,percent:22,merchant_id:184,card_type:2,quantityCheck:'quantity-up'},function (res)
    {   

      if(res.message == 'error redirect')
      {
        window.location = '/error/'
      }


      $('#paypalId').click();
      var arr = eval(res);
      if (arr.message == "Out of stock Cards")
      {
        $("#cardAvailability").modal('show');
      }
      else if(arr.message == "quatity update")
      { 
        var totalDiscount = parseFloat(arr.totalDiscount).toFixed(2)
        var savingVal = parseFloat(arr.savingVal).toFixed(2)
        var Subtotal = parseFloat(arr.Subtotal).toFixed(2)
        
        if (arr.PurchaseLimit) {
          $("#paymentMethod").show();
        }else{
          $("#paymentMethod").hide();
          $("#errorTextSell").html("Daily Purchase limit exceeded!");
          $(".modal-title").html("Alert!");
          $("#errorPopupSell").modal('show');
        }
        

        $("#subTotal_price,#faceValue_price").html(Subtotal);
        $("#saving_price").html(savingVal);
        $("#total_price").html(totalDiscount);
      }
      $('#chkoutbtn').removeClass('disabled');
    });

});


$("#spinner-block239779 .ui-spinner-down").on('click', function() {

//  $("#coupon-block").hide();
  $("#coupon-field").val("");
  $('#chkoutbtn').addClass('disabled');
  var qty = $(this).parent().children('input').val();

  $.post('/buy/updateQuantity/', {qty:qty,id:239779,products_id: 0,totalQty: 2,face_value:9,percent:22,merchant_id:184,card_type:2},function (res)
  {   
    if(res.message == 'error redirect')
    {
      window.location = '/error/';
    }


    $('#paypalId').click();
    var arr = eval(res);
    if (arr.message == "Out of stock Cards")
    {
      $("#cardAvailability").modal('show');
    }
    else if(arr.message == "quatity update")
    { 
      var totalDiscount = parseFloat(arr.totalDiscount).toFixed(2)
      var savingVal = parseFloat(arr.savingVal).toFixed(2)
      var Subtotal = parseFloat(arr.Subtotal).toFixed(2)
      if (arr.PurchaseLimit) {
        $("#paymentMethod").show();
      }else{
        $("#paymentMethod").hide();
        $("#errorTextSell").html("Daily Purchase limit exceeded!");
          $(".modal-title").html("Alert!");
          $("#errorPopupSell").modal('show');
      }

      $("#subTotal_price,#faceValue_price").html(Subtotal);
      $("#saving_price").html(savingVal);
      $("#total_price").html(totalDiscount);
    }
    $('#chkoutbtn').removeClass('disabled');
  });

});

})


$(function() {
  $( "#spinnerbox239776" ).spinner({min: 1, max: 12}).change(function(){
    alert($(this).spinner('value') );
  });

  $("#spinnerbox239776" ).spinner("value", 2 );

  $("#spinner-block239776 .ui-spinner-up").on('click', function() {

//                            $("#coupon-block").hide();
    $("#coupon-field").val("");
    $('#chkoutbtn').addClass('disabled');
    var qty = $(this).parent().children('input').val();
    $.post('/buy/updateQuantity/', {qty:qty,id:239776,products_id: 0,totalQty: 12,face_value:5,percent:22,merchant_id:184,card_type:2,quantityCheck:'quantity-up'},function (res)
    {   

      if(res.message == 'error redirect')
      {
        window.location = '/error/'
      }


      $('#paypalId').click();
      var arr = eval(res);
      if (arr.message == "Out of stock Cards")
      {
        $("#cardAvailability").modal('show');
      }
      else if(arr.message == "quatity update")
      { 
        var totalDiscount = parseFloat(arr.totalDiscount).toFixed(2)
        var savingVal = parseFloat(arr.savingVal).toFixed(2)
        var Subtotal = parseFloat(arr.Subtotal).toFixed(2)
        
        if (arr.PurchaseLimit) {
          $("#paymentMethod").show();
        }else{
          $("#paymentMethod").hide();
          $("#errorTextSell").html("Daily Purchase limit exceeded!");
  $(".modal-title").html("Alert!");
  $("#errorPopupSell").modal('show');
        }
        

        $("#subTotal_price,#faceValue_price").html(Subtotal);
        $("#saving_price").html(savingVal);
        $("#total_price").html(totalDiscount);
      }
      $('#chkoutbtn').removeClass('disabled');
    });

});
})


$("#spinner-block239776 .ui-spinner-down").on('click', function() {

//  $("#coupon-block").hide();
  $("#coupon-field").val("");
  $('#chkoutbtn').addClass('disabled');
  var qty = $(this).parent().children('input').val();

  $.post('/buy/updateQuantity/', {qty:qty,id:239776,products_id: 0,totalQty: 12,face_value:5,percent:22,merchant_id:184,card_type:2},function (res)
  {   
    if(res.message == 'error redirect')
    {
      window.location = '/error/';
    }


    $('#paypalId').click();
    var arr = eval(res);
    if (arr.message == "Out of stock Cards")
    {
      $("#cardAvailability").modal('show');
    }
    else if(arr.message == "quatity update")
    { 
      var totalDiscount = parseFloat(arr.totalDiscount).toFixed(2)
      var savingVal = parseFloat(arr.savingVal).toFixed(2)
      var Subtotal = parseFloat(arr.Subtotal).toFixed(2)
      if (arr.PurchaseLimit) {
        $("#paymentMethod").show();
      }else{
        $("#paymentMethod").hide();
        $("#errorTextSell").html("Daily Purchase limit exceeded!");
          $(".modal-title").html("Alert!");
          $("#errorPopupSell").modal('show');
      }

      $("#subTotal_price,#faceValue_price").html(Subtotal);
      $("#saving_price").html(savingVal);
      $("#total_price").html(totalDiscount);
    }
    $('#chkoutbtn').removeClass('disabled');
  });

});



function couponDis(value, total)
{
  var coupon_field = $("#coupon-field").val(); 
  if(coupon_field != ""){
  var total = parseFloat($("#total_price").html());
  $("#coupon_loading").show();
  $(".coupon-btn").hide();
  $.post('/coupon/coupon/',{couponCodeEntered:coupon_field,total:total}, function showInfo(res){
    
    

    var arr = eval(res);
    if(arr.message == "success")
    {             
      $("#coupon-block").show();
      $("#coupon_loading").hide();
      $(".coupon-btn").show();
      window.location = "/cart/";
    }
    else
    {
      // $('#error-message-dailog').modal('show');
      // $('#error').html(' Expired: Coupon is no longer available.');

      $("#coupon_loading").hide();
      $(".coupon-btn").show();
      $("#cardAvailability").modal('show');
      $("#split_message").html('Coupon is no longer available');


    }

    
  })
  }
}

function coupon(){
  $(".coupon-btn").addClass('active');
}
function couponHide(){
  $(".coupon-btn").addClass('active');
}


$(document).ready(function(){
  //console.log(['undefined',undefined])

  $('#paypalId').click();
  $("[name=payment]").click(function(){              

    if($(this).val()=="paypal"){

      // $("#chkoutbtn").attr("href", "/paypal/buyPaypal_create/");
      
      $("#coupon-field").val("");
      $("#chkoutbtn").removeClass("chkoutform");
      $("#chkoutbtn").addClass("payapform");
      // $("#chkoutbtn > span").css("background-image", "url(/images/paypal-chkout.png)");
    
    } else if($(this).val()=="credit"){

      
      $("#coupon-field").val("");
      //$("#chkoutbtn").attr("href", "javascript:void(0)");
      $("#chkoutbtn").addClass("chkoutform");
      $("#chkoutbtn").removeClass("payapform");
      // $("#chkoutbtn > span").css("background-image", "url(/images/creditcard-chkout.png)");
     
    } else if($(this).val()=="ACD"){

      $("#chkoutbtn").addClass("chkoutform");
      $("#chkoutbtn").removeClass("payapform");
      // $("#chkoutbtn > span").css("background-image", "url(/images/ach-chkout.png)");

    }
  });
        $("#chkoutbtn").click(function(){
  if($(this).hasClass("chkoutform")){
    $("#orderSubmit").submit();
    return false;
  }else if($(this).hasClass("payapform")){
    $("#loadingImg_1").show();
    $.post('/paypal/limitCheck/', function (res)
    {
      $(".overlayer").show();
      var arr = eval(res);
      if(arr.condition == "N")
      {  
        $("#errorText").html(arr.message);
        $("#errormg").modal('show');
        $("#loadingImg_1").hide();
        $(".overlayer").hide();
        return false;
      }else {
        $.post('/paypal/buyPaypal_create/', function (res)
        {
          var arr = eval(res);
          window.location = arr.redirect;
        });
      }
    });
  }
  });
})

jQuery(document).ready(function($){
  if(undefined == 1){
    var achHTML = "<div class=\"col-xs-8\"><label> <input onclick=\"applyPercent(0)\" type=\"radio\" disabled=\"\" name=\"payment\" id=\"ACDId\"  value=\"ACD\" style=\"margin-right:8px\">ACH Withdrawal</label></div>";
    $('#achDeposit').html(achHTML); 
  }

}); 


$(function() {
    $( "#spinnerbox239776" ).spinner({min: 1, max: 12}).change(function(){
      alert($(this).spinner('value') );
    });

    $("#spinnerbox239776" ).spinner("value", 2 );

    $("#spinner-block239776 .ui-spinner-up").on('click', function() {

//                            $("#coupon-block").hide();
      $("#coupon-field").val("");
      $('#chkoutbtn').addClass('disabled');
      var qty = $(this).parent().children('input').val();
      $.post('/buy/updateQuantity/', {qty:qty,id:239776,products_id: 0,totalQty: 12,face_value:5,percent:22,merchant_id:184,card_type:2,quantityCheck:'quantity-up'},function (res)
      {   

        if(res.message == 'error redirect')
        {
          window.location = '/error/'
        }


        $('#paypalId').click();
        var arr = eval(res);
        if (arr.message == "Out of stock Cards")
        {
          $("#cardAvailability").modal('show');
        }
        else if(arr.message == "quatity update")
        { 
          var totalDiscount = parseFloat(arr.totalDiscount).toFixed(2)
          var savingVal = parseFloat(arr.savingVal).toFixed(2)
          var Subtotal = parseFloat(arr.Subtotal).toFixed(2)
          
          if (arr.PurchaseLimit) {
            $("#paymentMethod").show();
          }else{
            $("#paymentMethod").hide();
            $("#errorTextSell").html("Daily Purchase limit exceeded!");
            $(".modal-title").html("Alert!");
            $("#errorPopupSell").modal('show');
          }
          

          $("#subTotal_price,#faceValue_price").html(Subtotal);
          $("#saving_price").html(savingVal);
          $("#total_price").html(totalDiscount);
        }
        $('#chkoutbtn').removeClass('disabled');
      });

});


$("#spinner-block239776 .ui-spinner-down").on('click', function() {

//  $("#coupon-block").hide();
  $("#coupon-field").val("");
  $('#chkoutbtn').addClass('disabled');
  var qty = $(this).parent().children('input').val();

  $.post('/buy/updateQuantity/', {qty:qty,id:239776,products_id: 0,totalQty: 12,face_value:5,percent:22,merchant_id:184,card_type:2},function (res)
  {   
    if(res.message == 'error redirect')
    {
      window.location = '/error/';
    }


    $('#paypalId').click();
    var arr = eval(res);
    if (arr.message == "Out of stock Cards")
    {
      $("#cardAvailability").modal('show');
    }
    else if(arr.message == "quatity update")
    { 
      var totalDiscount = parseFloat(arr.totalDiscount).toFixed(2)
      var savingVal = parseFloat(arr.savingVal).toFixed(2)
      var Subtotal = parseFloat(arr.Subtotal).toFixed(2)
      if (arr.PurchaseLimit) {
        $("#paymentMethod").show();
      }else{
        $("#paymentMethod").hide();
        $("#errorTextSell").html("Daily Purchase limit exceeded!");
          $(".modal-title").html("Alert!");
          $("#errorPopupSell").modal('show');
      }

      $("#subTotal_price,#faceValue_price").html(Subtotal);
      $("#saving_price").html(savingVal);
      $("#total_price").html(totalDiscount);
    }
    $('#chkoutbtn').removeClass('disabled');
  });

});

})