/* requires document, window */
(function() {

  var VsYoutubeProto = {
    createdCallback: function(){
      this.setAttribute('pending', 'pending');
    },

    attachedCallback: function(){
      if(window.YT && this.getAttribute('videoid')) {
        this.removeAttribute('pending');
      };
    },

    attributeChangedCallback: function(name, old, pending){
      if(name == 'pending' && !pending) {
        this.launch();
      } else if(name == 'videoId') {
        this.launch();
      }
    },

    launch: function(){
      if(this.getAttribute('videoId')) {
        var options = {
          videoId: this.getAttribute('videoId')
        };

        this.createPlayerWithOptions(options);
      }
    },

    createPlayerWithOptions: function(options){
      // If player already exists - remove it
      if(this.player) {
        this.player.destroy();
      };

      // YT API replaces the node with iframe
      var placeholder = document.createElement('div');
      this.appendChild(placeholder);

      // create a player and store the reference
      this.player = new window.YT.Player(placeholder, options);
    }
  };

  function registerYouTubeAPIOnce(){
    if(window.onYouTubeIframeAPIReady) {
      console.warn('vs-youtube: Warning! onYouTubeIframeAPIReady is already defined! That should not be happening.')
    };

    window.onYouTubeIframeAPIReady = function(){
      resolvePendingPlayers();
    };
  };

  function resolvePendingPlayers() {
    var existing = document.querySelectorAll('vs-youtube[pending]');

    Array.prototype.forEach.call(existing, function(el) {
      console.log(el);
      el.removeAttribute('pending');
    });
  };

  registerYouTubeAPIOnce();

  window.Versal.registerElement('vs-youtube', VsYoutubeProto);
})();
