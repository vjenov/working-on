var auth = auth || {}
auth = (()=>{
	let _, img ,css, js ,login_vue_js, cookie_js, main_js
	let app_js
	let navi_vue_js
	let router_js 
	let mypage_js , routine_js , brd_js, center_js , join_js

	let init =()=>{
		_ = $.ctx()
		img = $.img()
		css = $.css()
		js = $.js()
		login_vue_js = js + '/vue/user/login_vue.js'
		main_js = js + '/vue/menu/main.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		app_js = js + '/app.js'
		router_js = js + '/cmm/router.js'
		mypage_js = js + '/user/mypage.js'
		routine_js = js + '/user/routine.js'
		brd_js = js + '/brd/brd.js'
		center_js = js + '/user/center.js'
		join_js = js + '/user/join.js'
	}
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(login_vue_js),
			$.getScript(main_js),
			$.getScript(app_js),
			$.getScript(navi_vue_js),
			$.getScript(router_js),
			$.getScript(mypage_js),
			$.getScript(routine_js),
			$.getScript(brd_js),
			$.getScript(center_js),
			$.getScript(join_js)
		)
		.done(()=>{
			setContentView()
			gomain()
			signIn()
			gojoin()
		})
		.fail(()=>{
			alert('Something goes wrong')
		})
	}	
	let setContentView =()=>{
		$('head').append(login_vue.login_head())
		$('.masthead').remove()
		$('.page-footer').empty()
		$('#mainpage').empty()
		$('#mainpage').append(login_vue.login_ui())
		
	}
	let gomain =()=>{
		$('#home').click(function(){
			auth.onCreate()
		})
	}
	let gojoin =()=>{
		$('a[class="small"]').click(e=>{
			e.preventDefault()
			join.onCreate()
		})
	}
	let signIn =()=>{
		$('#login_btn')
		.click(e=>{
			e.preventDefault()
			alert('로그인js')
			$.ajax({
				url : _ + '/users/login',
				type : 'POST',
				data : JSON.stringify({
					userid : $('input[placeholder="userid"]').val(),
					passwd : $('input[placeholder="password"]').val()}),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					if(d.msg ==='success'){
						let t = d.user
						$.extend(new Users(t))
						login_home()
					}else {$('span[class="duple_userid"]').text('아이디를 다시 확인해주세요').css('color','red')}
				},
				error : e=>{alert(`ajax실패`)}
			})
		}
	)}
	let navi_move =()=> {
		$('#join').click(e=>{
			e.preventDefault()
			join.onCreate()
		})
		$('#login').click(e => {
			e.preventDefault()
			auth.onCreate()
		})
		$('#mypage').click(() =>{
			mypage.onCreate() })
		$('#routine').click(() => { 
			routine.onCreate()
		 })
		$('#article').click(function(){
			brd.onCreate()
		})
		$('#center').click(() => { 
			alert('센터')
			center.onCreate()
		})
	}
	let login_home =()=>{
		$('#wrapper').html(navi_vue.login_toolbar())
		.append(navi_vue.toolbar_sub2())
		.append(`<div id="mainpage" class="content" style="margin-top : 80px;"></div>`)
		$.each([{ text: 'Mypage', id: 'mypage' },
				{ text: '루틴프로그램', id: 'routine' },
				{ text: '헬스타그램', id: 'article' },
				{ text: '트레이너/센터 찾기', id: 'center' },
				{text: '로그아웃',id :'logout'}], (i, j) => {
		$('<li class="nav-item"><a id="' + j.id + '" class="nav-link js-scroll-trigger" href="#">' + j.text + '</a></li>').appendTo('#navbarResponsive ul[class="navbar-nav ml-auto"]')})
		navi_move()
		logout()
	}
	let logout =()=>{
		$('#logout').click(e=>{
			e.preventDefault()
			sessionStorage.clear()
			localStorage.clear()
			app.run(_)
			alert('로그아웃')
		})
	}
	return { onCreate, login_home }
})()