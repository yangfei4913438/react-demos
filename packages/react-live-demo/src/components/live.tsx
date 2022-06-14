import { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { PrismTheme } from 'prism-react-renderer';

const reactLiveHome: PrismTheme = {
  plain: {
    color: '#e7d2ed',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'doctype', 'cdata'],
      style: {
        color: 'hsl(30, 20%, 50%)',
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
      style: { color: '#f677e1' },
    },
    {
      types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
      style: {
        color: 'hsl(75, 70%, 70%)',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'string', 'variable', 'language-css'],
      style: {
        color: 'hsl(40, 90%, 70%)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#e90',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#f677e1',
      },
    },
    {
      types: ['punctuation', 'symbol'],
      style: {
        opacity: 0.7,
      },
    },
  ],
};

interface IProps {
  noInline?: boolean;
  code: string;
}

const Live: FC<IProps> = ({ noInline, code }) => {
  return (
    <LiveProvider
      className="rounded shadow overflow-hidden mb-56 border-2 shadow border-gray-500"
      code={code}
      noInline={noInline}
      theme={reactLiveHome}
    >
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-700 font-code text-lg overflow-auto x-column">
          <LiveEditor />
        </div>
        <LivePreview className="border border-gray-500 h-1/2 md:h-auto overflow-hidden text-center x-column" />
      </div>

      <LiveError className="p-8 bg-[#ff5555] text-[#f8f8f2] whitespace-pre-wrap text-left text-sm font-code" />
    </LiveProvider>
  );
};

export default Live;
