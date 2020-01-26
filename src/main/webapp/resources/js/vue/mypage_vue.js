var mypage_vue = mypage_vue || {}
mypage_vue = {
	mypage_body: x=>{
		return `
		<div id='main'>
		<h1>루틴</h1>
		<body class="bg-light"><div id="navi"></div>
		    <div id= "content" class="nav-scroller bg-white box-shadow">
		      <nav class="nav nav-underline">
		        <a class="nav-link active" href="#">Dashboard</a>
		        <a class="nav-link" href="#">
		          Friends
		    </nav>
		    </div>
		</body>
		</div>
	`
	},
	put_routine: ()=>{
		return `<div class="container-fluid" style="width:80%">
		<h1>루틴 만들기</h1>
		<form id="put_routine_form">
		<input type="text" name="gender" style="margin-top:20px" class="form-control" placeholder="성별" />
		<input type="text" name="age" style="margin-top:20px" class="form-control" placeholder="나이" />
		<input type="text" name="height" style="margin-top:20px" class="form-control" placeholder="키" />
		<input type="text" name="weight" style="margin-top:20px" class="form-control" placeholder="몸무게" />
		<input type="text" name="muscle" style="margin-top:20px" class="form-control" placeholder="근골격량" />
		<input type="text" name="fat" style="margin-top:20px" class="form-control" placeholder="체지방률" />
		<input type="text" name="career" style="margin-top:20px" class="form-control" placeholder="쇠질레벨" />
		<input type="text" name="division" style="margin-top:20px" class="form-control" placeholder="분할 선택" />
		<br />
		<input type="reset" class="btn btn-danger" style="float:right;width:100px;margin-right:10px" value="CANCEL"/>
		<input id="make" type="submit" class="btn btn-primary" style="float:right;width:100px;margin-right:10px" value="SUBMIT"/>
		</form>
		</div>`
		},
	show_routine: x=>{
		return `<h1>루틴보기</h1>
		<div><table id="my_routine" border="1"></table></div>
		`
	}
};