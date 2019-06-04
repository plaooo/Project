package com.example.TestCreateProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Repository.AdminRepo;
import com.example.TestCreateProject.Model.Admin;

@Service
public class AdminService {

	@Autowired
	 private AdminRepo adminrepo;
	
	
	
	public List<Admin> GetAllAdmin(){
		return adminrepo.GetAlladmin();
	}
	
	public List<Admin> GetLoginAdmin(Admin admin){
		return adminrepo.GetLoginAdmin(admin);
	}
}
