import {
  withStyles,
  TextField,
  Typography,
  WithStyles,
  Theme,
} from "@material-ui/core";
import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {getDetail} from '../api/details';

type DetailsPageState = {
  name: string; 
  description: string
}
class DetailsPage extends Component<
  RouteComponentProps<{ id: string }> & WithStyles,
  DetailsPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  async componentDidMount() {
    const {name, description} = await getDetail(this.props.match.params.id);
    this.setState({name, description})
  }

  handleNameChange = () => {
    // change should have a debounce
    // after debounce -> name should be updated on db.json
    // docs (json-server): https://github.com/typicode/json-server
  };
  render() {

    const { match, classes } = this.props;

    return (
      <main className={classes.main}>
        <Typography variant="h4">Item id: {match.params.id}</Typography>
        <TextField
          placeholder="Item name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <TextField
          placeholder="Item description"
          value={this.state.description}
          onChange={this.handleNameChange}
        />
      </main>
    );
  }
}

const styles = (theme: Theme) => ({
  main: {padding: theme.spacing(4)},
});

export default withStyles(styles)(withRouter(DetailsPage));
