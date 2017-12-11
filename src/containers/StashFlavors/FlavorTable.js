import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { graphql, compose } from 'react-apollo';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';

import Loading from '../../components/Loading';
import FlavorTableHeader from './FlavorTableHeader';
import { queries } from '../../gql';

const styles = theme => ({
  table: {
    width: '100%',
  },
  tableWrapper: {
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  }
});

class FlavorTable extends Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'name',
      page: 0,
      rowsPerPage: 10,
      sortedFlavors: null,
    };
  }

  sortFlavors(flavors) {
    const orderBy = this.state.orderBy;
    const order = this.state.order;
    let sortable = [].concat(flavors);

    if (orderBy === 'name') {
      return order === 'asc'
        ? sortable.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : sortable.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    }

    //TODO: When sorting by manufacturer, sort flavor names too...
    if (orderBy === 'manufacturer') {
     return order === 'asc'
        ? sortable.sort((a, b) => (b[orderBy].longName < a[orderBy].longName ? -1 : 1))
        : sortable.sort((a, b) => (a[orderBy].longName < b[orderBy].longName ? -1 : 1));
    }

    return sortable;
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, data } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const pagination = {
      start: (page * rowsPerPage),
      end: (page * rowsPerPage) + rowsPerPage,
    };

    if (data.loading) {
      return (
        <Loading />
      );
    }

    const flavors = this.sortFlavors(data.allFlavors);

    return (
      <div className={classes.tableWrapper}>

        <Table className={classes.table}>
          <FlavorTableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />

          <TableBody>
            {
              flavors.slice(pagination.start, pagination.end).map(flavor => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={flavor.id}
                  >
                    <TableCell padding="none">{flavor.name}</TableCell>
                    <TableCell>{flavor.manufacturer.longName}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                count={flavors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'FlavorTable',
  }),
  graphql(queries.flavorListQuery),
)(FlavorTable);
