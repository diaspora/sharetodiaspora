Share to diaspora*
==================

This was once based on [sharetodiaspora.github.io][oldcodebase-github] but has
moved forward into a seperate project to allow us customizations to host this
as an official project asset and promote it to allow embedding into browsers,
for example.

Check out the original project as well since there might be features we are not
able to host in our official instance.

## Usage

The same parameters from diaspora* bookmarklets for the title and URL can be
used, just add them to the URL:

```
https://share.diasporafoundation.org/?url=diasporafoundation.org&title=The%20diaspora*%20Project
```

[Try it!](https://share.diasporafoundation.org/?url=diasporafoundation.org&title=The%20diaspora*%20Project)

Check out the [public info page][about] for usage details and more examples.

**Note**: If you've selected *Remember my choice* then you will be always
redirected to the pod you chose that time. To avoid this, append the parameter
`&nojump=1` to the URL.

## Contributing

Any fixes and improvements are greatly appreciated. Feel free to [fork the
project][fork] and tinker with it :)

### Translations

We're currently using [L20n][l20n] by Mozilla for localization. To contribute,
fork this repository and add a locale folder for your language under `locales`.
Copy the file `index.l20n` from another locale and use it to translate to your
language. We're waiting for your pull request!

[about]: https://share.diasporafoundation.org/about
[fork]: https://github.com/diaspora/sharetodiaspora/fork
[l20n]: https://github.com/l20n/l20n.js
[oldcodebase-github]: https://github.com/sharetodiaspora/sharetodiaspora.github.io
