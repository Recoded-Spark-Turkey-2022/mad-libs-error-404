/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
let objarray = [];
function parseStory(rawStory) {
  // Your code here.

  let arrayOfWord = rawStory.split(" ");

  for (let i = 0; i < arrayOfWord.length; i++) {
    if (/\w\[n\]/.test(arrayOfWord[i])) {
      let obj = {};
      let x = /\w+/g;
      obj.word = arrayOfWord[i].match(x)[0];
      obj.pos = "noun";
      objarray.push(obj);
    } else if (/\w\[v\]/.test(arrayOfWord[i])) {
      let obj = {};
      let x = /\w+/g;
      obj.word = arrayOfWord[i].match(x)[0];
      obj.pos = "verb";
      objarray.push(obj);
    } else if (/\w\[a\]/.test(arrayOfWord[i])) {
      let obj = {};
      let x = /\w+/g;
      obj.word = arrayOfWord[i].match(x)[0];
      obj.pos = "adve";
      objarray.push(obj);
    } else {
      let obj = {};
      obj.word = arrayOfWord[i];
      objarray.push(obj);
    }
  }
  // need to edit for showing dots and commas
  return objarray; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
function editStory(story) {}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    //console.log(processedStory);
    const madLibsEdit = document.getElementById("madLibsEdit");
    const madLibsPreview = document.getElementById("madLibsPreview");
    const edit = document.createElement("p");
    const privew = document.createElement("p");
    madLibsEdit.append(edit);
    madLibsPreview.append(privew);
    let inputWord;
    let copiedWord;
    const normalWord = document.createElement("span");
    //extracting the words from the array of obj:
    processedStory.forEach((element, i) => {
      if ("pos" in element) {
        inputWord = document.createElement("input");
        inputWord.classList.add("toEdit");
        inputWord.setAttribute("id", `input${i}`);
        inputWord.setAttribute("maxlength", "20");
        //inputWord.setAttribute('oninput',detectInput())
        //console.log(inputWord.id)
        copiedWord = document.createElement("span");
        copiedWord.classList.add("blank");
        copiedWord.setAttribute("id", `copy${i}`);

        //console.log(copiedWord.id)
        edit.append(inputWord.cloneNode(true));
        privew.append(copiedWord.cloneNode(true));
      } else {
        normalWord.textContent = `${element.word} `;
        edit.append(normalWord.cloneNode(true));
        privew.append(normalWord.cloneNode(true));
      }
    });

    //connecting the madLibsEdit eith madLibsPreview
    const allInputs = document.getElementsByClassName("toEdit");
    for (let i = 0; i < allInputs.length; i++) {
      //ask about iteration through allInputs
      // console.log(allInputs[i]);

      allInputs[i].addEventListener("input", detectInput);
      function detectInput() {
        console.log("there is input");
        const allCopied = document.getElementsByClassName("blank");

        const myInputText = allInputs[i].value;
        allCopied[i].textContent = myInputText;
        return;
      }
    }
  });
