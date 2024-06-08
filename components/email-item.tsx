'use client'
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
interface EmailItemProps {
                body: string;
}
const EmailList = ({body}: EmailItemProps) => {
    return (
        <div>
            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
            ></div>

        </div>
    );
};

export default EmailList;
