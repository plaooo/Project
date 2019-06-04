package com.example.TestCreateProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.ViewMonth;
import com.example.TestCreateProject.Model.Viewday;
import com.example.TestCreateProject.Model.Viewyear;
import com.example.TestCreateProject.Repository.ViewRepo;

@Service
public class ViewService {
    
	@Autowired
	private ViewRepo viewrepo;
	
	public List<Viewyear> GetTopViewYear(){
		return viewrepo.GetTopViewYear();
	}
	
	public List<ViewMonth> GetTopViewMonth(){
		return viewrepo.GetTopViewMonth();
	}
	
	public List<Viewday> GetTopViewDay(){
		return viewrepo.GetTopViewDay();
	}
	
}