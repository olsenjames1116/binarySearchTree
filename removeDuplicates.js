// Removes duplicate elements from an array
export default function removeDuplicates(array) {
    return [...new Set(array)];
}