import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';

import Loading from '../../components/Loading';
import FlavorTableHeader from './FlavorTableHeader';

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

const flavorListQuery = gql`
  query FlavorListQuery {
    allFlavors {
      id
      name,
      manufacturer {
        id
        shortName
        longName
      }
    }
  }
 `;

class FlavorTable extends Component {
  static propTypes = {
    classes: PropTypes.object,
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
    const { classes, data } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const pagination = {
      start: (page * rowsPerPage),
      end: (page * rowsPerPage) + rowsPerPage,
    };
    
    const flavors = data.allFlavors;

    console.log(data);

    if (data.loading) {
      return (
        <Loading />
      );
    }

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
                  <TableRow hover tabIndex={-1} key={flavor.id}>
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

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFlavorSubmit: data => dispatch(addFlavor(data))
  }
};

export default compose(
  withStyles(styles, {
    name: 'FlavorTable',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(flavorListQuery),
)(FlavorTable);
