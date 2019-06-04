package com.example.TestCreateProject.Model;

import java.math.BigDecimal;

public class ViewMonth {
	private String nameFiction;
	private int idBook;
	private String imgBook;

	public int getIdBook() {
		return idBook;
	}

	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}

	public String getImgBook() {
		return imgBook;
	}

	public void setImgBook(String imgBook) {
		this.imgBook = imgBook;
	}

	public String getNameFiction() {
		return nameFiction;
	}

	public void setNameFiction(String nameFiction) {
		this.nameFiction = nameFiction;
	}

	public int getViewYear() {
		return viewYear;
	}

	public void setViewYear(int viewYear) {
		this.viewYear = viewYear;
	}

	public int getViewMonth() {
		return viewMonth;
	}

	public void setViewMonth(int viewMonth) {
		this.viewMonth = viewMonth;
	}

	public BigDecimal getSum() {
		return sum;
	}

	public void setSum(BigDecimal sum) {
		this.sum = sum;
	}

	private int viewYear;
	private int viewMonth;
	private BigDecimal sum;
}
