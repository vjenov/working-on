package com.hellchang.web.routine;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Component
@AllArgsConstructor
@NoArgsConstructor
public class Routine {
	private String uid, ename, gender, part, parta, partb, partc, partd, parte;
	private double height, weight, muscle, fat;
	private int rweight, career, division;
}
