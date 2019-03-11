/*function adjustHeaderLines () {
    var offsetBorder, offsetRightPadding, selector, greenWidth, blueWidth;
    offsetBorder = 4;
    if (Modernizr.mq('only all and (max-width: 1025px)')) {
        offsetRightPadding = 18;
        selector = 'header .logo--main--mobile';
    }
    if (Modernizr.mq('only all and (max-width: 767px)')) {
        offsetRightPadding = 3;
        selector = 'header .logo--main--mobile';
    }
    if (Modernizr.mq('only all and (min-width: 1025px)')) {
        offsetRightPadding = 0;
        selector = 'header .logo';
    }
    greenWidth = ($(selector).offset().left + $(selector).width()) + offsetRightPadding;
    blueWidth = ($('body').width() - greenWidth) - offsetBorder;
    $('header .bar--left').width(greenWidth + 'px');
    $('header .bar--right').width(blueWidth + 'px');
};*/
function runScript(e) {
    if ($('.header__search-holder').hasClass('active')) {
        if (e.keyCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            $('.header__search__viewall a')[0].click();
            return false;
        }
        $('.header__search__sub__content').attr('style', 'height:70%;');
        $('.header__search__sub.expanded').attr('style', 'bottom:-335px;height:335px;');
        $('.header__search__viewall.button').attr('style', 'top:338px;');
    }
}
function isIE() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = '' + parseFloat(navigator.appVersion); 
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;
    // In MSIE, the true version is after "MSIE" in userAgent
    if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        return true;
    } else {
        return false;
    }
}
jQuery.support.cors = true;
$(document).ready(function () {
/*
    if ($('section.page').hasClass('home')) {
        if ($('#newsletter-confirmation').find("p").length > 0) {
            $('html, body').animate({
                    scrollTop: $(".home__newsletter.segment").offset().top
                }, 1000);
        }
        if(isIE()) {
            $('.home .heading h1').attr('style', 'font-size: 48px');
        }
    }
*/
// page goes to bottom //
    $('body').on('click', '.exitMessage', function() {
        $(window).bind('beforeunload', function(){
            if ($.cookie('user_lang') == 'en')
                return 'You are leaving FirstBank’s website and entering a website hosted by another party. Be advised that you will no longer be subject to, or under the protection of FirstBank’s website security policies. We encourage you to read and evaluate the security policies of the site you are entering, which may be different from those of FirstBank. \n To continue, click the "OK" button. \n To decline, close this window or click on the "Cancel" button.';
            else
                return 'Usted está abandonando la página web de FirstBank y entrará a una página de Internet manejada por otra entidad. Tenga en cuenta que usted ya no estará sujeto a, o bajo la protección de las políticas de seguridad de la página web de FirstBank. Le exhortamos a leer y evaluar la política de seguridad del sitio al que está entrando, que pueden ser diferentes a las de FirstBank. \n Para continuar, oprima el botón de "OK". \n Para declinar, cierre esta ventana u oprima el botón de "Cancel" en su navegador.';
        });
    });
    if ($('.page').hasClass('welcome')) {
        if ($.cookie('user_region') || $.cookie('user_lang')) {
            if ($.cookie('user_region') && $.cookie('user_region') == 'fl')
                window.location.href = '/fl/en';
            else if ($.cookie('user_region') && $.cookie('user_region') == 'vi')
                window.location.href = '/vi/en';
            else        
                window.location.href = '/' + ($.cookie('user_region') || 'pr') + '/' + ($.cookie('user_lang') || 'es');
        }
    }
    $("#searchField").keyup(function(event){
        if(event.keyCode == 13){
            window.location.href = siteHome + '/Pages/search-results.aspx?seachtext=' + $(this).val();;
        }
    });
    var pathArray = window.location.pathname.split( '/' );
    if (pathArray[1] == 'pr' || pathArray[1] == 'fl' || pathArray[1] == 'vi') {
        var user_region = pathArray[1];
        if (pathArray[2] == 'es' || pathArray[2] == 'en')
            var user_lang = pathArray[2];
        else
            var user_lang = $.cookie('user_lang') || 'es';
    } else {
        var user_region = $.cookie('user_region') || 'pr';
        var user_lang = $.cookie('user_lang') || 'es';
        var user_name = $.cookie('user_name');
    }
    var loc = getLocation(window.location.href);
    // if (loc.pathname.match(new RegExp('/pr/es'))) user_lang = 'es';
    // if (loc.pathname.match(new RegExp('/pr/en'))) user_lang = 'en';
    // if (loc.pathname.match(new RegExp('/vi/en'))) user_lang = 'en';
    // if (loc.pathname.match(new RegExp('/fl/en'))) user_lang = 'en';
    $('body').addClass(user_region + ' ' + user_lang);
    if (user_region === 'fl') $('input[name="lang"][value="es"]').closest('li').hide();
    if (user_region === 'vi') $('input[name="lang"][value="es"]').closest('li').hide();
    // var apiUrl = 'http://fb55408/fbapi/api';
    var apiUrl = window.apiUrl || '/fbapi/api';//'http://technoandlogictest.com/api';// ''; // 
    var rootUrl = '/' + user_region + '/' + user_lang;// 'http://fb55408/' + user_region + '/' + user_lang;
    var nav = {};
    var mainEvnt = 'click';
    var searchApiUrl = rootUrl + '/_api/search/query?querytext=%27{{query}}%27&QueryTemplatePropertiesUrl=%27spfile://webroot/queryparametertemplate.xml%27';
    var siteHome = document.location.origin || '';
    var LocationCollection = [];
    var ReposCollection = [];
    var Latinise = {};
    Latinise.latin_map = {'Á': 'A','á': 'a','É': 'E','é': 'e','Í': 'I','í': 'i','Ó': 'O','ó': 'o','Ú': 'U','ú': 'u','Ñ': 'N','ñ': 'n'};
    if (Modernizr.touch) {
        mainEvnt = 'touchend';
    }
    // $('.cycle-slideshow').cycle('pause');
    nav.footer = $('.footer__nav');
    if (!$('.page').hasClass('welcome')) {
        $('.icon.icon--flag').removeClass('pr, fl, vi');
        $('.icon.icon--flag').addClass(user_region);
    }
    if (user_lang == 'en')
        $('#searchField').attr('placeholder', 'Search');
    if ($('section.page').hasClass('home')) {
        var timeofday = moment().format('A');
        var hourofday = moment().format('H');
        var greeting = {
            es: ['Buenos días', 'Buenas tardes', 'Buenas noches']
          , en: ['Good morning', 'Good afternoon', 'Good evening']
        };
        var homeDropdown = {
            pr: {
                es: [{
                    label: 'Banca por Internet'
                  , value: 'https://onlinebanking.firstbankpr.com'
                },{
                    label: 'Servicios en Línea'
                  , value: 'https://onlineservices.firstbankpr.com/ols/login'
                },{
                    label: 'Servicios en Línea para Tarjetas de Crédito'
                  , value: 'https://fbcreditcard.com/FBPR_Consumer/ChangeLanguage.do?localeID=Spanish'
                },{
                    label: 'Servicios Hipotecarios en Línea'
                  , value: 'https://carenet.fnfismd.com/firstbankpr/ACCLogin.jsp'
                },{
                    label: 'Smart Cash Management Solutions'
                  , value: 'https://firstbankpr.ebanking-services.com'
                }]
              , en: [{
                    label: 'Online Banking'
                  , value: 'https://onlinebanking.firstbankpr.com'
                },{
                    label: 'Online Services'
                  , value: 'https://onlineservices.firstbankpr.com/ols/login?&lang=en_US'
                },{
                    label: 'Online Credit Card Services'
                  , value: 'https://fbcreditcard.com/FBPR_Consumer/ChangeLanguage.do?localeID=English'
                },{
                    label: 'Online Mortgage Servicing'
                  , value: 'https://carenet.fnfismd.com/firstbankpr/ACCLogin.jsp'
                },{
                    label: 'Smart Cash Management Solutions'
                  , value: 'https://firstbankpr.ebanking-services.com'
                }]
            },
            fl: {
                es: []
              , en: [{
                    label: 'Internet Banking'
                  , value: 'https://web13.secureinternetbank.com/PBI_PBI1961/pbi1961.ashx?Rt=267089712&LogonBy=Connect3&PRMAcess=Account'
                },{
                    label: 'First eCorp'
                  , value: 'https://web13.secureinternetbank.com/EBC_EBC1961/EBC1961.ashx?WCI=Process&WCE=Request&RID=3000&RTN=267089712&mfa=2'
                },{
                    label: 'Online Credit Card Services'
                  , value: 'https://fbcreditcard.com/FBPR_Consumer/ChangeLanguage.do?localeID=English'
                }]
            },
            vi: {
                es: []
              , en: [{
                    label: 'eFirstBank'
                  , value: 'https://secure.fundsxpress.com/start/FBSTUSVI'
                },{
                    label: 'Online Credit Card Services'
                  , value: 'https://fbcreditcard.com/FBPR_Consumer/ChangeLanguage.do?localeID=English'
                },{
                    label: 'Online Mortgage Servicing'
                  , value: 'https://carenet.fnfismd.com/firstbankpr/ACCLogin.jsp'
                },{
                    label: 'Smart Cash Management Solutions'
                  , value: 'https://firstbankpr.ebanking-services.com'
                }]
            }
        };
        var currentSlide = 0;
        if (user_name)
            $('#uname').text(user_name);
        if (timeofday === 'AM') {
            $('#timegreet').text(greeting[user_lang][0]);
            $('.home__content.cover').addClass(user_region + '1');
        }
        if (timeofday === 'PM') {
            $('#timegreet').text(greeting[user_lang][1]);
            $('.home__content.cover').addClass(user_region + '2');
        }
        if (timeofday === 'PM' && hourofday > 18) {
            $('#timegreet').text(greeting[user_lang][2]);
            $('.home__content.cover').addClass(user_region + '3');
        }
        $('.header__pagetitle').on('click', function() {
            $("html, body").animate({ scrollTop: "0px" });
        });
        $('.home__content > .heading').addClass('on');
        // $('.home__content').find('.boxes .box--normal').on(mainEvnt, function (e) {
        //     clearInterval(window.promoBoxesInterval);
        //     $(this).parent().find('li')
        //         .removeClass('box--expanded')
        //         .addClass('box--normal');
        //         // .animate({height:"150px", width:"17%"}, 1000);
        //     $(this)
        //         .toggleClass('box--normal')
        //         .toggleClass('box--expanded');
        //         // .animate({height:"285px", width:"49%"}, 1000);
        //     $('.mainbox').removeClass('expanded');
        // });
        $('.boxes li').click(function() {
            if($(this).hasClass('box--normal')) {
                $('.boxes li').removeClass('box--expanded').addClass('box--normal');
                $(this).removeClass('box--normal').addClass('box--expanded');
            }
        });
        $('.mainbox').addClass(user_region);
        $('.mainbox__tabs').find('li').on(mainEvnt, function (e) {
            e.preventDefault();
            var tab = $(this).find('a').attr('class');
            tab = tab.substring(5);
            $(this).parent().find('li').removeClass('active');
            $(this).toggleClass('active');
            $('.mainbox__tabcontent').hide();
            $('.mainbox__tabcontent.' + tab).show();
            $('.mainbox__hash .icon').hide();
            $('.mainbox__hash .icon--' + tab + 'hash').show();
            $('.social-shape').attr('data-social', tab);
            $('.social-shape').attr('data-status', 'open');
        });
        if (!Modernizr.touch) {
            $('a.shape').on(mainEvnt, function (e) {
                var which = $(this).attr('data-tab');
                var status = $(this).attr('data-status');
                if (status == 'open') {
                    $(this).attr('data-status', 'close');
                    $(this).attr('style', 'padding-top: 7px');
                    $(this).find('.shape--down').attr('style', 'display:block;');
                    $(this).find('.shape--up').attr('style', 'display:none;');
                    console.log('Status Open');
                } else if (status == 'close') {
                    $(this).attr('data-status', 'open');
                    $(this).attr('style', 'padding-top: 6px');
                    $(this).find('.shape--down').attr('style', 'display:none;');
                    $(this).find('.shape--up').attr('style', 'display:block;');
                    console.log('Status Open');
                }
                e.preventDefault();
                e.stopPropagation();
                // $('.mainbox').toggleClass('expanded');
                if (which == 'top') {
                    if (status == 'open') {
                        $('.top-content').hide();
                        $('.mainbox > .bottom').attr('style', 'min-height: 90px;');
                    } else if (status == 'close') {
                        $('.top-content').show();
                        $('.mainbox > .bottom').attr('style', 'min-height: 306px;');
                    }
                } else if (which == 'bottom'){
                    if (status == 'open') {
                        $('.mainbox__tabcontent').hide();
                    } else if (status == 'close') {
                        var tab = $('.social-shape').attr('data-social');
                        $('.mainbox__tabcontent').hide();
                        $('.mainbox__tabcontent.' + tab).show();
                        $('.mainbox__hash .icon').hide();
                        $('.mainbox__hash .icon--' + tab + 'hash').show();
                    }
                }
                $('.home__content').find('.boxes').find('li')
                    .removeClass('box--expanded')
                    .addClass('box--normal');
                $('.home__content').find('.boxes').find('li:first-child')
                    .addClass('box--expanded')
                    .removeClass('box--normal');
            });
        } else {
            //$('.mainbox').addClass('expanded');
            /*$('.mainbox > .bottom').attr('style', 'min-height: 100%');*/
            $('.mainbox .mainbox__title').on(mainEvnt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('.mainbox').toggleClass('expanded');
            });
        }
        if (Modernizr.touch) {
            // $('.home__content .boxes > .box--normal').on('click', function (e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     return false;
            // });
        }
        $('#home__submit').attr('data-url', (homeDropdown[user_region][user_lang][0] ? homeDropdown[user_region][user_lang][0].value : homeDropdown[user_region].en[0].value));
        // $('#home__submit2').attr('data-url', (homeDropdown[user_region][user_lang][0] ? homeDropdown[user_region][user_lang][0].value : homeDropdown[user_region].en[0].value));
        $('#home__submit').on(mainEvnt, function (e) {
            var url = $(this).attr('data-url');
            window.location.href = url;
        });
        // $('#mainbox-select2').on('change', function (e) {
        //     var url = $(this).attr('data-url');
        //     window.location.href = url;
        // });
        $('#mainbox-select2').on('change', function() {
            window.location.href = $(this).val();
        });
        buildHomeLocalizedCopies(user_lang);
        buildHomeDropdown($('#mainbox-select'), homeDropdown[user_region][user_lang]);
        buildHomeDropdown($('#mainbox-select2'), homeDropdown[user_region][user_lang]);
        if (Modernizr.mq('only all and (min-width: 767px)')) {
            $('#mainbox-select').selectbox({
                classHolder: 'sbHolder'
                , onChange: function (e, m) {
                    $('#home__submit').attr('data-url', e);
                }
            });
            $('#mainbox-selectFake').selectbox({
                classHolder: 'sbHolder'
                , onOpen: function (e, m) {
                    var element = $('#mainbox-select2')[0], worked = false;
                    if (document.createEvent) {
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        worked = element.dispatchEvent(e);
                    } else if (element.fireEvent) {
                        worked = element.fireEvent("onmousedown");
                    }
                    if (!worked) {
                        alert("It didn't worked in your browser.");
                    }
                    // $('#mainbox-select2').click();
                }
            });
            $('#mainbox-select2').selectbox("detach")
        } else {
            $('#mainbox-select').on('change', function (e, b) {
                $('#home__submit').attr('data-url', $(this).val());
            });
            $('#mainbox-selectFake').selectbox({
                classHolder: 'sbHolder'
                , onOpen: function (e, m) {
                    var element = $('#mainbox-select2')[0], worked = false;
                    if (document.createEvent) {
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        worked = element.dispatchEvent(e);
                    } else if (element.fireEvent) {
                        worked = element.fireEvent("onmousedown");
                    }
                    if (!worked) {
                        alert("It didn't worked in your browser.");
                    }
                    // $('#mainbox-select2').click();
                }
                // , classHolderDisabled: 'sbHolderDisabled' 
                // , onChange: function (e, m) {
                //     window.location.href = e;
                //     // $('#home__submit2').attr('data-url', e);
                // }
            });
            $('#mainbox-select2').selectbox("detach")
        }
        if (Modernizr.mq('only all and (max-width: 767px)')) {
            $('.mainbox').removeClass('expanded');
        }
        if (user_region === 'pr') {
            loadTweet();
            loadInstagram();
            $.getJSON(apiUrl + '/Likes', function (res) {
                if (res.likes > 99999)
                    $('.counter--likes .number').css('font-size', '36px');
                $('.counter--likes .number').text(res.likes.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            });
        }
        /*if (Modernizr.mq('only all and (min-width: 1025px)')) {
            adjustHomeBoxesContainer();
        }*/
        startPromoboxes();
        $('li').find('.sbDisabled').hide();
    }
    if ($('section.page').hasClass('clasificados')) {
        $('#clasif-label-municipio').text(user_lang === 'es' ? 'Municipio:' : 'Town:');
        $('#clasif-label-propiedad').text(user_lang === 'es' ? 'Tipo de Propiedad:' : 'Property Type:');
        $('#clasif-option-todas').text(user_lang === 'es' ? 'Todas' : 'All');
        $('#clasif-option-apt').text(user_lang === 'es' ? 'Apartamento' : 'Apartment');
        $('#clasif-option-casa').text(user_lang === 'es' ? 'Casa' : 'House');
        $('#clasif-option-gas').text(user_lang === 'es' ? 'Estación de Gasolina' : 'Gas Station');
        $('#clasif-option-estudio').text(user_lang === 'es' ? 'Estudio' : 'Studio');
        $('#clasif-option-walkup').text(user_lang === 'es' ? 'Walk Up' : 'Walk Up');
        $('#clasif-option-comercial').text(user_lang === 'es' ? 'Comercial' : 'Commercial');
        $('#clasif-option-multifam').text(user_lang === 'es' ? 'Multi-Familiar' : 'Multi-Family');
        $('#clasif-option-condominio').text(user_lang === 'es' ? 'Condominio' : 'Condominium');
        $('#clasif-option-terreno').text(user_lang === 'es' ? 'Terreno' : 'Land');
        $('#repos-search').text(user_lang === 'es' ? 'Filtrar' : 'Apply Filter');
        $('#clasif-th-foto').text(user_lang === 'es' ? 'Foto' : 'Photo');
        $('#clasif-th-direccion').text(user_lang === 'es' ? 'Dirección' : 'Address');
        $('#clasif-th-tipo').text(user_lang === 'es' ? 'Tipo' : 'Type');
        $('#clasif-th-area').text(user_lang === 'es' ? 'Área' : 'Area');
        $('#clasif-th-detalles').text(user_lang === 'es' ? 'Detalles' : 'Details');
        $('#clasif-th-precio').text(user_lang === 'es' ? 'Precio' : 'Price');
    }
    localizeUIElements(user_lang);
    // Header lines
	/*
    adjustHeaderLines();
    $(window).on('resize', function () {
        adjustHeaderLines();
    });*/
    $(window).on( "orientationchange", function() {
        if($('#mobilemenu-button').hasClass('active')) {
            $('#mobilemenu-button').removeClass('active');
            $('#mobilemenu-navholder').removeClass('expanded');
        // $('body').toggleClass('menu--expanded').css('hei
            $('.page__navigation__top--mobile div').addClass('hide');
            $('body')
                .unbind('touchmove touchend')
                .focus();
            $('#mobilemenu-navholder').css('right', '-800px');
        }
    });
    $('.page__topcontent .button3.button3--mobile').on(mainEvnt, function (e) {
        e.preventDefault();
        window.location.href = 'tel:18666902511';
    });
    //Moblie breadcrumb back
    $('.breadcump-back').on(mainEvnt, function (e) {
        window.history.back();
    });
    //Mobile Menu
    $('#mobilemenu-button').on(mainEvnt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            if ($('body').width() < 760) {
                $('#mobilemenu-navholder')
                    .css('right', 0)
                    .css('width', (($('body').width()) - $('header .bar--left').width() - 4) + 'px');
            } else {
                $('#mobilemenu-navholder')
                    .css('right', 0)
                    .css('width', (($('body').width()/2) - $('header .bar--left').width() - 4) + 'px');
            }
            $('body').on('touchmove touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            $('.header__search-holder').removeClass('active');
        } else {
            $('.page__navigation__top--mobile div').addClass('hide');
            $('body')
                .unbind('touchmove touchend')
                .focus();
            if ($('body').width() < 760) {
                $('#mobilemenu-navholder').css('right', ($('header .bar--left').width() - $('body').width() - 4) + 'px');
            } else {
                $('#mobilemenu-navholder').css('right', ($('header .bar--left').width() - ($('body').width()/2) - 4) + 'px');
            }
        }
        $('#mobilemenu-navholder').toggleClass('expanded');
    });
    $('.page__navigation--container--mobile').on('touchmove touchend', function (e) {
        e.stopPropagation();
    });
    $('.page__navigation--container--mobile input[type=radio]').on(mainEvnt, function (e) {
        var group = $(this).attr('name');
        $('.page__navigation--container--mobile input[name=' + group + ']').closest('ul').find('li').removeClass('active');
        $(this).closest('li').addClass('active');
    });
    $('#mobile_search').on(mainEvnt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.page__navigation__top--mobile div').toggleClass('hide');
        if (!$('.page__navigation__top--mobile div').hasClass('hide'))
            $('.page__navigation__top--mobile div input').focus();
    });
    $('.page--search').on(mainEvnt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#tablet_search_form').toggleClass('hide');
        if (!$('#tablet_search_form').hasClass('hide'))
            $('#tablet_search_form input').focus();
    });
    // $('.button.header__search').on('click', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $(this).closest('.header__search-holder').toggleClass('active');
    // //     // $(this).closest('.header__search__bar').focus();
    // });
    $('.header__search__icon').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!$(this).closest('.header__search-holder').hasClass('active')) {
            $('.header__search__bar').focus();
            $('.header__search__sub__content').attr('style', 'height:0%;');
            $('.header__search__sub.expanded').attr('style', 'bottom:-100px;height:100px;');
            $('.header__search__viewall.button').attr('style', 'top:103px;');
        } else {
            $('.header__search__bar').blur();
        }
        $(this).closest('.header__search-holder').toggleClass('active');
    });
    $('.header__search__bar').attr('onkeypress', 'return runScript(event)');
    if ($('.page').hasClass('contact-page')) {
        if ($('.contact-page .accordion__title').length == 2)
            $('.contact-page .accordion__title').attr('style', 'width: 50%;');
        $('.accordion__content').each(function(i) {            
            var y = $(this).find('.contact-item').length;
            var x = 3;
            var rem = y % x;
            if(rem != 0)
                var e = $(this).find('.contact-item').slice(-rem);
            else
                var e = $(this).find('.contact-item').slice(-3);
            e.attr('style', 'border-bottom: none;');
            // for (n = y; n > (y-rem); n--) {
            //     $(this).find('.contact-item')[n-1].attr('style', 'border-bottom: none;');
            // }
        });
    }
    if ($('.page').hasClass('welcome')) {
        if (user_region) {
            $('input[value=' + user_region + ']').attr('checked', true);
            if(user_region == 'fl' || user_region == 'vi') {
                $('input[name=lang][value="es"]').parent().parent().hide();
            }
        }
        if (user_lang)
            $('input[value=' + user_lang + ']').attr('checked', true);
        if (user_name)
            $('input[name=user_name]').val(user_name);
        $('.button1').on(mainEvnt, function (e) {
            e.preventDefault();
            var href;
            user_name = $('input[name=user_name]').val();
            user_region = $.cookie('user_region') || 'pr';
            // user_lang = $.cookie('user_lang');
            // if (!$.cookie('user_lang') && !user_region){
            //     $.cookie('user_lang', 'es', { expires: 365, path: '/' });
            // } else if (!$.cookie('user_lang') && user_region == 'pr'){
            //     $.cookie('user_lang', 'es', { expires: 365, path: '/' });
            // } else if (!$.cookie('user_lang') && user_region == 'fl'){
            //     $.cookie('user_lang', 'en', { expires: 365, path: '/' });
            // } else if (!$.cookie('user_lang') && user_region == 'vi'){
            //     $.cookie('user_lang', 'en', { expires: 365, path: '/' });
            // }
            if (user_name && user_name !== '')
                $.cookie('user_name', user_name, { expires: 365, path: '/' });
            if (!user_region)
                $.cookie('user_region', 'pr', { expires: 365, path: '/' });
            if (!$.cookie('user_lang') && !user_region){
                user_lang = 'es';
                $.cookie('user_lang', 'es', { expires: 365, path: '/' });
                href = siteHome + '/' + user_region + '/es';
                window.location.href = href;
            } else if (!$.cookie('user_lang') && user_region == 'pr'){
                user_lang = 'es';
                $.cookie('user_lang', 'es', { expires: 365, path: '/' });
                href = siteHome + '/' + user_region + '/es';
                window.location.href = href;
            } else if (!$.cookie('user_lang') && user_region == 'fl'){
                user_lang = 'en';
                $.cookie('user_lang', 'en', { expires: 365, path: '/' });
                href = siteHome + '/' + user_region + '/en';
                window.location.href = href;
            } else if (!$.cookie('user_lang') && user_region == 'vi'){
                user_lang = 'en';
                $.cookie('user_lang', 'en', { expires: 365, path: '/' });
                href = siteHome + '/' + user_region + '/en';
                window.location.href = href;
            } else {
                user_lang = $.cookie('user_lang');
                $.cookie('user_lang', user_lang, { expires: 365, path: '/' });
                href = siteHome + '/' + user_region + '/' + user_lang;
                window.location.href = href;
            }
        });
        if (Modernizr.touch) {
            if (Modernizr.mq('only all and (max-width: 767px)')) {    
                $('input[name=region]').on('click', function (e) {
                    e.preventDefault();
                    $('.welcome__columns').find('.column').hide();
                    $('.welcome__columns').find('.column:nth-child(2)').show();
                });
                $('input[name=lang]').on('click', function (e) {
                    e.preventDefault();
                    $('.welcome__columns').find('.column').hide();
                    $('.welcome__columns').find('.column:nth-child(3)').show();
                });
            }
        }
    } else {
        var region, lang;
        region = $.cookie('user_region');
        lang = $.cookie('user_lang');
        $('.dropdown--region .desktop__lang').text(lang || 'ES');
        if (region) {
            if (region == 'pr') {
                $('#region_pr_check').prop('checked', true);
                $('#region_pr_label').attr('style', 'background-position:26px 0;');
            } else if (region == 'fl') {
                $('#region_fl_check').prop('checked', true);
                $('#region_fl_label').attr('style', 'background-position:26px 0;');
            } else if (region == 'vi') {
                $('#region_vi_check').prop('checked', true);
                $('#region_vi_label').attr('style', 'background-position:26px 0;');
            }
            if (region == 'fl' || region == 'vi') {
                $('input[name=lang][value="es"]').parent().parent().hide();
            } else {
                $('input[name=lang][value="es"]').parent().parent().show();
            }
        }
        if (lang) {
            if (lang == 'es') {
                $('#lang_es_check').prop('checked', true);
                $('#lang_es_label').attr('style', 'background-position:26px 0;');
            } else if (lang == 'en') {
                $('#lang_en_check').prop('checked', true);
                $('#lang_en_label').attr('style', 'background-position:26px 0;');
            }
        }
    }
    if ($('.banca-box').length > 0) {
        if (Modernizr.touch) {
            // show the close overlay button
            $(".banca-box .close-overlay").removeClass("hidden");
            // handle the adding of hover class when clicked
            $(".banca-box .img").click(function(e){
                if (!$(this).hasClass("hover")) {
                    $(this).addClass("hover");
                }
            });
            // handle the closing of the overlay
            $(".banca-box .close-overlay").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                if ($(this).closest(".img").hasClass("hover")) {
                    $(this).closest(".img").removeClass("hover");
                }
            });
        } else {
            // handle the mouseenter functionality
            $(".banca-box .img").mouseenter(function(){
                $(this).addClass("hover");
            })
            // handle the mouseleave functionality
            .mouseleave(function(){
                $(this).removeClass("hover");
            });
        }
    }
    $('input[name=region]').on('click', function (e) {
        var val = $(this).val();
        if (val == 'pr') {
            $('.region_check').prop('checked', false);
            $('.region_label').attr('style', 'background-position:0 0;');
            $('#region_pr_check').prop('checked', true);
            $('#region_pr_label').attr('style', 'background-position:26px 0;');
        } else if (val == 'fl') {
            $('.region_check').prop('checked', false);
            $('.region_label').attr('style', 'background-position:0 0;');
            $('#region_fl_check').prop('checked', true);
            $('#region_fl_label').attr('style', 'background-position:26px 0;');
        } else if (val == 'vi') {
            $('.region_check').prop('checked', false);
            $('.region_label').attr('style', 'background-position:0 0;');
            $('#region_vi_check').prop('checked', true);
            $('#region_vi_label').attr('style', 'background-position:26px 0;');
        }
        if (val == 'fl' || val == 'vi') {
            $('input[name=lang][value="es"]').parent().parent().hide();
            $.cookie('user_region', val, { expires: 365, path: '/' });
            $.cookie('user_lang', 'en', { expires: 365, path: '/' });
            user_lang = 'en';
            user_region = val;
            if (!$('.page').hasClass('welcome') )
                window.location.href = siteHome + '/' + user_region + '/en';
        } else {
            $('input[name=lang][value="es"]').parent().parent().show();
            $.cookie('user_region', val, { expires: 365, path: '/' });
            user_region = val;
            if (!$('.page').hasClass('welcome') )
                window.location.href = siteHome + '/' + user_region + '/' + user_lang;
        }
    });
    $('input[name=lang]').on('click', function (e) {
        var val = $(this).val();
        if (val == 'es') {
            $('.lang_check').prop('checked', false);
            $('.lang_label').attr('style', 'background-position:0 0;');
            $('#lang_es_check').prop('checked', true);
            $('#lang_es_label').attr('style', 'background-position:26px 0;');
        } else if (val == 'en') {
            $('.lang_check').prop('checked', false);
            $('.lang_label').attr('style', 'background-position:0 0;');
            $('#lang_en_check').prop('checked', true);
            $('#lang_en_label').attr('style', 'background-position:26px 0;');
        }
        $.cookie('user_lang', val, { expires: 365, path: '/' });
        $('.dropdown--region .desktop__lang').text($(this).val() || 'ES');
        user_lang = val;
        if (!$('.page').hasClass('welcome'))
            window.location.href = siteHome + '/' + user_region + '/' + user_lang;
    });
    $('.cycle-slideshow').on('cycle-next', function (event, slider) {
        currentSlide = slider.currSlide;
        changeHomeBottomSlide($(slider.slides[currentSlide]).attr('data-subimage'));
    });
    $('.cycle-slideshow').on('cycle-prev', function (event, slider) {
        currentSlide = slider.currSlide;
        changeHomeBottomSlide($(slider.slides[currentSlide]).attr('data-subimage'));
    });
    $('.header__search__bar').on('keyup', autoSuggest);
    if ($('.accordion').length > 0) $('.accordion').accordion();
    if ($('.location-holder').find('.searchbar__target').length > 0) {
        $('input:checkbox').screwDefaultButtons({
            image: 'url(/assets/images/checkbox.png)',
            width: 19,
            height: 18
        });
        $('.location-results__list').addClass('loading');
        $('.localizador-copy').text(user_lang === 'es' ? 'Localizador' : 'Locator');
        $('#top-box-heading-copy').text(user_lang === 'es' ? 'Nombre de Ciudad o Código Postal' : 'City name or postal code');
        $('.searchbar__bar').attr('placeholder', (user_lang === 'es' ? 'Ciudad o Código Postal' : 'City or postal code'));
        $('.searchbar__target').text(user_lang === 'es' ? 'Búsqueda' : 'Search');
        $('#top-box-filter-copy').text(user_lang === 'es' ? 'Filtrar búsqueda' : 'Filter results');
        $('label[for="sucursal"]').text(user_lang === 'es' ? 'Sucursal' : 'Branch');
        $('label[for="hipotecas"]').text(user_lang === 'es' ? 'Hipotecas' : 'Mortgage');
        $('label[for="seguros"]').text(user_lang === 'es' ? 'Seguros' : 'Insurance');
        loadLocations();
        $('.location-holder').find('.searchbar__target').on(mainEvnt, function () {
            var inputElem = $('.location-holder').find('.searchbar__bar'), data;
            if (inputElem.val() === '') return console.log('empty');
            if (_.isNaN(+inputElem.val())) {
                // should be a city
                data = _.query(LocationCollection, { slug: { $likeI: slugify(inputElem.val()) } });
                console.log('pueblos:', data);
                writeResponse('locations', data);
            } else {
                // should be a zipcode
                data = _.where(LocationCollection, { zipcode: inputElem.val() });
                writeResponse('locations', data);
            }
        });
        $('input#sucursal').click();
        var boxcheck = ['BRANCH'];
        function manageCheckboxes(checkbox) {
            if (checkbox.is(':checked') && boxcheck.indexOf(checkbox.val()) == -1) {
                boxcheck.push(checkbox.val());
            } else if (!checkbox.is(':checked') && boxcheck.indexOf(checkbox.val()) > -1) {
                boxcheck.splice(boxcheck.indexOf(checkbox.val()), 1);
            }
            LocCollectionCondition(boxcheck);
        }
        function LocCollectionCondition(list){
            var data;
            list.forEach(function(cond, i) {
                if (i == 0) {
                    if (cond == 'BRANCH' || cond == 'ATM') {
                        data = _.where(LocationCollection, { loctype: cond });// { loctype: $(this).val() });
                        // writeResponse('locations', data);
                    } else if (cond == 'hipotecas') {
                        data = _.filter(LocationCollection, function(loc){ return loc.firstmortage != null; });// { loctype: $(this).val() });
                        // writeResponse('locations', data);
                    }else if (cond == 'seguros') {
                        data = _.filter(LocationCollection, function(loc){ return loc.insurance != null; });// { loctype: $(this).val() });
                        // writeResponse('locations', data);
                    }
                    if (i+1 == list.length) {
                        console.log(data)
                         writeResponse('locations', data);
                    }
                } else {
                    if (cond == 'BRANCH' || cond == 'ATM') {
                        data.push.apply(data, _.where(LocationCollection, { loctype: cond }));// { loctype: $(this).val() });
                        // writeResponse('locations', data);
                    } else if (cond == 'hipotecas') {
                        data.push.apply(data, _.filter(LocationCollection, function(loc){ return loc.firstmortage != null; }));// { loctype: $(this).val() });
                        // writeResponse('locations', data);
                    }else if (cond == 'seguros') {
                        data.push.apply(data, _.filter(LocationCollection, function(loc){ return loc.insurance != null; }));// { loctype: $(this).val() });
                        // writeResponse('locations', data);
                    }
                    if (i+1 == list.length) {
                        console.log(data)
                        writeResponse('locations', _.uniq(data,function(item){return JSON.stringify(item);}));
                    }
                }
            });
            // var where = {};
            // if ()
        }
        $('input:checkbox').on('change', function () {
            manageCheckboxes($(this));
            console.log($(this).val(), $(this).is(':checked'));
            // if ($(this).val() == 'BRANCH' || $(this).val() == 'ATM') {
            //     var data = _.where(LocationCollection, { loctype: $(this).val() });// { loctype: $(this).val() });
            //     writeResponse('locations', data);
            // } else if ($(this).val() == 'hipotecas') {
            //     var data = _.filter(LocationCollection, function(loc){ return loc.firstmortage != null; });// { loctype: $(this).val() });
            //     writeResponse('locations', data);
            // }else if ($(this).val() == 'seguros') {
            //     var data = _.filter(LocationCollection, function(loc){ return loc.insurance != null; });// { loctype: $(this).val() });
            //     writeResponse('locations', data);
            // }
        });
        $('.button.button2.btn-maps2').on(mainEvnt, function (e) {
            var location = $(this).attr('data-location');
            window.open(
                'https://maps.google.com/maps?q=' + location,
                '_blank'
            );
        });
        $('.box--expanded .button').click(function() {
            window.location.href = $(this).attr('data-link');
        });
        if (Modernizr.mq('only all and (max-width: 1024px)')) {
            $('#sucursales').on('change', function (e) {
                var data = _.where(LocationCollection, { loctype: $(this).val() });
                writeResponse('locations', data);
            });
            $('.location-holder').find('.searchbar__bar').on('keyup', function () {
                var inputElem = $(this), data;
                if (inputElem.val().toString().length < 2) return console.log('need more characters');
                if (inputElem.val() === '') return console.log('empty');
                if (_.isNaN(+inputElem.val())) {
                    // should be a city
                    data = _.query(LocationCollection, { slug: { $likeI: slugify(inputElem.val()) } });
                    console.log('pueblos:', data);
                    writeResponse('locations', data);
                } else {
                    // should be a zipcode
                    data = _.query(LocationCollection, { zipcode: { $like: inputElem.val() } });
                    console.log('is a zipcode', data);
                    writeResponse('locations', data);
                }
            });
        }
    }
    //Repos page load
    if ($('#repos').length > 0) {
        //Pagination object
        var Repos = {
            pagOffset: 0,
            pagLimit: 6,
            state: ''
        }, type = '';
        if ($('#repos.newprops').length > 0) {
            type = 'new';
        }
        //Execute load data
        loadRepos(null, type);
        //Bind search
        $('#repos-search').on('click', function () {
            var queryString = '', 
                town = $('#municipio').val(),
                propertyType;
            if ($('#tipo_propiedad').val() && $('#tipo_propiedad').val() != 'todas')
                propertyType = $('#tipo_propiedad').val();
            $('.propiedades-results-desktop').find('tbody').html('');
            if (town) {
                queryString = '?$filter=' + encodeURIComponent('city eq \'' + town + '\'');
            }
            if (propertyType) {
                queryString = '?$filter=' + encodeURIComponent('typeES eq \'' + propertyType + '\'');
            }
            if (town && propertyType) {
                queryString = '?$filter=' + encodeURIComponent('city eq \'' + town + '\'' + ' and ' + 'typeES eq \'' + propertyType + '\'');
            }
            Repos.state = queryString;
            loadRepos(queryString, type);
        });
        //Bind pagination
        $('.propiedades-paginador ul li a.prev').on('click', function () {
            Repos.pagOffset -= 6, queryString;
            if (Repos.pagOffset <= 0) Repos.pagOffset = 0;
            console.log('offset: ', Repos.pagOffset);
            if (Repos.state !== '') {
                queryString = Repos.state + '&$top=' + Repos.pagLimit +'&$skip=' + Repos.pagOffset;
            } else {
                queryString = '?$top=' + Repos.pagLimit +'&$skip=' + Repos.pagOffset;
            }
            $('.propiedades-results-desktop').find('tbody').html('');
            loadRepos(queryString, type);
        });
        $('.propiedades-paginador ul li a.next').on('click', function () {
            Repos.pagOffset += 6;
            console.log('offset: ', Repos.pagOffset);
            if (Repos.state !== '') {
                queryString = Repos.state + '&$top=' + Repos.pagLimit +'&$skip=' + Repos.pagOffset;
            } else {
                queryString = '?$top=' + Repos.pagLimit +'&$skip=' + Repos.pagOffset;
            }
            $('.propiedades-results-desktop').find('tbody').html('');
            loadRepos(queryString, type);
        });
    }
    if ($('.contact-page').length > 0) {
        // $('.accordion').accordion();
        $('.accordion__content:not(:first)').hide();
        $('.accordion__title:first-child, .accordion_m dt:first-child').addClass('active');
        $('.accordion_m dt:first-child .arrow').addClass('down');
        $('.accordion_m .first_dd').addClass('active');
        $('.accordion__title').on('click', function() {
            $('.accordion__content').hide();
            $(this).next().show().prev().addClass('active').siblings().removeClass('active');
        });
    }
    //Load function
    function loadRepos (query, type) {
        var propertyEndpoint;
        if (!query) query = '?$top=' + Repos.pagLimit + '&$skip=' + Repos.pagOffset;
        $('.propiedades-results-desktop').addClass('loading');
        if (type === 'new') { 
            propertyEndpoint = '/NewProyects/GetNewProyects';
        } else {
            propertyEndpoint = '/Repos/GetRepos';
        }
        $.ajax({
            url: apiUrl + propertyEndpoint + query,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('.propiedades-results-desktop').toggleClass('loading');
                if (data.length < 1) {
                    if(user_lang == 'es')
                        return $('.propiedades-results-desktop').find('tbody').html('<td colspan="6" cellpadding="5" align="center"><p style="margin-top: 10px;">No hay resultados para su búsqueda</p></td>');
                    else if (user_lang == 'en')
                        return $('.propiedades-results-desktop').find('tbody').html('<td colspan="6" cellpadding="5" align="center"><p style="margin-top: 10px;">There are no results matching your search criteria.</p></td>');
                } 
                ReposCollection = _.map(data, function (item, i) {
                    item.id = i + 1;
                    item.slug = slugify(item.city);
                    return item;
                });
                data = _.filter(ReposCollection, function (repo) { return ((repo.id >= 1) && repo.id <= (6)); } );
                $('.location-results__list').removeClass('loading');
                if (type === 'new') { 
                    writeResponse('newRepos', data);
                } else {
                    writeResponse('repos', data);
                }
            },
            error: function (x, y, z) {
                if (console) console.log(x + '\n' + y + '\n' + z);
            }
        });
    }
    function autoSuggest (e) {
        var query, url;
        query = $(this).val();
        if (query.length < 2) return;
        url = searchApiUrl.replace('{{query}}', query);
        $('.header__search__viewall').find('a').attr('href', '/' + user_region + '/' + user_lang + '/Pages/search-results.aspx?seachtext=' + encodeURIComponent(query));
        $.ajax({
            url: url,
            type: 'GET',
            headers: {
                'Accept': 'application/json; odata=verbose'
            },          
            success: function (data) {                
                console.log('query resp:', data);
                writeResponse('search', data);
            },
            error: function (x, y, z) {
                if (console) console.error(x + '\n' + y + '\n' + z);
            }
        });
    }
    function changeHomeBottomSlide (image) {
        $('.layoutimg1.segment').fadeOut(function () {
            $(this)
                .css('background-image', 'url(' + image + ')')
                .fadeIn();
        });
    }
    function onAfter (cycle2) {    
        console.log('despues');    
        $(".slideTitle").delay(200).animate({marginLeft:"10px"}, 200 );        
    }
    function onBefore (cycle2) {   
        console.log('antes');       
        $(".slideTitle").animate({marginLeft:"-400px"}, 100 );        
    }
    function scrollToElement (el, ms){
        var speed = (ms) ? ms : 600;
        $('html,body').animate({
            scrollTop: $(el).offset().top
        }, speed);
    }
    $('.propiedades-results-desktop').on('click', 'table tbody img', function() {
        var img_url = $(this).attr('data-imgrande');
        $('.img__modal img').attr('src', img_url);
        $('.img__modal').show();
    });
    $('.img__modal .mask').on('click', function() {
        $('.img__modal').hide();
    });
    function writeResponse (type, data) {     
        if (type === 'tweet') {
            $('.tweet--mention.highlight')
                .attr('href', 'https://twitter.com/' + data.screenname)
                .attr('target', '_blank')
                .text('@' + data.screenname);
            $('.tweet--content p').html(data.text);
            $('.tweet--date').text( moment(new Date(data.timestamp * 1000)).format('MMM D') );
        }
        if (type === 'instagram') {
            $('.mainbox__instafeed').html('');
            $.each(data, function (index, item) {
                $('.mainbox__instafeed').append('<li><a target="_blank" href="http://instagram.com/' + item.author + '" style="background-image: url(' + item.image + '); background-size: cover;" class="img"></a></li>')
            });
        }
        if (type === 'search') {
            var total, items;
            total = data.d.query.PrimaryQueryResult.RelevantResults.TotalRows;
            if (total > 0) {
                items = convertRowsToObjects(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results);
                $('.header__search__sub__content').html('');
                $.each(items, function (i, item) {
                    $('.header__search__sub__content').append('<div><a href="' + item.Path + '">' + item.Title + '</a></div>');
                });
            }
        }
        function strPrep(str) {
            if (str[0] == ' ')
                return str.substring(1).toLowerCase();
            else
                return str.toLowerCase()
        }
        if (type === 'locations') {
            if ($('ul.location-results__list li').length > 0) {
                $('ul.location-results__list li a').unbind(mainEvnt);
            }
            $('ul.location-results__list').html('');
            var newData = data.sort(function(a, b){
                var nameA=strPrep(a.slug), nameB=strPrep(b.slug)
                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            $.each(newData, function (i, item) {
                if (!item.phone)
                    var phone = '';
                else
                    var phone = '</br>' + item.phone;
                var html = '<li><a data-id="' + item.id + '" href="javascript:void(0)" class="link">';
                html += '<h6 class="location-results__itemtitle">' + item.locname + '</h6>';
                html += '<p class="location-results__itemtext">' + item.address + phone + '<strong style="display:none">200m</strong></p>';
                if (item.service1)
                    html += '<span class="location-results__itemtag">' + (user_lang === 'es' ? item.service1 : item.service_en1) + '</span>';
                if (item.service2)
                    html += '<span class="location-results__itemtag">' + (user_lang === 'es' ? item.service2 : item.service_en2) + '</span>';
                if (item.service3)
                    html += '<span class="location-results__itemtag">' + (user_lang === 'es' ? item.service3 : item.service_en3) + '</span>';
                html += '</a></li>';
                $('ul.location-results__list').append(html);
            });
            $('ul.location-results__list li a').on('click', bindLocationDisclose);
        }
        if (type === 'repos') {
            if ($('.propiedades-results-desktop table tbody tr').length > 0) {
                $('.propiedades-results-desktop table tbody tr a').unbind(mainEvnt);
            }
            $('.propiedades-results-desktop table tbody').html('');
            $.each(data, function (i, item) {
                buildMobileProperty(item);
                var html = '<tr>';
                html += '<td><img data-imgrande="' + (item.imageSize2 ? item.imageSize2 : 'http://placehold.it/250x188?text=No hay imagen') + '" src="' + (item.imageSize ? item.imageSize : 'http://placehold.it/103x80?text=No hay imagen') + '"></td>'
                html += '<td>' + (item.addressLine1 ? item.addressLine1 : '') + (item.addressLine1 && (item.addressLine2 || item.city) ? '<br>' : '') + (item.addressLine2 ? item.addressLine2 : '') + (item.addressLine2 && item.city ? ' ' : '') + (item.city ? item.city : '') + '</td>';
                html += '<td>' + (user_lang === 'es' ? item.typeES : item.typeEN) + '</td>';
                html += '<td>' + (item.interiorArea ? 'Interior: ' + item.interiorArea : '') + (item.exteriorArea ? '<br>Exterior: ' + item.exteriorArea : '') + '</td>';
                html += '<td>' + (item.rheo ? 'REO#: ' + item.rheo : '') + (item.rheo && item.rooms ? '<br>' : '') + (item.rooms ? 'Cuartos: ' + item.rooms : '') + ((item.rheo || item.rooms) && item.bathrooms ? '<br>' : '') + (item.bathrooms ? 'Baños: ' + item.bathrooms : '') + '</td>';
                html += '<td>$' + (item.price ? item.price : '0') + '</td>';
                html += '</tr>';
                $('.propiedades-results-desktop table tbody').append(html);
            });
            $('.propiedades-results-desktop table tbody tr a').on('click', bindLocationDisclose);
        }
        if (type === 'newRepos') {
            if ($('.propiedades-results-desktop table tbody tr').length > 0) {
                $('.propiedades-results-desktop table tbody tr a').unbind(mainEvnt);
            }
            $('.propiedades-results-desktop table tbody').html('');
            $.each(data, function (i, item) {
                buildMobileNewProperty(item);
                var html = '<tr>';
                html += '<td><img data-imgrande="' + (item.imageSize2 ? item.imageSize2 : 'http://placehold.it/250x188?text=No hay imagen') + '" src="' + (item.imageSize ? item.imageSize : 'http://placehold.it/103x80?text=No hay imagen') + '"></td>'
                html += '<td>' + (item.addressLine1 ? item.addressLine1 : '') + (item.addressLine1 && (item.addressLine2 || item.city) ? '<br>' : '') + (item.addressLine2 ? item.addressLine2 : '') + (item.addressLine2 && item.city ? ' ' : '') + (item.city ? item.city : '') + '</td>';
                html += '<td>' + (user_lang === 'es' ? item.typeES : item.TypeEN) + '</td>';
                html += '<td>' + (item.city ? item.city : '') + '</td>';
                html += '<td>' + (item.project ? item.project : '') + (item.rheo && item.rooms ? '<br>' : '') + (item.rooms ? 'Cuartos: ' + item.rooms : '') + ((item.rheo || item.rooms) && item.bathrooms ? '<br>' : '') + (item.bathrooms ? 'Baños: ' + item.bathrooms : '') + '</td>';
                html += '<td>$' + (item.pricesFrom ? item.pricesFrom : '0') + '</td>';
                html += '</tr>';
                $('.propiedades-results-desktop table tbody').append(html);
            });
            $('.propiedades-results-desktop table tbody tr a').on('click', bindLocationDisclose);
        }
    }
    function buildMobileNewProperty(data) {
        var html = '<div class="mobile-box-result"><img src="' + (data.imageSize2 ? data.imageSize2 : 'http://placehold.it/250x188?text=No hay imagen') + '"><table width="100%" border="0" cellspacing="0" cellpadding="0">';
            html += '<tr><td align="left" valign="middle" width="50%">' + (user_lang === 'es' ? 'Dirección' : 'Address') + '</td>';
            html += '<td align="right" valign="middle" width="50%"><strong>' + (data.addressLine1 ? data.addressLine1 : '') + (data.addressLine1 && (data.addressLine2 || data.city) ? '<br>' : '') + (data.addressLine2 ? data.addressLine2 : '') + (data.addressLine2 && data.city ? ' ' : '') + (data.city ? data.city : '') + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Tipo' : 'Type') + '</td>';
            html += '<td align="right" valign="middle"><strong>' + (user_lang === 'es' ? data.typeES : data.TypeEN) + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Área' : 'Area') + '</td>';
            html += '<td align="right" valign="middle"><strong>' + (data.city ? data.city : '') + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Detalles' : 'Details') + '</td>';
            html += '<td align="right" valign="middle"><strong>' + (data.project ? data.project : '') + (data.rheo && data.rooms ? '<br>' : '') + (data.rooms ? 'Cuartos: ' + data.rooms : '') + ((data.rheo || data.rooms) && data.bathrooms ? '<br>' : '') + (data.bathrooms ? 'Baños: ' + data.bathrooms : '') + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Precio' : 'Price') + '</td>';
            html += '<td align="right" valign="middle"><strong>$' + (data.pricesFrom ? data.pricesFrom : '0') + '</strong></td></tr>';
            html += '</table></div>';
        $('.propiedades-results-mobile').append(html);
    }
    function buildMobileProperty(data) {
        var html = '<div class="mobile-box-result"><img src="' + (data.imageSize2 ? data.imageSize2 : 'http://placehold.it/250x188?text=No hay imagen') + '"><table width="100%" border="0" cellspacing="0" cellpadding="0">';
            html += '<tr><td align="left" valign="middle" width="50%">' + (user_lang === 'es' ? 'Dirección' : 'Address') + '</td>';
            html += '<td align="right" valign="middle" width="50%"><strong>' + (data.addressLine1 ? data.addressLine1 : '') + (data.addressLine1 && (data.addressLine2 || data.city) ? '<br>' : '') + (data.addressLine2 ? data.addressLine2 : '') + (data.addressLine2 && data.city ? ' ' : '') + (data.city ? data.city : '') + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Tipo' : 'Type') + '</td>';
            html += '<td align="right" valign="middle"><strong>' + (user_lang === 'es' ? data.typeES : data.TypeEN) + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Área' : 'Area') + '</td>';
            html += '<td align="right" valign="middle"><strong>' + (data.interiorArea ? 'Interior: ' + data.interiorArea : '') + (data.exteriorArea ? '<br>Exterior: ' + data.exteriorArea : '') + '' + (data.city ? data.city : '') + '' + (data.interiorArea ? 'Interior: ' + data.interiorArea : '') + (data.exteriorArea ? '<br>Exterior: ' + data.exteriorArea : '') + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Detalles' : 'Details') + '</td>';
            html += '<td align="right" valign="middle"><strong>' + (data.rheo ? 'REO#: ' + data.rheo : '') + (data.rheo && data.rooms ? '<br>' : '') + (data.rooms ? 'Cuartos: ' + data.rooms : '') + ((data.rheo || data.rooms) && data.bathrooms ? '<br>' : '') + (data.bathrooms ? 'Baños: ' + data.bathrooms : '') + '</strong></td></tr>';
            html += '<tr><td align="left" valign="middle">' + (user_lang === 'es' ? 'Precio' : 'Price') + '</td>';
            html += '<td align="right" valign="middle"><strong>$' + (data.price ? data.price : '0') + '</strong></td></tr>';
            html += '</table></div>';
        $('.propiedades-results-mobile').append(html);
    }
    function convertRowsToObjects (itemRows) { 
        var items = [];
        for (var i = 0; i < itemRows.length; i++) { 
            var row = itemRows[i], item = {}; 
            for (var j = 0; j < row.Cells.results.length; j++) { 
                item[row.Cells.results[j].Key] = row.Cells.results[j].Value; 
            } 
            items.push(item); 
        }
        return items;
    }
    function loadInstagram () {
        $.ajax({
            url: apiUrl + '/Instagrams',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                
                writeResponse('instagram', data);
            },
            error: function (x, y, z) {
                if (console) console.error(x + '\n' + y + '\n' + z);
            }
        });
    }
    function loadTweet () {
        $.ajax({
            url: apiUrl + '/Tweets',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {   
                writeResponse('tweet', data);
            },
            error: function (x, y, z) {
                if (console) console.log(x + '\n' + y + '\n' + z);
            }
        });
    }
    function loadLocations () {
        $.ajax({
            url: apiUrl + '/Locations' + '?$filter=' + encodeURIComponent('region eq \'' + user_region.toUpperCase() + '\'') + '&$orderby=pueblo',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var LocationCollectionTemp = _.map(data, function (item, i) {
                    console.log(slugify(item.pueblo));
                    item.id = i + 1;
                    item.slug = slugify(item.pueblo);
                    return item;
                });
                LocationCollection = LocationCollectionTemp; // _.sortBy(LocationCollectionTemp, function(item) { return item.slug })
                $('.location-results__list').removeClass('loading');
                writeResponse('locations', data);
                console.log('>>>>>', data);
            },
            error: function (x, y, z) {
                if (console) console.log(x + '\n' + y + '\n' + z);
            }
        });
    }
    function bindLocationDisclose (e) {
        // alert('sup');
        var id = $(this).attr('data-id');
        var detail = _.findWhere(LocationCollection, { id: +id });
        console.log('DETAIL Before:', id, detail);
        // console.log(LocationCollection);
        $('#location-detail-heading').text(user_lang === 'es' ? 'Detalles de ubicación' : 'Location details');
        $('#location-detail-copy-hours').text(user_lang === 'es' ? 'Horarios' : 'Working hours');
        $('#location-detail-copy-phone').text(user_lang === 'es' ? 'Teléfono' : 'Phone number');
        $('#locationDetail, #locationList').toggleClass('hide');
        $('.column.page__sidebar.right').hide();
        $('.inner-breadcum .current').unbind(mainEvnt);
        $('.button.button2.btn-maps2').attr('data-location', detail.lat + ',' + detail.longi);
        $('.inner-breadcum ul').append('<li><a href="javascript:void(0)">' + detail.locname + '</a></li>');
        $('.inner-breadcum .current').on(mainEvnt, function (e) {
            $('#locationDetail, #locationList').toggleClass('hide');
            $('.column.page__sidebar.right').show();
            $('.inner-breadcum li:last-child').remove();
        });
        $('#locDetailName').html(detail.locname);
        $('#locDetailAddress').html(detail.address);
        $('#locDetailTel').html(detail.phone);
        if (!detail.phone)
            $('#locTelWrapper').hide();
        $('#locDetailFax').html(detail.fax);
        if (!detail.fax)
            $('#locFaxWrapper').hide();
        if (!detail.lv && !detail.sab)
            $('#locHorariosWrapper').hide();
        else if (detail.lv == null)
            $('#locHorariosWrapper').hide();
        if (detail.lv && user_region === 'pr') detail.lv = (user_lang === 'es' ? 'L-V ' + detail.lv : 'M-F ' + detail.lv2);
        else if (detail.lv) detail.lv = (user_lang === 'es' ? 'L-V ' + detail.lv : 'M-T ' + detail.lv2);
        if (detail.sab) detail.sab = 'S ' + (user_lang === 'es' ? detail.sab : detail.sab);
        if (detail.lv == 'M-T null' || detail.lv == 'M-F null' || detail.lv == 'L-V null')
            $('#locHorariosWrapper').hide();
        $('#locDetailHorarioLV').html(detail.lv);
        $('#locDetailHorarioS').html(detail.sab);
        $('.btn-maps2').text(user_lang === 'es' ? 'Ver en maps' : 'Open in maps');
        $('#mapImage').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + detail.lat + ',' + detail.longi + '&zoom=16&size=690x340&markers=' + encodeURIComponent('color:green|label:' + detail.locname + '|' + detail.lat + ',' + detail.longi));
        $('.breadcump-back').unbind(mainEvnt);
        $('.breadcump-back').on(mainEvnt, function (e) {
            $('#locationDetail, #locationList').toggleClass('hide');
            $('.column.page__sidebar.right').show();
            $('.inner-breadcum li:last-child').remove();
        });
        window.scroll(0,1);
        console.log('DETAIL:', id, detail);
    }
    function buildHomeDropdown (elem, data) {
        $.each(data, function (i, item) {
            elem.append('<option value="' + item.value + '">' + item.label + '</option>');
        });
    }
    function buildHomeLocalizedCopies (lang) {
        var title, heading, cta, fb1, fb2, fb3, hl;
        if (lang === 'es') {
            title = 'Banca por Internet';
            heading = 'Escoge un servicio';
            cta = 'Entrar';
            fb1 = 'Síguenos';
            fb2 = 'Danos me gusta y comparte con nosotros.';
            fb3 = 'Personas ya son Fans de';
            hl = '¿En qué te podemos ayudar?';
        }
        if (lang === 'en') {
            title = 'Online Banking';
            heading = 'Choose a service';
            cta = 'Login';
            fb1 = 'Follow Us';
            fb2 = 'Give us a like and share with us.';
            fb3 = 'People are Fans of';
            hl = 'How can we help?';
        }
        $('.mainbox__title_copy').text(title);
        $('.mainbox__heading').text(heading);
        $('.mainbox .button.button3.cta').text(cta);
        $('.mainbox__fbcopy1').text(fb1);
        $('.mainbox__fbcopy2').text(fb2);
        $('.mainbox__fbcopy3').text(fb3);
        $('.home__h2.highlight').text(hl);
    }
    function localizeUIElements (lang) {
        var h1, h2;
        if (lang === 'es') {
            h1 = 'Escoge tu región';
            h2 = 'Escoge tu idioma';
        }
        if (lang === 'en') {
            h1 = 'Choose your region';
            h2 = 'Choose your language';
        }
        $('#touch__options, #desktop__options').find(':nth-child(1)').find('.title').text(h1);
        $('#touch__options, #desktop__options').find(':nth-child(3)').find('.title').text(h2);
    }
    function slugify (text) {
        var clean = latinize(text);
        return clean.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
    function latinize (string) {
        return string.replace(/[^A-Za-z0-9\[\] ]/g, function (x) { return Latinise.latin_map[x] || x; });
    }
    /* function adjustHomeBoxesContainer () {
        var headerH, winH, diff;
        headerH = $('.header--main--desktop').height();
        winH = $(window).height();
        diff = winH - headerH;
        $('.home__content').css({ 'height': diff + 'px', 'max-height': '700px' });
    }*/
	//hero image height
    function getLocation (href) {
        var l = document.createElement('a');
        l.href = href;
        return l;
    }
    function startPromoboxes () {
        var boxes = $('.home__content').find('.boxes li');
        var x = 0;
        window.promoBoxesInterval = setInterval(function () {
            x += 1;
            if (x >= boxes.length) x = 0;
            boxes.removeClass('box--expanded').addClass('box--normal');
            $(boxes[x]).toggleClass('box--normal').toggleClass('box--expanded');
        }, 5000);
    }
});
$(document).ready(function() {
 $(window).scroll(function(){
		var h = $(window).height();
		//Header Resizer on Scroll
   		if ($(this).scrollTop() > 1){  
		    $('#down').addClass('no-scroll');
		  }
		  else{
		    $('#down').removeClass('no-scroll');
		 }
   });
	$('#down a').click(function () { 
		var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top}, 1200);
        return false; 
	});
  var owl = $("#owl-rotator");
  owl.owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
	  autoPlay : 5000,
      singleItem : true,
	  navigation: false,
	  pagination : false,
	  stopOnHover : true  
  });
  // Custom Navigation Events
  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
  var owlxs = $("#owl_xs");
  owlxs.owlCarousel({
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
	  autoPlay : 5000,
      singleItem : true,
	  pagination : true, 
  });
    /*$(".mega_menu__inner .col > ul > li").each(function(index, li) {
        var li = $(li);
        li.hover(function() {
            $(".mega_menu__inner .col > ul > li").not(li).removeClass("active");
            $(".mega_menu__inner .col > ul > li").not(li).find("li").removeClass("active");
            $(".mega_menu__inner .col ul li").not(li).find("ul").removeClass("lvl-active");
            li.addClass("active");
            li.find(".expands").addClass("active");
        });
        if(li.find(".lvl-2").length <= 0) {
            li.mouseout(function() {
                $(this).removeClass("active");
                $(".mega_menu__inner li:first-child").addClass( "active" );
                $(".mega_menu__inner li:first-child ul").addClass( "lvl-active" );
                $(".mega_menu__inner li:first-child ul li").removeClass( "active" );
                $(".mega_menu__inner li:first-child ul li ul").removeClass( "lvl-active" );
                $(".mega_menu__inner li:first-child ul li:first-child").addClass( "active" );
                $(".mega_menu__inner li:first-child ul li:first-child ul").addClass( "lvl-active" );
            });
        } else {
            li.addClass("has-sub");
        }
        li.find(".lvl-2 > li").hover(function(e) {
            e.stopPropagation();
            li.find(".lvl-2 > li").removeClass("active");
            li.find(".lvl-2 > li > ul").removeClass("lvl-active");
            $(this).addClass("active");
            $(this).find(".expands").addClass("active");
        });
        li.find(".lvl-2 > li").each(function(index, li2) {
            li2 = $(li2);
            if(li2.find(".lvl-3").length <= 0) {
                li2.mouseout(function() {
                   li2.removeClass("active");
                   li2.parent(".lvl-2").find(".expands").addClass("active");
                });
            } else {
                li2.addClass("has-sub");
            }
        });
        li.find(".lvl-3 > li").hover(function(e) {
            e.stopPropagation();
            li.find(".lvl-3 > li").removeClass("active");
            li.find(".lvl-3 > li > ul").removeClass("lvl-active");
            $(this).addClass("active");
        }, function() {
            $(this).removeClass("active");
            $(this).parent("ul").find(".expands").addClass("active");
        });
    });
    $(".page__navigation > li.expands").hover(function() {
        $(".mega_menu__inner li").not($(".expands")).removeClass("active");
        $(".mega_menu__inner li:first-child").addClass( "active" );
        $(".mega_menu__inner li:first-child ul").addClass( "lvl-active" );
        $(".mega_menu__inner li:first-child ul li").removeClass( "active" );
        $(".mega_menu__inner li:first-child ul li ul").removeClass( "lvl-active" );
        $(".mega_menu__inner li:first-child ul li:first-child").addClass( "active" );
        $(".mega_menu__inner li:first-child ul li:first-child ul").addClass( "lvl-active" );
    });*/
    $(".mega_menu__inner .col > ul > li").each(function(index, li) {
        var li = $(li);
        li.hover(function() {
            $(".mega_menu__inner .col > ul > li").not(li).removeClass("active");
            $(".mega_menu__inner .col > ul > li").not(li).find("li").removeClass("active");
            $(".mega_menu__inner .col ul li").not(li).find("ul").removeClass("lvl-active");
            li.addClass("active");
            //li.find(".expands").addClass("active");
        });
        if(li.find(".lvl-2").length <= 0) {
            li.mouseout(function() {
                $(this).removeClass("active");
                /*$(".mega_menu__inner li:first-child").addClass( "active" );
                $(".mega_menu__inner li:first-child ul").addClass( "lvl-active" );
                $(".mega_menu__inner li:first-child ul li").removeClass( "active" );
                $(".mega_menu__inner li:first-child ul li ul").removeClass( "lvl-active" );
                $(".mega_menu__inner li:first-child ul li:first-child").addClass( "active" );
                $(".mega_menu__inner li:first-child ul li:first-child ul").addClass( "lvl-active" );*/
            });
        } else {
            li.addClass("has-sub");
        }
        li.find(".lvl-2 > li").hover(function(e) {
            e.stopPropagation();
            li.find(".lvl-2 > li").removeClass("active");
            li.find(".lvl-2 > li > ul").removeClass("lvl-active");
            $(this).addClass("active");
            //$(this).find(".expands").addClass("active");
        });
        li.find(".lvl-2 > li").each(function(index, li2) {
            li2 = $(li2);
            if(li2.find(".lvl-3").length <= 0) {
                li2.mouseout(function() {
                   li2.removeClass("active");
                   //li2.parent(".lvl-2").find(".expands").addClass("active");
                });
            } else {
                li2.addClass("has-sub");
            }
        });
        li.find(".lvl-3 > li").hover(function(e) {
            e.stopPropagation();
            li.find(".lvl-3 > li").removeClass("active");
            li.find(".lvl-3 > li > ul").removeClass("lvl-active");
            $(this).addClass("active");
        }, function() {
            $(this).removeClass("active");
            //$(this).parent("ul").find(".expands").addClass("active");
        });
    });
    /*$(".page__navigation > li.expands").hover(function() {
        $(".mega_menu__inner li").not($(".expands")).removeClass("active");
        $(".mega_menu__inner li:first-child").addClass( "active" );
        $(".mega_menu__inner li:first-child ul").addClass( "lvl-active" );
        $(".mega_menu__inner li:first-child ul li").removeClass( "active" );
        $(".mega_menu__inner li:first-child ul li ul").removeClass( "lvl-active" );
        $(".mega_menu__inner li:first-child ul li:first-child").addClass( "active" );
        $(".mega_menu__inner li:first-child ul li:first-child ul").addClass( "lvl-active" );
    });*/
});
/* Home__v3 JS */
function svgasimg() {
  return document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}
