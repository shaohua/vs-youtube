/* requires document, window */
(function(document, window) {
  /*
   * window.Versal
   */
  var JST = {};
  var doc = (document._currentScript || document.currentScript).ownerDocument;

  JST['before'] = doc.querySelector('#before').innerHTML;

  var VsYoutubePlusProto = {
    getYoutube: function(){
      return this.querySelector('vs-youtube');
    },

    getErrorMsg: function(){
      return this.querySelector('vs-error-msg');
    },

    /**
    * a simple getter and setter for 'videoid' attribute
    */
    videoid: function(value){
      if(value){
        this.getYoutube().setAttribute('videoid', value);
      } else {
        return this.getYoutube().getAttribute('videoid');
      }
    },

    createdCallback: function(){
      console.log('createdCallback');
      this.render();
    },

    attachedCallback: function(){
      console.log('attachedCallback');
    },

    attributeChangedCallback: function(name){
      // console.log('attributeChangedCallback', name);
      if(name === 'status') {
        this.render();
      }
    },

    render: function(){
      this.innerHTML = JST['before'];
    }
  };

  window.Versal.registerElement('vs-youtube-plus', VsYoutubePlusProto);
})(document, window);
