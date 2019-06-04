package com.example.TestCreateProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.TypeBook;
import com.example.TestCreateProject.Service.TypeBookService;

@RestController
@CrossOrigin(origins = "*")
public class TypeBookController {
	
	@Autowired
	private TypeBookService typeBookService;
	
	@GetMapping("/typebook")
	public List<TypeBook> getTypeBook(){
		return typeBookService.getTypeBook();
	}

}
