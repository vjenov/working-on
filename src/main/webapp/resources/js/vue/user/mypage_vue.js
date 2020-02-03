"use strict"
var mypage_vue = mypage_vue || {}
mypage_vue ={
	mypage_main:x=>{
		return `
		<link rel="stylesheet" href="/web/resources/css/mypageMain.css"/>
    <h1 class="text-center">어서오세요 `+ sessionStorage.getItem('userid') + `님</h1>
	<div class="container">
		<div class="row">
	
		<!--team-1-->
	<div class="col-lg-4">
	<div class="our-team-main">
	
	<div class="team-front">
	<img class="img-fluid1" />
	<h3>회원정보 수정</h3>
	<p>Modifying member information</p>
	</div>
	
	<div class="team-back">
	<a href="#" class ="myModify">
		<span>
			<br />
			비밀번호, 전화번호 등</br>
			개인정보 수정을 원하신다면</br>
			이 쪽으로 들어와 주세요!</br>
		</span>
	</a>
	</div>
	</div>
	</div>
	
	<!--team-2-->
	<div class="col-lg-4">
	<div class="our-team-main">
	
	<div class="team-front">
	<img class="img-fluid2" />
	<h3>회원 그래프 보기</h3>
	<p>View Member Graphs</p>
	</div>
	
	<div class="team-back">
	<a href="#" class="myChart">
		<span>
		<br />
		부위 별 운동횟수,</br>
		운동기간, 운동횟수를</br>
		정리하여 보여드릴게요!</br>
		</span>
	</a>
</div></div></div>
	
	<!--team-3-->
	<div class="col-lg-4">
	<div class="our-team-main">
	
	<div class="team-front">
	<img class="img-fluid3" />
	<h3>내 루틴 보러가기</h3>
	<p>Check my routine</p>
	</div>
	
	<div class="team-back">
	<a href="#" class="myRoutine">
		<span>
		<br />
		내가 받은 루틴을 확인하고<br/>
		열심히 운동해서<br />
		헬린이 탈추우우울!!!
		</span>
	</a>
	</div>
	</div>
	</div>
	
	<!--team-4-->
	<div class="col-lg-4">
	<div class="our-team-main">
	
	<div class="team-front">
	<img class="img-fluid4" />
	<h3>내가 작성한 헬그램 보러가기</h3>
	<p>Go see my helgram</p>
	</div>
	<div class="team-back">
	<a href="#" class="myHelgram">
		<span>
		<br />
		지금까지 회원님께서<br />
		작성한 게시글들을<br />
		확인하러 가 볼까요?~ :)
		</span>
	</a>
	</div>
	</div>
	</div>
	
	<!--team-5-->
	<div class="col-lg-4">
	<div class="our-team-main">
	
	<div class="team-front">
	<img class="img-fluid5" />
	<h3>단백질 계산 및 섭취</h3>
	<p>protein calculation and ingestion</p>
	</div>
	
	<div class="team-back">
	<a href="#" class="myProtein">
		<span>
		<br />
		김종국 어록<br />운동은 먹는 것까지가 운동이다<br />
		각자 몸에 맞는 충분한 단백질 섭취로<br />
		근손실 걱정은 그만!!
		</span>
	</a>
	</div>
	
	</div>
	</div>
	
	<!--team-6-->
	<div class="col-lg-4">
	<div class="our-team-main">
	
	<div class="team-front">
	<img src="http://placehold.it/110x110/2196f3/fff?text=Dilip" class="img-fluid" />
	<h3>Dilip Kevat</h3>
	<p>Web Designer</p>
	</div>
	
	<div class="team-back">
	<span>
	Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	natoque penatibus et magnis dis parturient montes,
	Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	natoque.
	</span>
	</div>
	</div>
	</div>
	<!--team-6-->
	</div>
	</div>`
	},
	mypage_modify: x=>{
		return `
		<link rel="stylesheet" href="${x.css}/mypageModify.css"/>
		
		<div class="main">
        <section class="myModify">
            <div class="container2">
                <div class="myModify-content">
                    <form method="POST" id="myModify-form" class="myModify-form">
                        <h2 class="form-title">개인정보를 바꾸시려구요?</h2>
                        <div class="form-group">
                            <input type="password" class="form-input" name="oldpasswd" id="oldpasswd" placeholder="기존 비밀번호를 입력하세요."/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-input" name="newpasswd" id="newpasswd" placeholder="새 비밀번호를 입력하세요."/>
						</div>
						 <div class="form-group">
                            <input type="password" class="form-input" name="re_passwd" id="re_passwd" placeholder="새 비밀번호를 확인합니다."/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-input" name="uname" id="newName" placeholder="이름을 입력하세요."/>
                            <span toggle="#password" class="zmdi zmdi-eye field-icon toggle-password"></span>
                        </div>
                         <div class="form-group">
                            <input type="text" class="form-input" name="age" id="newAge" placeholder="나이를 입력하세요."/>
                        </div>
                        <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">성별</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                                <label class="form-check-label" for="gridRadios1">남성</label>
                                </div>
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                                <label class="form-check-label" for="gridRadios2">여성</label>
                                </div>
                        </div>
                        </div>
                        </fieldset>
                        <div class="form-group">
                            <input type="submit" name="submit" id="submit" class="form-submit" value="Modify up"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>`
	},
	mypage_chart: x=>{
		return `
		<link rel="stylesheet" href="${x}/mypageChart.css"/>
		<div class="chartMain">
			<div class="chart1">
				<canvas id="myChart1"></canvas>
			</div>
			<div class="chart2">
				<div id="chart-container"></div>
			</div>
			<div class="chart3">
			  <div class="main">
					<div class="content-wrap">
					<div class="content-left">
						<div class="main-wrap">
						<div id="main-day" class="main-day"></div>
						<div id="main-date" class="main-date"></div>
						</div>
						<div class="todo-wrap">
						<div class="todo-title">Todo List</div>
						<div class="input-wrap">
							<input type="text" placeholder="please write here!!" id="input-box" class="input-box">
							<button type="button" id="input-data" class="input-data">INPUT</button>
							<div id="input-list" class="input-list"></div>
						</div>
						</div>
					</div>
					<div class="content-right">
						<table id="calendar" align="center">
						<thead>
							<tr class="btn-wrap clearfix">
							<td>
								<label id="prev">
									&#60;
								</label>
							</td>
							<td align="center" id="current-year-month" colspan="5"></td>
							<td>
								<label id="next">
									&#62;
								</label>
							</td>
							</tr>
							<tr>
								<td class = "sun" align="center">Sun</td>
								<td align="center">Mon</td>
								<td align="center">Tue</td>
								<td align="center">Wed</td>
								<td align="center">Thu</td>
								<td align="center">Fri</td>
								<td class= "sat" align="center">Sat</td>
							</tr>
						</thead>
						<tbody id="calendar-body" class="calendar-body"></tbody>
						</table>
					</div>
					</div>
				</div>
			</div>
			<div class="chart4">
				<canvas id="myChart4"></canvas>
			</div>
		</div>`
	}
}