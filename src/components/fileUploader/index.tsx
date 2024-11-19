import '@uploadcare/react-uploader/core.css'
import { useCallback, useRef, useState, type FC } from 'react'

import type { OutputFileEntry } from '@uploadcare/blocks'
import { FileUploaderRegular } from '@uploadcare/react-uploader'

interface IFileUploader {
  files: OutputFileEntry[] | []
  onChange: (files: OutputFileEntry[]) => void
  preview: boolean
}

const FileUploader: FC<IFileUploader> = ({ files, onChange, preview }) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    OutputFileEntry<'success'>[]
  >([])

  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null)

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry['uuid']) =>
      onChange(files.filter((f) => f.uuid !== uuid)),
    [files, onChange]
  )

  const resetUploaderState = () =>
    ctxProviderRef.current?.uploadCollection.clearAll()

  const handleModalCloseEvent = () => {
    resetUploaderState()

    onChange([...files, ...uploadedFiles])

    setUploadedFiles([])
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeEvent = (files: any) => {
    setUploadedFiles([
      ...files.allEntries.filter(
        (f: { status: string }) => f.status === 'success'
      )
    ] as OutputFileEntry<'success'>[])
  }

  return (
    <>
      <FileUploaderRegular
        imgOnly
        multiple={preview}
        sourceList='local, url, camera, dropbox, gdrive'
        removeCopyright
        confirmUpload={false}
        apiRef={ctxProviderRef}
        onModalClose={handleModalCloseEvent}
        onChange={handleChangeEvent}
        pubkey={import.meta.env.VITE_UPLOADECAREKEY}
        className='uploader'
      />

      {preview ? (
        <div className='mt-8 grid grid-cols-2 gap-4'>
          {files.map((file) => (
            <div key={file.uuid} className='relative'>
              <img
                key={file.uuid}
                src={`${file.cdnUrl}-/format/webp/-/quality/smart/-/stretch/fill/`}
              />

              <div className='absolute -right-2 -top-2 flex h-7 w-7 cursor-pointer justify-center rounded-full border-2 border-slate-800 bg-white'>
                <button
                  className='text-center text-slate-800'
                  type='button'
                  onClick={() => handleRemoveClick(file.uuid)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
export default FileUploader