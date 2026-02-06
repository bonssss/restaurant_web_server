import spellchecker from 'simple-spellchecker';

// spellchecker.getDictionary("en-US", function(err, dictionary) {
//     if(err) {
//         console.log("Error loading dictionary: " + err);
//     } else {
//         const word = "graet";
//         if(dictionary.spellCheck(word)) {
//             console.log(`The word "${word}" is spelled correctly.`);
//         } else {
//             console.log(`The word "${word}" is misspelled.`);
//             const suggestions = dictionary.getSuggestions(word);
//             console.log("Did you mean: " + suggestions.join(", "));
//         }
//     }
// 


const inputString = "I am feling grat!";

spellchecker.getDictionary("en-US", function (err, dictionary) {
  if (err) {
    console.error(err);
    return;
  }

  const correctSpelling = (text) => {
    const words = text.split(" ");
    const corrections = [];

    for (let word of words) {
      const cleanWord = word.replace(/[^\w]/g, ""); // remove punctuation
      const punctuation = word.replace(/\w/g, "");  // keep punctuation
      console.log("WORD:", cleanWord);
    console.log("spellCheck:", dictionary.spellCheck(cleanWord));
    console.log("suggestions:", dictionary.getSuggestions(cleanWord));
    console.log("--------------");

      // ✅ FIX: if word is NOT correct → correct it
      if (!dictionary.spellCheck(cleanWord)) {
        const options = dictionary.getSuggestions(cleanWord);

        // choose better suggestion (not always first)
        const best = options.find(o => o.length >= cleanWord.length) || cleanWord;

        corrections.push(best + punctuation);
      } else {
        corrections.push(word);
      }
    }

    return corrections.join(" ");
  };

  console.log(correctSpelling(inputString));
});



