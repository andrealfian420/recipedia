const listChecker = (str) => {
  const isOrderedList = str.includes('<ol>');
  const isUnorderedList = str.includes('<ul>');

  if (isOrderedList) {
    let newStr = str.replace(/<ol>/g, '');
    const newListElement = `<ol class="list-decimal recipe-list">${newStr}`;
    return newListElement;
  }

  if (isUnorderedList) {
    let newStr = str.replace(/<ul>/g, '');
    const newListElement = `<ul class="list-disc recipe-list">${newStr}`;
    return newListElement;
  }

  return str;
};

export default listChecker;
