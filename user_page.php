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
	<link href="css/background.css" rel="stylesheet">
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	
	<script src="js/jquery-2.1.1.min.js"></script>
		
</head>
<body id="user_page">
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
          <a class="navbar-brand" href="index.html"><img id="logo" src="logo.jpg"></a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="products.php">Games</a></li>
            <li><a href="about.html">About</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Account <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
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
	 		<h1>Your Account!</h1>

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
	
	if ($_SESSION['logged_in']){
			
			$user = $_SESSION['username'];
			
			$sql = "SELECT FirstName, Lastname, userName, password, email, gender FROM users WHERE username = '$user'";
			$result = $conn->query($sql);
			
				// output data of each row
		    while($row = $result->fetch_assoc()) {       
						?>
						<div id="edit_account">
							<form action="edit_account.php" method="post">
								<h2>Edit Account Info</h2>
								<table>
									<tbody>
										<tr>
											<td class="labels">Username:</td>
											<td><?php echo $row["userName"]; ?></td>	
										</tr>
										<tr>
											<td class="labels">First Name:</td>
											<td><?php echo $row["FirstName"]; ?></td>	
										</tr>
										<tr>
											<td class="labels">Last Name:</td>
											<td><?php echo $row["Lastname"]; ?></td>	
										</tr>
										<tr>
											<td class="labels">Gender:</td>
											<td><?php echo $row["gender"]; ?></td>	
										</tr>
										<tr>
											<td class="labels">Email:</td>
											<td><input name="email" type="email" value="<?php echo $row["email"]; ?>" ></td>	
										</tr>
										<tr>
											<td class="labels">Current Password:</td>
											<td><input name="oldPassword" type="password" required="require"></td>	
										</tr>
										<tr>
											<td class="labels">New Password:</td>
											<td><input name="newPassword" type="password"></td>	
										</tr>
									</tbody>
								</table>							
								<input type="submit" id = "submit" name="submit" value="Edit Account"/>					 			
							</form>
							<a href="logout.php"><button id="submit">Log out</button></a>
						</div>	
						<?php
		    }
		   }else {
		   		echo "You are not logged in! <a href='login.html'>Log in.</a>";
		   }		 

	$conn->close();
	
?>

</section>
</body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>
</html>
