import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState([]);
  const handleClick = async () => {
    try {
      const result = await axios.post(
        "https://todo-list-wgfe.onrender.com/add",
        {
          task: task,
        }
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="create-form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default Create;
