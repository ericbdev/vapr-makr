import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import AppPage from '../../components/AppPage/index';
import Loading from '../../components/Loading';
import RecipePaper from '../../components/RecipePaper';

import { recipes } from '../../utils';
import { queries } from '../../gql';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

class RecipesAdd extends Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      singleRecipe: PropTypes.object
    }),
  };

  render() {
    const { classes, data } = this.props;

    if (data.loading) {
      return (
        <Loading />
      );
    }

    return (
      <AppPage>
        <Grid item xs={12}>
          <div className={classes.root}>
            <RecipePaper recipe={recipes.shapeRecipe(data.singleRecipe)} />
          </div>
        </Grid>
      </AppPage>
    );
  }
}

export default compose(
  graphql(queries.recipesViewQuery, {
    options: (props) => ({
      variables: {
        recipeId: props.match.params.id,
      },
    }),
  }),
  withStyles(styles, {
    name: 'RecipesView',
  }),
)(RecipesAdd);
