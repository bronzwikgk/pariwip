// TODO: Global es6

//
// Sidebar
//
var uiSidebar = document.querySelector('.sidebar');
var uiSidebarBtn = document.querySelector('.sidebar-open-button .button-burger');

if (uiSidebarBtn) {
  uiSidebarBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    uiSidebar.classList.toggle('full');
    if (this.classList.contains('active')) {
      uiSidebar.style = 'left: 0;';
    } else {
      uiSidebar.style = 'left: -240px;';
    }
  });
}

//
// Navbar
//
var uiNavbarListMobile = document.querySelector('.navbar-list__wrapper');
var uiNavbarMenuMobileBtn = document.querySelector('.navbar-content .button-burger');

if (uiNavbarMenuMobileBtn) {
  uiNavbarMenuMobileBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    uiNavbarListMobile.classList.toggle('active');
  });
}

//
// Alert
//
var uiAlert = document.querySelectorAll('.alert');
var uiAlertBtnClose = document.querySelectorAll('.alert .button-close');

if (uiAlert) {
  for (var i = 0; i < uiAlertBtnClose.length; i++) {
    uiAlertBtnClose[i].onclick = function () {
      this.parentNode.parentNode.removeChild(this.parentNode);
    };
  }
}

//
// Tag
//
var uiTag = document.querySelectorAll('.ui-tag');
var uiTagBtnClose = document.querySelectorAll('.ui-tag .button-close');

if (uiTag) {
  for (var i = 0; i < uiTagBtnClose.length; i++) {
    uiTagBtnClose[i].onclick = function () {
      this.parentNode.parentNode.removeChild(this.parentNode);
    };
  }
}

// TODO: Global FIX func


//
// Message
//
function showMessage(message, messageBtn) {
  var uiMessage = document.querySelectorAll(message),
    uiMessageBtn = document.querySelectorAll(messageBtn),
    timeOut = 2000,
    // Becouse animation: fadeOutUp .3s
    timeOutUp = timeOut - 1700;
  // console.log(uiMessageBtn)

  // Only Message without button
  if (uiMessageBtn.length === 0) {
    for (var i = 0; i < uiMessage.length; i++) {
      var uiMessage = uiMessage[i];
      showAndHideMessage();
    }
  }

  // Message with button
  for (var i = 0; i < uiMessage.length; i++) {
    var uiMessage = uiMessage[i],
      uiMessageBtn = uiMessageBtn[i];

    uiMessageBtn.onclick = function () {
      showAndHideMessage();
    };
  }

  function showAndHideMessage() {
    uiMessage.style.display = 'flex';

    // Animation
    uiMessage.classList.add('fadeInDown');
    uiMessage.classList.remove('fadeOutUp');

    setTimeout(function () {
      setTimeout(function () {
        uiMessage.style.display = 'none';
      }, timeOutUp);

      // Animation
      uiMessage.classList.add('fadeOutUp');
      uiMessage.classList.remove('fadeInDown');
    }, timeOut);
  }

}

//
// Message Dialog
//

function uiMessage() {
  // [i] for forEach
  // var messageDialog = document.getElementsByClassName('ui-messageBox__wrapper');
  var uiMessageDialogBtnShow = document.getElementsByClassName('ui-messageBox-show');
  var uiMessageDialogBtnOk = document.getElementsByClassName('ui-messageBox-ok');
  var uiMessageDialogBtnCancel = document.getElementsByClassName('ui-messageBox-cancel');
  var uiMessageDialogBtnClose = document.getElementsByClassName('ui-messageBox-close');
  // Event for Show
  [].forEach.call(uiMessageDialogBtnShow, function (element, i) {
    element.addEventListener('click', function () {
      showMessageDialog(i);
    });
  });

  // Event for Close
  [].forEach.call(uiMessageDialogBtnClose, function (element, i) {
    element.addEventListener('click', function () {
      closeMessageDialog(i);
    });

    // Close click to window
    window.addEventListener('click', function (e) {
      // Becouse [i]
      messageDialog = document.getElementsByClassName('ui-messageBox__wrapper')[i];
      if (e.target == messageDialog) {
        messageDialog.style.display = "none";
      }
    });

  });

  // Event for Close Cancel
  [].forEach.call(uiMessageDialogBtnCancel, function (element, i) {
    element.addEventListener('click', function () {
      //Exit
      closeMessageDialog(i);
      // Ok func
      messageDialogItCancel();
    });
  });


  // Event for Close OK
  [].forEach.call(uiMessageDialogBtnOk, function (element, i) {
    element.addEventListener('click', function () {
      //Exit
      closeMessageDialog(i);
      // Ok func
      messageDialogItOk();
    });
  });

  function showMessageDialog(i) {
    // Becouse [i]
    var messageDialog = document.getElementsByClassName('ui-messageBox__wrapper')[i];
    messageDialog.style.display = "flex";
  }

  function closeMessageDialog(i) {
    // Becouse [i]
    var messageDialog = document.getElementsByClassName('ui-messageBox__wrapper')[i];
    messageDialog.style.display = "none";
  }

} // end message
function messageDialogItCancel() {
  return true;
}

function messageDialogItOk() {
  return true;
}

