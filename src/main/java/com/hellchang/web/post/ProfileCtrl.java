package com.hellchang.web.post;


import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.function.Supplier;

import org.jsoup.internal.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hellchang.web.enums.Path;

@RestController
@RequestMapping("/profile")
public class ProfileCtrl {
	@Autowired ProfileMapper profileMapper;
	@PostMapping("/update/{userno}")
	public void profileupdate(MultipartFile[] profileImg,
		      @RequestParam String content, @PathVariable int userno) {
		System.out.println("넘어온콘텐츠값"+content+"넘어온 userno ="+ userno);
		Profile profile = new Profile();
		String tempContent = null;
		try {
			tempContent=URLDecoder.decode(content,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		UUID uuid = UUID.randomUUID();
		String uploadFolder = Path.UPLOAD_PATH.toString();
		for(MultipartFile multipartFile : profileImg) {
			String uploadFileName = uuid+ "_"+multipartFile.getOriginalFilename();
			uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\")+1);
			profile.setImg(uploadFileName);
			File saveFile = new File(uploadFolder,uploadFileName);
			try {
				multipartFile.transferTo(saveFile);  //이거 글자치면 try catch가 자동으로 뜸
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		profile.setUserno(userno);
		profile.setContent(tempContent);
		Supplier<List<Profile>> s= ()-> profileMapper.selectedProfile(userno);
		System.out.println(s.get().size());
		if (s.get().size()==0) {
			Consumer<Profile> c = t -> profileMapper.insertUserImg(profile);
			c.accept(profile);
		} else {
			Consumer<Profile> c = t -> profileMapper.updateProfile(profile);
			c.accept(profile);
		}
	}
	@GetMapping("/info/{userno}")
	public List<Profile> profileInfo(@PathVariable int userno){
		Supplier<List<Profile>> c= ()-> profileMapper.selectedProfile(userno);
		return c.get();
	}
}