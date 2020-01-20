"use strict";
var auth = auth || {}
auth = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
    let _, js, css, img, auth_vue_js, router_js, cookie_js, mypage_js
    let init =()=>{
        _ = $.ctx()
        js = $.js()
        css = $.css()
        img = $.img()
        auth_vue_js = js+'/vue/auth_vue.js'
        router_js = js + '/cmm/router.js'
		cookie_js = js + '/cmm/cookie.js'
		mypage_js = js + '/content/mypage.js'
    }
    let onCreate =()=>{
        init()
        $.when(
			$.getScript(auth_vue_js),
			$.getScript(router_js),
			$.getScript(cookie_js),
			$.getScript(mypage_js)
		)		
        .done(()=>{
        	setContentView()
    		$('#a_go_join').click(e=>{
         		e.preventDefault()
         		$('head').html(auth_vue.join_head())
		        $('body').html(auth_vue.join_body())
		        $('#uid').keyup(()=>{
		        	if($('#uid').val().length > 2){
		        		$.ajax({
		        			url : _+'/users/'+$('#uid').val()+'/existId',
		        	    	contentType : 'application/json',
		        	    	success : d => {
		        	    		alert('AJAX 성공 : '+d.msg)
		        	    		if(d.msg === 'Success')
		        	    			$('#dupl_check')
		        	    			.val('사용가능한 ID 입니다')
		        	    			.css('color','blue')
		            			else
		            				$('#dupl_check')
		        	    			.val('이미 사용한 ID 입니다')
		        	    			.css('color','red')
		        	    		
		        	    	},
		        	    	error : e => {
		        	    		alert('AJAX 실패')
		        	    	}
		        		})
		        	}
		        });
		        $('<button>',{
		            text : '회원가입',
		            href : '#',
		            click : e=>{
		            	e.preventDefault()
		            	join()
		            }
		        })
		        .addClass('btn btn-primary btn-lg btn-block')
		        .appendTo('#btn_join')
    		})
        }).fail(()=>{alert(WHEN_ERR)})
    }
    let setContentView =()=>{
    	$('head').html(auth_vue.login_head({css: $.css(), img: $.img()}))
        $('body').addClass('text-center')
        .html(auth_vue.login_body({css: $.css(), img: $.img()}))
        login()
    }
    let join =()=>{
    	let data = {uid : $('#uid').val(),
    			pwd : $('#pwd').val(),
				uname : $('#uname').val(),
				gender : $('#gender').val(),
				age : $('#age').val(),
				height : $('#height').val(),
				weight : $('#weight').val(),
				muscle : $('#muscle').val(),
				fat : $('#fat').val(),
				career : $('#career').val(),
				division : $('#division').val()}
    	alert('전송아이디: '+data.uid)
        $.ajax({
	    	url : _+'/users/',
	    	type : 'POST',
	    	dataType : 'json',
	    	data : JSON.stringify(data),
	    	contentType : 'application/json',
	    	success : d => {
	    		alert('AJAX 성공 : '+d.msg)
	    		if(d.msg === 'Success'){
	    			$('head').html(auth_vue.login_head({css: $.css(), img: $.img()}))
	    	        $('body').addClass('text-center')
	    	        .html(auth_vue.login_body({css: $.css(), img: $.img()}))
	    			login()
	    		}else
    				alert('회원가입 실패')
	    		
	    	},
	    	error : e => {
	    		alert('AJAX 실패')
	    	}
    	})
    }
    let login =()=>{
        $('<button>',{
        	text : "로그인",
        	click : e => {
        		e.preventDefault()
        		$.ajax({
        			url: _+'/users/'+$('#uid').val(),
        			type: 'POST',
        			data: JSON.stringify({
      				  uid : $('#uid').val(),
    				  pwd : $('#pwd').val()
    				}),
        			dataType: 'json',
        			contentType: 'application/json',
        			success: d =>{
        				alert('로그인성공'+router_js)
//        				$.extend(new User(d))
        				setCookie("UID", d.uid)
        				alert('저장된 쿠키:::' + getCookie("UID"))
        				mypage.onCreate(d)
        			},
        			error: e =>{
        				alert('AJAX ERROR ')
        			}
        			
        		})
        	}
        })
        .addClass("btn btn-lg btn-primary btn-block")
        .appendTo('#btn_login')
    }
    let existId =()=> {
    	
    }
    return {onCreate, join, login}
})();