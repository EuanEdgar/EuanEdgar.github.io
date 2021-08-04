I had some downtime at work recently and decided to try and tackle an idea I'd had for some time. The plan was to create a site where I could put any of the random JavaScript projects I wanted to work on, without worrying about hosting or setting up a build pipeline, and without having to deal with too much boilerplate.

# The problem
How do you host a Vue sub-site site that doesn't know it isn't the top-level site?  
When I set out, I didn't know, but I did suspect that I would have to make at least some concessions. Firstly, I knew I would have to have some kind of manifest file for the sub-sites that would handle importing the various component parts that are needed to render a site. Secondly, I knew I would encounter some issues with the way many Vue extensions (Including the Vue Router and Vuex data store) interact with the Vue prototype.

# Getting started
I knew from the outset that I wanted to use Vue, and that I wanted to figure out how to host it on [GitHub Pages](https://pages.github.com/). I was already pretty competent with Vue I thought I'd start with the part I had no experience with: GitHub Pages.

Now, to say that I had no experience isn't quite right. I'd tried it before but I could never get it quite right. Probably I was doing something so obviously wrong that I would be able to spot the problem quite quickly now, but I've got a lot more experience following documentation and troubleshooting this sort of issue than I had back then. Nonetheless I was expecting this part to be a slog through multiple pages of disparate documentation into the bowels of both Git and GitHub.

It wasn't.

Much to my surprise, I created my repo, pushed some files, toggled some switches in the repo settings, and my test site (A classic HelloWorld) came visible almost immediately!

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Hello, World!</title>
  </head>
  <body>
    <!-- Nothing quite like the classics -->
    Hello, World!
  </body>
</html>
```

Once I knew that worked, I just had the simple task of getting Vue set up and I was ready to start coding.

# Automating deployments
...Almost. The thing about GitHub Pages is that it only serves files. It can't perform any compilation steps. And you need that if you're going to use something like Vue.

Now, there are several ways of using Git and GitHub to compile files. The most obvious one is to use a pre-commit hook (Made easy with node packages such as [pre-commit](https://www.npmjs.com/package/pre-commit), and built into projects created with [@vue/cli](https://www.npmjs.com/package/@vue/cli)) to compile the code on commit.

There are a few problems with this.  
1. If you make chances across multiple branches it's easy to get into a situation where all your branches conflict with the base branch and you have to sort them all out in the command line.
1. Pre-commit hooks can be bypassed with `git commit -n` so you can't guarantee that the hook will be run for every change, especially if you're working with multiple people.
1. It relies on the author having their local environment set up correctly to build the project.

So we move onto my preferred method for managing compiled files in Git...

## [GitHub Actions!](https://github.com/features/actions)
GitHub actions is a feature I've played around with a fair amount in the last year or so, across multiple different JavaScript projects. In that time I've learned that they are a powerful tool to have, but quite poorly documented and difficult to test.  
Fortunately, since I have only really used it for this kind of process so far, mostly I can just lean on past successes.

What I ended up with is a simple workflow that waits for commits to the `master` branch, pulls them down and builds them, and commits them back up on the `site` branch. As you can see from the [history](https://github.com/EuanEdgar/euanedgar.github.io/commits/master/.github/workflows/build.yml) I spent quite some time trying to get Git to commit the `dist` folder directly to the `site` branch but, between conflicts and one self-imposed nuking of the repo, I settled for the builtin behaviour of serving my GitHub Pages site from the `docs` folder.

# Building the Core
Okay. I'm in a good place, with all the basic Vue and Webpack boilerplate set up, and automated deployments all taken care of. Next I need to figure out how I'm going to pull off this whole "Sites within sites" concept.

## Dynamic Routing
I decided to start by figuring out how to dynamically register routes. I knew that the Vue Router defines an [`addRoute`](https://next.router.vuejs.org/guide/advanced/dynamic-routing.html) method, and the demo app that comes with a fresh `vue create` teaches how to combine this with [Webpack Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports), so it seemed like that would be a good route to take.

I had already determined that each site would have some kind of index file that the main site would have to import so I thought it made sense to define some kind of `registerSite` function that they could call to set up all their routes, and perform any other setup they might need.

This is approximately what I ended up with for this first design.

```js
import router from '@/router';

const registerSite = (config) => {
  const {
    name: namespace,
    path: rootPath,
    routes,
  } = config;

  router.addRoute({
    path: rootPath,
    component: { render: (c) => c('router-view') },
    children: routes.map(({ path, name, ...routeConfig }) => ({
      path: path.startsWith('/') ? path.slice(1) : path,
      name: `${namespace}-${name}`
      ...routeConfig,
    })),
  });
};

export default registerSite;
```

Note the way I tried to dynamically namespace the route name. My plan initially was to allow the sites to be able to define any named routes they wanted and to create some Vue Router middleware that could handle resolving non-namespaced routes to these generated names. The idea was that two different sites could each register the `'Home'` route name and there would be no problems.

Ultimately I had to surrender on this front. There were too many problems introduced by people directly visiting pages, linking to pages in sub-sites from the main site, and similar things that would be important to have. In the end I resigned myself to defining routes in my sub-sites with a builtin namespace - `'Blog-Home'` for instance.

The following is more or less the final product at this stage.

```js
import router from '@/router';

const registerSite = (config) => {
  const {
    path: rootPath,
    routes,
  } = config;

  router.addRoute({
    path: rootPath,
    component: { render: (c) => c('router-view') },
    children: routes.map(({ path, ...routeConfig }) => ({
      path: path.startsWith('/') ? path.slice(1) : path,
      ...routeConfig,
    })),
  });
};

export default registerSite;
```

Sites would register themselves with the main site by running something along the lines of this code.

```js
import registerSite from '@/utils/registerSite';

registerSite({
  name: 'Namespace',
  path: '/namespace',
  routes: [
    {
      path: '',
      name: 'Namespace-Home',
      component: () => import('@/sites/namespace/views/Home'),
    },
    {
      path: '/something',
      name: 'Namepace-Something',
      component: () => import('@/sites/namespace/views/Something'),
    },
  ],
});
```

## Dynamic Store Modules
One of the first things that caught my eye when poking around Vuex was the idea of modules. A super simple means of segmenting all the data storage and asynchronous action needs of an application into logically distinct boxes. And the existence of `store.registerModule` only fuelled my interest further - it was actually one of the reasons I originally wanted to start this project.

I also liked the fact that I'd managed to make full use of Webpack dynamic imports to almost entirely avoid loading code for sites that the user isn't visiting - the only site-relevant code that would actually be transmitted was the code that told the router what routes existed, and the code for Webpack's import of the component and associated bundle.

As such, I wanted to load the store module dynamically too. This meant I would have to expand upon the little anonymous render component in my `registerSite` method (The single line component rendering a `router-view` in the above code) to support asynchronously loading the bundle containing the store module.

The history of the repo this time is less revealing, and I can be less sure of the various steps I went through. One of the first steps was simply updating the `registerSite` method to expect to see a `store` method in its config object - this would look much like the component imports in the example usage above. I initially modified the anonymous component inline, giving it a data object and a created method, something like this.

```js
const registerSite = (config) => {
  const {
    name,
    store: getStore,
  } = config

  const moduleName = name.toLowerCase()

// ...

  {
    name: 'AnonymousRouterView',
    async  created() {
      if(getStore && !this.hasModule) {
        const module = await getStore();
        this.$store.registerModule(moduleName, module);
      }
    },
    computed: {
      hasModule() {
        return this.$store.hasModule(moduleName);
      },
    },
    render(c) {
      if(!getStore || this.hasModule) {
        return c('router-view', { key: this.$router.currentRoute.fullPath });
      } else {
        return null;
      }
    },
  },

// ...
```

This worked just fine, but something was at odds with my initial plan to have the sub-sites function pretty much as though they were standalone - to not have to consider the fact that they didn't exist in a vacuum whilst coding them. The fact that I'd have to reference the state as `$store.state.namespace.THING` and dispatch actions or commit mutations using `/namespace/ACTION_NAME` bothered me.

Eventually this lead me to explore one of the features of Vue that I've not had much cause to until now: the [provide/inject context model](https://v3.vuejs.org/guide/component-provide-inject.html).

Using this I wanted to expose an `ownStore` object to each of these sub-sites, an object that would contain all of the features common to a Vuex store, but namespaced to the site that whatever component I was looking at existed within. I won't go into any too much more detail here - I had some fun with provided values not being reactive to changes and issues with rendering my wrappers before the module they expected to be there was ready - but my final solution is split across these two portions of the repo:
- [My `registerSite` method](https://github.com/EuanEdgar/euanedgar.github.io/blob/670145536da73d4c760103520ab634a8a9a0edbd/src/utils/registerSite.js)
- [The SiteWrapper component](https://github.com/EuanEdgar/euanedgar.github.io/tree/ef4d0a5827e63bca06b8bac95605e8b5ba6b4871/src/components/SiteWrapper) (I had to separate out the anonymous component that had served my well up to now)

Sites can now reference the `$store` provided variable and use `this.$store` as normal for a Vuex install.
```js
// This component can reference this.$store as if it were referencing the top-level store
export default {
  inject: ['$store'],
}
```

If a component needs to access the root store, it can either not inject the `$store` object (And use `this.$store`), or it can inject the provided `$rootStore` object (And use `this.$rootStore`).

# Future plans
All that leads us up to where we are now. There are certainly steps in the process, intricacies of the design that I have missed, but that should serve you well as an overview.

You can find the full source code on my GitHub [here](https://github.com/EuanEdgar/euanedgar.github.io).

You may have noticed that you're viewing this on the `/blog` sub-site. I do intend to make a similar post about that - there are some features I've not discussed here which were developed purely with this blog in mind - but there are a few things I want to clean up about it before it's ready for any kind of retrospective.
