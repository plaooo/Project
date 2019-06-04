package com.example.TestCreateProject.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.webboard;

@Repository
public class WebboardRepo {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<webboard> GetTypeOne() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate
				.queryForList("SELECT user.penname,user_webboard.collect_user_webboard,user.avatar\r\n"
						+ "FROM ((user_webboard INNER JOIN user ON user_webboard.id_user = user.id_user)\r\n"
						+ "      INNER JOIN webboard ON user_webboard.id_webboard = webboard.id_webboard)\r\n"
						+ "      WHERE webboard.id_typewebboard = 1\r\n" + "      ORDER BY webboard.day_create DESC");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectUserWebboard((String) row.get("collect_user_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTypeTwo() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate
				.queryForList("SELECT user.penname,user_webboard.collect_user_webboard,user.avatar\r\n"
						+ "FROM ((user_webboard INNER JOIN user ON user_webboard.id_user = user.id_user)\r\n"
						+ "      INNER JOIN webboard ON user_webboard.id_webboard = webboard.id_webboard)\r\n"
						+ "      WHERE webboard.id_typewebboard = 2\r\n" + "      ORDER BY webboard.day_create DESC");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectUserWebboard((String) row.get("collect_user_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTypeThree() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate
				.queryForList("SELECT user.penname,user_webboard.collect_user_webboard,user.avatar\r\n"
						+ "FROM ((user_webboard INNER JOIN user ON user_webboard.id_user = user.id_user)\r\n"
						+ "      INNER JOIN webboard ON user_webboard.id_webboard = webboard.id_webboard)\r\n"
						+ "      WHERE webboard.id_typewebboard = 3\r\n" + "      ORDER BY webboard.day_create DESC");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectUserWebboard((String) row.get("collect_user_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTopicTypeOne() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE webboard.id_typewebboard = 1 AND webboard.status=0  \r\n"
						+ "ORDER BY webboard.day_create DESC LIMIT 3");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setIdWebboard((int) row.get("id_webboard"));
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectWebboard((String) row.get("collect_webboard"));
			webboard.setHeadderWebboard((String) row.get("headder_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTopicTypeTwo() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE webboard.id_typewebboard = 2 AND webboard.status=0  \r\n"
						+ "ORDER BY webboard.day_create DESC LIMIT 3");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setIdWebboard((int) row.get("id_webboard"));
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectWebboard((String) row.get("collect_webboard"));
			webboard.setHeadderWebboard((String) row.get("headder_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTopicTypeThree() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE webboard.id_typewebboard = 3 AND webboard.status=0  \r\n"
						+ "ORDER BY webboard.day_create DESC LIMIT 3");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setIdWebboard((int) row.get("id_webboard"));
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectWebboard((String) row.get("collect_webboard"));
			webboard.setHeadderWebboard((String) row.get("headder_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTopicAllTypeOne() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE webboard.id_typewebboard = 1 AND webboard.status=0  \r\n"
						+ "ORDER BY webboard.day_create DESC ");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setIdWebboard((int) row.get("id_webboard"));
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectWebboard((String) row.get("collect_webboard"));
			webboard.setHeadderWebboard((String) row.get("headder_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTopicAllTypeTwo() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE webboard.id_typewebboard = 2 AND webboard.status=0  \r\n"
						+ "ORDER BY webboard.day_create DESC");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setIdWebboard((int) row.get("id_webboard"));
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectWebboard((String) row.get("collect_webboard"));
			webboard.setHeadderWebboard((String) row.get("headder_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public List<webboard> GetTopicAllTypeThree() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE webboard.id_typewebboard = 3 AND webboard.status=0 \r\n"
						+ "ORDER BY webboard.day_create DESC");
		for (Map<String, Object> row : rows) {
			webboard webboard = new webboard();
			webboard.setIdWebboard((int) row.get("id_webboard"));
			webboard.setPenName((String) row.get("penname"));
			webboard.setCollectWebboard((String) row.get("collect_webboard"));
			webboard.setHeadderWebboard((String) row.get("headder_webboard"));
			webboard.setAvatar((String) row.get("avatar"));
			webboards.add(webboard);
		}
		return webboards;
	}

	public int CreateWebboard(webboard web) {
		int insert = jdbcTemplate.update(
				"Insert INTO Webboard (collect_webboard,headder_webboard,id_typewebboard,id_user) VALUES(?,?,?,?) ",
				web.getCollectWebboard(), web.getHeadderWebboard(), web.getTypeWebboard(), web.getIdUser());
		return 1;
	}

	public int CreateCommentWebboard(webboard web) {
		int insert = jdbcTemplate.update(
				"Insert INTO user_webboard (id_user,id_webboard,collect_user_webboard) VALUES(?,?,?)", web.getIdUser(),
				web.getIdWebboard(), web.getCollectUserWebboard());
		return 1;
	}

	public List<webboard> GetCommentWebboardType(webboard webs) {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"Select user_webboard.collect_user_webboard,user_webboard.id_user,user.Avatar,user.penname,user_webboard.id_user_webboard "
						+ "FROM user_webboard INNER JOIN user ON user_webboard.id_user = user.id_user where id_webboard ="
						+ webs.getIdWebboard()
						+ " AND user.status=0 AND (user_webboard.status=0 OR user_webboard.status=1)");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setCollectWebboard((String) row.get("collect_user_webboard"));
			web.setAvatar((String) row.get("avatar"));
			web.setPenName((String) row.get("penname"));
			web.setIdUserWebboard((int) row.get("id_user_webboard"));
			web.setIdUser((int) row.get("id_user"));
			webboards.add(web);
		}
		return webboards;
	}

	public List<webboard> GetTopicWebboard(webboard webs) {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.id_user,user.penname,webboard.collect_webboard,webboard.headder_webboard,user.avatar\r\n"
						+ "FROM webboard INNER JOIN user ON webboard.id_user = user.id_user\r\n"
						+ "WHERE webboard.status=0 AND webboard.id_webboard = " + webs.getIdWebboard() + "");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setPenName((String) row.get("penname"));
			web.setCollectWebboard((String) row.get("collect_webboard"));
			web.setHeadderWebboard((String) row.get("headder_webboard"));
			web.setAvatar((String) row.get("avatar"));
			web.setIdWebboard((int) row.get("id_webboard"));
			web.setIdUser((int) row.get("id_user"));
			webboards.add(web);
		}
		return webboards;
	}

	public List<webboard> GetWebboardAdminL3() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT admin.username , adminwebboard.headder_webboard ,adminwebboard.id_admin_webboard,adminwebboard.collect_webboard\r\n"
						+ "FROM adminwebboard INNER JOIN admin ON adminwebboard.id_admin=admin.id_admin\r\n"
						+ "ORDER BY adminwebboard.day_create DESC LIMIT 3");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setUserName((String) row.get("username"));
			web.setCollectWebboard((String) row.get("collect_webboard"));
			web.setHeadderWebboard((String) row.get("headder_webboard"));
			web.setIdAdminWebboard((int) row.get("id_admin_webboard"));
			webboards.add(web);
		}
		return webboards;
	}

	public List<webboard> GetWebboardAdmin() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT admin.username , adminwebboard.headder_webboard ,adminwebboard.id_admin_webboard,adminwebboard.collect_webboard\r\n"
						+ "FROM adminwebboard INNER JOIN admin ON adminwebboard.id_admin=admin.id_admin\r\n"
						+ "ORDER BY adminwebboard.day_create DESC ");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setUserName((String) row.get("username"));
			web.setCollectWebboard((String) row.get("collect_webboard"));
			web.setHeadderWebboard((String) row.get("headder_webboard"));
			web.setIdAdminWebboard((int) row.get("id_admin_webboard"));
			webboards.add(web);
		}
		return webboards;
	}

	public List<webboard> GetDesAdminWebboard(webboard webs) {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT admin.username , adminwebboard.headder_webboard ,adminwebboard.id_admin_webboard,adminwebboard.collect_webboard\r\n"
						+ "FROM adminwebboard INNER JOIN admin ON adminwebboard.id_admin=admin.id_admin\r\n"
						+ "where adminwebboard.id_admin_webboard =" + webs.getIdAdminWebboard() + "");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setUserName((String) row.get("userName"));
			web.setCollectWebboard((String) row.get("collect_webboard"));
			web.setHeadderWebboard((String) row.get("headder_webboard"));
			webboards.add(web);
		}
		return webboards;
	}

	public int CreateAdminWebboard(webboard web) {
		int insert = jdbcTemplate.update(
				"Insert INTO adminwebboard (collect_webboard,headder_webboard,id_admin) VALUES(?,?,?) ",
				web.getCollectWebboard(), web.getHeadderWebboard(), web.getIdAdmin());
		return 1;
	}

	public List<webboard> CheckWebboardReport(webboard webs) {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT user.penname,user.name,user.id_user,user_webboard.collect_user_webboard,user_webboard.id_user_webboard,user.avatar\r\n"
						+ "FROM user_webboard INNER JOIN user On user_webboard.id_user = user.id_user\r\n"
						+ "where user_webboard.status = 1");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setPenName((String) row.get("penname"));
			web.setName((String) row.get("name"));
			web.setCollectUserWebboard((String) row.get("collect_user_webboard"));
			web.setAvatar((String) row.get("avatar"));
			web.setIdUserWebboard((int) row.get("id_user_webboard"));
			web.setIdUser((int) row.get("id_user"));
			webboards.add(web);
		}
		return webboards;
	}

	public int Cancelban(webboard web) {
		System.out.println(web.getIdUserWebboard());
		int update = jdbcTemplate.update("UPDATE user_webboard SET status=0 WHERE id_user_webboard=?",
				web.getIdUserWebboard());
		return 1;
	}

	public int Banuser(webboard web) {
		int update = jdbcTemplate
				.update("UPDATE user_webboard INNER JOIN user ON user.id_user = user_webboard.id_user\n"
						+ "SET user_webboard.status = '2', user.status = '1'\n"
						+ "WHERE user_webboard.id_user_webboard = ?", web.getIdUserWebboard());
		return 1;
	}

	public int reportWebboard(webboard web) {
		int update = jdbcTemplate.update("UPDATE webboard set status =1 WHERE id_webboard = ?", web.getIdWebboard());
		return 1;
	}
	
	public int reportComment(webboard web) {
		int update = jdbcTemplate.update("UPDATE user_webboard set status =1 WHERE id_user_webboard = ?", web.getIdUserWebboard());
		return 1;
	}

	public List<webboard> ForAdminSearchDelete() {
		List<webboard> webboards = new ArrayList<webboard>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(
				"SELECT webboard.id_webboard,user.penname,webboard.collect_webboard,webboard.headder_webboard\r\n"
						+ "FROM (webboard INNER JOIN user ON webboard.id_user = user.id_user)\r\n"
						+ "WHERE   webboard.status=0 AND user.status=0  \r\n" + "ORDER BY webboard.day_create DESC");
		for (Map<String, Object> row : rows) {
			webboard web = new webboard();
			web.setPenName((String) row.get("penname"));
			web.setHeadderWebboard((String) row.get("headder_webboard"));
			web.setCollectWebboard((String) row.get("collect_webboard"));
			web.setIdWebboard((int) row.get("id_webboard"));
			webboards.add(web);
		}
		return webboards;
	}

	public int DeleteWebboard(int id) {
		int update = jdbcTemplate.update("update webboard set status=1 where id_webboard = ?", id);
		return 1;
	}

	public int AdminModifyWebboard(webboard web) {
		int update = jdbcTemplate.update(
				"UPDATE adminwebboard set headder_webboard=?,collect_webboard=? WHERE id_admin_webboard=?",
				web.getHeadderWebboard(), web.getCollectWebboard(), web.getIdAdminWebboard());
		return 1;
	}

	public int UserModifyWebboard(webboard web) {
		int update = jdbcTemplate.update(
				"UPDATE webboard set collect_webboard=?,headder_webboard=? WHERE id_webboard=?",
				web.getCollectWebboard(), web.getHeadderWebboard(), web.getIdWebboard());
		return 1;
	}

	public int UserModifyComment(webboard web) {
		int update = jdbcTemplate.update("UPDATE user_webboard set collect_user_webboard=? WHERE id_user_webboard=?",
				web.getCollectUserWebboard(), web.getIdUserWebboard());
		return 1;
	}

	public int UserDeleteComment(webboard web) {
		int update = jdbcTemplate.update("UPDATE user_webboard set status=2 WHERE id_user_webboard=?",
				web.getIdUserWebboard());
		return 1;
	}

	public int changeEmail(webboard web) {
		int update = jdbcTemplate.update("UPDATE user set user.password=? WHERE id_user=?", web.getPassword(),
				web.getIdUser());
		return 1;
	}
}