import React, { useState, useEffect } from "react";
import "./EditPost.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";


export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState("");
  const [modifiedField, setModifiedField] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { state: post } = location;

  const { data, error, optionsData } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    "PATCH"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setValidationError("Please enter the title field!!!");
      return;
    } else if (!content) {
      setValidationError("Please enter the content field!!!");
      return;
    } else {
      setValidationError("");
      optionsData({ ...post, ...modifiedField }, () => {
        navigate("/");
      });
    }
  };

  useEffect(() => {
    setTitle(post.title);
    setContent(post.body);
  }, [post.title, post.body]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setModifiedField({ ...modifiedField, title: e.target.value });
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
    setModifiedField({ ...modifiedField, body: e.target.value });
  };

  return (
    <div className="outercontainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <h6>Title</h6>
          </label>
          <input
            className="form-control mb-2"
            type="text"
            value={title}
            onChange={onTitleChange}
          />
        </div>
        <div className="form-group">
          <label>
            <h6>Content</h6>
          </label>
          <textarea
            className="form-control"
            type="text"
            value={content}
            onChange={onContentChange}
          />
        </div>
        {validationError && (
          <div className="alert alert-danger mt-3" role="alert">
            {validationError}
          </div>
        )}
        {data && data.title && (
          <div className="alert alert-success" role="alert">
            Post Edited successfully!!!
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div>
          <button type="submit" className="btn btn-success float-end mt-3">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
