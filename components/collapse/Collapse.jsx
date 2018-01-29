import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import CollapsePanel from './CollapsePanel';
export default class Collapse extends React.Component {
    render() {
        const { prefixCls, className = '', bordered } = this.props;
        const collapseClassName = classNames({
            [`${prefixCls}-borderless`]: !bordered,
        }, className);
        return <RcCollapse {...this.props} className={collapseClassName}/>;
    }
}
Collapse.Panel = CollapsePanel;
Collapse.defaultProps = {
    prefixCls: 'ant-collapse',
    bordered: true,
    openAnimation: Object.assign({}, animation, { appear() { } }),
};
