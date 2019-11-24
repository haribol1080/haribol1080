jQuery( document ).ready( function() {
    if ( jQuery( '#mw-ajax-login-modal').length ) {
        jQuery( '#respond .must-log-in a' ).click(function( event ) {
            event.preventDefault();
        });

        jQuery( '#respond .must-log-in a' ).attr({
            'data-toggle': "modal",
            'href': "#",
            'data-target': "#mw-modal-login"
        });
    }

    var paragraphCount = jQuery(".expert-wrapper .wpb_wrapper > p").size();

    jQuery( ".expert-wrapper" ).append( "<button id='expert-shower'>Read More</button><button id='expert-hider'>Read Less</button>" );

    jQuery("#expert-hider").hide();
    jQuery("#expert-shower").hide();

    if (paragraphCount > 1) {
        jQuery("#expert-shower").show();
    }

    jQuery( "#expert-hider" ).click(function() {
        jQuery(".expert-wrapper .wpb_wrapper p").not(":first").slideUp();
        jQuery("#expert-hider").hide();
        jQuery("#expert-shower").show();
    });

    jQuery( "#expert-shower" ).click(function() {
        jQuery(".expert-wrapper .wpb_wrapper p").slideDown();
        jQuery("#expert-shower").hide();
        jQuery("#expert-hider").show();
    });

	// Load script on exclusives template only
	if ( jQuery( '.exclusives_div').length > 0 ) {
		// Check if 'z' var exists in url
		var zcodeinurl = getParameterByName('z');
		var promo_links = [
			"http://pro1.strategicinvestment.com/",
			"http://pro1.sovereignsociety.com/",
			"http://pro.sovereignsociety.com/m/",
			"http://pro.banyanhill.com/m/"
		];

		// if 'z' code exists in url, add it to all 'http://pro1.strategicinvestment.com/' urls on the page
		if ( zcodeinurl != null ) {
			jQuery('a').each( function() {
				var current_url = jQuery( this );

				promo_links.forEach(function(promo_link) {
					if ( current_url.attr('href') == promo_link ) {
						current_url.attr( 'href', promo_link + zcodeinurl );
					}
				});
			});

			if (jQuery('.ipt-eform-hidden-field-xcode').length > 0 && getParameterByName('z') !== null) {
				jQuery('.ipt-eform-hidden-field-xcode').val(getParameterByName('z'));	
			}
			if (jQuery('.ipt-eform-hidden-field-oneclick').length > 0) {
				if (getParameterByName('oc') !== null) {
					jQuery('.ipt-eform-hidden-field-oneclick').val(getParameterByName('oc'));
				} else {
					var oneClickCodes = [];

					for (var i = 0; i < oneClickCodes.length; i++) {
						if (oneClickCodes[i] === getParameterByName('z')) {
							jQuery('.ipt-eform-hidden-field-oneclick').val('true');
							break;
						}
					}					
				}
			}			
		} else {
			// Add z code from backend
			if ( exclusive_post_site_excode != "" ) {
				jQuery('a').each( function() {
					var current_url = jQuery( this );

					promo_links.forEach(function(promo_link) {
						if ( current_url.attr('href') == promo_link ) {
							current_url.attr( 'href', promo_link + exclusive_post_site_excode );
						}
					});
				});
			}
		}
	}

	jQuery('.verticalCarouselFooter').on('click', function() {
		lazyLoadImages();
	});

    jQuery('.home_subscription_inner').matchHeight();
    jQuery('.subscription_inner_block').matchHeight();

	// Sticky Widget
    var stickyWidgetTop = 0;

    var stickyWidgetDiv = jQuery('.bh_sticky_sidebar_widget');

    if ( stickyWidgetDiv.length ) {
        stickyWidgetTop = jQuery('.bh_sticky_sidebar_widget').offset().top + 30
    }

    var stickyWidget = function() {
        if ( jQuery('#primary').height() > jQuery('#secondary').height() ) {
            var scrollTop = jQuery(window).scrollTop();

            if (scrollTop > stickyWidgetTop) {
                jQuery('.bh_sticky_sidebar_widget').addClass('sticky_sidebar_area');
            } else {
                jQuery('.bh_sticky_sidebar_widget').removeClass('sticky_sidebar_area');
            }
        }
    };

    stickyWidget();

    jQuery(window).scroll(function() {
        stickyWidget();
    });

	// BH Recent Posts infinite scroll
    jQuery("#bh-recent-posts-list").append( '<div id="last-list"></div>' );

    var infinite_scroll_posts_display = parseInt(jQuery( '.infinite_scroll_posts_display' ).val());
    var infinite_scroll_initial_offset = parseInt(jQuery( '.infinite_scroll_initial_offset' ).val());
    var infinite_scroll_load_per_page = parseInt(jQuery( '.infinite_scroll_load_per_page' ).val());

    var infinite_loading = 0;
    var infinite_loading_stop = false;

    var infinite_loaded = infinite_scroll_load_per_page;
    var infinite_offset = infinite_scroll_initial_offset + infinite_scroll_load_per_page;

    jQuery( window ).scroll( function() {
        do_infinite_post_load();
    });

    function do_infinite_post_load() {
        if ( jQuery("#bh-recent-posts-list").length ) {
            var distanceTop = jQuery('#last-list').offset().top - jQuery(window).height();

            if ( jQuery( window ).scrollTop() > distanceTop ) {

                if ( infinite_loading == 1 || infinite_loading_stop === true ) {
                    return true;
                } else {
                    infinite_loading = 1;

                    var params = {
                        "posts_per_page": infinite_scroll_load_per_page,
                        "offset": infinite_offset,
                        "action": "load_recent_stories"
                    };

                    document.getElementById('image-ajax').style.visibility = 'visible';

                    jQuery.post( admin_ajax_url, params, function (data) {
                        if ( data.trim() ) {
                            infinite_loading = 0;

                            jQuery("#bh-recent-posts-list").append(data);
                            jQuery("#last-list").remove();
                            jQuery("#bh-recent-posts-list").append('<div id="last-list"></div>');

                            document.getElementById('image-ajax').style.visibility = 'hidden';

                            infinite_loaded = infinite_loaded + infinite_scroll_load_per_page;

                            infinite_offset = infinite_offset + infinite_scroll_load_per_page;

                            if ( infinite_loaded >= infinite_scroll_posts_display) {
                                infinite_loading_stop = true;
                            }
                        } else {
                            jQuery("#last-list").remove();
                            jQuery('#image-ajax').html("");
                        }
                    });
                }
            }
        }
    }

	// BH Expert/Author posts infinite scroll
    jQuery("#bh-expert-posts-list").append( '<div id="last-list"></div>' );

    var infinite_scroll_posts_display = parseInt(jQuery( '.expert_infinite_scroll_posts_display' ).val());
    var infinite_scroll_load_per_page = parseInt(jQuery( '.expert_infinite_scroll_load_per_page' ).val());
    var infinite_scroll_authorID = parseInt(jQuery( '.expert_infinite_scroll_author_ID' ).val());

    var infinite_loading = 0;
    var infinite_loading_stop = false;

    var infinite_loaded = infinite_scroll_load_per_page;

    jQuery( window ).scroll( function() {
        do_infinite_post_load_expert();
    });

    function do_infinite_post_load_expert() {
        if ( jQuery("#bh-expert-posts-list").length ) {
            var distanceTop = jQuery('#last-list').offset().top - jQuery(window).height();

            if ( jQuery( window ).scrollTop() > distanceTop ) {
                if ( infinite_loading_stop === true ) {
                    jQuery( '#expert-author-posts-all').show();
                }

                if ( infinite_loading == 1 || infinite_loading_stop === true ) {
                    return true;
                } else {
                    infinite_loading = 1;

                    var params = {
                        "offset": infinite_loaded,
                        "posts_per_page": infinite_scroll_load_per_page,
                        "authorID": infinite_scroll_authorID,
                        "action": "load_expert_posts"
                    };

                    document.getElementById('image-ajax').style.visibility = 'visible';

                    jQuery.post( admin_ajax_url, params, function (data) {
                        if ( data.trim() ) {
                            infinite_loading = 0;

                            jQuery("#bh-expert-posts-list").append(data);
                            jQuery("#last-list").remove();
                            jQuery("#bh-expert-posts-list").append('<div id="last-list"></div>');

                            document.getElementById('image-ajax').style.visibility = 'hidden';

                            infinite_loaded = infinite_loaded + infinite_scroll_load_per_page;

                            if ( infinite_loaded >= infinite_scroll_posts_display) {
                                infinite_loading_stop = true;
                            }
                        } else {
                            jQuery("#last-list").remove();
                            jQuery('#image-ajax').html("");
                        }
                    });
                }
            }
        }
    }
});

