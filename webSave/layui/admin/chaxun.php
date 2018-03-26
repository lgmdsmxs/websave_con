<?php 
require("public.php");
$username = $_POST['username'];
$select = "select sum(num_huowu) as num from chuhuo where '$username'=id_huowu ";
$result = mysqli_query($sql,$select);
while ($value = mysqli_fetch_array($result)) 
{
	$a = $value['num'];
}
$select_con = "select sum(num_huowu) as num_con from jinhuo where '$username'=id_huowu ";
$result_con = mysqli_query($sql,$select_con);
while ($value_con = mysqli_fetch_array($result_con)) 
{
	$b = $value_con['num_con'];
}
$select_ini = "select num_huowu from kucun where '$username'=id_huowu ";
$result_ini = mysqli_query($sql,$select_ini);
while ($value_ini = mysqli_fetch_array($result_ini)) 
{
	$c = $value_ini['num_huowu'];
}
// echo $c+$b-$a;
if(mysqli_num_rows($result_ini)===0)
{
	echo "false";
	// 验证库存中货物号是否存在
}
else
{
	echo $c+$b-$a;
}