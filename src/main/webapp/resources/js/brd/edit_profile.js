var edit_profile = edit_profile || {}
edit_profile = (() => {
	let context, js, img, css, brd_js, edit_profile_vue_js, profile_js
	let init = () => {
		context = $.ctx(),
		js = $.js(),
		css = $.css(),
		img = $.img(),
		brd_js = js + '/brd/brd.js',
		edit_profile_vue_js = js + '/vue/brd/edit_profile_vue.js',
		profile_js = js + '/brd/profile.js'
	}
	let onCreate = () => {
		init()
		$.when(
			$.getScript(brd_js),
			$.getScript(edit_profile_vue_js),
			$.getScript(profile_js)
		)
		.done(() => {
			setContentView()
		$('btn_edit').click(() =>{
			alert('수정 클릭 ')
			profile.onCreate()
		})
		$('#go_brdMain').click(() =>{
			brd.onCreate()
		})
		})
		.fail(() => {
			alert('실패')
		})
	}
	let setContentView = () => {
		$('head').html(edit_profile_vue.edit_profile_head({ css: $.css()}))
		$('.masthead').remove()
		$('.page-footer').remove()
		$('#mainpage').html(edit_profile_vue.edit_profile_body())
	}
	return { onCreate }
})()