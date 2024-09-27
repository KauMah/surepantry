'use client';

import React, { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

export function ImageUpload() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log('File has been added');
    if (e.target.files?.[0]) {
      for (const err of e.target?.files) {
        setFiles((prevState: File[]) => [...prevState, err]);
      }
    }
  }

  async function handleSubmitFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!files || files.length === 0) {
      // no file has been submitted
      console.log('rats I failed');
    } else {
      // write submit logic here
      console.log(files[0]);
      setFiles(files);
      const worker = await createWorker('eng');

      const {
        data: { text },
      } = await worker.recognize(files[0]!);
      console.log(text);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log('in handleDrop', files[0]);
    if (e.dataTransfer.files?.[0]) {
      for (const err of e.dataTransfer.files) {
        setFiles((prevState) => [...prevState, err]);
      }
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  }

  function removeFile(fileName: string, idx: number) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
  }

  function clearFiles() {
    setFiles([]);
  }

  function openFileExplorer() {
    if (!!inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        className={`${
          dragActive ? 'bg-blue-400' : 'bg-blue-100'
        }  h-7/6 flex min-h-[10rem]  w-1/3 flex-col items-center justify-center rounded-lg p-4 text-center`}
        onDragEnter={handleDragEnter}
        onSubmit={handleSubmitFile}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
          style={{ height: '20px', backgroundColor: '#FFF' }}
        />

        {files.length > 0 ? (
          // <Image />>
          <>
            <p>{files[0]?.name}</p>
            <img
              src={URL.createObjectURL(files[0] as Blob)}
              alt="hello there"
              className="h-5/6"
            />
          </>
        ) : (
          <p>
            Drag & Drop files or{' '}
            <span
              className="cursor-pointer font-bold text-blue-600"
              onClick={openFileExplorer}
            >
              <u>Select files</u>
            </span>{' '}
            to upload
          </p>
        )}
        <button
          className="m-1 rounded-md bg-blue-400 p-1 transition-all hover:bg-blue-700 hover:text-blue-50"
          type="submit"
        >
          Upload
        </button>
      </form>

      {files.length > 0 && (
        <button
          className="m-1 rounded-md bg-blue-400 p-1 transition-all hover:bg-blue-700 hover:text-blue-50"
          type="button"
          onClick={clearFiles}
        >
          Clear Form{' '}
        </button>
      )}
    </div>
  );
}
