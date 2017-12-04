const routes = {
  home: {
    title: 'Home',
    path: '/',
  },
  calculator: {
    title: 'Calculator',
    path: '/calculator',
  },
  recipes: {
    title: 'Recipes',
    children: {
      add: {
        title: 'Add recipe',
        path: '/recipes/flavors',
      },
      all: {
        title: 'All recipes',
        path: '/recipes/bases',
      },
      view: {
        title: 'View recipes',
        path: '/recipes/view/:id',
      },
    },
  },
  stash: {
    title: 'Stash',
    children: {
      flavors: {
        title: 'Flavors',
        path: '/stash/flavors',
      },
      bases: {
        title: 'Bases',
        path: '/stash/bases',
      },
      juices: {
        title: 'Juices',
        path: '/stash/juices',
      },
    },
  },
};

export default routes;
