<?php
  session_start();
  if(isset($_SESSION["username"])){
    header("Location:./archive.php?success=welcome");
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
    <h1>Login</h1>
    <form method="POST" action="./includes/login.php">
         <input type="text" name="username"/>
         <input type="password" name="password"/>
         <button type="submit" name="login">Login</button>
    </form>
</body>
</html>