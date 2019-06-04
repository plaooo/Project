package com.example.TestCreateProject.Service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.Searchall;
import com.example.TestCreateProject.Repository.SearchRepo;

@Service
public class SearchService {

	@Autowired
	private SearchRepo searchrepo;
	
	public List<Searchall> GetAllFiction(){
		return searchrepo.GetAllFiction();
	}
}