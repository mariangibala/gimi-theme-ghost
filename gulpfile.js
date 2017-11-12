const gulp = require('gulp')
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const plumber = require('gulp-plumber')
const preprocess = require('gulp-preprocess')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const sourceMaps = require('gulp-sourcemaps')
const path = require('path')
const cleanCSS = require('gulp-clean-css')
const generateStylesSCSS = require('./src/scripts/generateListOfFiles')
const minimist = require('minimist')
const argv = minimist(process.argv)
const fs = require('fs')
const themeConfig = require('./src/themeConfig.js')
const insert = require('gulp-insert')
const cheerio = require('cheerio')
const beautify = require('js-beautify').html


const _INCLUDE_EDITOR_ = process.env._INCLUDE_EDITOR_ ? true : false
const BUILD_TYPE = process.env.BUILD_TYPE ? process.env.BUILD_TYPE : 'demo'


// inject SASS variable
const $editorNav = _INCLUDE_EDITOR_ ? '$editor-nav: 270px;' : '$editor-nav: 0px;'

console.log('env: _INCLUDE_EDITOR_: ', _INCLUDE_EDITOR_)
console.log('env: BUILD_TYPE: ', BUILD_TYPE)

// check themeConfig
if (!themeConfig || !themeConfig.name) throw new Error('Wrong theme config')

// read arguments
const buildDestination = argv.d

try {
  // has destination flag?
  if (buildDestination) {
    const isDirectory = fs.lstatSync(buildDestination).isDirectory()
    if (!isDirectory) {
      throw new Error('Build destination is not directory ', buildDestination)
    }
  }
} catch (err) {
  throw err
}


const SRC_DIR = path.join(__dirname, 'src')

const DIST_DIR = buildDestination ? path.join(buildDestination, themeConfig.name) :
  path.join(__dirname, 'build')

console.log('DIST_DIR: ', DIST_DIR)

const ASSETS_DIR = path.join(DIST_DIR, 'assets')

const SRC = {
  sassEntryPoint: path.join(SRC_DIR, 'scss/styles.scss'),
  sassWatch: path.join(SRC_DIR, 'scss/**/*.scss'),
  ENTRY_POINT: path.join(SRC_DIR, 'js/theme.js'),
  IMAGES: [path.join(SRC_DIR, 'images/*.jpg'), path.join(SRC_DIR, 'images/*.png'),
    path.join(SRC_DIR, 'images/*.svg')],
  FONTS: [
    path.join(SRC_DIR, 'fonts/*.woff*'),
    path.join(SRC_DIR, 'fonts/*.eot*'),
    path.join(SRC_DIR, 'fonts/*.ttf*'),
    path.join(SRC_DIR, 'fonts/*.otf*'),
    path.join(SRC_DIR, 'fonts/*.svg*'),
  ],
  THEME: path.join(SRC_DIR, 'theme/**/*'),
  CSS: path.join(SRC_DIR, 'css/**/*.css'),
  EDITOR_CONFIG: path.join(SRC_DIR, 'editor/**/*'),
  EDITOR_BUILD: path.join(__dirname, 'editor-build/**/*'),
  DOCS_INDEX: path.join(__dirname, 'docs/index_src.html')
}

const DIST = {
  ALL: [path.join(DIST_DIR)],
  CSS: path.join(ASSETS_DIR, '/css'),
  IMAGES: path.join(ASSETS_DIR, '/images'),
  JS: path.join(ASSETS_DIR, '/js'),
  FONTS: path.join(ASSETS_DIR, '/fonts'),
  THEME: path.join(DIST_DIR),
  EDITOR_BUILD: path.join(ASSETS_DIR, 'editor'),
  DOCS_INDEX: path.join(__dirname, 'docs/index.html')
}

// context is passed to preprocessor
const context = {
  _INCLUDE_EDITOR_: _INCLUDE_EDITOR_,
  _DEBUG_: false,
  BUILD_TYPE: BUILD_TYPE
}

gulp.task('setNodeEnv-dev', function () {
  return process.env.NODE_ENV = 'dev'
})

gulp.task('setNodeEnv-production', function () {
  return process.env.NODE_ENV = 'production'
})

