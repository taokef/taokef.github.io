window.onload = (function () {

    var $html = $('html'),
        $preloader = $('.preloader'),
        $currLang = $('.curr_lang'),
        lang = localStorage.lang,
        langList = ['en', 'de', 'pl', 'ru', 'ro', 'dk', 'fr', 'es', 'pt', 'fi', 'hu', 'default'],
        langParam = (new URLSearchParams(window.location.search)).get('lang');


    if (!lang) {
        // default lang
        var countryToLang = {
            'en' : 'en',
            'de' : 'de',
            'pl' : 'pl',
            'ru' : 'ru',
            'ro' : 'ro',
            'dk' : 'dk',
            'ca' : 'fr',
            'es' : 'es',
            'pt' : 'pt',
            'fi' : 'fi',
            'hu' : 'hu',
            'default' : 'en'
        };
        //var country = $html.attr('data-country'),
		var country=navigator.language.slice(0,2).toLowerCase();
            lang = countryToLang[country] || countryToLang['default'];
        localStorage.lang = lang;
    }



    langList.forEach(function(element) {
        $html.removeClass(element).addClass(lang);
    });

    $('.lang_list_item[data-lang="'+lang+'"]')
        .addClass('curr')
        .siblings()
        .removeClass('curr');
    $currLang.html( $('.lang_list_item[data-lang="'+lang+'"]').html() );

    setTimeout(function () {
        $preloader.fadeOut();
        setTimeout(function () {
            $html.addClass('hide');
        }, 200);
    }, 200);


    var $button = $('.wheel_btn'),
        $spinner = $('.wheel_spinner'),
        $popupOverlay = $('.popup_overlay'),
        $popupWindow= $('.popup_window');

    $button.click(function () {
        if ( $button.hasClass('spin') ) {
            spin();
        }
    });

});



$(document).ready(function () {


    var $langSwitcher = $('.lang_switcher'),
        $langList = $('.lang_list'),
        $langListItem = $('.lang_list_item'),
        $html = $('html'),
        $preloader = $('.preloader'),
        $currLang = $('.curr_lang');

    $langSwitcher.click(function () {
        $langList.toggleClass('act');
    });

    $langListItem.click(function () {
        $preloader.fadeIn();
        $html.removeClass('hide');
        setTimeout(function () {
            $preloader.fadeOut();
            $html.addClass('hide');
        }, 200);
        var lang = $(this).data('lang');
        var langs = $('.lang_list_item').map(function(i, el) {
            return $(el).data('lang');
        }).toArray().join(" ");
        $html.removeClass(langs).addClass(lang);
        localStorage.lang = lang;
        $('.lang_list_item[data-lang="'+lang+'"]')
            .addClass('curr')
            .siblings()
            .removeClass('curr');
        $currLang.html( $(this).html() );
    });

    $(document).mouseup(function (e){
        if (!$langSwitcher.is(e.target)
            && $langSwitcher.has(e.target).length === 0) {
            $langList.removeClass('act');
        }
    });

});


function showPopup() {
    $('.popup_overlay').fadeIn();
    $('.popup_window').fadeIn();
}
