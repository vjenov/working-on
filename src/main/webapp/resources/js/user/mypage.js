var mypage = mypage || {}
mypage = (() => {
	let _, img, css, js
	let mypage_vue_js
	let brd_js
	let routine_js, app_js,navi_vue_js,protein_js, main_home_js

	let init = () => {
		_ = $.ctx()
		img = $.img()
		css = $.css()
		js = $.js()
		mypage_vue_js = js + '/vue/user/mypage_vue.js'
		brd_js = js + '/brd/brd.js'
		routine_js = js + '/user/routine.js'
		app_js = js + '/app.js'
		main_home_js = js + '/cmm/main_home.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		protein_js = js + '/protein/protein.js'
	}
	let onCreate = x => {
		init()
		$.when(
			$.getScript(mypage_vue_js),
			$.getScript(brd_js),
			$.getScript(routine_js),
			$.getScript(app_js),
			$.getScript(navi_vue_js),
			$.getScript(protein_js),
			$.getScript(main_home_js)
		).done(x => {
			setContentView()
			gomodify()
			gogrape()
			goroutine(x)
			gohelgram(x)
			goHome()
			goprotein()
		}).fail(() => {
			alert('조졌다')
		})
	}
	let setContentView = () => {
		$('head').append(login_vue.login_head())
		$('.masthead').remove()
		$('.page-footer').remove()
		$('#mainpage').empty()
		$('#mainpage').append(mypage_vue.mypage_main())
	}
	let gomodify = () => {
		$('a[class="myModify"] span')
			.click(e => {
				e.preventDefault()
				$('.masthead').remove()
				$('.page-footer').remove()
				$('#mainpage').empty()
				$('#mainpage').append(mypage_vue.mypage_modify({ css: $.css() }))
			})
	}
	let gogrape = () => {
		$('a[class="myGraph"] span')
			.click(e => {
				e.preventDefault()
				$('.masthead').remove()
				$('.page-footer').remove()
				$('#mainpage').empty()
				$('#mainpage').append(mypage_vue.mypage_graph({js : $.js()}))
			})
	}
	let goroutine = x => {
		$('a[class="myRoutine"] span')
			.click(e => {
				e.preventDefault()
				routine.onCreate()
			})
	}
	let gohelgram = x => {
		$('a[class="myHelgram"] span')
			.click(e => {
				e.preventDefault()
				brd.onCreate()
			})
	}
	let goprotein = x =>{
		$('a[class="myProtein"] span')
		.click(e => {
			e.preventDefault()
			protein.onCreate()
		})
	}
	let goHome =()=>{
		$('#home').click(e=>{
			e.preventDefault()
			main_home.onCreate()
		})
	}
	return { onCreate }
})()