$(document).ready(function() {
	// menu
	$('#menu-trigger').on('click',function(){
		$('.main-nav__list').toggleClass('main-nav__list--active');
	});

	// relax block
	$('.relax__tab a').on('click',function(e){
		e.preventDefault();
		var ident = $(this).attr('href');

		$('.relax__tab').removeClass('relax__tab--active');
		$(this).closest('.relax__tab').addClass('relax__tab--active');

		$('.relax__slide').removeClass('relax__slide--active');
		$(this).closest('.relax__slider').find(ident).addClass('relax__slide--active');
	});

	// reviews carousel
	$('#reviews').owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		nav: false,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			}
		}
	});
});