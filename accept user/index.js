//let username;
//username = window.prompt("what is your user name?");
//console.log(username);
let username;

document.getElementById("mysubmit").onclick = function () {
  username = document.getElementById("myetxt").value;
  document.getElementById("myH1").textContent = `Hello ${username}`;
};
