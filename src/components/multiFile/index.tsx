import React, { useEffect, useMemo, useState } from 'react'
import { Checkbox, Drawer, Popconfirm, Popover, Tree } from 'antd'
import FileTitleModal from '../fileTitleModal'
import MultiFileIcon from '../icons/multiFile'
import { defaultMultiFileData, arrToTree, FileData } from '@/utils/multiFile'
import styles from './index.module.less'
import { CODE_THEME } from '@/utils/constants'
import MoreIcon from '../icons/more'
import DeleteFileIcon from '../icons/deleteFile'
import EditFileIcon from '../icons/editFile'

const MultiFile: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editor, setEditor] = useState(false)
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false)
  const [multiFileData, setMultiFileData] = useState<FileData[]>([])
  const [selectedKey, setSelectedKey] = useState('0-2')
  const [editTitleData, setEditTitleData] = useState<FileData>({} as FileData)

  const treeData = useMemo(() => arrToTree(multiFileData), [multiFileData])
  const fileCount = useMemo(
    () => multiFileData.reduce((acc, data) => acc + (data.isLeaf ? 1 : 0), 0),
    [multiFileData]
  )

  useEffect(() => {
    if (multiFileData.length === 0) {
      setMultiFileData(defaultMultiFileData)
    }
  }, [])

  const onSelect = (_selectedKeys: React.Key[], info: { node: FileData }) => {
    if (info.node.isLeaf) {
      setSelectedKey(info.node.key)
    }
  }

  const deleteFile = (key: string) => {
    setMultiFileData((data) =>
      data.filter((file) => file.key !== key && file.parent !== key)
    )
  }

  const addFile = (parent: string, isLeaf: boolean) => {
    const curLevelData = multiFileData.filter((data) => data.parent === parent)
    let key = ''
    if (curLevelData.length > 0) {
      curLevelData.sort((a, b) => {
        const aKeys = a.key.split('-')
        const bKeys = b.key.split('-')
        return Number(bKeys[bKeys.length - 1]) - Number(aKeys[aKeys.length - 1])
      })
      const curLevelLastKey = curLevelData[0].key.split('-')
      key = `${parent}-${
        Number(curLevelLastKey[curLevelLastKey.length - 1]) + 1
      }`
    } else {
      key = `${parent}-0`
    }

    setMultiFileData([
      ...multiFileData,
      {
        title: 'empty',
        key,
        parent,
        source: '',
        isLeaf,
        state: {
          codeTheme: CODE_THEME.a11yDark
        }
      }
    ])
  }

  const changeFileName = (title: string) => {
    const index = multiFileData.findIndex(
      (data) => data.key === editTitleData.key
    )
    const test = [...multiFileData]
    test[index].title = title
    setMultiFileData(test)
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
        {fileCount > 1 && fileData.key !== selectedKey && (
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
            onChange={(e) => setEditor(e.target.checked)}
          >
            <div className={styles.drawerExtra}>Editor</div>
          </Checkbox>
        }
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Tree
          titleRender={(node) => {
            if (!editor) {
              return node.title
            }
            return titleRender(node)
          }}
          selectedKeys={[selectedKey]}
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
