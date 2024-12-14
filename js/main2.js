$(document).ready(function () {
	AOS.init({
		duration: 800,
		easing: 'slide',
		once: false
	});

	// Clone navigation for mobile menu
	var siteMenuClone = function () {
		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});

		setTimeout(function () {
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);
				$this.prepend('<span class="arrow-collapse collapsed">');
				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});
				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});
				counter++;
			});
		}, 1000);
	};

	// Sticky header
	$(".js-sticky-header").sticky({ topSpacing: 0 });

	// One page navigation
	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			'scrollTop': $(hash).offset().top - 50
		}, 600, 'easeInOutExpo');
	});

	// Stellar
	$(window).stellar({
		horizontalScrolling: false,
		responsive: true,
	});

	// Mobile Menu Toggle
	$('.js-menu-toggle').on('click', function (e) {
		e.preventDefault();
		$('.site-mobile-menu').toggleClass('active'); // Show/hide the mobile menu
		$('body').toggleClass('offcanvas-menu'); // Handle body overflow
	});

	// Close mobile menu when clicking outside
	$(document).on('click', function (e) {
		if (!$(e.target).closest('.site-mobile-menu').length && !$(e.target).closest('.js-menu-toggle').length) {
			if ($('.site-mobile-menu').hasClass('active')) {
				$('.site-mobile-menu').removeClass('active'); // Hide mobile menu
				$('body').removeClass('offcanvas-menu'); // Reset body overflow
			}
		}
	});
});