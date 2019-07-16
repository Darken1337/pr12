jQuery(document).ready(function($){

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

})