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

	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/slider.css">
	<link rel="stylesheet" href="css/styles.css">
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
	
	<!--Products css-->	
	<link rel="stylesheet" href="https://cdn.datatables.net/plug-ins/9dcbecd42ad/integration/bootstrap/3/dataTables.bootstrap.css">
	<link href="css/products.css" rel="stylesheet">
	
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		
	<script src="js/jquery-2.1.1.min.js"></script>
	<!--Navbar js-->
	<script src="js/navbar.js"></script>

	<!-- jQuery -->	
	<script src="https://cdn.datatables.net/1.10.4/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/plug-ins/9dcbecd42ad/integration/bootstrap/3/dataTables.bootstrap.js"></script>
	
	<script>
		$(document).ready(function() {
	    $('#productsTable').dataTable();
		} );
	</script>	
	
</head>

<body>
   <div id="navbar">
		<!--Navigation bar goes here -->   
   </div>
   <br />
   
    <h1>Games</h1>
   <?php

   $conn = mysqli_connect("localhost","root","") or die(mysqli_error($conn));

   mysqli_select_db($conn, "skalez_games") or die(mysqli_error($conn));

   $sql = mysqli_query($conn, "SELECT * FROM products");

   $fields_num = mysqli_num_fields($sql);

   echo "<table id='productsTable' align='center'> <tr> 
   <th scope='col' colspan='2' class='tableHead'>Title</th>
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
	echo "<tr><td><img src='" . $res['picture_link'] .  "' width='80px' height='100px'></td><td class='bold'>" . $res['title'] . "</td><td class='centre'>" . $res['platform'] . "</td><td>" . $res['glanguage'] . "</td><td>" . $res['developer'] . "</td><td>" . $res['publisher'] . "</td><td class='centre'>" . $res['rating'] . "</td><td>" . $res['genre'] . "</td><td class='bold'>" . $res['price'] . "</td></tr>"; 
}
 echo "</table>";


mysqli_close($conn);
   ?>
   
     
</body>
		
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>-->
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>
        
</html>
