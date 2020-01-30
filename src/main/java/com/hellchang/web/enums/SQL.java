package com.hellchang.web.enums;

public enum SQL {
	CREATE_CENTER, DROP_CENTER, TRUNCATE_CENTER,
	CREATE_ROUTINE, DROP_ROUTINE, TRUNCATE_ROUTINE,
	CREATE_ARTICLE, DROP_ARTICLE, TRUNCATE_ARTICLE;
	
	@Override
	public String toString() {
		//userid, passwd, uname, age, gender, height, weight, fat, muscle
		String result = "";
		switch (this) {
		case CREATE_CENTER:
			result = "CREATE TABLE CENTER("
					+ "CNAME VARCHAR(100) PRIMARY KEY,"
					+ "CADDR VARCHAR(200),"
					+ "CPHONE VARCHAR(100),"
					+ "CSCORE VARCHAR(50))";
			break;
		case DROP_CENTER : 
			result = "DROP TABLE USERS";
			break;
		case TRUNCATE_CENTER : 
			result = "TRUNCATE TABLE USERS";
			break;
		}
		return result;
	}
}
