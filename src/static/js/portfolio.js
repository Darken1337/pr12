jQuery(document).ready(($) => {

  const partnersSliderInit = () => {
    const partnersElement = $('.partners');
    if (window.innerWidth < 768 && !partnersElement.hasClass('slick-initialized')) {
      partnersElement.slick({
        prevArrow: '<button type="button" class="slick-prev partners__button partners__button--prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next  partners__button partners__button--next"><i class="fas fa-chevron-right"></i></button>',
        arrows: true,
        centerMode: false,
        slidesToShow: 3,
        swipe: true
      })
    } else if (window.innerWidth > 768 && partnersElement.hasClass('slick-initialized')) {
      $('.partners').slick('unslick')
    }
  }

  const pricesSliderInit = () => {
    const sliderElement = $('.prices-container');
    if (window.innerWidth < 768 && !sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick({
        prevArrow: '<button type="button" class="sslick-prev prices-container__button"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next  prices-container__button"><i class="fas fa-chevron-right"></i></button>',
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        swipe: true,
        responsive: {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      })
    } else if (window.innerWidth > 768 && sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick('unslick')
    }
  }

  window.addEventListener('resize', () => {
    partnersSliderInit();
    pricesSliderInit();
  })

  partnersSliderInit();
  pricesSliderInit();

})