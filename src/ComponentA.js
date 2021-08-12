import React, { useEffect, useState } from "react";
import "./ComponentA.css";

const getItem = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function ComponentA() {
  const [todo, setTodo] = useState("");
  const [items, setItems] = useState(getItem);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const toggleHandler = (e) => {
    e.preventDefault();
    if (!todo) {
      alert("please enter a todo");
    } else if (todo && editMode) {
      setItems(
        items.map((elem) => {
          if (elem.id === editId) {
            return { ...elem, name: todo };
          }
          return elem;
        })
      );

      setEditMode(false);
      setTodo("");
      setEditId(null);
    } else {
      const TODO = { id: new Date().getTime().toString(), name: todo };
      setItems([...items, TODO]);
      setTodo("");
    }
  };

  const deleteHandler = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const editHandler = (id) => {
    const editItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(editItem);
    setEditMode(true);
    setTodo(editItem.name);
    setEditId(id);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <div className="classA">
      <h3 className="heading">Write Your TODO Here</h3>

      <form>
        <div className="classB">
          <input
            className="classA_input"
            type="text"
            placeholder="Type Your TODO Here"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" onClick={toggleHandler}>
            +
          </button>
        </div>
      </form>

      <div>
        {items.map((elem) => {
          return (
            <div className="classC" key={elem.id}>
              <h4>{elem.name}</h4>
              <button onClick={() => editHandler(elem.id)}>Edit</button>
              <button onClick={() => deleteHandler(elem.id)}>Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComponentA;
