var edit_profile = edit_profile || {}
edit_profile= (()=>{
	let _, js , img, css, brdjs, edit_profile_vuejs ,profilejs
	let init =()=>{
		_ = $.ctx(),
		js = $.js(),
		css = $.css(),
		img = $.img(),
		brdjs = js + '/brd/brd.js',
		edit_profile_vuejs = js + '/vue/brd/edit_profile_vue.js',
		profilejs = js+'/brd/profile.js'
	}
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(brdjs),
			$.getScript(edit_profile_vuejs),
			$.getScript(profilejs)
		)
		.done(()=>{
			setContentView()
			$('btn_edit').click(()=>{
				alert('수정 클릭 ')
				profile.onCreate()
			})
			$('#go_brdMain').click(()=>{
			brd.onCreate()
			})
			$('#btn_edit_profile').click(e=>{
				e.preventDefault()
				profileupdate()
			})
		})
		.fail(()=>{
			alert('실패')
		})
	}
	let setContentView = () => {
		$('#mainpage').html(edit_profile_vue.edit_profile_body({ css: $.css() }))
		
		
		

	}
	let profileupdate =()=>{
		alert('업데이트 클릭'+$('#profile_upload_form table tr td div input[name="profile_content"]').val())
		
		
			 let form = $('#upload_form')[0]
			 let formData = new FormData()
			 let files = $('#profile_image')[0].files  
			 formData.append("userno", sessionStorage.getItem('userno'))
			 formData.append("content", encodeURIComponent($('#profile_upload_form table tr td div input[name="profile_content"]').val()))
			 let i = 0
			 for (i = 0; i < files.length; i++) {
		          formData.append("profileImg", files[i])
		          
			 }
			 $.ajax({
				 url: _+ '/profile/update/'+sessionStorage.getItem('userno'),
				 processData: false,
				 contentType: false,
				 data: formData,
				 type: 'POST',
				 success: () => {
					 alert('프로필 업데이트 성공')
					 brd.onCreate()
				 },
				 error: e => {
					 alert('파일업로드 실패')
				 }
			 })
		
	}
	return {onCreate}

})()