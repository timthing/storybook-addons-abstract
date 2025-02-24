# Storybook addon for Abstract integration

A addon for storybook that allows you to link to Abstract layers and collections in the storybook panel!

![Example](https://i.imgur.com/EtAb6x3.gif)

## Examples

- Storybook: https://storybook-addons-abstract.now.sh/
- Source: https://github.com/amccloud/storybook-addons-abstract/tree/master/examples

## Install

```sh
npm install @timthing/storybook-addons-abstract@latest
```

## Usage

within `addons.js`:

```js
import '@timthing/storybook-addons-abstract/register';
```

within your stories:

```js
import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Blog", module)
  .addParameters({
    abstract: {
      // Copy a collection or layer share url from Abstract
      url: "https://share.goabstract.com/733ca894-a4bb-43e3-a2b1-dd27ff6d00c4"
    }
  })
   // Name your stories after layers in the collection
  .add("Blog Index", () => <BlogIndex />)
  .add("Blog Gallery", () => <BlogGallery />)
  .add("Blog Post", () => <BlogPost />);
```

or using the new [Component Story Format](https://storybook.js.org/docs/formats/component-story-format/) api:

```js
import React from "react";
import { BlogIndex, BlogGallery, BlogPost } from "../";

export default {
  parameters: {
    abstract: {
      // Copy a collection or layer share url from Abstract
      url: "https://share.goabstract.com/733ca894-a4bb-43e3-a2b1-dd27ff6d00c4"
    }
  }
};

// Name your stories after layers in the collection
export const blogIndex = () => (
  <BlogIndex />
);

export const blogGallery = () => (
  <BlogGallery />
);

export const blogPost = () => (
  <BlogPost />
);
```
