$(document).ready(() => {

  const adaptiveMenu = () => {
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

  const partnersSlider = () => {
    if (window.innerWidth < 768) {
      $('.partners').slick({
        prevArrow: '<button type="button" class="slick-prev partners__button partners__button--prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next  partners__button partners__button--next"><i class="fas fa-chevron-right"></i></button>',
        arrows: true,
        centerMode: false,
        slidesToShow: 2,
        swipe: true,
        responsive: [{
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }]
      })  
    }
  }

  const pricesSlider = () => {
    if (window.innerWidth < 768) {
      $('.prices-container').slick({
        prevArrow: '<button type="button" class="sslick-prev prices-container__button"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next  prices-container__button"><i class="fas fa-chevron-right"></i></button>',
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        swipe: true
      })  
    }
  }


  partnersSlider();
  pricesSlider();
  adaptiveMenu();
  lazyImgLoad();

})

const partnersSlider = () => {
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
  } else if (window.innerWidth > 768 && partnersElement.hasClass('slick-initialized')){
    $('.partners').slick('unslick')
  }
}

const pricesSlider = () => {
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
  partnersSlider();
  pricesSlider();
})