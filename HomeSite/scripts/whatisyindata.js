$(function() {

	var animated = !$('.whatisdomo-container').hasClass('no-animation');

	if(animated) {
		whatisdomo.init();
	}

	$(document).on('scroll load resize ready', function() {
		whatisdomo.scrollUpdate();
		whatisdomo.heroFullscreen();
		whatisdomo.headerAdjust();
	});

});

var whatisdomo = (function() {
	var _window = $(window),
		scrollTop = _window.scrollTop(),
		actionPoints = getActionPoints(),
		windowHeight = _window.height(),
		windowWidth = _window.width(),
		isRotating = false,
		connectRotated = false,
		video;

	var ipadY = 200,
		ipad = $('.ipad'),
		iphone = $('.iphone'),
		desktop = $('.desktop');

	var see_info = $('.see-info').find('.imagery');

	var connect = $('.connect');

	var same_page = $('.same-page').find('.imagery');

	var currentTestimony = 0,
		spotlights = $('.spotlight-content');

	var testimony = 0,
		tRunning = false;

	function init() {
		var goahead = true;

		heroFullscreen();
		headerAdjust();
		createPaginationDots();
		videoCheck();

		$(window).on('resize load', function() {
			scrollTop = _window.scrollTop();
			windowHeight = _window.height();
			windowWidth = _window.width();
			actionPoints = getActionPoints();
			heroFullscreen();
			scrollUpdate();
		});

		$(document).on('scroll', function() {
			scrollTop = _window.scrollTop();
			if (goahead) {
				headerAdjust();
				goahead = false;
				setTimeout(function() {
					goahead = true;
				}, 500);
			}
		});
	}

	function videoCheck() {
		if(windowWidth > 840) {
			//$('.whatisdomo-container').find('.hero').prepend('<video preload="auto" autoplay loop id="bgvid"><source src="/assets/images/domoPeopleLoop_960x540.webm" type="video/webm"><source src="/assets/images/domoPeopleLoop_960x540.mp4" type="video/mp4"></video>');
			//video = document.getElementById('bgvid');
		}
	}

	function heroFullscreen() {
		$('.whatisdomo-container').find('.hero').height($(window).height() * 0.8);
	}

	function createPaginationDots() {
		spotlights.each(function(index){
			if(index === 0) {
				$('<div>').addClass('dot current').appendTo('.pagination-dots');
			} else {
				$('<div>').addClass('dot').appendTo('.pagination-dots');
			}
		});

		$('.dot').on('click', function(el){
			var dotIndex = $(this).index();
			$('.spotlight-content, .dot').removeClass('current');
			$(this).add('.spotlight-content:eq(' + dotIndex + ')').addClass('current');
			currentTestimony = dotIndex;
			clearInterval(testimony);
			testimony = setInterval(whatisdomo.testimonyCycle, 8000);
		});

		$('.pagination-dots').width(($('.dot').outerWidth(true)) * spotlights.length);
	}


	/* Adjust header when it's over light service */
	function headerAdjust() {
		var heroHeight = $('.hero').height(),
			$header = $('#header');

		if (_window.scrollTop() > heroHeight) {
			$header.css('top', '-60px');
			$header.addClass('compact');
		} else if (_window.scrollTop() < heroHeight && $header.hasClass('compact')) {
			$header.fadeOut(function() {
				$header.removeClass('compact');
				$header.css('top', '0px');
				$header.fadeIn();
			});
		}
	}

	function deviceAppear(add) {
		if(add) {
			see_info.addClass('show');
		} else {
			see_info.removeClass('show');
		}
		
	}

	/* rotate through words (how, when, where) */
	function wordRotate() {
		$('.word').each(function(index) {
			if ($(this).hasClass('current')) {
				$(this).removeClass('current').addClass('last');
			} else if ($(this).hasClass('last')) {
				$(this).removeClass('last');
			} else {
				$(this).addClass('current');
			}
		});
	}

	function deviceParralax() {
		ipadY = (((windowHeight + actionPoints.deviceParralax) - scrollTop)/2) - 150;

		ipad.css({
			'-webkit-transform': "translate3d(0, " + ipadY + "px, 0)",
			'-moz-transform': "translate3d(0, " + ipadY + "px, 0)",
			'-ms-transform': "translate3d(0, " + ipadY + "px, 0)",
			'transform': "translate3d(0, " + ipadY + "px, 0)"
		});

		iphone.css({
			'-webkit-transform': "translate3d(0, " + ipadY/2 + "px, 0)",
			'-moz-transform': "translate3d(0, " + ipadY/2 + "px, 0)",
			'-ms-transform': "translate3d(0, " + ipadY/2 + "px, 0)",
			'transform': "translate3d(0, " + ipadY/2 + "px, 0)"
		});

		desktop.css({
			'-webkit-transform': "translate3d(0, " + ipadY/5 + "px, 0)",
			'-moz-transform': "translate3d(0, " + ipadY/5 + "px, 0)",
			'-ms-transform': "translate3d(0, " + ipadY/5 + "px, 0)",
			'transform': "translate3d(0, " + ipadY/5 + "px, 0)"
		});
	}

	function connectRotate(add) {
		if(add) {
			connect.addClass('show');
		} else {
			connect.removeClass('show');
		}
	}

	function peoplePopup(add) {
		if(add) {
			same_page.addClass('grow');
		} else {
			same_page.removeClass('grow');
		}
	}

	function testimonyCycle() {
		spotlights.add('.dot').removeClass('current');
		if(currentTestimony < spotlights.length - 1) {
			currentTestimony++;
			$('.spotlight-content:eq(' + currentTestimony + '), .dot:eq(' + currentTestimony + ')').addClass('current');
		} else {
			$('.spotlight-content:eq(0), .dot:eq(0)').addClass('current');
			currentTestimony = 0;
		}
	}


	function scrollUpdate() {
		if(scrollTop > actionPoints.wordRotater) {
			if(!isRotating) {
				window.setInterval(whatisdomo.wordRotate, 2000);
				isRotating = true;
			}
		}

		if(scrollTop > actionPoints.connectRotate && connectRotated === false) {
			connectRotate(true);
			if(video) {
				video.pause();
			}
		} else {
			connectRotate(false);
			if(video) {
				video.play();
			}
		}

		if(scrollTop > actionPoints.deviceParralax && scrollTop < actionPoints.deviceParralax + windowHeight + 300) {
			deviceParralax();
		}

		if(scrollTop > actionPoints.peoplePopup) {
			peoplePopup(true);
		} else {
			peoplePopup(false);
		}

		if(scrollTop > actionPoints.deviceAppear) {
			deviceAppear(true);
		} else {
			deviceAppear(false);
		}

		if(scrollTop > actionPoints.testimonyCycle && tRunning === false) {
			clearInterval(testimony);
			testimony = setInterval(whatisdomo.testimonyCycle, 8000);
			tRunning = true;
		} else if(scrollTop < actionPoints.testimonyCycle && tRunning === true) {
			clearInterval(testimony);
			tRunning = false;
		}
	}

	function getActionPoints() {
		return {
			'wordRotater': $('.sentence').offset().top - windowHeight,
			'connectRotate': $('.connect').offset().top - (windowHeight/2),
			'deviceParralax': $('.anywhere').offset().top - windowHeight/1.2,
			'peoplePopup': $('.same-page').offset().top - (windowHeight/2),
			'deviceAppear': $('.see-info').offset().top - (windowHeight/1.5),
			'testimonyCycle': $('.testimony').offset().top - windowHeight
		};
	}

	return {
		'init': init,
		'wordRotate': wordRotate,
		'scrollUpdate': scrollUpdate,
		'testimonyCycle': testimonyCycle,
		'heroFullscreen' : heroFullscreen,
		'headerAdjust' : headerAdjust
	};
}());



