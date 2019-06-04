package com.example.TestCreateProject.Controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.User;
import com.example.TestCreateProject.Model.webboard;
import com.example.TestCreateProject.Service.WebboardService;

@RestController
@CrossOrigin(origins = "*")
public class WebboardController {

	@Autowired
	private WebboardService webboardservice;
	
	@GetMapping("/user/commentwebboardtypeone")
	public List<webboard> GetTypeOne(){
		return webboardservice.GetTypeOne();
	}
	
	@GetMapping("/user/commentwebboardtypetwo")
	public List<webboard> GetTypeTwo(){
		return webboardservice.GetTypeTwo();
	}
	
	@GetMapping("/user/commentwebboardtypethree")
	public List<webboard> GetTypeThree(){
		return webboardservice.GetTypeThree();
	}
	
	@GetMapping("/user/webboardtypeone")
	public List<webboard> GetTopicTypeOne(){
		return webboardservice.GetTopicTypeOne();
	}
	
	@GetMapping("/user/webboardtypetwo")
	public List<webboard> GetTopicTypeTwo(){
		return webboardservice.GetTopicTypeTwo();
	}
	
	@GetMapping("/user/webboardtypethree")
	public List<webboard> GetTopicTypeThree(){
		return webboardservice.GetTopicTypeThree();
	}
	
	@GetMapping("/user/webboardalltypeone")
	public List<webboard> GetTopicAllTypeOne(){
		return webboardservice.GetTopicAllTypeOne();
	}
	
	@GetMapping("/user/webboardalltypetwo")
	public List<webboard> GetTopicAllTypeTwo(){
		return webboardservice.GetTopicAllTypeTwo();
	}
	
	@GetMapping("/user/webboardalltypethree")
	public List<webboard> GetTopicAllTypeThree(){
		return webboardservice.GetTopicAllTypeThree();
	}
	
	@RequestMapping(value = "/user/createwebboard", method = RequestMethod.POST, produces = "application/json")
	public int CreateWebboard(@RequestBody webboard web){
	return webboardservice.CreateWebboard(web);
	}
	
	@RequestMapping(value = "/user/createcommentwebboard", method = RequestMethod.POST, produces = "application/json")
	public int CreateCommentWebboard(@RequestBody webboard web){
	return webboardservice.CreateCommentWebboard(web);
	}
	
	@RequestMapping(value = "/user/commentwebboard", method = RequestMethod.POST ,produces = "application/json")
	public List<webboard> GetCommentWebboardType(@RequestBody webboard webs){	
		return webboardservice.GetCommentWebboardType(webs);
	}
	
	@RequestMapping(value = "/user/typewebboard", method = RequestMethod.POST ,produces = "application/json")
	public List<webboard> GetTopicWebboard(@RequestBody webboard webs){	
		return webboardservice.GetTopicWebboard(webs);
	}
	
	@GetMapping("/user/getwebboardadminl3")
	public List<webboard> GetWebboardAdminL3(){
		return webboardservice.GetWebboardAdminL3();
	}
	
	@GetMapping("/user/getwebboardadmin")
	public List<webboard> GetWebboardAdmin(){
		return webboardservice.GetWebboardAdmin();
	}
	
	@RequestMapping(value = "/user/getdesadminwebboard", method = RequestMethod.POST ,produces = "application/json")
	public List<webboard> GetDesAdminWebboard(@RequestBody webboard webs){	
		return webboardservice.GetDesAdminWebboard(webs);
	}
	
	@RequestMapping(value = "/user/createadminwebboard", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public int CreateAdminWebboard(@RequestBody webboard web){
		System.out.println(web.getCollectWebboard());
        return webboardservice.CreateAdminWebboard(web);
	}
	
	@GetMapping("/user/checkwebboardreport")
	public List<webboard> CheckWebboardReport(webboard webs){
		return webboardservice.CheckWebboardReport(webs);
	}
	
	@RequestMapping(value = "/user/webboardcancelban", method = RequestMethod.PUT)
	public int WebboardCancelban(@RequestBody webboard web) {
		System.out.println(web.getIdUserWebboard());
		return webboardservice.Cancelban(web);
	}
	
	@RequestMapping(value = "/user/webboardbanuser", method = RequestMethod.PUT)
	public int WebboardBanuser(@RequestBody webboard web) {
		return webboardservice.Banuser(web);
	}
	
	@RequestMapping(value = "/user/setstatus1", method = RequestMethod.PUT)
	public int reportWebboard(@RequestBody webboard web) {
		
		return webboardservice.reportWebboard(web);
	}
	
	@RequestMapping(value = "/user/reportCommentWebboard", method = RequestMethod.PUT)
	public int reportComment(@RequestBody webboard web) {
		return webboardservice.reportComment(web);
	}
	
	@GetMapping("/user/foradminsearchdelete")
	public List<webboard> ForAdminSearchDelete(){
		return webboardservice.ForAdminSearchDelete();
	}
	
	@RequestMapping(value = "/user/admindeletewebboard", method = RequestMethod.PUT)
	public int DeleteWebboard(@RequestBody int id) {
		return webboardservice.DeleteWebboard(id);
	}
	
	@RequestMapping(value = "/user/adminmodifywebboard", method = RequestMethod.PUT)
	public int AdminModifyWebboard(@RequestBody webboard web) {
		return webboardservice.AdminModifyWebboard(web);
	}
	
	@RequestMapping(value = "/user/usermodifywebboard", method = RequestMethod.PUT)
	public int UserModifyWebboard(@RequestBody webboard web) {
		return webboardservice.UserModifyWebboard(web);
	}
	
	@RequestMapping(value = "/user/usermodifycomment", method = RequestMethod.PUT)
	public int UserModifyComment(@RequestBody webboard web) {
		return webboardservice.UserModifyComment(web);
	}
	
	@RequestMapping(value = "/user/userdeletecomment", method = RequestMethod.PUT)
	public int UserDeleteComment(@RequestBody webboard web) {
		return webboardservice.UserDeleteComment(web);
	}
	
	@RequestMapping(value = "/user/changeemail", method = RequestMethod.PUT)
	public int changeEmail(@RequestBody webboard web) {
		return webboardservice.changeEmail(web);
	}
}