function checkEmail( inputValue ) {
    var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

    if ( pattern.test( inputValue ) ) {
        return true;
    } else {
        return false;
    }
}

var signup_form_submitting = false;


// Footer signup box recaptcha implement
// Validate the form
function recaptcha_footer_signup_validate(event) {
    event.preventDefault();

    var email_address_footer = document.getElementsByClassName( 'footer-signup-form-email' )[0].value;

    if ( ! email_address_footer || ! checkEmail( email_address_footer ) ) {
        alert( "Please enter a valid email address." );
    } else {
        signup_form_submitting = 'footer';

        grecaptcha.execute();
    }
}

// Onload - setup recaptcha
function recaptcha_footer_signup_load() {
    var submit_button_footer_signup = document.getElementById('footer-signup-form-submit');
    submit_button_footer_signup.onclick = recaptcha_footer_signup_validate;
}


// Sidebar signup box recaptcha implement
// Validate the form
function recaptcha_sidebar_signup_validate(event) {
    event.preventDefault();

    var email_address_sidebar = document.getElementsByClassName( 'sidebar-signup-form-email' )[0].value;

    if ( ! email_address_sidebar || ! checkEmail( email_address_sidebar ) ) {
        alert( "Please enter a valid email address." );
    } else {
        signup_form_submitting = 'sidebar';

        grecaptcha.execute();
    }
}

