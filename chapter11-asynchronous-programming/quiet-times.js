// Code is not working locally, because there are missing dependencies like textFile function included in the sandboxx of the book
async function activityTable(day) {
  let table = [];
  for (let i = 0; i < 24; i++) {
    table[i] = 0;
  }
  let logFileList = await textFile("camera_logs.txt");
  // Getting list of file names
  const fileNames = logFileList.split("\n");
  // Getting file name
  for (let fileName of fileNames) {
    const fileContent = await textFile(fileName);
    // Getting list of file content
    const fileContentList = fileContent.split("\n");
    for (let line of fileContentList) {
      // Transferring string into number ant then Date object
      const date = new Date(Number(line));
      if (date.getDay() === day) {
        table[date.getHours()]++;
      }
    }
  }
  return table;
}

activityTable(1).then((table) => console.log(activityGraph(table)));
