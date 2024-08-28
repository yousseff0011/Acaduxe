(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function(event){
        event.preventDefault(); // Prevent the default form submission

        var check = true;

        for(var i = 0; i < input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }

        if (check) {
            // Collect form data
            var formData = {
                name: $('input[name="name"]').val(),
                number: $('input[name="number"]').val()
            };

            // Send form data to Google Apps Script
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbxGpZtT9sieQJ3qqWSgipyZn2PE7Wsi3W11OFOcHV1c9jltKBlHZ7cggOwuwe_L_nls/exec', // Your Google Apps Script URL
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(response) {
                    alert('Form submitted successfully!');
                    $('#subscribe').modal('hide');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('Error submitting form: ' + textStatus + ' - ' + errorThrown);
                }
            });
        }

        return false; // Prevent form from being submitted the traditional way
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'number' || $(input).attr('name') == 'number') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Modal ]*/
    $('.modal-subscribe').on('click', function(e){
        e.stopPropagation();
    });

    $('.btn-close-modal').on('click', function(){
        $('#subscribe').modal('hide');
    });

})(jQuery);

