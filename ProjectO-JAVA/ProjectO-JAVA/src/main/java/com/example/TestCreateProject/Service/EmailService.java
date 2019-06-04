package com.example.TestCreateProject.Service;



import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.Book;
import com.example.TestCreateProject.Model.Email;

@Service
public class EmailService {
   
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	private JavaMailSender javaMailSender;

	
	public void sendmail(Email mail) throws AddressException, MessagingException, IOException {
	
		Email email = new Email();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT id_user FROM user WHERE email = '"+mail.getEmailAddress()+"' ");
		
		for (Map<String, Object> row : rows) {
			email.setIdUser((int) row.get("id_user"));
		}
		
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

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mail.getEmailAddress()));
		   msg.setSubject("User ForgetPassword");
		   msg.setContent("สวัสดีครับ "+mail.getEmailAddress()+" <br> คุณต้องการเปลี่ยนรหัสผ่านกรุณาคลิก   <a href='http://localhost:4200/changepassword?id="+email.getIdUser()+"'>เปลี่ยนรหัสผ่าน</a>", "text/html; charset=utf-8");
		   msg.setSentDate(new Date());

//		   MimeBodyPart messageBodyPart = new MimeBodyPart();
//		   messageBodyPart.setContent("Tutorials point email", "text/html");
//
//		   Multipart multipart = new MimeMultipart();
//		   multipart.addBodyPart(messageBodyPart);
//		   MimeBodyPart attachPart = new MimeBodyPart();
//
//		   attachPart.attachFile("/var/tmp/image19.png");
//		   multipart.addBodyPart(attachPart);
//		   msg.setContent(multipart);
		   Transport.send(msg);   
		}
}