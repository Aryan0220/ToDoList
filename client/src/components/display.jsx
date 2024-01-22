import React, { useEffect, useState } from "react";
import axios from "axios";

const Display = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCheckbox = async (id, done) => {
    await axios
      .patch("http://localhost:8000/update/" + id + "/" + done)
      .then((res) => window.location.reload())
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8000/delete/" + id)
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
            <div>
              <div onClick={() => handleCheckbox(todo.id, todo.done)}>
                {todo.done ? (
                  <ion-icon name="radio-button-on-outline"></ion-icon>
                ) : (
                  <ion-icon name="radio-button-off-outline"></ion-icon>
                )}
                <span className={todo.done ? "strike" : ""}>{todo.task}</span>
                <ion-icon
                  name="trash-outline"
                  onClick={() => handleDelete(todo.id)}
                ></ion-icon>
              </div>
              <div></div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Display;