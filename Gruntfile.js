module.exports = function(grunt) {

  // подключаем плагин load-grunt-tasks, чтобы не перечислять все прочие плагины
  require('load-grunt-tasks')(grunt);

  // описываем те задачи, которые планируем использовать
  grunt.initConfig({

    // компилируем препроцессор
    less: {
      style: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
        },
        files: {
          // в какой файл, из какого файла
          'build/css/style.css': ['src/less/style.less']
        },
      }
    },

    // обрабатываем postcss-ом (там только autoprefixer, на самом деле)
    postcss: {
      options: {
        processors: [
          // автопрефиксер и его настройки
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        // какие файлы обрабатывать (все .css в указанной папке)
        src: "build/css/*.css"
      }
    },

    // объединяем медиавыражения
    cmq: {
      style: {
        files: {
          // в какой файл, из какого файла (тут они совпадают)
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    // минимизируем стилевые файлы
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          // в какой папке брать исходники
          cwd: 'build/css',
          // какие файлы (ЛЮБОЕ_ИМЯ.css, но не ЛЮБОЕ_ИМЯ.min.css)
          src: ['*.css', '!*.min.css'],
          // в какую папку писать результат
          dest: 'build/css',
          // какое расширение дать результатам обработки
          ext: '.min.css'
        }]
      }
    },

    concat: {
      start: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/owl.carousel/dist/owl.carousel.min.js',
          'bower_components/jquery-form-validator/form-validator/jquery.form-validator.min.js',
          'bower_components/fancybox/source/jquery.fancybox.pack.js',
          'src/js/script.js'
        ],
        dest: 'build/js/script.js'
      }
    },

    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    clean: {
      build: [
        'build/css',
        'build/img',
        'build/js',
        'build/*.html',
        'build/*.ico',
      ]
    },

    // процесс копирования
    copy: {
      // копируем картинки
      img: {
        expand: true,
        // откуда
        cwd: 'src/img/',
        // какие файлы
        src: ['content/*.{png,jpg,gif,svg}','*.{png,jpg,gif,svg}','bower_components/fancybox/source/*.{png,jpg,gif,svg}'],
        // куда
        dest: 'build/img/',
      },
    },

    // оптимизируем изображения
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/**/*.{png,jpg,gif,svg}']
        }]
      }
    },

    // собираем изображения в спрайт
    sprite:{
      all: {
        src: 'src/img/sprites/*.png',
        dest: './build/img/sprite.png',
        destCss: 'src/less/blocks/sprite.less',
        algorithm: 'binary-tree'
      }
    },

    // обрабатываем разметку (инклуды)
    includereplace: {
      html: {
        expand: true,
        // откуда брать исходные файлы
        cwd: 'src/',
        // какие файлы обрабатывать
        src: '*.html',
        // куда писать результат обработки
        dest: 'build/',
        // откуда инклюдить файлы
        includesDir: '_html_include/'
      }
    },

    // слежение за файлами
    watch: {
      // перезагрузка? да, детка!
      livereload: {
        options: { livereload: true },
        files: ['build/**/*'],
      },
      // следить за стилями
      style: {
        // за сохранением каких файлов следить
        files: ['src/less/**/*.less'],
        // какую задачу при этом запускать (сами задачи — см. ниже)
        tasks: ['style'],
        options: {
          spawn: false,
        },
      },
      // следить за картинками
      images: {
        // за сохранением каких файлов следить
        files: ['src/img/content/**/*.{png,jpg,gif,svg}'],
        // какую задачу при этом запускать (сами задачи — см. ниже)
        tasks: ['img'],
        options: {
          spawn: false
        },
      },
      // следить за файлами разметки
      html: {
        // за сохранением каких файлов следить
        files: ['src/*.html', 'src/_html_inc/*.html'],
        // какую задачу при этом запускать (указан сам процесс)
        tasks: ['includereplace:html'],
        options: {
          spawn: false
        },
      },
      scripts: {
        files: ['src/js/script.js'],
        tasks: ['js'],
        options: {
          spawn: false
        },
      },
    },

    // локальный сервер, автообновление
    browserSync: {
      dev: {
        bsFiles: {
          // за изменением каких файлов следить для автообновления локального сервера
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            // корень сервера
            baseDir: "build/",
          },
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });



  // задача по умолчанию
  grunt.registerTask('default', [
    'style',
    'img',
    'js',
    'includereplace:html',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'style',
    'js',
    'img',
    'includereplace:html',
  ]);

  grunt.registerTask('js', [
    'concat',
    'uglify',
  ]);

  // только компиляция стилей
  grunt.registerTask('style', [
    'less',
    'postcss',
    'cmq',
    'cssmin',
  ]);

  // только обработка картинок
  grunt.registerTask('img', [
    'sprite',
    'copy:img',
    'imagemin'
  ]);

};
