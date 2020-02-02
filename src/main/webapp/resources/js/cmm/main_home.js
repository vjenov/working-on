var main_home = main_home || {}
main_home = (x => {
	let _, js, img, app_js
	let navi_vue_js //네비 
	let main_js, footer_js //메인화면,footer
	let auth_js

	let init = () => {
		_ = $.ctx()
		js = $.js()
		img = $.img()
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		main_js = js + '/vue/menu/main.js'
		footer_js = js + '/vue/menu/footer.js'
		auth_js = js+'/user/auth.js'
	}
	let onCreate = () => {
		init()
		$.when(
			$.getScript(navi_vue_js),
			$.getScript(main_js),
			$.getScript(footer_js),
			$.getScript(auth_js)
		)
		.done(() => {
			setContentView()
		})
		.fail(() => {
			alert('Something goes wrong')
		})
	}
	let setContentView = () => {
		$('#wrapper').html(navi_vue.toolbar_sub())
		.append(`<div id="mainpage" class="content" style="margin-top : 50px;"></div>`)
		.append(footer.foot())
		$('#mainpage').append(main.main_vue({ img: img }))
		$('<a/>',{text : '로그인', id: 'a_login'})
		.appendTo('div[class="plane"] span')
		.click(e => {
			e.preventDefault()
			auth.onCreate()
		})
	}
	return { onCreate }
})()
