<?php
	session_start();
?>
<!DOCTYPE html>
<html>

<head>

	<meta charset="UTF-8">
	<title>Account Info</title>
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/slider.css">
	<link rel="stylesheet" href="css/createAcc.css">
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
	<link href="css/background.css" rel="stylesheet">
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
          <a class="navbar-brand" href="index.html"><img id="logo" src="logo.jpg" alt="Home"></a>
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
	 <div  id="content">
	 		<div id="left-col">
	 			<a href="products.php">	 		
				<img src="img/CP103.jpg" title="BioShock Infinite" alt="BioShock Infinite" width="230"/>
				<p>BIOSHOCK INFINITE for PC<br />
						Available now</p>
				</a>						 		
	 		</div>
	 		<div id="middle-col">
	
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
									<p class="pageTitle">Edit Account Info</p>
									<table>
										<tbody>
											<tr>
												<td><label>Username:</label></td>
												<td><?php echo $row["userName"]; ?></td>	
											</tr>
											<tr>
												<td><label>First Name:</label></td>
												<td><?php echo $row["FirstName"]; ?></td>	
											</tr>
											<tr>
												<td><label>Last Name:</label></td>
												<td><?php echo $row["Lastname"]; ?></td>	
											</tr>
											<tr>
												<td><label>Gender:</label></td>
												<td><?php echo $row["gender"]; ?></td>	
											</tr>
											<tr>
												<td><label>Email:</label></td>
												<td><input name="email" type="email" value="<?php echo $row["email"]; ?>" ></td>	
											</tr>
											<tr>
												<td><label>Current Password:</label></td>
												<td><input name="oldPassword" type="password" required="required"></td>	
											</tr>
											<tr>
												<td><label>New Password:</label></td>
												<td><input name="newPassword" type="password"></td>	
											</tr>
										</tbody>
									</table>							
									<input type="submit" class = "submit" name="submit" value="Edit Account"/>				 			
								</form>								
							</div>	
							<?php
			    }
			   }else {
			   		echo "You are not logged in! <a href='login.html'>Log in.</a>";
			   }		 
	
		$conn->close();
		
	?>	
	 		</div>
	 		<div id="right-col">
	 			<a href="products.php">
					<img src="img/NO101.jpg" title="Bayonetta 2" alt="Bayonetta 2" width="230"/>
					<p>Bayonetta 2<br />
						 Shop now</p>
				</a>	
	 		</div>
	 	
	 </div> 
</body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>
</html>
