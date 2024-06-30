const commonConfig = require('../../gulpfile');
const gulp = require('gulp');
const { resolve } = require('path')
const fsGlob = require('fast-glob')
const fsExtra = require('fs-extra')
const grayMaster = require('gray-matter')

async function generateMeta() {

    const srcset = ['src/use*']

    const functions = srcset.map(src => fsGlob.sync(src, { onlyDirectories: true }).map(hook => {
        const name = hook.replace(/(..\/ahooks\/)|(src\/)/g, '')
        const docURI = `https://next-version-taro-hooks.vercel.app/site/hooks/${name}`
        const mdFileURI = resolve(__dirname, hook, 'index.md')
        let descriptionMd = name
        if (fsExtra.existsSync(mdFileURI)) {
            descriptionMd = fsExtra.readFileSync(mdFileURI, 'utf8')
        }
        const { content } = grayMaster(descriptionMd)
        let description = ((content.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || '').trim()
        description = description.charAt(0).toLowerCase() + description.slice(1);
        return {
            name,
            docs: docURI,
            description
        }
    })).flat().sort((a, b) => a.name.localeCompare(b.name))

    return {
        functions
    }
}

gulp.task('metadata', async function () {
    const metadata = await generateMeta()
    await fsExtra.writeJSON('metadata.json', metadata, { spaces: 2 })
})

exports.default = gulp.series(commonConfig.default, 'metadata');
