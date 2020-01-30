package com.hellchang.web.brd;

import java.util.List;


import org.springframework.stereotype.Repository;

@Repository
public interface BrdMapper {
	public void insertBrd(Brd param);
	public List<Brd> selectAll();
	public String countArtseq();
	public Brd selectBrd(String brdseq);
	public void updateBrd(Brd param);
	public void deleteBrd(Brd param);
}
