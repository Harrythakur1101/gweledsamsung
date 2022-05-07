

//Initialize function
var init = function () {
	var focuscolor = '#0cb9f2';
	var row;
	var secton_length;
	var myfav_response;

	$(document).ready(function () {

		var content_types_id = '';

		var myfavxhttp = new XMLHttpRequest();
		myfavxhttp.onreadystatechange = function () {
			$('#spinner').show();
			if (this.readyState == 4 && this.status == 200) {


				myfav_response = JSON.parse(this.responseText);
				console.log(myfav_response);
				//console.log(myfav_response.movieList.length);
				var i = 0;
				var j = 1;
				var k = 0;
				var viewmore_banner = '';
				var sectionindex = ""





				secton_length = myfav_response.content.length;


				if (secton_length == 0) {



					$("#namee").text("Categories");
					$('#nocontent').show();
					$('#spinner').hide();
					//$('.toast').text("No Content to Display").fadeIn(400).delay(800000).fadeOut(800000);
				} else {


					for (i = 0; i < secton_length; i++) {


						var rowindex = j++;


						if (i % 4 == 0) {

							k++;

						}


						if (myfav_response.content[i]['category_thumb'] != "" || myfav_response.content[i]['category_thumb'] != null) {

							viewmore_banner += '<div focusable class="col-3 card border-inside" row-index="' + rowindex + '" data-contenttypes="' + myfav_response.content[i]['category_id'] + '" data-perma="' + myfav_response.content[i]['category_id'] + '" id="content_imag_div">' +
								'<a href="#" id="' + rowindex + '" row-index="row' + k + '" class="row' + k + '" data-perma="' + myfav_response.content[i]['category_id'] + '" data-categoryname="' + myfav_response.content[i]['genre_name'] + '" data-category_type="' + myfav_response.content[i]['type'] + '" data-genere-name="' + myfav_response.content[i]['genre_name'] + '">' +
								'<div class="">' +
								'<img id="img_' + myfav_response.content[i]['category_id'] + '" src=' + myfav_response.content[i]['category_thumb'] + ' class="img-fluid listing_img" />' +
								'</div>' +
								'</a>' +
								'</div>';

						} else {

							viewmore_banner += '<div focusable class="col-3 card border-inside" row-index="' + rowindex + '" data-contenttypes="' + myfav_response.content[i]['category_id'] + '" data-perma="' + myfav_response.content[i]['category_id'] + '" id="content_imag_div">' +
								'<a href="#" id="' + rowindex + '" row-index="' + rowindex + '" class="row' + k + '" data-perma="' + myfav_response.content[i]['category_id'] + '" data-categoryname="' + myfav_response.content[i]['genre_name'] + '" data-category_type="' + myfav_response.content[i]['type'] + '" data-genere-name="' + myfav_response.content[i]['genre_name'] + '">' +
								'<div class="">' +
								'<img id="img_' + myfav_response.content[i]['category_id'] + '" src="images/lang-bg.jpg" class="img-fluid listing_img" />' +
								'<div class="see-more">' + myfav_response.content[i]['genre_name'] + '</div>' +
								'</div>' +
								'</a>' +
								'</div>';

						}




					}

					$("#namee").text("Categories");
					$('#content_banner').html(viewmore_banner);
					$('#content_banner').show();
					$('#content_banner').children('div').eq(0).children('a').addClass('active');

					var timer = setTimeout(function () {

						$('#spinner').hide();
					}, 1000);



				}





			}


		};

		myfavxhttp.open("GET", "http://glewedtv.com/index.php?api/category_list", true);
		myfavxhttp.send();



		function callseriesApi(category_id, categoryname) {

			var myPlanshr = new XMLHttpRequest();
			myPlanshr.onreadystatechange = function () {
				$('#spinner').show();

				if (this.readyState == 4 && this.status == 200) {

					myPlansresponse = JSON.parse(this.responseText);
					category_list = myPlansresponse.contents;
					//alert(category_list.length);

					//alert(category_id);
					//alert("mobiletv"+category_list.length);
					//callCategortList();

					$('#spinner').hide();

					for (i = 0; i < category_list.length; i++) {

						if (category_list[i].genre_id == category_id) {


							//alert(category_list[i].series_content.length);

							if (category_list[i].series_content.length > 1) {

								var create_href = "seriesListing.html?categoryid=" + category_id + "&categoryname=" + categoryname + "";
								$(location).attr('href', create_href);

							} else {

								var series_id = category_list[i].series_content[0].series_id;

								var player_href = "kidscontentlist.html?series_id=" + series_id;
								$(location).attr('href', player_href);

							}



						}


					}




				}
			}
			myPlanshr.open("GET", "https://glewedtv.com/index.php?api/get_series/1", true);
			myPlanshr.send();
		}


		$(document).on({
			mouseenter: function () {
				console.log("hiii");
				var $current = $('.active');
				$current.removeClass('active');
				$(this).addClass('active');
			},
			mouseleave: function () {
				console.log('mouseleave');
			}
		}, "div.border-inside a");



		$(document).on("click", ".card a", function () {
			var currentId = $(this).attr("id");
			var permalink = $(this).attr("data-perma");
			var generename = $(this).attr("data-genere-name");
			var categoryname = $(this).attr("data-categoryname");
			var categorytype = $(this).attr("data-category_type");

			if (categorytype == "Series") {
				callseriesApi(permalink, categoryname);
			} else if (categorytype == "Series" || generename == "Kids") {
				callseriesApi(permalink, categoryname);
			} else {
				var create_href = "categorycontentlist.html?categoryid=" + permalink + "&categoryname=" + categoryname + "";
				$(location).attr('href', create_href);
			}

		});


		document.onkeydown = checkKey;
		function checkKey(e) {
			e = e || window.event;
			// Changed in future
			var totColmn = 4;

			if (e.keyCode == '38') {
				// up arrow	
				var $current = $('.active');
				var currentId = $current.get()[0].id;
				var position = parseInt(currentId) - 4;
				if ($("#" + position).length > 0) {
					$current.removeClass('active');
					var currentClass = $("#" + currentId).attr('row-index');
					var subStr = parseInt(currentClass.substring(3)) - 1;
					$(".row" + subStr).parent().removeClass('d-none');
					$("#" + position).addClass('active');
				}

			} else if (e.keyCode == '40') {
				// down arrow
				var $current = $('.active');
				var currentId = $current.get()[0].id;
				var position = parseInt(currentId) + 4;
				if ($("#" + position).length > 0) {
					if (position >= 12) {
						var currentClass = $("#" + currentId).attr('row-index');
						var parentClass = parseInt(currentClass.substring(3)) - 2;
						$(".row" + parentClass).parent().addClass('d-none');
					}
					$current.removeClass('active');
					$("#" + position).addClass('active');
				}

			} else if (e.keyCode == '37') {
				// left key arrow
				var $current = $('.active');
				var currentId = $current.get()[0].id;
				var position = parseInt(currentId);
				if ($current.parent().prev().length > 0) {
					if ((position % totColmn == 1) && position != 0) {
						var currentClass = $("#" + currentId).attr('row-index');
						var subStr = parseInt(currentClass.substring(3)) - 1;
						$(".row" + subStr).parent().removeClass('d-none');
					}
					$current.removeClass('active');
					$current.parent().prev().children('a').addClass('active');
				}

			}
			else if(e.keyCode=="461"){
				window.history.back()
			}
			else if(e.keyCode=="8"){
				window.history.back()
			}
			 else if (e.keyCode == '13') {
				// left key arrow
				var $current = $('.active');
				var currentId = $current.get()[0].id;
				var permalink = $("#" + currentId).attr("data-perma");
				var generename = $("#" + currentId).attr("data-genere-name");
				var categoryname = $("#" + currentId).attr("data-categoryname");
				var categorytype = $("#" + currentId).attr("data-category_type");

				//alert(categorytype);
				//alert(generename);

				if (categorytype == "Series") {
					callseriesApi(permalink, categoryname);
				} else if (categorytype == "Series" || generename == "Kids") {
					callseriesApi(permalink, categoryname);
				} else {
					var create_href = "categorycontentlist.html?categoryid=" + permalink + "&categoryname=" + categoryname + "";
					$(location).attr('href', create_href);
				}


				//var create_href = "categorycontentlist.html?categoryid="+category_id+"&categoryname="+categoryname+""; 	 	 	 	
				// $(location).attr('href',create_href); 

				//var create_href = "seriesListing.html?categoryid="+category_id+"&categoryname="+categoryname+""; 	 	 	 	
				//$(location).attr('href',create_href); 

				//callseriesApi(category_id);



			} 
			// else if (e.keyCode == '10009') {
			// 	// left key arrow
			// 	window.history.back();


			// } 
			// else if (e.keyCode == '461') {
			// 	// left key arrow
			// 	window.history.back();


			// }


			else if (e.keyCode == '39') {
				// right arrow
				var $current = $('.active');
				var currentId = $current.get()[0].id;
				var position = parseInt(currentId);
				if ($current.parent().next().length > 0) {
					if ((position % totColmn) == 0 && position >= 12) {
						var currentClass = $("#" + position).attr('row-index');
						var subStr = parseInt(currentClass.substring(3)) - 2;
						$(".row" + subStr).parent().addClass('d-none');
					}
					$current.removeClass('active');
					$current.parent().next().children('a').addClass('active');
				}
			}// End right arrow

		}//End checkKey


	});

}
// window.onload can work without <body onload="">
window.onload = init;




