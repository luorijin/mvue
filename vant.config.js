module.exports = {
  name: 'mvue',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/mvue/'
    }
  },
  site: {
    title: 'mvue',
    logo: 'http://doc.vue-js.com/images/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍'
          },
          {
            path: 'quickstart',
            title: '快速上手'
          }
        ]
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'button',
            title: 'button 按钮'
          },
          {
            path: 'popup',
            title: 'popup 弹窗'
          }
        ]
      },
      {
        title: '表单组件',
        items: [
          {
            path: 'checkbox-group',
            title: 'checkbox 复选框'
          },
          {
            path: 'picker',
            title: 'picker 选择器'
          },
          {
            path: 'datetime-picker',
            title: 'datetime-picker 日期选择器'
          }
        ]
      },
      {
        title: '展示组件',
        items: [
          {
            path: 'swipe',
            title: 'swipe 轮播切换'
          },
          {
            path: 'swipe-tab',
            title: 'swipe-tab 可滑动标签页'
          },
          {
            path: 'pull',
            title: 'pull 下拉刷新上拉加载'
          }
        ]
      },
      {
        title: '反馈组件',
        items: [
          {
            path: 'action-sheet',
            title: 'action-sheet 上拉菜单'
          },
          {
            path: 'dialog',
            title: 'dialog 弹窗框'
          },
          {
            path: 'toast',
            title: 'toast 轻提示'
          }
        ]
      }
    ]
  }
};
