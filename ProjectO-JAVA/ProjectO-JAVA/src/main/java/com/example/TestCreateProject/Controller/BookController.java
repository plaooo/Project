package com.example.TestCreateProject.Controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.TestCreateProject.Model.Book;
import com.example.TestCreateProject.Model.TypeBook;
import com.example.TestCreateProject.Service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

@RestController
@CrossOrigin(origins = "*")
public class BookController {

	@Autowired
	private BookService bookService;

	@RequestMapping(value = "/book", method = RequestMethod.POST)
	public int createBook(@RequestParam("name_fiction") String name_fiction, @RequestParam("preview") String preview,
			@RequestParam("id_user") String id_user, @RequestParam("img_book") String img_book,
			@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam("typebooks") String typebooks) {
		System.out.println(img_book);
		System.out.println(typebooks);
		Book book = new Book();
		book.setName_fiction(name_fiction);
		book.setPreview(preview);
		book.setId_user(Integer.parseInt(id_user));
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			TypeFactory typeFactory = objectMapper.getTypeFactory();
			List<TypeBook> tbList = objectMapper.readValue(typebooks,
					typeFactory.constructCollectionType(List.class, TypeBook.class));
			System.out.println(tbList.get(0).getName_type());
			if (file != null) {
				System.out.println(true);
				book.setImg_book(img_book);
				int id_book = bookService.createBook(book, tbList);
				if (id_book > 0) {
					int upload = bookService.uploadImageBook(file, id_book);
					if (upload > 0) {
						return id_book;
					} else {
						return 0;
					}
				} else {
					return 0;
				}
			} else {
				System.out.println(false);
				int id_book = bookService.createBook(book, tbList);
				if (id_book > 0) {
					return id_book;
				} else {
					return 0;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@RequestMapping(value = "/book/{id_user}", method = RequestMethod.GET)
	public List<Book> getBookByUser(@PathVariable("id_user") int id_user) {

		return this.bookService.getBookByUser(id_user);
	}

	@RequestMapping(value = "/imagebook/{id_book}/{img_book}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getImageBook(@PathVariable("id_book") String id_book, @PathVariable("img_book") String img_book)
			throws IOException {

		File file = new File("src\\main\\resources\\static\\img-book\\" + id_book + "\\" + img_book);
		System.out.println(file);
		byte[] img = FileUtils.readFileToByteArray(file);

		return img;
	}

	@GetMapping("/book/order/{start}/{end}")
	public List<Book> getBookByOrder(@PathVariable("start") int start, @PathVariable("end") int end) {
		return bookService.getBookByOrder(start, end);
	}

	@GetMapping("/book/view/{start}/{end}")
	public List<Book> getBookByOrderView(@PathVariable("start") int start, @PathVariable("end") int end) {
		return bookService.getBookByOrderView(start, end);
	}

	@GetMapping("/book/order/{id_type}/{start}/{end}")
	public List<Book> getBookByOrderType(@PathVariable("id_type") int type, @PathVariable("start") int start,
			@PathVariable("end") int end) {
		return bookService.getBookByOrderType(type, start, end);
	}

	@GetMapping("/book/view/{id_type}/{start}/{end}")
	public List<Book> getBookByOrderViewType(@PathVariable("id_type") int type, @PathVariable("start") int start,
			@PathVariable("end") int end) {
		return bookService.getBookByOrderViewType(type, start, end);
	}

	@GetMapping("/book/id/{id}")
	public List<Book> getBookByID(@PathVariable("id") int id) {
		return bookService.getBookByID(id);
	}

	@DeleteMapping("/book/{id}")
	public int deleteBookByID(@PathVariable("id") int id_book) {
		System.out.println("124");
		return bookService.deleteBookByID(id_book);
	}

	@PostMapping("/report/niyay")
	public int report_niyay(@RequestParam("id_user") int id_user, @RequestParam("id_book") int id_book,
			@RequestParam("txt") String txt) {
		System.out.println(txt);
		// return 1;
		return bookService.report_niyay(id_user, id_book, txt);
	}

	@GetMapping("/book/showniyay")
	public List<Book> ShowBook() {
		return bookService.ShowBook();
	}

	@PutMapping("/book/NoBanniyay")
	public int Nobanniyay(@RequestParam("id_book") int id_book) {
		System.out.print(id_book);
		return bookService.Nonbanniyay(id_book);
	}

	@PutMapping("/book/Banniyay")
	public int banniyay(@RequestParam("id_book") int id_book, @RequestParam("email") String mail,
			@RequestParam("description_ban") String description_ban) throws AddressException, MessagingException {
		return bookService.banniyay(id_book, mail, description_ban);
	}



}
