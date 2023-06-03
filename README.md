### AnimeParser library

Library for parse anime from site, lib can parse (anime info, player, download url)

### How install this lib?

`git clone https://github.com/kylym-maratov/anime-parser
&&
npm i 
&& 
npm run build`

and import index.js file from dist directory.

### The library can parse this data

url: string
year: string
image?: string
rating: string
title: string
originalName: string
player: string
description: string
genre: string
license: string
translates: string
status: string
director: string
iframeUrl: string
translateId: string
trasnlateName: string

This lib use axios, cheerio.
