<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Easy Password Protection</title>
    <meta name="robots" content="noindex, nofollow, noarchive">
    <link rel="stylesheet" href="assets/hack.css?t=<?php echo time();?>">
    <link rel="stylesheet" href="assets/standard.css?t=<?php echo time();?>">
    <style>
      .navi {width:100%;height:50px;min-height:50px;line-height:20px;text-align:center;background:black;color:white;padding-top:15px;}
      iframe{width:100%;height:100%;min-height:300px;border:none;}
    </style>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>
      $(document).ready(function(){$('#design').change(function(){var v=$('#design').val();$('#frame').attr('src','test.php?skin='+v);});});
    </script>
    </head>
    <body>
        <div class="navi">Choose a Design 
            <select id="design" style="padding:3px;">
                <option value="1">Design-Skin 1 </option>
                <option value="2">Design-Skin 2 </option>
                <option value="3">Design-Skin 3 </option>
                <option value="4">Design-Skin 4 </option>
                <option value="5">Design-Skin 5 </option>
                <option value="6">Design-Skin 6 </option>
                <option value="7">Design-Skin 7 </option>
                <option value="8">Design-Skin 8 </option>
            </select>
            &nbsp; &nbsp; <a style="padding:3px;" href="easy-protect.php?logout=true">RESET</a>
            &nbsp; &nbsp; Password: admin
        </div>
        <iframe id="frame" src="test.php?skin=1"></iframe>
    </body>
</html>