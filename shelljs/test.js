const shell = require('shelljs');
// if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
//     shell.echo('Error: Git commit failed');
//     shell.exit(1);
//   }
let  child= exec("git pull",{async:true});

child.stdin.write('git\n'); //这里输入密码
child.stdin.end();
