import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { manufacturers } from '../../../utils/';

const styles = theme => ({
  root: {
    padding: [theme.spacing.unit, theme.spacing.unit * 2],
    marginBottom: theme.spacing.unit * 2,
  },
  formContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    margin: [theme.spacing.unit, -1 * theme.spacing.unit * 2],
  },
  textField: {
    width: 200,
    flexGrow: 1,
    margin: [theme.spacing.unit, theme.spacing.unit * 2, 0],
  },
  button: {
    margin: [theme.spacing.unit, theme.spacing.unit * 2, 0],
  },
});

class AddFlavourForm extends Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);

    this.state = {
      flavourManufacturer: '',
      flavourName: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const {flavourManufacturer, flavourName} = this.state;
    console.log({flavourManufacturer, flavourName})
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography type="title" gutterBottom>
          Add a flavour
        </Typography>

        {/* TODO: https://material-ui-next.com/demos/autocomplete/ */}
        <form className={classes.formContainer} noValidate autoComplete="off">
          <TextField label="Flavour name"
            className={classes.textField}
            name="flavour_name"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            onChange={this.handleChange('flavourName')}
          />
          <TextField select
            label="Manufacturer"
            name="flavour_manufacturer"
            className={classes.textField}
            value={this.state.flavourManufacturer}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            onChange={this.handleChange('flavourManufacturer')}
          >
            {manufacturers.manufacturerList.map(manufacturer => (
              <MenuItem key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.longName}
              </MenuItem>
            ))}
          </TextField>
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={this.handleSubmit}
          >
            Add Flavour
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(AddFlavourForm);
