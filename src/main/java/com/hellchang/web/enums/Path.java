package com.hellchang.web.enums;

public enum Path {
UPLOAD_PATH, CRAWLING_TARGET;
	
	@Override
	public String toString() {
		String result = "";
		switch (this) {
		case UPLOAD_PATH:
			result = "C:\\Users\\taem\\springboot-workspace\\hellchang\\src\\main\\webapp\\resources\\upload";
			break;
		case CRAWLING_TARGET:
			break;
		}
		return result;
	}
}
