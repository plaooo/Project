package com.example.TestCreateProject.Controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.Admin;
import com.example.TestCreateProject.Model.User;
import com.example.TestCreateProject.Security.JwtGenerator;
import com.example.TestCreateProject.Service.AdminService;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {

	@Autowired
	private JwtGenerator jwtGenerator;
	
	@Autowired
	public AdminService adminService;
	
	@GetMapping("/admin")
	public List<Admin> GetAllAdmin(){
		return adminService.GetAllAdmin();
	}
	
	@RequestMapping(value = "/admin/login", method = RequestMethod.POST, produces = "application/json")
	public HashMap<String, Object> login(@RequestBody Admin admin) {

		

		List<Admin> getadmin = adminService.GetLoginAdmin(admin);

		if (getadmin.size() == 1) {
			String jws = jwtGenerator.admingenerate(getadmin.get(0));
			System.out.println(jws);
			HashMap<String, Object> map = new HashMap<>();
			map.put("adminauth", jws);
			return map;

		} else {
			HashMap<String, Object> map = new HashMap<>();
			map.put("adminauth", null);
			
			return map;
		}

	}
}