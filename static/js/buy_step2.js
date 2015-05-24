
$( document ).ready(function(){ 

var txt = '{"item_info":[' +
'{"src":"../img/default.jpg","type":"实体卡", "quantity":"99", "value":"￥100", "off":"10%", "price":"￥90", },' +
'{"src":"../img/default.jpg","type":"实体卡", "quantity":"89", "value":"￥100", "off":"10%", "price":"￥90", },' +
'{"src":"../img/default.jpg","type":"实体卡", "quantity":"79", "value":"￥100", "off":"10%", "price":"￥90", },' +
'{"src":"../img/default.jpg","type":"实体卡", "quantity":"69", "value":"￥100", "off":"10%", "price":"￥90", },' +
']}';

var obj = eval ("(" + txt + ")");

for (var i in obj.item_info)
{
   var src=obj.item_info[i].src;
   var type=obj.item_info[i].type;
   var quantity=obj.item_info[i].quantity;
   var value=obj.item_info[i].value;
   var off=obj.item_info[i].off;
   var price=obj.item_info[i].price;

   part1 = "<tr data-index=\""+i+"\"><td style=\"text-align: center; \"><div style=\"background-size: 100% auto; width:69px;\">";
   part1 +="<img src=\"";
   part1 +=src;
   part1 +="\" width=\"69\" height=\"43\">";
   part1 +="</div></td><td><div class=\"cardtags text-center\"><span class=\"online-only\" style=\"border:2px solid #3c4d67!important;\">";
   part1 += type;
   part1 += "</span></div></td><td>";   
   part1 += quantity;
   part1 += "</td><td>";
   part1 += value;
   part1 += "</td><td>";
   part1 += off;
   part1 += "</td><td>";           
   part1 += price;
   part1 += "</td><td><button type=\"button\" class=\"btn btn-sm btn-success add-to-cart disableBtn\" ";
   //part1 += "onclick=\"buyCar('22',this,'184','10','cardQty-0','','1','','1')\">ADD TO CART</button></td></tr>";
   part1 += "onclick=\"buyCar()\">ADD TO CART</button></td></tr>";
   //$("#tbody_show").append(part1);
}
   // $("button:contains('ADD TO CART')").click(function(){
   //    var row =this.parentNode.parentNode;
   //    alert(row.rowIndex + " qty is "+row.cells[2].innerHTML);
         
   // });
});











jQuery(document).ready(function($){
 	
	 fetchCartStatus();
	$("#myTable").tablesorter();

	$("#myTable thead th").click(function(){
		$(".showdetail").remove();
		var html = '';
			html += '<tr class="showdetail">';
				html += '<td colspan="7">';
					html += '<h4>Delivery & Redemption</h4>';
					html += '<ul class="unstyled">';
						html += '<li>This eGift card can be redeemed online.</li>';
						html += '<li>This printable voucher can be redeemed on location.</li>';
						html += '<li>This eGift + voucher will be delivered to your Card Cash account within 24 hours.</li>';
						html += '<li>Please note, items purchased with a Home Depot gift card are final sale. </li>	';				
					html += '</ul>';
				html += '</td>';
			html += '</tr>';
		var numTr = 1;
		var totaltr = 0;
		$("#myTable tbody tr").each(function(){
			totaltr++;
			})
		console.log("count",totaltr);
			setTimeout(function(){
				 for(var i = 0; i< totaltr; i++)
				{	
					 
					$("table tbody tr:nth-child("+numTr+")").after(html)
					 numTr = numTr+2;					
				} 
			},100)
			
		 
			
	});
 
});



function sortByPrice(mName, sort){
  //alert(mName + '>>' +sort);  
  window.location = '/buy-gift-cards/discount-' + mName.toLowerCase() + "-cards/?price=" + sort + '/' ;
}
function SortByType(mName, type){
	window.location = '/buy-gift-cards/discount-' + mName.toLowerCase() + "-cards/?type=" + type + '/' ;
}


