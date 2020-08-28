<?php
    $host = "db";
    $dbUsername = "root";
    $dbpassword = "123root123";
    // $dbpassword = "Meiven212!";
    $dbname = "web";
    
    $conn = new mysqli($host, $dbUsername, $dbpassword, $dbname);
    
    if (mysqli_connect_error()) 
    {
        die('Connect Error('. mysqli_connect_errno().')'. mysqli_connect_error());
    }
?>