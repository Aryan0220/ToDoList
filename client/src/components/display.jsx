import React, { useEffect, useState } from "react";
import axios from "axios";

const Display = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("https://todo-list-wgfe.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCheckbox = async (id, done) => {
    await axios
      .patch("https://todo-list-wgfe.onrender.com/update/" + id + "/" + done)
      .then((res) => window.location.reload())
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    await axios
      .delete("https://todo-list-wgfe.onrender.com/delete/" + id)
      .then((res) => window.location.reload())
      .catch((err) => console.error(err));
  };

  return (
    <div className="display-task">
      {tasks.length === 0 ? (
        <div>
          <h2>No Records</h2>
        </div>
      ) : (
        tasks.map((todo) => {
          return (
            <div className="display-card">
              <div
                className="icon"
                onClick={() => handleCheckbox(todo.id, todo.done)}
              >
                {todo.done ? (
                  <ion-icon name="radio-button-on" id="radio"></ion-icon>
                ) : (
                  <ion-icon name="radio-button-off" id="radio"></ion-icon>
                )}
              </div>
              <div className="records">
                <span className={todo.done ? "strike" : ""}>{todo.task}</span>
                <span className="separator">|</span>
                <ion-icon
                  name="trash"
                  id="trash"
                  onClick={() => handleDelete(todo.id)}
                ></ion-icon>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Display;
