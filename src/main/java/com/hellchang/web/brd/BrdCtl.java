package com.hellchang.web.brd;

import java.util.Arrays;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellchang.web.pxy.Box;

@RestController
@RequestMapping("/brds")
public class BrdCtl {
	@Autowired BrdMapper brdMapper;
	@Autowired Box<Object> box;
	
	@PutMapping("/")
	public Map<?,?> writeBrd(@RequestBody Brd param){
		System.out.println("글쓰기 들어옴"+ param.getContent());
		Consumer<Brd> c = t -> brdMapper.insertBrd(t);
		c.accept(param);
		
		Supplier<String> s =()->  brdMapper.countArtseq();
		box.put(Arrays.asList("msg"),Arrays.asList("SUCCESS"));
		return box.get();
	}
	
	@GetMapping("/list")
	public List<Brd> list(){
		System.out.println("리스트 들어옴");
		Supplier<List<Brd>> s= ()-> brdMapper.selectAll();
		return s.get(); 
	}
	
	@GetMapping("/read/{seq}")
	public Brd readBrd(@PathVariable String seq) {
		Supplier<Brd> c = ()-> brdMapper.selectBrd(seq);
		return c.get();
	}
	
	@PutMapping("/update/{seq}")
	public Brd updateBrd(@PathVariable String seq, @RequestBody Brd param) {
		System.out.println("수정 들어옴");
		Consumer<Brd> c = t -> brdMapper.updateBrd(param);
		c.accept(param);
		Supplier<Brd> d = ()-> brdMapper.selectBrd(seq);
		return d.get();
	}
	
	@DeleteMapping("/{seq}")
	public Map<?,?> deleteBrd(@PathVariable String brdseq,@RequestBody Brd param){
		Consumer<Brd> c = t-> brdMapper.deleteBrd(param);
		c.accept(param);
		box.put(Arrays.asList("msg"), Arrays.asList("success"));
		return box.get();
	}
}
