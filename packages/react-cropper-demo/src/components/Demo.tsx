import { useState } from 'react';
import { ReactCropper } from './ReactCropper';

const Demo = () => {
  const [resultImgUrl, setResultImgUrl] = useState<string>('');

  // 响应截图结果
  const handleResultImgUrl = (blob: Blob) => {
    // 本地图片显示
    const str = URL.createObjectURL(blob);
    console.log(str);
    setResultImgUrl(str);

    // // 创造提交表单数据对象
    // const formData = new FormData()
    // // 添加要上传的文件
    // formData.append('file', blob, filename)
    // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
    // this.setState({submitting: true})
    // 上传图片
    // const resp = await http.post(url, formData)
    // 拿到服务器返回的数据(resp)
    // console.log(resp)
    // 提示上传完毕
    // this.setState({submitting: false})
  };

  return (
    <article className="space-y-4">
      <ReactCropper handleResultImgUrl={handleResultImgUrl} />
      {resultImgUrl ? (
        <div className="flex space-x-12 border border-dashed border-gray-300 overflow-auto p-2">
          <img
            className="border border-solid border-gray-200 rounded-md shadow-md"
            src={resultImgUrl}
            style={{ width: 200, height: 200 }}
            alt="方形截图200"
          />
          <img
            className="border border-solid border-gray-200 rounded-md shadow-md"
            src={resultImgUrl}
            style={{ width: 50, height: 50 }}
            alt="方形截图50"
          />
          <img
            className="border border-solid border-gray-200 shadow-md"
            src={resultImgUrl}
            style={{ width: 200, height: 200, borderRadius: 200 }}
            alt="圆形截图200"
          />
          <img
            className="border border-solid border-gray-200 shadow-md"
            src={resultImgUrl}
            style={{ width: 50, height: 50, borderRadius: 50 }}
            alt="圆形截图50"
          />
        </div>
      ) : (
        <div
          className="w-full border border-dashed border-gray-300 flex justify-center items-center"
          style={{ height: 200 }}
        >
          <p className="text-gray-400 select-none">暂无截图</p>
        </div>
      )}
    </article>
  );
};

export default Demo;
