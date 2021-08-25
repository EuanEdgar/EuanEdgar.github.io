A few weeks ago I finally found the time to put together an idea I'd had knocking about for months: [A static site of static sites](post#creating-a-static-site-of-static-sites). To summarise, I wanted some place I could stick any random JS project that crossed my mind and have it go and live up there without worrying about running and paying for a server, or dealing with any kind of complex deployment process. What I ended up with is a GitHub pages site that automagically deploys whenever I commit to the repo, and which can host any number of projects, each of which is more or less ignorant of all the others.

# Why build a blog?
The blog site was actually the idea that grew into this whole multi-project undertaking. I have always found the idea of building content publishing systems fascinating. I've been able to make a couple through my job, and support at least one more. I've toyed with fancy custom page builders and that's always lead to fun and interesting problems (Especially if you try and bring drag and drop and nested components into the mix), but I've rarely been able to finish one to my satisfaction.

In the end, I think the problem was me. My ambition for these projects far outstripped the time and dedication that one person is able to commit to one project. So I stepped back. If I were building some kind of content publishing system for myself, what would I want?

# The requirements
I always knew that this was going to end up being some forgotten side project someday. When that day comes I don't want it to just disappear into the ether, but I also don't want to be paying server hosting forever. So said okay, I'll find some kind of free hosting. And I cover the decisions I made there in [the original post about this project](post#creating-a-static-site-of-static-sites).

But, that decision does have some implications for what I had access to for this sub-project. Most blogs have some kind of CMS (Content management system), ranging from simple text boxes to the aforementioned fancy page builders. The problem with these is that they generally need a server with some kind of database to be running in the background, and they cost money. I don't want to be sinking money into some throwaway side project, so that meant I'd have to build something completely **serverless**.

Okay, so I won't be building any fancy page builder. That's probably for the best, I want to be able to actually use this at some point, and if I get bogged down in building the perfect page editor then that is never happening. But I still need to be able to create edit content. Well, I'm one of those people that actually finds that markdown is more than adequate for my needs. I don't need any interactive components, and I struggle with formatting options more complex than a single header type (Should this be header 1 and then this be header 2? Do I need a parent header here? Repeat for around 10 minutes before deciding that, actually, just the one header is fine). So, I want to be able to **edit markdown**.

Now for a few quick-fire requirements:

#### Must be able to **format and highlight code**
It's... kinda what I do.

#### Must be able to **display images**
Because who doesn't like pretty pictures.

#### Should **avoid using static links**
So that I can change details of the routing or hosting later without having to update dozens of posts.

# Establishing a framework
I've believe that one of the first things you should consider when starting a project like this is what your data looks like, so that's where we'll begin as well. Obviously I want to use markdown to store the actual content, as I outlined in my requirements above. But there's more to a post than just its raw text content. It needs some amount of metadata. So I drafted a JSON structure that I though made sense:

```json
{
  "name": "Some post",
  "category": "JavaScript",
  "content": "This is some content!"
}
```

That seems fine. There is one obvious problem though: I don't want to have to try and write markdown in a JSON file with no kind of syntax highlighting. So, I need to separate the content out into its own `.md` file and pull it into the JSON in some build step.

# Indexing content
Individual post JSONs is all well and good, but I need some way of listing posts without having to link a user directly to the page. Meaning that I need some kind of index JSON that can be loaded to list out posts. This is also a requirement to make that `category` field you can see in the JSON above do anything. So the next thing to consider is what those files will look like.

Let's start with categories (Mostly because at this point it's the only one I've actually implemented at time of writing).

## What does a category need?
If I want to display a category to a user, what information do I need? Because at its most basic level a category is is a grouping of posts, it needs to have a list of posts. But, it shouldn't have the full content for all the posts it needs to display, that would end up with a huge file with a bunch of data we're not even going to show. All it needs is the name of the post, and the URL to link to (I actually use vue-router locations but for right now they serve the same purpose). So, you might end up with something like this:

```json
{
  "name": "JavaScript",
  "posts": [
    {
      "name": "Post 1",
      "location": { /* Some location */ }
    }
  ]
}
```

