// Code is not working locally, because there are missing dependencies like textFile function included in the sandboxx of the book
function activityTable(day) {
  //Creating a table for 24 hours of a day
  let table = [];
  for (let i = 0; i < 24; i++) {
    table[i] = 0;
  }

  return textFile("camera_logs.txt")
    .then((files) => {
      return Promise.all(
        files.split("\n").map((file) => {
          return textFile(file).then((log) => {
            for (let line of log.split("\n")) {
              let date = new Date(Number(line));
              if (date.getDay() === day) {
                table[date.getHours()]++;
              }
            }
          });
        })
      );
    })
    .then(() => table);
}
