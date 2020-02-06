package com.hellchang.web.usr;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @Component
@AllArgsConstructor
@NoArgsConstructor
public class User{
	private String userid, passwd, uname, age, gender, height, weight, fat, muscle;
	private int career, division, userno;
}