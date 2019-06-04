package com.example.TestCreateProject.Security;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.example.TestCreateProject.Model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtValidator {

	private String secret = "youtube";

	public User validate(String token) {

		User jwtUser = null;
		try {
			Claims body = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

			jwtUser = new User();

			jwtUser.setId_user(Integer.parseInt((String) body.get("id_user")));
			jwtUser.setName((String) body.get("id_user"));
			jwtUser.setLastname((String)body.get("lastname"));
			jwtUser.setBirthday(new SimpleDateFormat("yyyy-mm-dd").parse((String) body.get("birthday")));
			jwtUser.setAvatar((String) body.get("avatar"));
	        jwtUser.setEmail((String) body.get("email"));
	        jwtUser.setPanname((String) body.get("panname"));
	        jwtUser.setStatus(Integer.parseInt((String) body.get("status")));
	        jwtUser.setApplication_date(new SimpleDateFormat("yyyy-mm-dd").parse((String) body.get("application_date")));
//
		} catch (Exception e) {
			System.out.println(e);
		}

		return jwtUser;
	}
}
