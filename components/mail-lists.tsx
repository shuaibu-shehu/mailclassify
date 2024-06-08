

import { useAppState } from '@/lib/providers/app-state';

export interface mailType{
  body: string
  id: string,
  subject: string,
  snippet: string,
  isCllasified: boolean,
  class: string
}

function MailLists() {
  const { state, dispatch } = useAppState();
  
  return (
    <div>
      {state.mails.map((mail: mailType) => (
        <div key={mail.id} className="border-b border-gray-200">
          <div className="p-4">
            <div className="flex justify-between">
              <div className="font-bold">{mail.subject}</div>
              <div className="text-sm">{mail.class}</div>
            </div>
            <div className="text-sm">{mail.snippet}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MailLists;
