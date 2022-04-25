const pug = require("gulp-pug");
const sass = require("gulp-sass")(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const browser = require("browser-sync");
const del = require("del");
const {
    src,
    parallel,
    series,
    watch,
    task,
    dest
} = require("gulp");
task("clear:build", () => {
    return del("./build")
});
task("pug", (callback) => {
    return src("./src/pug/layout/*.pug")
        .pipe(pug({
            pretty: true
        })).pipe(dest("./build/"))
    callback();
});
task("css", (callback) => {
    return src("./src/css/*.css").pipe(dest("./build/css"));
    callback();
});
task("sass", (callback) => {
    return src("./src/sass/*.sass").pipe(sass()).pipe(dest("./build/css"));
    callback();
});
task("copy:sass", (callback) => {
    return src("./src/sass/**/*.*").pipe(dest("./build/sass"));
    callback();
});
task("libs", () => {
    return src("./src/libs/**/*.*").pipe(dest("./build/libs"))
});
task("img", () => {
    return src("./src/img/**/*.*").pipe(dest("./build/img"))
});
task("video", (callback) => {
    return src("./src/video/**/*.*").pipe(dest("./build/video"));
    callback()
});
task("audio", () => {
    return src("./src/audio/**/*.*").pipe(dest("./build/audio"))
});
task("js", () => {
    return src("./src/js/**/*.*").pipe(dest("./build/js"))
});
task("watch", () => {
    watch("./src/sass/**/*.sass", parallel("sass"));
    watch("./src/css/**/*.css", parallel("css"));
    watch("./src/sass/**/*.sass", parallel("copy:sass"));
    watch("./src/pug/**/*.pug", parallel("pug"))
    watch("./src/libs/**/*.*", parallel("libs"));
    watch("./src/img/**/*.*", parallel("img"));
    watch("./src/video/**/*.*", parallel("video"));
    watch("./src/audio/**/*.*", parallel("audio"));
    watch("./src/js/**/*.*", parallel("js"));
});
task("default", series("clear:build",
    parallel("copy:sass", "sass", "pug", "js"),
    parallel("watch", "css", "libs", "img", "audio", "video")
));