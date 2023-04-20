(function ($) {
    App = (function() {

        let $body = null;
        let counting = null;
        let $showHelpersContainer = null;
        let mouseXposition = 0;
        let mouseYposition = 0;

        let init = function() {
            $body = $('body');
            init_actions();
        };

        let init_actions = function() {
            $(document).on('click', '.filters__tab', function() {
                let $tab   = $(this);
                let target = $tab.data('target');
                if (!$tab.hasClass('filters__tab--active')) {
                    $('.filters__tab--active').removeClass('filters__tab--active');
                    $('.filter-tab--active').removeClass('filter-tab--active');
                    $tab.addClass('filters__tab--active');
                    $('#' + target).addClass('filter-tab--active')
                }
            });
        };

        return {
            init: init,
        };
    })();
}(jQuery));

document.addEventListener('DOMContentLoaded', function() {
    App.init();
});