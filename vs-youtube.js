(function() {
  var VsYoutubeProto = {
    attachedCallback: function(){
      this.setAttribute('vs-loading', 'true');

      var placeholder = document.createElement('div');
      this.appendChild(placeholder);

      if(window.YT && window.YT.loaded) {
        this.onYoutubeApiReady();
      }
    },

    onYoutubeApiReady: function(){
      var options = {
        events: {
          'onReady': this.onPlayerReady.bind(this),
          'onStateChange': this.onPlayerStateChange.bind(this)
        }
      };

      this.player = new window.YT.Player(this.firstElementChild, options);
    },

    onPlayerReady: function(){
      this.cueCurrentVideo();
    },

    onPlayerStateChange: function(e){
    },

    cueCurrentVideo: function(){
      if(this.videoId && this.player) {
        this.player.cueVideoById(this.videoId);
        this.removeAttribute('vs-loading');
      }
    },

    attributeChangedCallback: function(name, old, current){
      if(name == 'video-id') { this.cueCurrentVideo(); }
    }
  };

  function registerYouTubeAPIOnce(){
    var script = document.createElement('script');
    script.async = true;
    script.src = '//www.youtube.com/iframe_api';

    script.onerror = function(){
      // disable whole family of gadgets and display message instead
    };

    document.head.appendChild(script);

    window.onYouTubeIframeAPIReady = function(){
      resolvePendingPlayers();
    };
  }

  function resolvePendingPlayers() {
    var existingElements = document.querySelectorAll('vs-youtube');

    Array.prototype.forEach.call(existingElements, function(elt){
      if(elt.onYoutubeApiReady) {
        elt.onYoutubeApiReady();
      }
    });
  }

  registerYouTubeAPIOnce();

  window.Versal.registerElement('vs-youtube', VsYoutubeProto);
})();
