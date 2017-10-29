import del from 'del'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'
import runSequence from 'run-sequence'

const p = gulpLoadPlugins()
const files = {
  js: ['./src/**/*.js'],
  other: ['./src/**/*.png', './src/**/*.jpg', './src/**/*.html', './src/**/*.json']
}

gulp.task('rm', () =>
  del(['dist/**', '!dist'])
)

gulp.task('cp', () =>
  gulp.src(files.other, { base: './src' })
    .pipe(p.newer('dist'))
    .pipe(gulp.dest('dist'))
)

gulp.task('babel', () =>
  gulp.src(files.js, { base: './src' })
    .pipe(p.newer('dist'))
    .pipe(p.babel())
    .pipe(gulp.dest('dist'))
)

gulp.task('nodemon', ['cp', 'babel'], () =>
  p.nodemon({
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    script: path.join('tests', 'main.js'),
    tasks: ['cp', 'babel']
  })
)

gulp.task('test', ['rm'], () => runSequence('nodemon'))
gulp.task('build', ['rm'], () => runSequence(['cp', 'babel']))
