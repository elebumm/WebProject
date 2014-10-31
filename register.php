<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Register a user</title>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	<!--
	Title: SkalezGames
	Version: 2.0
	Date: Oct 31, 2014
	-->
</head>
<body>
	
<?php

// Create connection
$con=mysqli_connect("localhost", "Scott", "hello", "skalez_games");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


	$firstName = $_POST['fName'];
	$lastName = $_POST['lName'];
	$userName = $_POST['uName'];
	$password = $_POST['password']; //MD5 this
	$passwordConfirm = $_POST['password_confirm'];//MD5 this
	$email = $_POST['email'];
	$gender = $_POST['gender'];
	
	mysqli_query($con,"INSERT INTO users (FirstName, LastName, UserName, Password, Email, Gender)
	VALUES ('$firstName', '$lastName' , '$userName' , '$password', '$email' , '$gender')");
	
	echo "Record added";


	mysqli_close($con);
	
/* An alternative code
	$ShowForm = FALSE;
$fields = array('fName', 'lName', 'uName', 'password_confirm', 'email', 'gender');
$report = array();
foreach ($fields as $field)
     $report[$field]="";
if (isset($_POST['submit'])) {
     foreach ($fields as $field) {
          if ((!isset($_POST[$field])) || (strlen(trim(($_POST[$field])))==0)) {
               echo "<p>'$field' is a required field.</p>\n";
               $ShowForm=TRUE;
          }
          else {
               $report[$field]=stripslashes(trim($_POST[$field]));
          }
     }
     if ($ShowForm===FALSE) {
          $DBConnect = @mysql_connect("http://72.167.233.112", "team04project", "Pass4team04!");
          if ($DBConnect === FALSE)
               echo "<p>Unable to connect to the database server.</p>\n" . "<p>Error code " . mysql_errno()
                  . ": " . mysql_error() . "</p>\n";
          else {
               $DBName = "team04project";
               if (!@mysql_select_db($DBName, $DBConnect))
                    echo "<p>Unable to connect to the $DBName database!</p>";
               else {
                    $TableName = "user";
                    $fieldstr="";
                    $valuestr="";
                    $connector="";
                    foreach ($fields as $field) {
                         $fieldstr .= $connector . $field;
                         $valuestr .= $connector . "'" . $report[$field] . "'";
                         $connector=", ";
                    }
                    $SQLString = "INSERT INTO $TableName (" . $fieldstr .
                         ") VALUES ($valuestr)";
                    $QueryResult = @mysql_query($SQLString, $DBConnect);
                    if ($QueryResult === FALSE)
                         echo "<p>There was an error saving the record.<br />\n" .
                              "The error was " . htmlentities(mysql_error($DBConnect)) .
                              ".<br />\nThe query was '" .  htmlentities($SQLString) . "'</p>\n";
                    else {
                         echo "<p>You are now registered.</p>\n";
                    }
               }
          }
     }
}
else {
     $ShowForm=TRUE;
}

*/
?>
</body>
</html>
