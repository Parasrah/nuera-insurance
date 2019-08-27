[![Netlify Status](https://api.netlify.com/api/v1/badges/25359bc9-7bb7-47a4-9c07-8662544220c5/deploy-status)](https://app.netlify.com/sites/agitated-feynman-9da556/deploys)
[![Build Status](https://travis-ci.com/Parasrah/nuera-insurance.svg?branch=master)](https://travis-ci.com/Parasrah/nuera-insurance)

# About

This application was developed as part of my application to Nuera Insurance, and is in no way official or a representation of the company. Although it was not requested, I've tried to highlight some other skillsets that aren't necessarily related to technical experience with React/Javascript, such as:

* Organized git workflow
* Hosting & domain configuration
* Project configuration (bundling, transpilation, linting)
* Continuous integration (TravisCI)

## Webpack

I typically prefer to create a customized webpack configuration for a project, and this project was no exception. I've set it up with `babel` transpilation as well to help ensure the application functions properly on all modern browsers.

## @shards

I've used two libraries I authored, [@shards/maybe](https://github.com/shard-js/maybe) and [@shards/result](https://github.com/shard-js/result), to make error handling in the application more declarative. To some these will seem familiar to the fantasyland compliant types, but I designed the API's to be more friendly in non-functional environments, and as such neither are fantasyland compliant.

## React Hooks

Due to the simplicity of the application, I felt something like `redux` would be overkill, so I opted to learn one of the newer `React` API's; hooks. Most of the state management occurs in `@hooks/table.js`, where I make use of the `useState` hook to create a `useTable` hook.

## Styling

Most of my experience with application styling is with `sass`, but my recent experience with `elm-css` made me want to try a similar solution in Javascript. As a result, I've used Aphrodite for most of the styling.

## Third Party Components

The only third party component/styles I made use of was `react-toastify`, and everything else was crafted specifically for this project.

## Testing

I have written some tests using `Jest`, and have added snapshot tests for several components, as well as unit tests for most of the `@hook/table` module. Again I understand this was not required, but I found that doing so helped me to verify the application was working properly.

# Setup

## Dependencies

This application depends on both `NodeJS` and `npm`, both of which can be obtained via [the node website](https://nodejs.org) and [Node Version Manager](https://github.com/nvm-sh/nvm), as well as [Git](https://git-scm.com/)

After these are installed and accessible in your cmd/terminal, run the following in your cmd/terminal:

```
git clone https://github.com/Parasrah/nuera-insurance
```

And to install dependencies:

```
npm install
```


## Running

> Note: There is already an instance of the application hosted at [nuera.parasrah.com](https://nuera.parasrah.com)

To run a development server on `http://localhost:9080` run the following:

```
npm start
```

Or to generate the files necessary to run in production:

```
npm run build
```
