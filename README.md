# gulp Notes
> 使用gulp构建快速开发的项目

## Basic process


# 基本流程
0. 全局安装gulp: npm install --global gulp-cli
1. 新建一个项目目录:  npx mkdir my-project
2. 进入目录：         cd my-project
3. 初始化package.json 配置文件: npm init
4. 本地再次安装gulp (全局是要用gulp命令，本地项目安装是项目编译要用)： npm install gulp --save-dev
    - --save   将这个文件，安装到本地的当前文件夹
    - -dev     将安装gulp的信息保存在package.json里面
5. 在根目录下创建 gulpfile.js 配置文件：
    ``` bash
    前端开发过程中，针对开发环境和生产环境配置往往不同：

    开发环境：起本地服务，支持调试，热更新。

    生产环境：压缩合并代码用于部署线上环境。

    所需插件：
        del：清空目录
        gulp-eslint：eslint代码检测
        gulp-babel：babel转换，将es6代码转为es5
        gulp-concat：合并文件
        gulp-uglify：js压缩
        gulp-sass：sass编译
        gulp-clean-css：css压缩
        gulp-htmlmin：html压缩
        gulp-imagemin：图片压缩
        gulp-connect：起server服务调试
    安装第三方插件的步骤:
        1. 先下载插件到本地
        2. require() 引入文件
        3. 查阅插件使用方法。
    ```


        /*  gulp固定语法规范 「commonJS规范」
         *    意思是：
         *        1. require()  将这个模块引入
         *        2. 使用这个模块上的函数
         *
         *    gulp的几个方法:
         *        1. gulp.src()        找到源文件路径
         *        2. gulp.dest()       找到目标文件路径 [注] 如果目标路径不存在，则自动创建
         *        3. pipe()            理解程序运行管理
         *
        */


        /* 
         *   可以多写一个任务 分【开发环境】和【生产环境】
         *
         *   // dev任务，启动开发环境
         *   // 注意：gulp4 中前置任务使用 series 和 parallel;
         *   gulp.task('dev', gulp.series(gulp.parallel('任务一名字', '任务二名字')));
         *
         *   // build任务，用于生产环境下打包压缩源代码
         *   gulp.task('build', gulp.series('clean', gulp.parallel('html:build', 'js:build', 'css:build', 'image:build')))
         *
        */


    ```
6. gulp
## Project Structure
```
·
|——package.json
|——gulpfile.js               // 专门给gulp编写任务的文件

```

### 参见指令

- gulp --tasks    
    - 查看目录结构
- gulp.src(globs[, options])
    - 读取并输出所有与给定的 glob（文件匹配符）或 glob 数组相匹配的文件。返回一个 Vinyl 文件 的流（stream），以便通过管道传送（pipe）给插件处理。
- gulp.dest(path[, options])
    - 接收 pipe 来的数据，并写入文件。它会重新输出所有数据，因此你可以将数据 pipe 到多个文件夹。指定的文件夹如果还不存在，将会被自动创建。
- gulp.series(…tasks)
    - 接受多个任务名或任务函数，返回这些任务或函数组合之后形成一个函数。各项任务会等待它前面的任务完成后再运行。只要有一个错误发生，所有任务的运行都将结束。
- gulp.watch(globs[, options], fn)
    - 第一个参数 globs 用于指定文件系统中的哪些文件会被监视；接下来的 options 参数是可选的，用于配置监视器；最后的 fn 参数是当文件变动时调用的任务函数。
    - gulp.watch('js/**/*.js', gulp.parallel('concat', 'uglify'));
- gulp.tree(options)
    - 返回所有任务的树形结构。这个方法继承自 undertaker。

### gulp4的变化


1. task的函数写法
``` javascript
const gulp=require("gulp");
// gulp3的写法
gulp.task("task1",function () {
    console.log("aaa");
});

// gulp4使用函数封装代码块，使用exports导出任务。
function fn1(){
    console.log("aaa");
}
exports.task1=fn1;
```

2. 前置任务写法
``` javascript
/* 
    - gulp4 中前置任务使用series 和 parallel；
        · gulp.series 按照顺序执行，先完成前置任务，再执行后面函数；
        · gulp.parallel 并行执行，一起执行任务，前置任务和后面的函数是同时执行的；
*/

const gulp = require("gulp");
gulp.task("three",gulp.series("one","two",function(){
    //one --> two --> three
    console.log("three");
}));
gulp.task("three",gulp.parallel("one","two",function(){
    //one two three
    console.log("three");
}));
```

3. 任务完成状态
- 当任务完成时，要告之该任务已经完成，否则也会报错：
Did you forget to signal async completion?
``` javascript
/* 
    我们可以通过以下三种方式，告之服务器该任务已经完成：
*/

// 1. 回调函数法  done();
//    done回调函数的作用是在task完成时通知Gulp，而task里的所有其他功能都纯粹依赖Node来实现。  
const gulp = require("gulp");
gulp.task("js",function(done){
        gulp.src("./src/**/*.js")
        .pipe(load.babel(
            {
                "presets": ["@babel/env"]
            }
        ))
        .pipe(gulp.dest("./dist"))
        
        // 当完成当前任务内容后执行回调函数done，后续任务save中的function函数被执行，会打印aaaa，如果没有done，就不会执行后续任务。
        done();
})

gulp.task("save",gulp.series("js",function(){
    console.log("aaaa");
    gulp.src("./dist/**/*.js")
    .pipe(load.concat("main.min.js"))
    .pipe(load.uglify())
    .pipe(gulp.dest("./dist"));
}));


// 2. 使用 async 和 await
const gulp = require('gulp');
gulp.task('testGulp', async() => {
   await console.log('Hello World!');
});

```

4. 执行任务方式
``` javascript
// gulp3 
gulp.task('default', [task1, task2])

// gulp4
function defaultTask() {
    return series(taskFn1, taskFn2, taskFn3);  // series让任务按顺序执行    
}
exports.default = defaultTask()  //输出控制台执行任务的名称

/* 例如：exports.dev = dev();      cmd》输入  gulp dev
 *  exports.default = default();  直接输入gulp就行了。 
 */
```

5. watch和series Api
``` javascript
// gulp3
let watch = require('gulp-watch');
gulp.task('watch', () => {
    gulp.watch(['filePath1', 'filePath2'], [task1, task2]);
})

// gulp4
const { watch, series } = require('gulp');
function watchTask() {
    // 注意这里不需要使用return
    watch(['filePath1', 'filePath2'], series(taskFn1, taskFn2, taskFn3));
}
/*  在gulp4中直接引入watch即可实现任务监听功能， 不需要安装插件
 *  series也可以配合watch按顺序执行设置的任务函数
*/

```