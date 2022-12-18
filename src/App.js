import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [allTodos, setAllTodos] = useState([]); //todolist array olarak buaradan oluşturalacak
  const [newImg, setNewImg] = useState(); //resim url olarak buradan oluşturalacak
  const [newTitle, setNewTitle] = useState(""); //başlık string olarak buradan oluşturalacak
  const [newDescription, setNewDescription] = useState(""); //açıklama string buradan oluşturalacak
  const [completedTodos, setCompletedTodos] = useState([]); //tamamlandı array buradan oluşturalacak
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  //burada yeni todo oluşturuluyor
  const handleAddTodo = () => {
    let newTodoItem = {
      img: newImg,
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewImg('');
    setNewTitle('');
    setNewDescription('');
  };



  //sayfa yenilendiğinde todolist gitmiyor kaydettik
  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem("todolist"));
    let saveCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (saveTodo) {
      setAllTodos(saveTodo);
    }
    if (saveCompletedTodo) {
      setCompletedTodos(saveCompletedTodo);
    }
  }, []);




  //silme işlemi buradan yapıyoruz
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };



  //buradan completed silme işlemi yapılıyor
  const handleCompletedDeleteTodo = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index);
    localStorage.setItem("completedTodos ", JSON.stringify(reducedCompletedTodos));
    setCompletedTodos(reducedCompletedTodos);
  };



  //tamamlandı işlemini buradan yapıyoruz
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn: CompletedOn,
    };

    let updatedCompletedArr = [...completedTodos, filteredItem];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
    handleDeleteTodo(index);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Img</label>
            <input
              type="text"
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
              placeholder="what is the task Img ?"
            />
          </div>
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="what is the task title ?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="what is the task description ?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && "active"}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <p>{item.img}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      title="Complete?"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <p>{item.img}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.CompletedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => handleCompletedDeleteTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
