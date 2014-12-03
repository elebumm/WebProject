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
	
	$userName = $_SESSION['username'];	
	$email = $_POST['email'];
	if ( $_POST['newPassword'] == "")
		$newPassword = md5($_POST['oldPassword']);
	else	
		$newPassword = md5($_POST['newPassword']); 

	$sql = "UPDATE users SET Email = '$email', Password = '$newPassword'
			WHERE UserName = '$userName'";

	if (mysqli_query($conn, $sql)) {
		echo "Account updated successfully";
	} else {
		echo "Error updating account: " . mysqli_error($conn);
	}

	$conn->close();

?>

</body>
</html>
