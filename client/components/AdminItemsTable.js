import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import { connect } from 'react-redux';
import { destroyItem, fetchItems } from '../store/allItems';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

class AdminItemsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      previous: {},
    };
    this.onToggleEditMode = this.onToggleEditMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRevert = this.onRevert.bind(this);
  }
  componentDidMount() {
    this.props.getItems(0);
    let initRows = this.props.state.allItems.catalog;
    console.log(initRows);
    this.setState({
      rows: initRows,
    });
    console.log(this.state);
  }
  onToggleEditMode(id) {
    this.setState((state) => {
      return {
        rows: state.rows.map((row) => {
          if (row.id === id) {
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        }),
      };
    });
  }

  onChange(e, row) {
    if (!this.state.previous[row.id]) {
      this.setState((state) => {
        return {
          previous: { ...state, [row.id]: row },
        };
      });
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = this.state.rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    this.setState({
      rows: newRows,
    });
  }

  onRevert(id) {
    const newRows = this.state.rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    this.setState({
      rows: newRows,
    });
    this.setState((state) => {
      delete state.previous[id];
      return {
        previous: state.previous,
      };
    });
    this.onToggleEditMode(id);
  }

  render() {
    return (
      <Paper>
        <Table aria-label="caption table">
          <caption>Edit Items here</caption>
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Item</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => this.onToggleEditMode(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => this.onRevert(row.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="left">
                  {row.isEditMode ? (
                    <Input
                      value={row.name}
                      name={row.name}
                      onChange={(e) => this.onChange(e, row)}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell align="left">
                  {row.isEditMode ? (
                    <Input
                      value={row.category}
                      name={row.category}
                      onChange={(e) => this.onChange(e, row)}
                    />
                  ) : (
                    row.category
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: (index) => dispatch(fetchItems(index)),
    destroyItem: (id) => dispatch(destroyItem(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminItemsTable);
