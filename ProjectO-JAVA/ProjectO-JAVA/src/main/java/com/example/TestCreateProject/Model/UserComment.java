package com.example.TestCreateProject.Model;

import java.util.Date;

public class UserComment {
   private int idUser;
   private int idUserComment;
   private String collectComment;  
   private String name;
   private String penname;
   private String avatar;
   private int idBook;
   private int idEpisode;
   private int idComment;
   private String name_fiction;
public String getName_fiction() {
	return name_fiction;
}
public void setName_fiction(String name_fiction) {
	this.name_fiction = name_fiction;
}
public int getIdBook() {
	return idBook;
}
public void setIdBook(int idBook) {
	this.idBook = idBook;
}
public int getIdEpisode() {
	return idEpisode;
}
public void setIdEpisode(int idEpisode) {
	this.idEpisode = idEpisode;
}
public int getIdComment() {
	return idComment;
}
public void setIdComment(int idComment) {
	this.idComment = idComment;
}
public int getIdUser() {
	return idUser;
}
public void setIdUser(int idUser) {
	this.idUser = idUser;
}
public int getIdUserComment() {
	return idUserComment;
}
public void setIdUserComment(int idUserComment) {
	this.idUserComment = idUserComment;
}
public String getCollectComment() {
	return collectComment;
}
public void setCollectComment(String collectComment) {
	this.collectComment = collectComment;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getPenname() {
	return penname;
}
public void setPenname(String penname) {
	this.penname = penname;
}
public String getAvatar() {
	return avatar;
}
public void setAvatar(String avatar) {
	this.avatar = avatar;
}
}