# react-material-contentful

Combining React, Material-UI and Contentful

Started out with [Material Kit React](https://github.com/creativetimofficial/material-kit-react)

# Quickstart

1. clone or get a copy of repo
2. copy `.env.EXAMPLE` to `.env` and change values in the file
3. import the model and example content as described below
4. `npm i`
5. `npm start`

# Contentful model

The contentful model to use can be found in [contentful-model](/contentful-model). The mode-file consist of some example data.

### To import the model

1. copy `ctf-config.EXAMPLE.json` to `ctf-config.json` and change values in the file
2. imoprt the data with `contentful space import --content-file contentful-model.json --config ctf-config.json` (add `--content-model-only` if you just want the model and no data)

This requires Contentful CLI. Please see https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/ for further reference

# Form

Submit formdata to Firebase and send form-submit-confirmation as mail using Sendgrid and [sendgrid-gateway](https://github.com/jwallinder/sendgrid-gateway)

An example can be found on url `/form`, backed by `/src/views/Components/FormPage/FormPage.jsx`

# Live Demo

The site is deployed and running in Netlify. Please browse to https://react-material-contentful.netlify.app/ to test it.
