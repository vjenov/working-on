var main_home = main_home || {}
main_home = (x => {
	let _, js, img, app_js
	let navi_vue_js //네비 
	let main_js, footer_js //메인화면,footer
	let join_js //회원가입 페이지 이동
	let routine_js //루틴 페이지이동
	let brd_js //게시판 화면 
	let mypage_js
	let center_js

	let init = () => {
		_ = $.ctx()
		js = $.js()
		img = $.img()
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		main_js = js + '/vue/menu/main.js'
		footer_js = js + '/vue/menu/footer.js'
		app_js = js + '/app.js'
		join_js = js + '/user/join.js'
		routine_js = js + '/user/routine.js'
		brd_js = js + '/brd/brd.js'
		mypage_js = js + '/user/mypage.js'
		center_js = js + '/user/center.js'
	}
	let onCreate = () => {
		init()
		$.when(
			$.getScript(navi_vue_js),
			$.getScript(main_js),
			$.getScript(footer_js),
			$.getScript(app_js),
			$.getScript(join_js),
			$.getScript(routine_js),
			$.getScript(brd_js),
			$.getScript(mypage_js),
			$.getScript(center_js)
		)
		.done(() => {
			setContentView()
			navi_move()
		})
		.fail(() => {
			alert('Something goes wrong')
		})
	}
	let setContentView = () => {
		// $('head').html(navi_vue.main_head({js : $.js(),css : $.css()}))
		$('#wrapper').html(navi_vue.toolbar())
			.append(navi_vue.toolbar_sub())
			.append(`<div id="mainpage" class="content" style="margin-top : 50px;"></div>`)
			.append(footer.foot())
		$('#mainpage').append(main.main_vue({ img: img }))
		$.each([
			{ text: '회원가입', id: 'join' },
			{ text: '로그인', id: 'login' },
			{ text: 'Mypage', id: 'mypage' },
			{ text: '루틴프로그램', id: 'routine' },
			{ text: '헬스타그램', id: 'article' },
			{ text: '트레이너/센터 찾기', id: 'center' }], (i, j) => {
				$('<li class="nav-item"><a id="' + j.id + '" class="nav-link js-scroll-trigger" href="#">' + j.text + '</a></li>')
					.appendTo('#navbarResponsive ul[class="navbar-nav ml-auto"]')
			})
		$('<a/>')
			.text('시작하기')
			.addClass('btn btn-primary js-scroll-trigger')
			.appendTo('#getStart h2[class="text-white-50 mx-auto mt-2 mb-5"]')
			.click(e => {
				e.preventDefault()
				auth.onCreate()
			})
	}
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
	return { onCreate , navi_move }
})()
