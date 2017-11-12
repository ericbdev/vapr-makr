import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import FlavourTableHeader from './FlavourTableHeader'

/*
 TODO: Make root style reusable, to apply consistently from one location
 */
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      marginTop: 48,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
  table: {
    width: 'auto',
    minWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

// TODO: Abstract out
const manufacturers = {
  1: 'Capella',
  2: 'The Perfumers/Flavour Apprentice',
  3: 'Flavour West',
};

/**
 * Map a manufacturer id to a string
 * @param id
 * @returns {*}
 */
function mapManufacturer(id) {
  return manufacturers[id];
}

// TODO: Abstract information here once in working prototype
let counter = 0;
function createData(flavour, manufacturer) {
  counter += 1;
  return { id: counter, flavour, manufacturer };
}

const flavours = [
  createData('Acai Berry', 2),
  createData('Apple Pie', 1),
  createData('Bavarian Cream', 1),
  createData('Berry (Crunch) Cereal', 2),
  createData('Cake Batter Dip', 3),
  createData('Cheesecake', 2),
  createData('Crunchy (Captain) Cereal', 2),
  createData('DX Peanut Butter', 2),
  createData('DX Sweet Cream', 2),
  createData('French Vanilla II', 2),
  createData('Fruit Circles', 2),
  createData('Fruit Circles with Milk', 2),
  createData('Glazed Doughnut', 1),
  createData('Golden Butter', 1),
  createData('Graham Cracker v2', 1),
  createData('Lemon', 2),
  createData('Lemon Meringue Pie v2', 1),
  createData('Marshmallow', 3),
  createData('Strawberries and Cream', 2),
  createData('Strawberry (Ripe)', 2),
  createData('Vanilla Custard v2', 1),
  createData('Vanilla Swirl', 2)
];

class StashFlavours extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'flavour',
      data: flavours,
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <FlavourTableHeader
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
            />
              <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={n.id}
                  >
                    <TableCell padding="none">{n.flavour}</TableCell>
                    <TableCell>{mapManufacturer(n.manufacturer)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(StashFlavours);
