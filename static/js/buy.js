$( document ).ready(function(){ 

    // $("input[name=amount]").keyup(function(e){
    //   $(this).val($(this).val().replace(/\D/g, ''));
    // });
console.log("document checked");
  //   if(!$("#paypalId").prop("disabled") && $("#paypalId").is(":checked")){
  //     console.log("papal checked");
		// $("#chkoutbtn").attr("href", "javascript:void(0)");
		// $("#chkoutbtn").removeClass("chkoutform");
		// $("#chkoutbtn > span").css("background-image", "url(/images/paypal-chkout.png)");
  //   }
  //   if(!$("#creditId").prop("disabled") && $("#creditId").is(":checked")){
  //     console.log("creditId checked");
		// $("#chkoutbtn").attr("href", "javascript:void(0)");
		// $("#chkoutbtn").addClass("chkoutform");
		// $("#chkoutbtn > span").css("background-image", "url(/images/creditcard-chkout.png)");
  //   }
  //   if(!$("#ACDId").prop("disabled") && $("#ACDId").is(":checked")){
		// $("#chkoutbtn").attr("href", "javascript:void(0)");
		// $("#chkoutbtn").addClass("chkoutform");
		// $("#chkoutbtn > span").css("background-image", "url(/images/ach-chkout.png)");
  //   }


    $( "#search-form" ).validate({
     debug: false,
     rules: {
     },
     
     errorPlacement: function(error, element) { },
     submitHandler: function(form)
     { 
     
      $.post('/buy/filter_cards/', $("#search-form").serialize() , function (res)
      { 
        var arr = eval(res);
         var html = '';
        //$(arr.results).each(function(data) {
        arr.results.forEach(function(data)
        {
          
          if(!data.image )
          {
            var imageName = 'empity_img.png';    
          }
          else
          {
            var imageName =  data.image.replace('merchants', '');
            var imageName =  imageName.replace('/', '');
           
          }
          
        html += '<div class="col-md-3 text-center"> ';
        html += '<div class="card_img_"> <a  href="/buy-gift-cards/discount-'+data.id+'-cards/"><img src="/images/merchants/'+imageName+'" width="500" height=""> </a> </div>';
           html += '<h4>'+data.name+' </h4>';
           html += '<p>Up To '+data.buy_price+'% Discount</p>';
        html += '</div>';
        
        });
        if( arr.results == '')
        {
          $('#merchants-cards').html('<h3 class="text-center">No card found.</h3>');
        }
        else
        {
          $('#merchants-cards').html(html); 
        }
      });
      
    }
    
  });
  
  
    $( "#search_cards" ).validate({
     debug: false,
     rules: {
     features:{
           required: true
           
         },
     amount:{
           required: true
           
         },
     
     },
     
     errorPlacement: function(error, element) { },
     submitHandler: function(form)
     { 
        $("#search_cards input[type=submit]").hide();
      $("#search_cards .loadingImg").show();
      $.post('/buy/search_cards/', $("#search_cards").serialize() , function (res)
      { 

        $("#search_cards input[type=submit]").show();
        $("#search_cards .loadingImg").hide();
        
         $("#bulk-search").html(res);
         $("#searchResults").modal('show');
      });
      
    }
    
  });
    
    
  
    $( "#buy_bulk_card" ).validate({
     debug: false,
     rules: {
     features:{
           required: true
           
         },
     amount:{
           required: true
           
         },
     
     },
     
     errorPlacement: function(error, element) { },
     submitHandler: function(form)
     { 
        //$("#buy_bulk_card button[type=submit]").hide();
      $("#buy_bulk_card .loadingImg").show();
      $.post('/buy/buy_bulk_card/', $("#buy_bulk_card").serialize() , function (res)
      { 

        if(res.message == 'error redirect')
        {
          window.location = '/error';
        }

        $("#buy_bulk_card button[type=submit]").show();
        $("#buy_bulk_card .loadingImg").hide();
        
         $("#bulk-search").html(res);
         $("#searchResults").modal('show');
      });
      
    }
    
  });
  
    $( "#orderSubmit" ).validate({
     debug: false,
     rules: {
     /*  first_name:{
           required: true
           
         }, */
      
     
     },
     
     errorPlacement: function(error, element) { },
     submitHandler: function(form)
     { 

        $("#chkoutbtn").hide();
      $("#orderSubmit .loadingImg").show();
      $.post('/buy/checklogin/', $( "#orderSubmit" ).serialize(), function (res)
      {      
          var arr = eval(res);
          if(arr.message == 'error redirect')
          {
            window.location('/error/')
          }


          $("#chkoutbtn").show();
          if(arr.condition == "notLogin")
          {  
            window.location="/login";
          }
          else if(arr.condition == "N")
          {  
            $("#errorText").html(arr.message);
            $("#errormg").modal('show');
          }
          else
           {
            if(arr.reqRed =='ACD'){
              window.location="/buy-ach";
            } else {
              window.location="/checkout/";
            }
            
            
          
          }
           
         
      
      });
      
    }
    
  });
  $( "#existingCC" ).validate({
     debug: false,
     rules: {
     /*  first_name:{
           required: true
           
         }, */     
     },
     errorPlacement: function(error, element) { },
     submitHandler: function(form)
     { 
      $("#loadingImg").show();
      $.post('/buy/paypal/', {choice: 1},function (res)
      {
        var arr = eval(res);
        if(arr.message == 'error redirect')
        {
          window.location = '/error/'
        }

        if(arr.message == 'N'){
          window.location= arr.redirect;
        }else if(arr.message != 'success'){
          $("#loadingImg").hide();
          $("#errorText").html(arr.message);
          $("#errormg").modal('show');
        } else {
           
          $.post('/buy/orderLastId/',  $("#existingCC").serialize() , function (res) {
             var lastID = res.lastID;
             $('#order_id').val(lastID);
            var id = eval(res);
             
           // $.post('/buy/orderSubmit/', function (res) {

              if(res.message == 'error redirect')
              {
                window.location = '/error/'
              }

              $.post('/coupon/coupon_redem/',function (res) {

                $("#loadingImg").hide();
                var arr = eval(res);
                
                if(arr.condition == "notLogin")
                  window.location="/login/";
                else
                  $('#submit_btn').click();                  
              })
            //});
          })
        }
      });
    }
  });

$( "#checkout" ).validate({
    debug: false,
    rules: {

      first_name:{
        required: true
      },
      last_name:{
        required: true
      },
      type:{
        required: true
      },
      number:{
        required: true,
        number: true
      },
      ccv:{
        required: true,
        number: true,
        maxlength: 4,
        minlength: 3
      },
      expire_month:{
        required: true
      },
      expire_year:{
        required: true
      },
      // company:{
      //   required: true
      // },
      billing_name:{
        required: true
      },
      phone:{
        required: true
      },
      street:{
        required: true
      },
      // adress_line_2:{
      //   required: true
      // },
      city:{
        required: true
      },
      state:{
        required: true
      },
      postal_code:{
        required: true
      },
      // country:{
      //   required: true
      // }, //shipping validation starts from below
      // shipping_company:{
      //   required: true
      // },
      shipping_name:{
        required: true
      },
      shipping_phone:{
        required: true
      },
      shipping_cmpAdd:{
        required: true
      },
      // shipping_add2:{
      //   required: true
      // },
      shipping_cty:{
        required: true
      },
      shipping_state:{
        required: true
      },
      shipping_postalcode:{
        required: true
      },
    },

     messages: {
      first_name : {
        first_name: "This field is required."
      },
      last_name:{
        last_name: "This field is required."
      },
      type:{
        type: "This field is required."
      },
      number:{
        number: "This field is required."
      },
      ccv:{
        ccv: "This field is required."
      },
      expire_month:{
        expire_month: "This field is required."
      },
      expire_year:{
        expire_year: "This field is required."
      },
      billing_name:{
        billing_name: "This field is required." 
     },
      phone:{ 
        phone: "This field is required." 
      },
      city:{
       city: "This field is required." 
     },
      state: {
       state: "This field is required." 
     },
      street: {
       street: "This field is required."
     },
      postal_code: {
       postal_code: "This field is required." 
     },
      shipping_name: { 
        shipping_name: "This field is required." 
      },
      shipping_phone: { 
        shipping_phone: "This field is required." 
      },
      shipping_cmpAdd: {
       shipping_cmpAdd: "This field is required." 
     },
      shipping_cty: {
       shipping_cty: "This field is required." 
     },
      shipping_state: {
       shipping_state: "This field is required." 
     },
      shipping_postalcode: {
       shipping_postalcode: "This field is required." 
     }
  },
     
    errorPlacement: function(error, element) { 
    $("#" + element.attr("id")).parent().append(error).css({color:"red"});
  },
    submitHandler: function(form) {
      $("#chkoutbtn").hide();
      $("#loadingImg").show();
      $('#CheckOut_Now').addClass("disabled");
        
      $.post('/buy/paypal/', $("#checkout").serialize() , function (res) {

       // $("#loadingImg").hide();

        $("#chkoutbtn").show();
        var arr = eval(res);
        if(arr.message == 'error redirect')
        {
          window.location = '/error/'
        }
        if(arr.message == 'N'){
          window.location= arr.redirect;
        }else if(arr.message != 'success'){
          $("#errorText").html(arr.message);
          $("#errormg").modal('show');
          $("#loadingImg").hide();
          $('#CheckOut_Now').removeClass("disabled");
        } else {
           
          $.post('/buy/orderLastId/',  $("#checkout").serialize() , function (res) {
            var id = eval(res);
            var lastID = res.lastID;
            $('#order_id').val(lastID);
             console.log('id is <<<<<<<<<<<<<<<<<<<<<<', id);
          //  $.post('/buy/orderSubmit/', function (res) {
              if(res.message == 'error redirect')
              {
                window.location = '/error/'
              }

              $.post('/coupon/coupon_redem/',  $("#checkout").serialize() ,function (res) {

               // $("#orderSubmit .loadingImg").hide();
                var arr = eval(res);


                
                if(arr.condition == "notLogin")
                  window.location="/login/";
                else
                  $('#submit_btn').click();
                  
              })
            });
        //  })
        }
      })
    }
  });
  
   $( "#brand_alerts" ).validate({
     debug: false,
     rules: {
      price:{
           required: true
         },
      
     
     },
     
     errorPlacement: function(error, element) { },
     submitHandler: function(form)
     { 
        $("#brand_alerts button[type=submit]").hide();
      $("#brand_alerts .loadingImg").show();
       
        
        $.post('/buy/brand_alerts/', $("#brand_alerts").serialize() , function (res)
        { 
        $("#brand_alerts .loadingImg").hide();
          $("#brand_alerts button[type=submit]").show();
  
        var arr = eval(res);
       
        if(arr.message == 'notLogin')
        {
          window.location="/login";
         
        }
        else if(arr.message == 'duplicate')
        {
          $("#brand_alerts .danger-mg").html('Dupilcate entry! ').show().delay(2000).fadeOut();
        }
        else if(arr.message == 'success')
        {
          $("#setAlerts").modal('hide');
          $("#brand_alerts button[type=submit]").addClass("disabled");
        }
      })
    }

  });
  
   $( "#ach_confirm" ).validate({
     debug: false,
     rules: {
      bank_route_nmbr:{
           required: true
         },
      confirm_bank_route_nmbr:{
           equalTo: "#bank_route_nmbr"
         },
      bank_account_nmbr:{
           required: true
         },
      confirm_bank_account_nmbr:{
           equalTo: "#bank_account_nmbr"
         },
      billing_name:{
        required: true
      },
      phone:{
        required: true
      },
      city:{
        required: true
      },
      state:{
        required: true
      },
      postal_code:{
        required: true
      },
      country1:{
        required: true
      },
      shipping_name:{
        required: true
      },
      shipping_phone:{
        required: true
      },
      shipping_cty:{
        required: true
      },
      shipping_state:{
        required: true
      },
      shipping_postalcode:{
        required: true
      },
      shipping_cntry:{
        required: true
      },
      first_name:{
        required: true
      },
      last_name:{
        required: true
      },
      type:{
        required: true
      },
      number:{
        required: true
      },
      ccv:{
        required: true 
      },
      expire_month:{
        required: true
      },
      expire_year:{
        required: true
      }    
    },
     messages: {
      bank_route_nmbr: { required: "routing nummber is required." },
      confirm_bank_route_nmbr: {  required: "This field is required." },
      bank_account_nmbr: { required: "account number is required." },
      confirm_bank_account_nmbr:{ required: "This field is required." },
      billing_name:{ required: "billing name is required." },
      phone:{ required: "phone is required." },
      city:{ required: "city is required." },
      state: { required: "state is required." },
      postal_code: { required: "postal code is required." },
      country1: { required: "country is required." },
      shipping_name: { required: "shipping name is required." },
      shipping_phone: { required: "shipping phone is required." },
      shipping_cty: { required: "shipping city is required." },
      shipping_state: { required: "shipping state is required." },
      shipping_postalcode: { required: "postal code is required." },
      shipping_cntry: { required: "country is required." },
      first_name:{required : "first name is required."},
      last_name:{required: "last name is required."},
      type:{required: "type is required."},
      number:{ required: "number is required."},
      ccv:{required: "cvv is required."},
      expire_month:{required: "month is required."},
      expire_year:{required: "year is required."} 
    },

     
     errorPlacement: function(error, element) {
     $("#" + element.attr("id")).parent().append(error).css({color:"red"});
      },
     submitHandler: function(form)
     { 
      var data = 1;
      $("#chkoutbtn").addClass('disabled');
      $("#loadingImg").show();
      $("#loadingImg1").css('display', 'block');

      verifyRoutingNumber(function(err, veriyfyNumResponse){

     // })
      if(veriyfyNumResponse == 'success'){
      if($('#backup_credit_card').is(':checked')){
        validateCard(function(err, resPayFlow){
          if(resPayFlow){
            var result = resPayFlow.retObj.data.result;
            if(result == 0){
              submitOrder(function(err, respons){
                if(err){
                $("#loadingImg1").css('display', 'none');  
                  window.location = err;
                }else{
                  $('#submit_btn').click();
                  //window.location = respons;
                }
              })
            }else{
              $("#loadingImg1").css('display', 'none'); 
               $("#cardAvailability").modal('show');
               $('#split_message').html(resPayFlow.retObj.data.resp_msg);
               $('#loadingImg').hide();
            }
          }else{
            $("#loadingImg1").css('display', 'none'); 
            $("#cardAvailability").modal('show');
            $('#split_message').html('Something went wrong, Please try again later!');
          }
          
        })
      }else{
        submitOrder(function(err, respons){
          if(err){  
            window.location = err;
          }else{
           // window.location = respons;
           $('#submit_btn').click();
          }
        })
      }
      }else {
        $("#loadingImg").hide();
        $("#loadingImg1").css('display', 'none');
        $("#cardAvailability").modal('show');
        $('#split_message').html(veriyfyNumResponse);
      }  
       })
    }
  });

})

