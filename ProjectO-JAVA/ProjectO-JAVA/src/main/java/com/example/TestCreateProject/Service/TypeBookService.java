package com.example.TestCreateProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.TypeBook;
import com.example.TestCreateProject.Repository.TypebookRepo;

@Service
public class TypeBookService {

	@Autowired
	private TypebookRepo typebookRepo;
	
	public List<TypeBook> getTypeBook(){
		return typebookRepo.getTypeBook();
	}
}
