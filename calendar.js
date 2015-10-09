(function() {
  setInterval(check, 100);
  var addedStylesheet = false;
  function check() {

    var i;

    if (!addedStylesheet) {

      var rules =
        '.bce-project-link, .bce-project-link:link, .bce-project-link:visited, .bce-project-link:hover {' +
        '  display: block; text-decoration: inherit; text-align: left; font-size: 10px; padding: 2px; margin: 2px 0 0 0; border: 0; color: #2b9e2b; text-indent: 0; background-color: transparent;' +
        '}';

      var style = document.createElement('style');
      style.appendChild(document.createTextNode(rules));
      document.querySelector('head').appendChild(style);
      addedStylesheet = true;
    }

    var projectLinks = document.querySelectorAll('.Project a');
    var projects = {};
    for (i = 0; (i < projectLinks.length); i++) {
      projects[projectLinks[i].textContent] = projectLinks[i].getAttribute('href');
    }

    var titles = document.querySelectorAll('.event_label .entry_title');
    for (i = 0; (i < titles.length); i++) {
      var title = titles.item(i);
      if (title.getAttribute('data-basecamp-classic-extension')) {
        // did it already
        return;
      }
      var hint = '';
      var titleText = title.getAttribute('title');
      var project;
      if (titleText.match(/^Project: /)) {
        project = titleText.replace('Project: ', '');
        var span = closest(title, '.spanned_event');
        if (span) {
          title.textContent += ' [' + project + ']';
        } else {
          var a = document.createElement("A");
          a.textContent = project;
          if (projects[project]) {
            console.log('setting link for ' + project);
            a.setAttribute('href', projects[project]);
          }
          a.setAttribute('class', 'bce-project-link');
          var item = closest(title, '.item');
          item.appendChild(a);
        }
        title.setAttribute('data-basecamp-classic-extension', '1');
      }
    }
  }

  // http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
  function closest(elem, selector) {

      var firstChar = selector.charAt(0);

      // Get closest match
      for ( ; elem && elem !== document; elem = elem.parentNode ) {

          // If selector is a class
          if ( firstChar === '.' ) {
              if ( elem.classList.contains( selector.substr(1) ) ) {
                  return elem;
              }
          }

          // If selector is an ID
          if ( firstChar === '#' ) {
              if ( elem.id === selector.substr(1) ) {
                  return elem;
              }
          } 

          // If selector is a data attribute
          if ( firstChar === '[' ) {
              if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                  return elem;
              }
          }

          // If selector is a tag
          if ( elem.tagName.toLowerCase() === selector ) {
              return elem;
          }

      }

      return false;

  };
})();
