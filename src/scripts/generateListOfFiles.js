'use strict'

const fs = require('fs')
const path = require('path')

function createDataStream (path) {
  return fs.createWriteStream(path, {
    flags: 'w'
  })
}

function generateListOfFiles(){
  const scssDir = path.join(__dirname, '../', 'scss')
  const styles = createDataStream(path.join(scssDir, 'styles.scss'))

  const folderNames = []
  const files = ['global.scss']

// load all files from ./ directory

  fs.readdirSync(scssDir).forEach(file => {
    if (file.indexOf('.scss') >= 0 && file !== 'global.scss'
      && file !== '_bootstrap.scss' && file !== 'styles.scss') {
      files.push(file)
    }
  })

// load all files from ./[folderNames] directories
  folderNames.forEach(folder =>{
    fs.readdirSync(path.join(scssDir, folder)).forEach(file => {
      if (file.indexOf('.scss') >= 0) {
        files.push('./' + folder + '/' + file)
      }
    })
  })


  styles.write('/*\nCAUTION!\nThis file is generated automatically.\nAll changes will be overwritten by build process. */\n')

  // create scss import file
  files.forEach(file =>{
    styles.write('@import "'+ file + '";\r\n')
  })
}


module.exports = generateListOfFiles