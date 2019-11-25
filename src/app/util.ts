function never(n: never): never {
  console.error(n);
  throw new Error('The thread got into a path that it wasn\'t supposed to, check the console');
}
