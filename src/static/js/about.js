jQuery(document).ready(($) => {


  //Circles

  const circlesAnimate = function(){
    const percItem = $('.skills-circle__perc'),
      activeElements = $('.skills-circle__active-border');

    let formattedActiveEls = [];
    for (let i = 0; i < activeElements.length; i++) {
      formattedActiveEls.push({
        color: activeElements[i].dataset.color,
        percantages: activeElements[i].dataset.perc,
        item: activeElements[i],
        percItem: percItem[i]
      })
    };

    function isVisible(section) {
      const sect = $(section),
        sectTopOffset = sect.offset().top,
        pageOffset = pageYOffset + window.outerHeight / 5;
      if (sectTopOffset <= pageOffset) {
        return true;
      } else {
        return false;
      }
    }

    let actionFired = false;



    function circleAnimation(color, percantages, activeElement, percItem) {

      if (isVisible('#s-skills') && !actionFired) {
        let i = 0,
          deg = Math.round(percantages * 360 / 100),
          percText;

        setTimeout(loopIt, 1);

        function loopIt() {
          i++;

          percText = Math.round(i * 100 / 360);
          percItem.innerHTML = percText + '%';


          if (i <= 180) {
            activeElement.style = 'background-color: ' + color + '; background-image: linear-gradient(' + (90 + i) + 'deg, transparent 50%, #f0fafd 50%),linear-gradient(90deg, #f0fafd 50%, transparent 50%)'
          } else {
            activeElement.style = 'background-color: ' + color + ';background-image: linear-gradient(' + (i - 90) + 'deg, transparent 50%, ' + color + ' 50%),linear-gradient(90deg, #f0fafd 50%, transparent 50%)'
          }

          setTimeout(() => {
            if (i < deg) {
              loopIt();
            } else {
              actionFired = true;
              return false;
            }
          }, 1);
        }
      }
    }

    $(window).scroll(() => {
      for (let i = 0; i < formattedActiveEls.length; i++) {
        circleAnimation(formattedActiveEls[i].color, formattedActiveEls[i].percantages, formattedActiveEls[i].item, formattedActiveEls[i].percItem)
      }
    })
  }
  

//Slider init

  const testimonialsSliderInit = function(){
    $('.testimonials-slider').slick({
      dots: true,
      dotsClass: 'testimonials-slider__dots',
      arrows: false,
      slidesToShow: 3,
      centerMode: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            dots: false,
            centerMode: false,
            infinite: true,
            prevArrow: '<button type="button" class="testimonials-slider__button testimonials-slider__button--prev"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="testimonials-slider__button testimonials-slider__button--next"><i class="fas fa-chevron-right"></i></button>',
            slidesToShow: 1,
            swipe: true
          }
        }]
    });
  }

  const aboutSliderInit = function(){
    $('.slider-about').slick({
      slidesToShow: 1,
      centerMode: false,
      prevArrow: '<button type="button" class="slider-about__button slider-about__button--prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="slider-about__button slider-about__button--next"><i class="fas fa-chevron-right"></i></button>',
    });
  }
  
  const partnersSliderInit = function(){
    if ($(window).width() <= 1024) {
      $('.partners').slick({
        arrows: true,
        prevArrow: '<button type="button" class="partners__button partners__button--prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="partners__button partners__button--next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              accessibility: true,
              arrows: true,
              prevArrow: '<button type="button" class="partners__button partners__button--prev"><i class="fas fa-chevron-left"></i></button>',
              nextArrow: '<button type="button" class="partners__button partners__button--next"><i class="fas fa-chevron-right"></i></button>',
              slidesToShow: 3,
              swipe: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }]
      });
    }
  }

  circlesAnimate();
  testimonialsSliderInit();
  aboutSliderInit();
  partnersSliderInit();

})