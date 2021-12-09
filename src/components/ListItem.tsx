import React from "react";
import { Link } from "react-router-dom";
import MuiListItem from "@material-ui/core/ListItem";
import { Todo } from "../types";
import { makeStyles, Theme } from "@material-ui/core";
const ListItem: React.FC<Todo> = ({ description, id, name }) => {
  const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "Roboto, sans-serif",
    },
    name: {
      margin: "10px 0",
    },
    description: {
      color: "#aaa",
      margin: 0,
    },
  }));
  const styles = useStyles();

  return (
    <Link to={`/details/${id}`}>
      <MuiListItem button divider>
        <div className={styles.wrapper}>
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </MuiListItem>
    </Link>
  );
};

export default ListItem;
