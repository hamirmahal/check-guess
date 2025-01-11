type Color = "Y" | "B" | "G";
function check(guess: string, answer: string): Array<Color> {
  const result: Array<Color> = new Array(answer.length).fill("B");
  const charToFreq = new Map<string, number>();
  for (const ch of answer) {
    const currentFreq = charToFreq.get(ch) ?? 0;
    charToFreq.set(ch, currentFreq + 1);
  }

  // Check letters that are in the answer, and in the correct position.
  for (let i = 0; i < answer.length; i += 1) {
    if (guess.charAt(i) === answer.charAt(i)) {
      result[i] = "G";
      const currentFreq = charToFreq.get(answer.charAt(i)) ?? 0;
      if (currentFreq === 1) {
        charToFreq.delete(answer.charAt(i));
      } else {
        charToFreq.set(answer.charAt(i), currentFreq - 1);
      }
    }
  }

  // Check for letters that are in the answer.
  for (let i = 0; i < answer.length; i += 1) {
    const currentCharacter = guess.charAt(i);
    if (charToFreq.has(currentCharacter)) {
      result[i] = "Y";
    }
  }

  return result;
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("checks green guesses", () => {
    expect(check("baker", "tamer")).toStrictEqual(["B", "G", "B", "G", "G"]);
  });

  it("checks yellow guesses", () => {
    expect(check("rouge", "tamer")).toStrictEqual(["Y", "B", "B", "B", "Y"]);
  });

  it("checks basic functionality", () => {
    expect(check("CRAZY", "CRAWL")).toStrictEqual(["G", "G", "G", "B", "B"]);
  });

  it("checks blue and green letters", () => {
    expect(check("NAIVE", "NICHE")).toStrictEqual(["G", "B", "Y", "B", "G"]);
  });

  it("checks a letter in the right position, and then the same letter again", () => {
    expect(check("HELLO", "RAILS")).toStrictEqual(["B", "B", "B", "G", "B"]);
  });
}
