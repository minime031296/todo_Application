import React, { useState } from 'react';



function TodoInput({ handleAdd }) {

  const [title, setTitle] = useState("")
  const [assignee, setAssignee ] = useState("")

  const handleChange = (event) => {
    setTitle(event.target.value)
  }
 
  return (
    <div id="flex justify-center items-center h-full ">
      <div className='max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg'>
      <div id="task-bar" className='flex items-center border border-gray-300 text-gray-900 text-sm rounded-lg'>
        <input type="text" 
        placeholder="Add todos here"
        value = {title}
        onChange = {handleChange}
        className='w-full h-10 px-3 rounded-l-lg focus:outline-none'
       />


        <button id="task-btn"
        className=' px-10 py-1.5 text-white bg-gradient-to-r from-cyan-500 via-cyan-500 
        to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font:medium
         '
        onClick = {() => handleAdd(title, assignee)}>
          Add
        </button>
        </div>

         <div className='mt-4 ml-20 flex items-center'>
        
        <label htmlFor="assignee" className='mr-2 underline'>Assigneed To:</label>
        <select name="" id="assignee-select" value={assignee} onChange={(e)=>setAssignee(e.target.value)}
        className='px-5 py-2 border border-gray-300 rounded focus:outline-none ml-3 bg-cyan-500 text-white'>
          <option value="John">John</option>
          <option value="Mary">Mary</option>
          <option value="Bruce">Bruce</option>
        </select>
        </div>
      </div>
    </div>
  )
}

export default TodoInput
