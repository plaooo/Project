package com.example.TestCreateProject.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.Admin;

@Repository
public class AdminRepo {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public List<Admin> GetAlladmin(){
		
		List<Admin> admins = new ArrayList<Admin>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList("SELECT * FROM admin");
		
		for (Map<String, Object> row : rows) {
		Admin admin = new Admin();
		admin.setId_admin((int) row.get("id_admin"));
		admin.setUsername((String) row.get("username"));
		admin.setPassword((String) row.get("password"));
		admins.add(admin);
		}
		return admins;
	}
	
	public List<Admin> GetLoginAdmin(Admin admin){
		List<Admin> admins = new ArrayList<Admin>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList("SELECT * FROM admin WHERE username = ? AND password = ?",admin.getUsername(),admin.getPassword());
		for(Map<String,Object> row:rows) {
			Admin adminss = new Admin();
			adminss.setId_admin((int) row.get("id_admin"));
			adminss.setUsername((String) row.get("username"));
			adminss.setPassword((String) row.get("password"));
			admins.add(adminss);
		}
		return admins;
	}
}