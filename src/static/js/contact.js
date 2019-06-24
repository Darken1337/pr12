'use strict'
$(document).ready(() => {

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

  buttonMoveDown.on('click', () => smoothScroll('#s-in-touch', 300))

  //Custom select initializer

  function customSelectInit({ mainTrueId, wrapperId
  },
    { selectedText, arrowId, dropDataVal, slideAnimationTime, controllerName }) {
    const trueSelectOptions = document.getElementById(mainTrueId).children,
      selectElement = document.getElementById(wrapperId),
      arrowIcon = document.getElementById(arrowId),
      customSelect = customCreateElement('DIV',
        'custom-select',
        selectElement),
      dropDownElement = customCreateElement('DIV', 'select-drop',
        customSelect,
        '',
        'data-val',
        dropDataVal),
      itemIsSeleceted = customCreateElement('DIV',
        'custom-select__selected',
        customSelect,
        selectedText);

    const options = (function () {
      const optionsElements = document.querySelectorAll(`#${mainTrueId}>.${'select__item'}`),
        optionsData = [];
      for (let i = 0; i < optionsElements.length; i++) {
        optionsData.push(optionsElements[i].innerHTML.trim());
      }
      return optionsData;

    })();

    function trueSelectOptionsReset() {
      for (let key in trueSelectOptions) {
        if (key !== 'length') {
          trueSelectOptions[key].selected = false;
        }
      }
    };

    function setPickedOption(e) {
      itemIsSeleceted.innerText = e.target.innerText;
      trueSelectOptionsReset();
      Array.prototype.forEach.call(trueSelectOptions, option => {
        if (option.value === e.target.innerText) {
          option.selected = true;
        }
      })
    }

    function customCreateElement(tag, tagClass, parent, text, dataType, dataName) {
      const element = document.createElement(tag);

      let classList = '';
      if (Array.isArray(tagClass)) {
        tagClass.forEach(item => {
          classList += ' ' + item;
        })
      } else {
        classList = tagClass;
      }
      if (typeof text === 'string') {
        element.innerText = text;
      }
      classList = classList.trim();
      element.setAttribute('class', classList);
      if (dataName && typeof dataName === 'string') {
        element.setAttribute(dataType, dataName)

      }
      parent.appendChild(element);
      return element;
    }

    function dropDownElementToggle() {
      if (allSelectsState[controllerName] && dropDownElement.getAttribute('data-val') === dropDataVal) {
        animateDropElement(slideAnimationTime, 'backwards', dropDataVal);
        allSelectsState[controllerName] = false;
        arrowIcon.className = 'input__icon';
      } else if (!allSelectsState[controllerName] && dropDownElement.getAttribute('data-val') === dropDataVal) {
        animateDropElement(slideAnimationTime, 'forwards', dropDataVal);
        allSelectsState[controllerName] = true;
        arrowIcon.className += ' ' + 'input__icon--active';
      }
      for (let key in allSelectsState) {
        if (allSelectsState[key] && key !== controllerName) {
          closeAll(dropDataVal);
          animateDropElement(slideAnimationTime, 'forwards', dropDataVal);
          allSelectsState[controllerName] = true;
        }
      }
    }

    function closeAll(exception) {
      const allDropDowns = document.querySelectorAll(`.select-drop`);
      for (const key in allSelectsState) {
        if (allSelectsState.hasOwnProperty(key)) {
          allSelectsState[key] = false;
        }
      }
      allDropDowns.forEach(item => {
        if(item.getAttribute('data-val') !== exception){
          item.style.height = 0 + 'px';
        }
      });
      document.querySelectorAll('.input__icon').forEach(item => {
        item.className = 'input__icon';
      })
    }

    function createDropDownElementItems(data) {
      data.forEach(val => {
        const dropDownElementItem = customCreateElement('DIV', 'select-drop__item', dropDownElement, val, 'data-itemVal', val);

        dropDownElementItem.addEventListener('click', dropDownElementToggle);
        dropDownElementItem.addEventListener('click', setPickedOption);

      })
    }

    createDropDownElementItems(options);
    itemIsSeleceted.addEventListener('click', () => {
      dropDownElementToggle()
        ;
    });



    function animateDropElement(duration, direction, elementDataValue) {
      function countHeight() {
        const dropItems = document.querySelectorAll(`.select-drop[data-val="${elementDataValue}"]>.select-drop__item`);
        let totalHeight = 0;
        dropItems.forEach(item => {
          totalHeight += item.getBoundingClientRect().height;
        })
        return totalHeight;
      }

      const dropDownElementHeight = countHeight();

      let dropDownElementCurrentHeight,
        timeoutNumber = 4,
        oneStep = timeoutNumber * dropDownElementHeight / duration,
        animatedDropDown = document.querySelector(`.select-drop[data-val="${elementDataValue}"]`);

      if (direction === 'forwards') {
        dropDownElementCurrentHeight = 0;
        animatedDropDown.style.height = 0 + 'px';
      } else if (direction === 'backwards') {
        dropDownElementCurrentHeight = dropDownElementHeight;
      }

      function animate() {
        if (dropDownElementCurrentHeight < dropDownElementHeight && direction === 'forwards') {
          dropDownElementCurrentHeight = dropDownElementCurrentHeight + oneStep;

          animatedDropDown.style.height = dropDownElementCurrentHeight + 'px';
        } else if (dropDownElementCurrentHeight > 0 && direction === 'backwards') {
          dropDownElementCurrentHeight = dropDownElementCurrentHeight - oneStep;
          animatedDropDown.style.height = dropDownElementCurrentHeight + 'px';        
        } else {
          clearInterval(animateInterval);
        }
      }

      let animateInterval = setInterval(() => {
        if (dropDownElementCurrentHeight === 0) animate()
        else setTimeout(animate, timeoutNumber);;
      }, 1);
    }
  }

  let allSelectsState = {
    customSelect: false,
    budgetSelect: false
  }


  const customOptions = {
    selectedText: 'What are you looking for?',
    dropDataVal: 'what-drop',
    arrowId: 'trueSelectIcon',
    slideAnimationTime: 200,
    controllerName: 'customSelect'
  },
    trueOptions = {
      mainTrueId: 'trueSelect',
      wrapperId: 'trueSelectWrapper'
    };

  const customBudget = {
    selectedText: 'What is your budget?',
    dropDataVal: 'budget-val',
    arrowId: 'budgetSelectIcon',
    slideAnimationTime: 200,
    controllerName: 'budgetSelect'
  },
    trueBudget = {
      mainTrueId: 'trueSelectBudget',
      wrapperId: 'trueSelectBudgetWrapper'
    };

customSelectInit(trueBudget, customBudget)
customSelectInit(trueOptions, customOptions)



  //Form focus styling

  const formInputs = document.querySelectorAll('.input > input');

  formInputs.forEach(item => {
    item.addEventListener('focus', e => {
      e.target.offsetParent.style.borderBottom = '1px solid #7443ff'
    });
    item.addEventListener('blur', e => {
      e.target.offsetParent.style.borderBottom = null;
    })
  })

  //Socials animation
  const socialItems = document.querySelectorAll('.socials__item');

  socialItems.forEach(item => {
    item.addEventListener('mouseenter', e => {
      e.target.children[1].style.opacity = 1;
    })
    item.addEventListener('mouseleave', e => {
      e.target.children[1].style.opacity = 0;
    })
  })

  //Slick slider init
  
  let contactsSlider = () => {
    let sliderElement = $('.js-contacts');
    if (window.innerWidth <= 768 && !sliderElement.hasClass('slick-initialized')) {
      sliderElement.slick({
        prevArrow: '<button type="button" class="js-contacts__button js-contacts__button--prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="js-contacts__button.js-contacts__button--next"><i class="fas fa-chevron-right"></i></button>',
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
    }
  }

  contactsSlider()
})

let contactsSlider = () => {
  let sliderElement = $('.js-contacts');
  if (window.innerWidth <= 768 && !sliderElement.hasClass('slick-initialized')) {
    sliderElement.slick({
      prevArrow: '<button type="button" class="js-contacts__button js-contacts__button--prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="js-contacts__button.js-contacts__button--next"><i class="fas fa-chevron-right"></i></button>',
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
  } else if (window.innerWidth <= 768 && sliderElement.hasClass('slick-initialized')){
    sliderElement.slick('unslick')
  }
}
window.addEventListener('resize', contactsSlider)


