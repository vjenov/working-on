package com.hellchang.web.post;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellchang.web.usr.User;

@RestController
@RequestMapping("/likes")
public class LikesCtrl {
	@Autowired User user;
	


}
