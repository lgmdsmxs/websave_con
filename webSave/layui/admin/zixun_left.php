<?php
require("public.php");
$zixun_img_left = $_POST["zixun_img_left"];
$zixun_p_left = $_POST["zixun_p_left"];
$insert = "insert into zixun_left(zixun_img_left,zixun_p_left) values('$zixun_img_left','$zixun_p_left')";
if(mysqli_query($sql,$insert))
{
	echo "yes";
}
else
{
	echo "no";
}