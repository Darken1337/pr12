jQuery(document).ready(($) => {

  const dummySliderInit = function () {
    $('.dummy-container').slick({
      slidesToShow: 1,
      prevArrow: '<button type="button" class="dummy-container__button dummy-container__button--prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="dummy-container__button dummy-container__button--next"><i class="fas fa-chevron-right"></i></button>'
    });
  }

  const worksPrevSliderInit = () => {
    let sliderElement = $('.js-works-prev');
    if (window.innerWidth <= 768 && !sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick({
        prevArrow: '<button type="button" class="js-works-prev__button js-works-prev__button--prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="js-works-prev__button js-works-prev__button--next"><i class="fas fa-chevron-right"></i></button>',
        slidesToShow: 2,
        infinite: true,
        responsive: [
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    } else if (window.innerWidth <= 768 && sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick('unslick')
    }
  }

  const pricesSliderInit = function () {
    const sliderElement = $('.prices-container');
    if ($(window).width() <= 768 && !sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick({
        responsive: [
          {
            breakpoint: 768,
            settings: {
              accessibility: true,
              arrows: true,
              centerMode: false,
              prevArrow: '<button type="button" class="slick-prev prices-container__button"><i class="fas fa-chevron-left"></i></button>',
              nextArrow: '<button type="button" class="slick-next  prices-container__button"><i class="fas fa-chevron-right"></i></button>',
              slidesToShow: 1,
              swipe: true
            }
          }]
      });
    } else if ($(window).width >= 769 && sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick('unslick');
    }
  }

  const partnersSliderInit = () => {
    const sliderElement = $('.partners');
    if ($(window).width() && !sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick({
        prevArrow: '<button type="button" class="slick-prev partners__button partners__button--prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next  partners__button partners__button--next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: true,
              centerMode: false,
              slidesToShow: 1,
              swipe: true
            }
          }]
      })
    } else if ($(window).width() && sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick('unslick');
    }

  }

  function smoothScroll(target, duration) {

    let targetEl = $(target),
      targetPosition = targetEl.offset().top,
      startPosition = window.pageYOffset,
      startTime = null;

    function animate(currentTime) {

      if (startTime === null) startTime = currentTime
      let timePassed = currentTime - startTime,
        distance = targetPosition - startPosition,
        scrollTo = easeInOutQuad(timePassed, startPosition, distance, duration);

      window.scrollTo(0, scrollTo);
      if (duration > timePassed) requestAnimationFrame(animate)
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animate)

  }

  dummySliderInit();
  worksPrevSliderInit();
  partnersSliderInit();
  pricesSliderInit();
  $('#buttonMoveDown').on('click', () => smoothScroll('#s-prices', 300))


  window.addEventListener('resize', function(){

    worksPrevSliderInit();
    partnersSliderInit();
    pricesSliderInit();

  })

})