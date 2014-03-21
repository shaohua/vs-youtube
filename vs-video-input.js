/* requires document, window */
(function(document, window) {
  /*
   * window.Versal
   */
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var template = doc.querySelector('template').innerHTML;

  var VsVideoInputProto = {
    createdCallback: function(){
      console.log('createdCallback');
      this.render();

      this.addEventListener('input', function(){
        this.setAttribute('videoid', '123');
      }.bind(this));
    },

    attachedCallback: function(){
      console.log('attachedCallback');
    },

    attributeChangedCallback: function(name){
      console.log('attributeChangedCallback', name);
      if(name === 'videoid') {
        //should trigger event
      }
    },

    render: function(){
      this.innerHTML = template;
    }
  };

  window.Versal.registerElement('vs-video-input', VsVideoInputProto);
})(document, window);
