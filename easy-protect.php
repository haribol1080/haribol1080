<?php
//  HINT: YOU DON'T NEED TO EDIT ANYTHING IN THIS FILE !! (190 Lines)

/*  v1.2
    ERROR1 = Wrong password! Try again!
    ERROR2 = Too many attempted sign-ins!
    ERROR3 = Your IP address is banned!
*/

// CHECK IF LOCKOUT LINK IS CLICKED
if ( isset( $_GET['logout'] ) ) logout();

function protect( $user_pass = '', $option = '' ) {
  // SETUP VAR
  if ( !isset( $option['timeout'] ) ) $option['timeout'] = 30; // default 30 minutes
  // VAR ini
  $wrong = $error1 = $error2 = $error3 = '';
  // CHECK IF PASS IS SET
  if ( empty ( $user_pass ) ) die( '<tt><b>ERROR</b> No Password Set!' );
  // START SESSION IF IT IS NOT STARTET
  if ( session_status() == PHP_SESSION_NONE ) session_start();
  // CHECK IF IP BLOCKING IS USED
  if ( isset( $option['block'] ) ) {
    // CHECK IF IPs ARE BLOCKED
  	$error3 = ip_in_array( $option['block'] );
    // RESET PASS INPUT
  	if ( $error3 != '' ) unset( $_POST['access_pass'] );
  }
  // CHECK IF IP BYPASS IS USED
  if ( isset( $option['bypass'] ) ) {
    // CHECK IF IPs ARE ALLOWED FOR BYPASS
  	if ( ip_in_array( $option['bypass'] ) != '' ) {
      // SAVE HINT IN SESSION
      $_SESSION['bypass'] = TRUE;
    }
  }
  // CHECK IF MD5 IS SET
  if ( isset( $_POST['access_pass'] ) && isset( $option['md5'] ) ) {
    // USE MD5
    $_POST['access_pass'] = md5( $_POST['access_pass'] );
  }
  // CHECK IF PASS IS CORRECT and SET TIME-OUT
  if (  (
        isset( $_POST['access_pass'] ) and
        $_POST['access_pass'] == $user_pass and
        empty( $_SESSION['error'] )
        )
      or
        (
        isset( $_POST['access_pass'] ) and
        in_array( $_POST['access_pass'], $user_pass ) and
        empty( $_SESSION['error'] )
        )
    ) {
    // SAVE ENCRYPTED PASSWORD IN SESSION
    $_SESSION['access_pass'] = crypt( $_POST['access_pass'], md5( time() ) );
    // LEAVE USERS x MINUTES LOGGED IN
    $_SESSION['time'] = time() + ( 60 * $option['timeout'] );
    // REDIRECT TO CONTENT
    header( 'Location:' . htmlspecialchars( $_SERVER['HTTP_REFERER'] ) );
    // FOR SAFETY
    die();
  }
  // PASS NOT CORRECT
  else if ( isset( $_POST['access_pass'] ) ) {
  	// SET ERROR CSS
  	$wrong = ' wrong'; // CAUTION: do not remove the blank at the beginning
    $error1 = ' show'; // CAUTION: do not remove the blank at the beginning
    // CHECK IF ATTEMPTS OPTION IS SET
    if ( isset( $option['attempts'] ) ) {
      // ADD INCORRECT LOGIN ATTEMPT
      @$_SESSION['attempts']++;
      // SET TIME FOR LAST WRONG LOGIN ATTEMPTS
      if ( ( !isset( $_SESSION['attempts_time'] ) && empty( $_SESSION['attempts_time'] ) ) ) {
        // RESET WRONG LOGIN ATTEMPTS AFTER x MINUTES
        $_SESSION['attempts_time'] = time() + ( 60 * $option['timeout'] );
      }
      // CHECK IF TOO MANY ATTEMPTS or ATTEMPTS ARE NOT TIMED-OUT
      if ( $_SESSION['attempts'] > $option['attempts'] ) {
        // ERROR CSS
        $error1 = '';
        $error2 = ' show'; // CAUTION: do not remove the blank at the beginning
        // SET ERROR
        $_SESSION['error'] = true;
      }
      if ( $_SESSION['attempts'] > $option['attempts'] && $_SESSION['attempts_time'] < time() ) {
        // RESET TRIES
        unset( $_SESSION['error'] );
        unset( $_SESSION['attempts_time'] );
        unset( $_SESSION['attempts'] );
      }
    }
  }
  // ADD - Allow multiple Passwords - 11.10.2017
  function crypt_loop( $user_pass, $access_pass ) {
    if ( !is_array($user_pass) ) {
      if ( crypt( $user_pass, $access_pass ) != $access_pass ) {
        return true;
      } else {
        return false;
      }
    } else {
      for ( $i = 0; $i < count( $user_pass ); $i++ ) {
        $crypt_user_pass[] = crypt( $user_pass[$i], $access_pass );
      }
      if ( in_array( $access_pass, $crypt_user_pass ) ) {
        return false;
      } else {
        return true;
      }
    }
  }
  // OUTPUT LOGIN FORM
  if (
      (
        ( isset( $_SESSION['access_pass'] ) && crypt_loop( $user_pass, $_SESSION['access_pass'] ) )
        || !isset( $_SESSION['access_pass']
      ) || ( $_SESSION['time'] <= time() ) ) && @$_SESSION['bypass'] != 1
     ) {
    // WAIT
    sleep( .5 );
    // LOAD TEMPLATE
    if ( file_exists( 'templates/' . (int)$option['skin'] . '.htm' ) ) {
      // SKIN FROM OPTION
      $login_template = file_get_contents( 'templates/' . (int)$option['skin'] . '.htm' );
    } elseif ( file_exists( 'templates/1.htm' ) ) {
      // SKIN No 1
      $login_template = file_get_contents( 'templates/1.htm' );
    } else {
      // NO SKIN ERROR
      die( '<tt><b>ERROR</b> Skin Template not found!' );
    }
    // INSERT ERROR DATA
    $login_template = str_replace( '{$wrong}',  $wrong,  $login_template );
    $login_template = str_replace( '{$error1}', $error1, $login_template );
    $login_template = str_replace( '{$error2}', $error2, $login_template );
    $login_template = str_replace( '{$error3}', $error3, $login_template );
    // HTML TO BROWSER
    die( $login_template );
  }
}

