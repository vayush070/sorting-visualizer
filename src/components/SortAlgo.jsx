import { useEffect, useRef, useState } from "react";
import Visualizer from "./Visualizer";

function SortAlgo({ prop1 }) {
  const [array, setArray] = useState(prop1);
  const [delay, setDelay] = useState(400);
  const [hl, setHl] = useState([-1,-1]);

  const delayRef = useRef(delay);
  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Bubble Sort
  async function bubbleSort(arr) {
    const t1 = performance.now();
    let delay_cnt = 0;
    let cnt_d = 0;
    let newArr = [...arr];
    let n = newArr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (newArr[j] > newArr[j + 1]) {
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        }
        setHl([j+1,-1]);
        setArray([...newArr]);
        await sleep(delayRef.current);
        delay_cnt+=delayRef.current;
        cnt_d++;
      }
    }
    const t2 = performance.now();
    console.log(`Delay Times - ${cnt_d}`);
    console.log(`Delay Total - ${delay_cnt}`);
    console.log(`Total Time taken - ${t2 - t1} ms`);
    console.log(`Soting Time - ${t2-t1-delay_cnt}`);
    setHl([-1,-1]);
  }

  // Insertion Sort
  async function insertionSort(arr) {
    let newArr = [...arr];
    for (let i = 1; i < newArr.length; i++) {
      
      let key = newArr[i];
      let j = i - 1;
      // setHl([i, j]);
      while (j >= 0 && newArr[j] > key) {
        setHl([j, -1]);
        [newArr[j + 1], newArr[j]] = [newArr[j], newArr[j+1]];
        j = j - 1;
        setArray([...newArr]);
        await sleep(delayRef.current);
      }
    }
    setHl([-1,-1]);
  }

  // Selection Sort
  async function selectionSort(arr) {
    let newArr = [...arr];
    let n = newArr.length;
    for (let i = 0; i < n; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (newArr[j] < newArr[minIndex]) {
          minIndex = j;
        }
        setHl([j, -1]);
        await sleep(delayRef.current);
      }
      if (minIndex !== i) {
        [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
      }
      setHl([i, -1]);
      setArray([...newArr]);
      await sleep(delayRef.current);
    }
    setHl([-1,-1]);
  }

  // Merge Sort
  async function mergeSortHelper(newArr, start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(newArr, start, mid);
    await mergeSortHelper(newArr, mid + 1, end);

    let left = start, right = mid + 1;
    const temp = [];

    while (left <= mid && right <= end) {
      setHl([left, right]);
      await sleep(delayRef.current);
      if (newArr[left] <= newArr[right]) {
        temp.push(newArr[left++]);
      } else {
        temp.push(newArr[right++]);
      }
    }
    while (left <= mid) temp.push(newArr[left++]);
    while (right <= end) temp.push(newArr[right++]);

    for (let i = start; i <= end; i++) {
      newArr[i] = temp[i - start];
    }
    setArray([...newArr]);
    await sleep(delayRef.current);
  }

  async function mergeSort(arr) {
    let newArr = [...arr];
    await mergeSortHelper(newArr, 0, newArr.length - 1);
    setHl([-1,-1]);
  }

  // Quick Sort
  async function quickSortHelper(newArr, low, high) {
    if (low >= high) return;

    let pivot = newArr[high];
    let i = low;

    for (let j = low; j < high; j++) {
      
      if (newArr[j] < pivot) {
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        setHl([i, j]);
        setArray([...newArr]);
        await sleep(delayRef.current);
        i++;
      }
    }
    [newArr[i], newArr[high]] = [newArr[high], newArr[i]];
    setArray([...newArr]);
    await sleep(delayRef.current);

    await quickSortHelper(newArr, low, i - 1);
    await quickSortHelper(newArr, i + 1, high);
  }

  async function quickSort(arr) {
    let newArr = [...arr];
    await quickSortHelper(newArr, 0, newArr.length - 1);
    setHl([-1,-1]);
  }

  function generateArray(size = 20) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 5);
  }

  return (
    <div className="sorting-container">
      {/* <h2 className="sorting-title">Sorting Visualizer</h2> */}
      <i className="delay-text">Delay: {delay}ms</i>

      {/* Sorting Buttons */}
      <div className="button-group">
        <button className="btn btn-blue" onClick={() => bubbleSort(array)}>
          Bubble Sort
        </button>
        <button className="btn btn-blue" onClick={() => insertionSort(array)}>
          Insertion Sort
        </button>
        <button className="btn btn-blue" onClick={() => selectionSort(array)}>
          Selection Sort
        </button>
        <button className="btn btn-blue" onClick={() => mergeSort(array)}>
          Merge Sort
        </button>
        <button className="btn btn-blue" onClick={() => quickSort(array)}>
          Quick Sort
        </button>
      </div>

      {/* Array Controls */}
      <div className="button-group">
        <button className="btn btn-green" onClick={() => window.location.reload()}>
          Reset Array
        </button>
        <button className="btn btn-yellow" onClick={() => setDelay(delay + 100)}>
          Slow Down
        </button>
        <button
          className="btn btn-red"
          onClick={() => setDelay(Math.max(50, delay - 100))}
        >
          Speed Up
        </button>
      </div>

      <Visualizer prop2={array} hl={hl} />
    </div>
  );
}

export default SortAlgo;
