// dato.config.js

const defaultAppConfig = {
  site_name: 'Bitrise DevCenter',
  theme: 'material',
  edit_uri: 'blob/master/docs/',
  repo_name: 'GitHub',
  repo_url: 'https://github.com/dbreuer/devcenter',
  pages: [],
  markdown_extensions: [
    'codehilite(css_class=code)',
    'admonition',
    { toc: { permalink: '⚓' } }
  ],
  extra: {
    palette: {
      primary: 'deep purple',
      accent: 'deep purple',
      extra: null
    },
    logo: 'img/logo.svg',
    font: {
      text: 'Roboto',
      code: 'Source Code Pro'
    }
  },
  extra_css: ['stylesheets/extra.css']
};

module.exports = (dato, root, i18n) => {
  console.log('\r\n');
  const pageMaps = [];
  const homePage = {};
  homePage[dato.homePage.title] = 'index.md';
  pageMaps.push(homePage);

  dato.pages.map(article => {
    const articleObject = {};

    if (article.parent === null) {
      articleObject[article.title] = [];
    }
    if (article.parent === null && article.content !== null) {
      articleObject[article.title] = 'index.md';
    }
    if (article.parent !== null && article.parent.parent === null) {
      articleObject[article.title] =
        article.content !== null
          ? [String(article.parent.slug), String(article.slug)].join('/') +
            '.md'
          : [];
      pageMaps.map(item => {
        if (
          item[Object.keys(item)].indexOf('.md') === -1 &&
          Object.keys(item)[0] === article.parent.title
        ) {
          item[Object.keys(item)].push(articleObject);
        }
      });
    }
    if (article.parent !== null && article.parent.parent !== null) {
      articleObject[article.title] =
        [
          String(article.parent.parent.slug),
          String(article.parent.slug),
          String(article.slug)
        ].join('/') + '.md';
      pageMaps.map(elem => {
        if (typeof elem[Object.keys(elem)] === 'object') {
          elem[Object.keys(elem)].map(subitem => {
            if (typeof subitem[Object.keys(subitem)] === 'object') {
              subitem[Object.keys(subitem)].push(articleObject);
            }
          });
        }
      });
    }
    if (!isEmpty(articleObject) && article.parent === null) {
      pageMaps.push(articleObject);
    }
  });

  let datoPageConfig = Object.assign({}, defaultAppConfig, { pages: pageMaps });
  root.createDataFile('mkdocs.yml', 'yaml', datoPageConfig);

  root.directory('docs', articlesDir => {
    console.log('\r\n');
    dato.pages.map(article => {
      //it has not have Parent so its the category index content
      if (article.parent === null && article.content !== null) {
        articlesDir.createPost(`${article.slug}/index.md`, 'yaml', {
          content: article.content
        });
      }

      if (article.parent !== null && article.parent.parent === null && article.content !== null) {
        articlesDir.createPost(
          `${article.parent.slug}/${article.slug}.md`,
          'yaml',
          {
            content: article.content
          }
        );
      }

      if (article.parent !== null && article.parent.parent !== null && article.content !== null) {
        articlesDir.createPost(
          `${article.parent.parent.slug}/${article.parent.slug}/${
            article.slug
          }.md`,
          'yaml',
          {
            content: article.content
          }
        );
      }
    });
  });
};

var isEmpty = function(obj) {
  for (var key in obj) if (obj.hasOwnProperty(key)) return false;
  return true;
};
