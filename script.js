// Saul Zapata Tags Manager 12/01/22
// <--------------------------------------------------->
// Download All Tags 

window.addEventListener("DOMContentLoaded", () => {

  // Set to localStorage
  localStorage.getItem("backlogItems", "");

  // Get element by id
  let downloadBtn = document.getElementById("download-button");

  // get values from localStorage function
  function getValuesFromLocalStorage() {
    // 
    return localStorage.getItem("backlogItems");
  }

  function downloadFile() {
    const content = getValuesFromLocalStorage();
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "All Tags.txt";
    a.click();
  }

  // add listener to button
    downloadBtn.addEventListener("click", downloadFile);
    
});

// Download Active Tags

window.addEventListener("DOMContentLoaded", () => {

  // Set to localStorage
  localStorage.getItem("progressItems", "");

  // Get element by id
  let downloadBtn = document.getElementById("download-button2");

  // Get values from localStorage function
  function getValuesFromLocalStorage() {
    // 
    return localStorage.getItem("progressItems");
  }

  function downloadFile() {
    const content = getValuesFromLocalStorage();
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "Active Tags.txt";
    a.click();
  }

  // add listener to button
    downloadBtn.addEventListener("click", downloadFile);
    
});
// <---------------------------------------------------------------------->

// Tags Manager code
// <---------------------------------------------------------------------->

const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists, unordered lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');

// Items
// to show we have not yet loaded from local storage 
let updatedOnLoad = false; 


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let listArrays = [];

// Drag Functionality Global Variable
let draggedItem;
let dragging = false;
let currentColumn;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) { // Checks if backlogItems exsists
    // Below assigns backlogItems to there coresponding items
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    //for testing, later I can delete or leave
  } else { // We are setting some items to get the user starting point
    backlogListArray = ['Release the course', ' Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray];
  const arrayNames = ["backlog", "progress"];
  // Loop through
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
  // Below is the long version of the above loop
  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Filter out empty items from Array
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  // This will allow up to drag an item
  listEl.draggable = true; // It need to be set to true so it works
  // Set Attribute and also an Event Listener
  listEl.setAttribute('ondragstart', "drag(event)");
  listEl.contentEditable = true; // Ability to click on item and edit
  listEl.id = index; // Set id each element = index, we can target
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`); // Set Attribute "onfocusout"
  // Append
  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = ""; // this will allow us to rest the elemects on backlod list
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray); // Call the function filterArray
  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true; // this will only run once
  updateSavedColumns(); // Update Local Storgae
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children; // List of all Chil items - to be targeted by id
 if (!dragging) {
  if (!selectedColumnEl[id].textContent) { // Conditional Statement
    delete selectedArray[id]; // Delete by "id"
  } else {
    selectedArray[id] = selectedColumnEl[id].textContent;
  }
  updateDOM();
 }
}

// Add to Column List, Reset Textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent; // assign to const
  const selectedArray = listArrays[column];   // Chose Which Array to add it to
  selectedArray.push(itemText); // selectedArray push to add to itemText to Array
  addItems[column].textContent = ""; // We want to be able to reset it 
  updateDOM(); // Call updateDOM to add it to the DOM
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = "hidden"; // After clicking we need to hide it
  saveItemBtns[column].style.display = "flex"; //
  addItemContainers[column].style.display = "flex"; //
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = "visible"; // This will make it visible
  saveItemBtns[column].style.display = "none"; //
  addItemContainers[column].style.display = "none"; //
  addToColumn(column); // Call it and pass the column paramater to it
}

// function and "for" loop starts here
// <-------------------------------------------------------------------------->

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  // backlogList
  backlogListArray = []; // so the array empties
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  // progressLists
  progressListArray = []; // so the array empties
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  } 

  // updating the DOM
  updateDOM();
}

// function and "for" loop ends here
// <------------------------------------------------------------->

// When Item Starts Dragging
function drag(e) {
  draggedItem = e.target; // show us the target of the event triggered
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) { // "e" for event
  e.preventDefault();
}

// When Item Enters Column Area
function dragEnter(column) {
  listColumns[column].classList.add("over");
  currentColumn = column;
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();
  // Remove Background Color/Padding
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });
  // Add Item to Column
const parent = listColumns[currentColumn];
parent.appendChild(draggedItem);
// Dragging complete
dragging = false;
rebuildArrays();
}

//  On Load we want to run our "updateDom" function
updateDOM();