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
		
	<!--DataTables css-->
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.3/css/jquery.dataTables.css">
		
	<!-- Handlebars --> 
	<script src="http://cloud.github.com/downloads/wycats/handlebars.js/handlebars-1.0.0.beta.6.js"></script>
		
	<!-- Handlebars Helpers  -->
	<script src="js/helpers.js"></script>
		
	<!-- jQuery -->
	<script src="js/jquery-2.1.1.min.js"></script>

	<!--Products js-->
	<script src="js/navbar.js"></script>
	<script src="js/products.js"></script>
		
	<!-- DataTables-->				
	<script type="text/javascript" src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../../media/js/dataTables.editor.min.js"></script>
	
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
   <th scope='col' id='tableHead'>Picture</th>
   <th scope='col' id='tableHead'>Title</th>
<th scope='col' id='tableHead'>Platform</th>
<th scope='col' id='tableHead'>Language</th>
<th scope='col' id='tableHead'>Developer</th>
<th scope='col' id='tableHead'>Publisher</th>
<th scope='col' id='tableHead'>Rating</th>
<th scope='col' id='tableHead'>Genre</th>
<th scope='col' id='tableHead'>Price</th>
 </tr>";

while($res = mysqli_fetch_array($sql))
 {
	echo "<tr><td><img src='" . $res['picture_link'] .  "' width='80px' height='100px'></td><td>" . $res['title'] . "</td><td>" . $res['platform'] . "</td><td>" . $res['glanguage'] . "</td><td>" . $res['developer'] . "</td><td>" . $res['publisher'] . "</td><td>" . $res['rating'] . "</td><td>" . $res['genre'] . "</td><td>" . $res['price'] . "</td></tr>"; 
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
