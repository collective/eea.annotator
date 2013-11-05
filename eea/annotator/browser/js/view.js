if(window.EEA === undefined){
  var EEA = {
    who: 'eea.annotator',
    version: '1.0'
  };
}

EEA.Annotator = function(context, options){
 var self = this;
  self.context = context;

  self.settings = {
    readOnly: self.context.data('readonly') || 0,
    prefix: ''
  };

  if(options){
    jQuery.extend(self.settings, options);
  }

  self.initialize();
};

EEA.Annotator.prototype = {
  initialize: function(){
    var self = this;
    jQuery('#content-core').annotator({
      readOnly: Boolean(self.settings.readOnly)
    });
    jQuery('#content-core').annotator('addPlugin', 'Store', {
      prefix: self.settings.prefix,
      urls: {
        create:  '/annotator.storage',
        read:    '/annotator.storage/:id',
        update:  '/annotator.storage/:id',
        destroy: '/annotator.storage/:id',
        search:  '/annotator.search'
      }
    });
  }
};


jQuery.fn.EEAAnnotator = function(options){
  return this.each(function(){
    var context = jQuery(this);
    var adapter = new EEA.Annotator(context, options);
    context.data('EEAAnnotator', adapter);
  });
};

jQuery(document).ready(function(){
  var items = jQuery(".eea-annotator");
  if(!items.length){
    return;
  }

  var settings = {
    prefix: jQuery('base').attr('href')
  };

  items.EEAAnnotator(settings);
});
