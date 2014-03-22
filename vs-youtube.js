/* requires document, window */
(function(document, window) {
  /*
   * window.YT, window.onYouTubeIframeAPIReady, window.Versal
   */

  var VsYoutubeProto = {
    /**
     * a simple getter and setter for 'status' attribute
     */
    videoid: function(value){
      if(value){
        this.setAttribute('videoid', value);
      } else {
        return this.getAttribute('videoid');
      }
    },

    createdCallback: function(){
      this.setAttribute('pending', 'pending');
    },

    attachedCallback: function(){
      if(window.YT && this.getAttribute('videoid')) {
        this.removeAttribute('pending');
      }
    },

    attributeChangedCallback: function(name, old, pending){
      console.log('attributeChangedCallback', name);
      if(name === 'pending' && !pending) {
        this.launch();
      } else if(name === 'videoid') {
        this.launch();
      }
    },

    onPlayerReady: function(){
      // console.log('onPlayerReady');
    },

    onPlayerStateChange: function(event){
      /**
       * YT.PlayerState.ENDED
       * YT.PlayerState.PLAYING
       * YT.PlayerState.PAUSED
       * YT.PlayerState.BUFFERING
       * YT.PlayerState.CUED
       */
      console.log('onPlayerStateChange', event.data);
      if (event.data === window.YT.PlayerState.PLAYING) {
        // event.target.pauseVideo();
      } else if (event.data === window.YT.PlayerState.PLAYING){
        //
      }
    },

    launch: function(){
      if(this.getAttribute('videoid')) {
        var options = {
          videoId: this.getAttribute('videoid'),  //NOT a typo
          events: {
            'onReady': this.onPlayerReady.bind(this),
            'onStateChange': this.onPlayerStateChange.bind(this)
          }
        };

        // when window.YT.Player is not avaliable, wait for 1s and check again
        if(window.YT && window.YT.Player){
          this.createPlayerWithOptions(options);
        } else {
          setTimeout(function(){
            this.launch();
          }.bind(this), 1000);
        }
      }
    },

    createPlayerWithOptions: function(options){
      // If player already exists - remove it
      if(this.player) {
        this.player.destroy();
      }

      // YT API replaces the node with iframe
      var placeholder = document.createElement('div');
      this.appendChild(placeholder);

      // create a player and store the reference
      this.player = new window.YT.Player(placeholder, options);
    }
  };

  function registerYouTubeAPIOnce(){
    if(window.onYouTubeIframeAPIReady) {
      console.warn('vs-youtube: Warning! onYouTubeIframeAPIReady is already defined! '+
        'That should not be happening.');
    }

    window.onYouTubeIframeAPIReady = function(){
      resolvePendingPlayers();
    };
  }

  function resolvePendingPlayers() {
    var existing = document.querySelectorAll('vs-youtube[pending]');

    Array.prototype.forEach.call(existing, function(el) {
      // console.log(el);
      el.removeAttribute('pending');
    });
  }

  registerYouTubeAPIOnce();

  window.Versal.registerElement('vs-youtube', VsYoutubeProto);
})(document, window);
