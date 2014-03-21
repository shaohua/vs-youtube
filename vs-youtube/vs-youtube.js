(function() {
  if(window.onYouTubeIframeAPIReady) {
    console.warn('vs-youtube: Warning! onYouTubeIframeAPIReady is already defined! That should not be happening.')
  };

  var VsYoutubeProto = Object.create(HTMLElement.prototype);

  VsYoutubeProto.attachedCallback = function(){
    if(VsYoutubeProto.YT) {
      this.launch();
    } else {
      return this.setAttribute('pending', 'pending');
    };
  };

  VsYoutubeProto.attributeChangedCallback = function(name, old, pending){
    if(name == 'pending' && !pending) {
      this.launch();
    };
  };

  VsYoutubeProto.launch = function(){
    new VsYoutubeProto.YT.Player(this, {
      videoId: this.getAttribute('videoid')
    });
  };

  window.onYouTubeIframeAPIReady = function(){
    VsYoutubeProto.YT = window.YT;
    var existing = document.querySelectorAll('vs-youtube[pending]');

    Array.prototype.forEach.call(existing, function(el) {
      el.removeAttribute('pending');
    });
  };

  document.registerElement('vs-youtube', { prototype: VsYoutubeProto });
})();
