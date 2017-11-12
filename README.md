
# Gimi Theme

If you want to just use the theme - grab files from the release folder
and proceed with the documentation.


#### Scripts:

```
npm run dev -d "buildDestinationPath"
npm run production -d "buildDestinationPath"
```
For DEV build setup `"buildDestinationPath"` to point to Ghost themes folder.
If Ghost instance is already running you may need to use `ghost restart` command to see the theme in available themes list.


#### Styles editor
Styles editor source files are not included in this repository.
But the editor build is included and you can still run your own local copy of it.

Don't inject child theme code when using the editor.
```
npm run dev:include-editor -d "buildDestinationPath"
```