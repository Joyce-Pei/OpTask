import { useState } from "react";
import { toast } from "react-toastify";
import "./TaskForm.css";
import PropTypes from "prop-types";

const TaskForm = (props) => {
  const [taskTextValue, setTaskText] = useState("");
  const handleChange = (event) => {
    setTaskText(event.target.value);
  };

  const createTask = async (event) => {
    event.preventDefault();
    const response = await fetch("/projects/newTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: props.projectId,
        taskText: taskTextValue,
        taskState: "todo",
      }),
    });
    if (response) {
      setTaskText("");
      props.newTaskAdded();
      toast.success("Successfully added in a new task!");
    }
  };

  return (
    <div className="card p-3 border mt-3 shadow">
      <form onSubmit={createTask}>
        <div className="mb-3">
          <label htmlFor="taskText" className="form-label">
            New Task
          </label>
          <textarea
            className="form-control"
            id="taskText"
            name="taskText"
            rows="3"
            value={taskTextValue}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn addBtn" type="submit">
          Add task
        </button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  newTaskAdded: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default TaskForm;
