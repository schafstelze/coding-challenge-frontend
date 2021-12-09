import { getByLabelText, render } from "@testing-library/react";
import DashboardPage from "../DashboardPage";
import { HashRouter as Router } from "react-router-dom";

const defaultProps = {
  items: [
    {
      id: "1",
      name: "Grocery",
      description: "Buy eggs",
    },
  ],
  classes: {
    form: "DashboardPage-form-1",
    item: "DashboardPage-item-2",
    label: "DashboardPage-label-3",
  },
};

const renderComponent = (props = defaultProps) => {
  return render(
    <Router>
      <DashboardPage {...props} />
    </Router>
  );
};

test("should render correctly", () => {
  const { getByText, container } = renderComponent();

  const addNewTodo = getByText(/Add new todo/i);
  const nameInput = getByLabelText(container, /Name:/i, {
    selector: "input",
  });
  const descriptionInput = getByLabelText(container, /Description:/i, {
    selector: "input",
  });

  const todoList = getByText(/Todo List/i);

  expect(addNewTodo).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(todoList).toBeInTheDocument();
});
