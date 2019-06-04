package com.example.TestCreateProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TestCreateProject.Model.Episode;
import com.example.TestCreateProject.Repository.EpisodeRepo;

@Service
public class EpisodeService {

	@Autowired
	private EpisodeRepo episodeRepo;

	public List<Episode> getEpisodeByID(int id_user, int id_book) {
		return episodeRepo.getEpisodeByID(id_user, id_book);
	}

	public Episode getEpisodeByIDEpisode(int id_episode) {
		return episodeRepo.getEpisodeByIDEpisode(id_episode);
	}

	public int createEpisode(Episode episode) {
		return episodeRepo.createEpisode(episode);

	}

	public int updateEpisode(Episode episode) {
		return episodeRepo.updateEpisode(episode);
	}
	
	public List<Episode> getEpisodeByIDOrder(int id_book, int start) {
		return episodeRepo.getEpisodeByIDOrder(id_book, start);
	}
	
	public int updateEpisodeView(int view, int id_episode) {
		return episodeRepo.updateEpisodeView(view, id_episode);
	}
}
