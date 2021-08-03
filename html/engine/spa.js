const useHash = true;
var apiUrl = 'http://localhost:8000';
var routes = ['homeView'];
// const rootElem = document.getElementById("root");

// Temporary solution

var pageAssociatedReqModels = {
    '': 'homeUI',
    'homeView': 'homeUI'
};

var getPage = {
    objectModel: 'document',
    method: 'getElementById',
    arguments: 'root',
    response: 'rootElem',
    callback: {
        declare: {
            'rootElem.innerHTML': '',
            'pageReqModel': '$pageAssociatedReqModels[l.page]'
        },
        objectModel: 'ActionEngine',
        method: 'processRequest',
        arguments: '$l.pageReqModel',
        callback: {
            declare: {
                'data': {
                    'content': '$l.rootElem.innerHTML',
                    'title': '$l.page'
                },
                'title': '$l.page + " | EHH"',
                'url': '$"#"+l.page'
            },
            objectModel: 'window.history',
            method: 'pushState',
            arguments: ['$l.data', '$l.title', '$l.url']
        }
    }
};

// Solution after Integration of backend

// var getPage = {
//     declare: {
//         'url': '$apiUrl + "/" + l.page',
//         'reqParams': {
//             method: 'GET',
//             cache: 'no-cache',
//         }
//     },
//     objectModel: 'HttpService',
//     method: 'fetchRequest',
//     arguments: ['$l.url', '$l.reqParams'],
//     response: 'resp',
//     callback: {
//         declare: {
//             'data': {
//                 'content': '$l.resp.content',
//                 'title': '$l.resp.title + " | EHH"'
//             },
//             'pageUrl': '$useHash ? "#" + l.page : l.page',
//         },
//         objectModel: 'window.history',
//         method: 'pushState',
//         arguments: ['$l.data', '$l.data.title', '$l.url']
//     }
// }

/* (function(fn = function() {
    const page = useHash ?
      window.location.hash.split('#').pop() :
      window.location.href.split('/').pop();
      ActionEngine.processRequest('getPage', {
          'page': page
      })
    // get(routes.indexOf(page) >= 0 ? page : routes[0]);
  }) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  })(); */

// //////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

const useHash = true;
const apiUrl = 'https://lucasreta.com/stack-overflow/spa-vanilla-js/api';
const routes = ['section-1', 'section-2'];
const content_box = document.getElementById("content_box");

function get(page) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(xhr.responseText);
      content_box.innerHTML = data.content;
      const title = `${data.title} | App Manual`;
      window.history.pushState(
        { 'content': data.content, 'title': title},
        title,
        useHash ?
          `#${page}` :
          page
      );
    }
  };
  xhr.open('GET', `${apiUrl}/${page}`, true);
  xhr.send();
}

window.addEventListener("popstate", function(e) {
  const state = e.state;
  content_box.innerHTML = state.content;
});

const links = document.getElementsByClassName('link');
for(let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(event) {
    event.preventDefault();
    get(links[i].href.split('/').pop());
  }, false);
}

(function(fn = function() {
  const page = useHash ?
    window.location.hash.split('#').pop() :
    window.location.href.split('/').pop();
  get(routes.indexOf(page) >= 0 ? page : routes[0]);
}) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})();


*/