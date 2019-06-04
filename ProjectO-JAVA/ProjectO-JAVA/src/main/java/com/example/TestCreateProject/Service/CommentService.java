package com.example.TestCreateProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.Commentday;
import com.example.TestCreateProject.Model.Commentmonth;
import com.example.TestCreateProject.Model.Commentyear;
import com.example.TestCreateProject.Repository.CommentRepo;

@Service
public class CommentService {

	@Autowired
	private CommentRepo commentrepo;
	
	public List<Commentyear> GetTopCommentOfTheYear(){
		return commentrepo.GetTopCommentYear();
	}
	public List<Commentmonth> GetTopCommentTheMonth(){
		return commentrepo.GetTopCommentMonth();
	}
	public List<Commentday> GetTopCommentTheDay(){
		return commentrepo.GetTopCommentDay();
	}
}
