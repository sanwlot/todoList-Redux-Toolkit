import { useState } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todosSlice"

export default function AddTodo() {
  const dispatch = useDispatch()
  const [todo, setTodo] = useState("")
  function handleAddTodo() {
    if (todo) {
      dispatch(
        addTodo({
          id: nanoid(),
          text: todo,
          done: false,
          createdAt: Date.now(),
        })
      )
    }
    setTodo("")
  }
  return (
    <section>
      <h1 className="text-center my-3">Todo list with RTK</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Add todo"
          className="form-control fs-3 fw-bold"
          style={{ color: "#00308F" }}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          onClick={() => handleAddTodo()}
        >
          Add
        </button>
      </div>
    </section>
  )
}
