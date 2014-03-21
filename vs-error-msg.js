/* requires document, window */
(function(document, window) {
  /*
   * window.Versal
   */

  var statusLookup = {
    'wrong_domain': 'Wrong Domain',
    'wrong_code': 'Please specify embed code',
    'other': 'Other error msg'
  };

  var VsErrorMsgProto = {
    /**
    * a simple getter and setter for 'status' attribute
    */
    status: function(statusValue){
      if(statusValue){
        this.setAttribute('status', statusValue);
      } else {
        return this.getAttribute('status');
      }
    },

    createdCallback: function(){
      // console.log('createdCallback');
      this.render();
    },

    attachedCallback: function(){
      // console.log('attachedCallback');
    },

    attributeChangedCallback: function(name){
      // console.log('attributeChangedCallback', name);
      if(name === 'status') {
        this.render();
      }
    },

    render: function(){
      if(this.status()){
        this.innerHTML = statusLookup[this.status()];
      } else {
        this.innerHTML = statusLookup['other'];
      }
    }
  };

  window.Versal.registerElement('vs-error-msg', VsErrorMsgProto);
})(document, window);
