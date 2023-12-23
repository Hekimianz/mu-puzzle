import styles from "./App.module.css";
import { useState, useRef, useEffect } from "react";
function App() {
  const [strings, setStrings] = useState(["MI"]);
  const [occurenceNumber, setOccurenceNumber] = useState(1);
  const [occurenceNumber4, setOccurenceNumber4] = useState(1);
  const renderStrings = strings.map((string) => {
    return (
      <li key={string} className={styles.derivation}>
        {string}
      </li>
    );
  });

  const ruleOne = (string) => {
    if (string[string.length - 1] === "I") {
      setStrings((prev) => {
        const resultsReversed = [...prev, string.concat("U")];
        return resultsReversed;
      });
    } else {
      alert("This rule isn't applicable");
    }
  };

  const ruleTwo = (string) => {
    const split = string.split("M").join("");
    setStrings((prev) => {
      return [...prev, string.concat(split)];
    });
  };

  const occurences = (string, occurrence) => {
    const indices = [];
    let index = string.indexOf("III");
    while (index !== -1) {
      indices.push(index);
      index = string.indexOf("III", index + 1);
    }

    if (indices.length >= occurrence && occurrence > 0) {
      const replaceIndex = indices[occurrence - 1];
      const newString =
        string.substring(0, replaceIndex) +
        "U" +
        string.substring(replaceIndex + 3);
      setStrings((prev) => [...prev, newString]);
    }
  };

  const ruleThree = (string) => {
    const matches = string.match(/III/g);
    if (matches && matches.length > 1) {
      occurences(string, occurenceNumber);
    } else if (matches && matches.length > 0) {
      occurences(string, occurenceNumber);
    } else {
      alert("none");
    }
  };

  const occurencesU = (string, occurrence) => {
    const indices = [];
    let index = string.indexOf("UU");
    while (index !== -1) {
      indices.push(index);
      index = string.indexOf("UU", index + 1);
    }

    if (indices.length >= occurrence && occurrence > 0) {
      const replaceIndex = indices[occurrence - 1];
      const newString =
        string.substring(0, replaceIndex) +
        "" +
        string.substring(replaceIndex + 2);
      setStrings((prev) => [...prev, newString]);
    }
  };

  const ruleFour = (string) => {
    const matches = string.match(/UU/g);
    if (matches && matches.length > 1) {
      occurencesU(string, occurenceNumber4);
    } else if (matches && matches.length > 0) {
      occurencesU(string, occurenceNumber4);
    } else {
      alert("none");
    }
  };

  const resultsContainerRef = useRef(null);

  useEffect(() => {
    const resultsContainer = resultsContainerRef.current;
    if (resultsContainer) {
      resultsContainer.scrollTop = resultsContainer.scrollHeight;
    }
  }, [strings]);

  return (
    <div className={styles.cont}>
      <h1 className={styles.title}>MU Puzzle</h1>
      <ul className={styles.resultsCont} ref={resultsContainerRef}>
        {renderStrings}
      </ul>
      <div className={styles.buttonsCont}>
        <button onClick={() => ruleOne(strings[strings.length - 1])}>
          Rule 1
        </button>
        <button onClick={() => ruleTwo(strings[strings.length - 1])}>
          Rule 2
        </button>
        <div className={styles.ruleThreeCont}>
          <button onClick={() => ruleThree(strings[strings.length - 1])}>
            Rule 3
          </button>
          <input
            type="number"
            value={occurenceNumber}
            onChange={(e) => setOccurenceNumber(parseInt(e.target.value, 10))}
            className={styles.ruleThreeInput}
          />
        </div>
        <div className={styles.ruleThreeCont}>
          <button onClick={() => ruleFour(strings[strings.length - 1])}>
            Rule 4
          </button>
          <input
            type="number"
            value={occurenceNumber4}
            onChange={(e) => setOccurenceNumber4(parseInt(e.target.value, 10))}
            className={styles.ruleThreeInput}
          />
        </div>
      </div>
      <div className={styles.explicationsCont}>
        <div className={styles.explication}>
          <h2>Rule 1</h2>
          <p>
            If you possess a string whose last letter is 'I', you can add on a
            'U' at the end.
          </p>
        </div>
        <div className={styles.explication}>
          <h2>Rule 2</h2>
          <p>Suppose you have Mx. Then you may add Mxx to your collection.</p>
        </div>
        <div className={styles.explication}>
          <h2>Rule 3</h2>
          <p>
            If 'III' occurs, you may replace it with 'U'. Select the occurence
            number in the input.
          </p>
        </div>
        <div className={styles.explication}>
          <h2>Rule 4</h2>
          <p>
            If 'UU' occurs in one of your strings, you can drop it. Select the
            occurence number in the input.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
