<!DOCTYPE html>

<html lang="en">
<head>

	<meta charset="UTF-8">
	<meta http-equiv="refresh" content="0;url=../index.html">
	
	<script language="javascript">
		window.location.href = "../index.html"
	</script>
	
	<title>Loading</title>
		
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

	<!-- Optional theme --> 
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="css/styles.css">
	
	
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/navbar.js"></script>
	
	<!-- CSS for login section -->
	<link rel="stylesheet" href="css/login.css">

</head>

<body>

</body>

</html>


<?php

// Create connection
$con=mysqli_connect("localhost", "root", "", "skalez_games");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


	//TODO: Add Validation for Password and email regex.
	$firstName = $_POST['fName'];
	$lastName = $_POST['lName'];
	$userName = $_POST['uName'];
	$password = md5($_POST['password']);
	$passwordConfirm = md5($_POST['password_confirm']);
	$email = $_POST['email'];
	$gender = $_POST['gender'];
	$newsletter = $_POST['newsletter'];
	$auth = "member";
	
	$sql = "SELECT username, password FROM users WHERE username = '$userName'";
	$result = $con->query($sql);
	

    // output data of each row
        $row = $result->fetch_assoc();
		if ($row['username'] == $userName)
		{
			// Prevents Duplicate Usernames.
			// TODO: Handle Error
	
		}
		else
		{
			mysqli_query($con,"INSERT INTO users (FirstName, LastName, UserName, Password, Email, Gender, privilege, get_emails)
			VALUES ('$firstName', '$lastName' , '$userName' , '$password', '$email' , '$gender', '$auth', '$newsletter')");
			
			echo "Registration Successful. Redirecting you back to Skalez Games.";
			
			$to      = $email;;
			$subject = 'SkalezGames Email Verification';
			$message = 'TEST';
			$headers = 'From: no-reply@skalezgames.com' . "\r\n" .
			'Reply-To: no-reply@skalezgames.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers);
		}
 
	
	
	mysqli_close($con);



?>
