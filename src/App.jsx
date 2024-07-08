import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

export default function App() {
  return (
    <main className="container">
      <AddTodo />
      <Todos />
    </main>
  );
}
