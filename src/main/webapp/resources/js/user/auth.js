var auth = auth || {}
auth = (()=>{
	let _, img ,css, js ,login_vue_js, cookie_js, main_js
	let app_js
	let navi_vue_js

	let init =()=>{
		_ = $.ctx()
		img = $.img()
		css = $.css()
		js = $.js()
		login_vue_js = js + '/vue/user/login_vue.js'
		cookie_js = js + '/cmm/cookie.js'
		main_js = js + '/vue/menu/main.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		app_js = js + '/app.js'
	}
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(login_vue_js),
			$.getScript(cookie_js),
			$.getScript(main_js),
			$.getScript(app_js),
			$.getScript(navi_vue_js)
		)
		.done(()=>{
			setContentView()
			gomain()
			signIn()
			
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
			app.run(_)
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
							$('#wrapper').html(navi_vue.login_toolbar())
							.append(navi_vue.toolbar_sub())
							.append(`<div id="mainpage" class="content" style="margin-top : 50px;"></div>`)
							.append(footer.foot())
							$('#mainpage').append(main.main_vue({ img: img }))
						$.each([{ text: 'Mypage', id: 'mypage' },
								{ text: '루틴프로그램', id: 'routine' },
								{ text: '헬스타그램', id: 'article' },
								{ text: '트레이너/센터 찾기', id: 'center' },
								{text: '로그아웃',id :'logout'}], (i, j) => {
						$('<li class="nav-item"><a id="' + j.id + '" class="nav-link js-scroll-trigger" href="#">' + j.text + '</a></li>')
						.appendTo('#navbarResponsive ul[class="navbar-nav ml-auto"]')})
						let a = d.user
						main_home.navi_move(a)
						logout()
						localStorage.setItem('userid',a.userid)
						localStorage.setItem('uname',a.uname)
						localStorage.setItem('gender',a.gender)
						localStorage.setItem('age',a.age)
						localStorage.setItem('height',a.height)
						localStorage.setItem('weight',a.weight)
						localStorage.setItem('muscle',a.muscle)
						localStorage.setItem('fat',a.fat)
						localStorage.setItem('career',a.career)
						localStorage.setItem('division',a.division)
						alert('스토리지 저장된값 ' + localStorage.getItem('userid'))
					}else {$('span[class="duple_userid"]').text('아이디를 다시 확인해주세요').css('color','red')}
				},
				error : e=>{alert(`ajax실패`)}
			})
		}
	)}
	let logout =()=>{
		$('#logout').click(e=>{
			e.preventDefault()
			localStorage.clear()
			alert(localStorage.getItem('userid'))
			app.run(_)
			alert('로그아웃')
		})
	}
	return { onCreate }
})()