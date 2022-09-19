const express = require('express')
const fs = require('fs');
const app = express()

// app.get('/mani', async function (req, res) {
//     for(let i=0;i<1000;i++){
//         fs.writeFileSync(`../boarddata/${i}_${Math.random()}`,'writer\nconetnt');
//     }
//     res.end();
// });
//글쓰기
app.get('/list', function (req, res) {
    let amount = 10;
    let page = parseInt(req.query.page);
    fs.readdir('../boarddata/', function (err, arr) {
        let str = '';

        str+='<head>';
        str+='<script>';
        window.onload = function(){
            b1.onclick = function(){history.back();}
            b2.onclick = function(){history.forward();}
        }
        str+='</script>';
        str+='</head>';
        str += '<html>';
        str += '<body>';
        arr.sort(function (a, b) {
            let ano = parseInt(a.split('_')[0]);
            let bno = parseInt(b.split('_')[0]);
            if (ano > bno) return -1;
            if (ano < bno) return 1;
            return 0;
        });
        arr = arr.splice((page-1) * amount,amount);
        for (let i = 0; i < arr.length; i++) {
            let sp = arr[i].split('_');
            str += '<div style="padding: 5px; border-bottom:1px solid #aaa;">';
            str += '<b style = "color: blue;">';
            str += sp[0] + ' ';
            str += '</b>'
            for (let j = 1; j < sp.length; j++) {
                if (j > 1) {
                    str += '_' + sp[j];
                }
                else {
                    str += sp[j];
                }
            }
            str += '</div>';
            str += '\n';

        }

        
        str+='<input type ="button" value="이전" id="b1">';
        str+='<input type ="button" value="다음" id="b2">';
        str += '</body>';
        str += '</html>';
        res.send(str.toString());
    })

    

})


app.get('/', function (req, res) {
    fs.readFile('table.html', function (err, cnt) {
        console.log(req);
        res.send(cnt.toString());
    });
});

app.listen(3000);
//------------------------
//  title, write, no, content
//------------------------