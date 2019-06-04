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

import com.example.TestCreateProject.Model.Likelyday;
import com.example.TestCreateProject.Model.Likelymonth;
import com.example.TestCreateProject.Model.Likelyyear;

@Repository
public class UserLikelyRepo {
   
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	private static final DateFormat date = new SimpleDateFormat("yyyy/MM/dd");
	Date d = new Date();
	String days = date.format(d);
	String day[] = days.split("/");
	String year = day[0];
	String month = day[1];
	String one = day[2];
	
	public List<Likelyyear> GetOfTheYear(){
		List<Likelyyear> likelys = new ArrayList<Likelyyear>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList
				("SELECT book.name_fiction,YEAR(likely.day_like) ,COUNT(likely.id_book)\r\n" + 
				"FROM (likely \r\n" + 
				"      INNER JOIN book ON likely.id_book = book.id_book)\r\n" + 
				" WHERE YEAR(likely.day_like)="+ day[0] +"\r\n" + 
				" GROUP BY book.name_fiction\r\n" + 
				" ORDER BY likely.id_book LIMIT 1");
		for (Map<String, Object> row : rows) {
		Likelyyear likelyz = new Likelyyear();
		likelyz.setNameFiction((String) row.get("name_fiction"));
		likelyz.setViewOfTheYear((int) row.get("YEAR(likely.day_like)"));
		likelyz.setCount((long) row.get("COUNT(likely.id_book)"));
		likelys.add(likelyz);
		}
		return likelys;
	}
	
	public List<Likelymonth> GetOfTheMonth(){
		List<Likelymonth> likelymonths = new ArrayList<Likelymonth>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList
				("SELECT book.name_fiction,MONTH(likely.day_like),YEAR(likely.day_like),COUNT(likely.id_book)\r\n" + 
				"FROM (likely \r\n" + 
				"      INNER JOIN book ON likely.id_book = book.id_book)\r\n" + 
				" WHERE MONTH(likely.day_like)="+ month +" AND YEAR(likely.day_like)="+ year+"\r\n" + 
				" GROUP BY book.name_fiction");
		for(Map<String,Object> row: rows) {
			Likelymonth likelymonth = new Likelymonth();
			likelymonth.setNameFiction((String) row.get("name_fiction"));
			likelymonth.setViewOfTheMonth((int) row.get("MONTH(likely.day_like)"));
			likelymonth.setCount((long) row.get("COUNT(likely.id_book)"));
			likelymonths.add(likelymonth);
		}
		return likelymonths;
	}
	
	public List<Likelyday> GetOfTheDay(){
		List<Likelyday> likelydays = new ArrayList<Likelyday>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList("SELECT book.name_fiction,DAY(likely.day_like),MONTH(likely.day_like),YEAR(likely.day_like),COUNT(likely.id_book)\r\n" + 
				"FROM (likely \r\n" + 
				"      INNER JOIN book ON likely.id_book = book.id_book)\r\n" + 
				" WHERE DAY(likely.day_like)="+one+" AND MONTH(likely.day_like)="+month+" AND YEAR(likely.day_like)="+year+"\r\n" + 
				" GROUP BY book.name_fiction");
		for(Map<String,Object> row:rows) {
			Likelyday likelyday = new Likelyday();
			likelyday.setNameFiction((String) row.get("name_fiction"));
			likelyday.setViewOfTheYear((int) row.get("YEAR(likely.day_like)"));
			likelyday.setViewOfTheMonth((int) row.get("MONTH(likely.day_like)"));
			likelyday.setViewOfTheDay((int) row.get("DAY(likely.day_like)"));
			likelydays.add(likelyday);
		}
		return likelydays;
	}
}