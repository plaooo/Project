package com.example.TestCreateProject.Repository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.Commentday;
import com.example.TestCreateProject.Model.Commentmonth;
import com.example.TestCreateProject.Model.Commentyear;

@Repository
public class CommentRepo {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	private static final DateFormat date = new SimpleDateFormat("yyyy/MM/dd");
	Date d = new Date();
	String days = date.format(d);
	String day[] = days.split("/");
	String year = day[0];
	String month = day[1];
	String one = day[2];
	
	public List<Commentyear> GetTopCommentYear(){
		System.out.print(year);
		System.out.print(month);
		System.out.print(day);
	List<Commentyear> commentyears = new ArrayList<Commentyear>();
	List<Map<String,Object>> rows = jdbcTemplate.queryForList
			("SELECT book.name_fiction,book.id_book,book.img_book,YEAR(comment.comment_day),COUNT(comment.id_comment)\n" + 
					"FROM ((user_comment\n" + 
					"INNER JOIN book ON user_comment.id_book = book.id_book)\n" + 
					"INNER JOIN comment ON user_comment.id_comment = comment.id_comment)\n" + 
					"WHERE YEAR(comment.comment_day) ="+year+"\r\n" +
					"GROUP BY book.name_fiction\n" + 
					"ORDER BY COUNT(comment.id_comment)  DESC  LIMIT 1");
	for(Map<String,Object> row:rows) {
		Commentyear commentyear = new Commentyear();
		commentyear.setNameFiction((String) row.get("name_fiction"));
		commentyear.setCommentYear((int) row.get("YEAR(comment.comment_day)"));
		commentyear.setCount((long) row.get("COUNT(comment.id_comment)"));
		commentyear.setIdBook((int) row.get("id_book"));
		commentyear.setImgBook((String) row.get("img_book"));
		commentyears.add(commentyear);
	}
	return commentyears;
	}
	
	public List<Commentmonth> GetTopCommentMonth(){
		List<Commentmonth> commentmonths = new ArrayList<Commentmonth>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList
				("SELECT book.name_fiction,book.id_book,book.img_book,MONTH(comment.comment_day),YEAR(comment.comment_day),COUNT(comment.id_comment)\r\n" + 
				"FROM ((user_comment\r\n" + 
				"      INNER JOIN book ON user_comment.id_book = book.id_book)\r\n" + 
				"      INNER JOIN comment ON user_comment.id_comment = comment.id_comment)\r\n" + 
				"      WHERE YEAR(comment.comment_day)="+year+" AND MONTH(comment.comment_day)="+month+"\r\n" + 
				"      GROUP BY book.name_fiction\r\n" + 
				"      ORDER BY comment.id_comment LIMIT 1");
		for(Map<String,Object> row:rows) {
			Commentmonth commentmonth = new Commentmonth();
			commentmonth.setNameFiction((String) row.get("name_fiction"));
			commentmonth.setCommentMonth((int) row.get("MONTH(comment.comment_day)"));
			commentmonth.setCommentYear((int) row.get("YEAR(comment.comment_day)"));
			commentmonth.setCount((long) row.get("COUNT(comment.id_comment)"));
			commentmonth.setIdBook((int) row.get("id_book"));
			commentmonth.setImgBook((String) row.get("img_book"));
			commentmonths.add(commentmonth);
		}
		return commentmonths;
	}
	
	public List<Commentday> GetTopCommentDay(){
		List<Commentday> commentdays = new ArrayList<Commentday>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList
				("SELECT book.name_fiction,book.id_book,book.img_book,DAY(comment.comment_day),MONTH(comment.comment_day),YEAR(comment.comment_day),COUNT(comment.id_comment)\r\n" + 
						"FROM ((user_comment\r\n" + 
						"      INNER JOIN book ON user_comment.id_book = book.id_book)\r\n" + 
						"      INNER JOIN comment ON user_comment.id_comment = comment.id_comment)\r\n" + 
						"      WHERE DAY(comment.comment_day)="+one+" AND YEAR(comment.comment_day)="+year+" AND MONTH(comment.comment_day)="+month+"\r\n" + 
						"      GROUP BY book.name_fiction\r\n" + 
						"      ORDER BY comment.id_comment LIMIT 1");
		for(Map<String,Object> row:rows) {
			Commentday commentday = new Commentday();
			commentday.setNameFiction((String) row.get("name_fiction"));
			commentday.setCommentDay((int) row.get("DAY(comment.comment_day)"));
			commentday.setCommentMonth((int) row.get("MONTH(comment.comment_day)"));
			commentday.setCommentYear((int) row.get("YEAR(comment.comment_day)"));
			commentday.setCount((long) row.get("COUNT(comment.id_comment)"));
			commentday.setIdBook((int) row.get("id_book"));
			commentday.setImgBook((String) row.get("img_book"));
			commentdays.add(commentday);
		}
		return commentdays;
	}
	
	
}