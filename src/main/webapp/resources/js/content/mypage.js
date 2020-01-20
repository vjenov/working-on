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
				sessionStorage.setItem('uid', d.uid)
				setContentView()
				navi.onCreate(d)
			},
			error : function(request,status,error){
		        alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		       }
			})
		})
	}
	let showRoutine=x=>{
		alert(x.division)
		let today = new Date()
		const week = new Array(0, 1, 2, 3, 4, 5, 6)
		let day = week[today.getDay()]
 		let part1 = ''
		let part2 = ''
		let part3 = ''
		let part4 = ''
		let part5 = ''
		switch(x.division) {
			case 0 : part1 = "S", part2 = "C", part3 = "B", part4 = "A", part5 = "U"
					break
			case 2 : if(day === 0 || day === 3) {
						alert('오늘은 근성장을 위해서 휴식을 갖는 날입니다!!!')
						setContentView()
						navi.onCreate(x)
					}else if (day === 2 || day === 5) {
						part1 = "U"
					}else {
						part1 = "S", part2 = "C", part3 = "B", part4 = "A"
					}
					break
			case 3 : alert("3분할 도착!!!")
					if(day===0) {
						alert('오늘은 근성장을 위해서 휴식을 갖는 날입니다!!!')
						setContentView()
						navi.onCreate(x)
					}else if (day === 1 || day === 4) {
						part1 = "C", part2 = "A"
					}else if (day === 2 || day === 5) {
						part1 = "B", part2 = "A"
					}else {
						part1 = "U"
					}
					break
			case 5 : if (day === 1) {
						part1 = "C"
					}else if (day === 2) {
						part1 = "B"
					}else if (day === 3) {
						part1 = "A"
					}else if (day === 4) {
						part1 = "S"
					}else if (day === 5) {
						part1 = "U"
					}else {
						alert('오늘은 근성장을 위해서 휴식을 갖는 날입니다!!!')
						setContentView()
						navi.onCreate(x)
					}
					break
		}
		$.ajax({
			url: _+ '/users/' + x.uid,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				uid : x.uid,
				muscle : x.muscle,
				fat : x.fat,
				career : x.career,
				division : x.division,
				part1 : part1,
				part2 : part2,
				part3 : part3,
				part4 : part4,
				part5 : part5
			}),
			success : d => {
				alert('ajax 성공')
			},
			error : function(request,status,error){
		        alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		       }
		})
		$('content').html(mypage_vue.show_routine())
	}
/* 	let recent_updates= () =>{
		$('#recent_updates .media').remove()
		$('#suggestions').remove()
        $('#recent_updates .d-block').remove()
        $.getJSON(_+'/articles/',d =>{
        	alert(" 성공!! ")
      		$.each(d, (i,j)=>{
        		$( '<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
                		'          <p id="id_'+i+'" class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
                		'</p></div>').appendTo('#recent_updates')
        		$('<strong class="d-block text-gray-dark">@<a>'+j.uid+'</a></strong>')
        		.appendTo("#id_"+i)
        		.click(()=>{
        			alert('id 클릭')
        		})
        		$('<a>'+j.title+'</a>')
        		.appendTo("#id_"+i)
        		.click(()=>{
        			alert('제목 클릭')
        			detail(j)
        		})
        		
      		})
      		
        })
	}
	let write=()=>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#write_form input[name="writer"]').val(getCookie("UID"))
		$('#suggestions').remove()
		$('<input>',{
			style: "float:right;width:100px;margin-right:10px",
			value: "취소"
		})
		.addClass("btn btn-danger")
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			setContentView()
		})
		$('<input>',{
			style: "float:right;width:100px;margin-right:10px",
			value: "전송",
			type:  "submit"
		})
		.addClass("btn btn-primary")
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json = {
					uid : $('#write_form input[name="writer"]').val(),
					title: $('#write_form input[name="title"]').val(),
					content: $('#write_form textarea[name="content"]').val()
			}
			alert('글내용 '+json.content)
			$.ajax({
				url : _+'/articles/',
				type : 'POST',
				data : JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					$('#recent_updates div.container-fluid').remove()
					recent_updates()
					
				},
				error : e=>{alert('에러')}
			})
		})
		
	}

	let detail =x=>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#recent_updates div.container-fluid h1').html('ARTICLE DETAIL')
		$('#write_form input[name="writer"]').val(x.uid)
		$('#write_form input[name="title"]').val(x.title)
		$('#write_form input[name="content"]').val(x.content)
		$('#suggestions').remove()
		$('<input>', {
			style:"float:right;width:100px;margin-right:10px",
			value:"삭제"
		})
		.addClass('btn btn-danger')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			deleteArticle(x)
		})
		$('<input>', {
			style:"float:right;width:100px;margin-right:10px",
			value:"수정",
			type : 'submit'
		})
		.addClass('btn btn-danger')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			updateArticle(x)
			})
		}
	let  deleteArticle=x=>{
		alert('넘어온 파라미터 x값 ::'+x)
		$.ajax({
			url : _+'/articles/'+x.articleseq,
			type : 'DELETE',
			dataType : 'json',
			data : JSON.stringify(x),
			contentType: 'application/json',
			success : d=>{
				if(d.msg==='success')
				alert('삭제 성공')
				$('#recent_updates div.container-fluid').remove()
				recent_updates()
			},
			error : function(request,status,error){
		        alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		       }
			
		})
		
	}
	let updateArticle =x=>{
		alert('넘어온 x값 ::'+x+'articleseq값'+x.articleseq)
		$.ajax({
			url : _+'/articles/'+x.articleseq,
			type : 'PUT',
			dataType : 'json',
			contentType : 'application/json',
			data : JSON.stringify({
				articleseq : x.articleseq,
			    cid :$('#write_form input[name="writer"]').val() ,
				title : $('#write_form input[name="title"]').val(),
				content :$('#write_form textarea[name="content"]').val() 
			}),
			success : d=>{
				alert('에이작스 성공')
				$('#recent_updates div.container-fluid').remove()
				recent_updates()
			},
			error : function(request,status,error){
		        alert("error code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		       }
		})
		
	} */
	return {onCreate, putRoutine, showRoutine}
})();