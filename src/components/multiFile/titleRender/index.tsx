import React, { useMemo } from 'react'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'
import { FileData } from '@/utils/multiFile'
import { Popconfirm, Popover } from 'antd'
import DeleteFileIcon from '@/components/icons/deleteFile'
import EditFileIcon from '@/components/icons/editFile'
import MoreIcon from '@/components/icons/more'
import styles from './index.module.less'

interface TitleRenderProps {
  fileData: FileData
  setEditTitleData: (data: FileData) => void
}

const TitleRender: React.FC<TitleRenderProps> = ({
  fileData,
  setEditTitleData
}) => {
  const { file, dispatch } = useFile()

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

  // Number of files(not folders)
  const fileCount = useMemo(
    () =>
      file.multiFileData.reduce((acc, data) => acc + (data.isLeaf ? 1 : 0), 0),
    [file.multiFileData]
  )

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      className={styles.titleContainer}
    >
      <span className={styles.titleText}>{fileData.title}</span>
      <span
        onClick={() => setEditTitleData(fileData)}
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

export default TitleRender
