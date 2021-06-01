$(document).ready(function () {
	'use strict';

	$('.loading').css('display', 'none');
	$('header, .social-icon').css('visibility', 'visible')
	
	//To Make Home Width = Window Width
	$('#home video, .navication, .loading').height($(window).height());
	$('#home video, .navication, .loading').width($(window).width());
	$(window).on('resize', function () {
		$('#home video, .navication, .loading').height($(window).height());
		$('#home video, .navication, .loading').width($(window).width());
	});
	
	//nav bar Background
	//nav on scroll
	$(document).scroll(function () {
		$('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height());
	});

	//nav toggle menue
	const navigation = $('.navication');

	$('.toggle').on('click', function () {
		$(this).toggleClass('active');
		navigation.toggleClass('active');
		$('.signin').slideToggle();
	});
	
	//sign in
	$('.signin').on('click', function () {
		navigation.toggleClass('sign-in');
		$('.toggle').slideToggle();
	});






	//Add Class Active On Nav link and Remove It Fro Sibling
	// $('nav li a').click(function (e) {
	// 	//لانو احنا حاطين لينك وكل ما نكبس اح يرجع يحمل الصفحة من اول وجديد عشان هيك بمنع هاد الاشي الا لللنكات الي راح تودي على صفحات تانية
	// 	//e.preventDefault();
	// 	//$(this).addClass('active').parent().siblings().find('a').removeClass('active');
	// 	//if li is not a parent
	// 	//$('nav a').css('color', '#f2de82').removeClass('active');
	// 	$(this).addClass('active');
		
	// 	//Smothly Scroll To Element
	// 	$('html, body').animate({
	// 		scrollTop: ($('#' + $(this).data('scroll')).offset().top + 1)
	// 	}, 1000);
	// });
	
	$(window).scroll(function () {
		//sync navbar link with section
		//to be in all block
		$('.block').each(function () {
			if ($(window).scrollTop() > $(this).offset().top) {
				var blockId = $(this).attr('id');
				$('nav a').removeClass('active');
				$('nav li a[data-scroll="' + blockId + '"]').addClass('active');
			}
		});
	});
	
	//Oure scent
	// $('.oure-scents .scents img').on('click', function() {
	// 	// $('.card').removeClass('active').children('h5, p').hide(500);
	// 	$(this).parent().toggleClass('active');
	// 	$(this).next('h5, p').slideToggle(500).next('p').slideToggle(500);
	// });

	//Products
	$('.nav-pro ul li').on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
		
		if($(this).data('class') == 'all') {
			$('.col-sm').fadeIn(2000);
		} else {
			$('.col-sm').fadeOut(2000);
			$($(this).data('class')).parent().fadeIn(4000);
			
		}
	});

	/*********************************************************************/
	/* for Cost */
	//cart-info
	$('#cart-info').click(function () {
		$('#cart').toggleClass('show-cart');
		$('#cart').css('top', $('nav').innerHeight());
	});

	$('#cart').on('click', '.cart-item-remove', function () {
		$(this).parent().remove();

		showTotal();
	});

//End
});


/*********************************************************************/
/* Add items to Cart */
const cartBtn = document.querySelectorAll('.stor-item-icon');
	
cartBtn.forEach(function(btn) {
	btn.addEventListener('click', function (event) {
		//console.log(event.target => i);
		if(event.target.parentElement.classList.contains('stor-item-icon')){
			//to get the source of img
			let fullPath = event.target.parentElement.parentElement.previousElementSibling.children.item('src').src;
			//to get pure src without http...
			let pos = fullPath.indexOf('img');
			let partPath = fullPath.slice(pos);
			console.log(partPath);
			
			//to get item
			const item = {};
			item.img = partPath;
			
			//to get item pricce
			let price = event.target.parentElement.previousElementSibling.children[0].textContent;
			
			//to get item name
			let name = event.target.parentElement.previousElementSibling.previousElementSibling.children[0].textContent;
			
			//Add it to item opject
			item.name = name;
			item.price = price;
			
			const creatItem = document.createElement('div');
			creatItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
			creatItem.innerHTML =
			
			'<img src="' + item.img + '" class="img-fluid rounded-circle" id="item-img" alt=""> <div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">' + item.name + '</p><span id="cart-item-price" class="cart-item-price" class="mb-0">' + item.price + '</span></div><a href="#" id="cart-item-remove" class="cart-item-remove"><i class="fas fa-trash"></i></a></div>';
			
			const cart = document.getElementById('cart');
			const total = document.querySelector('.cart-total-container');
			
			cart.insertBefore(creatItem, total);
			alert('item Add to the Cart?');
			
			showTotal();
		}
	});
});

//show Total
function showTotal(){
	let total = [];
	const items = document.querySelectorAll('.cart-item-price');
	
	items.forEach(function (item) {
		total.push(parseFloat(item.textContent));
	});
	
	//to sum all price
	const totalMoney = total.reduce(function(total, item) {
		total += item;
		return total;
	},0);

	//to specife the diget after , => 15.22
	const finalMoney = totalMoney.toFixed(2);
	
	document.getElementById('cart-total').textContent = finalMoney;
	document.getElementById('item-count').textContent = total.length;
}