function validateCard(cb){
   $.post('/buy/paypal/', $("#ach_confirm").serialize() , function (resPayFlow) {
        cb(null, resPayFlow);
   });
}

function submitOrder(cb) {
    $.post('/buy/orderLastId/', $("#ach_confirm").serialize(), function(res) {
        var id = eval(res);
        var lastID = res.lastID;
        $('#order_id').val(lastID);
      //  $.post('/buy/orderSubmit/', function(res) {
            if (res.message == 'error redirect') {
                cb('/error/', null);
            }

            $.post('/coupon/coupon_redem/', $("#ach_confirm").serialize(), function(res) {

                $.post('/coupon/ach_confirm/', $("#ach_confirm").serialize(), function(res) {
                    $("#loadingImg").hide();
                    $("#chkoutbtn").removeClass('disabled');
                    var arr = eval(res);

                    if (arr.condition == "notLogin") {
                        cb(null, '/login');
                    } else {
                        cb(null, '/congrats');
                    }
                })

            })

       // });
    })
}
function filters(start,end,thisActive) {
        
    $('.left-nav li a').removeClass('active');
    $(thisActive).addClass('active');
    
      $.post('/buy/filter_cards/',{start:start,end:end}, function showInfo(res){
       
       
      
      

    })
   
  
}

