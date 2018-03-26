<?php
require("public.php");
$id_huowu = $_POST["id_huowu"];
$num_huowu = $_POST["num_huowu"];
$time_jinhuo = $_POST['time_jinhuo'];
$name_saler = $_POST['name_saler'];
$insert = "insert into jinhuo(id_huowu,num_huowu,time_jinhuo,name_saler) values('$id_huowu','$num_huowu','$time_jinhuo','$name_saler')";
if(mysqli_query($sql,$insert))
{
	echo "yes";
}
else
{
	echo "no";
}