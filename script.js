

// Download All Tags <--------------------------------------------------->

window.addEventListener("DOMContentLoaded", () => {

  //set  to something to local storage for example
  localStorage.getItem("backlogItems", "");

  // get element by id
  let downloadBtn = document.getElementById("download-button");

  //get values from local storage function
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

  //set  to something to local storage for example
  localStorage.getItem("progressItems", "");

  // get element by id
  let downloadBtn = document.getElementById("download-button2");

  //get values from local storage function
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


// Saul Zapata Tags Manager 12/01/22
// Document Object Model (DOM) - this is just a note about DOM

// import a soecific module
// import {downloadTags} from "./sub"
// import all modules 
// import * as sub from "./sub";

// Export to other js example starts here

// let msg = "Hello World!";
// const PI = 3.14; 
 
// function addNumbers(a, b){
    // return a + b;
// }
 
// Exporting variables and functions
// export { msg, PI, addNumbers };

// Export to other js example ends here

// export {
//   listArrays, downloadTags
// };


// function downloadTags() {
//   for (var i in listArrays) {
//     // This will put the word row and the index
//     // console.log("row " + i);
//     for (var j in listArrays[i]) {
//       // console.log(" " + listArrays[i][j]);
//       let x = WritableStreamDefaultController.listArrays ["tag"].value;
//     }
//   }      
//   return listArrays;
// }


const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists, unordered lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false; // to show we have not yet loaded from local storage 


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
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
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);

    //*********************************************************************
    //******************************************* */ I have commented these out
    //for testing, later I can undo
  } else { // We are setting some items to get the user starting point
    backlogListArray = ['Release the course', ' Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = [];
    onHoldListArray = [];
  }
}

// Call the function "getSavedColumns"
// getSavedColumns();
// Calls the function "updateSavedColumns"
// updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];
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
  // console.log(array);
  const filteredArray = array.filter(item => item !== null);
  // console.log(filteredArray);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('item:', item);
  // console.log('column:', column);
  // console.log('index:', index);
  // console.log('columnEl:', columnEl);
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
  // Complete Column
  // completeList.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  // onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true; // this will only run once
  updateSavedColumns(); // Update Local Storgae
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  // console.log(selectedArray);
  const selectedColumnEl = listColumns[column].children; // List of all Chil items - to be targeted by id
  // console.log(selectedColumnEl[id].textContent);
 if (!dragging) {
  if (!selectedColumnEl[id].textContent) { // Conditional Statement
    delete selectedArray[id]; // Delete by "id"
  } else {
    selectedArray[id] = selectedColumnEl[id].textContent;
  }
  // console.log(selectedArray);
  updateDOM();
 }
}

// Add to Column List, Reset Textbox
function addToColumn(column) {
  // console.log(addItems[column].textContent);
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

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  // console.log(backlogList.children);
  // console.log(progressList.children);
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
  // completeLists
  completeListArray = []; // so the array empties
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  // onHoldLists
  onHoldListArray = []; // so the array empties
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  } 
  // updating the DOM
  updateDOM();
}

// function and "for" loop ends here


// // Alternative to the "for" loop using "map" starts here

// // Allows arrays to reflect Drag and Drop items
// function rebuildArrays() {
//   backlogListArray = Array.from(backlogList.children).map(i => i.textContent); // backlogList
//   progressListArray = Array.from(progressList.children).map(i => i.textContent); // progressLists
//   completeListArray = Array.from(completeList.children).map(i => i.textContent); // completeLists
//   onHoldListArray = Array.from(onHoldList.children).map(i => i.textContent); // onHoldLists
//   updateDOM(); // updating the DOM
// }

// // Alternative to the "for" loop using "map" ends here

// When Item Starts Dragging
function drag(e) {
  draggedItem = e.target; // show us the target of the event triggered
  // console.log('draggedItem:', draggedItem);
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) { // "e" for event
  e.preventDefault();
}

