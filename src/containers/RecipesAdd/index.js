import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'immutable';
import { graphql, compose } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { InputAdornment } from 'material-ui/Input';

import Loading from '../../components/Loading';
import RecipePaper from '../../components/RecipePaper';

import { queries } from '../../gql';
import { recipes } from '../../utils';
import RecipeItem from './RecipeItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  header: {
    marginBottom: theme.spacing.unit * 3,
  },
  paper: {
    padding: [theme.spacing.unit, theme.spacing.unit * 2, theme.spacing.unit * 2],
  },
  textField: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  textFieldSmall: {
    width: 100,
  },
  rowOf2: {
    width: '50%',
  },
  divider: {
    margin: [theme.spacing.unit, 0, theme.spacing.unit * 2],
  }
 });

class RecipesAdd extends Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.createRecipeItem = recipes.createRecipeItem.bind(this);

    this.state = {
      recipe: recipes.shapeRecipe(),
    };
  }

  getAdornment(string) {
    return (<InputAdornment position="end">{string}</InputAdornment>);
  }

  applyChange(setTarget, value) {
    this.setState({
      recipe: this.state.recipe.setIn(setTarget, value)
    });
  }

  getRecipeItems() {
    return getIn(this.state.recipe, ['ingredients', 'recipeItems']);
  }

  handleRecipeItemChange = (RecipeItem) => {
    const { percent, flavor, index } = RecipeItem;

    const isLast = this.getRecipeItems().size === index + 1;
    const isEmpty = percent === 0;
    const shouldAdd = (flavor || !isEmpty) && isLast;
    const shouldDelete = !flavor && isEmpty && !isLast;

    const newItem = this.createRecipeItem({
      percent,
      flavor,
    });

    const newList = this.modifyRecipeItems({
      recipeItems: this.getRecipeItems().set(index, newItem),
      index,
      shouldAdd,
      shouldDelete,
    });

    this.applyChange(['ingredients', 'recipeItems'], newList)
  };

  modifyRecipeItems(options) {
    const {index, recipeItems, shouldAdd, shouldDelete} = options;
    if (shouldAdd && !shouldDelete) {
      // Should it add an empty flavor
      return recipeItems.push(this.createRecipeItem());
    } else if(shouldDelete) {
      // Should it remove the current flavor
      return recipeItems.delete(index);
    } else {
      return recipeItems;
    }
  }

  handleChange = (path, isIngredient = true) => (event) => {
    const keyPath = [].concat(path);
    if (isIngredient) {
      keyPath.unshift('ingredients');
    }

    this.applyChange(keyPath, event.target.value);
  };

  handleVGRatio = (prefix) => (event) => {
    const max = 100;
    const min = 0;
    const field = event.target.name.replace(`${prefix}_`, '');
    // Sanitize value. Must be a number, bust be between 0 and 100
    const valueBase = parseInt(event.target.value, 10);
    const value = isNaN(valueBase) ? 0 : Math.min(Math.max(valueBase, min), max );
    const altField = (field === 'vgRatio' ? 'pgRatio' : 'vgRatio');
    const altValue = max - value;

    const alternateValues = this.getIngredient(prefix)
        .update(field, () => value)
        .update(altField, () => altValue);

    this.applyChange(['ingredients', prefix], alternateValues);
  };

  getIngredient(path = []) {
    const keyPath = [].concat(['ingredients'], path);
    return getIn(this.state.recipe, keyPath, null);
  }

  render() {
    const { classes, data } = this.props;

    if (data.loading) {
      return (
        <Loading />
      );
    }

    const allFlavors = data.allFlavors;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <header className={classes.header}>
            <Typography type="title" gutterBottom>
              Add a recipe
            </Typography>
          </header>

          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  label="Recipe name"
                  name="name"
                  value={this.state.recipe.get('name')}
                  onChange={this.handleChange(['name'], false)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider}/>

            <Grid container>
              <Grid item xs={12}>
                <Typography type="subheading" gutterBottom>
                  Resulting product
                </Typography>
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Amount to make"
                  name="amount"
                  value={this.getIngredient(['result', 'amount'])}
                  onChange={this.handleChange(['result', 'amount'])}
                  className={classes.textField}
                  InputProps = {{
                    endAdornment: this.getAdornment('ml'),
                    type: 'number',
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Desired strength"
                  name="strength"
                  value={this.getIngredient(['result', 'strength'])}
                  onChange={this.handleChange(['result', 'strength'])}
                  className={classes.textField}
                  InputProps = {{
                    endAdornment: this.getAdornment('mg'),
                    type: 'number',
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="VG Ratio"
                  name="result_vgRatio"
                  value={this.getIngredient(['result', 'vgRatio'])}
                  onChange={this.handleVGRatio('result')}
                  className={classes.textField}
                  InputProps = {{
                    endAdornment: this.getAdornment('%'),
                    type: 'number',
                    max: 100,
                    min: 0,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="PG Ratio"
                  name="result_pgRatio"
                  value={this.getIngredient(['result', 'pgRatio'])}
                  onChange={this.handleVGRatio('result')}
                  className={classes.textField}
                  InputProps = {{
                    endAdornment: this.getAdornment('%'),
                    type: 'number',
                    max: 100,
                    min: 0,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider}/>

            <Grid container>
              <Grid item xs={12}>
                <Typography type="subheading" gutterBottom>
                  Nicotine information
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Nicotine strength"
                  value={this.getIngredient(['nicotine', 'strength'])}
                  onChange={this.handleChange(['nicotine', 'strength'])}
                  className={classes.textField}
                  InputProps = {{
                    endAdornment: this.getAdornment('mg'),
                    type: 'number',
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={6} md={4}>
                    <TextField
                      label="VG content"
                      name="nicotine_vgRatio"
                      value={this.getIngredient(['nicotine', 'vgRatio'])}
                      onChange={this.handleVGRatio('nicotine')}
                      className={classes.textField}
                      InputProps = {{
                        endAdornment: this.getAdornment('%'),
                        type: 'number',
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      label="PG content"
                      name="nicotine_pgRatio"
                      value={this.getIngredient(['nicotine', 'pgRatio'])}
                      onChange={this.handleVGRatio('nicotine')}
                      className={classes.textField}
                      InputProps = {{
                        endAdornment: this.getAdornment('%'),
                        type: 'number',
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider className={classes.divider}/>

            <Grid container>
              <Grid item xs={12}>
                <Typography type="subheading" gutterBottom>
                  Flavors
                </Typography>
              </Grid>
              {
                this.getRecipeItems().map((item, index) => (
                  <RecipeItem
                    key={index}
                    index={index}
                    allFlavors={allFlavors}
                    recipeItem={item}
                    className={classes.textField}
                    percentAdornment={this.getAdornment('%')}
                    handleRecipeItemChange={this.handleRecipeItemChange}
                  />
                ))
              }
            </Grid>
          </Paper>
        </form>

        <RecipePaper recipe={this.state.recipe} />
      </div>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'RecipesAdd',
  }),
  graphql(queries.flavorListQuery),
)(RecipesAdd);
