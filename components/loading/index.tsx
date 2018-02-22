//loading组件
import * as React from 'react';
import classNames from 'classnames';
/**
  参数说明：

  text:text存在显示文字,无text属性隐藏,
  loading:show 显示；hide 隐藏
  
*/

export interface loading_props{
    text:string;
    loading:string;
}

export default class Loading extends React.Component<loading_props,any> {
  constructor(props:loading_props){
    super(props);
    this.state={
    }
  }
  render(){
    let prefixCls='loading';
    let {text,loading} = this.props;
    text = text ? text : 'loading...';

    let coverClass = classNames(prefixCls,"cover",{
        [`${prefixCls}-show`]: loading === 'show',
        [`${prefixCls}-hide`]: loading === 'show',
      });
    let spinnerClass = classNames(prefixCls,"spinner",{
        [`${prefixCls}-show`]: loading === 'show',
        [`${prefixCls}-hide`]: loading === 'show',
      });
    return (
      <div>
          <div className={coverClass}></div>
          <div className={spinnerClass}>
              <div className="spinner-container container1">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
              </div>
              <div className="spinner-container container2">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
              </div>
              <div className="spinner-container container3">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
              </div>
              <div className="description">{text}</div>
            
          </div>
        </div>
    )
  } 
};

