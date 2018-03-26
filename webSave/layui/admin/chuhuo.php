<?php
require("public.php");
$id_huowu = $_POST["id_huowu"];
$num_huowu = $_POST["num_huowu"];
$time_chuhuo = $_POST['time_chuhuo'];
$name_saler = $_POST['name_saler'];
$insert = "insert into chuhuo(id_huowu,num_huowu,time_chuhuo,name_saler) values('$id_huowu','$num_huowu','$time_chuhuo','$name_saler')";
if(mysqli_query($sql,$insert))
{
	echo "yes";
}
else
{
	echo "no";
}