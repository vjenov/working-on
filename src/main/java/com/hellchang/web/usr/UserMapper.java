package com.hellchang.web.usr;

import org.springframework.stereotype.Repository;
@Repository
public interface UserMapper {
	public void insertUser(User user);
	public User selectByIdPw(User user);
	public void makeRoutine(User user);
	public User deleteUser(User user);
	public int existId(String uid);
	public User selectUpdatedUser(User user);
}