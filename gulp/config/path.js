//получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // путь к папке с результатом
const srcFolder = `./src`; // путь к исходникам

export const path = {
    build: {
        html: `${srcFolder}/`,
        files: `${buildFolder}/files/`
    },
    src: {
        html: `${srcFolder}/files/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    }, // за какими папками надо следить
    clean: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}

