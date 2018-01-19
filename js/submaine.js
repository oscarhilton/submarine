;(function(global) {

    var Submaine = function(el, start) {
        return new Submaine.init(el, start);
    }

    var scroll = 0;

    Submaine.prototype = {
      opacity: function(max, min, backwards) {
        var self = this;
        window.addEventListener('scroll', function(e) {
          var amount = Math.min(Math.max(self.inversePercent, min), max);
          self.style.opacity = amount;
        });
        return this;
      },
      scale: function(max, min, backwards) {
        var self = this;
        window.addEventListener('scroll', function(e) {
          var amount = Math.min(Math.max(self.inversePercent, min), max);
          // var amount = self.inversePercent * self.offset;
          console.log(amount);
          var value = 'scale(' + amount + ')';
          self.transform(value);
        });
        return this;
      },
      move: function(start, xy) {
        var self = this;
        window.addEventListener('scroll', function(e) {
          var value = 'translate' + xy.toUpperCase() + '(' + (start - Math.floor(self.inversePercent * start)) + 'px)';
          self.transform(value);
        });
        return this;
      },
      shadow: function(max, min, colour) {
        var self = this;
        window.addEventListener('scroll', function(e) {
          self.style.boxShadow = '10px ' + Math.min(Math.max(self.percent, min), max) + 'px 20px ' + colour;
        });
        return this;
      },
      transform: function(value) {
        this.style.webkitTransform = value;
        this.style.MozTransform = value;
        this.style.msTransform = value;
        this.style.OTransform = value;
        this.style.transform = value;
        return this;
      }
    };

    Submaine.init = function(el, start) {
        var self = this;

        var element = document.getElementById(el);
        var offsetTop = element.offsetTop;

        self.scrollStart = element.scrollHeight + start;
        self.start = start;
        self.style = element.style;

        window.addEventListener('scroll', function(e) {
          scroll = this.scrollY;
          self.offset =  (scroll - (offsetTop - self.start));
          var position = self.scrollStart - (self.scrollStart - self.offset) + self.start;
          self.percent = Math.min(Math.max(position, 0), self.scrollStart) / self.scrollStart;
          self.inversePercent = 1 - self.percent;
        });

    }

    Submaine.init.prototype = Submaine.prototype;

    global.Submaine = global.SM = Submaine;

}(window));
