<?php
    if ( isset($_GET['skin']) ) $skin=(int)$_GET['skin'];else $skin=1;
    include('easy-protect.php');
    $options = array(
        'skin'     => $skin,
        'md5'      => true,
        #'block'   => array('127.0.0.1','95.222.76.152'),
        'attempts' => 3,
        'timeout'  => 60,
        #'bypass'  => array('127.0.0.1','95.222.76.152'),
    );
    // USE '21232f297a57a5a743894a0e4a801fc3' INSTEAD OF 'admin'
    // USE 'fe01ce2a7fbac8fafaed7c982a04e229' INSTEAD OF 'demo'
    protect(array('21232f297a57a5a743894a0e4a801fc3','fe01ce2a7fbac8fafaed7c982a04e229'), $options);
    # protect(array('admin','demo'), $options);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Easy Password Protection # 2</title>
    <meta name="robots" content="noindex, nofollow, noarchive">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/prism.css">
    <link rel="stylesheet" href="assets/hack.css?t=<?php echo time();?>">
    <link rel="stylesheet" href="assets/standard.css?t=<?php echo time();?>">
  </head>
  <body class="standard" style="background-color:white;">
    <div class="main container">
      <h1>Easy Password Protection (Test Page # 2)</h1>
      <blockquote>
        With this Script you have a very easy way to protect your webpage content with a password <br>
        just by adding one line of PHP-Code to your page source. <br>
        This Script will show each visitor a password entry form and <br>
        forces every visitor of your page to enter the correct password <br>
        bevore seeing your privat content.
      </blockquote>
      <h2>Features</h2>
      <ul>
        <li> No complicated configuration, no database and no installation necessary </li>
        <li> The complete library is in a single file, so it is easy to handle </li>
        <li> It's so easy to use, you need only one line of code to use the basic feature </li>
        <li> The Responsiv Design works perfectly on Mobile, Tablet and PC </li>
        <li> Comes with 8 ready to use Design-Skins </li>
        <li> Runs ligning fast </li>
        <br>
        <li> <b>Expert Functions are</b>
          <ul>
            <li> MD5-Encryption </li>
            <li> Skin Change </li>
            <li> IP-Blocking </li>
            <li> Failure-Limit </li>
            <li> Set Timeout </li>
            <li> IP-Bypass </li>
          </ul>
         </li>
      </ul>
      <h3>Easy Use</h3>
      <p>
        The following simple PHP-Code line in the first line of your PHP Page
        will protect your content with the password 'demo' and will use design skin No. 1!
      </p>
      <pre><code class="lang-php">&lt;?php include'easy-protect.php';protect('demo');?&gt;</code></pre>
      or use this for more than one password:
      <pre><code class="lang-php">&lt;?php include'easy-protect.php';protect(array('admin','demo'), $options);?&gt;</code></pre>
      <h3>Expert Use</h3>
      <p>
        <span class="btn-warning">&nbsp;md5 </span>&nbsp;
        The following Code at the beginning of your Page
        will protect your content with the password '1235'<br>
        <small style="padding-left:65px;">As '81dc9bdb52d04dc20036dbd8313ed055' is the MD5 encryption for '1234'</small><br>
        <br>
        <span class="btn-warning">&nbsp;skin </span>&nbsp;
        Also it will use Design Skin No. 6<br>
        <br>
        <span class="btn-warning">&nbsp;block </span>&nbsp;
        It will block two IPs from being allowed to use the login ('95.222.76.151' and '95.222.76.152')<br>
        <br>
        <span class="btn-warning">&nbsp;attempts </span>&nbsp;
        It will limit the number of wrong login attempts to 3 times <br>
        <small style="padding-left:110px;">After 3 wrong attempts the user will be blocked for 30 Minutes (defaut value)!</small><br>
        <br>
        <span class="btn-warning">&nbsp;timeout </span>&nbsp;
        Set the time-period that users will be blocked after a wrong login attempt <b>AND</b><br>
        <span style="padding-left:100px;">the time-period till the logged-in user will automatically logged-out!</span><br>
        <br>
        <span class="btn-warning">&nbsp;bypass </span>&nbsp;
        And it will automatically bypass user with the given IPs e.g. '127.0.0.1' = localhost
      </p>
      <pre><code class="lang-php">&lt;?php
    include('easy-protect.php');
    $options = array(
        'md5'      => true,
        'skin'     => 6,
        'block'    => array('95.222.76.151','95.222.76.152'),
        'attempts' => 3,
        'timeout'  => 60,
        'bypass'   => array('127.0.0.1'),
    );
    protect('81dc9bdb52d04dc20036dbd8313ed055', $options); // PASSWORD = 1234
?&gt;</code></pre>
      <div class="alert alert-info">
        <b>HINT</b> &mdash;
        You can use all features in the options array or only some of them e.g. only the skin option!<br>
        AND if you use MD5, use it on all Pages or you vistor must login for each page again!
      </div>

      <p>&nbsp;</p>
      <a href="easy-protect.php?logout=true">LOGOUT</a>
      <hr>
      <div style="float:right">
        <small>powered by <a href="http://www.adilbo.com/">adilbo.com</a></small>
        <p>&nbsp;</p>
      </div>
      <script src="assets/prism.js" async></script>
    </div>
  </body>
</html>
