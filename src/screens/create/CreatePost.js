import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import AppSubmitButton from "../../components/appsubmitbutton/AppSubmitButton";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const { data, error, optionsData } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    "POST"
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
      optionsData({ title, body: content, userId: 1 });
      console.log({ title, body: content, userId: 1 });
    }
  };

  useEffect(() => {
    if (data.length !== 0) {
      const timer = setTimeout(() => {
        navigate("/");
        return () => clearTimeout(timer);
      }, 3000);
    }
  }, [data, navigate]);
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {validationError && (
          <div className="alert alert-danger mt-3" role="alert">
            {validationError}
          </div>
        )}
        {data.length < 0 && (
          <div className="alert alert-success" role="alert">
            Post created successfully!!!
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div type="submit" className="btn float-end mt-3">
          <AppSubmitButton title="create" />
        </div>
      </form>
    </div>
  );
}
