<?php
session_start();
header('Refresh: 2; URL=login.html');
?>
<!DOCTYPE html>
<html>
<body>


<?php
session_unset(); 
session_destroy(); 
echo "Logged Out Successfully";
?>

</body>
</html>
