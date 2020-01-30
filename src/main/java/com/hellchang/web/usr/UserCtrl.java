package com.hellchang.web.usr;

import java.util.HashMap;
import java.util.Map;

import java.util.function.Consumer;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellchang.web.enums.SQL;
import com.hellchang.web.pxy.Box;
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
	@Autowired
	Box<Object> box;

	@PostMapping("/join")
	public Map<?, ?> join(@RequestBody User param) {
		printer.accept("회원가입 진입");
		printer.accept("ajax에서 넘어온 데이터 : " + param);
		Consumer<User> consumer = t-> userMapper.insertUser(t);
		consumer.accept(param);
		box.put("msg", "success");
		return box.get();
	}

	@PostMapping("/login")
	public Map<?, ?> login(@RequestBody User param) {
		printer.accept("로그인진입 :::" +param.getUserid());
		Function<User, User> f = t -> userMapper.selectByIdPw(param);
		user = f.apply(param);
		String result = (user != null) ? "success" : "fail" ;
		printer.accept("성공여부 : "+result +"\n" + user);
		box.clear();
		box.put("msg", result);
		box.put("user", user);
//		box.put(Arrays.asList("msg","user"), Arrays.asList(result,user));
		printer.accept("보내는 값 : "+ box.get());
		return box.get();
	}

	@GetMapping("/exist/{userid}")
	public Map<?,?> dupleCheck(@PathVariable String userid){
		Function<String, Integer> function = t -> userMapper.existId(t);
		box.clear();
		box.put("msg", (function.apply(userid) !=0) ? "Y" : "N");
		return box.get();
	}
	
	@PutMapping("/{uid}")
	public User makeRoutine(@PathVariable String uid, @RequestBody User param) {
		printer.accept("루틴 만들기 도착");
		printer.accept("아이디" + param);
		Consumer<User> c = o -> userMapper.makeRoutine(param);
		c.accept(param);
		Function<User, User> f = t -> userMapper.selectUpdatedUser(param);
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
	
	@GetMapping("/create/center")
	public Map<?, ?> makeTable(){
		HashMap<String, String> paramMap = new HashMap<>();
		printer.accept("테이블생성 들어옴");
		paramMap.put("CREATE_CENTER", SQL.CREATE_CENTER.toString());
		Consumer<HashMap<String, String>> consumer = t-> userMapper.createCenter(paramMap);
		consumer.accept(paramMap);
		paramMap.clear();
		paramMap.put("msg", "success");
		return paramMap;
	}
}