You can visit [redk.juan-vilas.com](https://redk.juan-vilas.com) to try this
project or run the following commands:

```bash
yarn && yarn start
```

Then yo can visit `http://localhost:3017/`, if you are using `3017` port you can
choode another editing the file `package.json`:

```js
...
    "start": "next build && next start -p <PORT_HERE>",
...
```

## Comments

I have created the project in a way that gets the data through the server. The
API is public, but I have made it in a way considering it to be private, that's
why the data is obtained through the server.

There are server components as well as client components. Client components are
in `app/components` folder. Server functions are in `app/Utils.ts`.

For the front end I use TailwindCSS. The cards' style is inspared by
[brewdog'](https://www.brewdog.com/usa) page style.

The application is mobile friendly, you can see how element are rearranged while
you resize the window.

When clicked on "READ MORE", all the beer details are shown.

You can type a name by beer name for looking for specific beers or food for
looking by food pairing in English.

A maximum of 10 cards or rows is shown per page.

(Optional) - Done! You can select properties on the menu to show specific
information on cards. To remove them you can click on the tiny attribute' badge

(Optional) - Done! There is a button to change from card view to table and
viceversa

(Optional) - Done! You can save the beer to favorite clicking the bookmark icon.
It's saved using the `localStorage`function. Also, you can click on "SHOW
FAVORITES" to show them.
