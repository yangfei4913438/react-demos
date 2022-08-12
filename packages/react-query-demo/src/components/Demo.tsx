import { useQuery, useMutation } from '@tanstack/react-query';
import Mock from 'mockjs';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const getPeople = () => {
  const mock_data = {
    name: '@cname',
    age: '@integer(18,60)',
    city: '@city(true)',
    email: '@email',
  };
  return Mock.mock(mock_data);
};

const Demo = () => {
  const [edit, setEdit] = useState<any>();
  const [pEdit, setPEdit] = useState<any>();

  // 获取操作
  const { isLoading, data, refetch } = useQuery(
    ['repoData'],
    () => fetch('/api/v1/peoples').then((res) => res.json()),
    {
      initialData: [],
    }
  );

  // 添加操作，完成后重新获取数据
  const add = useMutation((send: any) =>
    fetch('/api/v1/peoples', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send),
    }).then(() => refetch({ queryKey: ['repoData'] }))
  );

  // 删除操作，完成后重新获取数据
  const del = useMutation((id: number) =>
    fetch(`/api/v1/peoples/${id}`, {
      method: 'DELETE',
    }).then(() => refetch({ queryKey: ['repoData'] }))
  );

  // 全局更新，完成后重新获取数据
  const update = useMutation(({ id, send }: { id: number; send: any }) =>
    fetch(`/api/v1/peoples/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send),
    }).then(() => refetch({ queryKey: ['repoData'] }))
  );

  // 局部更新
  const patch = useMutation(({ id, send }: { id: number; send: any }) =>
    fetch(`/api/v1/peoples/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send),
    }).then(() => refetch({ queryKey: ['repoData'] }))
  );

  useEffect(() => {
    const cancelPEdit = () => {
      setPEdit(null);
    };
    window.addEventListener('click', cancelPEdit);
    return () => {
      window.removeEventListener('click', cancelPEdit);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between">
        <button className="btn" onClick={() => add.mutate(getPeople())}>
          新增一条记录
        </button>
        <button className="btn btn-primary" onClick={() => refetch({ queryKey: ['repoData'] })}>
          刷新
        </button>
      </div>
      <table className="text-center table w-full border select-none">
        <thead>
          <tr>
            <th style={{ width: 100, fontSize: 18 }}>姓名</th>
            <th style={{ width: 80, fontSize: 18 }}>年龄</th>
            <th style={{ width: 250, fontSize: 18 }}>城市</th>
            <th style={{ width: 280, fontSize: 18 }}>电子邮件</th>
            <th style={{ width: 100, fontSize: 18 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <tr>Loading...</tr>}
          {data.map((o: any) => (
            <tr key={o.id}>
              {pEdit?.name && pEdit.id === o.id ? (
                <td>
                  <input
                    className="input input-bordered h-6 w-full"
                    value={pEdit.name}
                    onBlur={async () => {
                      if (pEdit && pEdit?.id === o.id && pEdit.name !== o.name) {
                        await patch.mutate({ id: o.id, send: { name: pEdit.name } });
                        setPEdit(null);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setPEdit({ id: o.id, name: e.target.value })}
                  />
                </td>
              ) : (
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    setPEdit({ id: o.id, name: o.name });
                  }}
                >
                  {o.name}
                </td>
              )}
              <td>{o.age}</td>
              <td>{o.city}</td>
              <td>{o.email}</td>
              <td className="space-x-2">
                <button className="" onClick={() => setEdit(o)}>
                  编辑
                </button>
                <button className="" onClick={() => del.mutate(o.id)}>
                  删除
                </button>
                <button
                  className=""
                  onClick={() => {
                    // 复制就是除了唯一值之外的所有属性，都一模一样的添加一条记录。
                    const { id, ...rest } = o;
                    add.mutate(rest);
                  }}
                >
                  复制
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!!edit &&
        createPortal(
          <section className="z-50 absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-40 flex justify-center items-center">
            <article className="relative box-border overflow-hidden w-[700px] min-h-[300px] box-border p-8 pt-16 bg-white rounded-md shadow-xl space-y-4">
              <div className="absolute top-0 left-0 w-full h-12 bg-gray-200 flex items-center justify-between px-8">
                <div className="text-xl text-gray-700 font-bold">编辑</div>
                <div
                  className="w-8 h-8 rounded-md font-bold text-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={() => setEdit(null)}
                >
                  X
                </div>
              </div>
              <div className="w-4/5 mx-auto">
                <label className="input-group flex">
                  <span>姓名</span>
                  <input
                    type="text"
                    value={edit.name}
                    className="flex-1 input input-md input-bordered outline-none"
                    onChange={(e) => {
                      setEdit((prev: any) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      });
                    }}
                  />
                </label>
              </div>
              <div className="w-4/5 mx-auto">
                <label className="input-group flex">
                  <span>年龄</span>
                  <input
                    type="number"
                    value={edit.age}
                    className="flex-1 input input-md input-bordered outline-none"
                    onChange={(e) => {
                      setEdit((prev: any) => {
                        return {
                          ...prev,
                          age: e.target.value,
                        };
                      });
                    }}
                  />
                </label>
              </div>
              <div className="w-4/5 mx-auto">
                <label className="input-group flex">
                  <span>城市</span>
                  <input
                    type="text"
                    value={edit.city}
                    className="flex-1 input input-md input-bordered outline-none"
                    onChange={(e) => {
                      setEdit((prev: any) => {
                        return {
                          ...prev,
                          city: e.target.value,
                        };
                      });
                    }}
                  />
                </label>
              </div>
              <div className="w-4/5 mx-auto">
                <label className="input-group flex">
                  <span>邮件</span>
                  <input
                    type="text"
                    value={edit.email}
                    className="flex-1 input input-md input-bordered outline-none"
                    onChange={(e) => {
                      setEdit((prev: any) => {
                        return {
                          ...prev,
                          email: e.target.value,
                        };
                      });
                    }}
                  />
                </label>
              </div>
              <div className="w-full flex justify-end !mt-10">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    const { id, ...send } = edit;
                    await update.mutate({ id, send });
                    setEdit(null);
                  }}
                >
                  提交修改
                </button>
              </div>
            </article>
          </section>,
          document.body
        )}
    </div>
  );
};

export default Demo;
