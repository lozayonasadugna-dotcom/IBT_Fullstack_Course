// ==========================================
// EXERCISE 1: Async Fetch USD to ETB Rate
// ==========================================
async function getUsdToEtbRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    
    const data = await res.json();
    const rate = data.rates.ETB;
    console.log("Exercise 1 - USD to ETB Rate:", rate);
    return rate;
  } catch (error) {
    console.error("Exercise 1 Error:", error.message);
  }
}

// ==========================================
// EXERCISE 2: Rewrite .then Chain to async/await
// ==========================================
async function fetchAndRenderPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    console.log("Exercise 2 - Fetched Post:", data);
  } catch (err) {
    console.error("Exercise 2 Error:", err.message);
  }
}

// ==========================================
// EXERCISE 3: Network Error vs HTTP 404 Error
// ==========================================
async function demonstrateErrorTypes() {
  // 1. Network Error (invalid URL domain causes direct rejection)
  try {
    await fetch("https://invalid-domain-that-does-not-exist-123.org");
  } catch (err) {
    console.log("Exercise 3 - Network Error Caught:", err.message);
  }

  // 2. HTTP Error (404 status resolves fetch, requires res.ok check)
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/nonexistent-endpoint");
    if (!res.ok) {
      throw new Error(`HTTP 404 Error (res.ok was false): ${res.status} ${res.statusText}`);
    }
    await res.json();
  } catch (err) {
    console.log("Exercise 3 - 404 Error Caught:", err.message);
  }
}

// ==========================================
// EXERCISE 4: Parallel Fetching with Promise.all
// ==========================================
async function fetchPostDetailsInParallel() {
  try {
    const listRes = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!listRes.ok) throw new Error("Failed to fetch list");
    const posts = await listRes.json();

    // Fetch details for the first two items concurrently
    const [item1, item2] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}`).then((r) => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts/${posts[1].id}`).then((r) => r.json())
    ]);

    console.log("Exercise 4 - Item 1 Parallel:", item1);
    console.log("Exercise 4 - Item 2 Parallel:", item2);
  } catch (err) {
    console.error("Exercise 4 Error:", err.message);
  }
}

// ==========================================
// EXERCISE 5: Network State Toggle in DOM
// ==========================================
async function runExercise5() {
  const statusDiv = document.querySelector("#ex5-status");
  statusDiv.textContent = "Loading…";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) throw new Error("HTTP request failed");

    const data = await res.json();
    statusDiv.textContent = `Success: Loaded "${data.title}"`;
    statusDiv.style.color = "green";
  } catch (err) {
    statusDiv.textContent = `Error: ${err.message} (Toggle network offline to view this error state)`;
    statusDiv.style.color = "red";
  }
}

// ==========================================
// RUN ALL EXERCISES
// ==========================================
async function runAllExercises() {
  await getUsdToEtbRate();
  await fetchAndRenderPost(1);
  await demonstrateErrorTypes();
  await fetchPostDetailsInParallel();
  await runExercise5();
}

runAllExercises();