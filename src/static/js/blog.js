jQuery(document).ready(function($){

    //Slick slider load

    let blogSliderInit = () => {
        let sliderElement = $('.js-blog');
            sliderElement.slick({
                arrows: false,
                slidesToShow: 2,
                dots: true,
                appendDots: $('.blog-dots'),
                infinite: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
    }

    const insightsSliderInit = () => {
        let sliderElement = $('.js-insights-blog');
        if(window.innerWidth <= 1024 && !sliderElement.hasClass('slick-initialized')) {
            sliderElement.slick({
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: true,
                            prevArrow: '<button type="button" class="js-insights-blog__button js-insights-blog__button--prev"><i class="fas fa-chevron-left"></i></button>',
                            nextArrow: '<button type="button" class="js-insights-blog__button js-insights-blog__button--next"><i class="fas fa-chevron-right"></i></button>',
                            slidesToShow: 2,
                            dots: false,
                            infinite: true,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: true,
                            prevArrow: '<button type="button" class="js-insights-blog__button js-insights-blog__button--prev"><i class="fas fa-chevron-left"></i></button>',
                            nextArrow: '<button type="button" class="js-insights-blog__button js-insights-blog__button--next"><i class="fas fa-chevron-right"></i></button>',
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }else if(window.innerWidth >= 1025 && sliderElement.hasClass('slick-inititalized')){
            sliderElement.slick('unslick');
        }
        
    }

    window.addEventListener('resize', insightsSlider )

    blogSliderInit();
    insightsSliderInit();
})