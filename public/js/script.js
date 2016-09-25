$(document).ready(function() {
     
     $('.preloader').delay(2000).fadeOut(2500, function(){
        $('.logo').addClass('animated infinite pulse content-on');

        $('.ice-cream').addClass('animated infinite pulse');

        setTimeout(function(){
          $('.banner-text h2 span').addClass('animated fadeInDown content-on');
          $('.banner-text p span').addClass('animated slideInRight').css('display', 'inline-block');
          $('.banner-button').addClass('animated infinite pulse').css('visibility', 'visible');
        }, 650);

        setTimeout(function(){
          $('.banner-text strong').addClass('animated slideInDown').css('display', 'block');
        }, 1800);

        setTimeout(function(){
          $('.comment-text').addClass('animated fadeInLeft').css('display', 'inherit');
          $('.comment-city').addClass('animated fadeInLeft').css('display', 'inherit');
          $('.comment-name').addClass('animated fadeInLeft').css('display', 'inherit');
        }, 5000);

        setTimeout(function(){
          $('.comment-wrap').addClass('animated bounceIn').css('display', 'inherit');
        }, 4500);
      });

      $("#owl-demo").owlCarousel({
     
          navigation : false, // Show next and prev buttons
          slideSpeed : 500,
		      autoPlay : 3000,
          paginationSpeed : 400,
          singleItem:true
     
          // "singleItem:true" is a shortcut for:
          // items : 1, 
          // itemsDesktop : false,
          // itemsDesktopSmall : false,
          // itemsTablet: false,
          // itemsMobile : false
     
      });
     
    });

	/*$('.timer').each(count);*/
	jQuery(function ($) {
      // custom formatting example
      $('.timer').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });


  // start all the timers
      $('#testimonials').waypoint(function() {
    $('.timer').each(count);
	});
 
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });


	$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

  // Prevent default anchor click behavior

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 900, function(){

    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
    });
  });
})