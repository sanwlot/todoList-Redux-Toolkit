import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteTodo, updateTodo, toggleDone } from "../features/todosSlice"

export default function Todos() {
  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()

  const [updatedTodo, setUpdatedTodo] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  function handleUpdate() {
    dispatch(updateTodo(updatedTodo))
    setIsEditing(false)
    setUpdatedTodo({})
  }

  const sortedTodos = [...todos].sort((a, b) => b.createdAt - a.createdAt)
  const todosEl = sortedTodos.map((todo) => (
    <li className="list-group-item" key={todo.id}>
      <div className="d-flex justify-content-between align-items-center">
        <strong
          className="fs-2"
          style={{
            textDecoration: todo.done ? "line-through" : "",
            color: "#333",
          }}
          onClick={() => dispatch(toggleDone(todo.id))}
        >
          {todo.text}
        </strong>
        <div>
          {/* only show the update input when isEditing is true and editId matches todo.id */}
          {isEditing && editId === todo.id ? (
            <div className="input-group">
              <input
                type="text"
                placeholder="Update todo"
                className="form-control"
                onChange={(e) =>
                  setUpdatedTodo({
                    ...todo, // todo id is included in the spread
                    text: e.target.value,
                    createdAt: Date.now(),
                  })
                }
              />
              <button
                className="btn btn-outline-primary"
                onClick={() => handleUpdate()}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setIsEditing(true)
                  setEditId(todo.id)
                }}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  ))

  return <ul className="list-group">{todosEl}</ul>
}
