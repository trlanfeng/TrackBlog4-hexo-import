const fs = require('fs');
const fm = require('front-matter');
const axios = require('axios');

const apiBaseUrl = 'http://127.0.0.1:3000/api/';
const postsDir = '../hexo-blog/source/_posts';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOjk5OSwiaWF0IjoxNTcxMzg0OTU1LCJleHAiOjE1NzEzOTIxNTV9.JTuE_FKdAplgtFUiePIprQRynjL1d0rxoHiKZ6RcYBQ';

async function main() {
  try {
    const res = await fs.promises.readdir(postsDir);
    for await (const postFileName of res) {
      const postContent = await fs.promises.readFile(postsDir + '/' + postFileName, 'utf8');
      const postJson = fm(postContent);
      const post = {
        id: Number(postJson.attributes.id),
        title: postJson.attributes.title,
        tags: postJson.attributes.tags,
        category: postJson.attributes.categories,
        content: postJson.body,
      };
      const res = await axios.post(apiBaseUrl + 'articles/import', post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.message);
    }
  } catch (e) {
    console.log('TR: main -> e', e);
    // throw e;
  }
}

main();
