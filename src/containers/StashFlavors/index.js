import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import { getFlavours, manufacturers } from '../../utils';
import FlavorTableHeader from './FlavorTableHeader';
import AddFlavorForm from './AddFlavorForm';

import { addFlavor } from './actions';

const styles = theme => ({
  table: {
    width: '100%',
  },
  tableWrapper: {
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  }
});

class StashFlavors extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'flavor',
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
    const { classes, handleFlavorSubmit, flavors } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const pagination = {
      start: (page * rowsPerPage),
      end: (page * rowsPerPage) + rowsPerPage,
    };

    return (
      <div>
        <AddFlavorForm onFlavourSubmit={handleFlavorSubmit} />

        <Divider/>

        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <FlavorTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />

            <TableBody>
              {
                flavors.slice(pagination.start, pagination.end).map(n => {
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <TableCell padding="none">{n.flavor}</TableCell>
                      <TableCell>{manufacturers.getManufacturerName(n.manufacturer)}</TableCell>
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    flavors: getFlavours()
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFlavorSubmit: data => dispatch(addFlavor(data))
  }
};

export default compose(
  withStyles(styles, {
    name: 'StashFlavors',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(StashFlavors);
