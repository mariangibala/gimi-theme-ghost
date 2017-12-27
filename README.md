
![Gimi Theme](/docs/img/main.jpg?raw=true)

# Gimi Theme

**If you want to just use the theme - grab files from the release folder
and proceed with the [documentation](https://mariangibala.github.io/gimi-theme-ghost/).**

Clean and customizable blog theme for Ghost v1.X.X

* Lightweight
* Fully Responsive
* Featured Post
* Disqus Comments
* Share Posts on Facebook, Twitter and Google+
* Next & Previous Post Navigation
* Iframes Support – Vimeo, YouTube, SoundCloud
* Valid W3C HTML5
* Font Awesome Icons

#### Widgets:

* Recent Posts
* Popular Tags
* Subscription Form

#### 3rd party assets:

* Font Awesome 4.7.0
* Google Fonts
* jQuery 3.2.0
* Photos used in theme previews and the editor are licensed under Creative Commons Zero (unsplash.com)
* Vectors are created by Freepik.


## Scripts:

```
npm run dev -d "buildDestinationPath"
npm run production -d "buildDestinationPath"
```
For DEV build setup `"buildDestinationPath"` to point to Ghost themes folder.
If Ghost instance is already running you may need to use `ghost restart` command to see the theme in available themes list.


## Styles editor
Styles editor source files are not included in this repository.
But the editor build is included and you can still run your own local copy of it.

* Don't inject child theme code when using the editor. When editor is active child theme code is generated on runtime. 
* Editor uses CSS selectors to identify elements ![(see here)](https://github.com/mariangibala/gimi-theme-ghost/blob/master/src/js/editor/config.js#L65) so be cerful with changing .scss 
```
npm run dev:include-editor -d "buildDestinationPath"
```
[![Styles editor](/docs/img/styles-editor.png?raw=true)](https://www.youtube.com/watch?v=1GuId-Jf6T0)

## Included child themes:

![Child Themes](/docs/img/child-themes.png?raw=true)

## License

MIT
