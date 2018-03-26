<?php 
require("public.php");
$add_one = $_POST['add_one'];
$add_two = $_POST['add_two'];
$add_three = $_POST['add_three'];
$add_four = $_POST['add_four'];
$arr = $_POST['update'];
$update = "update jinhuo set id_huowu='$add_one',num_huowu='$add_two',time_jinhuo='$add_three',name_saler='$add_four' where id_huowu='$arr[0]' and num_huowu='$arr[1]' and time_jinhuo='$arr[2]' and name_saler='$arr[3]' ";
if(mysqli_query($sql,$update))
{
	echo "yes";
}
else
{
	echo "no";
}