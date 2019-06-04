package com.example.TestCreateProject.Model;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class User {

	private int id_user;
	private String name;
	private String lastname;
	private Date application_date;
	private Date birthday;
	private String panname;
	private String avatar;
	private String email;
	private String password;
	private int status;
	
	private List<Map<String, Object>> favor;
	
	private Date ban_day;

	public int getId_user() {
		return id_user;
	}

	public void setId_user(int id_user) {
		this.id_user = id_user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Date getApplication_date() {
		return application_date;
	}

	public void setApplication_date(Date application_date) {
		this.application_date = application_date;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPanname() {
		return panname;
	}

	public void setPanname(String panname) {
		this.panname = panname;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getBan_day() {
		return ban_day;
	}

	public void setBan_day(Date ban_day) {
		this.ban_day = ban_day;
	}

	public List<Map<String, Object>> getFavor() {
		return favor;
	}

	public void setFavor(List<Map<String, Object>> favor) {
		this.favor = favor;
	}

}
