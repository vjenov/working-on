package com.hellchang.web.usr;

import java.util.HashMap;

import org.springframework.stereotype.Repository;
@Repository
public interface UserMapper {
	public void insertUser(User user);
	public User selectByIdPw(User user);
	public void makeRoutine(User user);
	public User deleteUser(User user);
	public int existId(String userid);
	public User selectUpdatedUser(User user);
	public void createCenter(HashMap<String, String> paramMap);
	public User infoUserByUserNo(int userno);
}