import React, { PropsWithChildren, ReactNode } from 'react';
import { useRouteError } from 'react-router-dom';

interface Prosp extends PropsWithChildren {
  defaultTitle?: string;
  defaultBody?: string;
}

export default function ErrorOverlay({ defaultTitle, defaultBody, children }: Prosp) {
  const error = useRouteError();
  console.log(error);

  const errorInfo = getErrorInfo(error, { defaultTitle, defaultBody });

  return (
    <div className='bg-red-500 rounded bg-opacity-50 text-white flex flex-col justify-center items-center px-32 py-42'>
      {children ? (
        children
      ) : (
        <>
          <p className='text-body1 font-bold mb-12'>{errorInfo.title}</p>
          <p className='text-body2'>{errorInfo.body}</p>
        </>
      )}
    </div>
  );
}

const getErrorInfo = (
  error: unknown,
  options?: Partial<{ defaultTitle: string; defaultBody: string }>,
) => {
  let title = options?.defaultTitle ?? 'Ooops';
  let body = options?.defaultBody ?? 'Someothing unexpected happened, please try again';

  if (error && typeof error === 'object') {
    if ('status' in error) title = String(error.status);
    if ('data' in error) body = String(error.data);
  }

  return { title, body };
};
