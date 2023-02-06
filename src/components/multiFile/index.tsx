import React, { useMemo, useState } from 'react'
import { Checkbox, Drawer, Popconfirm, Popover, Tree } from 'antd'
import FileTitleModal from '../fileTitleModal'
import MultiFileIcon from '../icons/multiFile'
import { arrToTree, FileData } from '@/utils/multiFile'
import styles from './index.module.less'
import MoreIcon from '../icons/more'
import DeleteFileIcon from '../icons/deleteFile'
import EditFileIcon from '../icons/editFile'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'

const MultiFile: React.FC = () => {
  const { file, dispatch } = useFile()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isEditor, setIsEditor] = useState(false)
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false)
  const [editTitleData, setEditTitleData] = useState<FileData>({} as FileData)
  console.log(file.multiFileData)
  const treeData = useMemo(
    () => arrToTree(file.multiFileData),
    [file.multiFileData]
  )
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
      type: ACTION_TYPE.DELTE_FILE,
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

  return (
    <>
      <div className={styles.mutilFileIcon} onClick={() => setDrawerOpen(true)}>
        <MultiFileIcon />
      </div>
      <Drawer
        title="Multi File Record"
        placement="right"
        extra={
          <Checkbox
            defaultChecked={false}
            onChange={(e) => setIsEditor(e.target.checked)}
          >
            <div className={styles.drawerExtra}>Editor</div>
          </Checkbox>
        }
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Tree
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
