<?php
	session_start();

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
			echo "Username already exists. Please choose another.";
			header('Refresh: 2; URL=create_account.html');
	
		}
		else if ($password !== $passwordConfirm)
		{
			echo "The password fields must match.";
			header('Refresh: 2; URL=create_account.html');
			
		}	
		else
		{
			mysqli_query($con,"INSERT INTO users (FirstName, LastName, UserName, Password, Email, Gender, privilege, get_emails)
			VALUES ('$firstName', '$lastName' , '$userName' , '$passwordConfirm', '$email' , '$gender', '$auth', '$newsletter')");
			
			echo "Registration Successful";
			
			$to      = $email;;
			$subject = 'SkalezGames Email Verification';
			$message = 'TEST';
			$headers = 'From: no-reply@skalezgames.com' . "\r\n" .
			'Reply-To: no-reply@skalezgames.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers);
			
			$_SESSION['username'] = $userName;
			$_SESSION['logged_in'] = TRUE;
			header('Refresh: 2; URL=user_page.php');
		}
 	
	mysqli_close($con);

?>
