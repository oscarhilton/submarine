# Animation library that effects an element based on how much of the page is scrolled down / how much of the element is visible on the page.

Based off of jQuery's syntactic design (but doesn’t rely on jQuery, it is entirely my own pure javascript) an element can be selected and animated on the page where the script is loaded.

Here is an example of what you can do:

```
SM('el2').scale(1, 0.95).opacity(1, 0.8);
```

Submarine is called with `SM()` much the same way that `$()` works in jQuery. You can then chain what you want the element to do after. In the example above, as the user scrolls down the element scales down from “1” to “0.95” and sets the opacity from “1” to “0.8”. This animation works both forwards and backwards as the user scrolls.
