# crawl-dressup

> [make u avatar](https://ryanatkn.github.io/crawl-dressup) :dragon:

This project was originally much wider in scope,
but all it does now is let you play dressup using
[Dungeon Crawl Stone Soup](https://github.com/crawl/crawl) assets.
It's going to become [Gro Garden](https://github.com/gro-garden/gro-garden)
once [Gro](https://github.com/gro-garden/gro) is more mature.

The code uses experimental codegen that became Gro,
and the views are a special kind of mess, so don't try to learn from them.

## diy

```bash
npm install
npm start
npm run server # run this after `npm start` finishes building

# after editing `src/app/app.clay.json` or the writers used in `src/tasks/gen.ts`:
npm run gen

# after changing `public/assets`
npm run assets
```


## license

[CC0 1.0](http://creativecommons.org/publicdomain/zero/1.0/) (Public Domain Dedication)

- [artists](ARTISTS.md)
- [code](LICENSE)
- [tiles](https://github.com/crawl/tiles)
    are from [Dungeon Crawl Stone Soup](https://github.com/crawl/crawl) -
    see the included [readme and arists list](public/assets/dcss/README.md)
