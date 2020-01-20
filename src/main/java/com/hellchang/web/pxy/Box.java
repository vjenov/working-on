package com.hellchang.web.pxy;

import java.util.HashMap;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


@Component @Lazy
public class Box<T> {
	private HashMap<String, T> map;

	public Box() {
		map = new HashMap<String, T>();
	}

	public void put(List<String> x, List<T> y) {
		for (int i = 0; i < x.size(); i++) {
			map.put(x.get(i), y.get(i));
		}
		map.forEach((k, v) -> System.out.print(String.format("%s : %s", k, v)));

	}

	public void put(String x, T y) {
		map.put(x, y);
	}

	public T get(String k) {
		return map.get(k);
	}

	public HashMap<String, T> get() {
		return map;
	}

	public int size() {
		return map.size();
	}

	public void clear() {
		map.clear();
	}

}
