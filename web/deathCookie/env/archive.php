<?php
  session_start();
  if(!isset($_SESSION["username"])){
    header("Location:./login.php?msg=dothisfirst");
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delta CTF</title>
</head>
<body>
    <h1>Welcome back!</h1>
</body>
</html>