const firstIsPredecessorOfSecond = (first: string, second: string): boolean => {
  if (first.length === second.length - 1) {
    let numDiffs = 0;
    let firstIndex = 0;
    for (let i = 0; i < second.length; i++) {
      if (first.charAt(firstIndex) !== second.charAt(i)) {
        numDiffs++;
        if (numDiffs > 1) {
          return false;
        }
      } else {
        // Only move the first word's index forward if there's a match.
        firstIndex++;
      }
    }
    return true;
  }
  return false;
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("firstIsPredecessorOfSecond", () => {
    expect(firstIsPredecessorOfSecond("abcd", "dbqca")).toBe(false);
    expect(firstIsPredecessorOfSecond("dbqca", "abcd")).toBe(false);
    expect(firstIsPredecessorOfSecond("ba", "abc")).toBe(false);
    expect(firstIsPredecessorOfSecond("ab", "cab")).toBe(true);
  });
}
