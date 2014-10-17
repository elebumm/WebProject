<!DOCTYPE html>

<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Login - SkalezGames</title>
	
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	
	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/navbar.js"></script>
	
</head>

<body>


   <div id="navbar">
   
   </div>
   
   <div class="jumbotron">
   <div id="content">
   <form  action="register.php" autocomplete="on" method="post"> 
    <h1> Sign up </h1> 
    <p> 
         <label for="firstnamesignup" class="fname" data-icon="u">First Name:</label>
         <input id="firstnamesignup" name="firstnamesignup" required="required" type="text" placeholder="First" />
    </p>
    <p> 
         <label for="lastnamesignup" class="lname" data-icon="u">Last Name:</label>
         <input id="lastnamesignup" name="lastnamesignup" required="required" type="text" placeholder="Last" />
    </p>
    <p> 
         <label for="usernamesignup" class="uname" data-icon="u">Username:</label>
         <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="Username" />
    </p>
    <p> 
         <label for="passwordsignup" class="youpasswd" data-icon="p">Password:</label>
         <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="Password"/>
    </p>
    <p> 
         <label for="passwordsignup_confirm" class="password" data-icon="p">Confirm Password:</label>
         <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="Password"/>
    </p>
    <p> 
         <label for="emailsignup" class="youmail" data-icon="e" >Email:</label>
         <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="example@domain.com"/> 
    </p>
        
    <p> 
         <label>Gender:</label>
         <select name="gender">
         <option value="male">Male</option>
         <option value="female">Female</option>
         </select>
    </p>
    <p class="signin button"> 
    <input type="submit" value="Register"/> 
    </p>
</form>
   
   </div>
   
   </div>
   

  
</body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>

</html>