What you might notice is that there's no data here except what could be learned by looking at the list of posts. Name comes from the `category` field on a post, and the posts array is a filtered and stripped down version of the post itself. This means that you don't need a dedicated category JSON file to display a category. For reasons that will become apparent as we progress, most categories will end up with a JSON file, but I think it's interesting that they don't have to.

# Setting up a build process
Now that we've established requirements and our rough data structure, we can set about creating some kind of build process to translate our collection of individual posts into a variety of JSON files that can be loaded and used to render pages.

I'm not particularly proud of the build scripts I ended up with. I know they're a bit all over the place, quite fragile, and on the whole difficult to deal with. But they work. Maybe I'll take the time to come back and clean them up in the future, but more likely than not I'll leave them alone until they break or I need them to do something new.

## But how do they work?

Generally speaking, it's quite simple. There are a number of functions that load JSON files and then functions that massage the data a little, ensuring that the data that needs to be there is there in the right format, and finally an assortment of functions that save out these new files into a new directory.

That's not to say that there aren't a few aspects that are more interesting. For instance, I wanted to have the build script run automatically when compiling the site. To do that, I made a simple webpack plugin that will run a script that you give it:

```js
const runOnce = require('./runOnce');

class RunScriptPlugin {
  name = 'RunScriptPlugin'

  constructor(scriptPath) {
    if (typeof scriptPath !== 'string') {
      throw new Error(
        `${this.name} was not given a valid string script path as its first argument. Argument was \`${scriptPath}\`.`,
      );
    }
    this.scriptPath = scriptPath;

    ['run'].forEach((fnName) => { this[fnName] = this[fnName].bind(this); });
  }

  apply(compiler) {
    compiler.hooks.run.tapPromise(this.name, this.run);
    compiler.hooks.watchRun.tapPromise(
      this.name,
      runOnce(this.run, Promise.resolve(undefined)),
    );
  }

  async run() {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(this.scriptPath)();
  }
}

