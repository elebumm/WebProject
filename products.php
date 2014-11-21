<!DOCTYPE html>
<?php
session_start();
?>
<html lang="en">
<head>
<!--
Title: SkalezGames
Version: 2.0
Date: Oct 31, 2014
-->
	<meta charset="UTF-8">
	<title>Buy Video Games - SkalezGames</title>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	
	<!-- Optional theme --> 
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="css/styles.css">
	
	<!-- Latest compiled and minified JavaScript--> 
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

	<!--Products css-->
	<link href="css/products.css" rel="stylesheet">		
		
	<!-- jQuery -->
	<script src="js/jquery-2.1.1.min.js"></script>

	<!--Navbar js-->
	<script src="js/navbar.js"></script>
		

</head>

<body>
   <div id="navbar">
		<!--Navigation bar goes here -->   
   </div>
   
    <h1>Games</h1>
   <?php

   $conn = mysqli_connect("localhost","root","") or die(mysqli_error($conn));

   mysqli_select_db($conn, "skalez_games") or die(mysqli_error($conn));

   $sql = mysqli_query($conn, "SELECT * FROM products");

   $fields_num = mysqli_num_fields($sql);

   echo "<table id='productsTable' align='center'> <tr> 
   <th scope='col' class='tableHead'>Title</th>
	<th scope='col' class='tableHead'>Platform</th>
	<th scope='col' class='tableHead'>Language</th>
	<th scope='col' class='tableHead'>Developer</th>
	<th scope='col' class='tableHead'>Publisher</th>
	<th scope='col' class='tableHead'>Rating</th>
	<th scope='col' class='tableHead'>Genre</th>
	<th scope='col' class='tableHead'>Price</th>
	 </tr>";

while($res = mysqli_fetch_array($sql))
 {
	echo "<tr><td>" . $res['title'] . "</td><td>" . $res['platform'] . "</td><td>" . $res['glanguage'] . "</td><td>" . $res['developer'] . "</td><td>" . $res['publisher'] . "</td><td>" . $res['rating'] . "</td><td>" . $res['genre'] . "</td><td>" . $res['price'] . "</td></tr>"; 
}
 echo "</table>";


mysqli_close($conn);
   ?>
   
     
</body>
		
<!--jQuery
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>-->
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>
    
</html>
