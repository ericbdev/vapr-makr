const routes = {
  home: {
    title: 'Home',
    path: '/',
  },
  recipes: {
    title: 'Recipes',
    children: {
      add: {
        title: 'Add recipe',
        path: '/recipes/add',
      },
      all: {
        title: 'All recipes',
        path: '/recipes/all',
      },
      view: {
        title: 'View recipes',
        path: '/recipes/view/:id',
        getPath: (id) => {
          return routes.recipes.children.view.path.replace(':id', id);
        },
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
