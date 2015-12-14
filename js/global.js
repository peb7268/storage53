(function($){
    var $nav;

    function toggleNav(e){
        var isMobile = $('.fa-bars').is(':visible');
        var $nav     = e.data.sel;

        if(isMobile && e.currentTarget.nodeName == 'A') {
            window.setTimeout(function () {
                console.log('there');
                $nav.slideToggle(300);
            }, 700);

            return;
        }

        if(isMobile && e.currentTarget.nodeName == 'I') {
            $nav.slideToggle(300);
            return;
        }
    }
    
    function footerToggle(evt){
        evt.preventDefault();
        var isMobile = $('.fa-bars').is(':visible');
        var height   = (isMobile === true) ? '675px' : '470px';
        
        if($('#footer').height() === 0){
            $('#footer').animate({
              height: height
            });
        } else {
            $('#footer').animate({
              height: '0'
            });
        }
    }

    function ajaxSubmitForm(evt){
        evt.preventDefault();
        var $target = $(evt.target);
        var url     = $target.attr('action');
        var data    = $target.serialize();
        
        $.post(url, data)
            .success(function(resp){
                if(resp === 'success'){
                    $('form.contact').fadeOut(100, function(){
                        $(this).parent().append($('<p />', {
                            text: 'Thanks for getting in touch. We\'ll contact you soon.',
                            class: 'success',
                            style: 'color: green; margin: 15px auto 10px'
                        }));
                        
                        $('form.contact p.success').fadeIn(100);
                    });                 
                }
            })
            .error(function(resp){
                $('form.contact').fadeOut(100, function(){
                    $(this).parent().append($('<p />', {
                        text: 'Uh oh, looks like there was a error sending your message. Please give it another shot or give us a call.',
                        class: 'error',
                        style: 'color: red; margin: 15px auto 10px'
                    }));
                    
                    $('form.contact p.error').fadeIn(100);
                }); 
        });
    }

    function fillGalleryCanvas(evt){
        evt.preventDefault();
        var $target = $(evt.target);
        $target.parent().parent().parent().find('li').removeClass('active')
        $target.parent().parent().toggleClass('active');
        
        var src = $target.attr('src');
        var img = $('<img />', {
            src: src
        });
        
        $(this).closest('.gallery').find('#canvas').html('').append(img);
    }

    window.showLocation = function(){
        $('#address').slideToggle(100);
    }

    $('document').ready(function($){
        $('#footerToggle').on('click', footerToggle);
        $('.galleryNav li a').on('click', fillGalleryCanvas);
        $('.galleryNav li:first a img').click();
        $('.cta-link').on('click', function(evt){
            evt.preventDefault();
            var action = $(evt.target).data('action');
            if(typeof window[action] == 'function') window[action]();
        });

        $('form.contact').on('submit', ajaxSubmitForm);
        
        $nav = $('#nav');
        $('.fa-bars').on('click', {sel: $nav}, toggleNav);
        $nav.find('> li > span > a').on('click', { sel: $nav }, toggleNav);

        $('#details li a').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().parent().find('> .content').hide();

            var selector = '#' + $($(e.target).parent()[0]).attr('href').split('#')[1];
            var $main_nav = $('#details');

            $main_nav.fadeOut(100, function(){
                $(selector).fadeIn(100, function(){
                    $(this).addClass('active');
                });
            });
        });

        function toggleTermsAndConditions(evt){
            evt.preventDefault();
            $(evt.target).parent().parent().parent().addClass('selected');
            $('#termsAndConditions, #tandcAgree, p.em').fadeToggle(100);
        }

        $('#services a.back').on('click', function(e){
            e.preventDefault();
            var $content = $(this).parent().parent().parent().parent().find('> .content');
            $content.show();
            
            var $main_nav = $('#details');
            $('.service.active').fadeOut(100, function(){
                $main_nav.fadeIn(100, function(){
                    var center = $(window).height() / 2;
                    window.scrollTo(0, center);
                });
            });
        });

        $('.email a').on('click', footerToggle);
        $('.reserve a').on('click', toggleTermsAndConditions);
        
        $('#termsAndConditions').on('scroll', function(evt){
            var currentPos   = $(evt.target).scrollTop();
            
            if(currentPos > 665) {
                $('form input[type="submit"]').removeAttr('disabled');
            }
        });
    });
})(jQuery)

