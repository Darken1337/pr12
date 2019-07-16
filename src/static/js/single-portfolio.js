jQuery(document).ready(function($){
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

    $('#buttonMoveDown').on('click', () => smoothScroll('#s-quote-slider', 300))
})