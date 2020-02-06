var brd = brd || {}
brd = (()=>{
	let _, js, css, img, brd_vuejs , profilejs
	let init = ()=>{
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
		brd_vuejs = js+'/vue/brd/brd_vue.js'
		profilejs = js+'/brd/profile.js'
	}
	let onCreate = () => {
		init()
		$.when(
			$.getScript(brd_vuejs),
			$.getScript(profilejs)
		)
		.done(()=>{
			setContentView()
		})
		.fail(()=>{
		})
	}
	let setContentView=() => {
		$('.masthead2').remove()
		$('.page-footer').remove()
		$('#mainpage').empty()
		$('#mainpage').append(brd_vue.brd_body({css : $.css()}))
		recent_updates()
		write()
	}
	let recent_updates =()=> {
		$.getJSON(_+'/post/list',d=>{
			$.each(d,(i,j)=>{
				$(`
				<div class="con">
	                <div class="title">
	                    
	                    <p>${sessionStorage.getItem('uname')}</p>
	                </div>
	                <img src="${_+'/resources/upload/'+j.img}" alt="" class="con_img">
	                <div class="logos">
	                    <div class="logos_left">
	                        <img src="${img+'/heart.svg'}" alt="" class="logo_img">
	                        <img src="${img+'/speech-bubble.svg'}" alt="" class="logo_img">
	                    </div>
	              
	                </div>
	                <div class="content">
						<p>${j.content}</p>
	                    <p><b>좋아요 80개</b></p>
	                    <p><a href="">${sessionStorage.getItem('uname')}</a> #${j.tagname}</p>
	                    <input type="text" name="" id="" value="댓글달기">
	                </div>
	            </div>
					`
				)
				.appendTo('#recent_updates')
				$(`
				
				 <div class="col-md-4 col-sm-6 px-1 my-1  style="max-width:31%; max-height:40%; justify-content: space-between;">
                            <img src="${_+'/resources/upload/'+j.img}" alt="Card image cap" style=" width: 100%;">
                        </div>
				`)
				.appendTo('#menu2 div.row')
			})
		})
	}
	let write=()=>{
		$('<button>', { type:'button', text :'Publish'})
		.addClass('btn btn-success btn-sm')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
				let json ={
					userno : parseInt(sessionStorage.getItem('userno')),
					content: $('#exampleModal textarea').val()
				}
			alert('userno'+json.userno)
			$.ajax({
				url:_+'/post/',
				type:'PUT',
				data: JSON.stringify(json),
				dataType :'json',
				contentType : 'application/json',
				success : d =>{
					$('#exampleModal').modal("hide")
					onCreate()						
				},
				error : e =>{
					alert('ajax 실패')
				}
			})
		})
		$('<input>',{type:"file",id:"upload"})
		.appendTo('.modal-body')
		$('<i>')
		.addClass('fas fa-camera-retro p-1 border rounded mt-1')
		.appendTo('.modal-body')
		.click(e=>{
			e.preventDefault()
			let formData = new FormData()
			let files = $('#upload')[0].files  //[0] 은 아래 for문이 length 배열이라서 길이… 아마 저자는 파일말고 텍스트라던지 다른것들도 같이 업로드하려고 배열을 쓰지 않았을까 추측함!
			let i = 0
			for(i=0; i<files.length; i++){
				formData.append("uploadFile",files[i])
			}
			$.ajax({
				url:_+'/post/fileupload',
				processData:false,
				contentType:false,
				data:formData,
				type:'POST',
				success:d=>{
					alert('파일업로드성공')
				},
				error:d=>{
					alert('파일업로드 실패')
				}
			})
		})
		$('#btn-profile')
		.click(()=>{
			profile.onCreate()
		})
		
	}
	return { onCreate }
})()