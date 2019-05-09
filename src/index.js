import Reveal from 'reveal.js';
import isUrl from 'is-url';
import 'reveal.js/css/reset.css';
import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/league.css';
import 'reveal.js/lib/css/monokai.css';

window.Reveal = Reveal;

function showMarkdown(markdownText) {
  document.getElementById('reveal')
    .innerHTML = `<div class="slides">
      <section
        data-markdown
        data-separator="^\r?\n---\r?\n$"
        data-separator-vertical="^\r?\n----\r?\n$"
        >${markdownText}</section>
  </div>`;
  Reveal.initialize({
    dependencies: [
      {
        src: 'plugin/markdown/marked.js', condition: function () {
          return !!document.querySelector('[data-markdown]');
        }
      },
      {
        src: 'plugin/markdown/markdown.js', condition: function () {
          return !!document.querySelector('[data-markdown]');
        }
      },
      { src: 'plugin/highlight/highlight.js', async: true },
      { src: 'plugin/zoom-js/zoom.js', async: true },
      { src: 'plugin/notes/notes.js', async: true },
      { src: 'plugin/math/math.js', async: true }
    ]
  });
}

function showHtml(html) {
  document.getElementById('reveal')
    .innerHTML = `<div class="slides">${html}</div>`;
  Reveal.initialize({
    dependencies: [
      { src: 'plugin/highlight/highlight.js', async: true },
      { src: 'plugin/zoom-js/zoom.js', async: true },
      { src: 'plugin/notes/notes.js', async: true },
      { src: 'plugin/math/math.js', async: true }
    ]
  });
}

const query = window.location.search.replace('?', '');
const gistUrl = 'https://api.github.com/gists/';
const defaultId = '40f75080097e2d3493fa7a9ef920c0f5';
let url = `${gistUrl}${defaultId}`;
let useAPI = true;

if (query && /^\w+$/.test(query)) {
  url = `${gistUrl}${query}`;
} else if (query && isUrl(query)) {
  url = query;
  useAPI = false;
}

fetch(url)
  .then((res) => {
    if (useAPI) {
      return res.json()
        .then(json =>
          Object
            .entries(json.files)
            .map(([, file]) => file)
            .find(file => ['markdown', 'html'].includes(file.language.toLowerCase()))
        );
    } else {
      return res.text();
    }
  }, (error) => {
    showMarkdown(error);
  })
  .then((body) => {
    if (typeof body === 'string') {
      showMarkdown(body);
    } else {
      if (body.language && body.language.toLowerCase() === 'markdown') {
        showMarkdown(body.content);
      } else {
        showHtml(body.content);
      }
    }
  });
