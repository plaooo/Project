package com.example.TestCreateProject.Controller;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.Email;
import com.example.TestCreateProject.Service.EmailService;

@RestController
@CrossOrigin(origins = "*")
public class EmailController {

	@Autowired
	private EmailService emailservice;
	
	@RequestMapping(value = "/user/email", method = RequestMethod.POST)
	public int sendEmail(@RequestBody Email email) throws AddressException, MessagingException, IOException {
		   emailservice.sendmail(email);
		   return 1;   
		}

}