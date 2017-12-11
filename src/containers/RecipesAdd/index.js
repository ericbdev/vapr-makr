import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
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

/*
  Recipe name
  Steep time
    - range slider

  ---

  amount to make [ml]
    - masked field
  desired nicotine strength [mg]
    - masked field
  PG [%]
    - masked field
  VG [%]    - [√]max vg 
    - masked field
    - Add button to side which sets 100% VG

  ---

  Nicotine strength [mg]
  Nicotine VG [%]
  Nicotine PG [%]

  ---

  Flavors
  - Flavor = [%]
  - is pg / is vg / other
*/

//TODO: When editing, use two column display at LG
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
      data: Map({
        recipeName: '',
        ingredients: Map({
          end: {
            amount: 0,
            nicStrength: 0,
            pgRatio: 0,
            vgRatio: 0,
          },
          nicotine: {
            strength: 0,
            type: 'vg',
          },
          flavors: List([
            this.createFlavor(0),
          ]),
        }),
      }),
    };

    this.handleFlavorChange = this.handleFlavorChange.bind(this);
  }

  getAdornment(string) {
    return (<InputAdornment position="end">{string}</InputAdornment>);
  }
  
  setFlavorList(newFlavors) {
    this.setState({
      data: this.state.data.setIn(['ingredients', 'flavors'], newFlavors)
    })
  }

  getFlavorList() {
    return this.state.data.get('ingredients').get('flavors');
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

  handleFlavorChange(flavorItem) {
    const { amount, flavor, key } = flavorItem;

    const initialFlavor = this.getFlavorList()
      .find((item) => item.get('key') === key);
    const newFlavor = initialFlavor
      .update('amount', () => amount)
      .update('flavor', () => flavor);

    const newFlavors = this.getFlavorList().set(key, newFlavor);
    this.setFlavorList(newFlavors);
  }

  handleAdditionalFlavor() {
    const newFlavors = this.getFlavorList().push(this.createEmptyFlavor());
    this.setFlavorList(newFlavors);
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
                  label="Nicotine strength"
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
                  label="VG"
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

              <Grid item xs={6} md={3}>
                <TextField
                  label="PG"
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

            <Divider className={classes.divider}/>

            <Grid container>
              <Grid item xs={12}>
                <Typography type="subheading" gutterBottom>
                  Nicotine information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                Stength + PG / VG / Other
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
