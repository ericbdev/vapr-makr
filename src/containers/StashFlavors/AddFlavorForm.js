import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { showNotification, hideNotification } from '../../components/Notification/actions';

import { manufacturers } from '../../utils';
import { queries, mutations } from '../../gql';

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

class AddFlavorForm extends Component {
  static propTypes = {
    onFlavourSubmit: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      flavorManufacturer: '',
      flavorName: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const { flavorManufacturer, flavorName } = this.state;

    if (flavorManufacturer === '' || flavorName === '') {
      // TODO: Error message
      return;
    }

    /*
    TODO: Add in optimistic response
      optimisticResponse: {
        addFlavor: {
          __typename: 'Flavor',
          name: flavorName,
          id: Math.round(Math.random() * -1000000),
          manufacturer: {
            __typename: 'Manufacturer',
            id: Math.round(Math.random() * -1000000),
            shortName: '',
            longName: '',
            manufacturerId: flavorManufacturer,
          }
        },
      },
    */

    this.props.dispatch(hideNotification());

    this.props.mutate({
      variables: {
        flavor: {
          name: flavorName,
          manufacturerId: flavorManufacturer,
        }
      },
      update: (store, { data: { addFlavor } }) => {
        // Read the data from the cache for this query.
        const data = store.readQuery({ query: queries.flavorListQuery });
        // Add our channel from the mutation to the end.
        data.allFlavors.push(addFlavor);
        // Write the data back to the cache.
        store.writeQuery({
          query: queries.flavorListQuery,
          data,
        });

        const message = `Added: ${addFlavor.name} (${addFlavor.manufacturer.shortName})`;

        this.props.dispatch(showNotification({message}));
      },
      //refetchQueries: [{ query: queries.flavorListQuery }],
    }).then( () => {
      this.setState({
        flavorName: '',
        flavorManufacturer: '',
      });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography type="title" gutterBottom>
          Add a flavor
        </Typography>

        {/* TODO: https://material-ui-next.com/demos/autocomplete/ */}
        <form className={classes.formContainer} noValidate autoComplete="off">
          <TextField
            label="Flavor name"
            className={classes.textField}
            name="flavorName"
            value={this.state.flavorName}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            onChange={this.handleChange('flavorName')}
          />
          <TextField
            select
            label="Manufacturer"
            name="flavorManufacturer"
            className={classes.textField}
            value={this.state.flavorManufacturer}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            onChange={this.handleChange('flavorManufacturer')}
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
            Add Flavor
          </Button>
        </form>
      </Paper>
    );
  }
}

export default compose(
  connect(),
  withStyles(styles, {
    name: 'AddFlavorForm',
  }),
  graphql(mutations.addFlavorMutation, {
    options: { pollInterval: 5000 },
  }),
)(AddFlavorForm);