var brd = brd || {}
brd = (()=>{
	const WHEN_ERR  = '에러에러'
	let context, js, css, img , brd_vue_js , profile_js
	let main_home_js
	let navi_vue_js
	let app_js

	let init = ()=>{
		context = $.ctx(),
		js = $.js(),
		css = $.css(),
		img = $.img(),
		brd_vue_js = js+'/vue/brd/brd_vue.js'
		profile_js = js+'/brd/profile.js'
		main_home_js = js + '/cmm/main_home.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		app_js = js + '/app.js'
	}
	let onCreate = () => {
		init()
		$.when(
			$.getScript(brd_vue_js),
			$.getScript(profile_js),
			$.getScript(main_home_js),
			$.getScript(navi_vue_js),
			$.getScript(app_js)
		)
		.done(()=>{
			setContentView()
			createPost()
			gohome()
		}).fail(()=>{alert(WHEN_ERR)})
	}
	let createPost =()=>{
		$('<button>', { type:'button', text :'Publish'})
			.addClass('btn btn-success btn-sm')
			.appendTo('#write_form')
			.click(e=>{
				alert('퍼블리싱 클릭 성공 ')
				e.preventDefault()
				$.ajax({
					url: context+'/brds/',
					type:'PUT',
					data: JSON.stringify({content: $('#exampleModal textarea').val()}),
					dataType :'json',
					contentType : 'application/json',
					success : d =>{
						$('#exampleModal').modal("hide")
						onCreate()
						alert('성공')
					},
					error : e =>{
						alert('ajax 실패')
					}
				})
			})
			$('<i>')
			.addClass('fas fa-camera-retro p-1 border rounded mt-1')
			.appendTo('.modal-body')
			.click(e=>{
				alert('이미지 업로드 클릭성공2')
			})
			$('#btn-profile')
			.click(()=>{
				profile.onCreate()
			})
	}
	let setContentView=() => {
		$('head').append(brd_vue.brd_head())
		$('#mainNav').remove()
		$('.masthead').remove()
		$('.page-footer').remove()
		$('#mainpage').html(brd_vue.brd_body())
		recent_updates()
	}
	let recent_updates =()=> {
		$('#recent_updates .card').remove()
		$.getJSON(context +'/brds/list',d=>{
			$.each(d,(i,j)=>{
				$(`<div class="card mx-auto custom-card" >
                   	<div class="row post-header col-12 py-2 px-3">
                  	<div class="col-6 float-left "><h4>`+j.seq+`번째 게시글 </h4></div>
                	<div class="col-6 float-right text-right post-number"><h4>12/14</h4></div>
                    </div>
                    <img class="card-img" src="https://assets.breatheco.de/apis/img/images.php?blob&tags=bobdylan" alt="Card image cap">
                    <div class="card-body px-3">
                    <h5 class="card-title">1000 Likes</h5>
                    <p class="card-text">`+j.content+`</p>
                    </div>
                    <div class="row post-header px-3 pb-3">
                    <div class="col-1 float-left text-left"><i class="far fa-heart"></i></i></div>
                    <div class="col-10 float-left text-left">Comment...</div>
                    <div class="col-1 float-right text-right"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
                    </div>       
					</div>
					<div class="modal fade" id="myFullsizeModal${j.seq}" tabindex="-1" role="dialog" aria-labelledby="myFullsizeModalLabel">
					<div class="modal-dialog modal-fullsize" role="document">
					<div class="modal-content modal-fullsize">
					<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">`+j.seq+`</h4>
					</div>
					<div class="modal-body">
					<img class="card-img" src="https://assets.breatheco.de/apis/img/images.php?blob&tags=bobdylan" alt="Card image cap">
					<input type="text" class="modal-content" value="`+j.content+`">
					</div>
					<div class="modal-footer">	
					<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
					<button type="button" id="btn_update" class="btn btn-default" data-dismiss="modal">수정</button>
					</div>
					</div>
					</div>
					</div>`)
					.appendTo('#recent_updates')
					.click(()=>{
					update(j)
					})
				})
			})
	}
	let update=x=>{
		$(`#myFullsizeModal${x.seq}`).modal()
		$('#btn_update')
		.click(e=>{
			e.preventDefault()
			let data = {content:$(`#myFullsizeModal${x.seq}. modal-content`).val()}
			alert('수정클릭'+ $(`#myFullsizeModal${x.seq}. modal-content`).val())
			$.ajax({
				url:context+'/brds/update/'+x.seq,
				type:'PUT',
				data: JSON.stringify(data),
				dataType:'json',
				contentType: 'application/json',
				success:d=>{
					alert('성공')
				},
				error: e=>{
					alert('에러발생')
				}
			})
		})
	
	}
	let gohome =()=>{
		$('#brd_home').click(e=>{
			e.preventDefault()
			$('head').html(navi_vue.main_head({js :js,css:css}))
			app.run(context)
		})
	}
	return { onCreate }
})()