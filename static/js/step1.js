
function selectMerchant(id) {
    $( "#merchantid_"+id ).autocomplete({
        maxLength: 5,
        source: allMerchants,


        search: function(oEvent, oUi) {
            // get current input value
            var sValue = $(oEvent.target).val();
            // init new search array
            var mtchArr = [];
            var ntMtchArr = [];


            // for each element in the main array ...
            $(allMerchants).each(function(iIndex, sElement) {
                // ... if element starts with input value
                var nameMerc = sElement.label;

                var nameStr = $.trim(nameMerc.substr(0, sValue.length));
                if (String(nameStr).toUpperCase() == sValue.toUpperCase()) {
                    // add element
                    mtchArr.push(sElement);
                } else {
                    ntMtchArr.push(sElement);
                }

            });

            //check if entered value not matched then delete extra charactes
            if(mtchArr.length == 0){
                var inputUser = $( "#merchantid_"+id ).val();
                var minMin = 0;
                for(var i = 0; i< inputUser.length; i++){
                    minMin++;
                    var actualInput = inputUser.substr(0,inputUser.length - minMin);
                    if(onlyMerchName.indexOf(String(actualInput)) > -1){
                      $( "#merchantid_"+id ).val(actualInput);
                      i = inputUser.length + 1;
                    }
                }
            }

            var finalAray = [];
            finalArray = mtchArr.concat(ntMtchArr);
            console.log(mtchArr,'finalArray')

            $(this).autocomplete('option', finalArray);
        },

        focus: function( event, finalArray ) {
            $( "#merchantid_1" ).val( finalArray.item.name );
            return false;
        },
        select: function( event, finalArray ) {

            $( "#merchantid_"+id ).val( finalArray.item.name );
            $( "#project-id_"+id ).val( finalArray.item.id );
            $( "#ecodes_percentage_"+id ).val( finalArray.item.ecodes_percentage );
            $("#buyback_percentage_" + id).val(finalArray.item.buyback_percentage);



            return false;
        },

		response: function(event, ui) {
			  if (ui.content.length == 1)
			  {
			  		$("#merchantid_" + id).val(ui.content[0].name);
                    $("#project-id_" + id).val(ui.content[0].id);
                    $("#ecodes_percentage_" + id).val(ui.content[0].ecodes_percentage);
                    $("#buyback_percentage_" + id).val(ui.content[0].buyback_percentage);
					
					 if (ui.content[0].quest != '') {
                        $("#merchant_quest").addClass('p_rel');
                        $("#quest_" + id).addClass("tool-tip slideIn top");
                        $("#quest_" + id).css("display", "block");
                        $("#quest_" + id).text(ui.content[0].quest);
                    } else {
                        $("#merchant_quest").removeClass('p_rel');
                        $("#quest_" + id).removeClass("tool-tip slideIn top");
                        $("#quest_" + id).css("display", "none");
                        $("#quest_" + id).text("");
                    }
								
					$(this).val(ui.content[0].name);
					$(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
					$(this).autocomplete( "close" );
			   }
		}
    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        console.log(item)
        return $( "<li>" ).append( "<a>" + item.name + "</a>" ).appendTo( ul );
    };
}





function deleteCard(card_orders_id, iteration, merchants_id, enter_value,card) {
	
////////////////////////	commented because of no usage here	///////////////////////
		
		$(card).attr("onclick","").css("opacity","0.5");
		$(card).parent().parent().removeClass("row-split").fadeOut();
		
		var totalCards = 0;
		 
		$(".row-split").each(function(data){
			totalCards++;
			});
			 
	  	$.post('/step1/deleteCard/',{id: card_orders_id, merchant: merchants_id, enter_value: enter_value,totalCards:totalCards}, function showInfo(res){
		
			if(iteration>=0) {
	
				$('#fullcard_'+card_orders_id+'_'+iteration).remove();
			} else {
				
	
				$('#fullcard_'+card_orders_id).remove();
			}
			addRmvInCrdQty('minus');
			var total_cards_qty = $("#total_cards_qty").val();	 
			if(total_cards_qty == 0){
				$("#display_n").css('display','none');
				$("#add_Card").prop('value','GET OFFER');
			}
			else
				$("#display_n").html(res);
            /////////////////  Removing checked Attr from Dynamic Options after new card insertion    /////////////////////////
            uncheckAll();
            /////////////////  End Removing checked Attr from Dynamic Options after new card insertion    /////////////////////////

            onLoadChanges();	// Call onload functionality

		
		});
	
}
function deleteCardTemp(card_orders_id) {
	
	var r=confirm("Are you sure?");
	if (r==true) {
	  	$('#fullcard_'+card_orders_id).remove()
	}
	
	
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


/* me  */

function checkValFunc()
{
	//alert(123);
	var mail_check = $("#payment_mail").is(":checked");
	var online_check = $("#payment_online").is(":checked");

	var payment_type = $("input[name='payment_type']").is(":checked");
	var payoutType = $("input[name='payoutType']").is(":checked");
	var tradeType = $("input[name='tradeType']").is(":checked");

	var tradeOffer = $("#tradeOffer").val();

	if((mail_check == false && online_check == false)){
    $("#errorTextSell").html("Please select Payment Options!");
    $(".modal-title").html("alert!");
    $("#errorPopupSell").modal('show');
	}else if((payment_type == false && payoutType == false)){
    $("#errorTextSell").html("Please select Payment Option type!");
    $(".modal-title").html("alert!");
    $("#errorPopupSell").modal('show');
	} else if(($("#trade_more").is(":checked") && tradeType == false)){
    $("#errorTextSell").html("Please select trade Option sub-type!");
    $(".modal-title").html("alert!");
    $("#errorPopupSell").modal('show');
	}else{

		if ($("#payment_mail").is(":checked"))
		{

			var upperOptionType = "payment_mail";
			if ($("#trade_more").is(":checked"))
			{
				var lowerOptionType = "trade_more";
				var paidType = $("input[name='tradeType']:checked").val();
				$("#loadingImg_1").show();
				$.post('/step1/setPageCondition/', {upperOptionType: upperOptionType,lowerOptionType: lowerOptionType, paidType: paidType, tradeOffer: tradeOffer} , function showInfo(step2_res){
				var result = eval(step2_res);
				if(result.condition == "success")
				{   
					$("#loadingImg_1").hide();  			
			   		window.location = '/step2/';
				}
				});

			}else{
				var lowerOptionType = $("input[name='payment_type']:checked").val();
				$("#loadingImg_1").show();
				$.post('/step1/setPageCondition/', {upperOptionType: upperOptionType,lowerOptionType: lowerOptionType} , function showInfo(step2_res){
				var result = eval(step2_res);
				if(result.condition == "success")
				{   
					$("#loadingImg_1").hide();			
			   		window.location = '/step2/';
				}
				});
			}


		}
		else if ($("#payment_online").is(":checked"))
		{
			var upperOptionType = "payment_online";
			if ($("#trade_more").is(":checked"))
			{
				var lowerOptionType = "trade_more";
				var paidType = $("input[name='tradeType']:checked").val();
				$("#loadingImg_1").show();
				$.post('/step1/setPageCondition/', {upperOptionType: upperOptionType,lowerOptionType: lowerOptionType, paidType: paidType, tradeOffer: tradeOffer} , function showInfo(step2_res){
				var result = eval(step2_res);
				if(result.condition == "success")
				{   
					$("#loadingImg_1").hide(); 		
			   		window.location = '/step2/';
				}
				});

			}else{
				var lowerOptionType = $("input[name='payment_type']:checked").val();
				$("#loadingImg_1").show();
				$.post('/step1/setPageCondition/', {upperOptionType: upperOptionType,lowerOptionType: lowerOptionType} , function showInfo(step2_res){
				var result = eval(step2_res);
				if(result.condition == "success")
				{   
					$("#loadingImg_1").hide(); 			
			   		window.location = '/step2/';
				}
				});
			}
		}
	}
}


$( document ).ready(function(){

    var inSellCart = $("#total_cards_qty").val();
    if(inSellCart > 0){
    	$("#add_Card").prop('value','ADD ANOTHER CARD');
    } else {
    	$("#add_Card").prop('value','GET OFFER');
    }
    getFocus();
    $(document).on('click', '.ui-spinner-button', function() {
   	$(this).siblings('input').change();
	});
	
	$(document).on('blur', '.ui-spinner-button', function() {
   	$(this).siblings('input').blur();
	});

	//get all merchants at once on load
	$.post('/step1/select_merchant/' , function showInfo(step1_res){

        window.allMerchants = step1_res;
        var tempMerchant = [];
        $(allMerchants).each(function(iIndex, sElement) {
            tempMerchant.push(sElement.name);
        });

        window.onlyMerchName = tempMerchant;
	});

	$.post('/step1/cardRules/', function showInfo(cardRules){
		window.merchantRules = cardRules;		
	});



    var spinner = $( ".spinner_class" ).spinner({ max: 10, min:1 });
		


	$.post('/step1/getOptions/' , function showInfo(opt_res){		  		

		//window.allOptData = opt_res;
		var evaledOptions = eval(opt_res);
		window.allOptions = evaledOptions.allOptData;
		window.lowerOptionSelectd = evaledOptions.lowerOptionSelectd;
		window.upperOptionSelectd = evaledOptions.upperOptionSelectd;
		window.tradeOptionSelectd = evaledOptions.tradeOptionSelectd;
		onLoadChanges();
		topSelected(); 
                
	});


   	$("#getCashCard").removeClass('get_cash');
	$("#getCashCard").addClass('get_cash_gray');
	$("#getCash").removeClass('get_cash_gray');
	$("#getCash").addClass('get_cash');

	setTimeout(function(){
        //topSelected();
		setactive();
	}, 500)

});
function onLoadChanges(){
    getFocus();
	//console.log("******",allOptions);
	var firstArray = [];
	var secondArray = [];
	for(var k=0; k< allOptions.length; k++){
		if(allOptions[k].trade == 0)
			firstArray.push(allOptions[k]);
		else if (allOptions[k].trade == 1)
			secondArray.push(allOptions[k]);
	}
	//console.log(firstArray.length,"*-*-*-*",secondArray.length)
	var upperHtml ='';
		upperHtml = '<tr>';
    for(var j= 0; j < firstArray.length; j++){
	//console.log("firstArray---"+[j]);
	
		if(firstArray[j].option_title == "Mailed Check")
		{ var icon = '<i class="zocial   envelope"></i>';}
		else if(firstArray[j].option_title == "ACH Deposit")
		{ var icon = '<i class="zocial  home"></i>';}
		else if(firstArray[j].option_title == "PayPal Payment")
		{ var icon = '<i class="zocial paypal-icon"></i>';}
		else if(firstArray[j].option_title == "Trade & get paid more")
		{ var icon = '<i class="zocial trade-icon"> </i>';}

        if(firstArray[j].status == 0){
            var display = "style='opacity: 0.4'";
            var disabled= "disabled='disabled'";
//            var tooltipClassdiv1 = "class='p_rel'";
//            var tooltipClassdiv2 = "class='tool-tip slideIn top'";
            var message = firstArray[j].description;
            var status = 0;
        }else if(firstArray[j].status == 3  || firstArray[j].status == 4){
            var status = firstArray[j].status;
        }else{
            var display = "";
            var disabled= "";
//            var tooltipClass = "";
//            var tooltipClassdiv2 = "";
            var message = "";
            var status = 1;
        }
        if(firstArray[j].opt_Id == "trade_more"){
            var onclick = "onclick='getCash(2)'";
        }else{
            var onclick = "onclick='revertTrade()'";
        }
        if(lowerOptionSelectd == firstArray[j].opt_Id){
            var checked = "checked='checked'";
        }else{
            var checked = "";
        }

        upperHtml += '<td id="'+firstArray[j].opt_Id+'_TD" style="text-align: left; vertical-align: middle;"><label style="margin: 0 !important; display: block;" class="paid-block">';
        upperHtml += '<span style="float: left;  "> '+icon+'</span>';
        upperHtml += '<div  id="'+firstArray[j].opt_Id+'_div1" style="margin-top: 10px;">';
        upperHtml += '<label id="'+firstArray[j].opt_Id+'_lbl" '+display+'>';
        upperHtml += '<input '+disabled+' '+checked+' type="radio" '+onclick+' style="visibility: hidden" ';
        upperHtml += 'value="'+firstArray[j].opt_Id+'"';
        upperHtml += ' name="'+firstArray[j].opt_Name+'" id="'+firstArray[j].opt_Id+'"> '+firstArray[j].option_title+' </label><span class="pull-right m_t20">'+message+' </span>';
        upperHtml += '<input type="hidden" ';
        upperHtml += 'value="'+status+'"';
        upperHtml += ' name="'+firstArray[j].opt_Name+'_status" id="'+firstArray[j].opt_Id+'_status">';

        upperHtml += '<input type="hidden" ';
        upperHtml += 'value="'+status+'"';
        upperHtml += ' name="status[]" id="'+firstArray[j].opt_Id+'">';

        upperHtml += '<input type="hidden" ';
        upperHtml += 'value="'+message+'"';
        upperHtml += ' name="'+firstArray[j].opt_Name+'_message" id="'+firstArray[j].opt_Id+'_message">';

        upperHtml += '<input type="hidden" ';
        upperHtml += 'value="'+firstArray[j].discount_rate+'"';
        upperHtml += ' name="extra_percentage[]" id="'+firstArray[j].opt_Id+'">';

        //upperHtml += '<div id="'+firstArray[j].opt_Id+'_div2" '+tooltipClassdiv2+'>'+message+'</div>';
        upperHtml += '</div>';
        upperHtml += '</label></td>';
        if(((j+1) % 2) == 0){
        	upperHtml += '</tr>';
            if((j+1) != firstArray.length){
                upperHtml += '<tr>';
            }

        }else if((j+1) == firstArray.length){
       		upperHtml += '</tr>';          	
        }
    }
    $("#upperHtmlData").append(upperHtml);


	var html ='';
    for(var i= 0; i < secondArray.length; i++){
		
		if(secondArray[i].option_title == "Amazon gift card")
		{ var icon = '<i><img class="amazonOffer" src="/images/amazon.png"></i>';}
		else if(secondArray[i].option_title == "United air miles")
		{ var icon = '<i><img class="unitedOffer" src="/images/united.png"></i>';}
		else if(secondArray[i].option_title == "CVS cards")
		{ var icon = '<i> <img class="cvsOffer" src="/images/cvs-icon.png"></i>';}
		else if(secondArray[i].option_title == "CardCash gift cards")
		{ var icon = '<i>  <img class="cardcashOffer" src="/images/carcash-icon.png"></i>';}

        if(secondArray[i].status == 0){
            var display = "style='opacity: 0.4'";
            var disabled= "disabled='disabled'";
//            var tooltipClassdiv1 = "class='p_rel'";
//            var tooltipClassdiv2 = "class='tool-tip slideIn top'";
            var message = secondArray[i].description;
            var status = 0;
        }else if(secondArray[i].status == 3  || secondArray[i].status == 4){
            var status = secondArray[i].status;
            var message = "$ "+prcentageVal(secondArray[i].discount_rate);
        }else{
            var display = "";
            var disabled= "";
//            var tooltipClass = "";
//            var tooltipClassdiv2 = "";
            var message = "$ "+prcentageVal(secondArray[i].discount_rate);
            var status = 1;
        }
        if(tradeOptionSelectd == secondArray[i].opt_Id){
            var checked = "checked='checked'";
        }else{
            var checked = "";
        }
        html += '<tr>';
        html += '<td style="text-align: left; vertical-align: middle;" id="'+secondArray[i].opt_Id+'_TD"><label style="margin: 0 !important; display: block; " class="paid-block">';
        html += '<span style="float: left; "> '+icon+'</span>';
        html += '<div id="'+secondArray[i].opt_Id+'_div1" style="margin-top: 10px;">';
        html += '<label id="'+secondArray[i].opt_Id+'_lbl" '+display+'><input '+disabled+' '+checked+' onclick="setactive()" type="radio" style="visibility: hidden" value='+secondArray[i].opt_Id+' name='+secondArray[i].opt_Name+' id='+secondArray[i].opt_Id+'> '+secondArray[i].option_title+' </label><span class="pull-right m_t20 m_r_10" id="'+secondArray[i].opt_Id+'_span">'+message+' </span>';
        html += '<input type="hidden" ';
        html += 'value="'+status+'"';
        html += ' name="'+secondArray[i].opt_Name+'_status" id="'+secondArray[i].opt_Id+'_status">';

        html += '<input type="hidden" ';
        html += 'value="'+status+'"';
        html += ' name="status[]" id="'+secondArray[i].opt_Id+'">';

        html += '<input type="hidden" ';
        html += 'value="'+secondArray[i].discount_rate+'"';
        html += ' name="extra_percentage[]" id="'+secondArray[i].opt_Id+'">';

        //html += '<div id="'+secondArray[i].opt_Id+'_div2" '+tooltipClassdiv2+'>'+message+'</div>';
        html += '</div>';
        html += '</label></td>';
        html += '</tr>';
    }
    $("#belowHtmlData").append(html);

	setTimeout(function(){
		var checkMail = $("#payment_mail").is(':checked');
		var checkOnline = $("#payment_online").is(':checked');
		//alert(checkOnline+"======"+checkMail);
		if(checkOnline == false && checkMail == false){
	  		$("#payment_type_div").css("opacity",0.4);
			$("#mail_check").attr('disabled', true);  
			$("#ach_deposit").attr('disabled', true);  
			$("#paypal_payment").attr('disabled', true);  
			$("#trade_more").attr('disabled', true);  
		}
	    if(lowerOptionSelectd == "trade_more"){
	    	//$("#trade_more").prop('checked', true);  
	    	$("#trade_options").css('display', 'block');
	    }
        /////////////////////////   Extra ////////////////////////////////////////
	  //   if(lowerOptionSelectd == "ach_deposit"){
	  //   	$("#ach_deposit").removeAttr('disabled');
			// $("#ach_deposit_lbl").css('opacity', 1);
			// $("#ach_deposit_div1").removeClass("p_rel");
			// $("#ach_deposit_div2").removeClass("tool-tip slideIn top");
			// $("#ach_deposit_div2").css("display", "none");
			// $("#ach_deposit_div2").text("");
	  //   }
	  //   if(upperOptionSelectd == "payment_mail"){
	  //   	$("#ach_deposit").removeAttr('disabled');
			// $("#ach_deposit_lbl").css('opacity', 1);
			// $("#ach_deposit_div1").removeClass("p_rel");
			// $("#ach_deposit_div2").removeClass("tool-tip slideIn top");
			// $("#ach_deposit_div2").css("display", "none");
			// $("#ach_deposit_div2").text("");
	  //   }
        /////////////////////////   End Extra ////////////////////////////////////////
    },10)
	$("#trade_more").click(function(){
		$("#trade_options").css('display', 'block');
		$("#trade_amazon").removeAttr('checked');
		$("#trade_united").removeAttr('checked');
		$("#trade_cvs").removeAttr('checked');
		$("#trade_cardcash").removeAttr('checked');
	});


	$("#trade_options").css('display', 'none');

	$("span[name='getMail_val']").show();
	$("span[name='getMailStaticVal']").hide();

	$("span[name='getOnline_val']").show();
	$("span[name='getOnlineStaticVal']").hide();

	$("span[name='getcashValStatic']").hide();
	$("span[name='getpaypalValStatic']").hide();
	

	//$("#getCashCard").css("opacity",0.4);

   	$("#getCashCard").removeClass('get_cash');
	$("#getCashCard").addClass('get_cash_gray');
	$("#getCash").removeClass('get_cash_gray');
	$("#getCash").addClass('get_cash');

    var mail_check = $("#payment_mail").is(":checked");
    var online_check = $("#payment_online").is(":checked");

    if(mail_check == true){
        $("#onlineOpt").removeClass('active_gc');
        $("#mailOpt").addClass('active_gc');
        $("#onlineOpt_split").removeClass('active_gc');
        $("#mailOpt_split").addClass('active_gc');
        setTimeout(function(){
            hideShowOpt(3);
        },10)

    }
    if(online_check == true){
        $("#mailOpt").removeClass('active_gc');
        $("#onlineOpt").addClass('active_gc');
        $("#mailOpt_split").removeClass('active_gc');
        $("#onlineOpt_split").addClass('active_gc');
        setTimeout(function(){
            //$("#row2").css("display", "none");
            hideShowOpt(4);
        },10)
    }


}

function goToStep1 () {
	
		window.location = '/step1';
	}

function getCash(val){
    if(val == 1){
        removePercentage();

    	$("#getCashCard").removeClass('get_cash');
    	$("#getCashCard").addClass('get_cash_gray');
    	$("#getCash").removeClass('get_cash_gray');
    	$("#getCash").addClass('get_cash');


        $("span[name='getMailStaticVal']").hide();

        $("span[name='getOnlineStaticVal']").hide();

        $("span[name='getcashValStatic']").hide();

        $("span[name='getpaypalValStatic']").hide();

	    // $("#getCashCard").css("opacity",0.4);
     //    $("#getCash").css("opacity",1);


        $("#payment_mail").removeAttr('checked');
        $("#trade_more").removeAttr('checked');
        $("#trade_options").css('display', 'none');
        $("#payment_online").removeAttr('disabled');
		var firstElem = $("#firstElem_1").val();
		   if(firstElem == 0 ){
		       $("#onlineOpt").css("opacity",0.4);
		       $("#payment_online").attr('disabled', true)
		   }
		   else{
		       $("#onlineOpt").css("opacity",1);
		       $("#payment_online").removeAttr('disabled')
		   }


    }else{

	    var mail_check = $("#payment_mail").is(":checked");
	    var online_check = $("#payment_online").is(":checked");

	    if(mail_check == true){
	    	var stts = 3;
	    	setTimeout(function(){
	    		var changed = $("#get_paid_more").text();
		        $("#mailOffer").html('Your Offer: $'+changed);
		        $("#mailOffer").css('display', 'block');
		        $("#defaultOffer").css('display', 'none');
		        $("#onlineOffer").css('display', 'none');
	        },100);

	    }
	    if(online_check == true){
	    	var stts = 4;
	    }
	    if(online_check == false && mail_check == false){
	    	var stts = 0;
	    }

        getPercentage(stts);

    	$("#getCash").removeClass('get_cash');
    	$("#getCash").addClass('get_cash_gray');
    	$("#getCashCard").removeClass('get_cash_gray');
    	$("#getCashCard").addClass('get_cash');


        $("span[name='getMailStaticVal']").show();

        $("span[name='getOnlineStaticVal']").show();
    
        $("span[name='getcashValStatic']").show();

        $("span[name='getpaypalValStatic']").show();
    
        if(($("#payment_online").is(':checked')) == false){
			$("#payment_mail").prop('checked', true);
        }
        
        $("#payment_type_div").css("opacity",1);
        $("#payment_type_div").css("display","block");

        $("#payment_type_trade_div").css("display","none");


        $("#trade_more").prop('checked', true);
        $("#trade_more").removeAttr('disabled');
        $("#trade_options").css('display', 'block');

        // $("#getCash").css("opacity",0.4);
        // $("#getCashCard").css("opacity",1);

    }
//		var checkMail = $("#payment_mail").is(':checked');
//		var checkOnline = $("#payment_online").is(':checked');
//		if(checkOnline == true){
			checkedOnlineOption();
//		}
//		if(checkMail == true){
//			checkedMailOption();
//		}

		topSelected();
}

function hideShowOpt(key){
    var status = [];
    var ids = [];
    $("input[name='status[]']").each(function () {
        status.push(this.value);
        ids.push(this.id);
    });
    for(var b =0; b < status.length; b++){
        var id = ids[b];
        $("#"+id+"_TD").css('display', '');
    }
    for(var l =0; l < status.length; l++){
        if(status[l].indexOf(key) > -1)
            var id = ids[l];
        $("#"+id+"_TD").css('display', 'none');
        $("#"+id+"_TD").removeClass('active_Opt');
		$("#"+id).removeAttr("checked");
		if(id == "trade_more")
			$("#trade_options").css('display', 'none');
    }

}
function removePercentage(){
    var cashVal_offer = $("#cashVal").val();
    var paypalVal_offer = $("#paypalVal").val();
    $("#get_paid_more").text(cashVal_offer);
    //$("#get_paid_faster").text(paypalVal_offer);
}
function getPercentage(stts){
	//alert(stts);
    var total_extra_percentage = [];
    var extra_percentage = [];
    var status = [];
    $("input[name='status[]']").each(function () {
        status.push(this.value);
    });
    $("input[name='extra_percentage[]']").each(function () {
        total_extra_percentage.push(this.value);
    });
    for(var l =0; l < status.length; l++){
        if(status[l] != 0 &&  status[l] != stts){
            extra_percentage.push(total_extra_percentage[l]);
        }
    }
    var max_percent = Math.max.apply( Math, extra_percentage);
    var cashVal_offer = $("#cashVal").val();
    var paypalVal_offer = $("#paypalVal").val();
    var raised_cashoffer = parseFloat((max_percent/100)* cashVal_offer) + parseFloat(cashVal_offer);
    var raised_paypaloffer = parseFloat((max_percent/100)* paypalVal_offer) + parseFloat(paypalVal_offer);
    $("#get_paid_more").text(raised_cashoffer.toFixed(2));
    $("#get_paid_more_split").text(raised_cashoffer.toFixed(2));
    //$("#get_paid_faster").text(raised_paypaloffer.toFixed(2));
}
function prcentageVal(val) {
    var max_percent = val;
    var cashVal_offer = $("#cashVal").val();
    var raised_cashoffer = parseFloat((max_percent / 100) * cashVal_offer) + parseFloat(cashVal_offer);
    return raised_cashoffer.toFixed(2);
}

function setPercentage() {
    var extra_percentage = [];
    var ids = [];

    $("input[name='extra_percentage[]']").each(function () {
        extra_percentage.push(this.value);
        ids.push(this.id);
    });

    for (var c = 0; c < extra_percentage.length; c++) {
        var id = ids[c];
        if ($("#" + id).is(':checked')) {
            var max_percent = extra_percentage[c];
            var cashVal_offer = $("#cashVal").val();
            var paypalVal_offer = $("#paypalVal").val();
            var raised_cashoffer = parseFloat((max_percent / 100) * cashVal_offer) + parseFloat(cashVal_offer);
            var raised_paypaloffer = parseFloat((max_percent / 100) * paypalVal_offer) + parseFloat(paypalVal_offer);
            $("#get_paid_more").text(raised_cashoffer.toFixed(2));
		    $("#get_paid_more_split").text(raised_cashoffer.toFixed(2));
		    // //alert("lllll"+$("#tradeOffer").val());
		    $("#tradeOffer").val(raised_cashoffer.toFixed(2));
       //      //$("#get_paid_faster").text(raised_paypaloffer.toFixed(2));
       //      if($("#payment_online").is(':checked')) { 
       //      	//$("#"+id+"_span").text(raised_paypaloffer.toFixed(2));
		    	// $("#tradeOffer").val(raised_paypaloffer.toFixed(2));            	
       //  	} else if($("#payment_mail").is(':checked')) {
       //      	//$("#"+id+"_span").text(raised_cashoffer.toFixed(2));
			    // $("#tradeOffer").val(raised_cashoffer.toFixed(2));
       //  	}
        }

    }
}

// function setPercentage() {
//     var extra_percentage = [];
//     var ids = [];

//     $("input[name='extra_percentage[]']").each(function () {
//         extra_percentage.push(this.value);
//         ids.push(this.id);
//     });

//     for (var c = 0; c < extra_percentage.length; c++) {
//         var id = ids[c];
//         //if ($("#" + id).is(':checked')) {
//             var max_percent = extra_percentage[c];
//             var cashVal_offer = $("#cashVal").val();
//             var paypalVal_offer = $("#paypalVal").val();
//             var raised_cashoffer = parseFloat((max_percent / 100) * cashVal_offer) + parseFloat(cashVal_offer);
//             var raised_paypaloffer = parseFloat((max_percent / 100) * paypalVal_offer) + parseFloat(paypalVal_offer);
//       //       $("#get_paid_more").text(raised_cashoffer.toFixed(2));
// 		    // $("#get_paid_more_split").text(raised_cashoffer.toFixed(2));
// 		    // // //alert("lllll"+$("#tradeOffer").val());
//       //       $("#get_paid_faster").text(raised_paypaloffer.toFixed(2));
//             if($("#payment_online").is(':checked')) { 
//             	$("#"+id+"_span").text(raised_paypaloffer.toFixed(2));
//         	} else if($("#payment_mail").is(':checked')) {
//             	$("#"+id+"_span").text(raised_cashoffer.toFixed(2));
//         	}
//         	if ($("#" + id).is(':checked')) {
//         		var value = $("#"+id+"_span").text();
// 	    		$("#tradeOffer").val(value);
// 	    	}

//         //}

//     }
// }

function main_online(val){

    if (val==1)
    {

        hideShowOpt(3);
        //$("#row2").css("display", "");
		$(".cell5").each(function () { 
	     	$(".cell5").removeClass('active');
			$("#cellSecond").text("");
		});
		$(".cell4").each(function () { 
	     	$(".cell4").addClass('active');
			$("#cellFirst").text("CURRENT SELECTION");
      $("#mailOffer").show();
      $("#defaultOffer").hide();
      $("#onlineOffer").hide();
		});
	
        $("#mailOpt").addClass('active_gc');
        $("#onlineOpt").removeClass('active_gc');
        $("#mailOpt_split").addClass('active_gc');
        $("#onlineOpt_split").removeClass('active_gc');

        $("#payment_mail").prop('checked', true);
        $("#payment_online").removeAttr('checked');


        $("#payment_type_trade_div").css("display","none");
        $("#payment_type_div").css("display","block");

     //   	$("#getCashCard").removeClass('get_cash');
    	// $("#getCashCard").addClass('get_cash_gray');
    	// $("#getCash").removeClass('get_cash_gray');
    	// $("#getCash").addClass('get_cash');

        // $("#getCash").removeClass("opacity");
        // $("#getCashCard").addClass("opacity");
/////////////////////////////////////////////////////////
        $("#payment_type_div").css("opacity",1);


		//checkedMailOption();
        checkedOnlineOption();

        $("#mail_check, #ach_deposit, #paypal_payment").click(function(){
            $("#trade_options").css('display', 'none');
            $("span[name='getMailStaticVal']").hide();
	        $("span[name='getOnlineStaticVal']").hide();
			$("span[name='getcashValStatic']").hide();
			$("span[name='getpaypalValStatic']").hide();

	   	    // $("#getCashCard").css("opacity",0.4);
	        // $("#getCash").css("opacity",1);
	
	       	$("#getCashCard").removeClass('get_cash');
	    	$("#getCashCard").addClass('get_cash_gray');
	    	$("#getCash").removeClass('get_cash_gray');
	    	$("#getCash").addClass('get_cash');

            removePercentage();

        });
////////////////////////////////////////////////////////
		setOfferVal();
    	// setPercentage();
    }
    else
    {
        hideShowOpt(4);
        //$("#row2").css("display", "none");
		$(".cell4").each(function () { 
	     	$(".cell4").removeClass('active');
			$("#cellFirst").text("");
		});
		$(".cell5").each(function () { 
	     	$(".cell5").addClass('active');
			$("#cellSecond").text("CURRENT SELECTION");
      $("#mailOffer").hide();
      $("#defaultOffer").hide();
      $("#onlineOffer").show();
		});
	
        var check_counter = $("#cnt").val();
        if(check_counter <= 1) {
            $("#onlineOpt").addClass('active_gc');
        }
        $("#mailOpt").removeClass('active_gc');
        $("#onlineOpt_split").addClass('active_gc');
        $("#mailOpt_split").removeClass('active_gc');
		//$("#trade_more_TD, #trade_amazon_TD, #trade_united_TD, #trade_cvs_TD").removeClass('active_Opt');

        $("#payment_mail").removeAttr('checked');
        $("#payment_online").prop('checked', true);

        $("#payment_type_div").css("display","block");
        //$("#payment_type_trade_div").css("display","block");

        $("#payment_type_div").css("opacity",1);

        // $("#getCashCard").removeClass("opacity");
        // $("#getCash").addClass("opacity");

     //   	$("#getCashCard").removeClass('get_cash_gray');
    	// $("#getCashCard").addClass('get_cash');
    	// $("#getCash").removeClass('get_cash');
    	// $("#getCash").addClass('get_cash_gray');


			checkedOnlineOption();

        $("#mail_check, #ach_deposit, #paypal_payment").click(function(){
            $("#trade_options").css('display', 'none');
            $("span[name='getMailStaticVal']").hide();
	        $("span[name='getOnlineStaticVal']").hide();
			$("span[name='getcashValStatic']").hide();
			$("span[name='getpaypalValStatic']").hide();
	   	    
	   	    // $("#getCashCard").css("opacity",0.4);
	        // $("#getCash").css("opacity",1);

	       	$("#getCashCard").removeClass('get_cash');
	    	$("#getCashCard").addClass('get_cash_gray');
	    	$("#getCash").removeClass('get_cash_gray');
	    	$("#getCash").addClass('get_cash');

            removePercentage();
        });

		//getCash(1); // For Equality of top methods

	    var check_counter = $("#cnt").val();
        if(check_counter > 1)
        {
			$("#online-cards-btn,#mail-cards-btn").addClass('disabled');
            //$("#mail-cards-btn").attr('disabled', true);
			//$("#loader").css('display', 'block');
			$.post('/step1/split_cards/', $("#forReload").serialize() , function showInfo(step1_res){
				$("#step1Firststep")[0].reset();
				removePlaceholder();
				$("#display_n").html(step1_res);
				$("#split_message").show();
    				//$("#mail-cards-btn").hide();
    				//$("#online-cards-btn").show();
				$("#online-cards-btn,#mail-cards-btn").removeClass('disabled');
                //$("#mail-cards-btn").removeAttr('disabled');
	                onLoadChanges(); // To set with default state 
				//$("#loader").css('display', 'none');
      $(".cell5").addClass('active');
      $("#cellSecond").text("CURRENT SELECTION");
         $("#mailOffer").hide();
      $("#defaultOffer").hide();
      $("#onlineOffer").show();
			});

        }
        setOfferVal();
    	// setPercentage();
	}
}

function setOfferVal(){
 	var ar = [];
	$(".active_Opt").each(function () {
	     ar.push(this.id);
	});
	    //console.log(ar);
     if (ar == "trade_more_TD"){
    	getCash(2);
    } else if(ar == "trade_more_TD" && ar.length > 1){
    	setactive();
    }
}


function setCSS(val) {
  if(val == 1){
    setTimeout(function(){
      $("#onlineOpt").css("opacity",0.4);
      $("#payment_online").attr('disabled', true);
    },100)
   }if(val==2){
    setTimeout(function(){
      $("#onlineOpt").css("opacity",1);
      $("#payment_online").attr('disabled', false);
    },100)    
   }
}

function test(val,itr){

	var change = val;
	var itr = itr;
	$("#updated").val('1')
    alert($("#updated").val());
	var cardVal = $("#cardCashVal_"+itr).val();
	var paypalVal = $("#cardPaypalVal_"+itr).val();

	var totalCash = $("#get_paid_more").text();
	var totalOnline = $("#get_paid_faster").text();
	var cardCashNewval = change * cardVal;
	var cardPaypalNewval = change * paypalVal;
	$("#getMail_val_"+itr).text(cardCashNewval);

	var mailval = onlineval = 0;
	$("span[name='getMail_val[]']").each(function () {
			var val = $(this).text()
			data = val.replace("$", '');
			mailval = parseFloat(mailval) + parseFloat(data);
	});


		$("#get_paid_more").text(mailval);
	
	
		
		if($.trim($("#getOnline_val_"+itr).text()) != "N/A")
			$("#getOnline_val_"+itr).text(cardPaypalNewval);

		$("span[name='getOnline_val[]']").each(function () {
			var val = $(this).text()
			if($.trim(val) == "N/A")
				data = 0;
			else
				data = val.replace("$", '');
			onlineval = parseFloat(onlineval) + parseFloat(data);
		});
		$("#get_paid_faster").text(onlineval);
}

function formSubit() {
	var entered_value 		= $("#face_value_1").val();    
	var merchant_id 		= $("#project-id_1").val();




	var names = [];
	$("input[name='name[]']").each(function () {
			names.push(this.value);
	});
	var empty = 0;
	for(var i = 0; i<names.length; i++){
		if($.trim(names[i]) == ''){
			empty = 1;
		}
	}

	if(empty == 1){
		
		$("#merchant_required").show();
		setTimeout(function(){
				$("#merchant_required").hide();
		},3000);
		return false;
		
	} else if(entered_value == ''){
		$("#err_div").html('Please enter card value!');
		setTimeout(function(){
			$("#err_div").html('');
		},3000);
		return false;
	}else {
			//console.log("hi");

				//$("#loader").css('display', 'block');
				if(checkNaN(entered_value) && checkRule(merchant_id)){
					
					$("#add_Card").attr('disabled', true);
					$.post('/step1/step1FormAction/', $("#step1Firststep").serialize() , function showInfo(step1_res){
						//alert(step1_res);
						$("#step1Firststep")[0].reset();
						$("#add_Card").attr('disabled', false);
						removePlaceholder();
						$("#display_n").html(step1_res);
                        /////////////////  Removing checked Attr from Dynamic Options after new card insertion    /////////////////////////
                        uncheckAll();
                        /////////////////  End Removing checked Attr from Dynamic Options after new card insertion    /////////////////////////
                        onLoadChanges();	// Call onload functionality
						var spinner = $( ".spinner_class" ).spinner({ max: 10, min:1 });
						//$("#loader").css('display', 'none');
					//	alert('going to empty avlue');
						// $("[name=name[]]").val("");
						$('#merchantid_1').val('');
						// $("[name=merchant[]]").val("");
						// $("[name=buyback_percentage[]]").val("");
						// $("[name=ecodes_percentage[]]").val("");

					});
				}

			}
}

function checkNaN(val){
	var value = val;
	if(value != ""){
		if(isNaN(value) || (value <= 0)){
			$("#err_div").text("Only Positive Integers allowed!");
			return false;
		}else{
			$("#err_div").text("");
			return true;
		}
	}else{
			$("#err_div").text("");
			return true;
	}
}

function checkRule(id){
	var value 		= $("#face_value_1").val();
	var ruleData = eval(merchantRules);
	//alert(ruleData.merchants_id+"------"+ruleData.length);
	var maxLimit = [];
	var status = false;
	for(var i = 0; i < ruleData.length; i++)
	{	
		if(id == ruleData[i].id)
		{
			var maxLimit = ruleData[i].max_limit;
			break;
		}
	}
	if((maxLimit != "") && (maxLimit < value)){
		$("#err_div").text("Maximum amount for this merchant is $"+ maxLimit);
	}else{
		$("#err_div").text("");
		status = true;
	}
return status;
}
/////////////////  Donot Remove revertTrade(); as it is being used by dynamic HTML     ///////////////////////
function revertTrade(){
	//$("#tradeOffer").val("");
	var mail_check = $("#payment_mail").is(":checked");
    var online_check = $("#payment_online").is(":checked");

    if(mail_check == true){
    	setTimeout(function(){
    		var changed = $("#get_paid_more").text();
	        $("#mailOffer").html('Your Offer: $'+changed);
	        $("#mailOffer").css('display', 'block');
	        $("#defaultOffer").css('display', 'none');
	        $("#onlineOffer").css('display', 'none');
        },100);

    }
    if(online_check == true){
    	setTimeout(function(){
    		var changed = $("#get_paid_faster").text();
	        $("#onlineOffer").html('Your Offer: $'+changed);
	        $("#mailOffer").css('display', 'none');
	        $("#defaultOffer").css('display', 'none');
	        $("#onlineOffer").css('display', 'block');
        },100);
    }

	$("#trade_options").css('display', 'none');
	$("span[name='getMailStaticVal']").hide();
	$("span[name='getOnlineStaticVal']").hide();
	$("span[name='getcashValStatic']").hide();
	$("span[name='getpaypalValStatic']").hide();

	// $("#getCashCard").css("opacity",0.4);
	// $("#getCash").css("opacity",1);

   	$("#getCashCard").removeClass('get_cash');
	$("#getCashCard").addClass('get_cash_gray');
	$("#getCash").removeClass('get_cash_gray');
	$("#getCash").addClass('get_cash');


	topSelected();

    var cashVal_offer = $("#cashVal").val();
    $("#get_paid_more").text(cashVal_offer);
}
/////////////////  Donot Remove revertTrade(); as it is being used by dynamic HTML     ///////////////////////
function checkedOnlineOption(){

    var status = [];
    var ids = [];
    $("input[name='status[]']").each(function () {
        status.push(this.value);
        ids.push(this.id);
    });
    for(var b =0; b < status.length; b++){
        var id = ids[b];
        $("#"+id).css('display', '');
    }
    for(var l =0; l < status.length; l++){
        var id = ids[l];
        $("#"+id).removeAttr('disabled');
        $("#"+id+"_lbl").css('opacity', 1);
    }
    for(var l =0; l < status.length; l++){
        var id = ids[l];
        if(status[l] == 0)
        {
            $("#"+id).attr('disabled', true);
            $("#"+id+"_lbl").css('opacity', 0.4);
            $("#"+id).removeAttr('checked');
//            $("#"+id+"_div1").addClass("p_rel");
//            $("#"+id+"_div2").addClass("tool-tip slideIn top");
//            $("#"+id+"_div2").css("display", "block");
//            $("#"+id+"_div2").text($("#mail_check_message").val());
        }
    }

}

function balanceInquiry(){
	//window.location= '/balanceInquiry';
	var win=window.open("/balanceInquiry", '_blank');
  	win.focus();

}
function removePlaceholder(){
	$( "#merchant_quest" ).removeClass('p_rel');
	$("#quest_1").removeClass("tool-tip slideIn top");
	$("#quest_1").css("display", "none");
	$("#quest_1").text("");

}
function topSelected(){

    var status = [];
    var ids = [];

    $("input[name='status[]']").each(function () {
        status.push(this.value);
        ids.push(this.id);
    });
    for(var b =0; b < status.length; b++){
        var id = ids[b];
        $("#"+id+"_TD").removeClass('active_Opt');
    }
    for(var l =0; l < status.length; l++){
        var id = ids[l];
        if($("#"+id).is(":checked"))
            $("#"+id+"_TD").addClass('active_Opt');
    }



}
function setactive(){
    var status = [];
    var ids = [];

    $("input[name='status[]']").each(function () {
        status.push(this.value);
        ids.push(this.id);
    });
    for(var b =0; b < status.length; b++){
        var id = ids[b];
        $("#"+id+"_TD").removeClass('active_Opt');
    }
    for(var l =0; l < status.length; l++){
        var id = ids[l];
        if($("#"+id).is(":checked"))
        $("#"+id+"_TD").addClass('active_Opt');
    }
    setPercentage();
	var mail_check = $("#payment_mail").is(":checked");
    var online_check = $("#payment_online").is(":checked");

    if(mail_check == true){
    	setTimeout(function(){
    		var changed = $("#get_paid_more").text();
	        $("#mailOffer").html('Your Offer: $'+changed);
	        $("#mailOffer").css('display', 'block');
	        $("#defaultOffer").css('display', 'none');
	        $("#onlineOffer").css('display', 'none');
        },100);

    }
    if(online_check == true){
    	setTimeout(function(){
    		var changed = $("#get_paid_faster").text();
	        $("#onlineOffer").html('Your Offer: $'+changed);
	        $("#mailOffer").css('display', 'none');
	        $("#defaultOffer").css('display', 'none');
	        $("#onlineOffer").css('display', 'block');
        },100);
    }
}

// function deActive(){
//     var status = [];
//     var ids = [];

//     $("input[name='status[]']").each(function () {
//         status.push(this.value);
//         ids.push(this.id);
//     });
//     for(var b =0; b < status.length; b++){
//         var id = ids[b];
//         $("#"+id+"_TD").removeClass('active_Opt');
//     }
//     setMaxPercentage();

// }

function getFocus(){
    $("#merchantid_1").focus();
}
function uncheckAll(){
    setTimeout(function(){
        var ids = [];
        $("input[name='status[]']").each(function () {
            ids.push(this.id);
        });
        //alert(ids);
        for(var l =0; l < ids.length; l++){
            $("#"+ids[l]).removeAttr("checked");
        }
    },100)
}



//sell-card Step2: Pop UP functions
    function contUsPopSH(sh){

        if(sh == 1){
            $("#contactUsPopup").css('display','block')
        } else {
            $("#contactUsPopup").css('display','none')
        }
    }

    function fileUpload(sh) {

        if (sh == 1) {
            $("#fileUpload").css('display', 'block')
        } else {
            $("#fileUpload").css('display', 'none')
        }
    }

    function bulkPopup(sh){

      if(sh == 1){
      $("#bulkPopup").css('display','block')
      $.post('/step1/bulkDownload/',{value: sh}, function respose(responded){
      });
    } else {
      $("#bulkPopup").css('display','none')
      $.post('/step1/bulkDownload/',{value: sh}, function respose(responded){

      });
    }
    }

    jQuery(document).ready(function($){

      $('body').click(function(){  
        $.post('/buy/updateCardCartTime/', function showInfo(res){
          if(res.message == 'error redirect')
          {
            window.location = '/error/'
          }
          return;
        })
      })

      $('.userNameToggle').click(function(){
        $('.userName2').toggle();
      })

      var offset = 50;
      var duration = 100;
      $(window).scroll(function() {
          if ($(this).scrollTop() > offset) {
            $('.header-home').addClass('white');
              $('.back-to-top').fadeIn(duration);
          } else {
            $('.header-home').removeClass('white');
              $('.back-to-top').fadeOut(duration);
          }
      });
      
      $('.back-to-top').click(function(event) {
          event.preventDefault();
          $('html, body').animate({scrollTop: 0}, duration);
          return false;
      });

      $.ajax({
        cache: false,
        data: {action:"ipAddr"},
        dataType: "json",
        success: function(dataAjax) {
          console.log("ip address :",dataAjax.ipAddr);
          $('#ip').val(dataAjax.ipAddr);
          $('#logIp').val(dataAjax.ipAddr);
          $('#regIp').val(dataAjax.ipAddr);
        },
        type:"POST",
        url: "/clientip/getClientIp/"
      });

    })





















