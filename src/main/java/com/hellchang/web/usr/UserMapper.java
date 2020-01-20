package com.hellchang.web.usr;

import org.springframework.stereotype.Repository;
@Repository
public interface UserMapper {
	public void insertUser(User user);
	public User selectByIdPw(User user);
	public User find0RoutineById(User user);
	public User find2RoutineById(User user);
	public User find3RoutineById(User user);
	public User find5RoutineById(User user);
	public void makeRoutine(User user);
	public User deleteUser(User user);
	public int existId(String uid);
}