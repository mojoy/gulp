//получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // путь к папке с результатом
const srcFolder = `./src`; // путь к исходникам

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        videos: `${buildFolder}/video/`,
        files: `${buildFolder}/files/`
    },
    src: {
        js: `${srcFolder}/js/main.js`,
        scss: `${srcFolder}/scss/main-chuild.scss`,
        html: `${srcFolder}/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        //fonts: `${srcFolder}/fonts/**/*.*`,
        videos: `${srcFolder}/video/**/*.*`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico,webp}`,
        //fonts: `${srcFolder}/fonts/**/*.*`,
        videos: `${srcFolder}/video/**/*.*`,
        files: `${srcFolder}/files/**/*.*`,
    }, // за какими папками надо следить
    clean: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    buildFolder: buildFolder,
    ftp: `mrkp.space/`
}

