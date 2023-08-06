import { useEffect, useState } from "react";
import { Person, Task } from "../types";
import Table from "./tasks-table";
import { TaskData } from "./task-form";
import SlideOver from "./task-slide-over";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>();
  const [persons, setPersons] = useState<Person[]>();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const tasks = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(await tasks.json());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const persons = await fetch(`${import.meta.env.VITE_API_URL}/persons`);
      setPersons(await persons.json());
    })();
  }, []);
  const handleSave = async (task: TaskData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      const task = await response.json();
      tasks ? setTasks([...tasks, task]) : setTasks([task]);
      setOpen(false);
    }
  };
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const tasks = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(await tasks.json());
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-0">
      <div className="flex px-4 sm:px-6 md:px-0 justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 rounded-md p-2 text-white"
        >
          Create
        </button>
      </div>
      <div className="mt-8">
        <Table tasks={tasks} onDelete={handleDelete} />
        {open && (
          <SlideOver
            open={open}
            setOpen={setOpen}
            onSave={handleSave}
            persons={persons}
          />
        )}
      </div>
    </div>
  );
}
