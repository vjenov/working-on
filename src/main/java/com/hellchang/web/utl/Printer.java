package com.hellchang.web.utl;

import java.util.function.Consumer;

import org.springframework.stereotype.Service;
@Service
public class Printer {
	public void accept(Object o) {
		// TODO Auto-generated method stub
		Consumer<String> c = System.out :: println;
		c.accept((String)o);
	}
}