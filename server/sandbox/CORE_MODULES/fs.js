// const FS = require("fs");

/********* מעבר בין נתיבים **********/
// cd ./  הנתיב בתיקייה בה נמצא הקובץ
// cd ../ יציאה מהתיקייה לתיקיית האב
// cd <folder name> כניסה לתיקייה

/********* יצירת תיקייה חדשה **********/
// FS.mkdir("./test", { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// FS.mkdir("./test", { recursive: false }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// מייצר את התיקייה אבל אין גישה לנתיב בגלל שאין אובייקט קונפיגורציות כארגומנט שני
// FS.mkdir("./test", (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// FS.mkdir("./test", error => {
//   if (error) return console.log(error.message);
//   console.log("FS made the test folder");
// });

// FS.mkdir("./test", () => {});

/********* מחיקת תיקייה **********/
// FS.rmdir(`${__dirname}/test`, error => {
//   if (error) return console.log(error.message);
//   console.log("The directory was removed!!!");
// });

// FS.rmdir(`${__dirname}/test`, error => {
//   if (error) return console.log(error.message);
//   console.log("The directory in CORE_MODULES was removed!!!");
//   FS.rmdir("../test", error => {
//     if (error) return console.log(error.message);
//     console.log("The directory in SANDBOX was removed!!!");
//   });
// });

/********* יצירת קובץ חדש **********/
// FS.writeFile(
//   `${__dirname}/test.html`,
//   "David Yakin is the king!!!!!",
//   "utf8",
//   error => {
//     if (error) return console.log(error.message);
//     console.log("I made a file!!!");
//   }
// );

// FS.mkdir(`${__dirname}/test`, { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
//   FS.writeFile(
//     `${__dirname}/test/test.html`,
//     "David Yakin is the king!!!!!",
//     "utf8",
//     error => {
//       if (error) return console.log(error.message);
//       console.log("I made a file!!!");
//     }
//   );
// });

/***** FS exe *****/
// const getTime = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();
//   return `${day}-${month + 1}-${year}`;
// };

// FS.mkdir(`${__dirname}/logs`, { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`logs folder created!! in ${path}`);
//   FS.writeFile(
//     `${__dirname}/logs/${getTime()}.log`,
//     `error message - ${new Date().toLocaleTimeString()}`,
//     error => {
//       if (error) return console.log(error.message);
//       console.log("file created");
//     }
//   );
// });

/********* מחיקת קובץ **********/
// FS.unlink(`${__dirname}/test/test.html`, error => {
//   if (error) return console.log(error.message);
//   console.log("Successfully removed the file!!!");
// });

// FS.readdir(`${__dirname}/test`, (error, files) => {
//   if (error) return console.log(error.message);

//   files.forEach(file => {
//     FS.unlink(`${__dirname}/test/${file}`, error => {
//       if (error) return console.log(error.message);
//     });
//   });
// });

/********* existsSync **********/
// const isExists = FS.existsSync(`${__dirname}/test`);
// console.log(isExists);

/********* async **********/

const { mkdir, writeFile, appendFile } = require("fs/promises");

mkdir(`${__dirname}/test`)
  .then(() => console.log("Made a new directory successfully!"))
  .catch(error => console.log(error.message));

const makeFolderAndFile = async () => {
  try {
    const isExists = FS.existsSync(`${__dirname}/test`);
    if (!isExists) await mkdir(`${__dirname}/test`);
    await writeFile(`${__dirname}/test/testing.txt`, "no!!!!!\n");
    const isFileExists = FS.existsSync(`${__dirname}/test/testing.txt`);
    if (!isFileExists)
      await writeFile(`${__dirname}/test/testing.txt`, "yes!!!!!\n");
    await appendFile(`${__dirname}/test/testing.txt`, "more data!!!\n");
  } catch (error) {
    console.log(error.message);
  }
};

makeFolderAndFile();

/***** Fs EXE-02 *****/
// const FS = require("fs");
// const { mkdir, writeFile, readdir, rmdir, unlink } = require("fs/promises");

// const users = [
//   { name: "yononb", last: "vannuc" },
//   { name: "david", last: "king" },
//   { name: "tasd", last: "asdaf" },
// ];

// const API_URL = `${__dirname}/users`;

// const removeFilesAndFolder = async () => {
//   try {
//     const userFiles = await readdir(`${__dirname}/users`); // מערך רק במקרה ואין קבצים ומערך עם שמות הקבצים במידה ויש בנתיב
//     if (userFiles.length) {
//       // עושה בדיקה אם יש אורך למערך כי אם לא אני לא רוצה לנסות למחוק קובץ שלא קיים
//       for (const file of userFiles) {
//         await unlink(`${API_URL}/${file}`);
//       }
//     }
//     await rmdir(API_URL); // עכשיו אני מוגן מכך שלא אנסה למחוק תיקייה שיש בתוכה קבצים
//     console.log("Files and folder removed successfully!");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const makeAndRemoveFilesAndFolder = async () => {
//   try {
//     const isExist = FS.existsSync(`${__dirname}/users`);
//     if (isExist) await removeFilesAndFolder();

//     await mkdir(API_URL);

//     for (const user of users) {
//       await writeFile(
//         `${API_URL}/${user.name}-${user.last}.txt`,
//         `${user.name} ${user.last}`
//       );
//     }
//     console.log("made files and folder!");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// makeAndRemoveFilesAndFolder();

// setTimeout(() => removeFilesAndFolder(), 15000);
