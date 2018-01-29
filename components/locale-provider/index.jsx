import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { changeConfirmLocale } from '../modal/locale';
function setMomentLocale(locale) {
    if (locale && locale.locale) {
        moment.locale(locale.locale);
    }
    else {
        moment.locale('en');
    }
}
export default class LocaleProvider extends React.Component {
    getChildContext() {
        return {
            antLocale: Object.assign({}, this.props.locale, { exist: true }),
        };
    }
    componentWillMount() {
        setMomentLocale(this.props.locale);
        this.componentDidUpdate();
    }
    componentWillReceiveProps(nextProps) {
        const { locale } = this.props;
        const nextLocale = nextProps.locale;
        if (locale !== nextLocale) {
            setMomentLocale(nextProps.locale);
        }
    }
    componentDidUpdate() {
        const { locale } = this.props;
        changeConfirmLocale(locale && locale.Modal);
    }
    componentWillUnmount() {
        changeConfirmLocale();
    }
    render() {
        return React.Children.only(this.props.children);
    }
}
LocaleProvider.propTypes = {
    locale: PropTypes.object,
};
LocaleProvider.defaultProps = {
    locale: {},
};
LocaleProvider.childContextTypes = {
    antLocale: PropTypes.object,
};
