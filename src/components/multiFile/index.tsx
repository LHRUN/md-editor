import React, { useMemo, useState } from 'react'
import { Checkbox, Drawer, Tree, Upload } from 'antd'
import FileTitleModal from './fileTitleModal'
import MultiFileIcon from '../icons/multiFile'
import { arrToTree, FileData } from '@/utils/multiFile'
import styles from './index.module.less'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'
import UploadIcon from '../icons/upload'
import DownloadIcon from '../icons/download'
import iconText from '@/assets/imgs/iconText.png'
import TitleRender from './titleRender'

interface DragData extends FileData {
  pos: string
}

export interface DropInfo {
  node: DragData
  dragNode: DragData
  dropPosition: number
  dropToGap: boolean
}

const MultiFile: React.FC = () => {
  const { file, dispatch } = useFile()
  const [drawerOpen, setDrawerOpen] = useState(false) // drawer open status
  const [isEditor, setIsEditor] = useState(false) // edit status
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false) // title modal open status
  const [editTitleData, setEditTitleData] = useState<FileData>({} as FileData) // Current edit title data

  const treeData = useMemo(
    () => arrToTree(file.multiFileData),
    [file.multiFileData]
  )

  /**
   * click file
   */
  const onSelect = (_selectedKeys: React.Key[], info: { node: FileData }) => {
    if (info.node.isLeaf) {
      dispatch({
        type: ACTION_TYPE.CHANGE_CUR_KEY,
        payload: info.node.key
      })
    }
  }

  /**
   * drag and drop file
   */
  const onDrop = (info: DropInfo) => {
    dispatch({
      type: ACTION_TYPE.SORT_FILE,
      payload: {
        info
      }
    })
  }

  const changeFileName = (title: string) => {
    dispatch({
      type: ACTION_TYPE.CHANGE_FILE_TITLE,
      payload: {
        key: editTitleData.key,
        title
      }
    })
    setIsTitleModalOpen(false)
  }

  const downloadFile = () => {
    const eleLink = document.createElement('a')
    const fileName = `${
      file.multiFileData.find((data) => data.key === file.curKey)?.title ||
      'empty'
    }.md`
    eleLink.download = fileName
    eleLink.style.display = 'none'
    const blob = new Blob([file.content])
    eleLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }

  const drawerExtra = useMemo(
    () => (
      <div className={styles.drawerExtra}>
        <Checkbox
          defaultChecked={false}
          onChange={(e) => setIsEditor(e.target.checked)}
        >
          <div>Editor</div>
        </Checkbox>
        <Upload
          showUploadList={false}
          customRequest={(options) => {
            const file = options.file
            const reader = new FileReader()
            reader.onload = (e) => {
              options.onSuccess && options.onSuccess(e.target?.result)
              if (e.target?.result) {
                dispatch({
                  type: ACTION_TYPE.CHANGE_CONTENT,
                  payload: e.target?.result ?? ''
                })
              }
            }
            reader.readAsText(file as File)
          }}
          accept=".txt,.md,.doc,.docx"
        >
          <span className={styles.mutilFileIcon}>
            <UploadIcon />
          </span>
        </Upload>
        <span onClick={() => downloadFile()} className={styles.mutilFileIcon}>
          <DownloadIcon />
        </span>
      </div>
    ),
    [downloadFile]
  )

  return (
    <>
      <div className={styles.mutilFileIcon} onClick={() => setDrawerOpen(true)}>
        <MultiFileIcon />
      </div>
      <Drawer
        placement="right"
        extra={drawerExtra}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={400}
        closeIcon={''}
      >
        <div className={styles.drawerContainer}>
          <Tree
            defaultExpandedKeys={[file.curKey]}
            titleRender={(node) => {
              if (!isEditor) {
                return <div className={styles.titleText}>{node.title}</div>
              }
              return (
                <TitleRender
                  fileData={node}
                  setEditTitleData={(data) => {
                    setEditTitleData(data)
                    setIsTitleModalOpen(true)
                  }}
                />
              )
            }}
            selectedKeys={[file.curKey]}
            showLine
            draggable={isEditor}
            onDrop={onDrop}
            rootStyle={{
              overflowY: 'auto',
              flex: '1'
            }}
            onSelect={onSelect}
            treeData={treeData}
          />
          <img className={styles.drawerImg} src={iconText} alt="" />
        </div>
      </Drawer>
      <FileTitleModal
        isModalOpen={isTitleModalOpen}
        setIsModalOpen={setIsTitleModalOpen}
        defaultTitle={editTitleData.title}
        onOk={changeFileName}
      />
    </>
  )
}

export default MultiFile
