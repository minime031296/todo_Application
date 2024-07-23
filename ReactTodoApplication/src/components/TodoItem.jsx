import React from 'react'

const TodoItem = ({id, title, status, assignee, handleUpdateId, handleDelete}) => {
  console.log(id,title,status);
  return (
    
    <div className='bg-white rounded-lg shadow-md p-4 mb-4 justify-center '>

       <h3 className='text-black font-semibold'>Title: {title}</h3>

       <h5 className='text-blue-500'>Assigneed To: {assignee}</h5>
       
       <div className='flex justif-between items-center mt-2'>
       
       <button onClick = {() => handleUpdateId(id, status)}
       className={`px-4 py-2 ${status ? 'bg-cyan-500 hover:bg-cyan-600': 'bg-blue-500 hover:bg-blue-600'} 
       text-white rounded focus:outline-none`}>
            {status ? "Complete" : "Pending"}
        </button>

        <button onClick={() => handleDelete(id)}
        className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none'>Delete</button>
      </div>
    </div>
  
    )
}

export default TodoItem
