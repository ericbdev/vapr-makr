let counter = 0;
function createData(flavor, manufacturer) {
  counter += 1;
  return { id: counter, flavor, manufacturer };
}

const flavorsList = [
  createData('Acai Berry', 2),
  createData('Apple Pie', 1),
  createData('Bavarian Cream', 1),
  createData('Berry (Crunch) Cereal', 2),
  createData('Cake Batter Dip', 3),
  createData('Cheesecake', 2),
  createData('Crunchy (Captain) Cereal', 2),
  createData('DX Peanut Butter', 2),
  createData('DX Sweet Cream', 2),
  createData('French Vanilla II', 2),
  createData('Fruit Circles', 2),
  createData('Fruit Circles with Milk', 2),
  createData('Glazed Doughnut', 1),
  createData('Golden Butter', 1),
  createData('Graham Cracker v2', 1),
  createData('Lemon', 2),
  createData('Lemon Meringue Pie v2', 1),
  createData('Marshmallow', 3),
  createData('Strawberries and Cream', 2),
  createData('Strawberry (Ripe)', 2),
  createData('Vanilla Custard v2', 1),
  createData('Vanilla Swirl', 2),
];

function getFlavours() {
  return flavorsList;
}

export {
  getFlavours,
};
