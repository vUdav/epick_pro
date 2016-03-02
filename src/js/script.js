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

	// offers carousel
	$('#offers').owlCarousel({
		items: 1,
		nav: false
	});

	// form
	// location type
	$('.booking-form__location-trigger').on('change',function(){
		$('.booking-form__location-type-wrapper').removeClass('booking-form__location-type-wrapper--active');
		if ($('#booking-form__location-hotel').prop("checked")) {
			$('#form-hotel').addClass('booking-form__location-type-wrapper--active');
		}
		if ($('#booking-form__location-cottage').prop("checked")) {
			$('#form-cottage').addClass('booking-form__location-type-wrapper--active');
		}
	});

	// location features
	$('.booking-form__location-type-trigger').on('change',function(){
		$('.booking-form__location-features').removeClass('booking-form__location-features--active');
		// hotel
		if ($('#location-type-hotel-flagman').prop("checked")) {
			$('#location-type-hotel-features-flagman').addClass('booking-form__location-features--active');
		}
		if ($('#location-type-hotel-ozerniy').prop("checked")) {
			$('#location-type-hotel-features-ozerniy').addClass('booking-form__location-features--active');
		}
		if ($('#location-type-hotel-olhovka').prop("checked")) {
			$('#location-type-hotel-features-olhovka').addClass('booking-form__location-features--active');
		}
		if ($('#location-type-hotel-portoviy').prop("checked")) {
			$('#location-type-hotel-features-portoviy').addClass('booking-form__location-features--active');
		}
		// cottage
		if ($('#location-type-cottage-flagman').prop("checked")) {
			$('#location-type-cottage-features-flagman').addClass('booking-form__location-features--active');
		}
		if ($('#location-type-cottage-ozerniy').prop("checked")) {
			$('#location-type-cottage-features-ozerniy').addClass('booking-form__location-features--active');
		}
		if ($('#location-type-cottage-olhovka').prop("checked")) {
			$('#location-type-cottage-features-olhovka').addClass('booking-form__location-features--active');
		}
		if ($('#location-type-cottage-portoviy').prop("checked")) {
			$('#location-type-cottage-features-portoviy').addClass('booking-form__location-features--active');
		}
	});

	// form valid
	// $.validate({
	// 	form: '#booking-form',
	// 	scrollToTopOnError : false,
	// 	errorMessagePosition : $('#booking-form__payment-result-message')
	// });
	// $('#payment-method-now').on('change',function(){
	// 	if ($(this).prop("checked")) {
	// 		$('#payment-method-now-card-number').attr('data-validation','number');
	// 		$('#payment-method-now-card-cvv').attr('data-validation','number');
	// 		$('#payment-method-now-card-name').attr('data-validation','required');
	// 		$('#payment-method-now-card-date').attr('data-validation','required');
	// 	} else {
	// 		$('#payment-method-now-card-number').removeAttr('data-validation');
	// 		$('#payment-method-now-card-cvv').removeAttr('data-validation');
	// 		$('#payment-method-now-card-name').removeAttr('data-validation');
	// 		$('#payment-method-now-card-date').removeAttr('data-validation');
	// 	}
	// });

	// single room gallery
	$('#single-room__gallery').owlCarousel({
		items: 1,
		nav: true,
		dots: false
	});
	$(".fancybox").fancybox();

	// homepage gallery
	var homepageGallery = $('#homepage-gallery');
	homepageGallery.owlCarousel({
		nav: false,
		dots: false,
		loop: true,
		center: true,
		stagePadding: 70,
		responsive: {
			0: {
				items: 1,
				center: false,
				stagePadding: 0
			},
			1200: {
				items: 5
			}
		}
	});
	homepageGallery.on('click','img',function() {
		var carousel = homepageGallery.data('owl.carousel');
		carousel.to(carousel.relative($(this).parent().index()), false, true);
	});
	homepageGallery.on('changed.owl.carousel',function(){
		setTimeout(function(){
			var img = homepageGallery.find('.owl-item.center img').attr('src');
			var title = homepageGallery.find('.owl-item.center img').data('title');
			var text = homepageGallery.find('.owl-item.center img').data('text');
			var link = homepageGallery.find('.owl-item.center img').data('link');
			$('#homepage-gallery-full').attr('src',img);
			$('#homepage-gallery-description .gallery__description-title').text(title);
			$('#homepage-gallery-description .gallery__description-text').text(text);
			$('#homepage-gallery-description .gallery__description-link').attr('href',link);
		},100);
	});
});
