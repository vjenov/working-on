package com.hellchang.web.post;

import java.io.File;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hellchang.web.enums.Path;
import com.hellchang.web.pxy.Box;

@RestController
@RequestMapping("/post")
public class PostCtrl {
	@Autowired PostMapper postMapper;
	@Autowired ProfileMapper profileMapper;
	@Autowired Box<Object> box;
	
	@PutMapping("/")
	public Map<?,?> writeBrd(@RequestBody Post param){
		System.out.println("글쓰기 들어옴"+ param.getContent()+param.getUserno());
		Consumer<Post> c = t -> postMapper.insertPost(t);
		c.accept(param);
		
		Supplier<String> s =()->  postMapper.countArtseq();
		box.put(Arrays.asList("msg","count"),Arrays.asList("SUCCESS",s.get()));
		return box.get();
	}
	
	@GetMapping("/list")
	public List<Post> list(){
		System.out.println("리스트 들어옴");
		Supplier<List<Post>> s= ()-> postMapper.selectAll();
		return s.get(); 
	}
	@GetMapping("/list/{userno}")
	public List<Post> userList(@PathVariable int userno){
		System.out.println("개인 리스트 들어옴 넘어온 userno"+userno);
		Supplier<List<Post>> s= ()-> postMapper.userSelectAll(userno);
		return s.get(); 
	}
	
	@GetMapping("/read/{postno}")
	public Post readBrd(@PathVariable int postno) {
		Supplier<Post> c = ()-> postMapper.selectPost(postno);
		return c.get();
	}
	
	@PutMapping("/update/{postno}")
	public Post updateBrd(@PathVariable int postno, @RequestBody Post param) {
		System.out.println("수정 들어옴" + param.getContent());
		System.out.println("수정 글번호" + param.getPostno());
		Consumer<Post> c = t -> postMapper.updatePost(param);
		c.accept(param);
		Supplier<Post> d = ()-> postMapper.selectPost(postno);
		System.out.println("수정결과물" + d.get());
		return d.get();
		
	}
	
	@DeleteMapping("/delete/{postno}")
	public Map<?,?> deleteBrd(@PathVariable int postno, @RequestBody Post param){
		System.out.println("삭제 들어옴 삭제번호는 " +param.getPostno());
		Consumer<Post> c = t-> postMapper.deletePost(param);
		c.accept(param);
		box.put(Arrays.asList("msg"), Arrays.asList("success"));
		return box.get();
	}
	
	@PostMapping("/fileupload")
	@ResponseBody
	public void fileUpload(MultipartFile[] uploadFile,
			@RequestParam String content, @RequestParam String tagname, @RequestParam int userno) {
		System.out.println("파일 업로드 들어옴 ");
		System.out.println("넘어온콘텐츠값"+content+"넘어온 태그네임"+tagname);
		Post post = new Post();
		String tempContent=null;
		String tempTagname=null;
		try {
			tempContent=URLDecoder.decode(content,"UTF-8");
			tempTagname=URLDecoder.decode(tagname,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		System.out.println("변환된 컨텐츠값"+tempContent+"변환된 태그네임"+tempTagname);
		UUID uuid = UUID.randomUUID();
		String uploadFolder = Path.UPLOAD_PATH.toString();
		for(MultipartFile multipartFile : uploadFile) {
			String uploadFileName = uuid+ "_"+multipartFile.getOriginalFilename();
			
			uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\")+1);
			post.setImg(uploadFileName);
			File saveFile = new File(uploadFolder,uploadFileName);
			try {
				multipartFile.transferTo(saveFile);  //이거 글자치면 try catch가 자동으로 뜸
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		post.setUserno(userno);
		post.setContent(tempContent);
		post.setTagname(tempTagname);
//		Tag tag = new Tag();

//		tag.setPostno(postno);
		
		Consumer<Post> c = t -> postMapper.insertPost(t);
		c.accept(post);
	
	}
//	@PostMapping("/profileupdate/{userno}")
//	public void profileupdate(MultipartFile[] profileImg,
//		      @RequestParam String content, @PathVariable int userno) {
//		System.out.println("프로필 업데이트 들어옴 ");
//		System.out.println("넘어온콘텐츠값"+content);
//		Profile profile = new Profile();
//		
//		UUID uuid = UUID.randomUUID();
//		String uploadFolder = Path.UPLOAD_PATH.toString();
//		for(MultipartFile multipartFile : profileImg) {
//			String uploadFileName = uuid+ "_"+multipartFile.getOriginalFilename();
//			
//			uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\")+1);
//			profile.setImg(uploadFileName);
//			File saveFile = new File(uploadFolder,uploadFileName);
//			try {
//				multipartFile.transferTo(saveFile);  //이거 글자치면 try catch가 자동으로 뜸
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//		profile.setUserno(userno);
//		profile.setContent(content);
//		
//		Consumer<Profile> c = t -> profileMapper.insertUserImg(profile);
//		c.accept(profile);
//	
//	}
//	@GetMapping("/profile/list")
//	public List<Post> profileList(){
//		System.out.println("프로필 리스트 들어옴");
//		Supplier<List<Post>> s= ()-> postMapper.selectAll();
//		return s.get(); 
//	}


}
