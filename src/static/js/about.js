$(document).ready(() => {

  //Adaptive menu

  (function () {
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

  })();

  //Image upload

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



  //Circles

  const percItem = $('.skills-circle__perc'),
    activeElements = $('.skills-circle__active-border'),
    circleColors = {
      violet: '#7443ff',
      cyan: '#43d5ff',
      yellowGreen: '#acda93',
      yellow: '#feb646',
      red: '#ff8288',
      grey: '#b7cacb'
    };

  let formattedActiveEls = {
    first: {
      color: '#7443ff',
      percantages: 85,
      item: activeElements[0],
      percItem: percItem[0]
    },
    second: {
      color: '#43d5ff',
      percantages: 75,
      item: activeElements[1],
      percItem: percItem[1]
    },
    third: {
      color: '#acda93',
      percantages: 65,
      item: activeElements[2],
      percItem: percItem[2]
    },
    fourth: {
      color: '#feb646',
      percantages: 55,
      item: activeElements[3],
      percItem: percItem[3]
    },
    fifth: {
      color: '#ff8288',
      percantages: 45,
      item: activeElements[4],
      percItem: percItem[4]
    },
    sixth: {
      color: '#b7cacb',
      percantages: 35,
      item: activeElements[5],
      percItem: percItem[5]
    }

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

    if (isVisible('#skillsItem') && !actionFired) {
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
    circleAnimation(formattedActiveEls.first.color, formattedActiveEls.first.percantages, formattedActiveEls.first.item, formattedActiveEls.first.percItem)
    circleAnimation(formattedActiveEls.second.color, formattedActiveEls.second.percantages, formattedActiveEls.second.item, formattedActiveEls.second.percItem)
    circleAnimation(formattedActiveEls.third.color, formattedActiveEls.third.percantages, formattedActiveEls.third.item, formattedActiveEls.third.percItem)
    circleAnimation(formattedActiveEls.fourth.color, formattedActiveEls.fourth.percantages, formattedActiveEls.fourth.item, formattedActiveEls.fourth.percItem)
    circleAnimation(formattedActiveEls.fifth.color, formattedActiveEls.fifth.percantages, formattedActiveEls.fifth.item, formattedActiveEls.fifth.percItem)
    circleAnimation(formattedActiveEls.sixth.color, formattedActiveEls.sixth.percantages, formattedActiveEls.sixth.item, formattedActiveEls.sixth.percItem)
  })

//Slider init

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