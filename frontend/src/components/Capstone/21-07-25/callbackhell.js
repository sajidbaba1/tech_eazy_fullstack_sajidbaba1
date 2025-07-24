setTimeout(() => {
  console.log("one second");
  
  setTimeout(() => {
    console.log("Two seconds");
    console.log("This is setTimeout inside the second callback");
    
  }, 1000);
}, 1000); 