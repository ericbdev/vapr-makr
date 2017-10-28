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
    path: '/recipes',
  },
  stash: {
    title: 'Stash',
    children: {
      flavours: {
        title: 'Flavours',
        path: '/stash/flavours',
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
