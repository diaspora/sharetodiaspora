Advanced Sharer for diaspora*
=============================

Advanced Sharer is a tool able to share links to any [diaspora*][diaspora] pod.
[Learn more][about].

## Usage

The same parameters from diaspora* bookmarklets for title, URL and notes can be
used, just add them to the URL:

```
https://share.diasporafoundation.org/?url=diasporafoundation.org&title=The%20diaspora*%20Project&notes=Welcome%20to%20diaspora*
```

[Try it!](https://share.diasporafoundation.org/?url=diasporafoundation.org&title=The%20diaspora*%20Project&notes=Welcome%20to%20diaspora*)

You can use [sharing buttons and a custom bookmarklet][about] to create these
links. There's a [Firefox addon][firefox-addon] if you do not want to use the
embedded share interface and a [Wordpress plugin][wordpress-plugin] to add a
"Share to diaspora" widget to your blog.

If you want a button with a simpler UI, you may want to check out this [simple
sharing button][simple-button].  There are other options available in [the
diaspora* wiki][wiki-tools] as well.

**Note**: If you've marked *Remember my choice* then you will be always
redirected to the pod you chose that time.  To avoid this, add the parameter
`&redirect=false` on the URL.

## Contributing

Any fixes and improvements are greatly appreciated. Feel free to [fork the
project][fork] and tinker with it :)

### Translations

We're currently using [L20n][l20n] by Mozilla for localization. To contribute a
translation the *Github way*, you can fork this project and add a locale folder
for your language under `locales`. Copy the file `index.l20n` from another
locale and use it to translate to your language.  Then create a pull request to
send them to the original repo.

[about]: https://share.diasporafoundation.org/about
[diaspora]: http://github.com/diaspora/diaspora
[firefox-addon]: https://github.com/jaywink/diaspora-advanced-sharer
[fork]: https://github.com/diaspora/sharetodiaspora/fork
[l20n]: https://github.com/l20n/l20n.js
[simple-button]: https://github.com/sebastienadam/simple_diaspora_sharing_button
[wiki-tools]: https://wiki.diasporafoundation.org/Tools_to_use_with_Diaspora
[wordpress-plugin]: https://github.com/ciubotaru/share-on-diaspora/
