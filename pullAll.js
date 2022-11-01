const { exec } = require("child_process");
const { promises: { readdir } } = require('fs');

const { exit } = process;

(async () => {
  const dirNames = (await readdir('./')).filter(name => name.split('.').length === 1);

  const promises = dirNames.map(name => (
    new Promise(res => {
      exec(`cd ./${name} && git status && git pull`, (error, stdout) => {
        console.log(`-----------------------------${name}-----------------------------`);

        console.log(error || stdout);

        res();
      });
    })
  ));

  await Promise.all(promises);

  console.log(`All repos have been pulled.`);

  exit(0);
})();
