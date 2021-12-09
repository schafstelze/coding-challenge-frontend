import { Component } from "react";
import MuiList from "@material-ui/core/List";
import ListItem from "./ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Todo } from "../types";
import { Pagination } from "@mui/material";

type Props = {
  items: Todo[];
};
class List extends Component<Props, { currentPage: number }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  render() {
    const { items } = this.props;

    const totalNumberOfPages = Math.ceil(items.length / 3);
    const currentItems = items.slice(
      (this.state.currentPage - 1) * 3,
      this.state.currentPage * 3
    );

    let itemList: JSX.Element[] = [];
    currentItems.forEach(item => {
      itemList.push(<ListItem key={item.id} {...item} />);
    });

    return (
      <>
        <MuiList
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Todo List
            </ListSubheader>
          }
        >
          {itemList}
        </MuiList>
        <Pagination
          count={totalNumberOfPages}
          onChange={(_e, page) => this.setState({ currentPage: page })}
        ></Pagination>
      </>
    );
  }
}

export default List;
