const fetch = require('node-fetch');
const fs = require('fs');

async function mkf(filename, content) {
    await new Promise(function (resolve, reject) {
        fs.writeFile(filename, content, function () {
            resolve();
        })
    })
}

async function mainlogic(pageno) {
    let res = await fetch('https://www.clien.net/service/board/image?&od=T31&category=0&po=' + pageno);
    let ret = await res.text();
    ret = ret.split('\n');
    let arr = [];
    for (let i = 0; i < ret.length; i++) {
        let line = ret[i];
        let href = line.indexOf('data-role="card-content"');
        if (href !== -1) {
            line = line.trim();
            let cut = line.split('data-role="card-content" href="');
            let web = cut[1].split('">');

            //페이지 내부로 들어가기
            let webpage = await fetch('https://www.clien.net' + web[0]);
            let webpagetext = await webpage.text();
            webpagetext = webpagetext.split('\n');

            let title;
            let url;
            let views;

            for (let j = 0; j < webpagetext.length; j++) {
                let inline = webpagetext[j];
                let imageline = inline.indexOf('"og:image"');
                let titleline = inline.indexOf('"og:title"');
                let viewsline = inline.indexOf('"fa fa-eye"');

                if (titleline !== -1) {
                    inline = inline.trim();
                    let fcut = inline.split('content="');
                    let rcut = fcut[1].split(' :');
                    title = rcut[0];
                    //console.log(title);
                }
                if (imageline !== -1) {
                    inline = inline.trim();
                    let fcut = inline.split('content="');
                    let rcut = fcut[1].split('" />');
                    url = rcut[0];
                    //console.log(url);
                }
                if (viewsline !== -1) {
                    inline = inline.trim();
                    let fcut = inline.split('<strong>');
                    let rcut = fcut[1].split('</strong>');
                    views = rcut[0];
                    //console.log(views);
                }

                if (title !== undefined && url !== undefined && views !== undefined) {
                    views = parseInt(views);
                    arr.push({
                        "title": title,
                        "address": url,
                        "views": views
                    });

                    title = undefined;
                    url = undefined;
                    views = undefined;
                }
            }
        }
    }
    return arr;
}
async function isfile(filename) {
    return await new Promise(function (resolve, reject) {
        fs.lstat(filename, function (err, res) {
            resolve(!err ? true : false);
        })
    })
}
async function code() {

    let res = await fetch('https://cafe.daum.net/_c21_/album_list?grpid=1YmAL&fldid=BWjU');
    res = await res.text();
    res = res.split('articles.push({');
    for (let i = 1; i < res.length; i++) {
        let article = res[i].split('isHomeNoti:')[0];
        let url = article.split("thumbnail: '")[1].split("'")[0];
        let title = article.split("title: '")[1].split("'")[0];
        title = JSON.parse('"'+title+'"')
        let file = './data6/' + title + '.jpg';
        let image = await fetch(url);
        let cnt = await image.arrayBuffer();
        await mkf(file, Buffer.from(cnt));

    }
    // console.log(res);
    return;
    // try {
    //     await fetch('oadfisj');
    //     // let ret = await new Promise(function (resolve, reject) {
    //     //     if (!true) {
    //     //         resolve(123)
    //     //     } else {
    //     //         reject(333);
    //     //     }
    //     // });
    // } catch (e) { 

    //     // console.log(e);
    // }
    // console.log(111111);

    // return;


    for (let i = 0; i < 30; i++) {
        try {
            let r = await mainlogic(i);
            r.sort(function (a, b) {
                return a.views < b.views ? -1 : a.views > b.views ? 1 : 0;
            })
            console.log("================" + i + "번째 다운로드====================");
            for (let i = 0; i < r.length; i++) {
                let file = './data2/' + r[i].title + '.jpg';
                //console.log(file, await isfile(file));
                if (!await isfile(file)) {
                    let image = await fetch(r[i].address);
                    let cnt = await image.arrayBuffer();
                    console.log(r[i].title + '.jpg');
                    await mkf(file, Buffer.from(cnt));
                }
            }
        } catch (e) { }
    }
}

code();


//