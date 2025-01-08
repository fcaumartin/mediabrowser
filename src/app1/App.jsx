import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({ directories: [], pictures: []})
  const [path, setPath] = useState("")
  const [spinner, setSpinner] = useState(true)

  useEffect(()=>{
    setSpinner(true)
    axios.get("/api/pictures").then((response) => {
      console.log(response.data)
      setData(response.data)
      setSpinner(false)
    })
  }, [])

  const handleClickHome = (dir) => {
    setSpinner(true)
    axios.get("/api/pictures").then((response) => {
      console.log(response.data)
      setData(response.data)
      setPath("")
      setSpinner(false)
    })
  }

  const handleClickDir = (dir) => {
    setSpinner(true)
    setPath(dir)
    axios.get("/api/pictures" + dir).then((response) => {
      console.log(response.data)
      setData(response.data)
      setSpinner(false)
    })
  }

  const handleClickPic = (pic) => {
    // setPath(dir)
    // axios.get("/api/pictures" + dir).then((response) => {
    //   console.log(response.data)
    //   setData(response.data)
    // })
  }

  return (
    <>
      {
        spinner?
        (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )
        :
        (
          <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a role="button" onClick={handleClickHome}>Home</a></li>
                <li className="breadcrumb-item"><a>{path}</a></li>
              </ol>
            </nav>

            <div className="row">

            {
              data.directories.map((dir)=>(
                <div className='col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2' role="button" onClick={() => {handleClickDir(dir)}}>
                  <img src={dir+"/folder.jpg"} width={"100%"} title="..." alt="..."/>
                  {dir}
                </div>
              ))
            }
            </div>

            <div className="row">

            {
              data.pictures.map((pic)=>(
                <div role="button" className='col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2 mb-3 d-flex align-items-center justify-content-center' on onClick={() => {handleClickPic(pic)}}>
                  <img src={path + "/.thumbnails/" + pic+""} className="object-fit-scale border rounded"/>
                  
                </div>
              ))
            }
            </div>
          </>
        )
      }


      

      

      
    </>
  )
}

export default App
