import * as React from	'react';

export interface fileListItem {
	uid:number;
	name:string;
	status:string;
	url:string;
	thumbUrl:string;
}

export interface items_props {
	removePic:(item:fileListItem)=>{};
	preivewPic:(item:Array<fileListItem>)=>{};
	fileList:Array<fileListItem>
}

export default class PicList extends React.Component<items_props,any>{
	constructor(props:items_props){
		super(props);
		this.state={
		}
	}
	setPicList(fileList:Array<fileListItem>){
		let length=fileList.length;
		if(length==0)
			return null;
		let arr=fileList.map((item)=>{
			return <div className="picWarp" key={item.uid}>
						<div className="picmi">
							<span className="del" onClick={this.removePic.bind(this,item)}>×</span>
							<img src={item.thumbUrl} 
								 className="picThumbUrl"
								 onClick={this.preivewPic.bind(this,fileList)}/>
							<a href={item.url}></a>
						</div>
			</div>
		})
		return arr;
	}
	removePic(file:fileListItem){
		this.props.removePic(file);
	}
	preivewPic(fileList:Array<fileListItem>){
		this.props.preivewPic(fileList);
	}
	render(){
		let fileList=this.props.fileList;
		return <div className="showPicContainer">{this.setPicList(fileList)}</div>
	}
}
