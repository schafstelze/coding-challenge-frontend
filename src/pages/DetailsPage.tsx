import {
  withStyles,
  TextField,
  Typography,
  WithStyles,
  Theme,
  Button,
} from "@material-ui/core";
import { Component } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import DATABASE from "../db.json";
import { Todo } from "../types";

class DetailsPage extends Component<
  RouteComponentProps<{ id: string }> & WithStyles,
  Todo
> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      description: "",
      id: "",
    };
  }

  async componentDidMount() {
    for (let i = 0; i < DATABASE.details.length; i++) {
      if (this.props.match.params.id === DATABASE.details[i].id) {
        this.setState({
          name: DATABASE.details[i].name || "",
          description: DATABASE.details[i].description || "",
          id: DATABASE.details[i].id || "",
        });
      }
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    }
    if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    }
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const { name, description, id } = this.state;

    const response = await fetch(`http://localhost:4000/details/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
      this.props.history.push("/");
    }
  };
  render() {
    const { match, classes } = this.props;

    return (
      <main className={classes.main}>
        <Link
          // Adding it here, since it was crashing in the styles object
          style={{ position: "absolute" }}
          className={classes.backButton}
          to="/"
        >
          {" "}
          {"< Go Back"}
        </Link>
        <Typography variant="h4">Item id: {match.params.id}</Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            placeholder="Item name"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            className={classes.textField}
          />
          <TextField
            placeholder="Item description"
            value={this.state.description}
            onChange={this.handleChange}
            name="description"
            className={classes.textField}
          />
          <Button type="submit">Save</Button>
        </form>
      </main>
    );
  }
}

const styles = (theme: Theme) => ({
  main: {
    padding: "0 20px",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    maxWidth: "600px",
    margin: "20px auto",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    width: "100%",
  },
  textField: {
    margin: "10px 0",
  },
  backButton: {
    fontFamily: "Roboto",
    left: "20px",
  },
});

export default withRouter(withStyles(styles)(DetailsPage));
