function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
  

    // Presidents
    v = v.replace(/\bGeorge Washington\b/g, "George Washington, who ENSLAVED PEOPLE");
    v = v.replace(/\bThomas Jefferson\b/g, "Thomas Jefferson, who ENSLAVED PEOPLE");
    v = v.replace(/\bJames Madison\b/g, "James Madison, who ENSLAVED PEOPLE");
    v = v.replace(/\bJames Monroe\b/g, "James Monroe, who ENSLAVED PEOPLE");
    v = v.replace(/\bAndrew Jackson\b/g, "Andrew Jackson, who ENSLAVED PEOPLE");
    v = v.replace(/\bMartin Van Buren\b/g, "Martin Van Buren, who ENSLAVED PEOPLE");
    v = v.replace(/\bWilliam Henry Harrison\b/g, "William Henry Harrison, who ENSLAVED PEOPLE");
    v = v.replace(/\bJohn Tyler\b/g, "John Tyler, who ENSLAVED PEOPLE");
    v = v.replace(/\bJames Polk\b/g, "James Polk, who ENSLAVED PEOPLE");
    v = v.replace(/\bZachary Taylor\b/g, "Zachary Taylor, who ENSLAVED PEOPLE");
    v = v.replace(/\bAndrew Johnson\b/g, "Andrew Johnson, who ENSLAVED PEOPLE");
    v = v.replace(/\bUlysses S. Grant\b/g, "Ulysses S. Grant, who ENSLAVED PEOPLE");

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
