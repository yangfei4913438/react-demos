import { useRef, useState, Fragment, type FC, type ChangeEvent, type ReactNode } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import cx from 'classnames';
import Child from '/src/assets/child.jpeg';
import { createPortal } from 'react-dom';

export interface ReactCropperProps {
  // 预览大图像的宽高, 默认 200
  previewMax?: number;
  // 预览小图像的宽高，默认 50
  previewMin?: number;
  // 图片最大尺寸, 文件最大限制为5M
  maxFileSize?: number;
  // 截图后的回掉，返回数据给调用对象
  handleResultImgUrl: (blob: Blob) => void;
  // 选择按钮的文字，默认 选择图片
  buttonLabel?: string;
  // 选择按钮的的类名
  buttonClass?: string;
  // 文件选择描述的dom
  chooseDesc?: ReactNode;
  // 图片类型, 默认 image/jpeg,image/jpg,image/png
  imageTypes?: string;
  // 标题文字，默认 裁剪图片
  titleLabel?: string;
  // 标题的类名
  titleClass?: string;
  // 子标题文字, 默认 请选择想要裁剪的图片区域
  subTitle?: string;
  // 子标题的类名
  subTitleClass?: string;
  // 取消按钮的文字，默认 取消裁剪
  cancelLabel?: string;
  // 取消按钮的类名
  cancelClass?: string;
  // 裁剪按钮的文字, 默认 点击裁剪
  cropperLabel?: string;
  // 裁剪按钮的类名
  cropperClass?: string;
}

const ReactCropper: FC<ReactCropperProps> = ({
  previewMax = 200,
  previewMin = 50,
  maxFileSize = 5 * 1024 * 1024,
  handleResultImgUrl,
  titleLabel = '裁剪图片',
  titleClass,
  subTitle = '请选择想要裁剪的图片区域',
  subTitleClass,
  chooseDesc,
  buttonLabel = '选择图片',
  buttonClass,
  imageTypes = 'image/jpeg,image/jpg,image/png',
  cancelLabel = '取消裁剪',
  cancelClass,
  cropperLabel = '点击裁剪',
  cropperClass,
}) => {
  const img = useRef<any>();
  const cropperRef = useRef<any>();
  // 图片地址
  const [src, setSrc] = useState<string>(Child);
  // 是否显示弹窗
  const [modalVisible, setModalVisible] = useState(false);

  //  裁剪响应
  const cropImage = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    if (!cropper || typeof cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    // 裁切图片
    cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      //把选中裁切好的的图片传出去
      blob && handleResultImgUrl(blob);
      // 关闭弹窗
      setModalVisible(false);
    });
  };

  const onFileChange = (e: { dataTransfer: any } & ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file;
    if (e.dataTransfer) {
      file = e.dataTransfer.files?.[0];
    } else if (e.target) {
      file = e.target.files?.[0];
    }
    if (file) {
      if (file.size <= maxFileSize) {
        // 创建文件读取实例
        const fileReader = new FileReader();
        // 启用加载成功事件的监听
        fileReader.onload = (e) => {
          const dataURL = e.target?.result ?? Child;
          setSrc(dataURL as string);
        };
        // 开始读取文件
        fileReader.readAsDataURL(file);
        // 然后弹出modal
        setModalVisible(true);
      } else {
        console.log('文件过大');
      }
    }
  };

  const handleCancel = () => {
    // 解决input组件，重复上传文件的时候，不能触发onChange事件
    img.current.value = '';
    // 关闭弹窗
    setModalVisible(false);
  };

  return (
    <Fragment>
      <header className="relative w-full flex flex-col">
        <label>
          <div className={cx('btn btn-primary', buttonClass)}>{buttonLabel}</div>
          <input
            ref={img}
            type="file"
            accept={imageTypes}
            className="hidden"
            onChange={onFileChange}
          />
        </label>
        {chooseDesc ? (
          chooseDesc
        ) : (
          <div className="text-sm mt-2 text-gray-400">
            <p>请选择宽度大于500像素的图片</p>
            <p>支持的图片格式为: jpeg, jpg, png, 文件大小: 5MB以内</p>
          </div>
        )}
      </header>
      {modalVisible &&
        createPortal(
          <section className="z-50 absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-40 flex justify-center items-center">
            <article className="w-[800px] min-h-[500px] box-border p-10 bg-white rounded-md shadow-xl">
              <header className="relative text-3xl flex justify-between">
                <div className={cx('font-bold', titleClass)}>{titleLabel}</div>
                <div className="text-[#999] cursor-pointer" onClick={handleCancel}>
                  x
                </div>
              </header>
              <div className={cx('mt-2 mb-4 text-gray-400', subTitleClass)}>{subTitle}</div>
              <div className="mt-4 relative h-96 w-full box-border overflow-hidden">
                <Cropper
                  src={src}
                  ref={cropperRef}
                  style={{ height: '100%', width: '100%' }} // 操作区域的大小, 这个必须写，不能省略
                  viewMode={1} // 选框不能超出图片范围
                  aspectRatio={1} // 宽高比 1:1
                  preview=".react_cropper_body_view_item" // 预览的div
                  zoomable={false} // 禁止图片随便移动
                  guides={false} // 禁用选框中的辅助线
                />
              </div>
              <div className="relative p-6 w-full flex justify-between border border-dashed border-gray-300">
                <div className="space-x-6 flex">
                  <div
                    className="react_cropper_body_view_item overflow-hidden rounded-md shadow-md"
                    style={{ width: previewMax, height: previewMax }}
                  />
                  <div
                    className="react_cropper_body_view_item overflow-hidden rounded-md shadow-md"
                    style={{ width: previewMin, height: previewMin }}
                  />
                </div>

                <div className="space-x-6 flex">
                  <div
                    className="react_cropper_body_view_item overflow-hidden shadow-md"
                    style={{ width: previewMax, height: previewMax, borderRadius: previewMax }}
                  />
                  <div
                    className="react_cropper_body_view_item overflow-hidden shadow-md"
                    style={{
                      width: previewMin,
                      height: previewMin,
                      borderRadius: previewMin,
                    }}
                  />
                </div>
              </div>
              <footer className="mt-6 space-x-6 flex justify-end">
                <button className={cx('btn btn-md', cancelClass)} onClick={handleCancel}>
                  {cancelLabel}
                </button>
                <button className={cx('btn btn-primary', cropperClass)} onClick={cropImage}>
                  {cropperLabel}
                </button>
              </footer>
            </article>
          </section>,
          document.body
        )}
    </Fragment>
  );
};

ReactCropper.displayName = 'ReactCropper';

export default ReactCropper;