// ---------------------------------------------------------------------------------------------- //
// HELPER --------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

// VISITOR IP
function ip() {
  if ( !empty( $_SERVER['HTTP_CLIENT_IP'] ) ) $ip = $_SERVER['HTTP_CLIENT_IP'];
  elseif ( !empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  else $ip = $_SERVER['REMOTE_ADDR'];
  if ( $ip == '::1' ) $ip = '127.0.0.1'; // IP6 FIX http://php.net/manual/en/function.inet-ntop.php
  return $ip;
}

// CHECK IF IP IS IN ARRAY
function ip_in_array( $array ) {
  if ( array_search( ip(), $array ) !== FALSE ) return ' show';
}

// LOGOUT
function logout() {
  // INI SESSION
  session_start();
  // UNSET SESSION VARs
  $_SESSION = array();
  // DEL SESSION COOKIE
  if ( ini_get( "session.use_cookies" ) ) {
    $cookie = session_get_cookie_params();
    setcookie(
      session_name(),
      '',
      time() - 42000,
      $cookie["path"],
      $cookie["domain"],
      $cookie["secure"],
      $cookie["httponly"]
    );
  }
  // DESTROY SESSION
  session_destroy();
  // BACK TO PAGE
  if ( isset( $_GET['logout'] ) && isset($_SERVER['HTTP_REFERER']) ) {
    header( 'Location:' . htmlspecialchars( $_SERVER['HTTP_REFERER'] ) );

  }
  // FOR SAFETY
  die();
}
