var routine = routine || {}
routine = (()=>{
	let _,img,css,js
	let routine_vue_js //루틴화면
	let app_js,navi_vue_js
	let existing_routine_js, main_home_js
	let init =()=>{
		_ = $.ctx()
		img = $.img()
		css = $.css()
		js = $.js()
		routine_vue_js = js + '/vue/routine/routine_vue.js'
		app_js = js + '/app.js'
		main_home_js = js + '/cmm/main_home.js'
		existing_routine_js = js + '/user/existing_routine.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
	}
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(routine_vue_js),
			$.getScript(app_js),
			$.getScript(existing_routine_js),
			$.getScript(navi_vue_js),
			$.getScript(main_home_js)
		)
		.done(()=>{
			setContentView() 
			createRoutine()
			existRoutine()
			gohome() 
		})
		.fail(()=>{alert(`실패`)})
	}
	let setContentView =()=>{
		$('.masthead2').remove()
		$('.page-footer').remove()
		$('head').append(routine_vue.routine_style({img :img}))
		$('#mainpage').html(routine_vue.routine_page({img : img}))

	}
	let chooseCareer =x=>{
		let arr
		$('#setModal select[name="division"]').empty()
//		alert($('#setModal input[name="career"]:checked').val())
		if($('#setModal input[name="career"]:checked').val()==1) {
			arr = [
				{text: '근력증가', value: 1},
				{text: '다이어트&체지방감소', value: 7}]
			
		}else{
			arr = [
				{text: '무분할', value: 1},
				{text: '2분할', value: 2},
				{text: '3분할', value: 3},
				{text: '5분할', value: 5}]
		}
			$.each(arr, (i, j) => {
					$(`<option value=`+j.value+`>` + j.text + `</option>`)
						.appendTo('#setModal select[name="division"]')
				})
	}
	let createRoutine =()=>{
		$('#newRoutine').click(function(){
			$('#fullHeightModalRight').modal('show')
			$('#setModal input[name="career"]').click(() => {
				chooseCareer()
			})
			$('#save_routine').click(e=>{
				e.preventDefault()
				$.ajax({
					url:_+'/users/'+sessionStorage.getItem('userid'),
					type: 'PUT',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify({
						userid : sessionStorage.getItem('userid'),
						uname : sessionStorage.getItem('uname'),
						height : $('#setModal input[name="height"]').val(),
						weight : $('#setModal input[name="weight"]').val(),
						muscle : $('#setModal input[name="muscle"]').val(),
						fat : $('#setModal input[name="fat"]').val(),
						career : $('#setModal input[name="career"]').val(),
						division : $('#setModal select[name="division"]').val(),
				}),
				success : d => {
					alert('ajax성공')
					alert(d.career)
					alert(d.division)
					localStorage.setItem('height', d.height)
					localStorage.setItem('weight', d.weight)
					localStorage.setItem('muscle', d.muscle)
					localStorage.setItem('fat', d.fat)
					localStorage.setItem('career', d.career)
					localStorage.setItem('division', d.division)
					onCreate()
				},
				error : function(request,status,error){
					alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
				})
			})
		})
	}
	let existRoutine =()=>{
		$('#existRoutine').click(()=>{
			if(localStorage.getItem('division')==0){
				alert('새루틴 만들기를 먼저 완료하세요!!')
				onCreate()
			}else{
				existing_routine.onCreate()
			}	
		})
	}
	let gohome =()=>{
		$('#home').click(e=>{
			e.preventDefault()
			main_home.onCreate()
		})
	}
	return { onCreate, createRoutine }
})()