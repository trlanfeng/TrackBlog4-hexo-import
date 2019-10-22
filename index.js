const fs = require('fs');
const fm = require('front-matter');

const postsDir = '../hexo-blog/source/_posts';

async function main() {
  try {
    const res = await fs.promises.readdir(postsDir);
    for await (const postFileName of res) {
      const postContent = await fs.promises.readFile(postsDir + '/' + postFileName, 'utf8');
      const postJson = fm(postContent);
      const post = {
        title: postJson.attributes.title,
        tags: postJson.attributes.tags,
        category: postJson.attributes.categories,
        content: postJson.body,
      };
      console.log('TR: forawait -> post', JSON.stringify(post));
    }
  } catch (e) {
    console.log('TR: main -> e', e);
    // throw e;
  }
}

main();
