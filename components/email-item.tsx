'use client';
import React from 'react';
import DOMPurify from 'dompurify';

interface EmailItemProps {
  body: string | null;
}


const EmailItem = ({ body }: EmailItemProps) => {
  return (
    <div className=" flex justify-center relative items-center">
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body!) }}
        className=" bg-gray-900 text-white max-w-4xl flex gap-4 overflow-scroll p-4  shadow-md rounded-md"
      ></div>
    </div>
  );
};

export default EmailItem;