function applyPercent (bit) {
  // body...
  console.log('bit' , bit);
  $('#ach_block').show('slow');
  $.post('/buy/achPercent/',{bit: bit}, function showInfo(amountAfter3PercentDiscount){               
         if(amountAfter3PercentDiscount.message == 'error redirect')
         {
           window.location = '/error'
         }
         if(amountAfter3PercentDiscount.message == 'cart is empty'){
            $('#faceValue_price').html('0.00');
            $('#couponDiscount').html('0.00%');
            $('#saving_price').html('0.00');
            $('#total_price').html('0.00');
         }
        console.log('amountAfter3PercentDiscount');       
        console.log(amountAfter3PercentDiscount.achDiscount);
        console.log(amountAfter3PercentDiscount.discount);
        // $('#coupon-field').val(amountAfter3PercentDiscount.couponCode);
        // $('#couponDiscount').html(amountAfter3PercentDiscount.achDiscount);
        $('#ach_discount').html(amountAfter3PercentDiscount.amount_to_deduce)
        $('#couponDiscount').html(amountAfter3PercentDiscount.discount);


         $('#total_price').html(amountAfter3PercentDiscount.amount);
         $('#saving_price').html(amountAfter3PercentDiscount.yourSavings);
         // if(amountAfter3PercentDiscount.bit == "showmsg")
         // {

          // $( "#sucMessage" ).show();
          // $('#sucMessage').html('<strong>Congratulations!</strong> We have given you '+amountAfter3PercentDiscount.achDiscount+' discount on ACH Deposit');

          // //  setTimeout(function(){
          // //            $( "#sucMessage" ).hide();
          // //         }, 3000) ;

          // // }

      });

 
}

