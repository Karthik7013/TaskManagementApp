import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v1 as uuidv1 } from "uuid";
import Data from "./data.json";
import "./index.css";
function App() {
  const [data, setData] = useState(Data);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [updateID, setUpdateID] = useState();
  const [updateTitle, setupdateTitle] = useState();
  const [updateContent, setupdateContent] = useState();

  const titleRef = useRef();
  const contentRef = useRef();


  useEffect(() => {
    titleRef.current.value = null;
    contentRef.current.value = null;

  }, [data]);

  const addPost = () => {
    if (title && content) {
      let newPost = {
        "id": uuidv1(),
        "title": title,
        "content": content
      }
      let posts = [...data, newPost]
      setData(posts);
      setTitle();
      setContent();
      saveJson(posts);
    }


  }
  const updatePost = () => {

    let editedPost = {
      "id": updateID,
      "title": updateTitle,
      "content": updateContent
    }
    let filterPost = [...data].filter((obj) => obj.id !== updateID);
    let posts = [...filterPost, editedPost]
    setData(posts);
    setUpdateID();
    setupdateTitle();
    setupdateContent();
    saveJson(posts);
  }
  const deletePost = (key) => {
    let filterOutPost = [...data].filter((obj) => obj.id !== key);
    setData(filterOutPost);
    saveJson(filterOutPost);

  }
  const populatePost = (key, title, content) => {
    console.log(key, title, content)
    setUpdateID(key);
    setupdateTitle(title);
    setupdateContent(content);

  }

  const saveJson = (posts) => {
    const url = 'http://localhost:5000/write'
    axios.post(url, posts)
      .then((res) => { })
      .catch((error) => {
      });
  }
  return (
    <div className="App">
      <div className='form'>
        <h4 className='add-post'>Add Post</h4>
        <input className='first input' placeholder='title' onChange={(e) => { setTitle(e.target.value) }} value={title || ''} ref={titleRef} /><br />
        <input className='input' placeholder='Content' onChange={(e) => { setContent(e.target.value) }} value={content || ''} ref={contentRef} /><br />
        <button className="submit btn" onClick={addPost}>Add Task</button>
      </div>
      {updateTitle || updateContent ? (
        <div>
          <h4>Edit Post</h4>
          <input placeholder='title' onChange={(e) => { setupdateTitle(e.target.value) }} value={updateTitle || ''} /><br />
          <input placeholder='Content' onChange={(e) => { setupdateContent(e.target.value) }} value={updateContent || ''} /><br />
          <button className='btn update' onClick={updatePost}>Edit Task</button>
        </div>
      ) : null}
      <div className=''>
        {data ? data.map((post) => {
          return (
            <div key={post.id} className='task'>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button className='btn update' onClick={() => populatePost(post.id, post.title, post.content)}>update</button>
              <button className="btn delete" onClick={() => { deletePost(post.id) }}>delete</button>
            </div>
          )
        }) : null}
      </div>
    </div>
  );
}

export default App;
