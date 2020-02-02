var protein_vue = protein_vue || {}
protein_vue = {
	protein_body: x=>{
		return `
		<br />
		<br />
		<h3>`+sessionStorage.getItem('userid')+`님이 섭취해야할 단백질을 채워줄 음식</h3>
		<div id="food"></div>
		`	
	}
}