////////////////////////////////////////////////////////////////////////////////////////////
// resizable Elements
function resizeElement(elem) {

  var activeSide = null,
    activeElem = null,
    w = 0,
    h = 0,
    x = 0,
    y = 0;

  // Handle the mousedown event
  // that's triggered when user drags the resizer
  const mouseDownHandler = function (e) {
    activeSide = this;
    activeElem = activeSide.parentElement;
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Calculate the dimension of element
    const styles = window.getComputedStyle(activeElem);
    w = parseInt(styles.width, 10);
    h = parseInt(styles.height, 10);

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    var dx = e.clientX - x,
      dy = e.clientY - y,
      side = "xy";

    if (activeSide !== null) side = activeSide.getAttribute('data-side');

    if (side.indexOf('x') > -1) {
      activeElem.style.width = `${w + dx}px`;
    }
    if (side.indexOf('y') > -1) {
      activeElem.style.height = `${h + dy}px`;
    }
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  // to add resizers
  (function () {
    [
      ["r", "x"],
      ["b", "y"],
      ["br", "xy"]
    ].forEach(resizer => {
      let resizerElem = document.createElement('span');
      resizerElem.className = `resizer resizer-${resizer[0]}`;
      resizerElem.setAttribute('data-side', `${resizer[1]}`);
      resizerElem.addEventListener('mousedown', mouseDownHandler);
      elem.append(resizerElem);
    });
  })();

}

// Make elements resizable
const resizables = document.querySelectorAll('.container-resizable');
resizables.forEach(resizable => {
  resizeElement(resizable);
});

////////////////////////////////////////////////////////////////////////////////////////////
// draggable Elements
function dragElement(elem) {
  var pos_start_x = 0,
    pos_start_y = 0;

  elem.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos_start_x = e.clientX;
    pos_start_y = e.clientY;

    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  }

  function elementDrag(e) {
    var dx = 0,
      dy = 0,
      styles = window.getComputedStyle(elem);
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    dx = e.clientX - pos_start_x;
    dy = e.clientY - pos_start_y;
    pos_start_x = e.clientX;
    pos_start_y = e.clientY;

    // set the element's new position:
    elem.style.top = (parseInt(styles.top) + dy) + "px";
    elem.style.left = (parseInt(styles.left) + dx) + "px";
  }

  function closeDragElement() {
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }
}

// Make elements draggable
const draggables = document.querySelectorAll('.container-pop');
draggables.forEach(draggable => {
  dragElement(draggable);
});
////////////////////////////////////////////////////////////////////////////////////////////
// stacked Elements
function stackElement(elem) {
  var stackingIndex = parseInt(elem.getAttribute('data-stack-index'));

  elem.style.zIndex = stackingIndex;
  elem.style.left = 5 * stackingIndex + "px";
  elem.style.top = 5 * stackingIndex + "px";

  dragElement(elem);

}

const stackedElems = document.querySelectorAll('.container-stack');
stackedElems.forEach(stackedElem => {
  stackElement(stackedElem);
});

////////////////////////////////////////////////////////////////////////////////////////////
// collapsible Elements
function collapseElement(elem) {

  function collapseHandler(e) {
    let targetId = this.getAttribute('data-target'),
      target = document.getElementById(targetId);
    this.classList.toggle('active');

    if (this.className.includes('active')) {
      target.style.height = elem.scrollHeight + "px";
      // target.style.opacity = 1;
    } else {
      target.style.height = "0px";
      // target.style.opacity = 0;
    }
  }

  (function () {

    if (!elem.id || elem.id === "") {
      elem.id = "collapsible-container-" + (Math.floor(Math.random() * Math.pow(36, 5))).toString(36).padStart(5, '0')
    }

    var collapseIcon = document.createElement('span');
    collapseIcon.className = "collapse-icon";
    collapseIcon.setAttribute('data-target', elem.id);
    collapseIcon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    collapseIcon.addEventListener('click', collapseHandler);
    elem.parentElement.insertBefore(collapseIcon, elem);
  }) ();



}

// var collapseIcons = ;

const collapsibles = document.querySelectorAll(".container-collapsible");
collapsibles.forEach(collapsible => {
  collapseElement(collapsible);
});

////////////////////////////////////////////////////////////////////////////////////////////

async function copyFrom(elem) {
  var data = null;
  if (elem.constructor.name.includes('HTML')) {
    data = elem.innerText.trim();
    await navigator.clipboard.writeText(data);
    console.log('data copied successfully');
  } else if (elem.constructor.name.includes('Object')) {
    data = JSON.stringify(elem);
    await navigator.clipboard.writeText(data);
    console.log('data copied successfully');
  } else {
    data = elem;
    await navigator.clipboard.write(data);
    console.log('data copied successfully');
  }

}

async function printClipboardData() {
  // show all data in console
  let result = await navigator.permissions.query({
    name: "clipboard-read"
  });
  if (result.state == "granted" || result.state == "prompt") {
    let data = await navigator.clipboard.read()
    for (let i = 0; i < data.length; i++) {
      if (data[i].types.includes("text/plain")) {
        let blob = await data[i].getType("text/plain")
        console.log(await blob.text());
        alert("Clipboard contains non-image data. Unable to access it.");
      } else if (data[i].types.includes("image/png")) {
        data[i].getType("image/png").then((blob) => {
          let imgElem = document.createElement('img');
          imgElem.src = URL.createObjectURL(blob);
          document.body.append(imgElem);
        });
      } else {
        console.log(data[i]);
      }
    }
  }
}

const cpyBtns = document.querySelectorAll('.button-copy');
cpyBtns.forEach(cpyBtn => {
  cpyBtn.classList.add('fas', 'fa-copy');
  cpyBtn.addEventListener('click', function (e) {
    let targetId = this.getAttribute('data-target'),
      target = document.getElementById(targetId);
    copyFrom(target);
  })
})