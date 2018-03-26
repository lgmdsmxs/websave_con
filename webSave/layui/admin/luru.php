<?php
require("public.php");
$id_huowu = $_POST["id_huowu"];
$num_huowu = $_POST["num_huowu"];
$insert = "insert into kucun(id_huowu,num_huowu) values('$id_huowu','$num_huowu')";
if(mysqli_query($sql,$insert))
{
	echo "yes";
}
else
{
	echo "no";
}