function deletePercent(bit){
console.log('bit' , bit);
$('#ach_block').hide('slow');
$.post('/buy/achPercent/' , {bit: bit}, function showInfo(amountAfter3PercentDiscount){               
         
         if(amountAfter3PercentDiscount.message == 'error redirect')
         {
           window.location = '/error'
         }
         if(amountAfter3PercentDiscount.message == 'cart is empty'){
            $('#faceValue_price').html('0.00');
            $('#couponDiscount').html('0.00%');
            $('#saving_price').html('0.00');
            $('#total_price').html('0.00');
         }

        
        if(amountAfter3PercentDiscount.status == 'failure')
        {
         $("#cardAvailability").modal('show');
         $('#split_message').html('coupon is not available for this merchant');
         $('#total_price').html(amountAfter3PercentDiscount.amount);
       }
        $('#coupon-field').val(amountAfter3PercentDiscount.couponCode);
        $('#couponDiscount').html(amountAfter3PercentDiscount.discount);
         $('#total_price').html(amountAfter3PercentDiscount.amount);
         $('#saving_price').html(amountAfter3PercentDiscount.yourSavings);
          // if(amountAfter3PercentDiscount.bit == "showmsg")
          // {
          //   $("#revertMessage").show();
          //   $('#revertMessage').html('<strong>Alert!</strong> We have reverted '+amountAfter3PercentDiscount.achDiscount+'discount on ACH Deposit !');

          //  setTimeout(function(){
          //            $( "#revertMessage" ).hide();
          //         }, 3000)
          // } 

          if(amountAfter3PercentDiscount.amount == 0)
          {
            $('#saving_price').html('0.00');
          }
         

      });


}



  function getBankInfo()
  {


    $.post('/buy/getRoutingInfo/', function showInfo(res){
     
       var userData = res;

       if(userData.status == 'success')
        {
          $('#bank_route_nmbr').val(userData.routing_number);
          $('#bank_account_nmbr').val(userData.account_number);
        }
        else
        {
          window.location = '/home';
        }

    })


  }


    function fetchCartStatus(id){
    
    //alert('in fync')     ;
    

      $.post('/buy/fetchCartStatus/',{id:id}, function showInfo(res){
        
        $("#cartStatus").html(res);
              
      })
   
}
function buyCar(cardPercent, button, merchant_id, face_value, quantityCheck, page, quantity, condition, cardType) {
        
    //$(button).addClass('disabled');
    var cardQty = parseInt($("."+quantityCheck).html());
     
    if( cardQty == 0 )
    {  
      $(button).addClass('disabled');
      
    }
    else
    {   
      if( cardQty == 1 )
      $(button).addClass('disabled');
           
      cardQty  = cardQty - 1;  
      $("."+quantityCheck).html(cardQty); 
    }
    var arrayPercent = cardPercent.split(",");
    var arrayQuantity = quantity.split(",");
    var arrayPrice = face_value.split(",");
    
    console.log("arrayCount", arrayQuantity, arrayPrice, arrayPercent, face_value);
     
    
    if(page == "card")
    $(button).addClass('disabled');

  $.post('/buy/buy_cart_id/', function showInfo(id){
    
    if(id.status == 'error redirect')
    {
      window.location = '/error';
      return false;
    }

    if(condition == "quick")
    {
      for(var j=0; j< arrayQuantity.length; j++)
      {
      console.log(j,"=J>>>",arrayQuantity[j] );
      console.log("J =",j,arrayQuantity.length-1,"<<<< checking");
       if(j == arrayQuantity.length-1 )
       {
        
        $.post('/buy/buy-cart/',{quantity:arrayQuantity[j],cardPercent:arrayPercent[j],merchant_id:merchant_id,face_value:arrayPrice[j],cardType:cardType}, function showInfo(res){
          if(res.message == 'error redirect')
          {
              window.location="/error/";   
          }
          window.location="/cart/";   
          console.log(">>> redirect page");
        })
      
       
       }
       else
       {
        $.post('/buy/buy-cart/',{quantity:arrayQuantity[j],cardPercent:arrayPercent[j],merchant_id:merchant_id,face_value:arrayPrice[j],cardType:cardType}, function showInfo(res){
          if(res.message == 'error redirect')
          {
              window.location="/error/";   
          }
          
           
        })
        }
      
      }
    
    }
    else
    {
      $.post('/buy/buy-cart/',{quantity:quantity,cardPercent:cardPercent,merchant_id:merchant_id,face_value:face_value,cardType:cardType}, function showInfo(res){
         var arr = eval(res); console.log(arr.message);
         if(arr.message == 'error redirect')
          {
              window.location="/error/";   
          }
         if(arr.message == "Out of stock")
         {  
          $("#"+quantityCheck).html("0");
          $(button).addClass("disabled");
          $("#cardAvailability").modal('show');
         }
         fetchCartStatus();
         
           $.post('/buy/cartStatus/', function showInfo(totalCart){
            if(totalCart.message == 'error redirect')
            {
              window.location = '/error/'
            }
            var cartCount = eval(totalCart);    
            $(".badge,.badge2").html(cartCount.cardRes);
           })
           if(page == "card")
           window.location="/cart/";
        })
    
    }
  })
    
}
  
  

