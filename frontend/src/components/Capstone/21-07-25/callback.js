function validateCallback(file, callback) {
  if (file.size > 1024 * 1024) {
    callback("File is too large");
  } else if (!file.type.startsWith("image/")) {
    callback("Only images are allowed");
  } else {
    callback(null);
  }
}

function uploadFile(file, callback) {
  console.log("Uploading file:", file.name);
  setTimeout(() => {
    console.log("File uploaded successfully");
    callback();
  }, 1000); // simulate delay
}

// Simulated file object
const file = {
  name: "image.png",
  size: 500 * 1024, // 500 KB
  type: "image/png"
};

// Call validation first
validateCallback(file, (error) => {
  if (error) {
    console.error("Validation failed:", error);
  } else {
    uploadFile(file, () => {
      console.log("File upload process completed.");
    });
  }
});


setTimeout(() => {
  console.log("one second ");

  console.log()==> {
    console.log("Two seconds");

    
  }
}
}