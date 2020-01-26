var navi = navi || {}
navi = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
		let _, js, css, img, auth_js, mypage_js, navi_vue_js
	let init =x=>{
		_ = $.ctx()
        js = $.js()
        css = $.css()
		img = $.img()
		auth_js = js+'/cmm/auth.js'
		mypage_js = js+'/content/mypage.js'
		navi_vue_js = js+'/vue/navi_vue.js'
	}
	let onCreate =x=> {
		init()
		const user = x
		$.when(
				$.getScript(auth_js),
				$.getScript(mypage_js)
		).done(()=>{
			setContentView(user)
		}).fail(()=>alert(WHEN_ERR))
	}
	let setContentView =x=> {
		$('<a>',{
        	href : '#',
	        text : '루틴만들기'
        })
        .addClass('nav-link')
        .appendTo('#make_routine')
        .click(e=>{
			e.preventDefault()
			alert('제발 되라'+ x.uid)
        	mypage.putRoutine(x)
        })
        $('<a>',{
        	href : '#',
	        text : '루틴보기'
        })
        .addClass('nav-link')
        .appendTo('#show_routine')
        .click( e=>{
        	e.preventDefault()
        	mypage.setPartition(x)
		})
		  $('<a>',{
        	href : '#',
	        text : '필요 단백질 계산기'
        })
        .addClass('nav-link')
        .appendTo('#protein_calc')
        .click( e=>{
        	e.preventDefault()
        	mypage.proteinCalc()
		})
	}
	return {onCreate}
})()