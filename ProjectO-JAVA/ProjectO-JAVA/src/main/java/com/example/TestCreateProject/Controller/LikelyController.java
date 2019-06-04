package com.example.TestCreateProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.Likelyday;
import com.example.TestCreateProject.Model.Likelymonth;
import com.example.TestCreateProject.Model.Likelyyear;
import com.example.TestCreateProject.Service.UserLikelyService;

@RestController
@CrossOrigin(origins = "*")
public class LikelyController {
    
	@Autowired
	private UserLikelyService likelyservice;
	
	@GetMapping("/user/likeoftheyear")
	public List<Likelyyear> GetTopYear(){
		return likelyservice.GetTopYear();
	}
	@GetMapping("/user/likeoftheday")
	public List<Likelyday> GetTopDay(){
		return likelyservice.GetTopDay();
	}
	
	@GetMapping("/user/likeofthemonth")
	public List<Likelymonth> GetTopMonth(){
		return likelyservice.GetTopMonth();
	}
}
