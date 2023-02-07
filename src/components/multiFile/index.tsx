import React, { useMemo, useState } from 'react'
import { Checkbox, Drawer, Popconfirm, Popover, Tree, Upload } from 'antd'
import FileTitleModal from '../fileTitleModal'
import MultiFileIcon from '../icons/multiFile'
import { arrToTree, FileData } from '@/utils/multiFile'
import styles from './index.module.less'
import MoreIcon from '../icons/more'
import DeleteFileIcon from '../icons/deleteFile'
import EditFileIcon from '../icons/editFile'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'
import UploadIcon from '../icons/upload'
import DownloadIcon from '../icons/download'

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
  // Number of files(not folders)
  const fileCount = useMemo(
    () =>
      file.multiFileData.reduce((acc, data) => acc + (data.isLeaf ? 1 : 0), 0),
    [file.multiFileData]
  )

  const onSelect = (_selectedKeys: React.Key[], info: { node: FileData }) => {
    if (info.node.isLeaf) {
      dispatch({
        type: ACTION_TYPE.CHANGE_CUR_KEY,
        payload: info.node.key
      })
    }
  }

  const deleteFile = (key: string) => {
    dispatch({
      type: ACTION_TYPE.DELTE_FILE,
      payload: key
    })
  }

  const addFile = (parent: string, isLeaf: boolean) => {
    dispatch({
      type: ACTION_TYPE.ADD_FILE,
      payload: {
        isLeaf,
        parent
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

  const titleRender = (fileData: FileData) => {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={styles.titleContainer}
      >
        <span>{fileData.title}</span>
        <span
          onClick={() => {
            setEditTitleData(fileData)
            setIsTitleModalOpen(true)
          }}
          className={styles.mutilFileIcon}
        >
          <EditFileIcon />
        </span>
        {fileCount > 1 && fileData.key !== file.curKey && (
          <Popconfirm
            title="Are you sure to delete this file?"
            onConfirm={() => deleteFile(fileData.key)}
            okText="Yes"
            cancelText="No"
          >
            <span className={styles.mutilFileIcon}>
              <DeleteFileIcon />
            </span>
          </Popconfirm>
        )}

        <Popover
          content={
            <div className={styles.titleOperate}>
              <div
                className={styles.titleLine}
                onClick={() => addFile(fileData.parent, true)}
              >
                Add file at the current level
              </div>
              <div
                className={styles.titleLine}
                onClick={() => addFile(fileData.parent, false)}
              >
                Add folder at current level
              </div>
              {!fileData.isLeaf && (
                <>
                  <div
                    className={styles.titleLine}
                    onClick={() => addFile(fileData.key, true)}
                  >
                    Add file at the sub level
                  </div>
                  <div
                    className={styles.titleLine}
                    onClick={() => addFile(fileData.key, false)}
                  >
                    Add folder at sub level
                  </div>
                </>
              )}
            </div>
          }
          trigger="click"
        >
          <span className={styles.mutilFileIcon}>
            <MoreIcon />
          </span>
        </Popover>
      </div>
    )
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
        title="Multi File"
        placement="right"
        extra={drawerExtra}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Tree
          defaultExpandedKeys={[file.curKey]}
          titleRender={(node) => {
            if (!isEditor) {
              return node.title
            }
            return titleRender(node)
          }}
          selectedKeys={[file.curKey]}
          showLine
          onSelect={onSelect}
          treeData={treeData}
        />
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
