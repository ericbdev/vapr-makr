import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  'menuItem': {
    height: 20,
    fontSize: theme.typography.fontSize,
    lineHeight: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  }
});

class FlavorItem extends Component {
  static propTypes = {
    handleFlavorChange: PropTypes.func.isRequired,
    flavorItem: PropTypes.object.isRequired,
    allFlavors: PropTypes.array.isRequired,
    percentageAdornment: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      flavor: '',
      key: 0,
    };
  }

  handleChange = name => event => {
    const newState = {
      ...this.state,
      [name]: event.target.value
    };

    this.setState(newState);
    this.props.handleFlavorChange(newState);
  };

  componentWillMount() {
    const flavorItem = this.props.flavorItem;

    this.setState({
      amount: flavorItem.get('amount'),
      flavor: flavorItem.get('flavor'),
      key: flavorItem.get('key'),
    });
  }

  render() {
    const { classes, className, allFlavors, percentageAdornment } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <TextField
              label="Add a flavor"
              name={`flavor_${this.state.key}`}
              value={this.state.flavor}
              onChange={this.handleChange('flavor')}
              InputLabelProps={{
                shrink: !!this.state.flavor,
              }}
              margin="normal"
              select
              className={className}
            >
              {
                allFlavors.map(flavor => (
                  <MenuItem
                    key={flavor.id}
                    value={flavor.id}
                    className={classes.menuItem}
                  >
                    {flavor.name} ({flavor.manufacturer.shortName})
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Percentage"
              name={`amount_${this.state.key}`}
              value={this.state.amount}
              onChange={this.handleChange('amount')}
              InputProps = {{
                endAdornment: percentageAdornment,
                type: 'number',
                fullWidth: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              required
              className={className}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FlavorItem);