const { fromEvent } = rxjs;
const { from } = rxjs;
const { reduce, map, filter } = rxjs.operators;

let currentColSel;
let currentRowSel;
let i;
var ascii;
let count=0;
let startCol,endCol;
let tempArray = [];
let signs=0;
let p=0;
var FormulaArray=[];
let bodmasResul='';
let cellFormulaBod = [];
let inputToObs;


function createNewButtons(buttonTxt,id,functionName,divId){
    count++;
    // Added Count Variable to append Odd number Buttons in Single Div.
    if(divId != "div3"){
      if(count%2 != 0 && count!=5){
        var div = document.createElement('div');
        div.setAttribute('id',divId);  
        div.style.marginTop ="5px";
      }else{
        if(count == 2 || count == 5){
          var div = document.getElementById('div1');
        }else if(count == 4 || count == 6){
          var div = document.getElementById('div2');
          div.style.marginBottom="5px";
        }
        div.setAttribute('id',divId);  
        div.style.marginTop ="5px";
      }
  }else{
    var div = document.createElement('div');
        div.setAttribute('id',divId);  
        div.style.marginTop ="5px";
        div.style.marginBottom="5px";
        var input = document.createElement('input');
        input.setAttribute('id','formula');
        div.appendChild(input);
  }
    let btn= document.createElement('button');
    btn.innerHTML = buttonTxt;
    btn.setAttribute('id', id);
    btn.style.backgroundColor = "CornFlowerBlue";
    btn.style.borderRadius="2px";
    btn.style.height="25px";
    btn.style.width="120px";
    btn.style.marginLeft ="5px";
    div.appendChild(btn);
    if(count == 6){
      let input = document.createElement("input");
      input.setAttribute("id","insertedFile");
      input.setAttribute("type","file");
      input.style.marginLeft = "5px";
      div.appendChild(input);
    }
    body.appendChild(div);
    btn.addEventListener('click', functionName);
}
//Create a Row
createNewButtons("+ Add Row","addNewRow",addRow,'div1');
//Create a Column
createNewButtons("+ Add Column","addNewCol",addCol,'div1');
//Delete a Row
createNewButtons("- Delete Row","delRow",delRow,'div2');
//Delete a Column
createNewButtons("- Delete Column","delCol",delCol,'div2');
//Export CSV
createNewButtons("Export CSV","CSVExporting",CSVExporting,'div1');
//Import CSV
createNewButtons("Import to CSV","CSVImporting",CSVImporting,'div2');

function selectedCell(event) {
  let div = document.createElement('div');
  div.setAttribute('id',"div4");  
  div.style.marginTop ="5px";
  let label = document.createElement("label");
  label.innerHTML="Selected Cell Value:";
  let input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("id","selectedCelVal")
  input.setAttribute("disabled","disabled");
  input.style.marginBottom ="5px";
  div.appendChild(label);
  div.appendChild(input);
  body.appendChild(div);
}




function addRow(event){
  event.preventDefault();
    let result = document.getElementById('table');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let input = document.createElement('input');
      input.setAttribute("type", "text");
      input.style.width = '100px';
      input.style.border = '0px';
        td.style.border = '1px solid grey';
        input.value = i + 1;
        i++;
        input.style.textAlign = 'center';
        input.style.backgroundColor = "#b97455";
        td.appendChild(input);
        tr.appendChild(td);

    for (let count = 1; count < result.rows[0].cells.length; count++) {
      let td = document.createElement('td');
        let input = document.createElement('input');
        input.setAttribute("type", "text");
        input.style.width = '100px';
        input.style.border = '0px';
        td.style.border = '1px solid grey';
        td.appendChild(input);
        tr.appendChild(td);
    }
    result.appendChild(tr);
    //columnEventHandler(td);
}
function addCol(event){
  event.preventDefault();
    let result = document.getElementById('table');
    let td;
    let input;
    if (result.rows[0].cells.length > 26) {
        alert("Cannot Add more than 26 Columns.");
        return;
    } else {
        for (let m = 0; m < result.rows.length; m++) {
            let tr = result.rows[m];
            if (m == 0) {
                td = tr.insertCell(tr.cells.length);
                input = td.appendChild(document.createElement('input'));
                td.style.border = '1px solid grey';
                input.style.width = '100px';
                input.style.border = '0px';

                let asciiCode = String.fromCharCode(ascii);
                input.value = asciiCode;
                ascii++;
                input.style.backgroundColor = "#b97455";
                input.style.textAlign = 'center';
            } else {
                td = tr.insertCell(tr.cells.length);
                input = td.appendChild(document.createElement('input'));
                input.setAttribute("type", "text");
                input.style.width = '100px';
                input.style.border = '0px';
                td.style.border = '1px solid grey';
            }

            tr.appendChild(td);
        }
    }
}
  function delRow(event){
    event.preventDefault();
    if (i == 1) {
        alert("Error. Need at least One Row.");
        return;
    }
    let delRows = document.getElementById('table');
    delRows.deleteRow(i);
    i--;
  }
