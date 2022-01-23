import { Component } from "react";
import MuiList from "@material-ui/core/List";
import ListItem from "./ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Item} from '../types/items';
class List extends Component<{ items: Item[] }> {
  render() {
    const { items } = this.props;
    let itemList: JSX.Element[] = []
    items.forEach(item => {
      itemList.push(<ListItem key={`list-item-${item.id}`} id={item.id} name={item.id} />)
    })

    return (
      <MuiList
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            List
          </ListSubheader>
        }
      >
        {itemList}
      </MuiList>
    );
  }
}

export default List;
