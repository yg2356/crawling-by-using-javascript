const fetch = require('node-fetch');


async function mainlogic(pageno) {
    let res = await fetch('https://www.clien.net/service/board/image?&od=T31&category=0&po=' + pageno);
    let ret = await res.text();
    ret = ret.split('\n');
    for (let i = 0; i < ret.length; i++) {
        let line = ret[i];
        let aa = line.indexOf('" onerror="this.src=\'/service/image/image_thnoimage.png\'">');
        if (aa !== -1) {
            line = line.trim()
            let cut = line.split('<img src="');
            let webadd = cut[1].split('" alt="');
            let title = webadd[1].split('" onerror');
            let url = webadd[0];
            let filename = ('./data/' + (title[0]) + '.jpg');

            let image = await fetch(url);
            let cnt = await image.arrayBuffer();
            console.log(filename);
        }
    }
    console.log(pageno + ' page 다운로드 완료');
}


async function code() {
    for (let i = 0; i < 30; i++) {
        await mainlogic(i);
    }
}
code();




















































