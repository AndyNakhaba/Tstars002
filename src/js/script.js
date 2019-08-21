function myFunction() {
    $("#mynav").toggleClass("responsive");
}
$(document).mouseup(function(e) {
    var $target = $(e.target);
    if ($target.closest(".nav").length === 0) {
        $("#mynav").removeClass("responsive");
    }
});

function initMap() {
    var myLatLng = {lat: 51.1624652, lng: 7.0780858};

    // Create a map object and specify the DOM element
    // for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwhell: false,
        zoom: 18
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Grünewalder str. 29-31, 42657 Solingen'
    });
}
//key AIzaSyC316f8QzaPR3FuTuReJPVdrlsQWJnl8Qk

/*
 * Placeholder plugin for jQuery
 * ---
 * Copyright 2010, Daniel Stocks (http://webcloud.se)
 * Released under the MIT, BSD, and GPL Licenses.
 */
(function($) {
    function Placeholder(input) {
        this.input = input;
        if (input.attr('type') == 'password') {
            this.handlePassword();
        }
        // Prevent placeholder values from submitting
        $(input[0].form).submit(function() {
            if (input.hasClass('placeholder') && input[0].value == input.attr('placeholder')) {
                input[0].value = '';
            }
        });
    }
    Placeholder.prototype = {
        show : function(loading) {
            // FF and IE saves values when you refresh the page. If the user refreshes the page with
            // the placeholders showing they will be the default values and the input fields won't be empty.
            if (this.input[0].value === '' || (loading && this.valueIsPlaceholder())) {
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute('type', 'text');
                    } catch (e) {
                        this.input.before(this.fakePassword.show()).hide();
                    }
                }
                this.input.addClass('placeholder');
                this.input[0].value = this.input.attr('placeholder');
            }
        },
        hide : function() {
            if (this.valueIsPlaceholder() && this.input.hasClass('placeholder')) {
                this.input.removeClass('placeholder');
                this.input[0].value = '';
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute('type', 'password');
                    } catch (e) { }
                    // Restore focus for Opera and IE
                    this.input.show();
                    this.input[0].focus();
                }
            }
        },
        valueIsPlaceholder : function() {
            return this.input[0].value == this.input.attr('placeholder');
        },
        handlePassword: function() {
            var input = this.input;
            input.attr('realType', 'password');
            this.isPassword = true;
            // IE < 9 doesn't allow changing the type of password inputs
            if ($.browser.msie && input[0].outerHTML) {
                var fakeHTML = $(input[0].outerHTML.replace(/type=(['"])?password\1/gi, 'type=$1text$1'));
                this.fakePassword = fakeHTML.val(input.attr('placeholder')).addClass('placeholder').focus(function() {
                    input.trigger('focus');
                    $(this).hide();
                });
                $(input[0].form).submit(function() {
                    fakeHTML.remove();
                    input.show()
                });
            }
        }
    };
    var NATIVE_SUPPORT = !!("placeholder" in document.createElement( "input" ));
    $.fn.placeholder = function() {
        return NATIVE_SUPPORT ? this : this.each(function() {
            var input = $(this);
            var placeholder = new Placeholder(input);
            placeholder.show(true);
            input.focus(function() {
                placeholder.hide();
            });
            input.blur(function() {
                placeholder.show(false);
            });

            // On page refresh, IE doesn't re-populate user input
            // until the window.onload event is fired.
            if ($.browser.msie) {
                $(window).load(function() {
                    if(input.val()) {
                        input.removeClass("placeholder");
                    }
                    placeholder.show(true);
                });
                // What's even worse, the text cursor disappears
                // when tabbing between text inputs, here's a fix
                input.focus(function() {
                    if(this.value == "") {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveStart('character', 0);
                        range.select();
                    }
                });
            }
        });
    }
})(jQuery);

//Send form----------------------------------------------------------------------------------------
$('#contact-form').click(function(){
    $("#contact-form .thank").remove();
});

$(document).ready(function() {
    if($("#callback_name").val().length > 0 || $("#callback_name").val() == "name"){
        $("#callback_name").addClass('not-empty');
    }
    if($("#callback_concerning").val().length > 0 || $("#callback_concerning").val() == "concerning"){
        $("#callback_concerning").addClass('not-empty');
    }
    if($("#callback_email").val().length > 0 || $("#callback_email").val() == "email"){
        $("#callback_email").addClass('not-empty');
    }
    if($("#callback_phone").val().length > 0 || $("#callback_phone").val() == "phone"){
        $("#callback_phone").addClass('not-empty');
    }
    if($("#callback_company").val().length > 0 || $("#callback_company").val() == "company"){
        $("#callback_company").addClass('not-empty');
    }
    if($("#callback_text").val().length > 0 || $("#callback_text").val() == "text"){
        $("#callback_text").addClass('not-empty');
    }
});

$('#contact-form').validate({
    rules: {
        name: "required",
        concerning: "required",
        email: "required",
        phone: "required",
        company: "required",
        text: "required",
        checkbox: "required"

    },
    messages: {
        name: "Bitte füllen Sie dieses Pflichtfeld aus",
        concerning: "Bitte füllen Sie dieses Pflichtfeld aus",
        email: "Bitte füllen Sie dieses Pflichtfeld aus",
        phone: "Bitte füllen Sie dieses Pflichtfeld aus",
        company: "Bitte füllen Sie dieses Pflichtfeld aus",
        text: "Bitte füllen Sie dieses Pflichtfeld aus",
        checkbox_f: "Bitte füllen Sie dieses Pflichtfeld aus"

    },
    submitHandler: function(form) {

        $(form).ajaxSubmit({
            url: 'sendback.php',
            success: function() {
                $("#callback_name").val('');
                $("#callback_concerning").val('');
                $("#callback_email").val('');
                $("#callback_phone").val('');
                $("#callback_company").val('');
                $("#callback_text").val('');
                $("#contact-form").append('<p class="thank" style="display:none">Дякуємо, Ваше повідомлення надіслано!</p>');
                $("#contact-form .thank").slideDown(500);
            }
        });
    }
});
//----------------------------------------------------------
