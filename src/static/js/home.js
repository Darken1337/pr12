$(document).ready(function(){

//Menu adaptive
  function adaptiveMenu() {
    const menuAdaptiveInit = document.getElementById('menuAdaptiveInit'),
      menuAdaptive = document.getElementById('menuAdaptive');

    const activeClass = 'menu-adaptive-wrapper--active',
      normalClass = 'menu-adaptive-wrapper';

    function openMenu() {
      if (!menuAdaptive.className.includes(activeClass)) menuAdaptive.className += ' ' + activeClass
    }

    menuAdaptiveInit.addEventListener('click', openMenu);

    const adaptiveMenuClose = document.getElementById('menuAdaptiveClose');

    function closeMenu() {
      if (menuAdaptive.className.includes(activeClass)) menuAdaptive.className = normalClass;
    }
    adaptiveMenuClose.addEventListener('click', closeMenu)

  }

  adaptiveMenu();
  
//Slick inits

  $('.dummy-container').slick({
    slidesToShow: 1,
    prevArrow: '<button type="button" class="dummy-container__button dummy-container__button--prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="dummy-container__button dummy-container__button--next"><i class="fas fa-chevron-right"></i></button>'
  });

  if($(window).width() <= 768){
    $('.prices-container').slick({
      responsive: [
        {
          breakpoint: 768,
          settings: {
            accessibility:true, 
            arrows: true,
            centerMode: false,
            prevArrow: '<button type="button" class="slick-prev prices-container__button"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next  prices-container__button"><i class="fas fa-chevron-right"></i></button>',
            slidesToShow: 1,
            swipe: true
          }  
        }]
    });

    $('.testimonials-slider').slick({
      prevArrow: '<button type="button" class="slick-prev testimonials-slider__button testimonials-slider__button--prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next  testimonials-slider__button testimonials-slider__button--next"><i class="fas fa-chevron-right"></i></button>',
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

    const partnersSlider = () => {
      $('.partners').slick({
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
    }
    partnersSlider();
  }

  
  // Images upload

  const lazyImgLoad = () => {
    const imagesToUpload = document.querySelectorAll('img');

    function handleImg(myImg, observer) {
      myImg.forEach(mySingleImg => {
        if (mySingleImg.intersectionRatio > 0) loadMyImg(mySingleImg.target)
      })
    }

    function loadMyImg(img) {
      img.src = img.getAttribute('data');
    }

    let optionsImg = {
      treshold: 0.1
    }

    const imagesObserver = new IntersectionObserver(handleImg, optionsImg);

    imagesToUpload.forEach(img => imagesObserver.observe(img)
    )
  }

  lazyImgLoad();

  //Smooth scroll
   const buttonMoveDown = $('#buttonMoveDown');

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

   buttonMoveDown.on('click', () => smoothScroll('#s-skills', 300))

})

  