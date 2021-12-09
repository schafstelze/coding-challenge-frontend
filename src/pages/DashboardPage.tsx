import {
  Button,
  Input,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import List from "../components/List";
import { Todo } from "../types";

type Props = RouteComponentProps & { items: Todo[] } & WithStyles;
class DashboardPage extends Component<
  Props,
  { items: Todo[]; newTodoText: string }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      newTodoText: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ newTodoText: value });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { items, newTodoText: newTodo } = this.state;
    const response = await fetch("http://localhost:4000/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTodo, description: "" }),
    });

    if (response.ok) {
      this.setState({
        items: [
          ...items,
          { id: items.length.toString(), name: newTodo, description: "" },
        ],
        newTodoText: "",
      });
    }
  };

  async componentDidMount() {
    const items = await getItems();
    this.setState({ items });
  }
  render() {
    const { items } = this.state;
    const { classes } = this.props;

    return (
      <main style={{ padding: "0 15%" }}>
        <h4 style={{ fontFamily: "Roboto" }}>Add new Todo</h4>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <label className={classes.label} htmlFor="name">
            Name:
          </label>
          <Input
            id="name"
            className={classes.item}
            placeholder="Add a name for the new todo"
            aria-label="Todo Name"
            onChange={this.handleChange}
            value={this.state.newTodoText}
            required
          />
          <label className={classes.label} htmlFor="description">
            Description:
          </label>
          <Input
            id="description"
            className={classes.item}
            placeholder="Here you can add a description"
            aria-label="Todo Description"
            onChange={this.handleChange}
            value={this.state.newTodoText}
            required
          />
          <Button
            className={classes.item}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </form>

        <List items={items} />
      </main>
    );
  }
}

const getItems = async () => {
  const response = await fetch("http://localhost:4000/details", {
    method: "GET",
  });
  if (response.status === 200) {
    const data: Todo[] = await response.json();
    if (data) {
      return Promise.resolve(data);
    }
  }
  return [];
};

const styles = (theme: Theme) => ({
  form: {
    display: "flex",
    // Using flexFlow as flexDirection was causing a crash
    flexFlow: "column",
    margin: "25px 0",
  },
  item: {
    margin: "15px 0",
  },
  label: {
    fontFamily: "Roboto",
  },
});

export default withRouter(withStyles(styles)(DashboardPage));
