<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Users</title>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	<!--
	Title: SkalezGames
	Version: 2.0
	Date: Oct 31, 2014
	-->
</head>
<body>
	

<?php
	$con=mysqli_connect("localhost","Scott","hello","skalez_games");
	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$result = mysqli_query($con,"SELECT * FROM users");

	while($row = mysqli_fetch_row($result)) {
	  echo $row['FirstName'];
	  echo "<br>";
	}

	mysqli_close($con);
?>

</body>
</html>