function expandCart(id){
  $("#"+id).toggle();
   
  
  }

function del_card(buyID,card,quantityID,hideID,showID,face_value,revert_id,revert_qty){
      
     $(card).hide();
     $("#big-cards-"+buyID).fadeOut();
     $("#cardQuantity").html(parseInt($("#cardQuantity").html())-1);
     $(card).parent('.card').fadeOut(function(){
       $(this).remove();
       var div=$(".role");
      div.animate({width:'100%',opacity:'0.4'},"500",function(){
        div.animate({width:'0',opacity:'0.8'},"500");
      })
      
    });
       
    $.post('/buy/del_card/',{buyID:buyID,face_value:face_value,revert_id:revert_id,revert_qty:revert_qty}, function showInfo(res){
        fetchCartStatus();
         
      $.post('/buy/cartStatus/', function showInfo(totalCart){
        if(totalCart.message == 'error redirect')
        {
          window.location = '/error/'
        }

        var cartCount = eval(totalCart);    
        $(".badge,.badge2").html(cartCount.cardRes);
       })
         
       
    })
  
  }

function delFullCard(cardPercent,card,revert_id,face_value,revert_qty,discount_price,merchant_id,card_type){

  $(card).addClass('disabled');
  var faceValue_price = parseFloat($("#faceValue_price").html());
  var newFacTotal = faceValue_price-(face_value*revert_qty);
  // alert(total_price + "--------" +newFacTotal)
  // $("#subTotal_price").html((newFacTotal).toFixed(2));
  var valueFacTotal = newFacTotal.toFixed(2);
  if(valueFacTotal == "" || valueFacTotal < 1)
    valueFacTotal = newFacTotal.toFixed(2);
  $("#faceValue_price").html(valueFacTotal);
 
  var total_price = parseFloat($("#total_price").html());
  var newDiscounttotal = total_price-(discount_price*revert_qty);
  valDiscounttotal = newDiscounttotal.toFixed(2);
  if(valDiscounttotal == "" || valDiscounttotal < 1)
    valDiscounttotal = newDiscounttotal.toFixed(2);
  $("#total_price").html(valDiscounttotal);
  var valSavPri = (valueFacTotal-valDiscounttotal).toFixed(2);
  if(valSavPri == "" || valSavPri < 1)
    valSavPri = (valueFacTotal-valDiscounttotal).toFixed(2);
  $("#saving_price").html(valSavPri);
     
  
  $(card).parent().parent('.card-cart-block').fadeOut();
    
  // return false;
      
  $.post('/buy/del_full_card/',{cardPercent:cardPercent,revert_id:revert_id,face_value:face_value,revert_qty:revert_qty,merchant_id:merchant_id,card_type:card_type}, function showInfo(res){

    if(res.message == 'error redirect')
    {
      window.location = '/error'
    }

    $("#cardQuantity").html(parseInt($("#cardQuantity").html())-1);
                       
    $.post('/buy/cartStatus/', function showInfo(totalCart){
      if(totalCart.message == 'error redirect')
      {
        window.location = '/error/'
      }
      var cartCount = eval(totalCart);    
      console.log('ALERT ALERT ALERT ALERT ' , cartCount.cardRes);
      $(".badge,.badge2").html(cartCount.cardRes);
      if($("#coupon-field").val() != '' && $("#coupon-field").val() != '22222bbbbb')
      couponDis($("#coupon-field").val());
    $('#paypalId').click();
      if(cartCount.cardRes==0){
        console.log("in if");
        $("[name=payment]").prop("disabled",true);
        $("#chkoutbtn").attr("href","javascript:void(0)");       
        $('#paypalId').click();

      } else {
        $("[name=payment]").prop("disabled",false);
        $("#chkoutbtn").attr("href","javascript:void(0)");
      }
    })
  })

}

