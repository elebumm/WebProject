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
