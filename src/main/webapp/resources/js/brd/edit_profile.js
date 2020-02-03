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
		})
		.fail(()=>{
			alert('실패')
		})
	}
	let setContentView = () => {
		//		$('head').html(edit_profile_vue.edit_profile_head({css : $.css()}))
		$('#mainpage').html(edit_profile_vue.edit_profile_body({ css: $.css() }))
		$('#profile_image').on('change', function() {
        
        ext = $(this).val().split('.').pop().toLowerCase(); //확장자
        
        //배열에 추출한 확장자가 존재하는지 체크
        if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            resetFormElement($(this)); //폼 초기화
            window.alert('이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)');
        } else {
            file = $('#profile_image').prop("files")[0];
            blobURL = window.URL.createObjectURL(file);
            $('#profile_image_preview img').attr('src', blobURL);
            $('#profile_image_preview').slideDown(); //업로드한 이미지 미리보기 
            $(this).slideUp(); //파일 양식 감춤
        }
    });
		$('#profile_image_preview a').bind('click', function () {
			resetFormElement($('#profile_image')); //전달한 양식 초기화
			$('#profile_image').slideDown(); //파일 양식 보여줌
			$(this).parent().slideUp(); //미리 보기 영역 감춤
			return false; //기본 이벤트 막음
		});
		function resetFormElement(e) {
			e.wrap('<form>').closest('form').get(0).reset();
			//리셋하려는 폼양식 요소를 폼(<form>) 으로 감싸고 (wrap()) , 
			//요소를 감싸고 있는 가장 가까운 폼( closest('form')) 에서 Dom요소를 반환받고 ( get(0) ),
			//DOM에서 제공하는 초기화 메서드 reset()을 호출
			e.unwrap(); //감싼 <form> 태그를 제거
		}

	}

	return {onCreate}

})()