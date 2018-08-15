const gulp       = require('gulp');
const ts         = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const outDir = tsProject.config.compilerOptions.outDir;
const resolver = require('@taqtile/gulp-module-resolver');

gulp.task('build', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(resolver({ rootPath: outDir }))
    .pipe(gulp.dest(outDir));
});

gulp.task('default', ['build']);
