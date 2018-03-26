<?php
require("public.php");
$username = $_POST["username"];
$password = $_POST["password"];
$select = "select * from login where '$username'=username and '$password'=password";
$result = mysqli_query($sql,$select);
if(mysqli_num_rows($result)===0)
{
	echo "false";
}
else
{
	echo "yes";
}