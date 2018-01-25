;(function(global) {

    var Submarine = function(el, start) {
        return new Submarine.init(el, start);
    }

    var scroll = 0;

    Submarine.prototype = {
      stick: function(stopPoint, side) {
        // Take control of 'this' for addEventListener
        var self = this;

        // Create an empty div to act as a placeholder for the fixed element
        // Stops the Dom structure from changing
        var empty = document.createElement('div');
        // Give placeholder ID in case want to style/remove with CSS.
        empty.id = 'SM-' + self.element.id + '-placeholder';
        // Make the placeholder div disappear when actual element is static
        empty.style.display = 'none';
        // Get hold of the parent node of actual element
        var parent = self.element.parentNode;
        // Place the placeholder div after the actual element in Dom structure
        parent.insertBefore(empty, self.element);

        window.addEventListener('scroll', function(e) {
          if (self.percent > 0) { // Has the scroll reached the element?
            if (scroll < stopPoint - self.height || !stopPoint) {
              // stopPoint = a specified place in the scroll in which to unhook the sticky effect.
              // Has a stopPoint been specified? If so, account for the stop.

              // SELF SETUP
              self.element.classList.add("sub-sticky");
              self.style.position = 'fixed';
              self.style.top = 0;
              // EMPTY SETUP
              empty.style.cssText = self.style.cssText; // Copy element's CSS
              empty.style.background = 'transparent'; // Don't give a background
              empty.style.position = 'static'; // Make the element static (!fixed)
              empty.style.display = 'block'; // Make visible (!display: none)
              // RIGHT OR LEFT?
              if (side === 'right') {
                self.style.right = 0; // Place to the right;
              }

            } else {
              // Remove the sub-sticky class
              self.element.classList.remove("sub-sticky");
              // Add a new class at end of stick (possibly useful for animation)
              self.element.classList.add("sub-end-sticky");
              // Calculate the overshoot of the element baced on the element's height added to it's scroll offset
              // (Where in the scroll is the element's bottom)
              var overshoot = scroll - stopPoint + self.height;
              if (self.height >= overshoot) {
                self.style.top = '-' + overshoot + 'px';
              } else {
                self.style.top = '100%';
              }
            }
          } else {
            self.element.classList.remove("sub-sticky");
            self.element.classList.remove("sub-end-sticky");
            self.style.position = 'static';
            self.style.top = 'auto';
            empty.style.display = 'none';
          }
        });
        return this;
      },
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

    Submarine.init = function(el, start) {
        var self = this;

        var element = document.getElementById(el);

        if (!element) {
          console.log(4);
          throw new Error('No element found!');
        } else {
          console.log(element);
        }

        function setup() {
          console.log('STARTING SETUP!');
          var offsetTop = element.offsetTop;
          var addStart = start || 0;
          self.element = element;
          self.height = element.offsetHeight;
          self.scrollStart = element.scrollHeight + addStart;
          self.offsetTop = offsetTop;
          self.offsetBottom = offsetTop + self.height;
          self.start = addStart;
          self.style = element.style;
          self.offset = 0;
        }
        setup();

        function update() {
          scroll = this.scrollY;
          self.offset =  (scroll - (self.offsetTop - self.start));
          var position = self.scrollStart - (self.scrollStart - self.offset) + self.start;
          self.percent = Math.min(Math.max(position, 0), self.scrollStart) / self.scrollStart;
          self.inversePercent = 1 - self.percent;
        }

        window.addEventListener('scroll', function(e) {
          update();
        });

        window.addEventListener('resize', function(e) {
          setup();
        });

    }

    Submarine.init.prototype = Submarine.prototype;

    global.Submarine = global.SM = Submarine;

}(window));
