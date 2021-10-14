function saveState(name, item){
    console.log("Save State Function");
    console.log("Name", name);
    console.log("Item", item);
    window.localStorage.setItem(name, item);
    console.log("### Local Storage ###");
    console.log(window.localStorage);
}

function loadState(name){
    return window.localStorage.getItem(name);
}

module.exports = {saveState, loadState}