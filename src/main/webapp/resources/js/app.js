"use strict"
var app = (()=>{
	const MSG = "ERROR ERROR"
	let _,js
	let main_home_js

	let init =()=>{
		_ = $.ctx()
		js = $.js()
		main_home_js = js + '/cmm/main_home.js'
	}
	let run =x=>{
		$.getScript(x+'/resources/js/cmm/router.js',()=>{
			$.extend(new Session(x))
			onCreate()
		})
	}
	let onCreate =()=>{
		init()
		$.when($.getScript(main_home_js))
		.done(()=>{main_home.onCreate()})
		.fail(()=>{MSG})
	}
	return { run }
})()
	// let setContentView =()=>{
	// 	alert(`img 경로  ${img}`)
	// 	$('#wrapper').html(navi_vue.toolbar())
	// 	.append(navi_vue.toolbar_sub())
	// 	.append(`<div id="mainpage" class="content"></div>`)
	// 	.append(footer.foot())
	// 	$('#mainpage').append(main.main_vue({img : img}))

	// 	$.each([{text: '회원가입',id : 'join'},
	// 			{text : '로그인',id :'login'},
	// 			{text : 'Mypage',id : 'mypage'},
	// 			{text :'루틴프로그램' ,id : 'routine'},
	// 			{text :'헬스타그램',id: 'article'},
	// 			{text :'트레이너/센터 찾기', id :'center'}],(i,j)=>{
	// 		$('<li class="nav-item"><a id="'+j.id+'" class="nav-link js-scroll-trigger" href="#">'+j.text+'</a></li>')
	// 		.appendTo('#navbarResponsive ul[class="navbar-nav ml-auto"]')
	// 	})
	// 	$('<a/>')
	// 	.text('시작하기')
	// 	.addClass('btn btn-primary js-scroll-trigger')
	// 	.appendTo('#getStart h2[class="text-white-50 mx-auto mt-2 mb-5"]')
	// 	.click(e=>{
	// 		e.preventDefault()
	// 		auth.onCreate()
	// 	})
	// 	$('#home').click(e=>{
	// 		e.preventDefault()
	// 		alert('홈으로가기')
	// 		app.run(ctx)
	// 	})
	// 	page_move()
	// }
	// let page_move =()=>{
	// 	$('#join').click(function(e){
	// 		e.preventDefault()
	// 		$('head').append(join_vue.join_head())
	// 		// $('#mainNav').remove()
	// 		$('.masthead').remove()
	// 		$('.page-footer').empty()
	// 		$('#mainpage').html(join_vue.join_ui())
	// 	})
	// 	$('#login').click(e=>{
	// 		e.preventDefault()
	// 		auth.onCreate()
	// 	})
	// 	$('#mypage').click(()=>{alert('마이페이지')})
	// 	$('#routine').click(()=>{alert('루틴')})
	// 	$('#article').click(()=>{alert('게시판')})
	// 	$('#center').click(()=>{alert('센터')})
	// }