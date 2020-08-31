**DeathCookie**
============


  * Prepared SQL statements are used which removes the possibilities for SQL injections.
  * == is used in an **if condition**. Due to type juggling we might pass this loop without the actual password
  * strcmp() function.



> strcmp requires 2 strings as arguements. 
> When an array or object instance is passed, it returns **NULL**.
> Change the **password** input field name from "password" to "password[0]".
> Due to type juggling **NULL** == 0 results in **TRUE**.

