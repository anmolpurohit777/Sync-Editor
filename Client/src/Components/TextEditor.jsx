import React, { useCallback } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import '../index.css'

const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline"],
]

export default function TextEditor() {

    const wrapperRef=useCallback((wrapper)=>{
    if(wrapper==null) return;

    wrapper.innerHTML="";
    const editor=document.createElement("div");
    wrapper.append(editor);
    new Quill(editor,{theme:"snow",modules:{toolbar:TOOLBAR_OPTIONS}});
    },[]);
  return (
    <>
        <div className="container" ref={wrapperRef}>
          
        </div>
    </>
  )
}
