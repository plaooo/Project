package com.example.TestCreateProject.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.Episode;

@Repository
public class EpisodeRepo {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Episode> getEpisodeByID(int id_user, int id_book) {
		String sql = "SELECT e.id_episode, e.name_episode, e.view, e.content, e.id_book FROM episode e\r\n"
				+ "INNER JOIN book ON book.id_book = e.id_book\r\n"
				+ "INNER JOIN user ON user.id_user = book.id_user\r\n"
				+ "WHERE user.id_user = ? AND book.id_book = ? AND book.status = 0";
		List<Episode> episodes = new ArrayList<Episode>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { id_user, id_book });

		for (Map<String, Object> row : rows) {
			Episode episode = new Episode();
			episode.setId_episode((int) row.get("id_episode"));
			episode.setName_episode((String) row.get("name_episode"));
			episode.setContent((String) row.get("content"));
			episode.setView((int) row.get("view"));
			episode.setId_book((int) row.get("id_book"));
			episodes.add(episode);
		}
		return episodes;
	}

	public Episode getEpisodeByIDEpisode(int id_episode) {
		String sql = "SELECT e.id_episode, e.name_episode, e.view, e.Content, e.id_book, e.day_create_episode FROM episode e INNER JOIN book b ON b.id_book = e.id_book "
				+ "WHERE e.id_episode = ? AND b.status = 0";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { id_episode });

		Episode episode = new Episode();
		for (Map<String, Object> row : rows) {
			episode.setId_episode((int) row.get("id_episode"));
			episode.setName_episode((String) row.get("name_episode"));
			episode.setContent((String) row.get("content"));
			episode.setView((int) row.get("view"));
			episode.setId_book((int) row.get("id_book"));
		}
		return episode;
	}

	public int createEpisode(Episode episode) {
		String sql = "INSERT INTO `episode`(`name_episode`, `content`, `id_book`) VALUES (?,?,?)";

		try {
			return jdbcTemplate.update(sql, episode.getName_episode(), episode.getContent(), episode.getId_book());
		} catch (Exception e) {
			return 0;
		}
	}

	public int updateEpisode(Episode episode) {
		String sql = "UPDATE episode SET name_episode = ?, content = ? WHERE id_episode = ?";
		try {
			return jdbcTemplate.update(sql, episode.getName_episode(), episode.getContent(), episode.getId_episode());
		} catch (Exception e) {
			return 0;
		}
	}

	public List<Episode> getEpisodeByIDOrder(int id_book, int start) {
		String sql = "SELECT e.id_episode, e.name_episode, e.view, e.Content, e.id_book, e.day_create_episode FROM episode e \n"
				+ "INNER JOIN book b ON b.id_book = e.id_book\n" 
				+ "WHERE e.id_book = ? AND b.status = 0\n"
				+ "ORDER BY e.id_episode DESC LIMIT ?, 5";
		List<Episode> episodes = new ArrayList<Episode>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { id_book, start });

		for (Map<String, Object> row : rows) {
			Episode episode = new Episode();
			episode.setId_episode((int) row.get("id_episode"));
			episode.setName_episode((String) row.get("name_episode"));
			episode.setContent((String) row.get("content"));
			episode.setView((int) row.get("view"));
			episode.setId_book((int) row.get("id_book"));
			episodes.add(episode);
		}
		return episodes;
	}

	public int updateEpisodeView(int view, int id_episode) {
		String sql = "UPDATE episode SET view = ? WHERE id_episode = ?";

		return jdbcTemplate.update(sql, view, id_episode);
	}
}
