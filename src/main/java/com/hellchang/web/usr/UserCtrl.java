package com.hellchang.web.usr;

import java.util.Map;

import java.util.function.Consumer;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellchang.web.utl.Printer;

@RestController
@RequestMapping("/users")
public class UserCtrl {
	@Autowired
	Map<String, Object> map;
	@Autowired
	User user;
	@Autowired
	Printer printer;
	@Autowired
	UserMapper userMapper;

	@GetMapping("/{uid}/existId")
	public Map<?, ?> existId(@PathVariable String uid) {
		Function<String, Integer> f = t -> userMapper.existId(uid);
		map.clear();
		map.put("msg", (f.apply(uid) == 0) ? "Success" : "Already Exist");
		return map;
	}

	@PostMapping("/")
	public Map<?, ?> join(@RequestBody User param) {
		Consumer<User> c = o -> userMapper.insertUser(param);
		c.accept(param);
		map.clear();
		map.put("msg", "Success");
		return map;
	}

	@PostMapping("/{uid}")
	public User login(@PathVariable String uid, @RequestBody User param) {
		Function<User, User> f = t -> userMapper.selectByIdPw(param);
		return f.apply(param);
	}

	@PutMapping("/{uid}")
	public Map<?, ?> makeRoutine(@PathVariable String uid, @RequestBody User param) {
		printer.accept("루틴 만들기 도착");
		printer.accept("아이디" + param);
		Consumer<User> c = o -> userMapper.makeRoutine(param);
		c.accept(param);
		map.clear();
		map.put("msg", "Success");
		return map;
	}

	@GetMapping("/{uid}")
	public User showRoutine(@PathVariable String uid, @RequestBody User param) {
		printer.accept("컨트롤러 도착" + param);
		Function<User, User> f = null;
		switch(param.getDivision()) {
			case 0 : f = t -> userMapper.find0RoutineById(param);
			break;
			case 2 : f = t -> userMapper.find2RoutineById(param);
			break;
			case 3 : f = t -> userMapper.find3RoutineById(param);
			break;
			case 5 : f = t -> userMapper.find5RoutineById(param);
			break;
			}
		return f.apply(param);
	}

	@DeleteMapping("/{uid}")
	public Map<?, ?> removeUser(@PathVariable String uid, @RequestBody User param) {
		Consumer<User> c = o -> userMapper.deleteUser(param);
		c.accept(param);
		map.clear();
		map.put("msg", "Delete Success");
		return map;
	}
}