module.exports = RunScriptPlugin;
```

This does have some downsides. In order to avoid entering into an infinite loop when running the server for development, I had to ensure that the script was only run once when building. I think I could clean this behaviour up but I haven't been able to try out my solution just yet.

# Getting into Vue
Now begins the process of getting this data loaded in a web page, and making it look more like a fully-featured blog than just a page churning out JSON data. In terms of loading the data into the page, it's quite simple. The user visits a URL which has a post identifier in it - of the form [/blog/post/the-blog-without-a-backend](post#the-blog-without-a-backend). Vue renders a [`Post` view](https://github.com/EuanEdgar/euanedgar.github.io/blob/master/src/sites/blog/views/Post.vue) which pulls the identifier (Called a slug) out of the URL and passes it down through a [`DataLoader` component](https://github.com/EuanEdgar/euanedgar.github.io/blob/master/src/sites/blog/components/DataLoader.vue) to the [`Post` component](https://github.com/EuanEdgar/euanedgar.github.io/tree/master/src/sites/blog/components/Post).

The `DataLoader` then fetches the specified JSON file and hands it down to its slot (The `Post` component in this case). Originally it used webpack's dynamic module loading to load the JSON files. This was great for a simplicity and caching point of view, posts would even be available offline. But the caching was a little too aggressive. If a post was changed, or a new post was added (Categories are also loaded via the `DataLoader`), that post wouldn't be available until the offline cache has had a chance to refresh (This will generally be the on the second full page load).

# Working with markdown
Now that we have the data in a component we need to change something like this:

```md
This is **bold** and _italic_ text with a [link](https://google.com) and some `code`.
```
to something more like this:

This is **bold** and _italic_ text with a [link](https://google.com) and some `code`.

To do this, I need some form of markdown formatter, and I would prefer not to write my own just now - although it does sound like it might be fun. I tried out a couple of different formatters, hoping to find one that presented a simple Vue component that I could just hand over my content to and have it take care of the rest. Unfortunately, some of my requirements make that a little difficult.

- The fact that I want to **highlight code** surprisingly turned out to be difficult. Most markdown processors will happily spit code in a `<pre>` HTML tag, but not many will try and take care of highlighting that code for you (At least not by default).
- Because I want to **display images** without having to know the final location of that image (Which might well be changed by my build process), I'd have to modify the image `src` attribute in some way to convert something like `image.png` to `/path/to/image.png`.
- In a similar vein, because I want **durable links** I need some way of refering to a page without hardcoding a link. Again, I will need to modify the link `href` from some general reference (I went with `model#slug` for blog pages or `{ /* vue router location */ }` for any other pages) to an actual navigable link.

[`marked.js`](https://github.com/markedjs/marked) is what I found to have enough baseline support for what I need, and enough extensibility that I could build out my custom behaviour. Because `marked` is built for plain JS I had to create a Vue wrapper around it. This is the [`Markdown` component](https://github.com/EuanEdgar/euanedgar.github.io/tree/master/src/sites/blog/components/Markdown) that I ended up with.

In the `index.vue` we have a simple Vue component that renders a `<div>` into the page and sets its inner HTML content to the computed `html` data property. A watcher runs the `computeHtml` method every time the `content` prop changes, and that in turn calls the function defined in `marked.js`.

As the name implies, `marked.js` wraps the `marked` library. It extends `marked` via the `marked.use` method to attach some custom behaviour.

## Token walkers
The first feature you might notice is the `walkTokens` function. This function is called by `marked` whenever it reads a token - any distinct piece of content, such as a link or a heading. Code is then run based on the type of the token, which may the token in some way.

### Images
When an image is encountered, if the function has been provided with a `getAsset` function, the `href` attribute is checked. If it is not a link to an external resource (Doesn't match `/^https?://`), `getAsset` is called. In this case it ultimately calls the [`postAsset`](https://github.com/EuanEdgar/euanedgar.github.io/blob/master/src/sites/blog/utils/postAsset.js) function. This simply returns the correct path for an asset belonging to the current post.

```js
const postAsset = ({ slug }, asset) => (
  `/blog/posts/${slug}/assets/${asset}`
);

export default postAsset;
```

### Links
Links follow a similar logic to images. If a `getLink` has been provided and this is not an external link, call the `getLink` function. This ultimately calls [`blogLink`](https://github.com/EuanEdgar/euanedgar.github.io/blob/master/src/sites/blog/utils/blogLink.js) which does one of three things depending on the format of the link.

- If it looks like `words#anything` then try and build up a vue-router location object based on the type of object (E.g.: `post#some-slug` becomes `{ name: 'Blog-Post', params: { slug: 'some-slug' } }`), then have the router resolve it to a path.
- If it looks like JSON, try and parse it and then have the router resolve it to a path.
- Otherwise, just return the original text.

```js
import router from '@/router';

const blogComponents = {
  post: 'Blog-Post',
  category: 'Blog-Categories',
};

const blogLink = (link) => {
  if (/^[\w-_]+#./.test(link)) {
    const [type, slug] = link.split(/#/);

    const name = blogComponents[type];

    const location = {
      name,
      params: {
        slug,
      },
    };

    return router.resolve(location).href;
  } if (/^{.*}$/.test(link)) {
    try {
      const location = JSON.parse(link);
      return router.resolve(location).href;
    } catch (e) { /* This is not JSON */ }
  }
  return link;
};

export default blogLink;
```

### Headings
Finally we have headings. This is far and away the simplest case. All it does is increment the heading level (Heading 1 becomes heading 2, heading 2 becomes heading 3, etc.) up to a maximum of heading 6. Technically you can specify an increment greater than 1 (1 becomes 3 for example) but that's not a feature I use here. I implemented this because the `Post` component always renders the post name in an `<h1>` at the top of the page, so semantically all the headings within the post should be at least `<h2>` but I find it easier to just use normal headings in my markdown and have them automatically adjusted.

```js
const incrementCount = typeof incrementHeadings === 'number'
  ? incrementHeadings : 1;

if (token.depth <= 6 - incrementCount) {
  token.depth += incrementCount;
}
```

## Highlighting
Moving on down through `marked.js` we reach the highlight function. This function dynamically imports the correct syntax file for this language and uses [`highlight.js`](https://github.com/highlightjs/highlight.js/) to perform the appropriate syntax highlighting. It also has a little bit of logic to ensure it loads the correct syntax file - `js` and `md` are expanded to `javascript` and `markdown` respectively, `html` uses the `xml` syntax, but otherwise that's all.

## Renderer
Finally, we reach the renderer definition. This object defines render functions which overwrite the code renderer type to wrap the content in a `<pre>` element which has the `hljs` class applied to it. This is required for the syntax highlighting to apply correctly to code blocks.

# Design
Alright. On to the part I've been dreading. Design.

I always say there's a good reason I don't call myself a web designer and I stand by that. I don't even do too much complex work with CSS these days, instead working in JS or with some backend framework to produce functionality before handing it off to somebody far more skilled than I am in that regard. However, it would have felt a little unfair to try and stick him with this weird side project that has no clear direction and ask him to figure it out. So I got to it.

I always struggle building something from the ground up, so I decided to start with [Bootstrap](https://getbootstrap.com/). Bootstrap develops and maintains their own Vue component library (Conveniently named [`bootstrap-vue`](https://bootstrap-vue.org/)) and I know from experience that it offers some handy layout components that would get me started. I decided that for most of my content listings (Just posts and categories for now) I would use the bootstrap card component. This allows the opportunity to add a kind of header image for my listings, and I think that images (Or image-adjacent content) can improve the look and feel of a site markedly. So, I added steps to the build process to locate and store header images for posts and categories, and added a system so that posts use the header image from their category if they don't have one.

Of course, once I had this implemented for listings I might as well implement it on the content pages themselves. But how do I do that? I was addressing this question at the same time as I was addressing the issue of the navigation and I thought to myself "Why not make the header image part of the navigation panel?" It's a bit of a novel idea and not one I've seen used too much, so I set to work.

I created a simple navigation panel with space for a few links and a space for some kind of image. I went with a slightly nerdy `<site />` style header for non-content pages.

![Homepage nav](basic-nav.png)
> The header when viewed on my development site

Next I tried inserting my header images as background images and what I ended up with... Wasn't great. Don't get me wrong, it was okay, but it was clear I was going to end up with problems when it comes to contrast and background positioning, and I don't particularly want to have to tailor images specifically for this site. So I added some extra options to the header image config. I made it so that you can specify the background position, colour, size, whether or not the image repeats, whether or not to increase the contrast of the text, and the colour of the text itself.

What you end up with is a bit more granular control than I really intended, but the ability to do some quite complex things. Take for example the [JavaScript category](category#javascript).

The image used there is the square JS logo offset to the bottom right, with a background colour set to match, and you end up with this thing that looks as though it was an image specifically tailored for this application.

![JavaScript category nav](js-nav.png)

It also allows you to do some quite odd things like the [Vue category](category#vue).

![Vue category nav](vue-nav.png)

Here I couldn't really figure out the best way to lay out the header that didn't just emulate the JS category, so I decided to just do something weird. Between the two of them I show off most of the features that this header image system allows - repetition and high contrast text on the Vue page; background and text colour, and image positioning on the JS page.

The rest of the site is quite simple. I either used default bootstrap or markdown styling, or I applied one of a few simple styles. I did spend quite a while going back and forth on specific shades of blue and the behaviour of hovered and active tabs on the navigation pane but in the end I think it turned out alright.

# Future plans
This blog isn't finished. Obviously I plan to add more content to it as time passes, but also there are features that I've planned which I simply haven't implemented yet. For instance, the [latest content page]({ "name": "Blog-Home" }) has no content.

For the meantime though, I think I'm about done with this part of the project. I expect I will return, but for now I want to try out something else. If you want to take a poke around, see for yourself in more detail what I've done here, you can check out the full source code on my GitHub [here](https://github.com/EuanEdgar/euanedgar.github.io/tree/master/src/sites/blog).
