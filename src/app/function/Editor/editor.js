"use client";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const Editor = ({ onChange, value }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }], // Headers
          ['bold', 'italic', 'underline'], // Text styles
          [{ list: 'ordered' }, { list: 'bullet' }], // Lists
          ['link', 'blockquote', 'code-block'], // Links, blockquotes, code blocks
          [{ color: [] }, { background: [] }], // Text and background color
          ['clean'], // Remove formatting button
        ],
      }}
      formats={[
        'header',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'link',
        'blockquote',
        'code-block',
        'color',
        'background',
      ]}
    />
  );
};
