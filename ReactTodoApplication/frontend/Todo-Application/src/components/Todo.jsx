import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import axios from 'axios'


const Todo = () => {
    const [todo, setTodo ]= useState([])
    const [page, setPage] = useState(1)
    const [time, setTime] = useState(new Date())

    const handleUpdateId = (id, status) => {
      const updateTodo  = todo.map((item)=>{
        if(item.id === id) {
          return {
            ...item,
            status: !status,
            completionTime: !status ? new Date() : item.completionTime
          }
        }
      })
      axios({
        method : "PATCH",
        baseURL:  import.meta.env.VITE_BASE_URL,
        url: `/todos/${id}`  ,
        data: {status: !status,
        completionTime: !status ? new Date() : null},
        headers : {
          "Content-Type": "application/json"
        }    
      }).then(()=>getData()).catch((error)=>console.log(error))
    }

    const handleDelete = (id) => {
      axios({
        method : "DELETE",
        baseURL: import.meta.env.VITE_BASE_URL,
        url: `/todos/${id}`
      })

    }
 
    const handleAdd = (title, assignee) => {
      const newTodo = {
        title,
        status: false,
        assignee,
      }
     axios({
        method: "POST",
        baseURL:  import.meta.env.VITE_BASE_URL,
        url: "/todos",
        data: newTodo,
        headers : {
          "Content-Type": "application/json"
        }
      }).then(()=>getData())
    }

    const getData = async () => {
      try {
        let response =  await axios({
          method: "GET",
          baseURL:  import.meta.env.VITE_BASE_URL,
          url: `/todos?_page=${page}&_per_page=4`
        })
        console.log("response: " ,response)
        setTodo(response.data.data)
      } catch (error) {
        
      }
    }

    useEffect(()=> {
        getData()
    }, [page])

    /*useEffect(()=>{
      setInterval(()=>{setTime(new Date())},0)
    },[])*/

    const handlePrev = (page) => {
      if(page > 0 ) {
        setPage(1)
      }else{
        setPage(page - 1)
      }
    }

    const handleNext = (page) => {
      if (todo.length - 1) {
        setPage(page+1)
      }
      else{
        setPage(disabled)
      }
    }
    let timing = time.toLocaleTimeString()
    
  return (
    <>
    <h1 className='text-center font-bold  text-2xl shadow-xs bg-cyan-100 flex justify-center items-center rounded-lg'> TODO APP</h1>
    <div className='mx-auto max-w-4xl p-4'>
      <TodoInput handleAdd = {handleAdd} />
      <div className='mt-4'>
        {todo.map((el)=> <TodoItem {...el} key={el.id} 
        handleUpdateId={handleUpdateId}
        handleDelete={handleDelete}/>
      )}
      </div>
      <div className='flex justify-between mt-4'>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={()=>handlePrev(page)}>Prev</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">{page}</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={()=>handleNext(page)} disabled={page > todo.length - 1}>Next</button>
      </div>
      

      <div className='flex justify-between mt-8'>
        <div className='w-1/2'>
        <h3 className='text-lg font-bold mb-4 items-center text-center'>Completed Tasks</h3>
                <table className='w-full border border-collapse border border-gray-300'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 bg-gray-200'>Id</th>
                            <th className='px-4 py-2 bg-gray-200'>Title</th>
                            <th className='px-4 py-2 bg-gray-200'>Assignee</th>
                            <th className='px-4 py-2 bg-gray-200'>Status</th>
                            <th className='px-4 py-2 bg-gray-200'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todo.filter(todo => todo.status).map(todo => (
                            <tr key={todo.id}>
                                <td className='px-4 py-2'>{todo.id}</td>
                                <td className='px-4 py-2'>{todo.title}</td>
                                <td className='px-4 py-2'>{todo.assignee}</td>
                                <td className='px-4 py-2'>Completed</td>
                                <td className='px-4 py-2'>{timing}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    
        <div className='w-1/2'>
              <h3  className='text-lg font-bold mb-4 text-center'>Pending Tasks</h3>
                <table className='w-full border border-collapse border border-gray-300'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 bg-gray-200'>Id</th>
                            <th className='px-4 py-2 bg-gray-200'>Title</th>
                            <th className='px-4 py-2 bg-gray-200'>Assignee</th>
                            <th className='px-4 py-2 bg-gray-200'>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {todo.filter(todo => !todo.status).map(todo => (
                            <tr key={todo.id}>
                                <td  className='px-4 py-2'>{todo.id}</td>
                                <td  className='px-4 py-2'>{todo.title}</td>
                                <td  className='px-4 py-2'>{todo.assignee}</td>
                                <td  className='px-4 py-2'>Pending</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
               
            </div>
      
    </div>
    </>
  )
}

export default Todo
