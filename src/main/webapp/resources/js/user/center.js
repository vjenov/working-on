var center = center || {}
center = (()=>{
	let _,css,js,img
	let search_map_js
	let markers = []
	let places = []
	let init =()=>{
		_ = $.ctx()
		css = $.css()
		js = $.js()
		img = $.img()
		search_map_js = js + '/vue/menu/search_map.js'
	}
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(search_map_js)
		)
		.done(()=>{
			setContentView()
			createCenter()
		})
		.fail(()=>{})
	}
	let setContentView =()=>{
		// $('head').append(search_map.search_head())
		$('.masthead').remove()
		$('.page-footer').remove()
		$('#mainpage').empty()
		$('#mainpage').append(search_map.search())
		
		// var infowindow = new kakao.maps.InfoWindow({zIndex:1})
		let dt = $('#keyword').val()
		var mapContainer = document.getElementById('map'); 
		let mapOptions = { 
			center: new kakao.maps.LatLng(37.1557617, 126.9360351), 
			level: 3 ,
		};
		var map = new kakao.maps.Map(mapContainer, mapOptions);
		map.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
		// $('#searchButton').click(e=>{
		// 	e.preventDefault()
		// 	searchPlaces(dt,map)
		// })
		searchPlaces('마포구 헬스장',map)
		
	}
	let searchPlaces = (x,map) =>{
		var ps = new kakao.maps.services.Places(); 
		ps.keywordSearch(x, placesSearchCB);
		function placesSearchCB (data, status) {
			places = data
			console.log(places)
			page()
			if (status === kakao.maps.services.Status.OK) {
				var bounds = new kakao.maps.LatLngBounds();
				for (var i=0; i<data.length; i++) {
					markerr(data[i],map);    
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}       
				map.setBounds(bounds);
			} 
		}
		
	}
	let page =()=>{
		alert(places.length)
		$.each(places,(i,j)=>{
			$('<table><tr><td>'+j.address_name+'</td><td>'+j.place_name+'</td></tr></table>').appendTo('#pagination')
		})
	}
	let markerr = (place,map) =>{
		let infowindow = new kakao.maps.InfoWindow({zIndex:1})
		let marker = new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(place.y, place.x) 
		});
		markers.push(marker)
		kakao.maps.event.addListener(marker, 'click', function() {
			alert(place.place_name)
			infowindow.close();
		});
		kakao.maps.event.addListener(marker, 'mouseover', function() {
			infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
			infowindow.open(map, marker);
		});
		kakao.maps.event.addListener(marker, 'mouseout', function() {
			infowindow.close();
		});
		kakao.maps.event.addListener(marker, 'rightclick', function() {
			marker.setMap(null)
			infowindow.close();
		})
	}
	let createCenter =()=>{
       $('<button/>',{
		   text : '센터 테이블 생성',
		   type : 'submit'
	   })
	   .appendTo('#searchButton')
	   .click(e=>{
		   e.preventDefault()
		   $.getJSON(_+'/users/create/center',d=>{
			   if(d.msg === 'success'){alert(`테이블 생성`)}else{alert('실패')}
		   })
	}) 
	}
	return { onCreate }
})()

/* function displayMarker(x) {
			let infowindow = new kakao.maps.InfoWindow({zIndex:1})
			let marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(x.y, x.x) 
			});
			markers.push(marker)
			kakao.maps.event.addListener(marker, 'click', function() {
				alert(x.place_name)
				infowindow.close();
			});
			kakao.maps.event.addListener(marker, 'mouseover', function() {
				infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
				infowindow.open(map, marker);
			});
			kakao.maps.event.addListener(marker, 'mouseout', function() {
				infowindow.close();
			});
			kakao.maps.event.addListener(marker, 'rightclick', function() {
				marker.setMap(null)
				infowindow.close();
			});
		}	 */