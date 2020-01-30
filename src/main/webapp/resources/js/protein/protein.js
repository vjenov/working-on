var protein = protein || {}
protein = (()=>{
	let _, img, css, js
	let app_js, navi_vue_js
	let protein_vue_js
	let init =()=> {
		_ = $.ctx()
		img = $.img()
		css = $.css()
		js = $.js()
		app_js = js + '/app.js'
		navi_vue_js = js + '/vue/menu/navi_vue.js'
		protein_vue_js = js + '/vue/protein/protein_vue.js'
	}
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(app_js),
			$.getScript(navi_vue_js),
			$.getScript(protein_vue_js)
		)
		.done(()=>{
			setContentView()
			proteinCalc()
		})
		.fail(()=>{alert('실패')})
	}
	let setContentView =()=>{
		alert('프로틴js setcontentview')
		$('#mainpage').html(protein_vue.protein_body(img))
	}
	let proteinCalc=()=>{
		let weight = localStorage.getItem('weight')
		alert(weight)
		$.getJSON(_+'/food/' + weight, d => {
			$.each(d, (i,j)=>{
				$( '<div id="id_'+i+'"></div>')
						.appendTo('#food')
					$('<img src="img/egg.png" /><a>'+j.fname+":"+Math.floor(weight/j.protein+1)+"개"+'</a>')
					.appendTo("#id_"+i)
			})
		})
	}
	return {onCreate, proteinCalc}
})()