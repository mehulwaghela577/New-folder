$(document).ready(function(){
	// detailed menu open close arrow
	$('.pages .left-nav .arrow').on('click', function(){
		$('.detailed-menu-col').toggleClass('close');
		$(this).toggleClass('right');
		$('.pages .main-dashboard').toggleClass('expand');
	});

	// mobile nav
	$('.pages .mobile-nav .right .menu-icon').on('click', function(){
		$('.pages .mobile-nav .mobile-menu').addClass('open');
		$('.bg-overlay').addClass('open');
	});
	$('.pages .close-icon, .bg-overlay').on('click', function(){
		$('.pages .mobile-nav .mobile-menu').removeClass('open');
		$('.bg-overlay').removeClass('open');
	});

	// dropdown
    $('.submenu').slideUp(500);
    $('ul li a:not(:only-child)').click(function (e) {
        $(this).siblings('.submenu').slideToggle(500);
        $(this).toggleClass('open-arrow');
        // Close one dropdown when selecting another
        if($(window).width() > 991) {
        	$('.submenu').not($(this).siblings()).slideUp(500);
        	$('.pages .detailed-menu ul li a').not($(this)).removeClass('open-arrow');
        }
        e.stopPropagation();
    });

    // profile dropdown menu
    $('#dashboard-page .top-header .right .profile .profile-menu .menu-body ul.user-menu').slideUp();
    $('.user-btn').on('click', function(){
    	$('.user-menu').slideToggle(500);
    	$(this).toggleClass('active');
    });

    // black mode switch
    $('.switch input').on('click', function () {
        $(this).parent().toggleClass('active');
    });
    
    // slide down open dropdown
    if($(window).width() > 991) {
		$('.pages .detailed-menu ul li .submenu ul li a.active').each(function(){
			$(this).closest('.detailed-menu-main-li').children().addClass('open-arrow');
			$(this).closest('.submenu').slideDown();	
		});
    }	
    if($(window).width() < 991) {
    	$('.pages ul li .submenu ul li .submenu ul li a.active').each(function(){
			$(this).closest('.mobile-menu-li').children().addClass('open-arrow');
			// $(this).parent().closest('.pages ul li .submenu ul li .submenu ul li').children().addClass('open-arrow');
			$(this).parent().parent().parent().parent().children().addClass('open-arrow');
			$(this).parent().closest('.submenu').slideDown();
			$(this).parent().parent().parent().parent().closest('.submenu').slideDown().addClass('this');
	    });
    }

    // profile dropdown 
    $('.pages .profile .profile-img').on('click', function(){
    	$('.pages .profile .profile-menu').toggleClass('show');
    	$('.pages .notification-menu').removeClass('show');
    });

    // notification dropdown
    $('.pages .notification svg.main-svg').on('click', function(){
    	$('.pages .notification-menu').toggleClass('show');
    	$('.pages .profile .profile-menu').removeClass('show');
    });
    $('.pages .notification-menu .close-btn').on('click', function(){
    	$('.pages .notification-menu').removeClass('show');
    });

    // sort button dropdown
    $('#users-page .main-dashboard .country .left-panel .header .sort').on('click', function(){
    	$('#users-page .main-dashboard .country .left-panel .header .sort .dropdown').toggleClass('open');
    });

    // popup image slider
	console.log('init-scroll: ' + $('.nav-next').scrollLeft());
	$('#country-popup .body .slider-parent .arrow.nav-next').on('click', function () {
	    $('#country-popup .body .image-slider').animate({ scrollLeft: '+=460' }, 200);
	});
	$('#country-popup .body .slider-parent .arrow.nav-prev').on('click', function () {
	    $('#country-popup .body .image-slider').animate({ scrollLeft: '-=460' }, 200);
	});

	// popup open
	$('.popup-open').on('click', function(){
		$('#country-popup').addClass('open');
		$('.bg-overlay').addClass('open');
	})
	$('#country-popup .close-btn, .bg-overlay').on('click', function(){
		$('#country-popup').removeClass('open');
		$('.bg-overlay').removeClass('open');
	});

	// timeline collapse
	// $('#user-details-page .main-content .left-panel .timeline .main-item .information .timeline-collapse-btn').on('click', function(){
	// 	$('#user-details-page .main-content .left-panel .timeline .main-item').closest('.timeline .main-item .body').slideToggle();
	// });
	$('#user-details-page .main-content .left-panel .timeline .main-item .body').slideUp();
	$('.timeline-collapse-btn').click(function (e) {
        $(this).parent().parent().parent().parent().children('#user-details-page .main-content .left-panel .timeline .main-item .body').slideToggle(500);
        $(this).toggleClass('arrow-down');
        e.stopPropagation();
    });

	// event dropdown
    $('#users-graph .main-dashboard .main-content .body .btn, #users-graph .main-dashboard .main-content .button').click(function (e) {
        $(this).children('#users-graph .main-dashboard .main-content .dropdown').toggleClass('open');
        $(this).toggleClass('open-arrow');
        $('#users-graph .main-dashboard .main-content .event .dropdown').not($(this).children()).removeClass('open');
    	$('#users-graph .main-dashboard .main-content .event .body .btn').not($(this)).removeClass('open-arrow');
    });

    // page scroll setting
    var bodyHeight = $('main').height();
    var windowtop = $('.pages .top-header').outerHeight();
    var mobilenav = $('.mobile-nav').height();
    var breadcumbheight = $('.breadcumb').outerHeight();

    mobile =  bodyHeight - mobilenav - breadcumbheight - 20;
	total = bodyHeight;
	maindashboardsize = bodyHeight - windowtop - breadcumbheight;
	if($(window).width() > 991) {
		$('.pages .detailed-menu').css('height', total);
		$('.pages .main-content-body').css('height', maindashboardsize);
	}
	if($(window).width() < 991) {
		$('.pages .main-content-body').css('height', mobile);
	}
	$(window).resize(function(){
		var bodyHeight = $('main').height();
	    var windowtop = $('.pages .top-header').outerHeight();
	    var mobilenav = $('.mobile-nav').height();
	    var breadcumbheight = $('.breadcumb').outerHeight();

	    mobile =  bodyHeight - mobilenav - breadcumbheight - 20;
		total = bodyHeight;
		maindashboardsize = bodyHeight - windowtop - breadcumbheight;
		if($(window).width() > 991) {
			$('.pages .detailed-menu').css('height', total);
			$('.pages .main-content-body').css('height', maindashboardsize);
		}
		if($(window).width() < 991) {
			$('.pages .main-content-body').css('height', mobile);
		}
	});

	// analytics page
	var lookupheight = $('#analytics-page .user-lookup').outerHeight();
	var maintablenmargin = $('#analytics-page .maintable').css('margin-top');
	var maintablepadding = $('#analytics-page .maintable').css('padding-top');
	var ftr = $('#analytics-page .footer').outerHeight();
	var ftrmargin = $('#analytics-page .footer').css('margin-top');

	var tablesize =  maindashboardsize - lookupheight - parseFloat(maintablenmargin) - parseFloat(maintablepadding) - 20 - parseFloat(ftrmargin) - ftr;
	if($(window).width() > 767) {
		$('#analytics-page .maintable .body').css('height', tablesize);
	}
	$(window).resize(function(){
		if($(window).width() > 767) {
			$('#analytics-page .maintable .body').css('height', tablesize);
		}
	});

	// user graph dropdown
	$('#users-graph .main-dashboard .main-content .event .header .heading-dropdown-event').on('click', function(){
		$('#users-graph .main-dashboard .main-content .event .event-body').slideToggle();
		$(this).toggleClass('arrow');
	});
	$('#users-graph .main-dashboard .main-content .measured .header .heading-dropdown-measured').on('click', function(){
		$('#users-graph .main-dashboard .main-content .measured .measured-body').slideToggle();
		$(this).toggleClass('arrow');
	});


	// user page fixed nav
	var $window = $('#users-page .main-content-body');
    var $sidebar = $("#users-page #myAffix");
    var $sidebarHeight = $sidebar.innerHeight();
    var $sidebarOffset = $sidebar.offset();
    var $sidebarWidth = $("#users-page #myAffix").outerWidth();

    if($(window).width() > 991) {
    	$window.scroll(function () {
	        if ($window.scrollTop() > $sidebarOffset.top) {
	            $sidebar.addClass("fixed");
	            $sidebar.css('width', $sidebarWidth);
	        } else {
	            $sidebar.removeClass("fixed");
	        }
	        if ($window.scrollTop() + $sidebarHeight) {
	            $sidebar.css({ top: -($window.scrollTop() + $sidebarHeight) });
	        } else {
	            $sidebar.css({ top: "0" });
	        }
	    });
    }
});