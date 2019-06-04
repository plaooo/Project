package com.example.TestCreateProject.Service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.Likelyday;
import com.example.TestCreateProject.Model.Likelymonth;
import com.example.TestCreateProject.Model.Likelyyear;
import com.example.TestCreateProject.Repository.UserLikelyRepo;

@Service
public class UserLikelyService {
	
	@Autowired
	private UserLikelyRepo likerepo;
	
	
	public List<Likelyyear> GetTopYear(){
		return likerepo.GetOfTheYear();
	}
	
	
	public List<Likelymonth> GetTopMonth(){
		return likerepo.GetOfTheMonth();
	}
	
	public List<Likelyday> GetTopDay(){
		return likerepo.GetOfTheDay();
	}
	
}
