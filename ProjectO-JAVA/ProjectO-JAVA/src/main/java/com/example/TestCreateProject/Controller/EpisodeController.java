package com.example.TestCreateProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TestCreateProject.Model.Episode;
import com.example.TestCreateProject.Service.EpisodeService;

@RestController
@CrossOrigin(origins = "*")
public class EpisodeController {
	
	@Autowired
	private EpisodeService episodeService;
	
	@GetMapping("/episodes/{id}/{id_user}")
	public List<Episode> getEpisodeByID(@PathVariable("id") int id_book, @PathVariable("id_user")int id_user) {
		return episodeService.getEpisodeByID(id_user, id_book);
	}
	
	@GetMapping("/episode/{id}")
	public Episode getEpisodeByIDEpisode(@PathVariable("id") int id_episode) {
		System.out.println("31");
		return episodeService.getEpisodeByIDEpisode(id_episode);
	}
	
	@PostMapping("/episode")
	public int createEpisode(@RequestBody Episode episode ) {
		return episodeService.createEpisode(episode);
	}
	
	@PutMapping("/episode")
	public int updateEpisode(@RequestBody Episode episode ) {
		System.out.println("42");
		return episodeService.updateEpisode(episode);
	}
	
	@GetMapping("/episodes/order/{id}/{start}")
	public List<Episode> getEpisodeByIDOrder(@PathVariable("id") int id_book, @PathVariable("start") int start) {
		return episodeService.getEpisodeByIDOrder(id_book, start);
	}
	
	@GetMapping("/episodeview/{view}/{id_episode}")
	public int updateEpisodeView(@PathVariable("id_episode") int id_episode, @PathVariable("view") int view) {
		System.out.println("53");
		return episodeService.updateEpisodeView(view, id_episode);
	}
}