// Onload - setup recaptcha
function recaptcha_sidebar_signup_load() {
    var submit_button_sidebar_signup = document.getElementById('sidebar-signup-form-submit');
    submit_button_sidebar_signup.onclick = recaptcha_sidebar_signup_validate;
}

// Content (editor note) signup box recaptcha implement
// Validate the form
function recaptcha_content_signup_validate(event) {
    event.preventDefault();

    var email_address_content = document.getElementsByClassName( 'content-signup-form-email' )[0].value;

    if ( ! email_address_content || ! checkEmail( email_address_content ) ) {
        alert( "Please enter a valid email address." );
    } else {
        signup_form_submitting = 'content';

        grecaptcha.execute();
    }
}

// Onload - setup recaptcha
function recaptcha_content_signup_load() {
    var submit_button_content_signup = document.getElementById('content-signup-form-submit');
    submit_button_content_signup.onclick = recaptcha_content_signup_validate;
}

// Submit the forms using recaptcha
function recaptcha_signup_submit( token ) {
    if ( signup_form_submitting == 'sidebar' ) {
        document.getElementById("sidebar-signup-form").submit();
    } else if ( signup_form_submitting == 'footer' ) {
        document.getElementById("footer-signup-form").submit();
    } else if ( signup_form_submitting == 'content' ) {
        document.getElementById("content-signup-form").submit();
    }
}

function search_data()
{
    document.getElementById('searchform_new').submit();
}

// Get query var from url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}