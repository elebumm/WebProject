<?php



$firstName = $_POST['firstnamesignup'];
$lastName = $_POST['lastnamesignup'];
$userName = $_POST['usernamesignup'];
$password = $_POST['passwordsignup']; //MD5 this
$passwordConfirm = $_POST['passwordsignup_confirm'];//MD5 this
$email = $_POST['emailsignup'];
$yearOfBirth = $_POST['month'];
$dayOfBirth = $_POST['day'];
$MonthOfBirth = $_POST['year'];


echo "First Name: " . $firstName . "\n";
echo "Last Name: " . $lastName . "\n";
echo "Username: " . $userName . "\n";
echo "Password: " . $password . "\n";
echo "Confirmed Password: " . $passwordConfirm . "\n";
echo "Email: " . $email . "\n";
echo "Year: " . $yearOfBirth . "\n";
echo "Day: " . $dayOfBirth . "\n";
echo "Month: " . $MonthOfBirth "\n";

?>
