package com.example.TestCreateProject.Model;

public class Likelyday {
     private String nameFiction;
     private int viewOfTheDay;
     private int viewOfTheYear;
     private int viewOfTheMonth;
     public int getViewOfTheYear() {
		return viewOfTheYear;
	}
	public void setViewOfTheYear(int viewOfTheYear) {
		this.viewOfTheYear = viewOfTheYear;
	}
	public int getViewOfTheMonth() {
		return viewOfTheMonth;
	}
	public void setViewOfTheMonth(int viewOfTheMonth) {
		this.viewOfTheMonth = viewOfTheMonth;
	}
	public String getNameFiction() {
		return nameFiction;
	}
	public void setNameFiction(String nameFiction) {
		this.nameFiction = nameFiction;
	}
	public int getViewOfTheDay() {
		return viewOfTheDay;
	}
	public void setViewOfTheDay(int viewOfTheDay) {
		this.viewOfTheDay = viewOfTheDay;
	}
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	private long count;
}