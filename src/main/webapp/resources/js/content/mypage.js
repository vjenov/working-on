"use strict"
var mypage = mypage||{}
mypage = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
	let _, js, css, img, mypage_vue_js, navi_js, navi_vue_js
	let init =()=>{
		_ = $.ctx()
        js = $.js()
        css = $.css()
		img = $.img()
        navi_js = js+'/cmm/navi.js'
        mypage_vue_js = js + '/vue/mypage_vue.js'
        navi_vue_js = js + '/vue/navi_vue.js'
	}
	let onCreate =x=>{
		init()
		$.when(
			$.getScript(mypage_vue_js),
			$.getScript(navi_js),
			$.getScript(navi_vue_js)
		).done(()=>{
			setContentView()
			navi.onCreate(x)
		}).fail(()=>{
			alert(WHEN_ERR)
		})
	}
	let setContentView=x=>{
        $('body').addClass('text-center')
        .html(mypage_vue.mypage_body({ctx: '/web',css: $.css(), img: $.img()}))
        $(navi_vue.nav()).appendTo('#navi')
	}
	let putRoutine=x=>{
		$('#content').html(mypage_vue.put_routine())
		$('#make').click(e=>{
			e.preventDefault()
			$.ajax({
			url:_+'/users/'+x.uid,
			type: 'PUT',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
					uid : x.uid,
					pwd : x.pwd,
					uname : x.uname,
					gender : $('#put_routine_form input[name="gender"]').val(),
					age : $('#put_routine_form input[name="age"]').val(),
					height : $('#put_routine_form input[name="height"]').val(),
					weight : $('#put_routine_form input[name="weight"]').val(),
					muscle : $('#put_routine_form input[name="muscle"]').val(),
					fat : $('#put_routine_form input[name="fat"]').val(),
					career : $('#put_routine_form input[name="career"]').val(),
					division : $('#put_routine_form input[name="division"]').val(),
			}),
			success : d => {
				alert('ajax 성공')
				localStorage.setItem('weight', d.weight)
				localStorage.setItem('career', d.career)
				setPartition(d)
			},
			error : function(request,status,error){
		        alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		       }
			})
		})
	}
	let setPartition=x=>{
		alert(x.division)
		let today = new Date()
		const week = new Array(0, 1, 2, 3, 4, 5, 6)
		let day = week[today.getDay()]
 		let parta = ''
		let partb = ''
		let partc = ''
		let partd = ''
		let parte = ''
		var data = {
						parta : parta,
						partb : partb,
						partc : partc,
						partd : partd,
						parte : parte
					}
		switch(x.division) {
			case 0 : parta = 'S', partb = 'C', partc = 'B', partd = 'A', parte = 'U'
					showRoutine({x, data})
					break
			case 2 : if(day === 0 || day === 3) {
						alert('오늘은 근성장을 위해서 휴식을 갖는 날입니다!!!')
						setContentView()
						navi.onCreate(x)
					}else if (day === 2 || day === 5) {
						parta = 'U'
						showRoutine({x, data})
					}else {
						parta = 'S', partb = 'C', partc = 'B', partd = 'A'
						showRoutine({x, data})
					}
					break
			case 3 : alert("3분할 도착!!!")
					if(day===0) {
						alert('오늘은 근성장을 위해서 휴식을 갖는 날입니다!!!')
						setContentView()
						navi.onCreate(x)
					}else if (day === 1 || day === 4) {
						parta = 'C', partb = 'A'
						showRoutine({x, data})
					}else if (day === 2 || day === 5) {
						parta = 'B', partb = 'A'
						showRoutine({x, data})
					}else {
						parta = 'U'
						showRoutine({x, data})
					}
					break
			case 5 : if (day === 1) {
						parta = 'C'
						showRoutine({x, data})
					}else if (day === 2) {
						parta = 'B'
						showRoutine({x, data})
					}else if (day === 3) {
						parta = 'A'
						showRoutine({x, data})
					}else if (day === 4) {
						parta = 'S'
						showRoutine({x, data})
					}else if (day === 5) {
						parta = 'U'
						showRoutine({x, data})
					}else {
						alert('오늘은 근성장을 위해서 휴식을 갖는 날입니다!!!')
						setContentView()
						navi.onCreate(x)
					}
					break
		}
	}
	let showRoutine =x=>{
		let a = x.x
		let data = x.data
		$.ajax({
			url:_+'/routine/'+a.uid,
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				uid : a.uid,
				muscle : a.muscle,
				fat : a.fat,
				career : a.career,
				division : a.division,
				parta : data.parta,
				partb : data.partb,
				partc : data.partc,
				partd : data.partd,
				parte : data.parte
			}),
			success : d => {
				alert('ajax 성공')
				let career = localStorage.getItem('career')
				alert(career)
				$('#content').html(mypage_vue.show_routine())
				$.each(d, (i,j)=>{
					$( '<div>'+
						'<p id="id_'+i+'">'+'</p></div>')
						.appendTo('#my_routine')
					$('<a>'+"오늘의 "+(i+1)+"번째 운동:"+j.ename+", 추천중량"+(j.rweight*career)+'</a>')
					.appendTo("#id_"+i)
				})

			},
			error : function(request,status,error){
		        alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		       }
		})
	}
	let proteinCalc=()=>{
		$('#content').remove()
		let weight = localStorage.getItem('weight')
		alert(weight)
		$.getJSON(_+'/food/' + weight, d => {
			$.each(d, (i,j)=>{
				$( '<div><table id="calc">'+
						'</table></div>')
						.appendTo('body')
					$('<a>'+j.fname+":"+Math.floor(weight/j.protein+1)+"개"+'</a>')
					.appendTo("#calc")
			})
		})
	}
	return {onCreate, putRoutine, setPartition, showRoutine, proteinCalc}
})();