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

import com.example.TestCreateProject.Model.UserComment;

@Repository
public class UserCommentRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;
	
	public List<UserComment> GetStatusReport(){
		List<UserComment> usercomments = new ArrayList<UserComment>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(
				"SELECT user.id_user,user_comment.id_user_comment,user.penname,comment.collect_comment,user.avatar,book.name_fiction\n" + 
				"FROM (((user_comment INNER JOIN user ON user_comment.id_user= user.id_user)\n" + 
				" INNER JOIN comment ON user_comment.id_comment = comment.id_comment)\n" + 
				" INNER JOIN book ON user_comment.id_book = book.id_book )\n" + 
				" WHERE user_comment.status=1 AND user.status=0");
		for(Map<String,Object> row:rows) {
			UserComment usercomment = new UserComment();
			usercomment.setIdUser((int) row.get("id_user"));
			usercomment.setIdUserComment((int) row.get("id_user_comment"));
	        usercomment.setName_fiction((String) row.get("name_fiction"));
			usercomment.setPenname((String) row.get("penname"));
			usercomment.setCollectComment((String) row.get("collect_comment"));
			usercomment.setAvatar((String) row.get("avatar"));
			usercomments.add(usercomment);
		}
		return usercomments;
	}
	
	public int Cancelban(int id) {
		int update = jdbcTemplate.update
				("UPDATE user_comment SET status = 0 WHERE user_comment.id_user_comment = ?",id);
		return 1;
	}
	
	public int Banuser(UserComment usercomment) {
		int update = jdbcTemplate.update
				("UPDATE user,user_comment SET user.status =1,user_comment.status=2 WHERE user.id_user=? AND user_comment.id_user_comment=?"
				,usercomment.getIdUser(),usercomment.getIdUserComment());
		return 1;
	}
	
	public int InsertComment(UserComment ment) {
		String sql = "INSERT INTO comment (collect_comment) VALUES (?) ";
		KeyHolder keyHolder = new GeneratedKeyHolder();
		int insert = jdbcTemplate.update(new PreparedStatementCreator() {
			public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, ment.getCollectComment());
				return ps;
			}
		}, keyHolder);
		return keyHolder.getKey().intValue();
	}
	
	public int InsertUserComment(UserComment ment) {
		int insert = jdbcTemplate.update("Insert INTO user_comment (id_user,id_comment,id_book,id_episode) VALUES(?,?,?,?) "
				  ,ment.getIdUser(),ment.getIdComment(),ment.getIdBook(),ment.getIdEpisode());
		return 1;
	}
	
	public List<UserComment> ListComment(UserComment ment){
		List<UserComment> usercomments = new ArrayList<UserComment>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(
				"SELECT user_comment.id_user,user_comment.id_user_comment,user_comment.id_comment,user.penname,user.avatar,comment.collect_comment\r\n" + 
				"FROM ((user_comment INNER JOIN user ON user_comment.id_user=user.id_user)\r\n" + 
				"      INNER JOIN comment ON user_comment.id_comment=comment.id_comment)\r\n" + 
				"      WHERE id_book = "+ment.getIdBook()+" AND id_episode = "+ment.getIdEpisode()+" AND (user_comment.status = 0 OR user_comment.status = 1) AND user.status=0 "
						+ "ORDER BY user_comment.id_user_comment DESC ");
		for(Map<String,Object> row:rows) {
			UserComment usercomment = new UserComment();
			usercomment.setIdUser((int) row.get("id_user"));
			usercomment.setIdUserComment((int) row.get("id_user_comment"));
			usercomment.setIdComment((int) row.get("id_comment"));
			usercomment.setPenname((String) row.get("penname"));
			usercomment.setCollectComment((String) row.get("collect_comment"));
			usercomment.setAvatar((String) row.get("avatar"));
			usercomments.add(usercomment);
		}
		return usercomments;
	}
	
	public int ModifyUserComment(UserComment ment) {
		int insert = jdbcTemplate.update("Update comment set collect_comment=? where id_comment=? "
				  ,ment.getCollectComment(),ment.getIdComment());
		return 1;
	}
	
	public int DeleteUserComment(UserComment ment) {
		int insert = jdbcTemplate.update("Update user_comment set status=2 where id_user=? AND id_comment=?"
				  ,ment.getIdUser(),ment.getIdComment());
		return 1;
	}
	
	public int ReportUserComment(UserComment ment) {
		int insert = jdbcTemplate.update("Update user_comment set status=1 where id_user=? AND id_comment=? "
				  ,ment.getIdUserComment(),ment.getIdComment());
		return 1;
	}
	
}
