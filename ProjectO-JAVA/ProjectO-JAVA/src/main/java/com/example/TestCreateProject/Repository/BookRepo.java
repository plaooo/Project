package com.example.TestCreateProject.Repository;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.example.TestCreateProject.Model.Book;
import com.example.TestCreateProject.Model.Email;
import com.example.TestCreateProject.Model.Episode;
import com.example.TestCreateProject.Model.TypeBook;

@Repository
public class BookRepo {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public int createBook(Book book, List<TypeBook> tbList) {

		String sql3 = "SELECT * FROM book WHERE id_user = ? and name_fiction = ?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql3,
				new Object[] { book.getId_user(), book.getName_fiction() });
		if (rows.size() > 0) {
			return 0;
		} else {
			try {
				String sql = "INSERT INTO book (name_fiction, preview, id_user, img_book) VALUES (?, ?, ?, ?) ";
				KeyHolder keyHolder = new GeneratedKeyHolder();
				int insert = jdbcTemplate.update(new PreparedStatementCreator() {
					public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
						PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
						ps.setString(1, book.getName_fiction());
						ps.setString(2, book.getPreview());
						ps.setInt(3, book.getId_user());
						ps.setString(4, book.getImg_book());
						return ps;
					}
				}, keyHolder);

				if (insert == 1) {

					String sql2 = "INSERT INTO type_book (id_book, id_type) VALUES (?, ?) ";

					int insert2 = 0;
					for (TypeBook tb : tbList) {
						insert2 = jdbcTemplate.update(sql2, keyHolder.getKey().intValue(), tb.getId_type());
					}

					if (insert2 == 1) {
						return keyHolder.getKey().intValue();
					} else {
						return 0;
					}
				} else {
					return 0;
				}
			} catch (Exception e) {
				return 0;
			}
		}

	}

	public List<Book> getBookByUser(int id_user) {

		String sql = "SELECT * FROM book WHERE id_user = ? and status = 0";
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { id_user });

		for (Map<String, Object> row : rows) {
			Book book = new Book();
			book.setId_book((int) row.get("id_book"));
			book.setName_fiction((String) row.get("name_fiction"));
			book.setCreate_day((Date) row.get("create_day"));
			book.setId_user((int) row.get("id_user"));
			book.setPreview((String) row.get("preview"));
			book.setImg_book((String) row.get("img_book"));
			books.add(book);
		}
		return books;
	}

	public List<Book> getBookByOrder(int start, int end) {

		String sql = "SELECT b.id_book, b.name_fiction, b.create_day, b.preview, b.id_user, b.img_book, u.penname, SUM(e.view) AS view FROM book b \r\n"
				+ "INNER JOIN user u ON u.id_user = b.id_user \r\n"
				+ "INNER JOIN episode e ON e.id_book = b.id_book\r\n" 
				+ "WHERE b.status = 0\r\n"
				+ "GROUP BY b.id_book\r\n" 
				+ "ORDER BY create_day DESC LIMIT ?, ?";
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, start, end);

		for (Map<String, Object> row : rows) {
			int id_book = (int) row.get("id_book");
			Book book = new Book();
			book.setId_book((int) row.get("id_book"));
			book.setName_fiction((String) row.get("name_fiction"));

			book.setCreate_day((Date) row.get("create_day"));

			book.setId_user((int) row.get("id_user"));
			book.setPreview((String) row.get("preview"));
			book.setImg_book((String) row.get("img_book"));
			book.setView(((BigDecimal) row.get("view")).intValue());
			book.setPanname((String) row.get("penname"));
			sql = "SELECT tb.id_type, t.name_type FROM type_book tb " 
					+ "INNER JOIN type t ON t.id_type = tb.id_type "
					+ "WHERE tb.id_book = ?";

			List<Map<String, Object>> type_books = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setTypebook(type_books);
			sql = "SELECT e.id_episode, e.name_episode, e.view, e.content FROM episode e\r\n"
					+ "WHERE e.id_book = ? ORDER BY e.id_episode DESC limit 0, 3";
			List<Map<String, Object>> episode = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setEpisode(episode);
			books.add(book);
		}
		return books;
	}

	public List<Book> getBookByOrderView(int start, int end) {

		String sql = "SELECT SUM(e.view) AS view, b.id_book, b.name_fiction, b.create_day, b.preview, b.img_book, b.id_user, u.penname FROM episode e\n" + 
				"INNER JOIN book b ON b.id_book = e.id_book\n" + 
				"INNER JOIN user u ON u.id_user = b.id_user\n" + 
				"WHERE b.status = 0 and view > 0\n" + 
				"GROUP BY e.id_book\n" + 
				"ORDER BY SUM(e.view) DESC LIMIT ?, ?";
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, start, end);

		for (Map<String, Object> row : rows) {
			int id_book = (int) row.get("id_book");
			Book book = new Book();
			book.setId_book((int) row.get("id_book"));
			book.setName_fiction((String) row.get("name_fiction"));
			book.setCreate_day((Date) row.get("create_day"));
			book.setId_user((int) row.get("id_user"));
			book.setPreview((String) row.get("preview"));
			book.setImg_book((String) row.get("img_book"));
			book.setView(((BigDecimal) row.get("view")).intValue());
			book.setPanname((String) row.get("penname"));
			sql = "SELECT tb.id_type, t.name_type FROM type_book tb "
					+ "INNER JOIN type t ON t.id_type = tb.id_type "
					+ "WHERE tb.id_book = ?";

			List<Map<String, Object>> type_books = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setTypebook(type_books);
			sql = "SELECT e.id_episode, e.name_episode, e.view, e.content FROM episode e\r\n"
					+ "WHERE e.id_book = ? ORDER BY e.id_episode DESC limit 0, 3";
			List<Map<String, Object>> episode = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setEpisode(episode);
			books.add(book);
		}
		return books;
	}

	public List<Book> getBookByOrderType(int type, int start, int end) {

		String sql = "SELECT b.id_book, b.name_fiction, b.create_day, b.preview, b.id_user, b.img_book, u.penname, SUM(e.view) AS view FROM book b\r\n"
				+ "INNER JOIN (SELECT * FROM type_book tb WHERE tb.id_type = ?) tb ON b.id_book= tb.id_book\r\n"
				+ "INNER JOIN user u ON u.id_user = b.id_user\r\n" 
				+ "INNER JOIN episode e ON e.id_book = b.id_book\r\n"
				+ "WHERE b.status = 0\r\n" + "GROUP BY b.id_book\r\n" 
				+ "ORDER BY b.create_day DESC LIMIT ?, ?";
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, type, start, end);

		for (Map<String, Object> row : rows) {
			int id_book = (int) row.get("id_book");
			Book book = new Book();
			book.setId_book((int) row.get("id_book"));
			book.setName_fiction((String) row.get("name_fiction"));
			book.setCreate_day((Date) row.get("create_day"));
			book.setId_user((int) row.get("id_user"));
			book.setPreview((String) row.get("preview"));
			book.setImg_book((String) row.get("img_book"));
			book.setPanname((String) row.get("penname"));
			book.setView(((BigDecimal) row.get("view")).intValue());

			sql = "SELECT tb.id_type, t.name_type FROM type_book tb " + "INNER JOIN type t ON t.id_type = tb.id_type "
					+ "WHERE tb.id_book = ?";

			List<Map<String, Object>> type_books = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setTypebook(type_books);

			sql = "SELECT e.id_episode, e.name_episode, e.view, e.content FROM episode e\r\n"
					+ "WHERE e.id_book = ? ORDER BY e.id_episode DESC limit 0, 3";
			List<Map<String, Object>> episode = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setEpisode(episode);

			books.add(book);
		}
		return books;
	}

	public List<Book> getBookByOrderViewType(int type, int start, int end) {

		String sql = "SELECT SUM(e.view) AS view, b.id_book, b.name_fiction, b.create_day, b.preview, b.id_user, b.img_book, u.penname FROM book b\r\n"
				+ "INNER JOIN episode e ON e.id_book = b.id_book\r\n"
				+ "INNER JOIN (SELECT * FROM type_book tb WHERE tb.id_type = ?) tb ON tb.id_book = b.id_book\r\n"
				+ "INNER JOIN user u ON u.id_user = b.id_user\r\n" + "WHERE b.status = 0\r\n" + "GROUP BY b.id_book\r\n"
				+ "ORDER BY view DESC LIMIT ?, ?";
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, type, start, end);

		for (Map<String, Object> row : rows) {
			int id_book = (int) row.get("id_book");
			Book book = new Book();
			book.setId_book((int) row.get("id_book"));
			book.setName_fiction((String) row.get("name_fiction"));
			book.setCreate_day((Date) row.get("create_day"));
			book.setId_user((int) row.get("id_user"));
			book.setPreview((String) row.get("preview"));
			book.setImg_book((String) row.get("img_book"));
			book.setView(((BigDecimal) row.get("view")).intValue());
			book.setPanname((String) row.get("penname"));
			sql = "SELECT tb.id_type, t.name_type FROM type_book tb " + "INNER JOIN type t ON t.id_type = tb.id_type "
					+ "WHERE tb.id_book = ?";

			List<Map<String, Object>> type_books = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setTypebook(type_books);
			sql = "SELECT e.id_episode, e.name_episode, e.view, e.content FROM episode e\r\n"
					+ "WHERE e.id_book = ? ORDER BY e.id_episode DESC limit 0, 3";
			List<Map<String, Object>> episode = jdbcTemplate.queryForList(sql, new Object[] { id_book });
			book.setEpisode(episode);
			books.add(book);
		}
		return books;
	}

	public List<Book> getBookByID(int id) {

		String sql = "SELECT SUM(e.view) AS view, b.id_book, b.name_fiction, b.create_day, b.preview, b.id_user, b.img_book, u.penname, COUNT(e.id_episode) AS count_episode FROM book b\r\n"
				+ "INNER JOIN episode e ON e.id_book = b.id_book\r\n" 
				+ "INNER JOIN user u ON u.id_user = b.id_user\r\n"
				+ "WHERE b.id_book = ? and b.status = 0";
		List<Book> books = new ArrayList<Book>();
		try {
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, id);

			for (Map<String, Object> row : rows) {
				System.out.println("253");
				int id_book = (int) row.get("id_book");
				Book book = new Book();
				book.setId_book((int) row.get("id_book"));
				book.setName_fiction((String) row.get("name_fiction"));
				book.setCreate_day((Date) row.get("create_day"));
				book.setId_user((int) row.get("id_user"));
				book.setPreview((String) row.get("preview"));
				book.setImg_book((String) row.get("img_book"));
				book.setView(((BigDecimal) row.get("view")).intValue());
				book.setPanname((String) row.get("penname"));
				book.setCount_episode(((Long) row.get("count_episode")).intValue());
				sql = "SELECT tb.id_type, t.name_type FROM type_book tb "
						+ "INNER JOIN type t ON t.id_type = tb.id_type " + "WHERE tb.id_book = ?";

				List<Map<String, Object>> type_books = jdbcTemplate.queryForList(sql, new Object[] { id_book });
				book.setTypebook(type_books);
				sql = "SELECT e.id_episode, e.name_episode, e.view, e.content FROM episode e\r\n"
						+ "WHERE e.id_book = ? ORDER BY e.id_episode DESC limit 0, 5";
				List<Map<String, Object>> episode = jdbcTemplate.queryForList(sql, new Object[] { id_book });
				book.setEpisode(episode);
				books.add(book);
			}
			return books;
		} catch (Exception e) {
			return books;
		}
	}

	public int deleteBookByID(int id_book) {
		String sql = "DELETE FROM book WHERE book.id_book = ? ";
		return jdbcTemplate.update(sql, id_book);
	}

	public int report_niyay(int id_user, int id_book, String txt) {
		String sql = "INSERT INTO report_book (id_user, id_book, report_txt) VALUES (?, ?, ?)";
		try {
			return jdbcTemplate.update(sql, id_user, id_book, txt);
		}catch(Exception e) {
			return 0;
		}

	}
	
	public List<Book> ShowBook(){
		String sql = "SELECT b.id_book, b.name_fiction, u.id_user as id_user_writer,u.email, u.penname as user_writer, ur.id_user as id_user_report, ur.penname as user_report,rb.report_txt FROM report_book rb\n" + 
				"INNER join book b ON b.id_book = rb.id_book\n" + 
				"INNER JOIN user u ON u.id_user = b.id_user\n" + 
				"INNER JOIN user ur ON ur.id_user = rb.id_user\n" + 
				"      where  rb.status=1\n" + 
				"      ORDER BY rb.id_report DESC ";
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

		for (Map<String, Object> row : rows) {
			Book book = new Book();
//			book.setId_user((int) row.get("id_user"));
			book.setEmail((String) row.get("email"));
			book.setId_book((int) row.get("id_book"));
			book.setName_fiction((String) row.get("name_fiction"));
			book.setId_penname_wr((String) row.get("user_writer"));
			book.setId_penname_re((String) row.get("user_report"));
			book.setReportTxt((String) row.get("report_txt"));
			books.add(book);
		}
		return books;
	}

	
     public int Nobanniyay(int id_book) {
    	 String sql = "Update report_book set status=0 where id_book=?";
    	 return jdbcTemplate.update(sql, id_book);
     }
     
     public int banniyay(int id_book,String mail,String description_ban) throws AddressException, MessagingException {
    	 String sql = "Update report_book set status=2 where id_book=?";
    	 jdbcTemplate.update(sql, id_book);
    	 Email email = new Email();
 		 jdbcTemplate.update("Update book set status=1 , description_ban=? where id_book=?",description_ban,id_book);
 		
 		   Properties props = new Properties();
 		   props.put("mail.smtp.auth", "true");
 		   props.put("mail.smtp.starttls.enable", "true");
 		   props.put("mail.smtp.host", "smtp.gmail.com");
 		   props.put("mail.smtp.port", "587");
 		   
 		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
 		      protected PasswordAuthentication getPasswordAuthentication() {
 		         return new PasswordAuthentication("fictionandnovel@gmail.com", "oo085994");
 		      }
 		   });
 		   Message msg = new MimeMessage(session);
 		   msg.setFrom(new InternetAddress("test@gmail.com", false));

 		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mail));
 		   msg.setSubject("fictionandnovel");
 		   msg.setContent("เรียนคุณ "+mail+" <br> นิยายของคุณถูกลบเนื่องจาก  "+description_ban+"<br>หากมีข้อสงสัยกรุณาติดต่อกลับทางเมล fictionandnovel@gmail.com <br>จึงเรียนมาเพื่อทราบ", "text/html; charset=utf-8");
 		   msg.setSentDate(new Date());
 		   Transport.send(msg); 
    	 return 0;
     }
     
     
}
