class HeapNode {
    static rootNodes = [];
    constructor(value) {
        this.value = value;
        this.descendants = [];
        this.parent = null;
        this.root = null;
    }

    get child() {
        return this.descendants;
    }

    set child(node) {
        this.descendants.push(node);
        if (node) {
            node.parent = this;
        }
    }
}

HeapNode.prototype.add = function (value) {
    const newNode = new HeapNode(value),
        found = this.findNodeDfs(value, true);
    if (found) { // duplicated: value already exist on the tree
        console.warn(`Document with id:${value} already exists!!`);
        return false;
    } else {
        this.child = newNode;
    }

    newNode.root = this.root ? this.root : this;

    return newNode;
}

HeapNode.prototype.findNodeDfs = function (value, fromRoot = false) {
    var parent = null,
        found = null,
        node = fromRoot && this.root ? this.root : this,
        i = 0;
    // dfs
    if (node.value === value) {
        found = node;
    } else {
        if (!parent) parent = node;
        node = parent.descendants[i];
        while (node) {
            found = node.findNodeDfs(value);
            if (found) break;
            node = parent.descendants[++i];
        }
    }
    return found;
}

HeapNode.prototype.setRoot = function (node) {
    this.root = node;
    this.descendants.forEach(descendant => {
        descendant.setRoot(node);
    })
}

HeapNode.prototype.attachTo = function (node) {
    node.child = this;
    this.setRoot(node.root ? node.root : node);
}

HeapNode.prototype.detach = function () {
    this.parent = null;
    this.root = null;
    this.descendants.forEach(descendant => {
        descendant.setRoot(this);
    })
    HeapNode.rootNodes.push(this);
}

HeapNode.prototype.remove = function (value, attachToParent = false) {
    const nodeToRemove = this.findNodeDfs(value),
        parent = nodeToRemove.parent,
        descendants = nodeToRemove.descendants;
    if (!nodeToRemove) {
        console.warn(`No document with id:${value} is found!!`);
        return false;
    }

    if (attachToParent) {
        if (parent) {
            descendants.forEach(descendant => {
                parent.child = descendant;
            });
        } else {
            console.warn(`No parent is there for document with id:${value}`)
        }
    }

    if (parent) {
        parent.descendants.splice(parent.descendants.indexOf(nodeToRemove), 1);
    } else {
        nodeToRemove.descendants = [];
        delete nodeToRemove.value;
    }

    return true;
}

// HeapNode.prototype.findNodeBfs = function (value){
//     var parent = this.parent,
//         node = this,
//         found = null,
//         i = 0,
//         j = 0;
// // bfs
//     while (node) {
//         if (node.value === value) {
//             found = node;
//             break;
//         } else {
//             if (parent) {
//                 if (i < parent.descendants.length) {
//                     i++;
//                 } else{
//                     found = node.findNodeBfs(value);
//                 }
//             } else {
//                 parent = node;
//                 node = parent.descendants[i];
//             }  
//         }
//     }
//     return found;
// }

function uniqueID() {
    let timmy = Date.now().toString(36),
        randy = (Math.random() * Math.pow(36, 12)).toString(36).padStart(12, '0');
    return `${timmy}-${randy.substr(0,4)}-${randy.substr(4,4)}-${randy.substr(8,4)}`;
}

// let uid1 = uniqueID(),
//     uid2 = uniqueID(),
//     uid3 = uniqueID(),
//     uid4 = uniqueID(),
//     uid5 = uniqueID(),
//     node1 = new HeapNode(uid1),
//     node2, node3, node4, node5;
// HeapNode.rootNodes.push(node1);
// if (!null) {
//     node2 = node1.add(uid2);
//     node3 = node1.add(uid3);
//     node4 = node2.add(uid4);
//     node5 = node4.add(uid5);
//     node4.detach();
//     console.log(`uid1:${uid1}`);
//     console.log(`uid2:${uid2}`);
//     console.log(`uid3:${uid3}`);
//     console.log(`uid4:${uid4}`);
//     console.log(`uid5:${uid5}`);
//     console.log(HeapNode.rootNodes);
// }

window.onclick = function (e) {
    var target = e.target,
        actionType = target.getAttribute('data-action-type'),
        actionValue = target.getAttribute('data-action-value');
    if (actionType === "accordianToggle") {
        target.parentElement.classList.toggle(actionValue);
    } else if (actionType === "switchDoc") {
        switchDoc(actionValue.trim());
    } else if (actionType === "addDoc") {
        addItem();
    }
}

var dataContainer = {},
    activeNode = null;

function switchDoc(docID) {
    if (docID == "") {
        return;
    }

    activeNode = activeNode.findNodeDfs(docID, true);
    var rootDoc = document.getElementById('rootDoc'),
        parentID = "";

    if (activeNode) {
        rootDoc.querySelectorAll('.item').forEach(item => {
            item.remove();
        });
        rootDoc.setAttribute('data-doc-id', docID);
        if (activeNode.parent) {
            parentID = activeNode.parent.value
        }
        rootDoc.querySelector('.pageTitle>.backIcon').setAttribute('data-action-value', parentID);
        rootDoc.querySelector('.pageTitle>.title').innerText = dataContainer[docID];
        if (activeNode.descendants.length>0) {
            getItems(activeNode, rootDoc);
        } 
        // else{
        //     addItem(activeNode, rootDoc);
        // }
        
    }
}

function getItems(node, elem) {
    var rootDoc = document.getElementById('rootDoc'),
        children = node.descendants,
        item, tabLabel, tabContent;
    children.forEach(child=>{
        CreateEntity.create(itemTemp, elem);
        item = elem.lastElementChild;
        tabLabel = item.querySelector('.tab:last-child>.tab-label');
        tabContent = item.querySelector('.tab:last-child>.tab-content');
        tabLabel.children[0].setAttribute('data-action-value', child.value);
        tabLabel.children[1].innerText = dataContainer[child.value];
        getItems(child, tabContent);
    })
}

function addItem(node, elem) {
    if (!node) {
        node = activeNode;
    }
    if (!elem) {
        elem = document.getElementById('rootDoc');
    }
    var uid, item, itemTab, itemLabel;
    uid = uniqueID();
    node.add(uid);
    CreateEntity.create(itemTemp, elem);
    item = elem.lastElementChild;
    itemLabel = item.querySelector('.tab:last-child>.tab-label');
    itemLabel.children[0].setAttribute('data-action-value', uid);
    itemLabel.children[1].innerText = `item id: ${uid}`;
    dataContainer[uid] = itemLabel.children[1].innerText;
}

(function () {
    var initId, rootNode, rootDoc;
    initId = uniqueID();
    rootNode = new HeapNode(initId);
    HeapNode.rootNodes.push(rootNode);
    activeNode = rootNode;
    CreateEntity.create(ui, document.getElementById('root'));

    rootDoc = document.getElementById('rootDoc');
    rootDoc.setAttribute('data-doc-id', initId);
    rootDoc.querySelector('.pageTitle>.title').innerText = `item id: ${rootNode.value}`
    dataContainer[rootNode.value] = rootDoc.querySelector('.pageTitle>.title').innerText;

    addItem(rootNode, rootDoc);
    addItem(rootNode, rootDoc);
    console.log(HeapNode.rootNodes);
    console.log(dataContainer);
})()