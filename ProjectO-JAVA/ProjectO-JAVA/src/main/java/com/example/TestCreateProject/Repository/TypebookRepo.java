package com.example.TestCreateProject.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.TypeBook;

@Repository
public class TypebookRepo {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public List<TypeBook> getTypeBook(){
		String sql = "SELECT * FROM type ";
		List<TypeBook> typebooks = new ArrayList<TypeBook>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

		for (Map<String, Object> row : rows) {
			TypeBook typebook = new TypeBook();
			typebook.setId_type((int) row.get("id_type"));
			typebook.setName_type((String) row.get("name_type"));
			typebooks.add(typebook);
		}
		return typebooks;
	}

}
