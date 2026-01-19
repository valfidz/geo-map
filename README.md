# Simple Geo Map

## Table of contents
- [Simple Geo Map](#simple-geo-map)
    - [Description](#description)
    - [Requirements](#requirements)
    - [Run this project](#run-this-project)
    - [Supabase setup](#supabase-setup)
    - [Libraries used in this project](#libraries-used-in-this-project)
    - [Building](#building)

## Description

A simple map made with [Sveltekit](https://svelte.dev/docs/kit/introduction) and [Leaflet](https://leafletjs.com/)

## Requirements

- [![Node.js](https://img.shields.io/badge/Node.js%20^22.14.0-43853D?logo=node.js&logoColor=white 'Node.js')](https://nodejs.org)
- [![Bun](https://img.shields.io/badge/Bun%20^1.3.6-43853D?logo=bun&logoColor=white 'Bun')](https://bun.com/)
- [![Supabase](https://img.shields.io/badge/Supabase%20^2.90.1-43853D?logo=supabase&logoColor=white 'Supabase')](https://supabase.com/docs)

## Run this project

To run this project you need to do these command

```sh
# install dependencies
bun install

# run project in development mode
bun run dev
```

Make sure you have configured .env file before running this project, and then open your browser and navigate to [localhost:5173](http://localhost:5173).

## Supabase setup

1. If you don't have a supabase account, you can make an account first at [supabase](https://supabase.com/)
2. If you have a supabase account, you can start create a project:
    - [Create a new project](https://supabase.com/dashboard) in the Supabase Dashboard
    - Enter your project details
    - Wait for the new database to launch
3. In this repository, we're only using auth so we don't need to make a new schema since auth's schema is created automatically by supabase
4. Make sure you setup the .env configurations
```sh
PUBLIC_SUPABASE_URL=your_public_supabase_rl
PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_public_publishable_key
FE_URL=your_frontend_url
GEO_API=any_geojson_api 
```
5. You can get PUBLIC_SUPABASE_URL data from supabase project settings > Data API > Project URL
6. You can get PUBLIC_SUPABASE_PUBLISHABLE_KEY from supabase project settings > API Keys > Publishable key
7. If you want to use the same environment as this project, you can use these .env configurations:
```sh
PUBLIC_SUPABASE_URL=https://yzbosgvmzgehxanspfcd.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_QtJrZo0DeTqWMy0vHhDekw_JF7EcVh8
FE_URL=http://localhost:5173
GEO_API=https://datahub.io/core/geo-countries/r/countries.geojson
```
8. And then you can use this testing user:
```sh
{
    user: "poweruser01@yopmail.com",
    password: "user123"
}
```

## Libraries used in this project
- [![Svelte](https://img.shields.io/badge/Svelte%20^5.45.6-43853D?logo=svelte&logoColor=white 'Svelte')](https://svelte.dev/docs/svelte/overview)
- [![Sveltekit](https://img.shields.io/badge/Sveltekit%20^2.49.1-43853D?logo=svelte&logoColor=white 'Sveltekit')](https://svelte.dev/docs/kit/introduction)
- [![Tailwindcss](https://img.shields.io/badge/Tailwindcss%20^4.1.18-43853D?logo=tailwindcss&logoColor=white 'Tailwindcss')](https://tailwindcss.com/)
- [![Leaflet](https://img.shields.io/badge/Leaflet%20^1.9.4-43853D?logo=leaflet&logoColor=white 'Leaflet')](https://leafletjs.com/)
- [![jsPDF](https://img.shields.io/badge/jsPDF%20^1.9.4-43853D?logo=jspdf&logoColor=white 'jsPDF')](https://github.com/parallax/jsPDF)
- [![jsPDF autotable](https://img.shields.io/badge/jsPDF%20autotable%20^5.0.7-43853D?logo=jspdf&logoColor=white 'jsPDF autotable')](https://github.com/simonbengtsson/jsPDF-AutoTable)


## Building

To create a production version of this app:

```sh
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
