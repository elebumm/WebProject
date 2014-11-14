<?php
	session_start();
?>
<!DOCTYPE html>
<html>

<head>

	<meta charset="UTF-8">
	<title>SkalezGames - Edit Account</title>

	<script src="js/navbar.js"></script>

</head>
<body>

   <div id="navbar">
			<!--Navigation bar goes here -->   
   </div>

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
		<input name="firstName" type="text"></input>
		<br>
		<label for="lastName">Last Name: </label>
		<input name="lastName" type="text"></input>
		<br>
		<label for="email">Email: </label>
		<input name="email" type="email"></input>
		<br>
		<input type="submit" id = "submit" name="submit" value="Edit Account"/> 
		
	</form>
	
	<form action="edit_password.php" method="post">
		<h2>Change Password</h2>
		
		<label for="oldPassword">Enter Old Password: </label>
		<input name="oldPassword" type="password"></input>
		<br>
		<label for="newPassword">Enter New Password: </label>
		<input name="newPassword" type="password"></input>
		<br>
		<input type="submit" id = "submit" name="submit" value="Edit Password"/> 
	
	</form>

</div>

</body>
</html>
