'use strict'

const configs = require('./configs')

function getConfig() {

  const version = '0.0.2'

// defined this way to control order in easy way
  const customViews = {
    cover: {
      name: 'Blog cover',
      ids: ['desc-images', 'blog-cover-options', 'blog-cover-url']
    },
    logo: {
      name: 'Logo',
      ids: ['Center', 'logo-size', 'desc-images', 'blog-logo-img']
    },
    layout: {
      name: 'Layout',
      ids: ['asidePosition']
    },
    background: {
      name: 'Background',
      ids: ['Top line', 'top-line-color', 'BG Image', 'body-bg', 'BG Gradient', 'bg-gradient',
        'bg-gradient-opacity', 'BG TOP Gradient', 'bg-gradient-top']
    },
    tags: {
      name: 'Tags',
      ids: ['tags', 'tags-font', 'tags-color', 'tags-color-hover']
    },
    featured: {
      name: 'Featured icon',
      ids: ['featured-icon', 'featured-icon-color']
    },
    panels: {
      name: 'Panels',
      ids: ['panel', 'panelPadding', 'postImgPadding', 'panel-border', 'panel-border-settings', 'sideNavPadding',
        'smallPanelDesc', 'panelSmallImgPadding', 'panelSmallPadding']
    },
    headers: {
      name: 'Headers',
      ids: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    }
  }

  const input = [
    {
      selector: 'body',
      desc: 'Body',
      styles: {
        'font-family': 'Merriweather, sans-serif',
        'font-size': '16px'
      }
    },
    {
      desc: 'Headers',
      selector: 'h1, h2, h3, h4, h5, h6',
      styles: {
        'font-family': 'Merriweather, sans-serif',
        'font-weight': 700
      }
    },
    {
      selector: '.post-related',
      desc: 'Previous/Next post',
      styles: {
        'font-size': '16px'
      }
    },
    {
      selector: 'body, a, a:hover',
      desc: 'Text',
      styles: {
        'color': '#454545'
      }
    },
    {
      desc: 'Main accent',
      selector: '.style-1, a.style-1, a.style-1:hover',
      styles: {
        'background-color': '#ff0000',
        'color': '#ffffff'
      }
    },
    {
      selector: 'body',
      id: 'body-bg',
      desc: 'Body',
      when: {
        'BG Image': false
      },
      styles: {
        'background-color': '#ffffff'
      }
    },
    {
      desc: 'Post title (link)',
      selector: '.post .post-title a',
      styles: {
        'color': '#393939'
      }
    },
    {
      desc: 'Post title :hover (link)',
      selector: '.post .post-title a:hover',
      styles: {
        'color': '#393939'
      }
    },
    {
      desc: 'Post text links',
      selector: '.post a',
      styles: {
        'color': '#393939'
      }
    },
    {
      desc: 'Post text links :hover',
      selector: '.post a:hover',
      styles: {
        'color': '#393939'
      }
    },
    {
      desc: 'Tags',
      id: 'tags-color',
      selector: '.style-2, a.style-2',
      styles: {
        'background-color': '#6D6F6D',
        'color': '#ffffff'
      }
    },
    {
      desc: 'Top nav :hover icon',
      selector: '.style-3',
      styles: {
        'color': '#FF0000'
      }
    },
    {
      desc: 'Top nav color',
      selector: '#main-nav a, #main-nav i, #nav-mobile-open',
      styles: {
        'color': '#ffffff'
      }
    },
    {
      desc: 'Main nav - mobile',
      media: {
        'max-width': 1069
      },
      selector: '#main-nav',
      styles: {
        'background-color': '#3e3e3e'
      }
    },
    {
      desc: 'BG gradient',
      id: 'bg-gradient',
      when: {
        'BG Gradient': true,
      },
      selector: '#bg-gradient',
      styles: {
        'background': {
          values: {
            colorA: {type: 'color', value: '#FF6100'},
            colorB: {type: 'color', value: '#993D00'},
            colorC: {type: 'color', value: '#000000'},
          },
          template: 'radial-gradient(circle at 1.98% 74.00%, {colorA}, transparent 100%),radial-gradient(circle at 98.02% 99.05%, {colorB}, transparent 100%),radial-gradient(circle at 50% 50%, {colorC}, {colorC} 100%)'
        }
      }
    },
    {
      desc: 'BG gradient opacity',
      id: 'bg-gradient-opacity',
      when: {
        'BG Gradient': true,
      },
      selector: '#bg-gradient',
      styles: {
        opacity: 0.5
      }
    },
    {
      desc: {
        default: 'Top gradient',
        height: 'Size (%)'
      },
      selector: '#bg-gradient-top',
      id: 'bg-gradient-top',
      when: {
        'BG TOP Gradient': true
      },
      styles: {
        background: {
          values: {
            colorA: {type: 'color', value: '#000000'}
          },
          template: 'linear-gradient(to bottom, {colorA} 0%, rgba(0,0,0,0) 100%)'
        },
        height: '50%'
      }
    },
    {
      desc: 'Related post',
      selector: '.style-4-child',
      styles: {
        'background-color': '#000000',
        'color': '#ffffff'
      }
    },
    {
      desc: 'Related post :hover',
      selector: '.style-4:hover .style-4-child',
      styles: {
        'background-color': '#ff0000'
      }
    },
    {
      desc: 'Footer',
      selector: '.style-6',
      styles: {
        'color': '#ffffff',
        'background-color': '#000000'
      }
    },
    {
      desc: 'Footer links, social icons',
      selector: '.style-6 a, .style-6 a:hover, .style-6 #social-icons',
      styles: {
        'color': '#a8a8a8',
      }
    },
    {
      desc: 'color',
      id: 'featured-icon-color',
      selector: '.style-7',
      styles: {
        'color': '#FF0000'
      }
    },
    {
      desc: 'Pagination',
      selector: '.btn-pagination',
      styles: {
        'color': '#ffffff',
        'background-color': '#000000'
      }
    },
    {
      desc: 'Pagination hover',
      selector: '.btn-pagination:hover',
      styles: {
        'color': '#ffffff',
        'background-color': '#000000'
      }
    },
    {
      id: 'tags-font',
      desc: 'Font size',
      selector: '.post-tags',
      styles: {
        'font-size': '14px'
      }
    },
    {
      desc: 'Main nav',
      selector: '#main-nav',
      styles: {
        'font-size': '18px',
        'font-family': 'Merriweather, sans-serif',
      }
    },
    {
      desc: 'Pagination',
      selector: '#pagination ',
      styles: {
        'font-size': '14px'
      }
    },
    {
      desc: 'Side nav',
      selector: '#side-nav ',
      styles: {
        'font-size': '14px'
      }
    },
    {
      id: 'featured',
      selector: '.fa-featured:before',
      styles: {}
    },
    {
      id: 'bg-img',
      selector: '#bg-img',
      styles: {
        'display': 'none'
      }
    },
    {
      id: 'blog-cover',
      excludeFromFinalCSS: true,
      selector: '#bg-img',
      styles: {}
    },
    {
      desc: 'Size',
      id: 'logo-size',
      selector: '#blog-logo-img',
      styles: {
        'width': '200px'
      }
    },
    {
      id: 'nav-wrapper',
      selector: '#nav-wrapper',
      styles: {}
    },
    {
      id: 'top',
      selector: '#top',
      styles: {}
    },
    {
      selector: '.panel, #pagination-wrapper',
      id: 'panel-border-settings',
      desc: 'Panel border',
      when: {
        'panel-border': true
      },
      styles: {
        border: {
          values: {
            borderWidth: {type: 'slider', value: 3, format: 'px'},
            colorA: {type: 'colorPicker', value: '#ff0000'}
          },
          template: '{borderWidth} solid {colorA}'
        }
      }
    },
    {
      selector: '.post-tags a',
      id: 'tags',
      desc: 'Border radius',
      styles: {
        'border-radius': '15px'
      }
    },
    {
      selector: '.post-panel, .panel',
      id: 'panel',
      styles: {}
    },
    {
      selector: ' .post-img-wrapper',
      id: 'img-wrapper',
      styles: {}
    },
    {
      selector: '.panel.small',
      id: 'panel-small',
      styles: {}
    },
    {
      selector: '.panel.small .post-img-wrapper',
      id: 'panel-small-img-wrapper',
      styles: {}
    },
    {
      selector: '#side-nav',
      id: 'side-nav',
      styles: {}
    },
    {
      selector: 'form button',
      desc: 'Form button',
      styles: {
        'color': '#ffffff',
        'background-color': '#000000'
      }
    },
    {
      selector: 'form button:hover',
      desc: 'Form button:hover',
      styles: {
        'color': '#ffffff',
        'background-color': '#000000'
      }
    },
    {
      selector: '#blog-info, #side-nav',
      id: 'side-nav-padding',
      desc: 'Side nav padding',
      styles: {}
    },
    {
      selector: 'h1',
      id: 'h1',
      desc: 'H1',
      styles: {
        'font-size': '38px'
      }
    },
    {
      selector: 'h2',
      id: 'h2',
      desc: 'H2',
      styles: {
        'font-size': '30px'
      }
    },

    {
      selector: 'h3',
      id: 'h3',
      desc: 'H3',
      styles: {
        'font-size': '24px'
      }
    },
    {
      selector: 'h4',
      id: 'h4',
      desc: 'H4',
      styles: {
        'font-size': '22px'
      }
    },
    {
      selector: 'h5',
      id: 'h5',
      desc: 'H5',
      styles: {
        'font-size': '20px'
      }
    },
    {
      selector: 'h6',
      id: 'h6',
      desc: 'H6',
      styles: {
        'font-size': '18px'
      }
    },
    {
      selector: '#layout-wrapper',
      id: 'layout-wrapper',
      styles: {}
    },
    {
      selector: '#top-line',
      id: 'top-line',
      styles: {
        display: 'block',
      }
    },
    {
      selector: '#top-line',
      id: 'top-line-color',
      desc: {
        'background-color': 'Top line color'
      },
      when: {
        'Top line': true
      },
      styles: {
        'background-color': '#ff0000'
      }
    },
    {
      desc: 'Tags:hover',
      id: 'tags-color-hover',
      selector: 'a.style-2:hover',
      styles: {
        'background-color': '#5c5e5c',
        'color': '#ffffff'
      }
    },
  ]


  const options = {
    'blog-cover-options': {
      type: 'imgSelect',
      model: 'blog-cover',
      options: [
        {value: '/assets/editor/images/img1.jpg', preview: '/assets/editor/images/img1_m.jpg'},
        {value: '/assets/editor/images/img2.jpg', preview: '/assets/editor/images/img2_m.jpg'},
        {value: '/assets/editor/images/img3.jpg', preview: '/assets/editor/images/img3_m.jpg'},
        {value: '/assets/editor/images/img4.jpg', preview: '/assets/editor/images/img4_m.jpg'},
        {value: '/assets/editor/images/img5.jpg', preview: '/assets/editor/images/img5_m.jpg'},
        {value: '/assets/editor/images/img6.jpg', preview: '/assets/editor/images/img6_m.jpg'},
        {value: '/assets/editor/images/img7.jpg', preview: '/assets/editor/images/img7_m.jpg'},
        {value: '/assets/editor/images/img8.jpg', preview: '/assets/editor/images/img8_m.jpg'},
        {value: '/assets/editor/images/img9.jpg', preview: '/assets/editor/images/img9_m.jpg'},
        {value: '/assets/editor/images/img10.jpg', preview: '/assets/editor/images/img10_m.jpg'},
        {value: '/assets/editor/images/img11.jpg', preview: '/assets/editor/images/img11_m.jpg'},
        {value: '/assets/editor/images/img12.jpg', preview: '/assets/editor/images/img12_m.jpg'},
        {value: '/assets/editor/images/img13.jpg', preview: '/assets/editor/images/img13_m.jpg'},
        {value: '/assets/editor/images/img14.jpg', preview: '/assets/editor/images/img14_m.jpg'},
        {value: '/assets/editor/images/img15.jpg', preview: '/assets/editor/images/img15_m.jpg'}],

    },

    'blog-cover-url': {
      type: 'textInput',
      model: 'blog-cover',
      desc: 'Custom IMG URL',
    },

    'blog-cover': {
      defaultValue: '/assets/editor/images/img12.jpg',
      handler: function (value) {
        this.set('blog-cover', 'background-image', value)
        $('#blog-cover').attr('src', value)
      }
    },


    'blog-logo-img': {
      desc: 'Blog logo',
      type: 'imgSelect',
      defaultValue: '/assets/editor/images/logo2-white.svg',
      options: [
        {value: '/assets/editor/images/logo-white.svg', preview: '/assets/editor/images/logo-white.svg'},
        {value: '/assets/editor/images/logo-black.svg', preview: '/assets/editor/images/logo-black.svg'},
        {value: '/assets/editor/images/logo2-white.svg', preview: '/assets/editor/images/logo2-white.svg'},
        {value: '/assets/editor/images/logo2-black.svg', preview: '/assets/editor/images/logo2-black.svg'}],
      handler: function (value) {
        $('#blog-logo-img').attr('src', value)
      }
    },

    'featured-icon': {
      type: 'faSelect',
      defaultValue: '"\\f005"',
      options: [
        {name: 'rocket', value: '"\\f135"'},
        {name: 'star', value: '"\\f005"'},
        {name: 'heart', value: '"\\f004"'}],
      handler: function (value) {
        this.set('featured', 'content', value)
      }
    },

    'BG Image': {
      desc: 'Blog cover as BG',
      defaultValue: true,
      handler: function (value) {
        const cssValue = value ? 'block' : 'none'
        this.set('bg-img', 'display', cssValue)
      }
    },

    'BG Gradient': {
      defaultValue: true,
      handler: function (value) {
        const cssValue = value ? 'block' : 'none'
        this.set('bg-gradient', 'display', cssValue)
      }
    },

    'BG TOP Gradient': {
      defaultValue: true,
      handler: function (value) {
        const cssValue = value ? 'block' : 'none'
        this.set('bg-gradient-top', 'display', cssValue)
      }
    },

    'Top line': {
      defaultValue: true,
      handler: function (value) {
        const cssValue = value ? 'block' : 'none'
        this.set('top-line', 'display', cssValue)
      }
    },

    'panel-border': {
      defaultValue: false,
      handler: function (value) {
        if (value === false) {
          this.set('panel-border-settings', ['border', 'values', 'borderWidth', 'value'], 0)
        }
      }
    },

    'Center': {
      defaultValue: true,
      handler: function (value) {

        if (value) {
          this.set('nav-wrapper', 'flex', '100%')
          this.set('nav-wrapper', 'text-align', 'center')
          this.set('top', 'justify-content', 'center')
        } else {
          this.set('nav-wrapper', 'flex', '1')
          this.set('nav-wrapper', 'text-align', 'left')
          this.set('top', 'justify-content', 'flex-start')
        }
      }
    },

    'asidePosition': {
      desc: 'Aside position',
      type: 'multiToggle',
      defaultValue: 'left',
      options: [
        {name: 'left', value: 'left'},
        {name: 'right', value: 'right'}],
      handler: function (value) {
        if (value === 'left') {
          this.set('layout-wrapper', 'flex-direction', 'row-reverse')
        } else {
          this.set('layout-wrapper', 'flex-direction', 'row')
        }
      }
    },


    'panelPadding': {
      defaultValue: 40,
      desc: 'Panel padding',
      type: 'slider',
      settings: {min: 20, max: 60, step: 1},
      handler: function (value) {

        let panelPadding = value + 'px ' + value + 'px ' + (value + 10) + 'px ' + value + 'px '

        const imgMargin = calcImgMargin(this.optionsValues.postImgPadding, value)

        this.set('panel', 'padding', panelPadding)
        this.set('img-wrapper', 'margin', imgMargin)

      }
    },

    'postImgPadding': {
      defaultValue: 0,
      desc: 'Post main IMG padding',
      type: 'slider',
      settings: {min: 0, max: 60, step: 1},
      handler: function (value) {

        const imgMargin = calcImgMargin(value, this.optionsValues.panelPadding)

        this.set('img-wrapper', 'margin', imgMargin)

      }
    },

    'panelSmallPadding': {
      defaultValue: 30,
      desc: 'Small panel padding',
      type: 'slider',
      settings: {min: 10, max: 60, step: 1},
      handler: function (value) {

        let panelPadding = value + 'px ' + value + 'px ' + (value + 10) + 'px ' + value + 'px '

        const imgMargin = calcImgMargin(this.optionsValues.panelSmallImgPadding, value)

        this.set('panel-small', 'padding', panelPadding)
        this.set('panel-small-img-wrapper', 'margin', imgMargin)

      }
    },

    'panelSmallImgPadding': {
      defaultValue: 10,
      desc: 'Small panel IMG padding',
      type: 'slider',
      settings: {min: 0, max: 60, step: 1},
      handler: function (value) {

        const imgMargin = calcImgMargin(value, this.optionsValues.panelSmallPadding)

        this.set('panel-small-img-wrapper', 'margin', imgMargin)

      }
    },

    'sideNavPadding': {
      defaultValue: 40,
      desc: 'Side NAV padding',
      type: 'slider',
      settings: {min: 10, max: 60, step: 1},
      handler: function (value) {
        let panelPadding = value + 'px ' + value + 'px ' + (value + 10) + 'px ' + value + 'px '
        this.set('side-nav-padding', 'padding', panelPadding)
      }
    },


  }

  function calcImgMargin(imgPadding, panelPadding) {

    let imgVal
    let imgMargin

    if (panelPadding < imgPadding) {
      imgVal = imgPadding - panelPadding
      imgMargin = imgVal + 'px ' + imgVal + 'px ' + 0 + 'px ' + imgVal + 'px '
    } else {
      imgVal = panelPadding - imgPadding
      imgMargin = '-' + imgVal + 'px ' + '-' + imgVal + 'px ' + 0 + 'px ' + '-' + imgVal + 'px '
    }

    return imgMargin
  }

  const elements = {
    'desc-images': {
      type: 'p',
      value: 'Blog cover and logo have to be uploaded in your Ghost admin panel. Here you can switch between some options to visualise your style.'
    },
    'smallPanelDesc': {
      type: 'p',
      value: 'Small panels are used for related posts'
    },
  }


  return {
    version: version,
    input: input,
    options: options,
    customViews: customViews,
    elements: elements,
    configs: configs
  }
}

if (window.initEditor) {
  window.initEditor(getConfig(), function () {
    setTimeout(function () {
      $('#editor-loader').fadeOut(300)
    }, 50)
  })
}
