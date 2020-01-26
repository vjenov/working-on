var edit_profile_vue = edit_profile_vue || {}
edit_profile_vue = {
	edit_profile_head: x => {
        return `
    			<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans" />
    			<link href="${x.css}/edit_profile.css" rel="stylesheet">`
	},
	edit_profile_body: () => {
		return `
    			<header>
        		<a class="navbar-brand" href="#" id="go_brdMain"><i class="fab fa-instagram"></i> Healthtagram</a>
      			</header>
    			</div>
    			<br/>
  				<div class="container">
        		<div class="row profile">
            	<div class="col-md-3">
                <div class="profile-sidebar">
                <div class="profile-img">
                <img src="https://yuscards.com/img/bg-img/client-3.jpeg" alt="" />
                <div class="file btn btn-lg btn-primary">
                    Change Photo
                <input type="file" name="file" />
                </div>
                </div>
                <div class="profile-usertitle">
                <div class="profile-usertitle-name">
                	Alladin TROUMBA
                </div>
                <div class="profile-usertitle-job">
                        Developer
                </div>
                </div>
                <div class="profile-userbuttons">
                    <a href="edit.html" class="btn btn-success btn-sm">프로필 사진 변경</a>
                </div>
                </div>
            	</div>
            	<div class="col-md-9">
                <div class="profile-content">
                <div class="row">
                <div class="col-md-12">
                <h4>Modify your Profile</h4>
                <br>
                </div>
                </div>
                <form>
                <div class="form-group row">
                <label for="username" class="col-4 col-form-label">User Name*</label>
                    <div class="col-8">
                        <input id="username" name="username" placeholder="Username" class="form-control here" required="required" type="text">
                    </div>
                </div>
                <div class="form-group row">
                <label for="name" class="col-4 col-form-label">First Name</label>
                    <div class="col-8">
                        <input id="name" name="name" placeholder="First Name" class="form-control here" type="text">
                    </div>
                </div>
                <div class="form-group row">
                <label for="lastname" class="col-4 col-form-label">Last Name</label>
                    <div class="col-8">
                        <input id="lastname" name="lastname" placeholder="Last Name" class="form-control here" type="text">
                    </div>
                </div>
                <div class="form-group row">
                <label for="text" class="col-4 col-form-label">Nick Name*</label>
                    <div class="col-8">
                        <input id="text" name="text" placeholder="Nick Name" class="form-control here" required="required" type="text">
                    </div>
                </div>
                <div class="form-group row">
                <label for="email" class="col-4 col-form-label">Email*</label>
                    <div class="col-8">
                        <input id="email" name="email" placeholder="Email" class="form-control here" required="required" type="text">
                    </div>
                </div>
                <div class="form-group row">
                <label for="publicinfo" class="col-4 col-form-label">Public Info</label>
                    <div class="col-8">
                        <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" class="form-control"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="offset-4 col-8">
                     	<button name="submit" type="submit" class="btn btn-primary">Update My Profile</button>
                    </div>
                </div>
                </form>
                </div>
            	</div>
        		</div>
    			</div>
    			<br>
    			<br>`
	}
}