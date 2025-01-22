const mongoose=require("mongoose");
const Document=require("./Document");

const url="mongodb://localhost:27017/";
mongoose.connect(url)
  .then(() => console.log(`Connected to MongoDB--->${mongoose.connection.host}`))
  .catch(err => console.log("Error connecting to MongoDB", err));



const io=require('socket.io')(3001,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    }
});
const defaultValues="";

io.on("connection",socket=>{

    socket.on("get-document",async documentId=>{
        const document=await findOrCreateDoc(documentId);
        socket.join(documentId);
        socket.emit("load-document",document.data)

        socket.on("send-changes",delta=>{
            socket.broadcast.to(documentId).emit("receive-changes",delta);
            console.log(socket.id);
            console.log(delta);
            console.log(documentId);
        });

        socket.on("file-imported",delta=>{
            socket.broadcast.to(documentId).emit("receive-file", delta);
        });

        socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentId,{data});
        });

    });

});

async function findOrCreateDoc(id){
    if(id==null)
        return;

    const document=await Document.findById(id);
    if(document)
        return document;

    return await Document.create({_id:id,data:defaultValues});
}
