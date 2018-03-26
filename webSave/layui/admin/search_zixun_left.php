<?php
require("public.php");
$select = "select * from zixun_left";
$result = mysqli_query($sql,$select);
while ($arr = mysqli_fetch_array($result)) 
{	
	static $data = array();
	$array_one = array($arr['zixun_img_left'],$arr['zixun_p_left']);
	$data = array_merge_recursive($data,$array_one);
}
echo json_encode($data);