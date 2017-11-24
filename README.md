# Lividum Core

Core scrapping engine of Lividum.

## Example Usage
Let's scrap jQuery official website, assume we want:
1. get what jQuery latest version by looking at its download button.
2. looking at books recommended on bottom page.
```
// required node.js version 6+

const Lividum = require('lividum-core');

new Lividum.Request(`https://jquery.com/`)
    .parse('version', $ => $('.download-main span').map((id, el) => $(el).text()).toArray()[1])
    .parse('books', $ => $('.books li').map((id, el) => ({
        img: $(el).find('img').attr('src'),
        title: $(el).find('a').text().trim().replace('\n', ' - ').replace(/\t/g, ''),
    })).toArray())
    .fetch()
    .then(res => {
        console.log(res.parsed);
    });
```
Expected result
```
{
  version: 'v3.2.1',
  books: [
    {
      img: '//jquery.com/jquery-wp-content/themes/jquery/content/books/learning-jquery-4th-ed.jpg',
      title: 'Learning jQuery Fourth Edition - Karl Swedberg and Jonathan Chaffer'
    },
    {
      img: '//jquery.com/jquery-wp-content/themes/jquery/content/books/jquery-in-action.jpg',
      title: 'jQuery in Action - Bear Bibeault, Yehuda Katz, and Aurelio De Rosa'
    },
    {
      img: '//jquery.com/jquery-wp-content/themes/jquery/content/books/jquery-succinctly.jpg',
      title: 'jQuery Succinctly - Cody Lindley'
    }
  ]
}
```
Nothing special?

Open your browser and go to jQuery official website, [here](https://jquery.com/).

Try this on your browser console (right click -> inspect element, and open `console` tab).

Write this on your console, and press enter.

```$('.download-main span').map((id, el) => $(el).text()).toArray()[1]```

You will get jQuery version number.

Then try this one, still on the same page.

```
$('.books li').map((id, el) => ({
    img: $(el).find('img').attr('src'),
    title: $(el).find('a').text().trim().replace('\n', ' - ').replace(/\t/g, ''),
})).toArray()
```

You will get all of books listed on bottom page.

Yes, that's the feature of this library. We can create our own scrapper and debug the result right from the browser. Thanks to [cheerio](https://github.com/cheeriojs/cheerio), which provide jQuery on server side (node.js).

#### What if the website which I want to scrap doesn't use jQuery?

On Google Chrome, you can use [jQuery Injector](https://chrome.google.com/webstore/detail/jquery-injector/ekkjohcjbjcjjifokpingdbdlfekjcgi) extension.

#### What if the website I want to scrap is SPA (single-page application)?

Unfortunatelly, that's the limitation right now.

## APIs

### Class Request(uri: string)

`const Request = require('lividum-core').Request`

Main request constructor (Class). Accept single parameter, the `uri`.

#### Request.parse(bucket: string, $: cheerio-instance): Request

Parser method accept 2 parameters, `bucket` as a `key` which parsed object will take place, and `$` which is `cheerio instance` constructed by `cheerio(html-string)` which `html` is fetched from the `uri` provided.

Every value returned by `$` will be placed on `parsed` value result after fetching. Actually you can put anything there.

#### Request.fetch(): Promise

Fetch the `uri` and return `Promise`.

## License

[MIT](https://github.com/hellowin/lividum-core/blob/master/LICENSE)