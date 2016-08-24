Shortly.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = options.el;
  },

  routes: {
    '': 'index',
    'create': 'create',
    'submit': 'submit',
  },

  swapView: function(view) {
    this.$el.html(view.render().el);
  },

  index: function() {
    console.log('index from router');
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView({ collection: links });
    this.swapView(linksView);
  },

  create: function() {
    console.log('create from router');
    this.swapView(new Shortly.createLinkView());
  }

});
