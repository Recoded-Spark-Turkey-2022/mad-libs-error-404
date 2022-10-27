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

function parseStory(rawStory) {
  // Your code here.
  let arrayOfWord = rawStory.split(" ");
  let objarray = [];
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
  console.log(objarray);
  return {}; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
