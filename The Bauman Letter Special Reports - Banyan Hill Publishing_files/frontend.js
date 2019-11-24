jQuery( document ).ready( function() {
    // Submitting/validating login form
    jQuery( '.tfs-mw-wrapper-block .tfs-mw-loginform .tfs-mw-wp-submit' ).click(function(e) {
        e.preventDefault();

        // Get the ID of the form to know which login form is being submitted
        var loginFormID = jQuery( this ).data( "login-form-id" );

        var loginForm = jQuery( '#' + loginFormID );

        if ( loginForm.length ) {
            if ( loginForm.valid() ) {
                loginForm.submit();
            }
        }
    });

    jQuery( '.tfs-mw-wrapper-block .tfs-mw-loginform' ).each( function() {
        var form = jQuery( this );

        form.validate({
            rules: {
                log: {
                    required: true
                },
                pwd: {
                    required: true
                }
            },
            messages: {
                'log': {
                    required: 'Please enter your username or email address',
                    email: 'Please enter your password'
                },
                'pwd': {
                    required: 'Please enter your email address',
                    email: 'Please enter a valid email address'
                }
            }
        });
    });



    // Submitting/validating password reset form
    var password_reset_form = jQuery( '.tfs-mw-wrapper-block #password-reset-form' );

    jQuery( '.tfs-mw-wrapper-block #password-reset-form .mw-forgot-password-button' ).click(function(e) {
        e.preventDefault();

        if ( password_reset_form.valid() ) {
            // Clicking on 'send secure login link' - add hidden input for magic link mode
            if ( jQuery( this ).hasClass( 'tfs-mw-wrapper-block-magic-link-button' ) ) {
                jQuery( this ).append( '<input type="hidden" name="mode" value="ml" >' );
            }

            password_reset_form.submit();
        }
    });

    password_reset_form.validate({
        rules: {
            'user_email': {
                required: true,
                email: true
            }
        },
        messages: {
            'user_email': {
                required: 'Please enter your email address',
                email: 'Please enter a valid email address'
            }
        }
    });



    // Submitting/validating forgot username form
    var forgot_username_form = jQuery( '.tfs-mw-wrapper-block #username-reset-form' );

    jQuery( '.tfs-mw-wrapper-block #username-reset-form .mw-forgot-username-button' ).click(function(e) {
        e.preventDefault();

        if ( forgot_username_form.valid() ) {
            forgot_username_form.submit();
        }
    });

    forgot_username_form.validate({
        rules: {
            'user_email': {
                required: true
            }
        },
        messages: {
            'user_email': {
                required: 'Please enter your email address'
            }
        }
    });



    // Submitting/validating password change form
    var password_change_form = jQuery( '.tfs-mw-wrapper-block #password-change-form' );

    jQuery( '.tfs-mw-wrapper-block #password-change-form .mw-reset-password-button' ).click(function(e) {
        e.preventDefault();

        if ( password_change_form.valid() ) {
            password_change_form.submit();
        }
    });

    password_change_form.validate({
        rules: {
            'username': {
                required: true
            },
            'new-password': {
                required: true
            },
            'confirm-password': {
                required: true,
                equalTo: "#new-password"
            }
        },
        messages: {
            'username': {
                required: 'Please enter your username'
            },
            'new-password': {
                required: 'Please enter your new password'
            },
            'confirm-password': {
                required: 'Please confirm your new password',
                equalTo: 'The passwords do not match'
            }
        }
    });



    // Hide error/success messages if typing in the inputs again
    jQuery( '.tfs-mw-wrapper-block form' ).keyup(function(e) {
        jQuery('.tfs-mw-wrapper-block .tfs-mw-wrapper-block-error').html('');
        jQuery('.tfs-mw-wrapper-block .tfs-mw-wrapper-block-success').html('');
    });



    // Mask/unmask password
    jQuery( '.mw-password-field-masking' ).on( 'click', function() {
        var inputID = jQuery( this ).data( "masking-input-id" );

        if ( inputID ) {
            var inputMaking = jQuery( '#' + inputID );

            if ( inputMaking.attr( 'type') == 'password' ) {
                jQuery( this ).removeClass( 'mw-password-unmask' );
                jQuery( this ).addClass( 'mw-password-mask' );
                changeType( inputMaking, 'text' );
            } else {
                jQuery( this ).removeClass( 'mw-password-mask' );
                jQuery( this ).addClass( 'mw-password-unmask' );
                changeType( inputMaking, 'password' );
            }

            inputMaking.focus();

            return false;
        }
    });



    // Auto login feedback - message at the top.
    if ( jQuery( '.mw_auto_login_feedback' ).length ) {
        setTimeout( function () {
            jQuery( '.mw_auto_login_feedback' ).fadeOut( 'slow' );
        }, 15000 );
    }
});



/*
 Function from : https://gist.github.com/3559343
 */
function changeType( x, type ) {
    if ( x.prop( 'type' ) == type ) {
        return x; //That was easy.
    }

    try {
        return x.prop( 'type', type ); // IE security will not allow this
    } catch( e ) {
        var html = $("<div>").append(x.clone()).html();
        var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"

        //If no match, we add the type attribute to the end; otherwise, we replace
        var tmp = $(html.match(regex) == null ?
            html.replace(">", ' type="' + type + '">') :
            html.replace(regex, 'type="' + type + '"') );
        //Copy data from old element
        tmp.data('type', x.data('type') );
        var events = x.data('events');
        var cb = function(events) {
            return function() {
                //Bind all prior events
                for(i in events)
                {
                    var y = events[i];
                    for(j in y)
                        tmp.bind(i, y[j].handler);
                }
            }
        }(events);
        x.replaceWith(tmp);
        setTimeout(cb, 10); //Wait a bit to call function
        return tmp;
    }
}


// Custom jquery validate email validation
jQuery.validator.methods.email = function( value, element ) {
    return this.optional( element ) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+/.test( value );
};



// Toggle forgot username/password forms
function fp_section_toggle () {
    jQuery('.fp-password-section').toggle();
    jQuery('.fp-username-section').toggle();

    // If toggling between forgot username/password forms - hide error/success messages
    jQuery('.tfs-mw-wrapper-block .tfs-mw-wrapper-block-error').html('');
    jQuery('.tfs-mw-wrapper-block .tfs-mw-wrapper-block-success').html('');

    // Focus on email input
    jQuery( '.mw-user-email-input').focus();
}