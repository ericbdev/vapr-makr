import React, { Component } from 'react';
import { compose } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { InputAdornment } from 'material-ui/Input';

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
    margin: [theme.spacing.unit, 0],
  }
 });

class RecipesAdd extends Component {
  constructor(props) {
    super(props);
  }

  getAdornment(string) {
    return (<InputAdornment position="end">{string}</InputAdornment>);
  }

  render() {
    const { classes } = this.props;

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

              <Grid item xs={12}>
                <Divider className={classes.divider}/>
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Amount to make"
                  className={classes.textField}
                  InputProps = {{
                    endAdornment: this.getAdornment('ml'),
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
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
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
