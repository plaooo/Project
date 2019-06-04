package com.example.TestCreateProject.Service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.TestCreateProject.Model.Book;
import com.example.TestCreateProject.Model.TypeBook;
import com.example.TestCreateProject.Repository.BookRepo;

@Service
public class BookService {

	private String rootLocation = "src\\main\\resources\\static\\img-book\\";

	@Autowired
	private BookRepo bookRepo;

	public int createBook(Book book, List<TypeBook> tbList) {
		return bookRepo.createBook(book, tbList);
	}

	public int uploadImageBook(MultipartFile file, int id_book) {
		try {
			Path path = Paths.get(rootLocation + id_book);
			byte[] bytes = file.getBytes();
			File folder = new File(rootLocation + id_book);

			if (!folder.exists()) {
				folder.mkdirs();
				Files.write(path.resolve(file.getOriginalFilename()), bytes);
			} else {
				Files.write(path.resolve(file.getOriginalFilename()), bytes);
			}

			return 1;
		} catch (Exception e) {
			System.out.println("upload file Fail.");
			e.printStackTrace();
			return 0;
		}
	}

	public List<Book> getBookByUser(int id_user) {
		return this.bookRepo.getBookByUser(id_user);
	}

	public List<Book> getBookByOrder(int start, int end) {
		return bookRepo.getBookByOrder(start, end);
	}

	public List<Book> getBookByOrderView(int start, int end) {
		return bookRepo.getBookByOrderView(start, end);
	}

	public List<Book> getBookByOrderType(int type, int start, int end) {
		return bookRepo.getBookByOrderType(type, start, end);
	}

	public List<Book> getBookByOrderViewType(int type, int start, int end) {
		return bookRepo.getBookByOrderViewType(type, start, end);
	}

	public List<Book> getBookByID(int id) {
		return bookRepo.getBookByID(id);
	}

	public int deleteBookByID(int id_book) {
		return bookRepo.deleteBookByID(id_book);
	}

	public int report_niyay(int id_user, int id_book, String txt) {
		return bookRepo.report_niyay(id_user, id_book, txt);
	}

	public List<Book> ShowBook() {
		return bookRepo.ShowBook();
	}

	public int Nonbanniyay(int id_book) {
		return bookRepo.Nobanniyay(id_book);
	}

	public int banniyay(int id_book, String mail, String description_ban) throws AddressException, MessagingException {
		return bookRepo.banniyay(id_book, mail, description_ban);
	}

}
