function extractUniqueCharacters(str) {
  let unique = [...new Set(str)].join('');
  console.log(unique);
}

extractUniqueCharacters("thequickbrownfoxjumpsoverthelazydog");
