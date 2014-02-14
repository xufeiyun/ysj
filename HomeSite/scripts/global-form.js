$(function() {
    // Validate form with jquery.validate plugin
    if(typeof $.validator !== 'undefined') {
        /* Validation */
        $.validator.addMethod(
            'required', function (value, element) {

                /* IE7 */
                if(element.type == 'hidden'){
                    return true;
                }

                return (value !== element.defaultValue) && (value !== "");
            }, YinData.translate.__('This field is required.')
        );

        $.validator.addMethod(
            'phone', function (value, element) {

                var regex = /.{10,}/;
                var valid = regex.exec(value);

                return valid;
            }, YinData.translate.__('Please enter a valid phone number.')
        );

        $(".validate-form").validate({
            ignore: ":hidden:not(select)",
            onkeyup: false,

            submitHandler: function(form) {
                form.submit();
            }
        });
    }


});