// When Item Enters Column Area
function dragEnter(column) {
  // console.log(listColumns[column]);
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
// console.log(updateDOM());

// function to download tags when clicked on download button
// function downloadTags() {
//   for (var i in listArrays) {
//     // This will put the word row and the index
//     // console.log("row " + i);
//     for (var j in listArrays[i]) {
//       console.log(" " + listArrays[i][j]);
//     }
//   }      
//   return listArrays.toString();
// }

// // Controller
// function downloadTags () {
//   const save = document.getElementById('backlog-list').value;
  // console.log(backlog-list);

//   // createTags(tags);
//   // alert();
//   // render();
  
//   // backlog-list
  
//   // drag-item;
// };

// var fs = require('fs');

// async function openFile() {
//   try {
//     const csvHeaders = 'name,quantity,price'
//     await fs.writeFile('groceries.csv', csvHeaders);
//   } catch (error) {
//     console.error(`Got an error trying to write to a file: ${error.message}`);
//   }
// }

// var fs = require('fs');
// fs.writeFile('Tags.txt', listArrays.join(""));
// for (var i in listArrays) {
//   // console.log("row " + i);
//     for (var j in listArrays[i])
//      {
//       console.log(" " + listArrays[i][j]);
//      }
//     }

    // const fs = require('fs');
    //   fs.writeFile('Tags.txt', listArrays);

    // function downloadTags (listArrays){
    //   return listArrays
    // }
    // document.getElementBya("demo").innerHTML = myFunction(4, 3);
    // let fs;
    // This function will give you all the items in the "listArrays"
// let dir = listArrays;
// let fs = "";

// if (!fs.ensureDirSync(dir)) {
//   fs.mkdirSync(dir);
//   }

//   fs.appendFileSync(dir, 'your data!', function(err){
//     if(err)
//       return err;

//     console.log("file saved successfully");
// });




// function downloadTags() {
//   for (var i in listArrays) {
//     // This will put the word row and the index
//     // console.log("row " + i);
//     for (var j in listArrays[i]) {
//       console.log(" " + listArrays[i][j]);
//     }
//   }      
//   return listArrays;
// }

// const content = downloadTags();

// fs.appendFile('./src/tags.txt',content, err => {
//   if(err) {
//     console.err;
//     return
//   }
// });





// Testing to write to file

// require("fs").writeFile(
//   somepath,
//   arr.map(function(v){ return v.join(', ') }).join('\n'),
//   function (err) { console.log(err ? 'Error :'+err : 'ok') }
// );

// // close the stream
// writeStream.end();


// import { appendFile } from 'node:fs';

// appendFile('message.txt', 'data to append', (err) => {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });



    // Import the promise-based version of the fs library
    // const fs = require('fs').promises;

  // Define some text to be written to a file
//   listArrays = [];

// try {
    // Write text to the given file name
    // await tells JavaScript to wait for the asyncronous function (Promise) to resolve before continuing
//     fs.writeFile('myFile.txt', listArrays); 
// } catch (error) {
    // Output any errors for inspection
//     console.log(error);
// }

// const fs = require("fs");

// const content = listArrays;

// fs.appendFile('tags.txt',content, err => {
//   if(err) {
//     console.err;
//     return
//   }
// });



// function downloadTags() {
//   for (var i in listArrays) {
//     // This will put the word row and the index
//     // console.log("row " + i);
//     for (var j in listArrays[i]) {
//       // console.log(" " + listArrays[i][j]);
//     }
//   }      
//   return listArrays;
// }




// function export2txt() {
  // const originalData = {
    // members: [{
    //     name: "cliff",
    //     age: "34"
    //   },
    //   {
    //     name: "ted",
    //     age: "42"
    //   },
    //   {
    //     name: "bob",
    //     age: "12"
    //   }
    // ]
  // };

//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
//     type: "text/plain"
//   }));
//   a.setAttribute("download", "data.txt");
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// }


// function export2txt() {

// }

// require('fs').writeFile(

//   // './my.json',
//   './tags.txt',

//   JSON.stringify(listArrays),

//   function (err) {
//       if (err) {
//           console.error('listArrays');
//       }
//   }
// );



// var array = [{
//   x: 0,
//   y: 0
// }];
// var a = document.body.appendChild(
//   document.createElement("a")
// );
// a.download = "export.txt";
// a.href = "data:text/plain;base64," + btoa(JSON.stringify(array));
// a.innerHTML = "download example text";


// async function saveCSV () {
  // (A) ARRAY OF DATA
  // var array = [
  //   ["Job", "job@doe.com", "123456"],
  //   ["Joe", "joe@doe.com", "234567"],
  //   ["Joi", "joi@doe.com", "345678"],
  //   ["Jon", "jon@doe.com", "456789"],
  //   ["Jou", "jou@doe.com", "987654"],
  //   ["Joy", "joy@doe.com", "876543"],
  // ];
 
  // (B) ARRAY TO CSV STRING
  // var csv = "";
  // for (let row of array) {
  //   for (let col of row) { csv += col + ","; }
  //   csv += "\r\n";
  // }
 
  // (C) CREATE BLOB OBJECT
  // var myBlob = new Blob([csv], {type: "text/csv"});
 
  // (D) FILE HANDLER & FILE STREAM
  // const fileHandle = await window.showSaveFilePicker({
  //   suggestedName : "demo.csv",
  //   types: [{
  //     description: "CSV file",
  //     accept: {"text/csv": [".csv"]}
  //   }]
  // });
  // const fileStream = await fileHandle.createWritable();
 
  // (E) WRITE FILE
//   await fileStream.write(myBlob);
//   await fileStream.close();
// }

// var array = [{
//   x: 0,
//   y: 0
// }];
// var a = document.body.appendChild(
//   document.createElement("a")
// );
// a.download = "./dist/export.txt";
// a.href = "data:text/plain;base64," + btoa(JSON.stringify(array));
// a.innerHTML = "download example text";

// console.log(listArrays);