const ghpages = require('gh-pages');
const NAME = '40hz'; // repo name
const repositoryUrl = `https://github.com/likeavenus/${NAME}`; // Адрес репозитория, в который вы хотите сделать деплой, например: https://github.com/likeavenus/portfolio

ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: repositoryUrl
}, ()=> { console.log('Deploy is successful') });
