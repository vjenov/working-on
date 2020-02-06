package com.hellchang.web.post;

import java.util.List;

public interface ProfileMapper {
	public void insertUserImg(Profile profile);
	public void deleteUserImg(int userno);
	public List<Profile> selectedProfile(int userno);
	public void updateProfile(Profile param);
}
