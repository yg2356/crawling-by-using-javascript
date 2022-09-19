https://github.com/mrdoob/stats.js/ ~ 프레임확인

<html>
<!--http://54.180.201.175:3000/zzz-->

<head>
    <title>444 </title>
    <style>

    </style>
    <script>

    </script>
</head>

<body>

</body>

</html>

body {
    background: black;
    color: white;
    font-size: 20px;
}

div button {
    color: pink;
    opacity: 0.5;
}

div#d {
    border: 3px solid red;
    background: green;
    padding: 20px;
}


(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

function rect(body, h, w, l, t, color) {
   let btn = document.createElement('div');
   body.appendChild(btn);
   btn.style.height = h + 'px';
   btn.style.width = w + 'px';
   btn.style.backgroundColor = color;
   btn.style.left = l + 'px';
   btn.style.top = t + 'px';
   btn.style.position = 'absolute';
   btn.style.transform = 'rotate(0deg)'

   return btn;
}
function randomColor() {
   let cc = '#' + Math.floor(Math.random() * 16777215).toString(16);
   return (cc + '0'.repeat(100)).substr(0, 7);
}
function tail(body) {
   let pan = rect(body, 100, 100, 100, 300, '#111');
   let rc = pan;
   for (let i = 0; i < 10; i++) {
      let angle = 0;
      let color = randomColor();
      let x = 0 + (-10);
      let y = 0 + (-10);
      if (i === 0) {
         x = 25;
         y = 25;
      }
      let sc = rect(rc, 50 - (i * 1), 50 - (i * 1), x, y, color);
      sc.style.transform = 'rotate(3deg)';
      rc = sc;
      function rotate() {
         sc.style.transform = 'rotate(' + angle + 'deg)';
         angle += (0.01 * (40 - i)) * (i % 2 ? -1 : 1);
         requestAnimationFrame(rotate);
      }
      rotate();
   }
   return pan;
}

window.addEventListener('load', function () {
   let body = document.querySelector('body');

   let rr = tail(body);


   //  sc

})

// function dot(x, y, color) {
//    let btn = document.createElement('div');
//    btn.style.background = color;
//    btn.style.width = '10px';
//    btn.style.height = '100px';
//    btn.style.position = 'absolute';
//    btn.style.left = x + 'px';
//    btn.style.top = y + 'px';
//    document.querySelector('body').appendChild(btn)

//    btn.addEventListener('mouseover', function () {
//       btn.style.transform = 'rotateY(270deg)'
//       btn.style.transition = '5s'
//       btn.style.background = 'yellow'
//    })

//    return btn;
// }


// window.addEventListener('load', async function () {

//    let x = 100;
//    let x1 = 300;
//    let x2 = 500;
//    let y = 200;
//    let i = 0;
//    let j = 0;
//    let color = ['white', 'red', 'blue', 'green', 'yellow']

//    for (i = 0; i < 100; i++) {
//       let d = dot(x, y + i, color[0]);
//       let r = 0;
//       async function tick() {
//          let ret = await new Promise(function (resolve, reject) {
//             let val = parseInt(d.style.left.split('p')[0]) + 1;
//             d.style.left = val + 'px';
//             r++;
//             d.style.transform = 'rotate(' + r + 'deg)';
//             if (val < 300) {
//                setTimeout(tick, 1);
//             }
//             resolve(false);

//          })
//          return ret;
//       }
//       tick();
//    }
//    for (i = 0; i < 100; i++) {
//       let d1 = dot(x1, y + i, color[1]);
//       let r1 = 0;

//       async function tick1() {
//          let ret1 = await new Promise(function (resolve, reject) {
//             let val1 = parseInt(d1.style.left.split('p')[0]) + 1;
//             d1.style.left = val1 + 'px';
//             r1++;
//             d1.style.transform = 'rotate(' + r1 + 'deg)';
//             if (val1 < 600) {
//                setTimeout(tick1, 1);
//             }
//             resolve(false);
//          })
//          return ret1;
//       }

//       tick1();
//    }

//    for (i = 0; i < 100; i++) {
//       let d2 = dot(x2, y + i, color[2]);
//       let r2 = 0;
//       async function tick2() {
//          let ret2 = await new Promise(function (resolve, reject) {
//             let val2 = parseInt(d2.style.left.split('p')[0]) + 1;
//             d2.style.left = val2 + 'px';
//             r2++;
//             d2.style.transform = 'rotate(' + r2 + 'deg)';
//             if (val2 < 900) {
//                setTimeout(tick2, 1);
//             }
//             resolve(false);
//          })
//          return ret2;
//       }
//       tick2();
//    }



//    // btn.addEventListener('mouseover', function () {
//    //     btn.style.transform = 'rotate(90deg)'
//    //     btn.style.transition = '5s'
//    //     btn.style.fontSize = '30px'
//    // })
//    // console.log(1);

//    //     for (let i = 0; i < 1000; i++) {
//    //         let btn = document.createElement('button');
//    //         btn.innerText = "a";
//    //         btn.setAttribute('class', 'aasdf');
//    //         document.querySelector('body').appendChild(btn)
//    //         btn.addEventListener('mouseover', function() {
//    //             btn.style.transform = 'rotate(90deg)'
//    //             btn.style.transition = '5s'
//    //             btn.style.fontSize = '30px'
//    //         })
//    //     }

//    // document.querySelector("#def").addEventListener('click', function () {
//    //     setTimeout(function () {
//    //         document.querySelector("#pepe").remove();
//    //         setTimeout(function () {
//    //             document.querySelector("#def").remove();
//    //         }, 2000);
//    //     }, 3000);
//    // });
// });