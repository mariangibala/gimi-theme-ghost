'use strict';

const $ = require('jquery')
const $window = $(window)

if (window) window.$ = $ // expose $

if (_DEBUG_) {
  //console.log('Theme JS loaded')
 // console.log('$: ', $)
}

$(document).ready(()=>{
  if (_DEBUG_) console.log('document ready')
})

function closeMobileMenu(){
  $('#nav-wrapper').removeClass('visible')
  $('#fog').removeClass('visible')
}

function openMobileMenu(){
  $('#nav-wrapper').addClass('visible')
  $('#fog').addClass('visible')
}

$window.on('load', ()=> {

  if (_DEBUG_) console.log('window loaded')

  $('#go-to-top-icon').on('click', function (e) {
    e.preventDefault()
    $('body, html').animate({'scrollTop': 0})
  })

  $('#nav-mobile-open').on('click', openMobileMenu)

  $('#fog').on('click', closeMobileMenu)
  $('#nav-mobile-close').on('click', closeMobileMenu)

})

if (_INCLUDE_EDITOR_) {
  require('./editor/config')
}
