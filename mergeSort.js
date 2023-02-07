// Uses the merge sort algorithm to return a sorted array
export default function mergeSort(array) {
  // If the length of the array is less than two, the end of the array has been reached
  if (array.length < 2) {
    return array;
  }
  /* The merge sort algorithm involves finding the halfway point then sorting the left 
  half of the array, then sorting the right half of the array. This is done recursively */
  const half = Math.ceil(array.length / 2);

  const leftHalf = array.slice(0, half);
  const rightHalf = array.slice(half);
  const firstArray = mergeSort(leftHalf);
  const secondArray = mergeSort(rightHalf);
  let mergedArray = [];

  while (firstArray.length !== 0 && secondArray.length !== 0) {
    if (secondArray[0] > firstArray[0]) {
      mergedArray.push(firstArray.shift());
    } else {
      mergedArray.push(secondArray.shift());
    }
  }

  // If either array is empty, merge the remainder of the other array
  if (firstArray.length === 0) {
    return mergedArray.concat(secondArray);
  } else {
    return mergedArray.concat(firstArray);
  }
}
