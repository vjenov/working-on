package com.hellchang.web.food;

import java.util.List;

import org.springframework.stereotype.Repository;
@Repository
public interface FoodMapper {
	public List<Food> selectAll();
}