if (!svgasimg()){
  var e = document.getElementsByTagName("img");
  if (!e.length){
    e = document.getElementsByTagName("IMG");
  }
  for (var i=0, n=e.length; i<n; i++){
    var img = e[i],
        src = img.getAttribute("src");
    if (src.match(/svgz?$/)) {
      /* URL ends in svg or svgz */
      img.setAttribute("src", 
             img.getAttribute("data-fallback"));
    }
  }    
}

$(document).ready(function () {

    var customContainer = $('#custom-pagination-container');
    var customContainerArray = new Array();
    var OWLinit = false;

    var owl = $(".owl-carousel");

    owl.owlCarousel({
		slideSpeed : 300,
		paginationSpeed : 400,
		autoPlay : 5000,
		singleItem : true,
		navigation: false,
		pagination : false,
		stopOnHover : true,
        afterInit: afterOWLinit, // do some work after OWL init
        afterAction: afterAction
    });

    function afterAction() {
        if (OWLinit) updateClass(this.owl.currentItem);
        //console.info('afterAction ' + this.owl.currentItem);
    }

    function afterOWLinit() {
        // Possible to move the pagination to a new div?
        // https://github.com/OwlFonk/OwlCarousel/issues/196
        // var that = this;
        // that.owlControls.prependTo(customContainer);
        // that.owlControls.append(customContainer);
        //============================================
        $.each(this.owl.userItems, function (i) {
            var a = $('<div class="owl-page"><span></span></div>');

            customContainerArray.push(a);

            // bind click event for new pgination item
            a.bind('click', function (event) {
                event.preventDefault();
                this.goto = i;
                updateClass(this.goto); // add/remove .active class
                //console.log(this.goto);
                owl.trigger('owl.goTo', i);
            });

            customContainer.append(a);

        });

        updateClass(this.owl.currentItem);

        OWLinit = true;
    }

    function updateClass(elem) {

        // console.log('updateClass ' + elem);

        $.each(customContainerArray, function () {
            this.removeClass('active');
        });

        customContainerArray[elem].addClass('active');
    }

	// Custom Navigation Events
	$(".next").click(function(){
	owl.trigger('owl.next');
	})
	$(".prev").click(function(){
	owl.trigger('owl.prev');
	})

});