var mypage = mypage || {}
mypage = (() => {
	let _, img, css, js
	let mypage_vue_js
	let brd_js
	let existing_routine_js, app_js,navi_vue_js, auth_js

	let init = () => {
		_ = $.ctx()
		img = $.img()
		css = $.css()
		js = $.js()
		mypage_vue_js = js + '/vue/user/mypage_vue.js'
		brd_js = js + '/brd/brd.js'
		existing_routine_js = js + '/user/existing_routine.js'
		app_js = js + '/app.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		auth_js  = js + '/user/auth.js'
	}
	let onCreate = x => {
		init()
		$.when(
			$.getScript(mypage_vue_js),
			$.getScript(brd_js),
			$.getScript(existing_routine_js),
			$.getScript(app_js),
			$.getScript(navi_vue_js),
			$.getScript(auth_js)
		).done(() => {
			setContentView()
			gomodify()
			gochart()
			goroutine()
			gohelgram()
			goHome()
		}).fail(() => {
			alert('Something goes wrong')
		})
	}
	let setContentView = () => {
		$('head').append(login_vue.login_head())
		$('.masthead2').remove()
		$('.page-footer').remove()
		$('#mainpage').empty()
		$('#mainpage').append(mypage_vue.mypage_main())
		$('h1[class="text-center"]').text('어서오세요'+ sessionStorage.getItem('uname') +'님')
	}
	let gomodify = () => {
		$('a[class="myModify"] span')
			.click(e => {
				e.preventDefault()
				$('.masthead').remove()
				$('.page-footer').remove()
				$('#mainpage').empty()
				$('#mainpage').append(mypage_vue.mypage_modify({ css: $.css() }))
			})
	}
	let gochart = () => {
		$('a[class="myGraph"] span')
			.click(e => {
				e.preventDefault()
				$('.masthead').remove()
				$('.page-footer').remove()
				$('#mainpage').empty()
				$('#mainpage').append(mypage_vue.mypage_chart(css))
				var ctx1 = $('#myChart1');
				var myPieChart = new Chart(ctx1,{
					type : 'pie',
					data :{
						labels : ['Chest', 'Back', 'Shoulder', 'Biceps', 'Triceps', 'Legs', 'Abdominals'],
						datasets : [{
							label: '부위 별 운동 횟수',
							data : [12, 6, 5, 8, 5, 2, 6],
							backgroundColor : ['#f5bd4f', '#f08530', '#d85348', '#861e52', '#15567e', '#23a8c0', '#38af9b'],
							
						}]
					},
					options:{
						maintainAspectRatio : false,
					}
				})
				var ctx2 = $('#myChart2');
				var ctx3 = $('#myChart3');
				var ctx4 = $('#myChart4');
				var myLineChart = new Chart(ctx4, {
					type: 'line',
					data: {
						labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
						datasets: [	{
							label: '내 월 별 근골격량',
							data: [0, 10, 5, 2, 20, 30, 45, 25, 35, 65, 23 ,11],
							backgroundColor: '#ff0066',
							borderColor: 'rgb(200, 0, 0)',
							borderWidth : 1,
							pointRadius : 5,
							pointHoverRadius : 10,
							pointBorderColor: 'yellow'
							},
							{label: '회원 평균 근골격량',
							borderColor: '#0000ff',
							data: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
							pointRadius : 5,
							pointHoverRadius : 10,
							fill:false
							}]
					},
					options: {
						maintainAspectRatio : false,
						}
				})
			})
	}
	let goroutine = x => {
		$('a[class="myRoutine"] span')
			.click(e => {
				e.preventDefault()
				existing_routine.onCreate()
			})
	}
	let gohelgram = x => {
		$('a[class="myHelgram"] span')
			.click(e => {
				e.preventDefault()
				brd.onCreate()
			})
	}
	let goHome =()=>{
		$('#home').click(e=>{
			e.preventDefault()
			main_home.onCreate()
		})
	}
	return { onCreate }
})()