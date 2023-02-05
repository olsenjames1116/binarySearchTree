export default function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }
    const half = Math.ceil(array.length / 2);

    const leftHalf = array.slice(0, half);
    const rightHalf = array.slice(half);
    const firstArray = mergeSort(leftHalf);
    const secondArray = mergeSort(rightHalf);
    let mergedArray = [];

    while(firstArray.length !== 0 && secondArray.length !== 0) {
        if (secondArray[0] > firstArray[0]) {
            mergedArray.push(firstArray.shift());
        } else {
            mergedArray.push(secondArray.shift());
        }
    }

    if (firstArray.length === 0) {
        return mergedArray.concat(secondArray);
    } else {
        return mergedArray.concat(firstArray);
    }
}