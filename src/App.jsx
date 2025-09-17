import { useEffect, useState } from "react";
import AddTask from "./assets/components/AddTask";
import Tasks from "./assets/components/Tasks";
import { v4 } from "uuid";
import Title from "./assets/components/Title";

function App() {
  const [tasks, SetTasks] = useState(
    JSON.parse(localStorage.getItem("tarefas")) || []
  );

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tasks));
  }, [tasks]);

  // //API
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     //Chamar API
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       { method: "GET" }
  //     );

  //     //Capturar dados retornados
  //     const data = await response.json();

  //     //Armazenar dados no state
  //     SetTasks(data);
  //   };

  //   fetchTasks();
  // }, []);

  function onTaskClick(TaskID) {
    const newTasks = tasks.map((task) => {
      if (task.id === TaskID) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    SetTasks(newTasks);
  }

  function onClickDeleteTask(TaskID) {
    const newTasks = tasks.filter((task) => task.id !== TaskID);
    SetTasks(newTasks);
  }

  function onSubmitAddTask(title, description) {
    const newTasks = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };

    SetTasks([...tasks, newTasks]);
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex justify-center p-6 overflow-x-hidden">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onSubmitAddTask={onSubmitAddTask} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onClickDeleteTask={onClickDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
