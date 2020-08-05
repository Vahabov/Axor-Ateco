"use strict";

(function () {

	var $body = jQuery('body');
	var $window = jQuery(window);

	function menuHideExtraElements() {


		jQuery('.sf-more-li, .sf-logo-li').remove();
		var windowWidth = jQuery('body').innerWidth();

		jQuery('.sf-menu').each(function () {
			var $thisMenu = jQuery(this);
			var $menuWraper = $thisMenu.closest('.mainmenu_wrapper');
			$menuWraper.attr('style', '');
			if (windowWidth > 991) {

				var $menuLis = $menuWraper.find('.sf-menu > li');
				$menuLis.removeClass('sf-md-hidden');

				var $headerLogoCenter = $thisMenu.closest('.header_logo_center');
				var logoWidth = 0;
				var summaryLiWidth = 0;

				if ($headerLogoCenter.length) {
					var $logo = $headerLogoCenter.find('.logo');

					logoWidth = $logo.outerWidth(true) + 70;
				}


				var wrapperWidth = $menuWraper.outerWidth(true);
				$menuLis.each(function (index) {
					var elementWidth = jQuery(this).outerWidth();
					summaryLiWidth += elementWidth;
					if (summaryLiWidth >= (wrapperWidth - logoWidth)) {
						var $newLi = jQuery('<li class="sf-more-li"><a>...</a><ul></ul></li>');
						jQuery($menuLis[index - 1]).before($newLi);
						var newLiWidth = jQuery($newLi).outerWidth(true);
						var $extraLiElements = $menuLis.filter(':gt(' + (index - 2) + ')');
						$extraLiElements.clone().appendTo($newLi.find('ul'));
						$extraLiElements.addClass('sf-md-hidden');
						return false;
					}
				});

				if ($headerLogoCenter.length) {
					var $menuLisVisible = $headerLogoCenter.find('.sf-menu > li:not(.sf-md-hidden)');
					var menuLength = $menuLisVisible.length;
					var summaryLiVisibleWidth = 0;
					$menuLisVisible.each(function () {
						summaryLiVisibleWidth += jQuery(this).outerWidth();
					});

					var centerLi = Math.floor(menuLength / 2);
					if ((menuLength % 2 === 0)) {
						centerLi--;
					}
					var $liLeftFromLogo = $menuLisVisible.eq(centerLi);
					$liLeftFromLogo.after('<li class="sf-logo-li"></li>');
					$headerLogoCenter.find('.sf-logo-li').width(logoWidth);
					var liLeftRightDotX = $liLeftFromLogo.offset().left + $liLeftFromLogo.outerWidth();
					var logoLeftDotX = windowWidth / 2 - logoWidth / 2;
					var menuLeftOffset = liLeftRightDotX - logoLeftDotX;
					$menuWraper.css({ 'left': -menuLeftOffset })
				}

			}
		});
	}

	function initMegaMenu() {
		var $megaMenu = jQuery('.mainmenu_wrapper .mega-menu');
		if ($megaMenu.length) {
			var windowWidth = jQuery('body').innerWidth();
			if (windowWidth > 991) {
				$megaMenu.each(function () {
					var $thisMegaMenu = jQuery(this);

					$thisMegaMenu.css({ 'display': 'block', 'left': 'auto' });
					var thisWidth = $thisMegaMenu.outerWidth();
					var thisOffset = $thisMegaMenu.offset().left;
					var thisLeft = (thisOffset + (thisWidth / 2)) - windowWidth / 2;
					$thisMegaMenu.css({ 'left': -thisLeft, 'display': 'none' });
					if (!$thisMegaMenu.closest('ul').hasClass('nav')) {
						$thisMegaMenu.css('left', '');
					}
				});
			}
		}
	}


	function affixSidebarInit() {
		var $affixAside = jQuery('.affix-aside');
		if ($affixAside.length) {


			$affixAside.on('affix.bs.affix', function (e) {
				var affixWidth = $affixAside.width() - 1;
				var affixLeft = $affixAside.offset().left;
				$affixAside
					.width(affixWidth)
					.css("left", affixLeft);
			}).on('affix-top.bs.affix affix-bottom.bs.affix', function (e) {
				$affixAside.css({ "width": "", "left": "" });
			});


			var offsetTop = $affixAside.offset().top - jQuery('.page_header').height();
			var offsetBottom = jQuery('.page_footer').outerHeight(true) + jQuery('.page_copyright').outerHeight(true);

			$affixAside.affix({
				offset: {
					top: offsetTop,
					bottom: offsetBottom
				},
			});

			jQuery(window).on('resize', function () {
				$affixAside.css({ "width": "", "left": "" });

				if ($affixAside.hasClass('affix')) {

					$affixAside.removeClass("affix").css("left", "").addClass("affix-top");
				}

				var offsetTop = jQuery('.page_topline').outerHeight(true)
					+ jQuery('.page_toplogo').outerHeight(true)
					+ jQuery('.page_header').outerHeight(true)
					+ jQuery('.page_breadcrumbs').outerHeight(true)
					+ jQuery('.blog_slider').outerHeight(true);
				var offsetBottom = jQuery('.page_footer').outerHeight(true)
					+ jQuery('.page_copyright').outerHeight(true);

				$affixAside.data('bs.affix').options.offset.top = offsetTop;
				$affixAside.data('bs.affix').options.offset.bottom = offsetBottom;

				$affixAside.affix('checkPosition');

			});

		}
	}


	function initAnimateElement(self, index) {
		var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
		var animationDelay = !self.data('delay') ? 150 : self.data('delay');
		setTimeout(function () {
			self.addClass("animated " + animationClass);
		}, index * animationDelay);
	}

	function initCounter(self) {
		if (self.hasClass('counted')) {
			return;
		} else {
			self.countTo().addClass('counted');
		}
	}

	function initProgressbar(el) {
		el.progressbar({
			transition_delay: 300
		});
	}



	function documentReadyInit() {
		if (jQuery().scrollbar) {
			jQuery('[class*="scrollbar-"]').scrollbar();
		}
		if (jQuery().superfish) {
			jQuery('ul.sf-menu').superfish({
				popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
				delay: 700,
				animation: { opacity: 'show', marginTop: 0 },
				animationOut: { opacity: 'hide', marginTop: 5 },
				speed: 200,
				speedOut: 200,
				disableHI: false,
				cssArrows: true,
				autoArrows: true

			});
			jQuery('ul.sf-menu-side').superfish({
				popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
				delay: 500,
				animation: { opacity: 'show', height: 100 + '%' },
				animationOut: { opacity: 'hide', height: 0 },
				speed: 400,
				speedOut: 300,
				disableHI: false,
				cssArrows: true,
				autoArrows: true
			});
		}

		jQuery('.toggle_menu').on('click', function () {
			jQuery(this)
				.toggleClass('mobile-active')
				.closest('.page_header')
				.toggleClass('mobile-active')
				.end()
				.closest('.page_toplogo')
				.next()
				.find('.page_header')
				.toggleClass('mobile-active');
		});

		jQuery('.mainmenu a').on('click', function () {
			var $this = jQuery(this);

			if (($this.hasClass('sf-with-ul')) || !($this.attr('href').charAt(0) === '#')) {
				return;
			}
			$this
				.closest('.page_header')
				.toggleClass('mobile-active')
				.find('.toggle_menu')
				.toggleClass('mobile-active');
		});


		var $sideHeader = jQuery('.page_header_side');

		jQuery('ul.menu-side-click').find('li').each(function () {
			var $thisLi = jQuery(this);

			if ($thisLi.find('ul').length) {
				$thisLi
					.append('<span class="activate_submenu"></span>')

					.find('.activate_submenu, > a')
					.on('click', function (e) {
						var $thisSpanOrA = jQuery(this);

						if (($thisSpanOrA.attr('href') === '#') || !($thisSpanOrA.parent().hasClass('active-submenu'))) {
							e.preventDefault();
						}
						if ($thisSpanOrA.parent().hasClass('active-submenu')) {
							$thisSpanOrA.parent().removeClass('active-submenu');
							return;
						}
						$thisLi.addClass('active-submenu').siblings().removeClass('active-submenu');
					});
			}
		});
		if ($sideHeader.length) {
			jQuery('.toggle_menu_side').on('click', function () {
				var $thisToggler = jQuery(this);
				if ($thisToggler.hasClass('header-slide')) {
					$sideHeader.toggleClass('active-slide-side-header');
				} else {
					if ($thisToggler.parent().hasClass('header_side_right')) {
						$body.toggleClass('active-side-header slide-right');
					} else {
						$body.toggleClass('active-side-header');
					}
				}
			});

			$body.on('click', function (e) {
				if (!(jQuery(e.target).closest('.page_header_side').length) && !($sideHeader.hasClass('page_header_side_sticked'))) {
					$sideHeader.removeClass('active-slide-side-header');
					$body.removeClass('active-side-header slide-right');
				}
			});
		}


		var MainWindowWidth = jQuery(window).width();
		var boxWrapperWidth = jQuery('#box_wrapper').width();
		jQuery(window).on('resize', function () {
			MainWindowWidth = jQuery(window).width();
			boxWrapperWidth = jQuery('#box_wrapper').width();
		});

		jQuery('.mainmenu_wrapper .sf-menu').on('mouseover', 'ul li', function () {

			if (MainWindowWidth > 991) {
				var $this = jQuery(this);

				var subMenuExist = $this.find('ul').length;
				if (subMenuExist > 0) {
					var subMenuWidth = $this.find('ul, div').first().width();
					var subMenuOffset = $this.find('ul, div').first().parent().offset().left + subMenuWidth;

					if ((subMenuOffset + subMenuWidth) > boxWrapperWidth) {
						var newSubMenuPosition = subMenuWidth + 0;
						$this.find('ul, div').first().css({
							left: -newSubMenuPosition,
						});
					} else {
						$this.find('ul, div').first().css({
							left: '100%',
						});
					}
				}
			}

		}).on('mouseover', '> li', function () {
			if (MainWindowWidth > 991) {
				var $this = jQuery(this);
				var subMenuExist = $this.find('ul').length;
				if (subMenuExist > 0) {
					var subMenuWidth = $this.find('ul').width();
					var subMenuOffset = $this.find('ul').parent().offset().left - (jQuery(window).width() / 2 - boxWrapperWidth / 2);

					if ((subMenuOffset + subMenuWidth) > boxWrapperWidth) {
						var newSubMenuPosition = boxWrapperWidth - (subMenuOffset + subMenuWidth);
						$this.find('ul').first().css({
							left: newSubMenuPosition,
						});
					}
				}
			}
		});




		var navHeight = jQuery('.page_header').outerHeight(true);
		if (jQuery('.mainmenu_wrapper').length) {
			$body.scrollspy({
				target: '.mainmenu_wrapper',
				offset: navHeight
			})
		}
		if (jQuery('.mainmenu_side_wrapper').length) {
			$body.scrollspy({
				target: '.mainmenu_side_wrapper',
				offset: navHeight
			});
		}
		if (jQuery().localScroll) {
			jQuery('.mainmenu_wrapper > ul, .mainmenu_side_wrapper > ul, #land, .scroll-icon').localScroll({
				duration: 900,
				easing: 'easeInOutQuart',
				offset: -navHeight + 10
			});
		}


		if (jQuery().UItoTop) {
			jQuery().UItoTop({ easingType: 'easeInOutQuart' });
		}


		if (jQuery().parallax) {
			jQuery('.parallax').parallax("50%", 0.01);
		}


		if (jQuery().prettyPhoto) {
			jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
				hook: 'data-gal',
				theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
			});
		}





		if (jQuery().carousel) {
			jQuery('.carousel').carousel();
		}

		jQuery('.nav-tabs').each(function () {
			jQuery(this).find('a').first().tab('show');
		});
		jQuery('.tab-content').each(function () {
			jQuery(this).find('.tab-pane').first().addClass('fade in');
		});

		jQuery('.panel-group').each(function () {
			jQuery(this).find('a').first().filter('.collapsed').trigger('click');
		});

		if (jQuery().tooltip) {
			jQuery('[data-toggle="tooltip"]').tooltip();
		}

		jQuery('.signup').on('submit', function (e) {
			e.preventDefault();
			var $form = jQuery(this);

			$form.find('.response').html('Adding email address...');

			jQuery.ajax({
				url: 'mailchimp/store-address.php',
				data: 'ajax=true&email=' + escape($form.find('.mailchimp_email').val()),
				success: function (msg) {
					$form.find('.response').html(msg);
				}
			});
		});

		if (jQuery().tweet) {
			jQuery('.twitter').tweet({
				modpath: "./twitter/",
				count: 2,
				avatar_size: 48,
				loading_text: 'loading twitter feed...',
				join_text: 'auto',
				username: 'michaeljackson',
				template: "{avatar}<div class=\"tweet_right\">{time}{join}<span class=\"tweet_text\">{tweet_text}</span></div>"
			});
		}

		jQuery('#mainteasers .col-lg-4').addWidthClass({
			breakpoints: [500, 600]
		});

		jQuery(".bg_teaser").each(function () {
			var $teaser = jQuery(this);
			var imagePath = $teaser.find("img").first().attr("src");
			$teaser.css("background-image", "url(" + imagePath + ")");
		});

		var $timetable = jQuery('#timetable');
		if ($timetable.length) {
			jQuery('#timetable_filter').on('click', 'a', function (e) {
				e.preventDefault();
				e.stopPropagation();
				var $thisA = jQuery(this);
				if ($thisA.hasClass('selected')) {
					return;
				}
				var selector = $thisA.attr('data-filter');
				$timetable
					.find('tbody td')
					.removeClass('current')
					.end()
					.find(selector)
					.closest('td')
					.addClass('current');
				$thisA.closest('ul').find('a').removeClass('selected');
				$thisA.addClass('selected');
			});
		}
		jQuery('#toggle_shop_view').on('click', function (e) {
			e.preventDefault();
			jQuery(this).toggleClass('grid-view');
			jQuery('#products').toggleClass('grid-view list-view');
		});

		if (jQuery().elevateZoom) {
			jQuery('#product-image').elevateZoom({
				gallery: 'product-image-gallery',
				cursor: 'pointer',
				galleryActiveClass: 'active',
				responsive: true,
				loadingIcon: 'img/AjaxLoader.gif'
			});
		}

		jQuery('.review-link').on('click', function (e) {
			var $thisLink = jQuery(this);
			var reviewTabLink = jQuery('a[href="#reviews_tab"]');
			if (!reviewTabLink.parent().hasClass('active')) {
				reviewTabLink
					.tab('show')
					.on('shown.bs.tab', function (e) {
						$window.scrollTo($thisLink.attr('href'), 400);
					})
			}
			$window.scrollTo($thisLink.attr('href'), 400);
		});

		jQuery('.plus, .minus').on('click', function (e) {
			var numberField = jQuery(this).parent().find('[type="number"]');
			var currentVal = numberField.val();
			var sign = jQuery(this).val();
			if (sign === '-') {
				if (currentVal > 1) {
					numberField.val(parseFloat(currentVal) - 1);
				}
			} else {
				numberField.val(parseFloat(currentVal) + 1);
			}
		});

		jQuery('a.remove').on('click', function (e) {
			e.preventDefault();
			jQuery(this).closest('tr, .media').remove();
		});

	}
	function windowLoadInit() {
		if (jQuery().flexslider) {
			var $introSlider = jQuery(".intro_section .flexslider");
			$introSlider.each(function (index) {
				var $currentSlider = jQuery(this);
				var nav = ($currentSlider.data('nav') != 'undefined') ? $currentSlider.data('nav') : true;
				var dots = ($currentSlider.data('dots') != 'undefined') ? $currentSlider.data('dots') : true;

				$currentSlider.flexslider({
					animation: "fade",
					pauseOnHover: true,
					useCSS: true,
					controlNav: dots,
					directionNav: nav,
					prevText: "",
					nextText: "",
					smoothHeight: false,
					slideshowSpeed: 10000,
					animationSpeed: 600,
					start: function (slider) {
						slider.find('.slide_description').children().css({ 'visibility': 'hidden' });
						slider.find('.flex-active-slide .slide_description').children().each(function (index) {
							var self = jQuery(this);
							var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
							setTimeout(function () {
								self.addClass("animated " + animationClass);
							}, index * 200);
						});
					},
					after: function (slider) {
						slider.find('.flex-active-slide .slide_description').children().each(function (index) {
							var self = jQuery(this);
							var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
							setTimeout(function () {
								self.addClass("animated " + animationClass);
							}, index * 200);
						});
					},
					end: function (slider) {
						slider.find('.slide_description').children().each(function () {
							var self = jQuery(this);
							var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
							self.removeClass('animated ' + animationClass).css({ 'visibility': 'hidden' });
						});
					},

				})
			});

			jQuery(".flexslider").each(function (index) {
				var $currentSlider = jQuery(this);
				if ($currentSlider.find('.flex-active-slide').length) {
					return;
				}
				$currentSlider.flexslider({
					animation: "fade",
					useCSS: true,
					controlNav: true,
					directionNav: false,
					prevText: "",
					nextText: "",
					smoothHeight: false,
					slideshowSpeed: 5000,
					animationSpeed: 800,
				})
			});
		}

		var $header = jQuery('.page_header').first();
		if ($header.length) {
			menuHideExtraElements();
			initMegaMenu();
			var headerHeight = $header.outerHeight();
			$header.wrap('<div class="page_header_wrapper"></div>');
			var $headerWrapper = $header.parent();
			$headerWrapper.css({ height: headerHeight });

			if ($header.hasClass('header_white')) {
				$headerWrapper.addClass('header_white');
			} else if ($header.hasClass('header_darkgrey')) {
				$headerWrapper.addClass('header_darkgrey');
				if ($header.hasClass('bs')) {
					$headerWrapper.addClass('bs');
				}

			} else if ($header.hasClass('header_gradient')) {
				$headerWrapper.addClass('header_gradient');
			}

			var headerOffset = 0;
			headerOffset = $header.offset().top;

			jQuery($header).on('affixed-top.bs.affix affixed.bs.affix affixed-bottom.bs.affix', function (e) {
				if ($header.hasClass('affix-top')) {
					$headerWrapper.removeClass('affix-wrapper affix-bottom-wrapper').addClass('affix-top-wrapper');
				} else if ($header.hasClass('affix')) {
					$headerWrapper.removeClass('affix-top-wrapper affix-bottom-wrapper').addClass('affix-wrapper');
				} else if ($header.hasClass('affix-bottom')) {
					$headerWrapper.removeClass('affix-wrapper affix-top-wrapper').addClass('affix-bottom-wrapper');
				} else {
					$headerWrapper.removeClass('affix-wrapper affix-top-wrapper affix-bottom-wrapper');
				}
				menuHideExtraElements();
				initMegaMenu();
			});

			jQuery($header).affix({
				offset: {
					top: headerOffset,
					bottom: 0
				}
			});
		}
		if (jQuery().owlCarousel) {
			jQuery('.owl-carousel').each(function () {
				var $carousel = jQuery(this);
				var loop = $carousel.data('loop') ? $carousel.data('loop') : false;
				var margin = ($carousel.data('margin') || $carousel.data('margin') === 0) ? $carousel.data('margin') : 30;
				var nav = $carousel.data('nav') ? $carousel.data('nav') : false;
				var dots = $carousel.data('dots') ? $carousel.data('dots') : false;
				var themeClass = $carousel.data('themeclass') ? $carousel.data('themeclass') : 'owl-theme';
				var center = $carousel.data('center') ? $carousel.data('center') : false;
				var items = $carousel.data('items') ? $carousel.data('items') : 4;
				var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay') : false;
				var responsiveXs = $carousel.data('responsive-xs') ? $carousel.data('responsive-xs') : 1;
				var responsiveSm = $carousel.data('responsive-sm') ? $carousel.data('responsive-sm') : 2;
				var responsiveMd = $carousel.data('responsive-md') ? $carousel.data('responsive-md') : 3;
				var responsiveLg = $carousel.data('responsive-lg') ? $carousel.data('responsive-lg') : 4;
				var filters = $carousel.data('filters') ? $carousel.data('filters') : false;

				if (filters) {
					$carousel.clone().appendTo($carousel.parent()).addClass(filters.substring(1) + '-carousel-original');
					jQuery(filters).on('click', 'a', function (e) {
						e.preventDefault();
						var $thisA = jQuery(this);
						if ($thisA.hasClass('selected')) {
							return;
						}
						var filterValue = $thisA.attr('data-filter');
						$thisA.siblings().removeClass('selected active');
						$thisA.addClass('selected active');
						$carousel.find('.owl-item').length;
						for (var i = $carousel.find('.owl-item').length - 1; i >= 0; i--) {
							$carousel.trigger('remove.owl.carousel', [1]);
						};
						var $filteredItems = jQuery($carousel.next().find(' > ' + filterValue).clone());
						$filteredItems.each(function () {
							$carousel.trigger('add.owl.carousel', jQuery(this));

						});

						$carousel.trigger('refresh.owl.carousel');
					});

				}

				$carousel.owlCarousel({
					loop: loop,
					margin: margin,
					nav: nav,
					autoplay: autoplay,
					dots: dots,
					themeClass: themeClass,
					center: center,
					items: items,
					responsive: {
						0: {
							items: responsiveXs
						},
						767: {
							items: responsiveSm
						},
						992: {
							items: responsiveMd
						},
						1200: {
							items: responsiveLg
						}
					},
				})
					.addClass(themeClass);
				if (center) {
					$carousel.addClass('owl-center');
				}

				$window.on('resize', function () {
					$carousel.trigger('refresh.owl.carousel');
				});
			});

		}
		affixSidebarInit();

		$body.scrollspy('refresh');

		if (jQuery().appear) {
			jQuery('.to_animate').appear();
			jQuery('.to_animate').filter(':appeared').each(function (index) {
				initAnimateElement(jQuery(this), index);
			});
			$body.on('appear', '.to_animate', function (e, $affected) {
				jQuery($affected).each(function (index) {
					initAnimateElement(jQuery(this), index);
				});
			});
			if (jQuery().progressbar) {
				jQuery('.progress .progress-bar').appear();
				jQuery('.progress .progress-bar').filter(':appeared').each(function () {
					initProgressbar(jQuery(this));
				});
				$body.on('appear', '.progress .progress-bar', function (e, $affected) {
					jQuery($affected).each(function () {
						initProgressbar(jQuery(this));
					});
				});
				jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
					initProgressbar(jQuery(jQuery(e.target).attr('href')).find('.progress .progress-bar'));
				});
				jQuery('.dropdown').on('shown.bs.dropdown', function (e) {
					initProgressbar(jQuery(this).find('.progress .progress-bar'));
				});
			}
			if (jQuery().easyPieChart) {
				jQuery('.chart').appear();
				jQuery('.chart').filter(':appeared').each(function () {
					initChart(jQuery(this));
				});
				$body.on('appear', '.chart', function (e, $affected) {
					jQuery($affected).each(function () {
						initChart(jQuery(this));
					});
				});
			}
		}

		jQuery('.embed-placeholder').each(function () {
			jQuery(this).on('click', function (e) {
				e.preventDefault();
				var $thisLink = jQuery(this);
				if ($thisLink.attr('href') === '' || $thisLink.attr('href') === '#') {
					$thisLink.replaceWith($thisLink.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"')).trigger('click');
				} else {
					$thisLink.replaceWith('<iframe class="embed-responsive-item" src="' + $thisLink.attr('href') + '?rel=0&autoplay=1' + '"></iframe>');
				}
			});
		});
		jQuery('.isotope_container').each(function (index) {
			var $container = jQuery(this);
			var layoutMode = ($container.hasClass('masonry-layout')) ? 'masonry' : 'fitRows';
			var columnWidth = ($container.find('.col-lg-20').length) ? '.col-lg-20' : '';
			$container.isotope({
				percentPosition: true,
				layoutMode: layoutMode,
				masonry: {
					columnWidth: columnWidth
				}
			});

			var $filters = jQuery(this).attr('data-filters') ? jQuery(jQuery(this).attr('data-filters')) : $container.prev().find('.filters');
			if ($filters.length) {
				$filters.on('click', 'a', function (e) {
					e.preventDefault();
					var $thisA = jQuery(this);
					var filterValue = $thisA.attr('data-filter');
					$container.isotope({ filter: filterValue });
					$thisA.siblings().removeClass('selected active');
					$thisA.addClass('selected active');
				});
				$filters.on('change', 'select', function (e) {
					e.preventDefault();
					var filterValue = jQuery(this).val();
					$container.isotope({ filter: filterValue });
				});
			}
		});
		var $messagesModal = jQuery('#messages_modal');
		if ($messagesModal.find('ul').length) {
			$messagesModal.modal('show');
		}
		jQuery(".preloaderimg").fadeOut(150);
		jQuery(".preloader").fadeOut(350).delay(200, function () {
			jQuery(this).remove();
		});
	}

	jQuery(document).ready(function () {
		documentReadyInit();
	});
	$window.on('load', function () {
		windowLoadInit();
	});
	$window.on('resize', function () {
		$body.scrollspy('refresh');
		menuHideExtraElements();
		initMegaMenu();
		var $header = jQuery('.page_header').first();
		if ($header.length && !jQuery(document).scrollTop() && $header.first().data('bs.affix')) {
			$header.first().data('bs.affix').options.offset.top = $header.offset().top;
		}
		jQuery(".page_header_wrapper").css({ height: $header.first().outerHeight() });

	});
	//Product
	$('.product-image--list .item').click(function () {
		var url = $(this).children('img').attr('src');
		$('.item-selected').removeClass('item-selected');
		$(this).addClass('item-selected');
		$('#featured').attr('src', url);
	});

	$('#buy-toaster').click(function () {
		alert("BUY ME PLS!");
	});
	jQuery("#carousel_product").owlCarousel({
		autoplay: true,
		lazyLoad: true,
		loop: true,
		margin: 20,
		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 5000,
		smartSpeed: 200,
		nav: false,
		responsive: {
			0: {
				items: 1
			},

			600: {
				items: 3
			},

			1024: {
				items: 3
			},

			1366: {
				items: 3
			}
		}
	});
})();