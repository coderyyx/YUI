/*
    previewpic 预览图片
    removepic 删除图片
    fileList 图片列表

*/

import * as React from 'react';
import Loading from '../loading/index';
import PicList from './picItems';
import Button from '../button/index';
import {items_props} from './picItems';

const noop=()=>{}

export interface response_data {
  file_id:string;
  status:string;
  fileLength:number;
  index:number
}

export interface upload_state {
  length:number;
  index:number;
  loading:string;
  loadingText:string;
}

export interface upload_props extends items_props{
  multiple:string;
  uploadUrl:string;
  accept?:string;
  onChange:(file:any)=>void;
  onSuccess:(data:any,file:response_data)=>void
}


export default class UploadPic extends React.Component<upload_props,upload_state>{

  constructor(props:upload_props){
    super(props);
    this.state={
        length:0,
        index:0,
        loading:'hide',
        loadingText:''
    }
  }
  setFileObj(data:response_data,index:number){
    let obj={} as any;
    obj.file_id=data.file_id;
    obj.status='done';
    obj.fileLength=this.state.length;
    obj.index=index?index:undefined;
    return obj;
  }
  _change(e: any){
    let files=e.target.files;
    let length=files.length;
    var index=0;
    this.props.onChange?this.props.onChange(files):noop();
    this.setState({length:length});
    //loading组件初始化
    this.setLoadingComponent(1,length,'init');
    //追加文件数据    
    for(let i=0;i<length;i++){      
         
         this.upload_ajax(files[i]).then(
            (data)=>{
                        this.props.onSuccess?this.props.onSuccess(data,this.setFileObj(data.data,++index)):noop();
                        this.setLoadingComponent(index,length);
                    }
        ).catch((error)=>{alert(error);this.setState({loading:'hide'})});     
    }
    //清空input value
    e.target.value="";
    
  }
  setLoadingComponent(index:number,length:number,type?:string){
    let stateObj:upload_state=this.state;
    stateObj.loading='show';
    stateObj.loadingText='上传中'+index+'/'+length+'...';
    this.setState(stateObj);
    
    if((index==length)&&type!='init'){
        setTimeout(()=>{
            stateObj.loading='hide';
            this.setState(stateObj);
        },500)
    }

  }
  upload_ajax(file:any){
    /*
        需要用原生xhr发送请求，不依赖于jquery
    */
    let formData = new FormData();
    formData.append("file", file);
    return new Promise((resolve,reject)=>{
        let  xhr = new XMLHttpRequest();//第一步
        xhr.open('POST', this.props.uploadUrl); //第二步骤    
        //发送请求    
        xhr.send(formData);  //第三步骤    
        //ajax返回    
        xhr.onreadystatechange = function(){ //第四步    
    　　　　if ( xhr.readyState == 4 && xhr.status == 200 ) {    
    　　　　　　let data=xhr.responseText;    
                data=JSON.parse(data);
                data.result=='success'?resolve(data):reject(data.reason);
    　　　　}    
    　　};    
        //设置超时时间    
        xhr.timeout = 20000;    
        xhr.ontimeout = function(){    
    // 　　　　alert('请求超时！');    
              reject('上传超时！');
    　　} 
    })
    
  }
  upClick(e:any){
    e.preventDefault();
    let inputFile:React.ReactNode=this.refs.inputFile;
    inputFile.click();
  }
  render(){
    //是否多选
    let multiple=this.props.multiple?this.props.multiple:false;
    //接受图片类型
    let accept=this.props.accept?this.props.accept:"";

    let loadingProps={
        loading:this.state.loading,
        text:this.state.loadingText
    }

    let inputFileProps={
        multiple:multiple,
        accept:accept
    }

    let picListProps={
        fileList:this.props.fileList,
        preivewPic:this.props.preivewPic?this.props.preivewPic:noop,
        removePic:this.props.removePic?this.props.removePic:noop
    }
    return <div>
                <Loading {...loadingProps}/>

                <Button type="default" onClick={(e)=>this.upClick(e)}  icon="upload">上传</Button>
                <input type="file"
                        {...inputFileProps} 
                        ref="inputFile" 
                        onChange={(e)=>this._change(e)} 
                        style={{display:'none'}}/>
                <PicList {...picListProps}/>
    </div>
  }
}

