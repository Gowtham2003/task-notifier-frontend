import { useEffect, useState } from "react";
import Table from "./persons-table";
import { Person } from "../types";
import SlideOver from "./person-slide-over";
import { PersonData } from "./person-form";

export default function Persons() {
  const [persons, setPersons] = useState<Person[]>();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const persons = await fetch(`${import.meta.env.VITE_API_URL}/persons`);
      setPersons(await persons.json());
    })();
  }, []);
  const handleSave = async (person: PersonData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/persons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    if (response.ok) {
      const person = await response.json();
      persons ? setPersons([...persons, person]) : setPersons([person]);
      setOpen(false);
    }
  };
  const handleDelete = async (person: Person) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/persons/${person._id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const persons = await fetch(`${import.meta.env.VITE_API_URL}/persons`);
      setPersons(await persons.json());
    }
  };

  return (
    <>
      <div className="flex px-4 sm:px-6 md:px-0 justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Persons</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 rounded-md p-2 text-white"
        >
          Create
        </button>
      </div>
      <div className="mt-8">
        <Table persons={persons} handleDelete={handleDelete} />
        <SlideOver open={open} setOpen={setOpen} onSave={handleSave} />
      </div>
    </>
  );
}