function delCol(event){
  event.preventDefault();
    let delCol = document.getElementById('table');
    let td;
    let input;
    if (ascii == 66) {
        alert("Error. Need atleast one Column.");
        return;
    }
    for (let y = 0; y < delCol.rows.length; y++) {
      delCol.rows[y].deleteCell(delCol.rows[y].cells.length - 1);
    }
    ascii--;
}
function CSVExporting(event){
  event.preventDefault();
    let result = document.getElementById('table');
      let tableRow = result.rows;
      let tableCol;
    for (let i = 0; i < tableRow.length; i++) {
        for (let j = 0; j < result.rows[i].cells.length; j++) {
          tableCol = result.rows[i].cells[j];
            if (tableCol.children.length) {
              tableCol.innerHTML = tableCol.children[0].value;
            }
        }
    }
    fileExport('spreadSheet.csv');
}
function CSVImporting(){
  let insertedFile = document.getElementById("insertedFile");
    let regex = /^([a-zA-Z0-9()\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(insertedFile.value.toLowerCase())) {
      if (typeof(FileReader) != "undefined") {
          let reader = new FileReader();
          reader.onload = function(e) {
              let table = document.getElementById('table');
               let rows = e.target.result.split("\n");
              for (let i = 0; i < rows.length; i++) {
                  let cells = rows[i].split(",");
                  if (cells.length >= 1) {
                      let tr = table.rows[i+1];
                      for (let j = 0; j < cells.length; j++) {
                          let td = tr.cells[j+1];
                          try{
                            td.innerHTML = cells[j];
                          }catch(err){
                            alert("Cannot Import File. Row(s) or Column(s) does not match.")
                            return;
                          }
                      }
                  }
              }
          }
          reader.readAsText(insertedFile.files[0]);
      } else {
          alert("Error! File upload is not supported with this Browser.");
      }
  } else {
      alert("Please upload a valid CSV file.");
  }
}

let createTable = (event) =>{
  let body = document.getElementById('body');
  let table = document.createElement('table');
  table.setAttribute('id', 'table');
  table.style.border = '1px solid black';
  table.style.width = '150px';
  table.style.borderCollapse = 'collapse';
  let tr = document.createElement('tr');
  tr.style.backgroundColor = "#b97455";
  ascii = 64;
  for (let item = 0; item < 26; item++) {
    for(;ascii< 91;ascii++){
      let td = document.createElement('td');
      let inputText = document.createElement('input');
      td.appendChild(inputText);
      inputText.style.width = '100px';
      inputText.style.border = '1px';
      td.style.border = '1px solid grey';
      inputText.readOnly = true;
      if (ascii == 64)
        inputText.value = '';
      else {
        inputText.value = String.fromCharCode(ascii);
        inputText.style.textAlign = 'center';
        inputText.style.backgroundColor = "#b97455";
      }
      td.style.textAlign = 'center';
      td.style.width = '100px';
      tr.appendChild(td);
      table.appendChild(tr);
    } 
  }

    for (i = 0; i < 15; i++) {
      let tr = document.createElement('tr');
      for (let f = 0; f <= 26; f++) {
          let td = document.createElement('td');
            let input = document.createElement('input')
              td.appendChild(input);
              input.setAttribute("type","text");
          if (f == 0) {
              input.style.width = '100px';
              input.style.border = '0px';
              td.style.border = '1px solid grey';
              input.value = i + 1;
              input.style.textAlign = 'center';
              input.style.backgroundColor = "#b97455";
              input.setAttribute("disabled","disabled");
              td.style.width = '100px';
          } else {
              input.style.width = '100px';
              input.style.border = '0px';
              td.style.border = '1px solid grey';
              let l = i+1;
              td.setAttribute("id", f+" "+l);
              handlingEventsInCol(td,event);
              td.style.width = '100px';
          }
          tr.appendChild(td);
          table.appendChild(tr);
    }
  }
  body.appendChild(table);
}
window.onload = function(event) {
  initLoad(event);
  toFindSelectedCell(); 
}

let initLoad = (event) =>{
  createTable(event);
}

// To download the CSV File
function downloadAsCSV(csv, name) {
  let file;
  let getLink;

  file = new Blob([csv], { type: "text/csv" });
  getLink = document.createElement("a");
    getLink.download = name;
    getLink.href = window.URL.createObjectURL(file);
    getLink.style.display = "none";
    document.body.appendChild(getLink);
    getLink.click();
}

// To Export to CSV
function fileExport(name) {
  let csv = [];
  let tableRow = document.querySelectorAll("table tr");
  for (let i = 1; i < tableRow.length; i++) {
      let row = [],
          cols = tableRow[i].querySelectorAll("td, th");
      for (let j = 1; j < cols.length; j++){
        row.push(cols[j].innerText);
      }
        csv.push(row.join(","));
  }
  // To Download  the CSV file
  downloadAsCSV(csv.join("\n"), name);
}

//To identify Change in Cell Value
const eqivalentNumbers = {
  'A':  1, 'B':  2, 'C':  3, 'D':  4, 'E':  5, 'F':  6, 'G':  7, 'H': 8,  'I':  9,
  'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18,
  'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
};

var handlingEventsInCol = (td, event) => {
  fromEvent(td, 'change').subscribe(function (event) {
          if (event.isTrusted) {
    if(td.querySelector('input').value.toLowerCase().indexOf("=sum")==0){
      var formulaValid = true;
    }
          if (formulaValid) {
              td.dataset.formula = td.querySelector('input').value;
              actualFormula = td.querySelector('input').value;
              td.classList.add("formula");
          }
              
          let forLoopFormula = Array.from(document.getElementsByClassName("formula"));
          if(forLoopFormula.length)
          {
            let g= forLoopFormula[0].id.split("");
            let i1 = g[0];
            let i2 = g[2];
            if(i1 == currentColIndex && i2 == currentRowIndex && document.getElementById(currentColIndex+" "+ currentRowIndex).children[0].value==''){
              forLoopFormula=[];
              td.classList="";
            }
          }        
              forLoopFormula.forEach(formula => {
                let idRemove = formula.id;
                idRemove.split("");
                let resCol = idRemove[0];
                let resRow = idRemove[2];
                let res = actualFormula.split("(");
                const operation = res[0];
                const arr = res[1].split(":");
                const start = arr[0];
                const end = arr[1].split(")")[0];
                let colValue = start.charAt(0);
                let endCol =end.charAt(0);
                startCol = eqivalentNumbers[colValue];
                endCol = eqivalentNumbers[endCol];
                let ROWst = parseInt(start.charAt(1));
                let ROWend = parseInt(end.charAt(1)); 
                let resultArr = [];
                   for (let row = ROWst; row <= ROWend; row++) {
                       for (let col = startCol; col <= endCol; col++) {
                        try{
                          let val = document.getElementById(col + " " + row).children[0].value;
                            var numVal = parseInt(val);
                            if(!isNaN(numVal)){
                              resultArr.push(numVal);
                            }else{
                               resultArr.push(0);
                            }
                        }catch(err){
                          alert("Error Occured. Please Re-check the formula or values!");
                          return;
                        }     
                       }
                   }
                   from(resultArr).pipe(map(temp =>  temp),
                       reduce( (total,temp) => total + temp, 0))
                   
                   .subscribe(data=>
                    document.getElementById(resCol+ " " + resRow).children[0].value= data);
                  });
           }
          });
  fromEvent(td, 'change').subscribe(function (event) {
    if (event.isTrusted) {
      if(td.querySelector('input').value.includes("=") && td.querySelector('input').value.toLowerCase().indexOf("=sum")!=0){
        var bodmasValid = true;
      }
            if (bodmasValid) {
        td.dataset.formula = td.querySelector('input').value;
        actualFormulaBodmas = td.querySelector('input').value;
        td.classList.add("bodmas");
    }

    cellFormulaBod = Array.from(document.getElementsByClassName("bodmas"));
      if(cellFormulaBod.length){
       inputToObs = actualFormulaBodmas.split(/([=*/%+-])/g).splice(2);
            let g= cellFormulaBod[0].id.split("");
            let i1 = g[0];
            let i2 = g[2];
            if(i1 == currentColIndex && i2 == currentRowIndex && document.getElementById(currentColIndex+" "+ currentRowIndex).children[0].value==''){
              cellFormulaBod=[];
              td.classList="";
            }
      }
        
      cellFormulaBod.forEach(bodmas => {
        let idRemove = cellFormulaBod[0].id;
        idRemove.split("");
        let resCol = idRemove[0];
        let resRow = idRemove[2];
        let bodmasResul='';
        let numberArray=[];
        let calculationsArray=[];
          for(j=0;j<inputToObs.length;j=j+2){
            let colValue = inputToObs[j].charAt(0);
            startCol = eqivalentNumbers[colValue];
            let ROWst = inputToObs[j].charAt(1);
            var val = document.getElementById(startCol + " " + ROWst).children[0].value; 
            numberArray.push(parseInt(val)); 
          }
          for(k=1;k<inputToObs.length;k=k+2){
            calculationsArray.push(inputToObs[k]); 
          }
          while(numberArray.length!=1){
            bodmasResul = bodmasResul + numberArray.shift() + calculationsArray.shift(); 
          }
        bodmasResul = bodmasResul + numberArray.shift();
        if(eval(bodmasResul) == "Infinity"){
          alert("Divide by 0 is not allowed!");
        }else if(isNaN(eval(bodmasResul))){
          alert("Error! Please check the input values");
        }else{
          document.getElementById(resCol+ " " + resRow).children[0].value = eval(bodmasResul);
        }
    })
  }  
  })
}
// Function to identify the current selected Cell
function toFindSelectedCell() {
  document.querySelector("#table").addEventListener("click", function(event) {
      let td = event.target.parentNode;
      currentColIndex = td.cellIndex;
      let tr = td.parentNode;
      currentRowIndex = tr.rowIndex;
  })
};