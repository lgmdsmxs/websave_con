<?php 
require("public.php");
$delete = $_POST["delete"];
$select = "delete from chuhuo where id_huowu='$delete[0]' and num_huowu='$delete[1]' and time_chuhuo='$delete[2]' and name_saler = '$delete[3]' ";
if(mysqli_query($sql,$select))
{
	echo "yes";
}
else
{
	echo "no";
}