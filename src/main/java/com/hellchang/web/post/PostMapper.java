package com.hellchang.web.post;


import java.util.List;


import org.springframework.stereotype.Repository;

@Repository
public interface PostMapper {
	//게시물 등록 기능(사진 첨부파일 포함)
	public void insertPost(Post param);
	//게시물 목록 조회 기능(모든 사진)
	public List<Post> selectAll();
	public String countArtseq();
	public Post selectPost(int postno);
	//아이디로 회원번호 조회후 번호로 모든 게시물 불러오기
	List<Post> selectPostListById(int userno);
	
	public void updatePost(Post param);
	//게시물 삭제
	public void deletePost(Post param);
}
