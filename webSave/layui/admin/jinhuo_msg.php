<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<table class="layui-table table_jinhuo">
		<tr>
		<td>货物号</td>
		<td>进货数量</td>
		<td>进货时间</td>
		<td>进货人员</td>
		<td>编辑删除</td>
		</tr>
		<?php
		require("public.php");
		$sel = "select * from jinhuo";
		if(mysqli_query($sql,$sel))
		{
			$result=mysqli_query($sql,$sel);
			if(mysqli_num_rows($result)!=0)
			{
				while($res = mysqli_fetch_array($result))
				{
				echo '<tr>'.'<td>'.$res['id_huowu'].'</td>'.'<td>'.$res['num_huowu'].'</td>'.'</td>'.'<td>'.$res['time_jinhuo'].'<td>'.$res['name_saler'].'</td>'.'<td>'.'<a href="javascript:;">'.'修改'.'</a>'.'<a style="margin-left:5px;" href="javascript:;">'.'删除'.'</a>'.'<a href="javascript:;" style="margin-left:5px;">'.'确定'.'</a>'.'</td>'.'</tr>';
				}
			}
			else
			{
				echo "false";
			}
		}
		?>
	</table>

<table class="layui-table table_chuhuo">
<tr>
<td>货物号</td>
<td>出货数量</td>
<td>出货时间</td>
<td>出货人员</td>
<td>编辑删除</td>
</tr>
<?php
require("public.php");
$sel = "select * from chuhuo";
if(mysqli_query($sql,$sel))
{
	$result=mysqli_query($sql,$sel);
	if(mysqli_num_rows($result)!=0)
	{
		while($res = mysqli_fetch_array($result))
		{
		echo '<tr>'.'<td>'.$res['id_huowu'].'</td>'.'<td>'.$res['num_huowu'].'</td>'.'</td>'.'<td>'.$res['time_chuhuo'].'<td>'.$res['name_saler'].'</td>'.'<td>'.'<a href="javascript:;">'.'修改'.'</a>'.'<a style="margin-left:5px;" href="javascript:;">'.'删除'.'</a>'.'<a href="javascript:;" style="margin-left:5px;">'.'确定'.'</a>'.'</td>'.'</tr>';
		}
	}
	else
	{
		echo "false";
	}
}
?>
</table>


<table class="layui-table table_all">
<tr>
<td>货物号</td>
<td>进货数量</td>
</tr>
<?php
require("public.php");
// 查询每个表中id相等的货物的数量
$select_jinhuo = "select sum(num_huowu) from jinhuo where jinhuo.id_huowu = jinhuo.id_huowu";
$select_出货 = "select sum(num_huowu) from chuhuo where chuhuo.id_huowu = chuhuo.id_huowu";
?>
</table> 
</body>
</html>