gulp.task('copyFonts', function () {
  return gulp.src(SRC.FONTS)
    .pipe(plumber())
    .pipe(gulp.dest(DIST.FONTS))
})

gulp.task('copyEditorConfigFiles', function () {
  if (!_INCLUDE_EDITOR_) return
  return gulp.src(SRC.EDITOR_CONFIG)
    .pipe(plumber())
    .pipe(gulp.dest(DIST.EDITOR_BUILD))
})

gulp.task('copyCSSFiles', function () {
  return gulp.src(SRC.CSS)
    .pipe(plumber())
    .pipe(gulp.dest(DIST.CSS))
})

gulp.task('processTHEME', function () {
  gulp.src(SRC.THEME)
    .pipe(preprocess({context: context}))
    .pipe(gulp.dest(DIST.THEME))
});

gulp.task('copyImages', function () {
  return gulp.src(SRC.IMAGES)
    .pipe(plumber())
    .pipe(gulp.dest(DIST.IMAGES))
})

gulp.task('clean', function () {
  return gulp.src(DIST.ALL, {read: false})
    .pipe(clean({force: true}))
})

gulp.task('sass-dev', function () {
  gulp.src(SRC.sassEntryPoint)
    .pipe(insert.prepend($editorNav))
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(preprocess({context: context}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(DIST.CSS))
})

gulp.task('create-styles.scss', function () {
  generateStylesSCSS()
})

gulp.task('sass-production', function () {
  return gulp.src(SRC.sassEntryPoint)
    .pipe(insert.prepend($editorNav))
    .pipe(sass().on('error', sass.logError))
    .pipe(preprocess({context: context}))
    .pipe(cleanCSS({keepSpecialComments: 0}))
    .pipe(gulp.dest(DIST.CSS))
})

gulp.task('gulpWatch', function () {
  gulp.watch(SRC.sassWatch, ['sass-dev'])
  gulp.watch(SRC.THEME, ['processTHEME'])
  if (_INCLUDE_EDITOR_) {
    gulp.watch(SRC.EDITOR_BUILD, ['copy-editor-files'])
    gulp.watch(SRC.EDITOR_CONFIG, ['copyEditorConfigFiles'])
  }
})

gulp.task('copy-editor-files', function () {
  if (!_INCLUDE_EDITOR_) return
  return gulp.src(SRC.EDITOR_BUILD)
    .pipe(plumber())
    .pipe(gulp.dest(DIST.EDITOR_BUILD))
})

gulp.task('buildJS', function () {
  return gulp.src(SRC.ENTRY_POINT)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(DIST.JS));
})

gulp.task('processDocsIndex', function () {
  const indexSrc = fs.readFileSync(SRC.DOCS_INDEX, 'utf8')
  const $ = cheerio.load(indexSrc)

  const contentList = $('#content-list')

  $('h3').each((index, element) => {
    const text = $(element).text()
    const id = `topic_${index}`

    $(element).attr('id', id)

    contentList.append(`<a href="#${id}">${text}</a>\n`)
  })

  const data = beautify($.html(), {indent_size: 2, 'wrap_line_length': 100})

  fs.writeFileSync(DIST.DOCS_INDEX, data, 'utf8')
})

gulp.task('gulpWatchDocsIndex', function () {
  gulp.watch(SRC.DOCS_INDEX, ['processDocsIndex'])
})

gulp.task('dev', function (callback) {
  runSequence.apply(this, ['setNodeEnv-dev', 'clean', 'processTHEME', 'copyEditorConfigFiles',
    'copy-editor-files', 'copyFonts', 'copyCSSFiles', 'copyImages', 'create-styles.scss', 'sass-dev',
    'gulpWatch', 'buildJS', callback])
})

gulp.task('production', function (callback) {
  runSequence.apply(this, ['setNodeEnv-production', 'clean', 'processTHEME', 'copyEditorConfigFiles',
    'copy-editor-files', 'copyFonts', 'copyCSSFiles', 'copyImages', 'create-styles.scss',
    'sass-production', 'buildJS', callback])
})

gulp.task('publish:docs', function (callback) {
  runSequence.apply(this, ['processDocsIndex', callback])
})

gulp.task('dev:docs', function (callback) {
  runSequence.apply(this, ['processDocsIndex', 'gulpWatchDocsIndex', callback])
})