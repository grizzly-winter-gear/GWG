import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
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
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import { connect } from 'react-redux';
import { destroyItem, fetchAllItems, updateItem } from '../../store/allItems';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    // minWidth: 650,
    overflowY: 'auto',
  },
};

class AdminItemsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.onToggleEditMode = this.onToggleEditMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getItems();
    let initRows = this.props.state.allItems.catalog;
    this.setState({
      rows: initRows,
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.state.allItems.catalog !== this.props.state.allItems.catalog
    ) {
      this.setState({
        rows: this.props.state.allItems.catalog,
      });
    }
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
  onSubmit(id) {
    this.props.updateItem(this.state.rows.find((item) => item.id === id));
    this.onToggleEditMode(id);
  }

  render() {
    return (
      <Paper>
        <TableContainer style={{ maxHeight: 600 }}>
          <Table stickyHeader style={styles.table} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left">Item</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Stock</TableCell>
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
                          onClick={() => this.onSubmit(row.id)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="destroy"
                          onClick={() => this.props.destroyItem(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label="edit"
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
                        name={'name'}
                        onChange={(e) => this.onChange(e, row)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' ? this.onSubmit(row.id) : null
                        }
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {row.isEditMode ? (
                      <Input
                        value={row.category}
                        name={'category'}
                        onChange={(e) => this.onChange(e, row)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' ? this.onSubmit(row.id) : null
                        }
                      />
                    ) : (
                      row.category
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {row.isEditMode ? (
                      <Input
                        value={row.stock}
                        type="number"
                        name={'stock'}
                        onChange={(e) => this.onChange(e, row)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' ? this.onSubmit(row.id) : null
                        }
                      />
                    ) : (
                      row.stock
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    getItems: () => dispatch(fetchAllItems()),
    destroyItem: (id) => dispatch(destroyItem(id)),
    updateItem: (item) => dispatch(updateItem(item)),
  };
};

export default connect(mapState, mapDispatch)(AdminItemsTable);
