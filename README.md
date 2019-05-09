# Gimare - Online Markdown Slide Show / PPT

Gimare -  Convert any **Gi**st **Ma**rkdown file in to a slide show powered by **Re**veal.js. Front-end only, NO server needed!

## Try it out:

```
https://AlloVince.github.com/gimare/?YOUR_GIST_ID
```

## View a demo:

https://AlloVince.github.com/gimare/?40f75080097e2d3493fa7a9ef920c0f5

Check the [gist file](https://gist.github.com/AlloVince/40f75080097e2d3493fa7a9ef920c0f5) of this demo.

## Have your own Gimare in minutes

Way 1st: Download this repo, deploy the `/docs` folder to your host.

Way 2nd: Fork this repo, go to repo > Settings > GitHub Pages, change the section to `master branch /docs folder`. Then visit `https://yourusername.github.com/gimare/?YOUR_GIST_ID` 

That's all!

## Customization

Try this demo:

https://allovince.github.io/gimare/?87de170180b317998761d456ac7343e1

It’s easy to change styles or animation effects of Gimare, just add a Front-matter at the beginning of the markdown file, such as

```
---
theme: "moon"
separator: "==="
verticalSeparator: "===="
transition: "zoom"
---
```

- Avariable themes: `beige`, `black`, `blood`, `moon`, `night`, `serif`, `simple`, `sky`, `solarized`, `white`, default is `league`
- separator: a regular expression for horizontal slides, default is `^\r?\n---\r?\n$`
- separatorVertical: a regular expression defines vertical slides, default is `^\r?\n----\r?\n$`
- separatorNotes: a regular expression for specifying the beginning of the current slide's speaker notes, defaults is `notes?:`
- others: as same as [configuration of reveal.js](https://github.com/hakimel/reveal.js/#configuration)

### Build Gimare from source

```
npm install
npm run build
```
