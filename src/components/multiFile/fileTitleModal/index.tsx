import React, { useEffect, useState } from 'react'
import { Input, Modal } from 'antd'

interface IProps {
  isModalOpen: boolean
  setIsModalOpen: (state: boolean) => void
  defaultTitle: string
  onOk: (title: string) => void
}

const FileTitleModal: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
  defaultTitle,
  onOk
}) => {
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(defaultTitle)
  }, [defaultTitle])

  return (
    <Modal
      open={isModalOpen}
      onOk={() => onOk(title)}
      onCancel={() => setIsModalOpen(false)}
      closable={false}
      okButtonProps={{
        style: { backgroundColor: '#000', borderColor: '#000' }
      }}
      bodyStyle={{ borderRadius: '16px' }}
    >
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
    </Modal>
  )
}

export default FileTitleModal