function del_shoping_cart(buyID,card,face_value,percent,merchant_id,card_type){
      
     $(card).hide();
     $("#big-cards-"+buyID).fadeOut();
     
     $(card).parent().parent().fadeOut(function(){
       $(this).remove();

      
    });
       
    $.post('/buy/del_shoping_cart/',{buyID:buyID,face_value:face_value,percent:percent,merchant_id:merchant_id,card_type:card_type}, function showInfo(res){
      if(res.message == 'error redirect')
      {
        window.location = '/error';
        return false;
      }

         fetchCartStatus(buyID);
        $("#cardQuantity").html(parseInt($("#cardQuantity").html())-1);
            
        $.post('/buy/cartStatus/', function showInfo(totalCart){
          if(totalCart.message == 'error redirect')
          {
            window.location = '/error/'
          }
          
          var cartCount = eval(totalCart);    
          $(".badge,.badge2").html(cartCount.cardRes);
         })
         
       
    })
  
  }

function delBulkCard(delId,c_faceVal,removePerc,thisHide){
  
  var faceVal = parseFloat($("#faceVal").html());
  var totalPerc = parseFloat($("#totalPerc").val());
  var totalCard = parseInt($("#totalCard").val());

  $(thisHide).attr("onclick",""); 
  $("#"+delId).css("background-color","#d9534f").addClass('vertical-flip',function(){
    setTimeout(function(){
      $("#"+delId).remove();
    },500)
  })
  
    
  var avgPerc = parseFloat((totalPerc-removePerc)/(totalCard-1));
  if(!avgPerc)
    avgPerc = 0;
    
  var totalFaveVal  = parseFloat(faceVal-c_faceVal);
    var delperc = parseFloat((totalFaveVal/100)*avgPerc);
  var payVal = parseFloat(totalFaveVal - delperc).toFixed(2);
  //alert(totalFaveVal +">>"+delperc)
  
  $("#percVal").html(parseFloat(avgPerc));
  $("#faceVal").html(parseFloat(totalFaveVal).toFixed(2));
  $("#payVal").html(parseFloat(payVal));
  $("#totalSaving").html(parseFloat(totalFaveVal-payVal).toFixed(2));
  
  $("#totalPerc").val(parseFloat(totalPerc-removePerc));
  $("#totalCard").val(parseInt(totalCard-1));
  $("#totalcardsnum").html(parseInt($("#totalcardsnum").html())-1);
  }

 
 
