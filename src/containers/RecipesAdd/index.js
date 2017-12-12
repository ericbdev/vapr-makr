import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIn, List, Map } from 'immutable';
import { graphql, compose } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { InputAdornment } from 'material-ui/Input';

import Loading from '../../components/Loading';
import { queries } from '../../gql';
import FlavorItem from './FlavorItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  paper: {
    padding: [theme.spacing.unit, theme.spacing.unit * 2],
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

    this.state = {
      recipe: Map({
        name: '',
        ingredients: Map({
          end: Map({
            amount: 0,
            strength: 0,
            pgRatio: 25,
            vgRatio: 75,
          }),
          nicotine: Map({
            strength: 0,
            pgRatio: 25,
            vgRatio: 75,
          }),
          flavors: List([
            this.createFlavor(0),
          ]),
        }),
      }),
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

  setFlavorList(newFlavors) {
    this.setState({
      recipe: this.state.recipe.setIn(['ingredients', 'flavors'], newFlavors)
    })
  }

  getFlavorList() {
    return getIn(this.state.recipe, ['ingredients', 'flavors']);
  }

  createFlavor(key) {
    return Map({
      amount: 0,
      flavor: '',
      key
    });
  }
  
  createEmptyFlavor() {
    const newKey = this.getFlavorList().last().get('key') + 1;

    return this.createFlavor(newKey);
  }

  handleFlavorChange = (flavorItem) => {
    const { amount, flavor, key } = flavorItem;

    const initialFlavor = this.getFlavorList()
      .find((item) => item.get('key') === key);
    const newFlavor = initialFlavor
      .update('amount', () => amount)
      .update('flavor', () => flavor);

    const newFlavors = this.getFlavorList().set(key, newFlavor);
    this.setFlavorList(newFlavors);
  };

  handleAdditionalFlavor() {
    const newFlavors = this.getFlavorList().push(this.createEmptyFlavor());
    this.setFlavorList(newFlavors);
  }

  handleChange = (target) => (event) => {
    const setTarget = [].concat(target);

    this.applyChange(setTarget, event.target.value);
  };

  handleEndRatio = (event) => {
    const max = 100;
    const min = 0;
    const field = event.target.name;
    // Sanitize value. Must be a number, bust be between 0 and 100
    const valueBase = parseInt(event.target.value, 10);
    const value = isNaN(valueBase) ? 0 : Math.min(Math.max(valueBase, min), max );
    const altField = (field === 'vgRatio' ? 'pgRatio' : 'vgRatio');
    const altValue = max - value;

    const endValues = this.getIngredient('end')
        .update(field, () => value)
        .update(altField, () => altValue);

    this.applyChange(['ingredients', 'end'], endValues);
  };

  getIngredient(keyA, keyB = null) {
    let keyPath = ['ingredients', keyA];
    if (keyB) {
      keyPath.push(keyB);
    }

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
        <Typography type="title" gutterBottom>
          Add a recipe
        </Typography>

        <form noValidate autoComplete="off">
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  label="Recipe name"
                  name="name"
                  value={this.state.recipe.get('name')}
                  onChange={this.handleChange(['name'])}
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
                  End product
                </Typography>
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Amount to make"
                  name="amount"
                  value={this.getIngredient('end', 'amount')}
                  onChange={this.handleChange(['ingredients', 'end', 'amount'])}
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
                  value={this.getIngredient('end', 'strength')}
                  onChange={this.handleChange(['ingredients', 'end', 'strength'])}
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
                  label="VG Level"
                  name="vgRatio"
                  value={this.getIngredient('end', 'vgRatio')}
                  onChange={this.handleEndRatio}
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
                  label="PG Level"
                  name="pgRatio"
                  value={this.getIngredient('end', 'pgRatio')}
                  onChange={this.handleEndRatio}
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
                  value={this.getIngredient('nicotine', 'strength')}
                  onChange={this.handleChange(['ingredients', 'nicotine', 'strength'])}
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
                this.getFlavorList().map((flavor) => (
                  <FlavorItem
                    key={flavor.get('key')}
                    allFlavors={allFlavors}
                    flavorItem={flavor}
                    className={classes.textField}
                    percentageAdornment={this.getAdornment('%')}
                    handleFlavorChange={this.handleFlavorChange}
                  />
                ))
              }

              <Grid item xs={12}>
                <Button raised onClick={() => this.handleAdditionalFlavor()}>
                  Add Flavor
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
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
