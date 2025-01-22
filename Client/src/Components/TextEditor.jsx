import { useCallback,useEffect, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import '../index.css'
import {io} from "socket.io-client"
import { useParams } from "react-router-dom"
import { exportToWord } from '../Utilities/exportToWord'
import { importAsQuill } from '../Utilities/importAsQuill'

const TOOLBAR_OPTIONS = [
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline"],
  [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }, { header: 5 }, { header: 6 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["clean"],
];
const SAVE_INTERVAL=2000;

export default function TextEditor() {
  const {id:documentId}=useParams();
  const [socket,setSocket]=useState();
  const [quill,setQuill]=useState();


  useEffect(()=>{
    const s=io("http://localhost:3001");
    setSocket(s);

    return ()=>{
      s.disconnect();
    }
  },[]);

  useEffect(()=>{
    if(socket==null || quill==null)
      return;
    socket.once("load-document",document=>{
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document",documentId);

    const toolbar = quill.getModule("toolbar");

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "💾";
    saveButton.addEventListener("click", () => exportToWord(quill));
    toolbar.container.appendChild(saveButton);

    const importButton = document.createElement("button");
    importButton.innerHTML = "📂";
    importButton.addEventListener("click", () => importAsQuill(quill,socket));
    toolbar.container.appendChild(importButton);

  },[socket,quill,documentId])

  useEffect(()=>{
    if(socket==null || quill==null)
      return;
    const interval=setInterval(()=>{
      socket.emit("save-document",quill.getContents())
    },SAVE_INTERVAL);

    return ()=>{
      clearInterval(interval);
    }
  },[socket,quill]);

  useEffect(()=>{
    if(socket==null || quill==null)
        return;
    const handler=(delta,oldDelta,source)=>{
      if(source!=='user') return;
      socket.emit("send-changes",delta); 
    }
    quill.on('text-change',handler);

    return ()=>{
      quill.off('text-change',handler)
    }
  },[socket,quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
  
    // Listen for imported file changes
    const handleFileImported = (delta) => {
      quill.setContents(delta);
    };
  
    socket.on("receive-file", handleFileImported);
  
    return () => {
      socket.off("receive-file", handleFileImported);
    };
  }, [socket, quill]);

  useEffect(()=>{
    if(socket==null || quill==null)
        return;
    const handler=(delta)=>{
      quill.updateContents(delta)
    }
    socket.on("receive-changes",handler);

    return ()=>{
      socket.off("receive-changes",handler)
    }
  },[socket,quill]);

    const wrapperRef=useCallback((wrapper)=>{
    if(wrapper==null) return;

    wrapper.innerHTML="";
    const editor=document.createElement("div");
    wrapper.append(editor);
    const q=new Quill(editor,{theme:"snow",modules:{toolbar:TOOLBAR_OPTIONS}});
    q.disable();
    q.setText("Loading...");
    setQuill(q);
    },[]);  

  return (
    <>
        <div className="container" ref={wrapperRef}>
          
        </div>
    </>
  )
}
