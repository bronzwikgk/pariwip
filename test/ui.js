var ui = {
    "name": "div",
    "attributes": {
        "id": "rootDoc",
        "class": "document",
        "data-doc-id": ""
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "pageTitle"
            },
            "items": {
                "element##0":{
                    "name": "a",
                    "attributes": {
                        "class": "backIcon",
                        "data-action-type": "switchDoc",
                        "data-action-value": ""
                    },
                    "items": {}
                },
                "element##1": {
                    "name": "span",
                    "attributes": {
                        "class": "title",
                        "contenteditable": "true"
                    },
                    "items": {
                        "text##0": "Page Title"
                    }
                }
            }
        },
        "element##1": {
            "name": "button",
            "attributes": {
                "data-action-type": "addDoc"
            },
            "items": {
                "text##0": "Add"
            }
        }
    }
}

var itemTemp = {
    "name": "div",
    "attributes": {
        "class": "item accordian"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "tabs"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {
                        "class": "tab"
                    },
                    "items": {
                        "element##0": {
                            "name": "label",
                            "attributes": {
                                "class": "tab-label",
                                "data-action-type": "accordianToggle",
                                "data-action-value": "active"
                            },
                            "items": {
                                "element##0": {
                                    "name": "a",
                                    "attributes": {
                                        "class": "bulletPoint",
                                        "data-action-type": "switchDoc",
                                        "data-action-value": ""
                                    },
                                    "items": {}
                                },
                                "element##1": {
                                    "name": "span",
                                    "attributes": {
                                        "contenteditable": "true"
                                    },
                                    "items": {
                                        "text##0": "Title"
                                    }
                                }
                            }
                        },
                        "element##1": {
                            "name": "div",
                            "attributes": {
                                "class": "tab-content"
                            },
                            "items": {}
                        }
                    }
                }
            }
        }
    }
}