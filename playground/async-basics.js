  console.log('Starting app');
  setTimeout(()=>{
    console.log('Inside the callback');
  },2000);
  setTimeout(()=>{
    console.log('Inside the callback 2');
  },0);
  console.log('Finishing app');
