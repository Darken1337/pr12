jQuery(document).ready(($) => {

  const dummySliderInit = function() {
    $('.dummy-container').slick({
      slidesToShow: 1,
      prevArrow: '<button type="button" class="dummy-container__button dummy-container__button--prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="dummy-container__button dummy-container__button--next"><i class="fas fa-chevron-right"></i></button>'
    });
  }

  const buyblockSliderInit = function() {
    $('.js-may-like-slider').slick({
      arrows: false,
      dots: true,
      appendDots: $('.js-may-like-slider__dots')
    })
  }
  
  dummySliderInit();
  buyblockSliderInit();

})