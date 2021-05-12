import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit();
const HIDDEN = ["README.md", "CNAME", ".nojekyll", ".gitignore"];

// dir tree
document.addEventListener("DOMContentLoaded", async function(){
  const req = await octokit.request(
    //"GET /repos/iterative/static/git/trees/main" +
    "GET /repos/iterative/static/contents/" + (
      window.location.pathname.replace(/\/$/, "") || "."
    )
  );
  const tree = req.data;

  let contents = document.getElementById("contents");
  contents.innerHTML = "";
  var li;
  tree.forEach(function(i){
    if (!HIDDEN.includes(i.path)) {
      li = document.createElement("li");
      li.innerHTML = '<a href="/' + i.path + '">' + i.path + (i.type == "file" ? '' : '/') + '</a>';
      contents.appendChild(li);
    }
  });
});
