package com.example.TestCreateProject.Controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.Commentday;
import com.example.TestCreateProject.Model.Commentmonth;
import com.example.TestCreateProject.Model.Commentyear;
import com.example.TestCreateProject.Model.UserComment;
import com.example.TestCreateProject.Model.webboard;
import com.example.TestCreateProject.Service.CommentService;
import com.example.TestCreateProject.Service.UserCommentService;

@RestController
@CrossOrigin(origins = "*")
public class UserCommentController {

    @Autowired
    public UserCommentService usercommentservice;
	@Autowired
	public CommentService commentservice;
	
    @GetMapping("/user/usercomment")
    public List<UserComment> GetReportUser(){
    	return usercommentservice.GetCommentReport();
    }
    
    @GetMapping("/user/commentofyear")
    public List<Commentyear> GetTopCommentInYear(){
    	return commentservice.GetTopCommentOfTheYear();
    }
    
    @GetMapping("/user/commentofmonth")
    public List<Commentmonth> GetTopCommentInMonth(){
    	return commentservice.GetTopCommentTheMonth();
    }
    @GetMapping("/user/commentofday")
    public List<Commentday> GetTopCommentInDay(){
    	return commentservice.GetTopCommentTheDay();
    }
    
    @RequestMapping(value = "/user/cancelban", method = RequestMethod.PUT)
    public int Cancelban(@RequestBody int id) {
    	return  usercommentservice.Cancelban(id);
    }
    
    @RequestMapping(value = "/user/banuser", method = RequestMethod.PUT)
    public int Banuser(@RequestBody UserComment usercomment) {
      	return  usercommentservice.Banuser(usercomment);
    }
    
    @RequestMapping(value = "/user/insertcomment", method = RequestMethod.POST ,produces = "application/json")
    public int InsertComment(@RequestBody UserComment ment) {
    	return  usercommentservice.InsertComment(ment);
	}
	
    @RequestMapping(value = "/user/insertusercomment", method = RequestMethod.POST ,produces = "application/json")
    public int InsertUserComment(@RequestBody UserComment ment) {
    	return  usercommentservice.InsertUserComment(ment);
	}
    
    @RequestMapping(value = "/user/listcomment", method = RequestMethod.PUT)
    public List<UserComment> ListComment(@RequestBody UserComment ment){
    	return  usercommentservice.ListComment(ment);
    }
    
    @RequestMapping(value = "/user/modifyusercomment", method = RequestMethod.PUT)
    public int ModifyUserComment(@RequestBody UserComment ment) {
      	return  usercommentservice.ModifyUserComment(ment);
    }
    
    @RequestMapping(value = "/user/deleteusercomment", method = RequestMethod.PUT)
    public int DeleteUserComment(@RequestBody UserComment ment) {
      	return  usercommentservice.DeleteUserComment(ment);
    }
    
    @RequestMapping(value = "/user/reportusercomment", method = RequestMethod.PUT)
    public int ReportUserComment(@RequestBody UserComment ment) {
      	return  usercommentservice.ReportUserComment(ment);
    }
}