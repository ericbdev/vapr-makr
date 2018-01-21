import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { graphql, compose } from 'react-apollo';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';

import AppPage from '../../components/AppPage/index';
import Loading from '../../components/Loading';
import { routes } from '../../config/index';
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

class RecipesAll extends Component {
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
    };
  }

  sortRecipes(recipes) {
    const orderBy = this.state.orderBy;
    const order = this.state.order;
    let sortable = [].concat(recipes);

    return order === 'asc'
        ? sortable.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : sortable.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, data } = this.props;
    const { rowsPerPage, page } = this.state;
    const pagination = {
      start: (page * rowsPerPage),
      end: (page * rowsPerPage) + rowsPerPage,
    };

    if (data.loading) {
      return (
        <Loading />
      );
    }

    const recipes = this.sortRecipes(data.allRecipes);

    return (
      <AppPage>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {
                recipes.slice(pagination.start, pagination.end).map(recipe => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={recipe.id}
                    >
                      <TableCell padding="none">
                       <Button
                         href={routes.recipes.children.view.getPath(recipe.id)}
                         >
                          {recipe.name}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  count={recipes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </AppPage>
    )
  }
}

export default compose(
  withStyles(styles, {
    name: 'RecipesAll',
  }),
  graphql(queries.recipesListQuery),
)(RecipesAll);

