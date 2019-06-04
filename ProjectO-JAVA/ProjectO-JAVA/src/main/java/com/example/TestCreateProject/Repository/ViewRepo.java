package com.example.TestCreateProject.Repository;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.ViewMonth;
import com.example.TestCreateProject.Model.Viewday;
import com.example.TestCreateProject.Model.Viewyear;

@Repository
public class ViewRepo {

	@Autowired
	private JdbcTemplate jbcTemplate;
	
	private static final DateFormat date = new SimpleDateFormat("yyyy/MM/dd");
	Date d = new Date();
	String days = date.format(d);
	String day[] = days.split("/");
	String year = day[0];
	String month = day[1];
	String one = day[2];
	
	public List<Viewyear> GetTopViewYear(){
		List<Viewyear> viewyears = new ArrayList<Viewyear>();
		List<Map<String,Object>> rows = jbcTemplate.queryForList
				("SELECT book.name_fiction,book.id_book,book.img_book,YEAR(episode.day_create_episode),SUM(episode.view)\r\n" + 
				"FROM ( episode INNER JOIN book ON episode.id_book=book.id_book )\r\n" + 
				"      WHERE YEAR(episode.day_create_episode)="+year+"\r\n" + 
				"      GROUP BY book.name_fiction\r\n" + 
				"      ORDER BY episode.view DESC LIMIT 1");
		for(Map<String,Object> row:rows) {
			Viewyear viewyear = new Viewyear();
			viewyear.setNameFiction((String) row.get("name_fiction"));
			viewyear.setViewYear((int) row.get("YEAR(episode.day_create_episode)"));
			viewyear.setSum((BigDecimal) row.get("SUM(episode.view)"));
			viewyear.setIdBook((int) row.get("id_book"));
			viewyear.setImgBook((String) row.get("img_book"));
			viewyears.add(viewyear);
		}
		return viewyears;
	}
	
	public List<ViewMonth> GetTopViewMonth(){
		System.out.print(month);
		List<ViewMonth> viewmonths = new ArrayList<ViewMonth>();
		List<Map<String,Object>> rows = jbcTemplate.queryForList
				("SELECT book.name_fiction,book.id_book,book.img_book,MONTH(episode.day_create_episode),YEAR(episode.day_create_episode),SUM(episode.view)\r\n" + 
						"FROM ( episode INNER JOIN book ON episode.id_book=book.id_book )\r\n" + 
						"      WHERE MONTH(episode.day_create_episode)="+month+" AND YEAR(episode.day_create_episode)="+year+"\r\n" + 
						"      GROUP BY book.name_fiction\r\n" + 
						"      ORDER BY episode.view DESC LIMIT 1");
		for(Map<String,Object> row:rows) {
			ViewMonth viewmonth = new ViewMonth();
			viewmonth.setNameFiction((String) row.get("name_fiction"));
			viewmonth.setViewMonth((int) row.get("MONTH(episode.day_create_episode)"));
			viewmonth.setViewYear((int) row.get("YEAR(episode.day_create_episode)"));
			viewmonth.setSum((BigDecimal) row.get("SUM(episode.view)"));
			viewmonth.setIdBook((int) row.get("id_book"));
			viewmonth.setImgBook((String) row.get("img_book"));
			viewmonths.add(viewmonth);
		}
		return viewmonths;
	}
	
	public List<Viewday> GetTopViewDay(){
		List<Viewday> viewdays = new ArrayList<Viewday>();
		List<Map<String,Object>> rows = jbcTemplate.queryForList
				("SELECT book.name_fiction,book.id_book,book.img_book,DAY(episode.day_create_episode),MONTH(episode.day_create_episode),YEAR(episode.day_create_episode),SUM(episode.view)\r\n" + 
						"FROM ( episode INNER JOIN book ON episode.id_book=book.id_book )\r\n" + 
						"      WHERE DAY(episode.day_create_episode)="+one+" AND MONTH(episode.day_create_episode)="+month+" AND YEAR(episode.day_create_episode)="+year+"\r\n" + 
						"      GROUP BY book.name_fiction\r\n" + 
						"      ORDER BY episode.view DESC LIMIT 1");
		for(Map<String,Object> row:rows) {
			Viewday viewday = new Viewday();
			viewday.setNameFiction((String) row.get("name_fiction"));
			viewday.setViewDay((int) row.get("DAY(episode.day_create_episode)"));
			viewday.setViewMonth((int) row.get("MONTH(episode.day_create_episode)"));
			viewday.setViewYear((int) row.get("YEAR(episode.day_create_episode)"));
			viewday.setSum((BigDecimal) row.get("SUM(episode.view)"));
			viewday.setIdBook((int) row.get("id_book"));
			viewday.setImgBook((String) row.get("img_book"));
			viewdays.add(viewday);
		}
		return viewdays;
	}
}