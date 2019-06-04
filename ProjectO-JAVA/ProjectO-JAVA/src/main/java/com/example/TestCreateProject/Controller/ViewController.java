package com.example.TestCreateProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.ViewMonth;
import com.example.TestCreateProject.Model.Viewday;
import com.example.TestCreateProject.Model.Viewyear;
import com.example.TestCreateProject.Service.ViewService;

@RestController
@CrossOrigin(origins = "*")
public class ViewController {

	@Autowired
	private ViewService viewservice;
	
	@GetMapping("/user/viewoftheyear")
	public List<Viewyear> GetTopViewInYear(){
		return viewservice.GetTopViewYear();
	}
	@GetMapping("/user/viewofthemonth")
	public List<ViewMonth> GetTopViewInMonth(){
		return viewservice.GetTopViewMonth();
	}
	@GetMapping("/user/viewoftheday")
	public List<Viewday> GetTopViewInDay(){
		return viewservice.GetTopViewDay();
	}
}