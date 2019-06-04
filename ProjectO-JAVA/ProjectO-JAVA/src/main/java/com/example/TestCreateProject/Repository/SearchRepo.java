package com.example.TestCreateProject.Repository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.Searchall;

@Repository
public class SearchRepo{
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public List<Searchall> GetAllFiction(){
		List<Searchall> searchalls = new ArrayList<Searchall>();
//		List<Map<String,Object>> rows = jdbcTemplate.queryForList("SELECT book.name_fiction,book.id_book,book.img_book,type.name_type,book.preview,sum(DISTINCT episode.view)\n" + 
//				"			FROM  episode ,comment,user_comment,type_book,type,book\n" + 
//				"				WHERE   type_book.id_type = type.id_type \n" + 
//				"				AND episode.id_book = book.id_book\n" + 
////				"				AND user_comment.id_book = book.id_book \n" + 
////				"				AND user_comment.id_comment = comment.id_comment\n" + 
//				"				GROUP BY book.name_fiction\n" + 
//				"				ORDER BY sum(DISTINCT episode.view) DESC");
		List<Map<String,Object>> rows = jdbcTemplate.queryForList("SELECT b.id_book, b.name_fiction, b.preview, b.img_book, SUM(e.view) as view, u.penname, b.create_day FROM book b " + 
				"INNER JOIN episode e ON e.id_book = b.id_book " + 
				"INNER JOIN user u ON u.id_user = b.id_user " +
				"WHERE b.status = 0 " + 
				"GROUP BY b.id_book " + 
				"ORDER BY SUM(e.view) DESC");
		for(Map<String,Object> row:rows) {
			Searchall searchall = new Searchall();
			searchall.setNameFiction((String) row.get("name_fiction"));
			searchall.setCreate_day((Date) row.get("create_day"));
			searchall.setPreview((String) row.get("preview"));
			searchall.setSum((BigDecimal) row.get("view"));
//			searchall.setTotalcomment((long) row.get("COUNT(DISTINCT comment.id_comment)"));
			searchall.setImgBook((String) row.get("img_book"));
			searchall.setIdBook((int) row.get("id_book"));
			searchall.setPenname((String) row.get("penname"));
			String sql = "SELECT tb.id_type, t.name_type FROM type_book tb " 
					+ "INNER JOIN type t ON t.id_type = tb.id_type "
					+ "WHERE tb.id_book = ?";

			List<Map<String, Object>> type_books = jdbcTemplate.queryForList(sql, new Object[] { searchall.getIdBook() });
			for(Map<String,Object> ss:type_books) {
			searchall.setTypeBook((String) ss.get("name_type"));
			}
			searchalls.add(searchall);
		}	
		return searchalls;
	}

}
