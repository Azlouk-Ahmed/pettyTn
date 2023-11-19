import React from 'react'
import './search.css'

function Search() {
  return (
    <form action="#" className='search-post-form'>
    <div className="text" style={{color:"var(--primary-color)"}}>
        add post
     </div>
   <div className="form-row">
   
       <label htmlFor="">Animal </label>
    
     <select id="options" className="input-data">
          <option key="1" value="anis">
            anis
          </option>
      </select>
      <select id="options" className="input-data">
          <option key="1" value="anis">
            anis
          </option>
      </select>
      <select id="options" className="input-data">
          <option key="1" value="anis">
            anis
          </option>
      </select>
   </div>
 </form>
  )
}

export default Search
