const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const yargs = require('yargs');

const argv = yargs(process.argv.slice(2)).alias('isolatedModules', 'iso').argv;

const isWatch = argv.watch;
const isSkipTS = argv.skip;
const isolatedModules = argv.iso;

gulp.task('clean', async function () {
  await del('lib/**');
  await del('es/**');
});

gulp.task('cjs', function () {
  const tsConfig = {
    module: 'CommonJS',
  };
  if (isolatedModules) {
    tsConfig.isolatedModules = true;
  }
  const tsProject = ts.createProject('tsconfig.json', tsConfig);
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

gulp.task('es', function () {
  const tsConfig = {
    module: 'ESNext',
  };
  if (isolatedModules) {
    tsConfig.isolatedModules = true;
  }
  const tsProject = ts.createProject('tsconfig.json', tsConfig);
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('scss', function () {
  return gulp
    .src('src/**/*.scss')
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'ESNext',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('watch', function () {
  const tasks = ['cjs', 'es', 'scss'];
  if (!isSkipTS) {
    tasks.push('declaration');
  }
  gulp.watch(
    ['src/*', 'src/*/*', 'src/*/*/*'],
    { events: 'all', delay: 200, ignoreInitial: false, depth: 5 },
    gulp.series(...tasks),
  );
});

exports.watchSeries = gulp.series('cjs', 'es', 'scss', 'declaration');

exports.default = isWatch
  ? gulp.series('watch')
  : gulp.series('clean', 'cjs', 'es', 'scss', 'declaration');
