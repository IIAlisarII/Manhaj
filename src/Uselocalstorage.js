import { useState, useEffect } from "react";
 
// Works exactly like useState, but the value is also saved in localStorage
// under `key`, so it survives a page refresh.
//   const [tasks, setTasks] = useLocalStorage("my-key", [])
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key); // text, or null if nothing saved yet
      if (saved !== null) {
        return JSON.parse(saved); // text -> real array/object/number
      }
    } catch (error) {
      console.log("Could not read from localStorage:", error);
    }
    return initialValue; // nothing saved yet: use the starting value
  });
 
  // Runs after every change to `value` (or `key`): save it.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value)); // array/object -> text
    } catch (error) {
      console.log("Could not save to localStorage:", error);
    }
  }, [key, value]);
 
  return [value, setValue];
}
 
export default useLocalStorage;