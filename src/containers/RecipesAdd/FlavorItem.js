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
    percentAdornment: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      flavor: '',
      index: 0,
    };
  }

  handleChange(newState) {
    this.setState(newState);
    this.props.handleFlavorChange(newState);
  }

  handlePercentChange = (event) => {
    const max = 100;
    const min = 0;

    const valueBase = parseInt(event.target.value, 10);
    const value = isNaN(valueBase) ? 0 : Math.min(Math.max(valueBase, min), max );

    this.handleChange({
      ...this.state,
      percent: value,
    });
  };
  
  handleFlavorChange = (event) => {
    const value = event.target.value;
    const newState = {
      ...this.state,
      flavor: value,
    };

    this.setState(newState);
    this.props.handleFlavorChange(newState);
  };

  setFlavor(props) {
    const { flavorItem, index } = props;

    this.setState({
      percent: flavorItem.get('percent'),
      flavor: flavorItem.get('flavor'),
      index,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setFlavor(nextProps);
  }

  componentWillMount() {
    this.setFlavor(this.props);
  }

  render() {
    const { classes, className, allFlavors, percentAdornment } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <TextField
              label="Add a flavor"
              name={`flavor_${this.state.index}`}
              value={this.state.flavor}
              onChange={this.handleFlavorChange}
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
              label="Percent"
              name={`percent_${this.state.index}`}
              value={this.state.percent}
              onChange={this.handlePercentChange}
              InputProps = {{
                endAdornment: percentAdornment,
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