function bulk(btn){
  
  $(btn).addClass('disabled');

  $("#bulk-search button[type=submit]").show();
  $("#bulk-search .loadingImg").hide();
            
  var aa = $("#buy_bulk_card input").serialize();
  var  count = 0;
  
  var values = new Array();
  $.each($("input[name='card_id[]']:checked"), function() {
    values.push($(this).val());
    count++;
  });
  
  
  console.log(values);
  console.log(count,">>",values.length);
   
   if( count == values.length )
   {
    
     $.post('/buy/buy_bulk_card_getId/', function (lastID)
      {   
        if(lastID.message == 'error redirect')
        {
          window.location = '/error';
        }
      
        var parseVar = eval(lastID);
         // $.post('/buy/buy_bulk_card/?lastID='+parseVar.lastID+'/', $(".scroll-block input").serialize() , function (res)
          $.post('/buy/buy_bulk_card/',{lastID: parseVar.lastID}, $(".scroll-block input").serialize() , function (res)
          {  

            if(res.message == 'error redirect')
            {
              window.location = '/error';
            }


            window.location="/cart/";
      
           });  
      });
   }
      
      
  }

function checkAll(checkbox,condition){
  
  if(condition == "all")
  {
    if($(checkbox).is(":checked"))
    {
       $(".cardCheckbox").prop('checked', true);
       $("#addCard-btn").removeClass('disabled');
    }
    else
    {
       $(".cardCheckbox").prop('checked', false);
       $("#addCard-btn").addClass('disabled');
    }
  }
  else
  {
    if($(".cardCheckbox").is(":checked"))
    {
       $("#addCard-btn").removeClass('disabled');
    }
    else
    {
       $("#addCard-btn").addClass('disabled');
    }
  }
} 