/* Laptop logos animation */
$(function(){
	var $logos = $(".data-logo"),
		_window = $(window),
		windowWidth,
		windowHeight,
		duration,
		start = 0;

	var animated = !$('.whatisdomo-container').hasClass('no-animation');

	function init() {
		windowWidth = _window.width(),
		windowHeight = _window.height(),
		duration = windowHeight * 0.9,
		offset = $('.data-logos').offset().top,
		topStart = offset - windowHeight - $('.data-logos').height(),
		topEnd = offset + $('.data-logos').height(),
		start = offset - windowHeight/0.6;
	}

	if(animated) {

		init();

		_window.on('resize load', function(){ init(); });

	}

	$logos.each(function(i){
		$logos[i].startX = (Math.random() < 0.5 ? -1 : 1) * (windowWidth * 1.7);
		$logos[i].startY = (Math.random() < 0.5 ? -1 : 1) * ((i * 0.03)/*Math.random()*/ * 1000) - 400;
		$logos[i].currentX = $logos[i].startX;
		$logos[i].currentY = $logos[i].startY;
		$logos[i].duration = Math.random() * duration + duration;
		$logos[i].velocityX = $logos[i].startX / $logos[i].duration;
		$logos[i].velocityY = $logos[i].startY / $logos[i].duration;

		$(this).css({
			'-webkit-transform': 'translate3d(' + $logos[i].startX + 'px, ' + $logos[i].startY + 'px, 0)',
			'-moz-transform': 'translate3d(' + $logos[i].startX + 'px, ' + $logos[i].startY + 'px, 0)',
			'-ms-transform': 'translate3d(' + $logos[i].startX + 'px, ' + $logos[i].startY + 'px, 0)',
			'transform': 'translate3d(' + $logos[i].startX + 'px, ' + $logos[i].startY + 'px, 0)'
		});
	});

	var scrollY = 0;
	var newX = 0;
	var newY = 0;
	if(animated){
		_window.on('scroll resize ready', function(){
			updateLogos();
		});
	}

	function updateLogos() {
		scrollY = _window[0].scrollY;
		if(scrollY >= topStart && scrollY < topEnd) {
			$logos.each(function(i){
				if(scrollY < start + $logos[i].duration) {

					if($logos[i].startX < 0) {
						newX = $logos[i].startX - ($logos[i].velocityX * (scrollY - start));
					} else {
						newX = $logos[i].startX - ($logos[i].velocityX * (scrollY - start));
					}
					
					newY = $logos[i].startY - ($logos[i].velocityY * (scrollY - start));
					$(this).css({
						'-webkit-transform': 'translate3d(' + newX + 'px, ' + newY + 'px, 0)',
						'-moz-transform': 'translate3d(' + newX + 'px, ' + newY + 'px, 0)'
					});
				}
			});
		}
	}
});