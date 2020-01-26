package com.hellchang.web.food;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Component
@AllArgsConstructor
@NoArgsConstructor
public class Food {
	private String fname;
	private double protein;
}
