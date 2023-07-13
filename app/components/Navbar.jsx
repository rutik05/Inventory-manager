import React, { useState } from 'react'
import { Tooltip } from "flowbite-react";
import '@/app/globals.css';
function Navbar() {
  const [dark, setdark] = useState(true)
  return (
    <>
      <header className={(!dark) ? 'text-gray-600 body-font flex' : 'dark body-font flex'}>
        <div className=" mx-auto flex p-5 flex-col md:flex-row items-center">
          <Tooltip content='Home'>
          <a href="/" className={(!dark) ? "flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" : "flex title-font font-medium items-cente mb-4 md:mb-0 dark"}>
            <svg className="w-8 h-8 " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.838 5.455a1 1 0 00-.432-.369l-9-4a.999.999 0 00-.812 0l-9 4A1 1 0 000 6v14h2V6.65l8-3.556 8 3.556V20h2V6a1 1 0 00-.162-.545zM12 8h4v4h-4V8zm-2 2H4v10h6V10zm6 4h-4v6h4v-6z" fill="#5C5F62" />
            </svg>
            <span className="ml-3 text-xl">Inventory Manager</span>
          </a>
          </Tooltip>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"></a>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar