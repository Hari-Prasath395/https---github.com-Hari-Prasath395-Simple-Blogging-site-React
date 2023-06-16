import React, { useEffect } from "react";
import "./Postdetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import AppSubmitButton from "../../components/appsubmitbutton/AppSubmitButton";


export default function Postdetails() {
  const location = useLocation();

  const { state: post } = location;

  const { data, error, optionsData } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    "DELETE"
  );

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${post.id}`, { state: post });
  };

  useEffect(() => {
    if (data.length !== 0) {
      const timer = setTimeout(() => {
        navigate("/");
        return () => clearTimeout(timer);
      }, 3000);
    }
  }, [data, navigate]);

  const handleDelete = () => {
    optionsData();
  };
  return (
    <div className="container outer">
      <div className="jumbotron ">
        <h1 className="display-4">{post.title}</h1>
        <p className="lead">{post.body}</p>
        {data.length < 0 && (
          <div className="alert alert-success" role="alert">
            Post deleted successfully!!!
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div type="submit" className="btn  float-end">
          <AppSubmitButton onClick={handleEdit} title="Edit" />
        </div>
        <div type="submit" className="btn  float-end mx-3">
          <AppSubmitButton onClick={handleDelete} title="Delete" />
        </div>
      </div>
    </div>
  );
}
