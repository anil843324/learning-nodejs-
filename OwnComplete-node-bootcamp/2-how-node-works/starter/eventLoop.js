/*
 NodeJs provides three ways to call asynchrounous functions
 1) setImmediate()
 use setImmediate() when you want to execute some function asynchronously , but as soon as possible and after finishing the
 current block.

 2) setTimeout()
 use setTimeout() when you want to execute some function asynchronously, after a specified 
 delay and after finishing the current block.

 3) process.nextTick()

 callbacks scheduled using process.nextTick() will be processed after the 
 execution of the current phase


*/

const fs = require("fs");

const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE=1;
setTimeout(() => {
  console.log("Tier 1 finished");
}, 0);

setImmediate(() => {
  console.log("Immediate 1 finished");
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");

  console.log("------------");
  setTimeout(() => {
    console.log("Tier 2 finished");
  }, 0);

  setTimeout(() => {
    console.log("Tier 3 finished");
  }, 3000);

  setImmediate(() => {
    console.log("Immediate 2 finished");
  });

  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("hello from the top-level code");
