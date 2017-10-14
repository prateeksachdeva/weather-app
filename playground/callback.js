var getUser=(id,callback)=>{
var user={
  id:id,
  nam:'pro'
};
setTimeout(()=>{
  callback(user);
},2000);


};
getUser(22,(user)=>{
  console.log(user);
});
