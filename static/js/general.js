jQuery(document).ready(function($){
$('#quickBuy_results').on('hidden.bs.modal', function (e) {
  $('#emptyResult').html("").hide();
})

$( "#quickSearach" ).validate({
  debug: false,
  rules: {
   selectMerchant:{
    required: true
   },
   amount:{
    required: true,
    number:true,
   },
   card_type:{
    required: true
   },
  
  },
  
  errorPlacement: function(error, element) { },
  submitHandler: function(form)
  { 
   $("#quickSearach input[type=submit]").prop("disabled", true);
   $("#quickSearach .loadingImg").show();
   $.post('/buy/quickSearach/', $("#quickSearach").serialize() , function (res)
   { 
   
    $("#quickSearach input[type=submit]").prop("disabled", false);
    $("#quickSearach .loadingImg").hide();
    
    var arr = eval(res);
    if(arr.message == "error redirect")
    {
    	window.location('/error');
    }
    else if(arr.message == "empty")
    {
     var emptyHtml = "<div class='alert alert-info quick_message display_none well-sm' style='display: block;'>";
      emptyHtml += "No closest option was found.</div>";
      $('#emptyResult').html(emptyHtml).show();
      $("#quick_response").html("");
      $("#quickBuy_results").modal('show'); 
    }
    else
    {

/*
    	var TotalPriceAfterDiscount = "";
    	var PriceAfterDiscount = (parseFloat(arr.cards[0].v) * parseFloat(arr.cards[0].p)) / 100;
    	var CheckoutPrice = (parseFloat(arr.cards[0].p) - parseFloat(PriceAfterDiscount)).toFixed(2);
    	alert('arr.cards.length =' + arr.cards.length )

    	alert('price = ' + parseFloat(arr.cards[0].p) + 'PriceAfterDiscount = ' + PriceAfterDiscount + 'CheckoutPrice =' + CheckoutPrice ); 
    	TotalPriceAfterDiscount = parseFloat(TotalPriceAfterDiscount) + parseFloat(PriceAfterDiscount);
    	alert(TotalPriceAfterDiscount);*/

	// alert(arr.cards[0].i);
     var totalsum = 0;
     var html = "";
     console.log(arr)
     if(!arr.result.image)
     {
      var imageName = 'empity_img.png';    
     }
     else
     {
      var imageName =  arr.result.image.replace('merchants', '');
      var imageName =  imageName.replace('/', '');
     
     }
	 
	var totalPrice = 0;
	var totalPrice1 = 0;
	var totalPrice2 = 0;
	var loop1 = 0;
	var loop2 = 0;
	var loop3 = 0;
	var TotalP = 0;
	var TotalP1 = 0;
	var TotalP2 = 0;
	var price = 0;
	var price1 = 0;
	var price2 = 0;
	if(arr.message == 'not-suggestion'){
		// arr.cards.forEach(function(data){
		$.each(arr.cards, function(key, data) {

			var pVal = parseFloat(data.cc.p); // * (data.qty);
			console.log('dataa' , data.qty);
			var vVal = parseFloat(data.cc.v) * parseFloat(data.qty);
			var PercentAge =((parseFloat(pVal) * parseFloat(vVal)) / 100 ); 
			totalPrice += parseFloat(vVal) - parseFloat(PercentAge);
			TotalP += parseFloat(vVal);



			console.log(data.qty, pVal, vVal, 'PercentAge' ,PercentAge, totalPrice, TotalP)
		})
	}
	else
	{
		// arr.cards1.forEach(function(data1){
		$.each(arr.cards1, function(key, data1) {
			// var PercentAge = parseFloat(data1.p) / 100 * parseFloat(data1.v); 
			// totalPrice1 += parseFloat(data1.v) - PercentAge;	 
			// TotalP1 +=   parseFloat(data1.v);
			var pVal = parseFloat(data1.cc.p) ; //* (data1.qty);
			var vVal = parseFloat(data1.cc.v) * (data1.qty);
			var PercentAge = ((parseFloat(pVal) * parseFloat(vVal)) / 100 ); 
			totalPrice1 += parseFloat(vVal) - parseFloat(PercentAge);
			TotalP1 += parseFloat(vVal);
			console.log(data1.cc.p, data1.cc.v, data1.qty, pVal, vVal, PercentAge, totalPrice1, TotalP1)

		})

		// arr.cards2.forEach(function(data2){
		$.each(arr.cards2, function(key, data2) {
			// var PercentAge = parseFloat(data2.p) / 100 * parseFloat(data2.v); 
			// totalPrice2 += parseFloat(data2.v) - PercentAge;	
			// TotalP2 +=     parseFloat(data2.v);

			var pVal = parseFloat(data2.cc.p);// * (data2.qty);
			var vVal = parseFloat(data2.cc.v) * (data2.qty);
			var PercentAge = ((parseFloat(pVal) * parseFloat(vVal)) / 100 ); 
			totalPrice2 += parseFloat(vVal) - parseFloat(PercentAge);
			TotalP2 += parseFloat(vVal);
			console.log(data2.qty, pVal, vVal, PercentAge, totalPrice2, TotalP2)

		})
	}

	 
    if(arr.message == 'not-suggestion'){
		
		 
		// arr.cards.forEach(function(data) {
		var viewD = [], htmlCOLDET = "";
		viewD.m = viewD.v = viewD.p = viewD.q = viewD.t = viewD.rq = "";
		$.each(arr.cards, function(key, data) {

			console.log('data', data.cc.i)
			loop1++;
			var PercentAge = parseFloat(data.cc.p) / 100 * parseFloat(data.cc.v);
			totalsum = totalsum + data.cc.v - PercentAge; 
			price = parseFloat(data.cc.v) - parseFloat(PercentAge);
			//var TotalP =      totalsum + data.v;
			var totalAmount = (parseFloat(arr.amount)/100)+parseFloat(arr.amount);
			console.log("totalsum", totalsum,totalAmount);
			html += '<tr>'; 
			html += '<td>';
			html += '<img src="'+arr.amazons3+imageName+'" class="m_l_10 pull-left" style="width: 100%; max-width: 100px;"</td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">$'+data.cc.v+'</strong></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">'+data.cc.p+'%</strong></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">$'+price.toFixed(2)+'</strong></td>';
			//html += '<td> <a href="/card?buyId='+data.i+'" class="btn btn-danger ">View</a>  </td>';
		//	for(var lp = 0; lp < data.qty; lp++) {
			viewD.m += data.cc.m + ",";
			viewD.v += data.cc.v + ",";
			viewD.p += data.cc.p + ",";
			viewD.q += "cardQty-"+data.qty + ",";
			viewD.rq += data.qty + ",";
			viewD.t += arr.card_type + ",";
				// html += '<input name="buyIdArrm_0[]" value="'+data.cc.m+'" type="hidden">';
				// html += '<input name="buyIdArrv_0[]" value="'+data.cc.v+'" type="hidden">';
				// html += '<input name="buyIdArrp_0[]" value="'+data.cc.p+'" type="hidden">';
				// html += '<input name="buyIdArrq_0[]" value="'+data.qty+'" type="hidden">';
				// html += '<input name="buyIdArrt_0[]" value="'+arr.card_type+'" type="hidden"></td>';
			//}
			if(loop1 == 1){
				viewD.l = arr.cards.length;
				html += 'REPLACECOLDET';
			}
			html += '</tr>';
		});

		viewD.m = viewD.m.slice(0,-1);
		viewD.v = viewD.v.slice(0,-1);
		viewD.p = viewD.p.slice(0,-1);
		viewD.q = viewD.q.slice(0,-1);
		viewD.rq= viewD.rq.slice(0,-1);
		viewD.t = viewD.t.slice(0,-1);

		htmlCOLDET = '<td rowspan="'+viewD.l+'" class="rowspan-block"> <div class="rowspan-block"> ';
		htmlCOLDET += '<input class="btn btn-success" type="button" onclick="buyCar(\''+viewD.p+'\', this, \''+viewD.m+'\', \''+viewD.v+'\', \''+viewD.q+'\', \'\', \''+viewD.rq+'\', \'quick\', \''+viewD.t+'\')" value="ADD TO CART">';
		htmlCOLDET += '<div class="row">Total Amount:<span style="font-size: 20px;">$'+TotalP.toFixed(2)+'</span></div> ';
		htmlCOLDET += '<div class="row">You have to pay:<span style="font-size: 20px;">$'+totalPrice.toFixed(2)+'</span></div> </div></td>';
		html = html.replace("REPLACECOLDET", htmlCOLDET);

	} else {
		if(arr.cards1.length>0 ){
			html += '<tr>'; 
			html += '<td colspan="3">Offer 1 :</td>';
			html += '</tr>';  
		}
		// arr.cards1.forEach(function(data1){
		var viewD = [], htmlCOLDET = "";
		viewD.m = viewD.v = viewD.p = viewD.q = viewD.t = viewD.rq = "";
		$.each(arr.cards1, function(key, data1) { loop2++;
			var PercentAge = parseFloat(data1.cc.p) / 100 * parseFloat(data1.cc.v);
			price1 = parseFloat(data1.cc.v) - parseFloat(PercentAge);
			html += '<tr>'; 
			html += '<td>';
			html += '<img src="'+arr.amazons3+imageName+'" class="m_l_10 pull-left" style="width: 100%; max-width: 100px;"></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">$'+data1.cc.v+'</strong></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">'+data1.cc.p+'%</strong></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">$'+price1.toFixed(2)+'</strong></td>';
			//html += '<td> <a href="/card?buyId='+data1.i+'" class="btn btn-danger ">View</a>  </td>';
			//for(var lp = 0; lp < data1.qty; lp++) {
				viewD.m += data1.cc.m + ",";
				viewD.v += data1.cc.v + ",";
				viewD.p += data1.cc.p + ",";
				viewD.q += "cardQty-"+data1.qty + ",";
				viewD.rq += data1.qty + ",";
				viewD.t += arr.card_type + ",";
				// html += '<input name="buyIdArrm_1[]" value="'+data1.cc.m+'" type="hidden">';
				// html += '<input name="buyIdArrv_1[]" value="'+data1.cc.v+'" type="hidden">';
				// html += '<input name="buyIdArrp_1[]" value="'+data1.cc.p+'" type="hidden">';
				// html += '<input name="buyIdArrq_1[]" value="'+data1.qty+'" type="hidden">';
				// html += '<input name="buyIdArrt_1[]" value="'+arr.card_type+'" type="hidden">';
			//}
			if(loop2 == 1){
				viewD.l = arr.cards1.length;
				html += 'REPLACECOLDET';
			}
			// if(loop2 == 1)
			// html += '<td rowspan="'+arr.cards1.length+'" class="rowspan-block"> <div class="rowspan-block"> ';
			// html += '<input type="button"   class="btn btn-danger " onClick="searchW(1)" value="view">';
			// html += '<div class="row">Total Amount:<span style="font-size: 20px;">$'+TotalP1.toFixed(2)+'</span></div> ';
			// html += '<div class="row">You have to pay:<span style="font-size: 20px;">$'+totalPrice1.toFixed(2)+'</span></div> </div></td>';
			html += '</tr>';
		});
		viewD.m = viewD.m.slice(0,-1);
		viewD.v = viewD.v.slice(0,-1);
		viewD.p = viewD.p.slice(0,-1);
		viewD.q = viewD.q.slice(0,-1);
		viewD.rq= viewD.rq.slice(0,-1);
		viewD.t = viewD.t.slice(0,-1);
		htmlCOLDET = '<td rowspan="'+viewD.l+'" class="rowspan-block"> <div class="rowspan-block"> ';
		htmlCOLDET += '<input class="btn btn-success" type="button" onclick="buyCar(\''+viewD.p+'\', this, \''+viewD.m+'\', \''+viewD.v+'\', \''+viewD.q+'\', \'\', \''+viewD.rq+'\', \'quick\', \''+viewD.t+'\')" value="ADD TO CART">';		htmlCOLDET += '<div class="row">Total Amount:<span style="font-size: 20px;">$'+TotalP1.toFixed(2)+'</span></div> ';
		htmlCOLDET += '<div class="row">You have to pay:<span style="font-size: 20px;">$'+totalPrice1.toFixed(2)+'</span></div> </div></td>';
		html = html.replace("REPLACECOLDET", htmlCOLDET);
		if(arr.cards1.length>0 && arr.cards2.length>0){
			html += '<tr>'; 
			html += '<td colspan="3">Offer 2 :</td>';
			html += '</tr>';      
		}
		else if(arr.cards1.length == 0 && arr.cards2.length>0){
			html += '<tr>'; 
			html += '<td colspan="3">Offer 1 :</td>';
			html += '</tr>';      
		}
		// arr.cards2.forEach(function(data2){
		var viewD = [], htmlCOLDET = "";
		viewD.m = viewD.v = viewD.p = viewD.q = viewD.t = viewD.rq = "";
		$.each(arr.cards2, function(key, data2) { loop3++;
			var PercentAge = parseFloat(data2.cc.p) / 100 * parseFloat(data2.cc.v);
			price2 = parseFloat(data2.cc.v) - parseFloat(PercentAge);
			html += '<tr>'; 
			html += '<td>';
			html += '<img src="'+arr.amazons3+imageName+'" class="m_l_10 pull-left" style="width: 100%; max-width: 100px;"></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">$'+data2.cc.v+'</strong></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">'+data2.cc.p+'%</strong></td>';
			html += '<td> <strong class="pull-left m_t_10" style="color:#3c763d;">$'+price2.toFixed(2)+'</strong></td>';
			//for(var lp = 0; lp < data2.qty; lp++) {
				viewD.m += data2.cc.m + ",";
				viewD.v += data2.cc.v + ",";
				viewD.p += data2.cc.p + ",";
				viewD.q += "cardQty-"+data2.qty + ",";
				viewD.rq += data2.qty + ",";
				viewD.t += arr.card_type + ",";
				// html += '<input name="buyIdArrm_2[]" value="'+data2.cc.m+'" type="hidden">';
				// html += '<input name="buyIdArrv_2[]" value="'+data2.cc.v+'" type="hidden">';
				// html += '<input name="buyIdArrp_2[]" value="'+data2.cc.p+'" type="hidden">';
				// html += '<input name="buyIdArrq_2[]" value="'+data2.qty+'" type="hidden">';
				// html += '<input name="buyIdArrt_2[]" value="'+arr.card_type+'" type="hidden">';
			//}
			if(loop3 == 1){
				viewD.l = arr.cards1.length;
				html += 'REPLACECOLDET';
			}
			// if(loop3 == 1)
			// 	html += '<td rowspan="'+arr.cards2.length+'" class="rowspan-block"> <div class="rowspan-block"> ';
			// html += '<input type="button"   class="btn btn-danger " onClick="searchW(2)" value="view">';
			// html += '<div class="row">Total Amount:<span style="font-size: 20px;">$'+TotalP2.toFixed(2)+'</span></div> ';
			// html += '<div class="row">You have to pay:<span style="font-size: 20px;">$'+totalPrice2.toFixed(2)+'</span></div> </div></td>';
			html += '</tr>';
		});
		viewD.m = viewD.m.slice(0,-1);
		viewD.v = viewD.v.slice(0,-1);
		viewD.p = viewD.p.slice(0,-1);
		viewD.q = viewD.q.slice(0,-1);
		viewD.rq= viewD.rq.slice(0,-1);
		viewD.t = viewD.t.slice(0,-1);
		htmlCOLDET = '<td rowspan="'+viewD.l+'" class="rowspan-block"> <div class="rowspan-block"> ';
		htmlCOLDET += '<input class="btn btn-success" type="button" onclick="buyCar(\''+viewD.p+'\', this, \''+viewD.m+'\', \''+viewD.v+'\', \''+viewD.q+'\', \'\', \''+viewD.rq+'\', \'quick\', \''+viewD.t+'\')" value="ADD TO CART">';
		htmlCOLDET += '<div class="row">Total Amount:<span style="font-size: 20px;">$'+TotalP2.toFixed(2)+'</span></div> ';
		htmlCOLDET += '<div class="row">You have to pay:<span style="font-size: 20px;">$'+totalPrice2.toFixed(2)+'</span></div> </div></td>';
		html = html.replace("REPLACECOLDET", htmlCOLDET);
	}
      
     
     $("#quick_response").html("");
     $("#quick_response").html(html);
     $("#quickBuy_results").modal('show');
     
     if(arr.message == 'not-suggestion')
     $("#quickBuy_results .quick_message").hide();
     
     if(arr.message == 'suggestion')
     $("#quickBuy_results .quick_message").html("Related search not found. Here are some suggestions.").show();
     
    }
   });
  
  }
  
 });

		
		$(".hide_popup").click(function(){
			$('.cart_widget_outer ').hide();
		})
		$(".dropdown-toggle").click(function(){	
			$(".cart_widget_outer").toggle();
			if($(this).hasClass('active'))
			{
				$(this).removeClass('active');
			}
			else
			{
				$(this).addClass('active'); 
			}
		})
		
		$.post('/buy/cartStatus/', function showInfo(res){
			if(res.message == 'error redirect')
			{
				window.location = '/error/'
			}
			
			var arr = eval(res);
			$(".badge,.badge2").html(arr.cardRes);
		})
		
		//animate card to cart 
		var source = $('.source');
		var target = $('.target');
		/* $('.add-to-cart').click(function() {          
			var imgBox = $(this).parent().parent().children('.giftcard').children('div');
			// alert(imgBox.attr('style'))
			imgBox.effect('transfer', { to: $(".cart-link") }, 1000);
			$('.ui-effects-transfer:last').css({
				'background-image': imgBox.css('background-image'),
				'background-size': imgBox.css('background-size'),
				'opacity': 1,
				'border-radius': '5px',
				'z-index':'5555',
			});
		});	 */	
		
		$('.hideCart').click(function(){
			$('.cart_widget_outer').hide();
		})
 
		
		$.post('/buy/searchMerchantCard/', function showInfo(res){
			var arr = eval(res);
			if(arr.message == 'error redirect')
			{
				window.location = '/error/';
			}
			$('#selectMerchant').autocomplete({
				source:arr.results,
				response: function(event, ui) {
					$("#merchant_id_field").val(ui.content[0].id);
				}
			});
		
		
			var html='';
			html +='<select class="form-control input-sm" name="merchantID">';
			
			
			// arr.results.forEach(function(merchant){
			// 	html += '<option value="'+merchant.id+'">'+merchant.label+'</option>';
			// })
			$.each(arr.results, function(key, merchant) {
				html += '<option value="'+merchant.id+'">'+merchant.label+'</option>';
			})
			
			html += '</select> ';
			
			// alert(html)
			
			$("#merchantsName").html(html);
			
			$( "#CardsSearchField" ).autocomplete({
			maxLength: 5,
			// source: arr.results,
			source: function( request, response ) {
			var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
			response( $.grep( arr.results, function( item ){
			return matcher.test( item.label );
			}) );  
			},
			select: function(event,ui){
				var itemName = ui.item.label.replace(' ', '-');
				itemName = itemName.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				itemName = itemName.replace(/--/gi, '-');
				window.location.replace("/buy-gift-cards/discount-" + itemName.toLowerCase() + "-cards/");
			},
			autoFocus: true
			})
			.autocomplete( "instance" )._renderItem = function( ul, item ) {
			if(!item.image )
			{
			var imageName = 'empity_img.png';    
			}
			else
			{
			var imageName =  item.image.replace('merchants', '');
			var imageName =  imageName.replace('/', '');
			
			}
			if(!item.total)
			{
			var toatl =0;
			}
			else
			{
			var toatl = item.total;
			}
			var itemName = item.label.replace(/ /g, '-');
				itemName = itemName.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				itemName = itemName.replace(/--/gi, '-');			
			return $( "<li class='search-results'>" )
			.append( "<a href='/buy-gift-cards/discount-" + itemName.toLowerCase() + "-cards/'> <img src='"+res.amazons3+imageName+"' >  <div><h3>" + item.label + " </h3> <span>" + toatl + " Gift Cards</span> </div></a>" )
			.appendTo( ul );
			};
		});
	

	
});

function fetchCart(){
	if($(".dropdown-toggle").hasClass('active'))
	{}
	else
	{
		var div=$(".role");
		div.animate({width:'100%',opacity:'0.4'},"500",function(){
			div.animate({width:'0',opacity:'0.8'},"500");
		})
		
		$.post('/buy/fetchCart/', function showInfo(res){
			$("#cart-box").html(res);
		})
	}
}

function toggle_box(id){
	$("#"+id).toggle();
	clearAS();
}

 function searchW(w){
 $("#whichSearch").val(w);
 $("#filterQB").submit();
}
function clearAS(){
 $("#value_above, #value_below, #discount").val('');
}