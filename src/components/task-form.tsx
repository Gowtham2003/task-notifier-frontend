import { useState } from "react";
import { Person } from "../types";

export type TaskData = {
  title: string;
  description: string;
  dueDate: string;
  persons: string[];
};
export default function TaskForm({
  onSave,
  onCancel,
  persons,
}: {
  onSave: (data: TaskData) => void;
  onCancel: () => void;
  persons?: Person[];
}) {
  const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);

  const handlePersonSelection = (person: Person) => {
    setSelectedPersons((prevSelectedPersons: Person[]) =>
      prevSelectedPersons.includes(person)
        ? prevSelectedPersons.filter((person) => person._id !== person._id)
        : [...prevSelectedPersons, person]
    );
  };
  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          /// @ts-ignore
          const title = form.title.value;
          const description = form.description.value;
          const dueDate = form.date.value;
          const persons = selectedPersons.map((person) => person._id);
          onSave({ title, description, dueDate, persons: persons });
        }}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <div className="mt-1">
            <input
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              autoComplete="description"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="date"
              name="date"
              autoComplete="date"
              min={new Date().toISOString().split("T")[0]}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <legend className="text-sm font-medium text-gray-700">Members</legend>
          <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
            {persons?.map((person, personIdx) => (
              <div key={personIdx} className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label
                    htmlFor={`person-${person._id}`}
                    className="font-medium text-gray-700 select-none"
                  >
                    {person.name}
                  </label>
                </div>
                <div className="ml-3 flex items-center h-5">
                  <input
                    id={`person-${person._id}`}
                    name={`person-${person._id}`}
                    value={person._id}
                    checked={selectedPersons.includes(person)}
                    onChange={() => handlePersonSelection(person)}
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 px-4 py-4 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
