import React, { useState } from 'react'
import MenuIcon from '../icons/menu'

const ProjectPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        <MenuIcon />
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-75 ${
          showModal ? 'flex' : 'hidden'
        }`}
        onClick={() => setShowModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap justify-between bg-white w-6/12 rounded-2xl overflow-auto"
        >
          {[1, 2, 34, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="m-3 w-3/12 cursor-pointer rounded-xl"
              style={{ backgroundColor: '#256D85' }}
            >
              <p className="line-clamp-3 m-1">
                hahahahahaha阿萨德卡拉胶圣诞快乐健康拉风进口零食进口代理公司
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectPanel
