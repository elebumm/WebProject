<?php
	session_start();	
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
	
	$userName = $_POST['username'];
	$password = $_POST['password']; //MD5 this
	
	$sql = "SELECT username, password FROM users WHERE username = '$userName'";
	$result = $conn->query($sql);
	

    // output data of each row
    while($row = $result->fetch_assoc()) {
	    echo $row["username"] . "<br>";
			if (md5($password) == $row["password"])
			{
				echo "Login Successful";
				//TODO: Login Successful
				
				$_SESSION['username'] = $userName;
				$_SESSION['logged_in'] = TRUE;
				header('Refresh: 2; URL=user_page.php');
			}else {
				echo "Incorrect password.";
				header('Refresh: 2; URL=login.html');
			}
    }

	$conn->close();
		

?>

</body>
</html>
