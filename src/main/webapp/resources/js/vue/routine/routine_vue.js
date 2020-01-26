var routine_vue = routine_vue || {}
routine_vue = {
	routine_style : x=>{
		return `
				<link rel="stylesheet" href="/web/resources/css/style.css"/>
				<style>
				.card-img-wrap {
					overflow: hidden;
					position: relative;
				}
				.card-img-wrap:after {
					content: '';
					position: absolute;
					top : 0;left: 0; right: 0; bottom: 0;
					background: rgba(255,255,255,0.3);
					opacity: 0;
					transition: opacity .25s;
					text-align : center;
				}
				.card-img-wrap img {
					transition: transform .25s;
					width: 100%;
				}
				.card-img-wrap:hover img {
					transform: scale(1.2);
				}
				.card-img-wrap:hover:after {
					opacity: 1;
				}
				#routin_page{
					background-image: url(${x.img}/bakimage.jpg);
				}
				</style>`
	},
	routine_page : x=>{
		return `<div id="routin_page" class="content">
					<div class="container" id="routin">
						<div class="card-deck row" style="padding-top : 50px;">
							<div class="col-xs-12 col-sm-6 col-md-4"
								style="padding-top: 15px;
										padding-bottom: 15px;
										margin-left: 0px;
										margin-right: 10px;">
								<div class="card" style="width : 500px;">
									<div id="newRoutine" class="card-img-wrap">
										<img class="card-img-top" src="${x.img}/card2.jpg" alt="Card image cap" style="height : 700px;">
											<a href="#!"><div class="mask rgba-white-slight"></div></a>
									</div>
									<div class="card-body" style="background-color : whitesmoke;">
									<h4 class="card-title">새 루틴 생성</h4>
									
									</div>
								</div>
							</div>
				<div class="col-xs-12 col-sm-6 col-md-4"
				style="padding-left: 15px;
						margin-left: 200px;
						padding-top: 15px;
						padding-bottom: 15px;">
				<div class="card" style="width : 500px; height : 780px;">
					<div id="existRoutine" class="card-img-wrap">
					<img class="card-img-top" src="${x.img}/card3.jpg" alt="Card image cap" style="height : 701px;">
					<a href="#!"><div class="mask rgba-white-slight"></div></a>
					</div>
					<div class="card-body">
					<h4 class="card-title">기존 루틴 보러가기</h4>
					</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				<!-- modal 창-->
				<div class="modal fade right" id="fullHeightModalRight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-full-height modal-right" role="document">
				<div class="modal-content">
				<div class="modal-header">
				<h4 class="modal-title w-100" id="myModalLabel">새 루틴 생성</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
				</div>
				<div class="modal-body">
					 <div class="form-group">
                            <input type="text" class="form-input" name="height" id="height" placeholder="키를 입력하세여(cm 빼고)"/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="weight" id="weight" placeholder="몸무게 입력하세요(kg 빼고)"/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="fat" id="fat" placeholder="체지방량 입력하세요"/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="muscle" id="muscle" placeholder="근육량 입력하세요"/>
					</div>
					<div class="form-group">
                        <input type="text" class="form-input" name="muscle" id="career" placeholder="경력을 입력하세요"/>
					</div>
					<div class="form-group">
                        <input type="text" class="form-input" name="muscle" id="division" placeholder="분할을 입력하세요"/>
                    </div>
				</div>
				<div class="modal-footer justify-content-center">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save routine</button>
				</div>
				</div>
			</div>
			</div>`
	},
	exist_style : x=>{
		return `<link rel="stylesheet" href="${x.css}/routine.css" />`
	},
	existRoutine : x=>{
		return `<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="main-timeline">
                <div class="timeline">
                    <span class="icon fa fa-globe"></span>
                    <a href="#" class="timeline-content">
						<h3 class="title">First Step</h3>
						<img src="http://m.targetview.com/data/article_img/2016/11/07ad4a69457d.jpg" alt="" />
                        <p class="description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo quis.
                        </p>
                    </a>
                </div>
                <div class="timeline">
                    <span class="icon fa fa-rocket"></span>
                    <a href="#" class="timeline-content">
						<h3 class="title">Second Step</h3>
						<img src="http://cfile224.uf.daum.net/image/244A344A58ABE5721CC864" alt="" />
                        <p class="description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo quis.
                        </p>
                    </a>
				</div>
				<div class="timeline">
                    <span class="icon fa fa-rocket"></span>
                    <a href="#" class="timeline-content">
						<h3 class="title">Third Step</h3>
						<img src="${x.img}/55.png" alt="" />
                        <p class="description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo quis.
                        </p>
                    </a>
				</div>
				<div class="timeline">
                    <span class="icon fa fa-rocket"></span>
                    <a href="#" class="timeline-content">
						<h3 class="title">Four Step</h3>
						<img src="${x.img}/66.jpg" alt="" />
                        <p class="description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tellus lorem, et condimentum neque commodo quis.
                        </p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>`
	}

}