<?php
	session_start();
?>
<!DOCTYPE html>
<html>

<head>

	<meta charset="UTF-8">
	<title>SkalezGames - Edit Account</title>
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/slider.css">
	<link rel="stylesheet" href="css/styles.css">
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	
	<script src="js/jquery-2.1.1.min.js"></script>
		
</head>
<body>
	<!-- NAVIGATION BAR -->
   <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">SkalezGames</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="products.php">Games</a></li>
            <li><a href="about.html">About</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Account <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="user_page.php">View Profile</a></li>
                <li><a href="#">View Cart</a></li>
				<li><a href="logout.php">Logout</a></li>
              </ul>
            </li>
          </ul>
          <div class="btn-group" id="icons">
				    <a class="btn btn-default" href="https://facebook.com/skalezgames"><i class="fa fa-facebook"></i></a>
				    <a class="btn btn-default" href="https://twitter.com/LewisMenelaws"><i class="fa fa-twitter"></i></a>
				    <a class="btn btn-default" href="https://github.com/elebumm/WebProject"><i class="fa fa-github-alt"></i></a>
				    <a class="btn btn-default" href="https://reddit.com/r/lambtoncpro"><i class="fa fa-reddit"></i></a>
				  </div>
        </div><!--/.nav-collapse -->
      </div>
	 </div>
	 <br />
	 <section id="content">
	 		<h2>Your Account!</h2>

<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "skalez_games";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	
	$username = $_SESSION['username'];
	
	$sql = "SELECT FirstName, Lastname, username, password, email, gender FROM users WHERE username = '$username'";
	$result = $conn->query($sql);
	
	
	// output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Username: " . $row["username"] . "<br>";
		echo "First Name: " . $row["FirstName"] . "<br>";
		echo "Last Name: " . $row["Lastname"] . "<br>";
		echo "Email: " . $row["email"] . "<br>";
		echo "Gender: " . $row["gender"] . "<br>";

    }

	$conn->close();
	

?>
<br>
<div id="edit_account">
	<form action="edit_account.php" method="post">
		<h2>Edit Account Info</h2>
		<label for="firstName">First Name: </label>
		<input name="firstName" type="text">
		<br>
		<label for="lastName">Last Name: </label>
		<input name="lastName" type="text">
		<br>
		<label for="email">Email: </label>
		<input name="email" type="email">
		<br>
		<input type="submit" id = "submit" name="submit" value="Edit Account"/> 
		
	</form>
	
	<form action="edit_password.php" method="post">
		<h2>Change Password</h2>
		
		<label for="oldPassword">Enter Old Password: </label>
		<input name="oldPassword" type="password">
		<br>
		<label for="newPassword">Enter New Password: </label>
		<input name="newPassword" type="password">
		<br>
		<input type="submit" id = "submit" name="submit" value="Edit Password"/> 
	
	</form>

</div>
</section>
</body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>
</html>
