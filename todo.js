const list = [];
let counter = 0;
//class responsible for representing a single entry in the todo list
class todoEntry {
    entry;
    status;

    constructor(entry) {
        this.entry = entry;
        this.status = false;
    }
    isChecked() {
        return this.status;
    }
    check() {
        this.status = !this.status;
    }
}
//Add an entry to the list and adds an element to the
//unordered list with correct id and layout
function addEntry() {
    entryText = document.getElementById("Entry").value;
    if (entryText.length > 0) {
        list.push(new todoEntry(entryText));
        lastIndex = list.length - 1;
        document.getElementById("list").innerHTML +=
            "<li class=\"listItem\" id=\"item\"\">" + list[lastIndex].entry +
            "<input type=\"checkbox\" class=\"Check\" value=\"no\" id=\"" +
            lastIndex + "\" onclick=\"checkEntry(this.id)\"> <button class=\"Delete\" id=\""
            + lastIndex + "\" onclick=\"removeEntry(this.id)\">X</button></li>";
    }
    else {
        alert("Please enter a valid entry");
    }
    localStorage.setItem("list", JSON.stringify(list));
    document.getElementById("Entry").value = "";
}

function loadEntry(entryText) {
    if (entryText.length > 0) {
        list.push(new todoEntry(entryText));
        lastIndex = list.length - 1;
        document.getElementById("list").innerHTML +=
            "<li class=\"listItem\" id=\"item\"\">" + list[lastIndex].entry +
            "<input type=\"checkbox\" class=\"Check\" value=\"no\" id=\"" +
            lastIndex + "\" onclick=\"checkEntry(this.id)\"> <button class=\"Delete\" id=\""
            + lastIndex + "\" onclick=\"removeEntry(this.id)\">X</button></li>";
    }
}
//checks entry at specific index
function checkEntry(index) {
    if (index < list.length && index >= 0)
        list[index].check();
}
//Removes entries that have been checked
function update() {
    for (i = 0; i < list.length; i++) {
        if (list[i].isChecked()) {
            list.splice(i, 1);
            counter++;
            i -= 1;
        }
        localStorage.setItem("counter", counter);
    }
    localStorage.setItem("list", JSON.stringify(list));
    updateCounter();
    reconstructList()
}
function reconstructList() {
    document.getElementById("list").innerHTML = "";
    for (i = 0; i < list.length; i++) {
        document.getElementById("list").innerHTML +=
            "<li class=\"listItem\" id=\"item\"\">" +
            list[i].entry +
            "<input type=\"checkbox\" class=\"Check\" id=\""
            + i + "\" onclick=\"checkEntry(this.id)\">" +
            "<button class=\"Delete\" id=\""
            + i + "\" onclick=\"removeEntry(this.id)\">X</button></li>";
    }
}
function removeEntry(index) {
    if (index < list.length && index >= 0)
        list.splice(index, 1);
    reconstructList();
    localStorage.setItem("list", list);
}
function clearLocal() {
    localStorage.clear();
    list.splice(0, list.length);
    counter = 0;
    console.log(list);
    reconstructList();
    updateCounter();
}
function setupList() {
    if (localStorage.getItem("list") === null) {
        return;
    }
    else {
        let entries = JSON.parse(localStorage.getItem("list"));
        for (i = 0; i < entries.length; i++) {
            loadEntry(entries[i].entry);
        }
    }
    if (localStorage.getItem("counter") === null) {
        return;
    }
    else {
        counter = localStorage.getItem("counter");
    }
}
function updateCounter() {
    if (counter > 0) {
        document.getElementById("taskCounter").innerHTML =
            "You have finished " + counter + " tasks!";
    }
    else {
        document.getElementById("taskCounter").innerHTML = "";
    }
}