/*
** Card Cash CVS Step 2 Js/Jquery functions
*/

$( document ).ready(function(){
	
	//get all merchants at once on load
	$.post('/step1/select_merchant/' , function showInfo(step1_res){		  		

		window.allMerchants = step1_res;
		var tempMerchant = [];
		$(allMerchants).each(function(iIndex, sElement) {
			tempMerchant.push(sElement.name);
		});
		window.onlyMerchName = tempMerchant;
	
		});
});

function getOffer(id)
{
	var formValue 	= $("#value_"+id).val();
    var newValue  	= formValue - formValue*0.1;
    // check if customer has selected the merchant or not
    var merchant 	= $("#merchant_"+id).val();
    if(merchant == '0' || formValue == '') {
    	if(merchant == '0') {
    		$("#message_"+id).html('please select merchant');
    	} else if(formValue == ''){
    		$("#message_"+id).html('please enter value');    		
    	}
    } else {
		
		
   	 	var html1 	  	= '<li style="margin-top:20px;"><span>Your Offer:  $'+newValue.toFixed(2)+'  CVS Gift Cards</span></li>';    
    	$("#offer_"+id).html(html1);
    }

}
function removeMore(divId) {
	
	 $('#new_card_'+divId).remove();
}




function deleteCard(card_orders_id, iteration) {
	
	//var r=confirm("Are you sure?");
	//if (r==true) {
		
		if(iteration=='-1')
			var dltId = card_orders_id;
		else 
			var dltId = iteration;
		
		
	  	$.post('/step2/deleteCard/',{card_orders_id: dltId, id: iteration}, function showInfo(res){
			var del_order = eval(res);
			console.log(".....",del_order);
			var cardQty = del_order.cardNum;
			if(del_order.status == 'success'){
				$("#del_order").val(cardQty);
				if(iteration>=0) {
		
					$('#fullcard_'+card_orders_id+'_'+iteration).remove();
				} else {
					
		
					$('#fullcard_'+card_orders_id).remove();
				}
				addRmvInCrdQty('minus');
				addRemoNewCard('minus');
			}

		});
	//} else {
		
	 	//x="You pressed Cancel!";
	//} 
	
	
	
}
	function deleteCardTemp(card_orders_id) {
		
		//var r=confirm("Are you sure?");
		///if (r==true) {
			$('#fullcard_'+card_orders_id).remove()
		//}
		
		
	}
	


	function chkDuplCrdNum()
	{
		number = [];
		results = [];
		duplic = 0;
		
		
		$("span[name='nameExisting[]']").each(function () {
			number.push($(this).html());
		});
		console.log('number',number);
		$("input[name='number[]']").each(function () {
			number.push(this.value);
		});
		
		console.log('number',number);
		var sorted_arr = number.sort(); // You can define the comparing function here. 
									 // JS by default uses a crappy string compare.
		var results = [];
		for (var i = 0; i < number.length - 1; i++) {
			if ( (sorted_arr[i]!='') && (sorted_arr[i + 1] == sorted_arr[i])) {
				results.push(sorted_arr[i]);
			}
		}
		console.log(results);
		if(results.length>0)
		{
			$("#duplicateRecord").show();
			setTimeout(function(){
				$("#duplicateRecord").hide();
			},3000);
			
			return true;//alert(duplic+'>>'+a);
		}
		else
			return false;
	}

	function addRmvInCrdQty(param){
		
		var total_cards_qty = $("#total_cards_qty").val();	 
		if(!total_cards_qty) {		
			var total_cards_qty = 0;
			$("#total_cards_qty").val(total_cards_qty);
			
		} else {
			//alert(param);
			if(param == 'plus')		
				var total_cards_qty = parseInt(total_cards_qty) + parseInt(1);
			if(param == 'minus')		
				var total_cards_qty = parseInt(total_cards_qty) - parseInt(1);
				
			$("#total_cards_qty").val(total_cards_qty);
		}
	}

	function addRemoNewCard(param){
		
		var total_cards = $("#total_cards").val();	 
		if(!total_cards) {		
			var total_cards = 0;
			$("#total_cards").val(total_cards);
			
		} else {
			//alert(param);
			if(param == 'plus')		
				var total_cards = parseInt(total_cards) + parseInt(1);
			if(param == 'minus')		
				var total_cards = parseInt(total_cards) - parseInt(1);
				
			$("#total_cards").val(total_cards);
		}
	}

	function submitForm() {
		$.post('/step2/select_merchant_regex/' , function showInfo(step1_res){
		var number          = [];
        var card_orders_id 	= [];
        var merchant = [];
        var pin = [];
        var duplicate = false;
    	$("input[name='number[]']").each(function () {
    		number.push(this.value);
    	});
    	$("input[name='pin[]']").each(function () {
      		pin.push(this.value);
     	});
        var inputs = document.querySelectorAll("#step2From input[name='card_orders_id[]']");

        $("input[name='card_orders_id[]']").each(function () {
            card_orders_id.push(this.value);
        });
        $("input[name='merchant[]']").each(function () {
            merchant.push(this.value);
        });
        for (var i = 0; i <= inputs.length; i++) {
        	$("#cardError_"+card_orders_id[i]).html('');
        	$("#pinError_"+card_orders_id[i]).html('');
        	if(number[i] == '' && pin[i] == ''){
            duplicate = false;
           }else{
        	for (var j=0; j < step1_res.data.length; j++){
        		if (step1_res.data[j].merchants_id == merchant[i]){
             	if(number[i].length == step1_res.data[j].web_number_length && pin[i].length == step1_res.data[j].web_pin_length){
                var merchantId = merchant[i];
                var cardNumber = number[i];
                $.ajax({
                  async: false,
                  data: {merchant_id: merchantId, card_number: cardNumber},
                  url: "/step2/checkCards/",
                  success: function(res){
                    if(res.cards.length>0){
                      $("#cardError_"+card_orders_id[i]).html('Card already sold');
                      duplicate = true;
                      return false;
                    }
                  }
                });
              }
              else if(number[i].length < step1_res.data[j].web_number_length || number[i].length > step1_res.data[j].web_number_length){
                 		$("#cardError_"+card_orders_id[i]).html('Invalid card number');
                		return false;
              }
              else if(pin[i].length < step1_res.data[j].web_pin_length || pin[i].length > step1_res.data[j].web_pin_length){
                	 $("#pinError_"+card_orders_id[i]).html('Invalid pin number');
                  	return false;
              }else{
                  for(var c=0; c<number.length; c++){
                    var find = 0;
                    for (var d = 0; d < number.length; d++) {
                      if(number[d] == number[c] && merchant[d] == merchant[c])
                        find++;
                    }
                    if(find > 1){
                      $("#cardError_"+card_orders_id[++i]).html('Duplicate card number');
                      duplicate = true;
                      return false;
                    }
                  }
              }
          }
        }        
      }  
     }
     if(duplicate){
       return false;
     }else{
       	$.post('/step2/step2FormActionSubmit/', $("#step2From").serialize() , function(step2_res){
          window.location = '/login';
        });
     } 
  });
//        var notNulls = [];
//        notNulls = $.grep(number,function(n){ return(n) });
//        //alert("notNulls...."+notNulls+"----"+notNulls.length);
//        if(notNulls.length == 0)
//            return false;
//        else{
            //alert(number+"From OUT==="+number.length) ;
     //    $("input[name='merchant[]']").each(function () {
    	// 	merchant.push(this.value);
    	// });

            //alert(merchant+"From OUT==="+merchant.length);
//        }




	}

	function skipToNextStep(){
		// var total_cards = $("#total_cards").val();
		// var card_Qty = $("#del_order").val();
		// var balance_confirmed = [];
		// $("input[name='balance_confirmed[]']").each(function () {
		// 		balance_confirmed.push(parseInt(this.value));
		// 		//alert("balance_confirmed=="+ balance_confirmed.indexOf(0));
		// });
		// console.log("balance_confirmed==",balance_confirmed.length);
		// if(!total_cards) {
		// 	total_cards = 0;
		// }
		// if(!card_Qty) {
		// 	card_Qty = 1;
		// }
		// if(total_cards == 0){
		// 		$("#cards_removed").show();
		// 	setTimeout(function(){
		// 		$("#cards_removed").hide();
		// 	},3000)
		// 	return false;
		// }else if(card_Qty == 0)
  //       {
		// 		$("#need_balance").show();
		// 	setTimeout(function(){
		// 		$("#need_balance").hide();
		// 	},3000)
		// 	return false;
  //       }else if(balance_confirmed.length == 0)
  //       {
  //       	console.log("before balance status=="+ balance_confirmed.indexOf(0));
  //        	window.location = '/login';
  //       }else {
			$.post('/step2/step2FormActionSubmit/', $("#step2From").serialize() , function showInfo(step2_res){

				window.location = '/login';

			});
		//}
	}

// $( document ).ready(function(){


// 	$("#step2From" ).submit(function( event ) {

//     	$.post('/step2/step2FormActionSubmit/', $("#step2From").serialize() , function showInfo(step2_res){

// 	   		window.location = '/login';

// 		});

// 		event.preventDefault();
// 	 });


// });

function goToStep1 () {
	window.location = 'sell_card.html';
}
