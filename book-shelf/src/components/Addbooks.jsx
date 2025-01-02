import React, { useState } from "react";
import "../assets/styles/addBooks.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/features/addBooks";
import { useNavigate } from "react-router-dom";

export default function Addbooks() {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValue = {
    addBook_bookImage: "",
    addBook_bookTitle: "",
    addBook_bookAuthor: "",
    addBook_bookLang: "",
    addBook_bookPage: "",
    addBook_bookGenre: "",
    addBook_bookDesc: "",
    addBook_bookRating: "",
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [formError, setFormError] = useState({});

  function handleChange(e){
    const {name, value} = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  function handleAddBook(e){
    e.preventDefault()
    if (handleValidate(formValues)){
      const newGen = formValues.addBook_bookGenre.split(",").map((gen) =>
        gen
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
          .trim()
      );
      const newOBJ = {
        id: books.length + 1,
        image_url: formValues.addBook_bookImage,
        title: formValues.addBook_bookTitle,
        author: formValues.addBook_bookAuthor,
        language: formValues.addBook_bookLang,
        pages: formValues.addBook_bookPage,
        genre: newGen,
        format: "Hardcover",
        description: formValues.addBook_bookDesc,
        is_bookmarked: false,
        rating: formValues.addBook_bookRating,
      };
      dispatch(addItem({ newOBJ }));
      navigate(`/browse?Highlight=${books.length + 1}`); 
    }
  }

  function handleValidate(values){
    const errors = {}
    const imageRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
    const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
    const pagesRegex = /\b([1-9][0-9]{0,2}|1[0-4][0-9]{2}|1500)\b/;
    const ratingRegex = /^(1(\.[0-9])?|2(\.[0-9])?|3(\.[0-9])?|4(\.[0-9])?|5(\.0)?)$/
    const languageRegex = /^[a-zA-Z\s]+$/;
    const genreRegex = /^[a-zA-Z\s,]+$/;

    if(!values.addBook_bookImage){
      errors.addBook_bookImage = 'Image URL is required!'
    } else if(!imageRegex.test(values.addBook_bookImage)){
      errors.addBook_bookImage = 'URL not in correct format!'
    }

    if (!values.addBook_bookAuthor) {
      errors.addBook_bookAuthor = 'Author name is required!'
    } else if(!nameRegex.test(values.addBook_bookAuthor)){
      errors.addBook_bookAuthor = 'Name must only contain Alphabets!'
    }

    if(!values.addBook_bookTitle){
      errors.addBook_bookTitle = 'Title of the book is required!'
    }

    if(!values.addBook_bookPage){
      errors.addBook_bookPage = 'Number of pages is required!'
    } else if(!pagesRegex.test(values.addBook_bookPage)){
      errors.addBook_bookPage = 'Pages should in between 1 to 1500!'
    }

    if(!values.addBook_bookRating){
      errors.addBook_bookRating = 'Rating of the book is required!'
    } else if(!ratingRegex.test(values.addBook_bookRating)){
      errors.addBook_bookRating = 'Rating must be between 1.0 and 5.0'
    }

    if(!values.addBook_bookLang){
      errors.addBook_bookLang = 'Language of the book is required!'
    } else if(!languageRegex.test(values.addBook_bookLang)){
      errors.addBook_bookLang = 'Language must contain only letters and spaces!'
    }

    if(!values.addBook_bookGenre){
      errors.addBook_bookGenre = 'Genre of the book is required!'
    } else if(!genreRegex.test(values.addBook_bookGenre)){
      errors.addBook_bookGenre = 'Genre must contain only letters, spaces, and commas'
    }

    if(!values.addBook_bookDesc){
      errors.addBook_bookDesc = 'Description of the book is required!'
    }

    setFormError(errors)
    return Object.keys(errors).length === 0;
  }

  const [exampleOne, setExampleOne] = useState(false);
  const [exampleTwo, setExampleTwo] = useState(false);

  // const [imageValue, setImageValue] = useState("");
  // const [authorValue, setauthorValue] = useState("");
  // const [titleValue, settitleValue] = useState("");
  // const [pageValue, setpageValue] = useState("");
  // const [langugaeValue, setlangugaeValue] = useState("");
  // const [genreValue, setgenreValue] = useState("");
  // const [descValue, setdescValue] = useState("");
  // const [ratingValue, setRatingValue] = useState("");

  const [imageFocus, setImageFocus] = useState(false);
  const [authorFocus, setAuthorFocus] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);
  const [pageFocus, setPageFocus] = useState(false);
  const [languageFocus, setLanguageFocus] = useState(false);
  const [genreFocus, setGenreFocus] = useState(false);
  const [ratingFocus, setratingFocuc] = useState(false);

  return (
    <div className="addBooks_Section">
      <div className="exampleBar">
        <h2 className="bookDetails_Info">
          Our system manages book information for our Library. Below is a
          detailed breakdown of the data fields that can be added to the
          database, along with their requirements.
        </h2>
        <div>
          <h3 className="book_Constraints_header">Constraints:</h3>
          <ol className="books_constraints">
            <li>All of the fields are compulsory.</li>
            <li>Image should consist of URL of the Image.</li>
            <li>Rating should be a number between (1.0 to 5.0).</li>
            <li>Page should contain the total number of pages in the book.</li>
            <li>If there is more than 1 genre, Separate them by coma.</li>
          </ol>
        </div>
        <div className="exampleForBooks">
          <div className="exampleForBook">
            <div
              className="book_example_header"
              onClick={() => setExampleOne(!exampleOne)}
            >
              <h3 className="ex1">Example 1</h3>
              {exampleOne ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </div>
            <ul
              className={exampleOne ? "exampleList-open" : "exampleList-close"}
            >
              <li>
                <b>Image:</b>{" "}
                https://i.pinimg.com/736x/94/a4/c4/94a4c4358cb78850732b3bb3b397783f.jpg
              </li>
              <li className="title_list">
                <b>Title:</b> Glitch
              </li>
              <li>
                <b>Author:</b> Andrea Koroveshi
              </li>
              <li>
                <b>page:</b> 250
              </li>
              <li>
                <b>Language:</b> English
              </li>
              <li>
                <b>Genre:</b> Thriller, Science Fiction
              </li>
              <li>
                <b>Rating:</b> 4.2
              </li>
              <li>
                <b>Description:</b> A gripping cyberpunk thriller exploring the
                boundaries between humanity and artificial intelligence. Follow
                Alex, a rogue programmer, as they uncover a glitch in the
                AI-driven city of Nexos.
              </li>
            </ul>
          </div>
          <div className="exampleForBook">
            <div
              className="book_example_header"
              onClick={() => setExampleTwo(!exampleTwo)}
            >
              <h3 className="ex1">Example 2</h3>
              {exampleTwo ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </div>
            <ul
              className={exampleTwo ? "exampleList-open" : "exampleList-close"}
            >
              <li>
                <b>Image:</b>{" "}
                https://i.pinimg.com/736x/cb/57/bb/cb57bbc4c4b1b77a5b0568625d18e535.jpg
              </li>
              <li className="title_list">
                <b>Title:</b> How to Be Eaten
              </li>
              <li>
                <b>Author:</b> Maria Adelmann
              </li>
              <li>
                <b>page:</b> 304
              </li>
              <li>
                <b>Language:</b> English
              </li>
              <li>
                <b>Genre:</b> Fiction
              </li>
              <li>
                <b>Rating:</b> 4.0
              </li>
              <li>
                <b>Description:</b> A modern reimagining of fairy tales where
                five women meet in a support group to recount their trauma and
                reclaim their narratives. Dark, witty, and poignant.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Form_Section">
        <form className="addBooks_Form" onSubmit={handleAddBook}>
          <div className="divforBookImage_URL">
            <label
              className={
                imageFocus || formValues.addBook_bookImage
                  ? "addBooks_image_label-notFocus"
                  : "addBooks_image_label-focus"
              }
              htmlFor="book_image"
            >
              Image URL
            </label>{" "}
            <br />
            <input
              value={formValues.addBook_bookImage}
              onChange={handleChange}
              onFocus={() => setImageFocus(true)}
              onBlur={() => setImageFocus(false)}
              type="text"
              id="book_image"
              name="addBook_bookImage"
              className="addBooks_image_class"
            />
            <p className="error_text">{formError.addBook_bookImage}</p>
          </div>
          <div className="addBooks_div1">
            <div className="divforBookTitle">
              <label
                className={
                  titleFocus || formValues.addBook_bookTitle
                    ? "addBooks_title_label-notFocus"
                    : "addBooks_author_label-focus"
                }
                htmlFor="book_title"
              >
                Book Title
              </label>{" "}
              <br />
              <input
                value={formValues.addBook_bookTitle}
                onChange={handleChange}
                onFocus={() => setTitleFocus(true)}
                onBlur={() => setTitleFocus(false)}
                type="text"
                id="book_title"
                name="addBook_bookTitle"
                className="addBooks_title_class"
              />
              <p className="error_text">{formError.addBook_bookTitle}</p>
            </div>
            <div className="divforBookAuthor">
              <label
                className={
                  authorFocus || formValues.addBook_bookAuthor
                    ? "addBooks_author_label-notFocus"
                    : "addBooks_author_label-focus"
                }
                htmlFor="book_author"
              >
                Author Name
              </label>{" "}
              <br />
              <input
                value={formValues.addBook_bookAuthor}
                onChange={handleChange}
                onFocus={() => setAuthorFocus(true)}
                onBlur={() => setAuthorFocus(false)}
                type="text"
                id="book_author"
                name="addBook_bookAuthor"
                className="addBooks_author_class"
              />
            <p className="error_text">{formError.addBook_bookAuthor}</p>
            </div>
          </div>
          <div className="addBooks_div1">
            <div className="divforBookPage">
              <label
                className={
                  pageFocus || formValues.addBook_bookPage
                    ? "addBooks_page_label-notFocus"
                    : "addBooks_author_label-focus"
                }
                htmlFor="book_page"
              >
                Pages
              </label>{" "}
              <br />
              <input
                value={formValues.addBook_bookPage}
                onChange={handleChange}
                onFocus={() => setPageFocus(true)}
                onBlur={() => setPageFocus(false)}
                type="number"
                name="addBook_bookPage"
                className="addBook_bookPage_class"
                id="book_page"
              />
            <p className="error_text">{formError.addBook_bookPage}</p>
            </div>
            <div className="divfor_bookLang">
              <label
                className={
                  languageFocus || formValues.addBook_bookLang
                    ? "addBooks_lang_label-notFocus"
                    : "addBooks_lang_label-focus"
                }
                htmlFor="book_lang"
              >
                Language
              </label>{" "}
              <br />
              <input
                value={formValues.addBook_bookLang}
                onChange={handleChange}
                onFocus={() => setLanguageFocus(true)}
                onBlur={() => setLanguageFocus(false)}
                type="text"
                name="addBook_bookLang"
                className="addBook_bookLang_class"
                id="book_lang"
              />
              <p className="error_text">{formError.addBook_bookLang}</p>
            </div>
          </div>
          <div className="addBooks_div1">
            <div className="divforGenre">
              <label
                className={
                  genreFocus || formValues.addBook_bookGenre
                    ? "addBooks_genre_label-notFocus"
                    : "addBooks_genre_label-focus"
                }
                htmlFor="book_genre"
              >
                Genre
              </label>{" "}
              <br />
              <input
                value={formValues.addBook_bookGenre}
                onChange={handleChange}
                onFocus={() => setGenreFocus(true)}
                onBlur={() => setGenreFocus(false)}
                type="text"
                name="addBook_bookGenre"
                className="addBook_bookGenre_class"
                id="book_genre"
              />
              <p className="error_text">{formError.addBook_bookGenre}</p>
            </div>
            <div className="divforFormat">
              <label
                className={
                  ratingFocus || formValues.addBook_bookRating
                    ? "addBooks_format_label-focus"
                    : "addBooks_format_label-notFocus"
                }
                htmlFor="boook_format"
              >
                Rating
              </label>{" "}
              <br />
              <input
                value={formValues.addBook_bookRating}
                onChange={handleChange}
                onFocus={() => setratingFocuc(true)}
                onBlur={() => setratingFocuc(false)}
                name="addBook_bookRating"
                className="addBook_bookFormat_class"
                id="boook_format"
              />
              <p className="error_text">{formError.addBook_bookRating}</p>
            </div>
          </div>
          <div className="divfor_bookDesc">
            <label className="addBooks_desc_label-focus" htmlFor="book_desc">
              Description
            </label>
            <br />
            <textarea
              value={formValues.addBook_bookDesc}
              onChange={handleChange}
              placeholder="Should not more than 170 characters"
              name="addBook_bookDesc"
              id="book_desc"
              className="addBook_bookDesc_class"
            ></textarea>
            <p className="error_text">{formError.addBook_bookDesc}</p>
          </div>
          <button className="addBooks_submit" type="submit">
            Submit Book
          </button>
        </form>
      </div>
    </div>
  );
}