jQuery(document).ready(function($){

  $('.filterable .filters input').keyup(function(e){
    var code = e.keyCode || e.which;
    if (code == '9') return;
    var $input = $(this),
    inputContent = $input.val().toLowerCase(),
    $panel = $input.parents('.filterable'),
    column = $panel.find('.filters td').index($input.parents('td')),
    $table = $panel.find('.table'),
    $rows = $table.find('tbody tr');
    var $filteredRows = $rows.filter(function(){
      var value = $(this).find('td').eq(column).text().toLowerCase();
      return value.indexOf(inputContent) === -1;
    });
    $table.find('tbody .no-result').remove();
    $rows.show();
    $filteredRows.hide();
    if($filteredRows.length === $rows.length)
      $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
  });
  
});

function setPercent(value) {
  return value+'%';
}
function setValue(value) {
  var actualValue = parseFloat(value).toFixed(2)
  return '$'+actualValue;
}
function cardType(value) {
  var displayNameHtml = '<div class="cardtags text-center">';
  if(value){
    displayNameHtml+='<span class="online-only">'+value+'</span></div>';
  }
  return displayNameHtml;
}
function setPrice(value,row) {
  var cashValue = parseFloat(row.value-(((row.value)/100)*row.percent)).toFixed(2);
  return '$'+cashValue;
}
function imgDate(){
  if('merchants/AMC-Theaters.png') {
    var imageName =  'merchants/AMC-Theaters.png';
    imageName =  imageName.replace('merchants', '');
    imageName =  imageName.replace('/', '');
 } else {
     var imageName = 'empity_img.png';    
  }
 return '<div style="background-image: url(\'https://s3.amazonaws.com/new-cardcash-images/images/merchants/'+imageName+'\');background-size: 100% auto; width:69px;"><img src="https://s3.amazonaws.com/new-cardcash-images/images/merchants/'+imageName+'" width="69" height="43"  />';
}
function setAddToCart(val,row,index) {
  if(row.qty>0){
  var disableB ='disableBtn';
  } 
  var addToCartHtml = '<button type="button" class="btn btn-sm btn-success add-to-cart '+disableB+'" onclick="buyCar(\''+row.percent+'\',this,\''+row.merchant_id+'\',\''+row.value+'\',\'cardQty-'+index+'\',\'\',\'1\',\'\',\''+row.card_type+'\')">ADD TO CART</button>';
  return addToCartHtml = addToCartHtml;

}
function smallView(val,row,index) {
    var actualValue = parseFloat(row.value).toFixed(2)

    console.log("smallView", actualValue);
	
    if('merchants/AMC-Theaters.png') {
    var imageNameSmall =  'merchants/AMC-Theaters.png';
    imageNameSmall =  imageNameSmall.replace('merchants', '');
    imageNameSmall =  imageNameSmall.replace('/', '');
 } else {
     var imageNameSmall = 'empity_img.png';    
  }
  var cashValueSmall = parseFloat(row.value-(((row.value)/100)*row.percent)).toFixed(2);
  if(row.card_display_name) {
  var displayNameHtmlSmall='<div> <span class="cart-online-only3">'+row.card_display_name+'</span></div>';
  }
  if(row.qty>0) {
  var disableB ='disableBtn';
  } 
  var addToCartHtmlSmall = '<button type="button" style="padding:5px" class="btn btn-sm btn-success add-to-cart '+disableB+'" onclick="buyCar(\''+row.percent+'\',this,\''+row.merchant_id+'\',\''+row.value+'\',\'cardQty-'+index+'\',\'\',\'1\',\'\',\''+row.card_type+'\')">ADD TO CART</button>';

  var viewHtml = '<div class="row_small"><div class="col-xs-3"><img style="max-width:187px;width:100%; height:auto;margin-top: 8px;" class="card-image" src="https://s3.amazonaws.com/new-cardcash-images/images/merchants/'+imageNameSmall+'"></div>';
      viewHtml+='<div class="col-xs-5"><div class="price_small">$'+actualValue+' for <strong>$'+cashValueSmall+'</strong></div>';
      viewHtml+=displayNameHtmlSmall;
      viewHtml+='</div><div class="col-xs-4 text-center"><div class="m_b5"><strong>QTY:</strong><span class="cardQty-'+index+'">'+row.qty+'</span></div>';
      viewHtml+=addToCartHtmlSmall;
      viewHtml+='</div></div>';
  return viewHtml;
}
function checkQty(value,row,index) {
  return '<span class="cardQty-'+index+'">'+value+'</span>';
}
