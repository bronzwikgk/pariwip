var homeUI = [
    {
        objectModel: "document",
        method: "getElementById",
        arguments: "root",
        response: "rootElem"
    },
    {
        objectModel: "CreateEntity",
        method: "create",
        arguments: ["$pariWebElemsUI", "$l.rootElem"]
    }
]

window.onload = function () {
    ActionEngine.processRequest('homeUI');
}