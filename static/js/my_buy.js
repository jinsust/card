$( document ).ready(function(){ 

var txt2 = '{"merchant_info_page":[' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page2.jpg" }]}';


var txt3 = '{"merchant_info_page":[' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" },' +
'{"id":"page2","href":"../index.html", "src":"../img/page3.jpg" }]}';


var obj2 = eval ("(" + txt2 + ")");
var obj3 = eval ("(" + txt3 + ")");


$("#page2").click(function(){

	for(var i in obj2.merchant_info_page)
	{

		$(".card_img_:eq("+i+") > a ").attr({
			"href": obj2.merchant_info_page[i].href,
			"id":"test"
		});

		$(".card_img_:eq("+i+") > a > img").attr({
			"src": obj2.merchant_info_page[i].src,
			"id":"test"
		});

	}

});


$("#page3").click(function(){
	var i = 0;
	for(var item in obj3.merchant_info_page)
	{

		$(".card_img_:eq("+i+") > a ").attr({
			"href": obj3.merchant_info_page[i].href,
			"id":"test"
		});

		$(".card_img_:eq("+i+") > a > img").attr({
			"src": obj3.merchant_info_page[i].src,
			"id":"test"
		});

		i++;
	}

});

$("#page1").click(function(){
	window.location = "buy_card.html";

});


}); //END of document




