package com.example.TestCreateProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.Searchall;
import com.example.TestCreateProject.Service.SearchService;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {

	@Autowired
	private SearchService searchservice;
	
	@GetMapping("/user/searchall")
	public List<Searchall> GetAllFiction(){
		System.out.println("22");
		return searchservice.GetAllFiction();
	}
}