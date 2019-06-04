package com.example.TestCreateProject.Model;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Searchall {
     private String nameFiction;
     private String type;
     private String preview;
     private BigDecimal sum;
     private long totalcomment;
     private long totallike;
     private String imgBook;
     private int idBook;
     private String typeBook;
     private String penname;
     private Date create_day;
     
	public String getTypeBook() {
		return typeBook;
	}
	public void setTypeBook(String typeBook) {
		this.typeBook = typeBook;
	}
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPreview() {
		return preview;
	}
	public void setPreview(String preview) {
		this.preview = preview;
	}
	public BigDecimal getSum() {
		return sum;
	}
	public void setSum(BigDecimal sum) {
		this.sum = sum;
	}
	public long getTotalcomment() {
		return totalcomment;
	}
	public void setTotalcomment(long totalcomment) {
		this.totalcomment = totalcomment;
	}
	public long getTotallike() {
		return totallike;
	}
	public void setTotallike(long totallike) {
		this.totallike = totallike;
	}
	public String getPenname() {
		return penname;
	}
	public void setPenname(String penname) {
		this.penname = penname;
	}
	public String getCreate_day() {
		SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		return dt.format(create_day);
	}
	public void setCreate_day(Date create_day) {
		
		this.create_day = create_day;
		
	}
}