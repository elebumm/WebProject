<?php
	session_start();
	header('Refresh: 3; URL=user_page.php');
?>
<!DOCTYPE html>
<html>

<body>



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
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName']; 
	$email = $_POST['email']; 

	$sql = "UPDATE users SET FirstName='$firstName', LastName = '$lastName', Email = '$email' WHERE UserName = '$username'";

	if (mysqli_query($conn, $sql)) {
		echo "Account updated successfully";
	} else {
		echo "Error updating account: " . mysqli_error($conn);
	}

	$conn->close();

?>

</body>
</html>
