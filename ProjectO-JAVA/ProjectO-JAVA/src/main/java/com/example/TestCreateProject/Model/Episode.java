package com.example.TestCreateProject.Model;

public class Episode {
	
	private int id_episode;
	private String name_episode;
	private int view;
	private String content;
	private int id_book;
	public int getId_episode() {
		return id_episode;
	}
	public void setId_episode(int id_episode) {
		this.id_episode = id_episode;
	}
	public String getName_episode() {
		return name_episode;
	}
	public void setName_episode(String name_episode) {
		this.name_episode = name_episode;
	}
	public int getView() {
		return view;
	}
	public void setView(int view) {
		this.view = view;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getId_book() {
		return id_book;
	}
	public void setId_book(int id_book) {
		this.id_book = id_book;
	}

}
