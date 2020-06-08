<?php
// function callback($buffer) {
//   return (ereg_replace("apples", "oranges", $buffer));
// }
// ob_start("callback");
if(isset($_POST['login']))
{
  require './db.php';
  $name= $_POST['username'];
  $passwd= $_POST['password'];
  if(empty($name) || empty($passwd))
  {
    header("Location:../login.php?error=lempty");
    exit();
  }
  else
  {
  	$sql="SELECT * FROM w1users WHERE username=?";
  	$stmt=mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt,$sql))
    {
     header("Location:../login.php?error=ldberror");
     exit();	
    }
    else
    {
    	mysqli_stmt_bind_param($stmt, "s", $name);
    	mysqli_stmt_execute($stmt);
    	$rows=mysqli_stmt_get_result($stmt);
        if($row=mysqli_fetch_assoc($rows))
        {
        $hashpwd=$row['password'];
         if(strcmp($hashpwd, $passwd) == 0)
           {
               session_start();
               $_SESSION['username']=$row['username'];
               setcookie("record", $row['record'], time() + (86400 * 30), "/");
               header("Location:../archive.php?success=welcome");
               exit();
           }
         else
           {
            	header("Location:../login.php?error=lmismatch");
                exit();
           }     
        }
        else
        {
       	header("Location:../login.php?error=lnousr");
        exit();
        }
    }
  }
}
else
{
  header("Location:../login.php?msg=wrongPost");
  exit();
}
// ob_end_flush();
?>