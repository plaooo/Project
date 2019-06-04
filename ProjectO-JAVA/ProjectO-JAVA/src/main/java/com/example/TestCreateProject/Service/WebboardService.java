package com.example.TestCreateProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.TestCreateProject.Model.webboard;
import com.example.TestCreateProject.Repository.WebboardRepo;

@Service
public class WebboardService {

	@Autowired
	private WebboardRepo webboardrepo;
	
	public List<webboard> GetTypeOne(){
		return webboardrepo.GetTypeOne();
	}
	
	public List<webboard> GetTypeTwo(){
		return webboardrepo.GetTypeTwo();
	}
	
	public List<webboard> GetTypeThree(){
		return webboardrepo.GetTypeThree();
	}
	
	public List<webboard> GetTopicTypeOne(){
		return webboardrepo.GetTopicTypeOne();
	}
	
	public List<webboard> GetTopicTypeTwo(){
		return webboardrepo.GetTopicTypeTwo();
	}
	
	public List<webboard> GetTopicTypeThree(){
		return webboardrepo.GetTopicTypeThree();
	}
	
	public List<webboard> GetTopicAllTypeOne(){
		return webboardrepo.GetTopicAllTypeOne();
	}
	
	public List<webboard> GetTopicAllTypeTwo(){
		return webboardrepo.GetTopicAllTypeTwo();
	}
	
	public List<webboard> GetTopicAllTypeThree(){
		return webboardrepo.GetTopicAllTypeThree();
	}
	
	public int CreateWebboard(webboard web) {
		return webboardrepo.CreateWebboard(web);
	}
	
	public int CreateCommentWebboard(webboard web) {
		return webboardrepo.CreateCommentWebboard(web);
	}
	
	public List<webboard> GetCommentWebboardType(webboard web){
		return webboardrepo.GetCommentWebboardType(web);
	}
	
	public List<webboard> GetTopicWebboard(webboard webs){
		return webboardrepo.GetTopicWebboard(webs);
	}
	
	public List<webboard> GetWebboardAdminL3(){
		return webboardrepo.GetWebboardAdminL3();
	}
	
	public List<webboard> GetWebboardAdmin(){
		return webboardrepo.GetWebboardAdmin();
	}
	
	public List<webboard> GetDesAdminWebboard(webboard webs){
		return webboardrepo.GetDesAdminWebboard(webs);
	}
	
	public int CreateAdminWebboard(webboard web) {
		return webboardrepo.CreateAdminWebboard(web);
	}
	
	public List<webboard> CheckWebboardReport(webboard webs){
		return webboardrepo.CheckWebboardReport(webs);
	}
	
	public int Cancelban(webboard web) {
		return webboardrepo.Cancelban(web);
	}
	
	public int Banuser(webboard web) {
		return webboardrepo.Banuser(web);
	}
	
	public int reportWebboard(webboard web) {
		return webboardrepo.reportWebboard(web);
	}
	
	public int reportComment(webboard web) {
		return webboardrepo.reportComment(web);
	}
	
	public List<webboard> ForAdminSearchDelete(){
		return webboardrepo.ForAdminSearchDelete();
	}
	
	public int DeleteWebboard(int id) {
		return webboardrepo.DeleteWebboard(id);
	}
	
	public int AdminModifyWebboard(webboard web) {
		return webboardrepo.AdminModifyWebboard(web);
	}
	
	public int UserModifyWebboard(webboard web) {
		return webboardrepo.UserModifyWebboard(web);
	}
	
	public int UserModifyComment(webboard web) {
		return webboardrepo.UserModifyComment(web);
	}
	
	public int UserDeleteComment(webboard web) {
		return webboardrepo.UserDeleteComment(web);
	}
	
	public int changeEmail(webboard web) {
		return webboardrepo.changeEmail(web);
	}
}