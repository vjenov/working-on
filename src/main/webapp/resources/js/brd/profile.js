var profile = profile || {}
profile = (()=>{
	let _, js, css, img, brdjs, profile_vuejs, edit_profilejs
	let init = ()=>{
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
		brdjs = js + '/brd/brd.js'
		profile_vuejs = js+'/vue/brd/profile_vue.js'
		edit_profilejs = js + '/brd/edit_profile.js'
	}
	let onCreate =  () => {
		init()
		$.when(
			$.getScript(brdjs),
			$.getScript(profile_vuejs),
			$.getScript(edit_profilejs)
		)
		.done(()=>{
			setContentView()
			$('#btn-edit-profile').click(()=>{
				alert('edit profile go')
				edit_profile.onCreate()
			})
			$('#go_brdMain').click(()=>{
				brd.onCreate()
			})
			$('#btn-write').click(()=>{
				alert('파일업로드')
				$('#mainpage').html(profile_vue.write_form({css : $.css()}))
				fileupload()
			})
		})
		.fail(()=>{
		})

	}
	let setContentView =()=> {
		$('.masthead').remove()
		$('.page-footer').remove()
		$('#mainpage').empty()
		$('#mainpage').append(profile_vue.profile_body({css : $.css()}))
		$.getJSON(_+'/profile/info/'+sessionStorage.getItem('userno'),d=>{
			$.each(d,(i,j)=>{
				$(`
				<p class="profile__bio">
                <span class="profile__full-name">
                    ${sessionStorage.getItem('userid')}
                </span> 
                ${j.content}
				</p>`
				)
                .appendTo('#profile header div div.profile_content')
			})
		})
		$.getJSON(_+'/post/list/'+sessionStorage.getItem('userno'),d=>{
			$.each(d,(i,j)=>{
				$(` <div class="profile__photo">
                <img src="${_+'/resources/upload/'+j.img}" />
                <div class="profile__photo-overlay">
                    <span class="overlay__item">
                        <i class="fa fa-heart"></i>
                        486
                    </span>
                    <span class="overlay__item">
                        <i class="fa fa-comment"></i>
                        344
                    </span>
                </div>
            </div>
            
            		<div class="modal fade" id="myFullsizeModal${j.postno}" tabindex="-1" role="dialog" aria-labelledby="myFullsizeModalLabel">
							    <div class="modal-dialog modal-fullsize"  role="document">
							        <div class="modal-content modal-fullsize">
							            <div class="modal-header">
							                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							                <h4 class="modal-title">${j.postno}</h4>
							            </div>
							            <div class="modal-body">
							                <img class="card-img" src="${_+'/resources/upload/'+j.img}" alt="Card image cap">
							                <input type="text" class="modal-content" value="${j.content}">
							            </div>
							            <div class="modal-footer">
							                <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
							                <button type="button" class="btn modify" data-dismiss="modal">수정</button>
							                <button type="button" class="btn delete" data-dismiss="modal">삭제</button>
							            </div>
							        </div>
							    </div>
							</div>
            
            `)
				.appendTo('#profile section')
				.click(()=>{
					$(`#myFullsizeModal${j.postno}`).modal()
					post_update(j)
					post_delete(j)
				})
			})
		})
		
	}
	
	let post_update=x=>{
		$(`#myFullsizeModal${x.postno} div div div button.btn.modify`)
		.click(e=>{
			e.preventDefault()
			let data = {content:$(`#myFullsizeModal${x.postno} div div div input`).val(),
				postno:x.postno
				}
			alert('수정클릭이다' + data.postno)
			$.ajax({
				url:_+'/post/update/'+x.postno,
				type:'PUT',
				data: JSON.stringify(data),
				dataType:'json',
				contentType: 'application/json',
				success:d=>{
					setContentView()
				},
				error: e=>{
					alert('에러발생')
				}
			})
		})
	}
	let post_delete=x=>{
		$(`#myFullsizeModal${x.postno} div div div button.btn.delete`)
		.click(e=>{
			e.preventDefault()
	
			$.ajax({
				url:_+'/post/delete/'+x.postno,
				type:'DELETE',
				data: JSON.stringify({postno:x.postno}),
				dataType:'json',
				contentType: 'application/json',
				success:d=>{
					setContentView()
				},
				error: e=>{
					alert('에러발생')
				}
			})
		})
	}

	let fileupload =()=>{
    $('#go_brdMain').click(()=>{
        brd.onCreate()
    })
    $('#image').on('change', function() {
        
        ext = $(this).val().split('.').pop().toLowerCase(); //확장자
        
        //배열에 추출한 확장자가 존재하는지 체크
        if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            resetFormElement($(this)); //폼 초기화
            window.alert('이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)');
        } else {
            file = $('#image').prop("files")[0];
            blobURL = window.URL.createObjectURL(file);
            $('#image_preview img').attr('src', blobURL);
            $('#image_preview').slideDown(); //업로드한 이미지 미리보기 
            $(this).slideUp(); //파일 양식 감춤
        }
    })

    /**
    onclick event handler for the delete button.
    It removes the image, clears and unhides the file input field.
    */
    $('#image_preview a').bind('click', function() {
        resetFormElement($('#image')); //전달한 양식 초기화
        $('#image').slideDown(); //파일 양식 보여줌
        $(this).parent().slideUp(); //미리 보기 영역 감춤
        return false; //기본 이벤트 막음
    })
    function resetFormElement(e) {
        e.wrap('<form>').closest('form').get(0).reset(); 
        //리셋하려는 폼양식 요소를 폼(<form>) 으로 감싸고 (wrap()) , 
        //요소를 감싸고 있는 가장 가까운 폼( closest('form')) 에서 Dom요소를 반환받고 ( get(0) ),
        //DOM에서 제공하는 초기화 메서드 reset()을 호출
        e.unwrap(); //감싼 <form> 태그를 제거
    }


    $('<input>', {
      value: "파일업로드",
      type:"button"
    })
      .appendTo('#upload_form')
      .click(e => {
        e.preventDefault
        let form = $('#upload_form')[0]
        let formData = new FormData()
        let files = $('#image')[0].files  //[0] 은 아래 for문이 length 배열이라서 길이… 아마 저자는 파일말고 텍스트라던지 다른것들도 같이 업로드하려고 배열을 쓰지 않았을까 추측함!
        // 파일 하나 올리니깐[0]으로 한듯...
        formData.append("userno", sessionStorage.getItem('userno'))
        formData.append("content", encodeURIComponent($('#upload_form input[name="content"]').val()))
        formData.append("tagname", encodeURIComponent($('#upload_form input[name="tagname"]').val()))
        let i = 0
        for (i = 0; i < files.length; i++) {
          formData.append("uploadFile", files[i])
          
        }
        $.ajax({
          url: _+ '/post/fileupload',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: () => {
            alert('파일업로드성공')
            setContentView()
          },
          error: e => {
            alert('파일업로드 실패')
          }
        })

      }) 

  }
	return {onCreate}
})()