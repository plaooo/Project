package com.example.TestCreateProject.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.User;

@Repository
public class UserRepo {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private static final String SQL = "select * from user";

	// get all user
	public List<User> getAllUser() {

		List<User> users = new ArrayList<User>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(SQL);

		for (Map<String, Object> row : rows) {
			User user = new User();
			user.setId_user((int) row.get("id_user"));
			user.setName((String) row.get("name"));
			user.setLastname((String) row.get("lastname"));
			user.setBirthday((java.util.Date) row.get("birthday"));
			user.setApplication_date((java.util.Date) row.get("application_date"));
			user.setAvatar((String) row.get("avatar"));
			user.setBan_day((java.util.Date) row.get("ban_day"));
			user.setEmail((String) row.get("email"));
			user.setPanname((String) row.get("penname"));
			user.setPassword((String) row.get("password"));
			user.setStatus((int) row.get("status"));
			users.add(user);
		}

		return users;
	}

	public int getStatus(String id) {
		int a = 0;
		List<User> users = new ArrayList<User>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT status FROM user where id_user=?", id);

		for (Map<String, Object> row : rows) {

			a = (int) row.get("status");
		}
		return a;

	}

	public int createUser(User user) {
		System.out.println(user.getBirthday());
		System.out.println(user.getAvatar());
		String sql = "INSERT INTO user (name, lastname, birthday, avatar, email, password, penname) VALUES (?, ?, ?, ?, ?, ?, ?) ";
		KeyHolder keyHolder = new GeneratedKeyHolder();
		try {
			int insert = jdbcTemplate.update(new PreparedStatementCreator() {
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
					PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
					ps.setString(1, user.getName());
					ps.setString(2, user.getLastname());
					ps.setDate(3, new java.sql.Date(user.getBirthday().getTime()));
					ps.setString(4, user.getAvatar());
					ps.setString(5, user.getEmail());
					ps.setString(6, user.getPassword());
					ps.setString(7, user.getPanname());
					return ps;
				}
			}, keyHolder);

			if (insert == 1) {
				return keyHolder.getKey().intValue();
			} else {
				return 0;
			}
		} catch (Exception e) {
			return 0;
		}

	}

	public List<User> findByEmail(User user) {

		String sql = "SELECT * FROM user WHERE email = ? AND password = ?";
		// List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, email);
		List<User> users = new ArrayList<User>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql,
				new Object[] { user.getEmail(), user.getPassword() });
		// List<User> userTemp = jdbcTemplate.queryForObject(sql, new Object[] {
		// user.getEmail(), user.getPassword() }, new
		// BeanPropertyRowMapper<User>(User.class));

		// return userTemp;

		for (Map<String, Object> row : rows) {
			User userTemp = new User();
			userTemp.setId_user((int) row.get("id_user"));
			userTemp.setName((String) row.get("name"));
			userTemp.setLastname((String) row.get("lastname"));
			userTemp.setBirthday((java.util.Date) row.get("birthday"));
			userTemp.setApplication_date((java.util.Date) row.get("application_date"));
			userTemp.setAvatar((String) row.get("avatar"));
			userTemp.setBan_day((java.util.Date) row.get("ban_day"));
			userTemp.setEmail((String) row.get("email"));
			userTemp.setPanname((String) row.get("penname"));
			userTemp.setPassword((String) row.get("password"));
			userTemp.setStatus((int) row.get("status"));

			sql = "SELECT id_book FROM favor WHERE id_user = ?";
			List<Map<String, Object>> favor = jdbcTemplate.queryForList(sql, new Object[] { (int) row.get("id_user") });

			userTemp.setFavor(favor);
			users.add(userTemp);
		}

		return users;

	}

	public int createUserFavorBook(int id_book, int id_user) {
		String sql = "INSERT INTO favor (id_book, id_user) VALUES (?, ?) ";
		return jdbcTemplate.update(sql, id_book, id_user);
	}

	public int deleteUserFavorBook(int id_book, int id_user) {
		String sql = "DELETE FROM favor WHERE id_book = ? AND id_user = ? ";
		return jdbcTemplate.update(sql, id_book, id_user);
	}

	public List<Map<String, Object>> getFavorBook(int id_user) {
		String sql = "SELECT b.id_book, b.name_fiction, b.create_day, b.preview, b.id_user, b.img_book FROM favor f\r\n"
				+ "INNER JOIN book b ON b.id_book = f.id_book\r\n" + "WHERE f.id_user = ?";
		List<Map<String, Object>> favor = jdbcTemplate.queryForList(sql, new Object[] { id_user });
		return favor;
	}

	public int updateUser(User user) {
		String sql = "UPDATE user u SET u.name = ?, u.lastname = ?, u.birthday = ?, u.avatar = ?, u.penname = ? WHERE u.id_user = ?";
		try {
			return jdbcTemplate.update(sql, user.getName(), user.getLastname(), user.getBirthday(), user.getAvatar(),
					user.getPanname(), user.getId_user());
		} catch (Exception e) {
			return 0;
		}

	}

	public int updateUserNotImg(User user) {
		String sql = "UPDATE user u SET u.name = ?, u.lastname = ?, u.birthday = ?, u.penname = ? WHERE u.id_user = ?";
		try {
			return jdbcTemplate.update(sql, user.getName(), user.getLastname(), user.getBirthday(), user.getPanname(),
					user.getId_user());	
		}catch(Exception e) {
			return 0;
		}
	}

	public User getUserByID(int id_user) {
		String sql = "SELECT * FROM user WHERE user.id_user = ?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, id_user);
		User user = new User();
		for (Map<String, Object> row : rows) {
			user.setId_user((int) row.get("id_user"));
			user.setName((String) row.get("name"));
			user.setLastname((String) row.get("lastname"));
			user.setBirthday((java.util.Date) row.get("birthday"));
			user.setApplication_date((java.util.Date) row.get("application_date"));
			user.setAvatar((String) row.get("avatar"));
			user.setBan_day((java.util.Date) row.get("ban_day"));
			user.setEmail((String) row.get("email"));
			user.setPanname((String) row.get("penname"));
			user.setPassword((String) row.get("password"));
			user.setStatus((int) row.get("status"));
		}
		return user;

	}
}