// function updateAvailableCards(){

//  $.post('/buy/updateAvailableCards/', function (lastID)
//  {   
  
//   $.post('/buy/updateMerchntsTable/', function (res)
//    {   
  
  
//    });
//  });

// }

function checkSearch(value){
  
  if(value == "minimum" || value == "maximum" || value == "highest" || value == "lowest" )
  {
    $("#value_field").css("opacity","1");
    $("#search_field").removeClass("col-md-7"); 
    $("#search_field").addClass("col-md-5");  
  }
  else
  {
    $("#value_field input").val("");
    $("#value_field").css("opacity","0");
    $("#search_field").addClass("col-md-7");  
    $("#search_field").removeClass("col-md-5"); 
  }
}


// function paymentBtn(value){
//   if(value == "paypal"){
//     $("#CheckOut_Now").hide();
//     $("#paypal-btn").show();
//     $("#paypalId").prop("checked",true);    
//     $("#ACDId").removeAttr("checked");    
//     $("#creditId").removeAttr("checked");   
//     }
//   else if(value == "credit" || value == "ACD"){
//     $("#CheckOut_Now").show();
//     $("#paypal-btn").hide();
//     if(value == "credit"){
//       $("#paypalId").removeAttr("checked");   
//       $("#ACDId").removeAttr("checked");    
//       $("#creditId").prop("checked",true);   
//     }
//     if(value == "ACD"){
//       $("#paypalId").removeAttr("checked");   
//       $("#ACDId").prop("checked",true);    
//       $("#creditId").removeAttr("checked"); 
//     }
//   }
// }

function fetchCardTypes() {
  $.post('/buy/fetchMerchantCardTypes/', function (res) {
    var strHtml = '<select class="form-control quick-input-clr" style="width:175px;margin-left:0px;" name="card_type" id="options">';
    strHtml += '<option value=""> Select Card Type </option>';
    for(var i = 0; i < res.types.length; i++){
      if(res.types[i].quick_buy_default===1) {
        strHtml += "<option value="+ res.types[i].card_type_id +" selected> "+ res.types[i].card_display_name +"</option>";
      } else {
        strHtml += "<option value="+ res.types[i].card_type_id +"> "+ res.types[i].card_display_name +"</option>";
      }
    }
    strHtml += "</select>";
    $('#optionSelect').html(strHtml);
  });
}
function ExpCheckOUT(){
  $("#loadingImg_2").show();
  $(".overlayer").show();
  $.post('/paypal/limitCheck/', function (res){
    var arr = eval(res);
    if(arr.condition == "N")
    {  
      $("#loadingImg_2").hide();
      $(".overlayer").hide();
      $("#errorText").html(arr.message);
      $("#errormg").modal('show');
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

function printOrder(){
  $("#like_box").hide();
  $("#orderNumber").show();
  var printContents = document.getElementById('print_confirm').innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  $("#like_box").show();
  $("#orderNumber").hide();
}
function orderInfo(name,orderid) {
  if(name!='' && orderid!=''){
   $.post('/buy/orderstatus/',{orderid: orderid, name: name}, function (res){
    if(res.data == 'success'){
      window.location = '/orderstatus';
    }
   });
  }
}

function verifyRoutingNumber(callBack){
    var routing_number = $('#confirm_bank_route_nmbr').val()
    $.post('/buy-ach/VerifyRoutingNumber/',{routing_number: routing_number}, function (res){
      console.log('>>>>>>>>>>', res);
      console.log('>>>>>>>>>>', res.status);
      var responseMessage = res.message;
      if(responseMessage == 'not found')
        responseMessage = 'Routing number not found';
      if(res.status == 'success'){
          callBack(null, res.status)
      }else{
        callBack(null, responseMessage)
      }
    });
}