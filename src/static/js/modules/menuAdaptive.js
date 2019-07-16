jQuery(document).ready(function($){

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

    adaptiveMenu();

})