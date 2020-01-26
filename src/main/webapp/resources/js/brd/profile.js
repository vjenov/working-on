var profile = profile || {}
profile = (() => {
	let context, js, css, img
	let brd_js
	let profile_vue_js ,edit_profile_js

	let init = () => {
		context = $.ctx(),
		js = $.js(),
		css = $.css(),
		img = $.img(),
		brd_js = js + '/brd/brd.js'
		profile_vue_js = js + '/vue/brd/profile_vue.js',
		edit_profile_js = js + '/brd/edit_profile.js'
	}
	let onCreate = () => {
		init()
		$.when(
			$.getScript(brd_js),
			$.getScript(profile_vue_js),
			$.getScript(edit_profile_js)
		)
		.done(() => {
			setContentView()
			page_move()
		})
		.fail(() => {
		})

	}
	let setContentView = () => {
		$('head').append(profile_vue.profile_head({ css: $.css()}))
		$('.masthead').remove()
		$('.page-footer').remove()
		$('#mainpage').html(profile_vue.profile_body())

	}
	let page_move =()=>{
		$('#btn-edit-profile').click(() => {
			edit_profile.onCreate()
		})
		$('#go_brdMain').click(() => {
			brd.onCreate()
		})
	}
	return { onCreate }
})()