layui.use(["element","jquery","carousel","form","layer","laydate","table"],function(){
	var element = layui.element;
	var $ = layui.jquery;
	var carousel = layui.carousel;
	var form = layui.form;
	var layer = layui.layer;
	var laydate = layui.laydate;
	var table = layui.table;
	carousel.render({
		elem:"#carousel",
		width:"100%",
		interval:3000,
		arrow:"always"
	});
	// login
	form.verify({
		username:[/^[\S]{6,12}$/,"请输入6-12个字符"],
		password:[/^[\S]{6,12}$/,"请输入6-12个字符"],

	});
	function yzm()
	{	
		var str = "";
		var sjYzm = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n',
		'o','p','q','r','s','t','u','v','w','x','y','z'];
		for(let i = 0;i < 4;i++)
		{
			var j = parseInt(Math.random()*sjYzm.length); //
			str = str + sjYzm[j];

		}
		 return str.toUpperCase();
	}
	$(".yzm").attr("value",yzm());
	$(".yzm").on("click",function(){
		$(this).attr("value",yzm);
	});
	form.on("submit(login)",function(data){
		var check_yzm = $(".check_yzm").val();
		var yzm = $(".yzm").attr("value");
		if(check_yzm==="")
		{
			layer.msg("验证码不能为空",{icon:5});
			$(".check_yzm").focus();
		}
		else if(check_yzm.toUpperCase()!==yzm)
		{
			layer.msg("验证码错误",{icon:5});
			$(".check_yzm").focus();
		}
		else
		{
			$.post("login.php",data.field,function(data,status){
				if(data==="false")
				{
					layer.msg("账号密码错误",{icon:5});
				}
				else
				{
					location.href="admin.html";
				}
			});
		}
	});

	// luru
	form.on("submit(luru)",function(data){
		$.post("luru.php",data.field,function(data,status){
			if(data==="yes")
			{
				layer.msg("success",{icon:1,time:2000});
				// 清空表单
				$("input").val("");
			}
			else
			{
				layer.msg("您已经录入过了",{icon:5,time:2000});
				$("input").val("");
			}
		});

	});
	// luru_jinhuo
	laydate.render({
		elem:"#jinhuo_time",
		type:"datetime"
	});
	laydate.render({
		elem:"#chuhuo_time",
		type:"datetime"
	});
	form.on("submit(luru_jinhuo)",function(data){
		$.post("jinhuo.php",data.field,function(data,status){
			if(data==="yes")
			{
				layer.msg("success",{icon:1,time:2000});
				$("input").val("");
			}
			else
			{
				layer.msg("录入失败",{icon:5,time:2000});
				$("input").val("");
			}
		});
	});
	// luru_chuhuo
	form.on("submit(luru_chuhuo)",function(data){
		$.post("chuhuo.php",data.field,function(data,status){
			if(data==="yes")
			{
				layer.msg("success",{icon:1,time:2000});
				$("input").val("");
			}
			else
			{
				layer.msg("录入失败",{icon:5,time:2000});
				$("input").val("");
			}
		});
	});
	// zixun_left_one
	form.on("submit(zixun_left)",function(data){
		$.post("zixun_left.php",data.field,function(data,status){
				if(data==="yes")
				{
					layer.msg("success",{icon:1,time:1000});
					$("input").val("");
				}
				else
				{
					layer.msg("false",{icon:5,time:1000});
					$("input").val("");
				}
		});

	});
	// search_zixun_left
	$(".zixun_left a").eq(4).on("click",function(){
		// alert($(".zixun_left a").index(this));
		$.post("../admin/search_zixun_left.php",{username:"username",password:"password"},function(data,status){
			// alert(typeof(data));
			$(".zixun_left img").eq(0).attr("src",data[0]);
			$(".zixun_left a").eq(0).text(data[1]);
			$(".zixun_left img").eq(1).attr("src",data[2]);
			$(".zixun_left a").eq(1).text(data[3]);
			$(".zixun_left img").eq(2).attr("src",data[4]);
			$(".zixun_left a").eq(2).text(data[5]);
			$(".zixun_left img").eq(3).attr("src",data[6]);
			$(".zixun_left a").eq(3).text(data[7]);
		},"json");
		
	});
	$(".zixun_right a").eq(4).on("click",function(){
		$.post("../admin/search_zixun_right.php",{username:"username",password:"password"},function(data,status){
			$(".zixun_right img").eq(0).attr("src",data[0]);
			$(".zixun_right a").eq(0).text(data[1]);
			$(".zixun_right img").eq(1).attr("src",data[2]);
			$(".zixun_right a").eq(1).text(data[3]);
			$(".zixun_right img").eq(2).attr("src",data[4]);
			$(".zixun_right a").eq(2).text(data[5]);
			$(".zixun_right img").eq(3).attr("src",data[6]);
			$(".zixun_right a").eq(3).text(data[7]);
		},"json");
		
	});

	// zixun_right
		form.on("submit(zixun_right)",function(data){
		$.post("zixun_left.php",data.field,function(data,status){
				if(data==="yes")
				{
					layer.msg("success",{icon:1,time:1000});
					$("input").val("");
				}
				else
				{
					layer.msg("false",{icon:5,time:1000});
					$("input").val("");
				}
		});

	});
	//进货
	$(".data_table div").eq(0).load("jinhuo_msg.php .table_jinhuo",function(){
		// 删除功能
		// 分页 每一页显示四条数据，加上头部 五条数据
		var pageCount = 4;//每页显示的数量
		var len ;//tr的总条数
		var page;//总页数
		var page_dangqian = 1;//获取当前的页面的页数
		var btn = $("<button class='layui-btn btn_prev'>上一页</button>");
		var btn_con = $("<button class='layui-btn btn_next'>下一页</button>");
		var table_jinhuo = $(".table_jinhuo");
		table_jinhuo.after(btn);
		btn.after(btn_con);
		len = $(".table_jinhuo tr").length-1;//去除头部的tr
		$(".table_jinhuo tr").eq(4).nextAll().hide(); 
		var page = Math.ceil(len/4);//有多少页
		$(".btn_next").on("click",function(){
			$(".btn_prev").removeClass("layui-btn-disabled");
			if(page_dangqian<page)
			{	
				page_dangqian = page_dangqian +1;
				$(".table_jinhuo tr").slice(page_dangqian*4-3,page_dangqian*4+1).show();
				$(".table_jinhuo tr").slice(1,page_dangqian*4-3).hide();
				$(".table_jinhuo tr").slice(page_dangqian*4+1).hide();
			}
			else
			{
				$(this).addClass("layui-btn-disabled");
				layer.msg("已经是最后一页了",{icon:5,time:1000});
			}
		});
		$(".btn_prev").on("click",function(){
			$(".btn_next").removeClass("layui-btn-disabled");
			if(page_dangqian>1)
			{	
				page_dangqian--;
				$(".table_jinhuo tr").slice(page_dangqian*4-3,page_dangqian*4+1).show();
				$(".table_jinhuo tr").slice(1,page_dangqian*4-3).hide();
				$(".table_jinhuo tr").slice(page_dangqian*4+1).hide();
			}
			else
			{
				$(this).addClass("layui-btn-disabled");
				layer.msg("已经是第一页了",{icon:5,time:1000});
			}
		});
		$(".table_jinhuo a:nth-child(3)").hide();
		$(".table_jinhuo a:nth-child(2)").on("click",function(){
			if(confirm("确认删除吗？"))
			{
				var parent = $(this).parent().parent();
				var parent_td = $(this).parent().siblings();
				//循环遍历转换为jquery对象。
				var arr = [];
				for(var i = 0;i<parent_td.length;i++)
				{	
					var arr_con = $(parent_td[i]).text();
					arr.push(arr_con);
				}
				$.post("delete.php",{delete:arr},function(data,status){
					if(data==="yes")
					{
						layer.msg("删除成功",{icon:1});
						parent.remove();
					}
					else
					{
						layer.msg("请重试",{icon:5});

					}
				});
			}
		});
		$(".table_jinhuo a:nth-child(1)").on("click",function(){
			//移除其余的tr的input a1 a3
			$(this).parent().parent().siblings().find("input").remove();
			$(this).parent().parent().siblings().find("a:nth-child(3)").hide();
			$(this).parent().parent().siblings().find("a:nth-child(1)").show();
			$(this).siblings().eq(1).show().css("color","red");
			$(this).hide();
			var parent = $(this).parent().siblings();
			// 加入input标签
			var input_jinhuo = $('<input type="text" value="">');
			input_jinhuo.appendTo(parent);
			$(this).parent().siblings().children("input").eq(2).addClass("data_input_update");
			
			laydate.render({
			elem:".data_input_update",
			type:"datetime"
			});
			for(var i = 0;i<parent.length;i++)
			{	
				var arr_con = $(parent[i]).text();
				$(parent[i]).find("input").attr("value",arr_con);
			}
		});
		//修改功能
		$(".table_jinhuo a:nth-child(3)").on("click",function(){
			var parent = $(this).parent().siblings();
			var arr = [];
			for(var i=0;i<parent.length;i++)
			{
				var e = $(parent[i]).text();
				arr.push(e);
			}
			var a = $(this).parent().siblings().find("input").eq(0).val();
			var b = $(this).parent().siblings().find("input").eq(1).val();
			var c = $(this).parent().siblings().find("input").eq(2).val();
			var d = $(this).parent().siblings().find("input").eq(3).val();
			$.post("add.php",{add_one:a,add_two:b,add_three:c,add_four:d,update:arr},function(data,status){
				if(data==="yes")
				{
					layer.msg("修改成功了",{icon:1,time:1000});
				}
				else
				{
					layer.msg("修改失败了",{icon:5,time:1000});
				}
			});
			
		});
	});
	// 出货
	$(".data_table div").eq(1).load("jinhuo_msg.php .table_chuhuo",function(){
		var pageCount = 4;//每页显示的数量
		var len ;//tr的总条数
		var page;//总页数
		var page_dangqian = 1;//获取当前的页面的页数
		var btn = $("<button class='layui-btn btn_prev_con'>上一页</button>");
		var btn_con = $("<button class='layui-btn btn_next_con'>下一页</button>");
		var table_chuhuo = $(".table_chuhuo");
		table_chuhuo.after(btn);
		btn.after(btn_con);
		len = $(".table_chuhuo tr").length-1;//去除头部的tr
		$(".table_chuhuo tr").eq(4).nextAll().hide(); 
		var page = Math.ceil(len/4);//有多少页
		$(".btn_next_con").on("click",function(){
			$(".btn_prev_con").removeClass("layui-btn-disabled");
			if(page_dangqian<page)
			{	
				page_dangqian = page_dangqian +1;
				$(".table_chuhuo tr").slice(page_dangqian*4-3,page_dangqian*4+1).show();
				$(".table_chuhuo tr").slice(1,page_dangqian*4-3).hide();
				$(".table_chuhuo tr").slice(page_dangqian*4+1).hide();
			}
			else
			{
				$(this).addClass("layui-btn-disabled");
				layer.msg("已经是最后一页了",{icon:5,time:1000});
			}
		});
		$(".btn_prev_con").on("click",function(){
			$(".btn_next_con").removeClass("layui-btn-disabled");
			if(page_dangqian>1)
			{	
				page_dangqian--;
				$(".table_chuhuo tr").slice(page_dangqian*4-3,page_dangqian*4+1).show();
				$(".table_chuhuo tr").slice(1,page_dangqian*4-3).hide();
				$(".table_chuhuo tr").slice(page_dangqian*4+1).hide();
			}
			else
			{
				$(this).addClass("layui-btn-disabled");
				layer.msg("已经是第一页了",{icon:5,time:1000});
			}
		});
		$(".table_chuhuo a:nth-child(3)").hide();
		$(".table_chuhuo a:nth-child(2)").on("click",function(){
			if(confirm("确认删除吗？"))
			{
				var parent = $(this).parent().parent();
				var parent_td = $(this).parent().siblings();
				//循环遍历转换为jquery对象。
				var arr = [];
				for(var i = 0;i<parent_td.length;i++)
				{	
					var arr_con = $(parent_td[i]).text();
					arr.push(arr_con);
				}
				$.post("delete_chuhuo.php",{delete:arr},function(data,status){
					if(data==="yes")
					{
						layer.msg("删除成功",{icon:1});
						parent.remove();
					}
					else
					{
						layer.msg("请重试",{icon:5});

					}
				});
			}
		});
		$(".table_chuhuo a:nth-child(1)").on("click",function(){
			//移除其余的tr的input a1 a3
			$(this).parent().parent().siblings().find("input").remove();
			$(this).parent().parent().siblings().find("a:nth-child(3)").hide();
			$(this).parent().parent().siblings().find("a:nth-child(1)").show();
			$(this).siblings().eq(1).show().css("color","red");
			$(this).hide();
			var parent = $(this).parent().siblings();
			// 加入input标签
			var input_jinhuo = $('<input type="text" value="">');
			input_jinhuo.appendTo(parent);
			$(this).parent().siblings().children("input").eq(2).addClass("data_input_update");
			
			laydate.render({
			elem:".data_input_update",
			type:"datetime"
			});
			for(var i = 0;i<parent.length;i++)
			{	
				var arr_con = $(parent[i]).text();
				$(parent[i]).find("input").attr("value",arr_con);
			}
		});
		//修改功能
		$(".table_chuhuo a:nth-child(3)").on("click",function(){
			var parent = $(this).parent().siblings();
			var arr = [];
			for(var i=0;i<parent.length;i++)
			{
				var e = $(parent[i]).text();
				arr.push(e);
			}
			var a = $(this).parent().siblings().find("input").eq(0).val();
			var b = $(this).parent().siblings().find("input").eq(1).val();
			var c = $(this).parent().siblings().find("input").eq(2).val();
			var d = $(this).parent().siblings().find("input").eq(3).val();
			$.post("add.php",{add_one:a,add_two:b,add_three:c,add_four:d,update:arr},function(data,status){
				if(data==="yes")
				{
					layer.msg("修改成功了",{icon:1,time:1000});
				}
				else
				{
					layer.msg("修改失败了",{icon:5,time:1000});
				}
			});
			
		});
	});
	// 选项卡
	$(".data_table div").eq(0).show().siblings().hide();
	$(".layui-btn-group button").click(function(){
		var index = $(".layui-btn-group button").index(this);
		$(".data_table div").eq(index).show().siblings().hide();
	});
	// 查询所有信息
	form.on("submit(btn-chaxun)",function(data,status){
		$.post("chaxun.php",data.field,function(data_con,status){
			if(data_con==="false")
			{
				layer.msg("您输入的货物号不存在",{icon:5,time:2000});
			}
			else
			{	
				// 显示用户的查询结果
				var td = $("<tr><td></td><td></td></tr>");
				td.appendTo(".table_chaxun"); 
				var index = $(".table_chaxun tr").index(td);
				$(".table_chaxun tr").eq(index).children("td").eq(0).text(data.field.username);
				$(".table_chaxun tr").eq(index).children("td").eq(1).text(data_con);
				//文本清零
				$(".chaxun_input_check").val("");
				//聚焦，满足用户手指头动一动的需求。
				$(".chaxun_input_check").focus();
			}
		});
	});

});