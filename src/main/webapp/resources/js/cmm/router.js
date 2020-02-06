"use strict";
function Session(x){
	sessionStorage.setItem('ctx', x);
	sessionStorage.setItem('js', x + '/resources/js');
	sessionStorage.setItem('css', x + '/resources/css');
	sessionStorage.setItem('img', x + '/resources/img');
	return {
		ctx : ()=>{return sessionStorage.getItem('ctx');},
		js : ()=>{return sessionStorage.getItem('js');},
		css : ()=>{return sessionStorage.getItem('css');},
		img : ()=>{return sessionStorage.getItem('img');}
	}
}
function Users(t){
	sessionStorage.setItem('userno',t.userno);
	sessionStorage.setItem('userid',t.userid);
	sessionStorage.setItem('passwd',t.passwd);
	sessionStorage.setItem('uname',t.uname);
	sessionStorage.setItem('age',t.age);
	sessionStorage.setItem('gender',t.gender);
	sessionStorage.setItem('weight',t.weight);
	sessionStorage.setItem('height',t.height);
	sessionStorage.setItem('fat',t.fat);
	sessionStorage.setItem('muscle',t.muscle);
	localStorage.setItem('career', t.career);
	localStorage.setItem('division', t.division);
	return {
		userno : ()=>{return sessionStorage.getItem('userno');},
		userid : ()=>{return sessionStorage.getItem('userid');},
		passwd : ()=>{return sessionStorage.getItem('passwd');},
		uname : ()=>{return sessionStorage.getItem('uname');},
		age : ()=>{return sessionStorage.getItem('age');},
		gender : ()=>{return sessionStorage.getItem('gender');},
		weight : ()=>{return sessionStorage.getItem('weight');},
		height : ()=>{return sessionStorage.getItem('height');},
		fat : ()=>{return sessionStorage.getItem('fat');},
		muscle : ()=>{return sessionStorage.getItem('muscle');},
		career : ()=>{return localStorage.getItem('career');},
		division : ()=>{return localStorage.getItem('division');}
	}
}