import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'react-apollo';
import { getIn, List, Map } from 'immutable';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';

import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

const styles = theme => ({
  root: {
    padding: [theme.spacing.unit * 3, 0],
  },
  row: {
    padding: [0, theme.spacing.unit * 3],
  },
  header: {
    marginBottom: theme.spacing.unit * 3,
  },
  footer: {
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  rowDivider: {
    background: theme.palette.text.lightDivider,
    height: theme.spacing.unit * 2,
    '& td': {
      padding: 0,
    },
  },
});

const Cell = (props) => {
  const { children, numeric } = props;

  return (
    <TableCell numeric={!!numeric} padding="dense">
      {children}
    </TableCell>
  );
};

class RecipePaper extends Component {
  static propTypes = {
    classes: PropTypes.object,
    recipe: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.data = null;
    this.recipe = props.recipe;
    this.setupRecipe();
  }

  safeNumber = (number) => {
    const float = parseFloat(number);
    return (isNaN(float) ? number : float.toFixed(2));
  };

  getIngredient(path = []) {
    const keyPath = [].concat(['ingredients'], path);
    return getIn(this.recipe, keyPath, null);
  }

  orderBase = () => {
    const nicStrength = this.getIngredient(['nicotine', 'strength']);

    const base = [];
    if (this.data.totals.nicotine.combined.ml !== 0) {
      base.push({
        title: `Nicotine ${nicStrength}mg`,
        ml: this.data.totals.nicotine.combined.ml,
        percent: this.data.totals.nicotine.combined.percent,
        weight: '',
      })
    }
    if (this.data.dilutions.pg.ml !== 0) {
      base.push({
        title: 'PG Dilutant',
        ml: this.data.dilutions.pg.ml,  
        percent: this.data.dilutions.pg.percent,
        weight: '',
      })
    }
    if (this.data.dilutions.vg.ml !== 0) {
      base.push({
        title: 'VG Dilutant',
        ml: this.data.dilutions.vg.ml,
        percent: this.data.dilutions.vg.percent,
        weight: '',
      })
    }

    return base;
  };

  orderRecipeItems = () => {
    const recipeItems = [];

    this.getIngredient(['recipeItems']).map((recipeItem) => {
      const flavor = recipeItem.flavor;
      const title = `${flavor.name} (${flavor.manufacturer.shortName})`;
      const percent = recipeItem.percent;
      const ml = (percent / 100) * this.getIngredient(['result', 'amount']);

      recipeItems.push({
        title,
        ml,
        percent,
        weight: '',
      })
    });

    return recipeItems;
  };

  totalsVG = () => {
    const vgRatio = this.getIngredient(['result', 'vgRatio']);
    const ml = (vgRatio / 100) * this.getIngredient(['result', 'amount']);
    
    return {
      ml,
      percent: vgRatio,
    }
  };

  totalsPG = () => {
    const pgRatio = this.getIngredient(['result', 'pgRatio']);
    const ml = (pgRatio / 100) * this.getIngredient(['result', 'amount']);

    return {
      ml,
      percent: pgRatio,
    }
  };

  totalsNicotine = () => {
    const resultAmount = this.getIngredient(['result', 'amount']);
    const resultStrength = this.getIngredient(['result', 'strength']);
    const nicStrength = this.getIngredient(['nicotine', 'strength']);

    const pgRatio = this.getIngredient(['nicotine', 'pgRatio']);
    const vgRatio = this.getIngredient(['nicotine', 'vgRatio']);

    const nicML = (resultStrength / nicStrength * resultAmount * 100)/ 100;
    const nicPercent = (nicML / resultAmount) * 100;

    const nicPG = (pgRatio / 100 ) * nicML;
    const nicVG = (vgRatio / 100 ) * nicML;

    return {
      pg: {
        ml: nicPG,
        percent: (nicPG / resultAmount) * 100,
      },
      vg: {
        ml: nicVG,
        percent: (nicVG / resultAmount) * 100,
      },
      combined: {
        ml: nicPG + nicVG,
        percent: nicPercent,
      }
    };
  };

  totalsFlavors = () => {
    const percent = this.getIngredient(['recipeItems']).reduce((total, item) => {
      return total + item.percent;
    }, 0);
    const ml = (percent / 100) * this.getIngredient(['result', 'amount']);

    // Todo: Add in VG flavor data
    return {
      pg: {
        ml,
        percent,
      },
      vg: {
        ml: 0,
        percent: 0,
      },
      combined: {
        ml,
        percent,
      }
    };
  };

  setupRecipe() {
    // Total values
    const totalsFlavors = this.totalsFlavors();
    const totalsVG = this.totalsVG();
    const totalsPG = this.totalsPG();
    const totalsNicotine = this.totalsNicotine({totalsVG, totalsPG});

    const totals = {
      vg: totalsVG,
      pg: totalsPG,
      nicotine: totalsNicotine,
      flavors: totalsFlavors,
    };

    const dilutions = {
      pg: {
        ml: totals.pg.ml - totals.nicotine.pg.ml - totals.flavors.pg.ml,
        percent: totals.pg.percent - totals.nicotine.pg.percent - totals.flavors.pg.percent,
      },
      vg: {
        ml: totals.vg.ml - totals.nicotine.vg.ml - totals.flavors.vg.ml,
        percent: totals.vg.percent - totals.nicotine.vg.percent - totals.flavors.vg.percent
      } 
    };

    const base = {
      ml: dilutions.pg.ml + dilutions.vg.ml + totals.nicotine.combined.ml,
      percent: dilutions.pg.percent + dilutions.vg.percent + totals.nicotine.combined.percent,
    };

    this.setData({
      base,
      totals,
      dilutions
    });
  }

  setData(recipe) {
    /**
     * - get flavor amount in ml and %
     * - get nic amount in vg or pg, then in ml and %
     * - get dilution of pg and vg
     */
    this.data = {...this.data, ...recipe};
  }

  componentWillReceiveProps(nextProps) {
    this.recipe = nextProps.recipe;
    this.setupRecipe(); 
  }

  render() {
    const { classes } = this.props;
    const recipeName = this.recipe.get('name');
    const base = this.orderBase();
    const recipeItems = this.orderRecipeItems();

    return (
      <Paper className={classes.root}>
        <article>
          { recipeName !== ''
            ?
            <header className={classNames([classes.header, classes.row])}>
              <Typography type="headline">
                { recipeName }
              </Typography>
            </header>
            : null
          }

          <div className={classNames(classes.tableWrapper)}>
            <Table>
              <TableHead>
                <TableRow>
                  <Cell>Ingredient</Cell>
                  <Cell numeric>ml</Cell>
                  <Cell numeric>%</Cell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  base.map((row, index) => (
                    <TableRow key={index}>
                      <Cell>{row.title}</Cell>
                      <Cell numeric>{this.safeNumber(row.ml)}</Cell>
                      <Cell numeric>{this.safeNumber(row.percent)}</Cell>
                    </TableRow>
                  ))
                }

                <TableRow className={classes.rowDivider}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>

                {
                  recipeItems.map((row, index) => (
                    <TableRow key={index}>
                      <Cell>{row.title}</Cell>
                      <Cell numeric>{this.safeNumber(row.ml)}</Cell>
                      <Cell numeric>{this.safeNumber(row.percent)}</Cell>
                    </TableRow>
                  ))
                }

                <TableRow className={classes.rowDivider}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>

                <TableRow>
                  <Cell>Total base</Cell>
                  <Cell numeric>{this.safeNumber(this.data.base.ml)}</Cell>
                  <Cell numeric>{this.safeNumber(this.data.base.percent)}</Cell>
                </TableRow>

                <TableRow>
                  <Cell>Total flavors</Cell>
                  <Cell numeric>
                    {this.safeNumber(this.data.totals.flavors.combined.ml)}
                  </Cell>
                  <Cell numeric>
                    {this.safeNumber(this.data.totals.flavors.combined.percent)}
                  </Cell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Divider/>

          <Grid
            className={classNames([classes.footer, classes.row])}
            component="footer"
            container
            spacing={8}
          >
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item>
                  Amount to make:
                </Grid>
                <Grid item>
                  {this.getIngredient(['result', 'amount'])}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item>
                  Resulting strength:
                </Grid>
                <Grid item>
                  {this.getIngredient(['result', 'strength'])}mg
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item>
                  Resulting ratio (PG/VG):
                </Grid>
                <Grid item>
                  {[
                    this.getIngredient(['result', 'pgRatio']),
                    this.getIngredient(['result', 'vgRatio']),
                  ].join(' / ')}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </article>
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'RecipePaper',
  }),
)(RecipePaper);
