let objarray = [];
function parseStory(rawStory) {
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
      obj.pos = "adjective";
      objarray.push(obj);
    } else {
      let obj = {};
      obj.word = arrayOfWord[i];
      objarray.push(obj);
    }
  }
  return objarray;
}

//diplay the story
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsEdit = document.getElementById("madLibsEdit");
    const madLibsPreview = document.getElementById("madLibsPreview");
    const edit = document.createElement("p");
    const privew = document.createElement("p");
    madLibsEdit.append(edit);
    madLibsPreview.append(privew);
    let inputWord;
    let copiedWord;
    let numOfInput = 0;
    const normalWord = document.createElement("span");
    //extracting the words from the array of obj:
    processedStory.forEach((element) => {
      if ("pos" in element) {
        inputWord = document.createElement("input");
        inputWord.classList.add("toEdit");
        inputWord.setAttribute("id", `input${numOfInput}`);
        inputWord.setAttribute("maxlength", "20");
        inputWord.setAttribute("placeholder", element.pos);

        //inputWord.setAttribute('oninput',detectInput())
        //console.log(inputWord.id)
        copiedWord = document.createElement("span");
        copiedWord.classList.add("blank");
        copiedWord.setAttribute("id", `copy${numOfInput}`);
        copiedWord.innerHTML = `(${element.pos})`;

        //console.log(copiedWord.id)
        edit.append(inputWord.cloneNode(true));
        privew.append(copiedWord.cloneNode(true));
        numOfInput += 1;
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
        //console.log("there is input");
        const allCopied = document.getElementsByClassName("blank");

        const myInputText = allInputs[i].value;
        allCopied[i].textContent = myInputText + " ";
        return;
      }
    }
    //use enter to loop through inputs :
    const firstinput = document.getElementById("input0");
    firstinput.focus();

    for (let i = 0; i < allInputs.length - 1; i++) {
      allInputs[i].addEventListener("keypress", (e) => {
        if (e.key === "Enter") allInputs[i + 1].focus();
      });
    }
    //play the sound
    document.getElementById("myAudio").play();
  });
