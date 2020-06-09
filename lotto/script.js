function init(){
    document.getElementById('loadCSVFile').addEventListener('click', clickFileInput, false);
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  }

  function clickFileInput() {
    document.getElementById('fileInput').click();
  }
  
  function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }

  function isNotBlank(input) {
    return (input && input.trim() !== "");
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  function handleFileLoad(event){
    console.log("handleFIleLoad...")
    var lines = event.target.result.split(/\r?\n/)
    var nonEmptyLines = lines.filter(isNotBlank)
    console.log( document.getElementById('rowsNumber'));
    document.getElementById('rowsNumber').textContent = lines.length
    document.getElementById('nonEmptyRowsNumber').textContent = nonEmptyLines.length
    var limitAsString = document.getElementById('limit').value;
    console.log("Limit as string: " + limitAsString)
    var limit = parseInt(limitAsString);

    console.log("Limit: " + limit)
    console.log(typeof limit)

    var lineNumbers = getLineNumber(nonEmptyLines)
    console.log(lineNumbers)

    var shuffledLineNumber = shuffle(lineNumbers)
    console.log(shuffledLineNumber)

    var output = generateOutput(nonEmptyLines, shuffledLineNumber, limit)

    console.log(output)

    download("output.csv", output.join("\r\n"))
  }

  function generateOutput(lines, lineNumbers, limit) {
    var result = new Array(limit)
    for (var i = 0; i < limit; i++) {
        result[i] = lines[lineNumbers[i]]
    }
    return result;
  }

  function getLineNumber(lines) {
    var result = new Array(lines.length);
    for(i = 0; i < lines.length; i++) {
        result[i] = i;
    }
    return result;
  }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
  
  init();