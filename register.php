<?php

// Create connection
$con=mysqli_connect("localhost", "Scott", "hello", "skalez_games");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


	$firstName = $_POST['firstnamesignup'];
	$lastName = $_POST['lastnamesignup'];
	$userName = $_POST['usernamesignup'];
	$password = $_POST['passwordsignup']; //MD5 this
	$passwordConfirm = $_POST['passwordsignup_confirm'];//MD5 this
	$email = $_POST['emailsignup'];
	$gender = $_POST['gender'];
	
	mysqli_query($con,"INSERT INTO users (FirstName, LastName, UserName, Password, Email, Gender)
	VALUES ('$firstName', '$lastName' , '$userName' , '$password', '$email' , '$gender')");
	
	echo "Record added";


	mysqli_close($con);



?>
