#!/usr/bin/env node

const program = require('commander');
const nativefier = require('nativefier').default;
const fs = require('fs');

const installDir = '/usr/local/bin';
const installPath = installDir + '/webapps';

program
  .version('0.0.1')
  .option('--title <n>', 'App name')
  .parse(process.argv);

// Make install path if it doesn't exist
fs.access(installPath, (err) => {
  if (err) {
    fs.mkdir(installPath, (err) => {
      if (err) console.log(err);
    });
  }
});

let options = {
  targetUrl: program.args[0],
  out: installPath,
  overwrite: true,
  asar: true,
};
if (program.title) options.name = program.title;

nativefier(options, function(err, path) {
  if (err) console.log(err);
  else {
    let re = /([A-z]|-)*(?=(-[0-z]*){2})/;
    let command = re.exec(path)[0];
    let appName = program.title ? program.title : command.charAt(0).toUpperCase() + command.slice(1);
    let desktopEntry = '[Desktop Entry]\nType=Application\nName=' + appName + '\nPath=' + installDir + '\nExec=' + command + '\nTerminal=false';

    fs.access(installDir + '/' + command, (err) => {
      if (!err) {
        fs.unlinkSync(installDir + '/' + command);
      }
      fs.symlink(path + '/' + command, installDir + '/' + command, (err) => {
        if (err) console.log(err);
      });
    });
    
    fs.chmod(path+'/resources/app', 0755, (err)=> {
      if (err) console.log(err);
    });
    fs.writeFile('/usr/share/applications/'+command+'.desktop', desktopEntry, (err) => {
      if (err) console.log(err);
    });
  }
})