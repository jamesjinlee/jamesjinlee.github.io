$(function() {
  $('landing-navbar .ui.fluid.borderless.inverted.container.menu .right.aligned.item a[href^="/' + location.pathname.split("/")[1] + '"]').removeClass('aligned item');
  $('landing-navbar .ui.fluid.borderless.inverted.container.menu .right.aligned.item a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active-item aligned item');

  // Color the tab
  $( '.active-item.aligned.item' ).each(function () { this.style.setProperty( 'color', '#18bc9c', 'important' ); });
});
