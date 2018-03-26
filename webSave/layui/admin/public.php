<?php
mysqli_connect("localhost","root","root")?$sql=mysqli_connect("localhost","root","root"):exit("链接数据库失败");
mysqli_query($sql,"use websave");
mysqli_query($sql,"set names utf8");