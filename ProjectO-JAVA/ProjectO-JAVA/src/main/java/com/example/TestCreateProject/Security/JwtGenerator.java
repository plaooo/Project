package com.example.TestCreateProject.Security;

import org.springframework.stereotype.Component;

import com.example.TestCreateProject.Model.Admin;
import com.example.TestCreateProject.Model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtGenerator {

	public String generate(User jwtUser) {
		
		System.out.println(jwtUser);
		String jws = null;

		try {
			 Claims claims = Jwts.claims()
		                .setSubject(jwtUser.getName());
		        claims.put("id_user", jwtUser.getId_user());
		        claims.put("name", jwtUser.getName());
		        claims.put("lastname", jwtUser.getLastname());
		        claims.put("birthday", jwtUser.getBirthday().toString());
		        claims.put("avatar", jwtUser.getAvatar());
		        claims.put("email", jwtUser.getEmail());
		        claims.put("panname", jwtUser.getPanname());
		        claims.put("status", jwtUser.getStatus());
		        claims.put("application_date", jwtUser.getApplication_date().toString());
//		        claims.put("favor", jwtUser.getFavor());
//
//		        return Jwts.builder()
//		                .setClaims(claims)
//		                .signWith(SignatureAlgorithm.HS512, "youtube")
//		                .compact();
			jws = Jwts.builder() // (1)

					.setClaims(claims)
				    .signWith(SignatureAlgorithm.HS512, "youtube")          // (3)
				     
				    .compact(); 
			
		}catch(Exception e) {
			System.out.println(e);
			jws = "error";
		}
		
		return jws;
    }
	
        public String admingenerate(Admin jwtAdmin) {
		
		System.out.println(jwtAdmin);
		String jws = null;

		try {
			 Claims claims = Jwts.claims()
		                .setSubject(jwtAdmin.getUsername());
		       claims.put("id_admin",jwtAdmin.getId_admin());
		       claims.put("username",jwtAdmin.getUsername());
		       claims.put("password",jwtAdmin.getPassword());
//
//		        return Jwts.builder()
//		                .setClaims(claims)
//		                .signWith(SignatureAlgorithm.HS512, "youtube")
//		                .compact();
			jws = Jwts.builder() // (1)

					.setClaims(claims)
				    .signWith(SignatureAlgorithm.HS512, "youtube")          // (3)
				     
				    .compact(); 
			
		}catch(Exception e) {
			System.out.println(e);
			jws = "error";
		}
		
		return jws;
    }
}
