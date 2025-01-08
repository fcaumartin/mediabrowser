import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Spinner from './Spinner'
import BreadCrumb from './BreadCrumb'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({ directories: [], pictures: []})
  const [path, setPath] = useState("")
  const [spinner, setSpinner] = useState(true)
  const [viewer, setViewer] = useState(false)
  const [picture, setPicture] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(()=>{
    setSpinner(true)
    axios.get("/api/pictures").then((response) => {
      // console.log(response.data)
      setData(response.data)
      setSpinner(false)
    })
    // document.addEventListener("keydown", handleKeyDown)
  }, [])

  const handleClickHome = (dir) => {
    setSpinner(true)
    axios.get("/api/pictures").then((response) => {
      // console.log(response.data)
      setData(response.data)
      setPath("")
      setSpinner(false)
    })
  }

  const handleClickDir = (dir) => {
    setSpinner(true)
    setPath(dir)
    axios.get("/api/pictures" + dir).then((response) => {
      // console.log(response.data)
      setData(response.data)
      setSpinner(false)
    })
  }

  const handleClickPic = (pic, index) => {
    setPicture(path + "/" + pic)
    setViewer(true)
    setIndex(index)
    document.getElementById("keymanager").focus()
  }

  const handleClickViewer = () => {
    setViewer(false)
  }

  const handleClickPrevious = () => {
    let i = (index - 1) % data.pictures.length;
    setPicture(path + "/" + data.pictures[i])
    setIndex(i)
  }

  const handleClickNext = () => {
    let i = (index + 1) % data.pictures.length;
    setPicture(path + "/" + data.pictures[i])
    setIndex(i)
  }

  const handleKeyDown = (evt) => {
    if (evt.key=='ArrowLeft') handleClickPrevious()
    if (evt.key=='ArrowRight') handleClickNext()
  }

  return (
    <>
      <input id="keymanager" type="text" onKeyUp={handleKeyDown} tabIndex={1}/>
      {
        spinner
        ?
        (
          <Spinner />
        )
        :
        (
          viewer
          ?
          (
            <div className="row" tabIndex={-1}>
              <div id="viewer" className="col-12 align-items-center justify-content-center" >
                <img src={picture} alt="" srcset="" className='object-fit-contain border rounded'  height="100%"/>
                <i id="previous" role="button" class="bi bi-chevron-left" onClick={handleClickPrevious}></i>
                <i id="next" role="button" class="bi bi-chevron-right" onClick={handleClickNext}></i>
                <i id="close" role="button" class="bi bi-x-circle" onClick={handleClickViewer}></i>
                
              </div>
            </div>
          )
          :
          (
              <>
                <BreadCrumb path={path} onClick={handleClickHome} />

                <div className="row">
                  {
                    data.directories.map((dir)=>(
                      <div className='col-12 col-sm-6 col-md-4 col-xl-3 mb-4' role="button" onClick={() => {handleClickDir(dir)}}>
                        <img src={dir+"/folder.jpg"} width={"100%"} title="..." alt="..." className="object-fit-scale border rounded"/>
                        {dir}
                      </div>
                    ))
                  }
                </div>

                <div className="row">
                  {
                    data.pictures.map((pic, index)=>(
                      <div role="button" className='col-12 col-sm-6 col-md-4 col-xl-3 mb-3 d-flex align-items-center justify-content-center' on onClick={() => {handleClickPic(pic, index)}}>
                        <img src={path + "/.thumbnails/" + pic+""} className="object-fit-scale border rounded"/>
                      </div>
                    ))
                  }
                </div>
              </>
          )
        )
      }


      

      

      
    </>
  )
}

export default App
