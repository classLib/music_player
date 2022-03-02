import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import { Content } from './style';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import { forceCheck } from 'react-lazyload';

function Recommend(props) {
    const { bannerList, recommendList } = props;

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        getBannerDataDispatch();
        getRecommendListDataDispatch();
    }, []);

    const bannerListJs = bannerList ? bannerList.toJS() : [];
    const recommendListJs = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJs}></Slider>
                    <RecommendList recommendList={recommendListJs}></RecommendList>
                </div>
            </Scroll>
        </Content>
    )
}
// 映射redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    bannerList: state.getIn(['recommend', "bannerList"]),
    recommendList: state.getIn(["recommend", "recommendList"])
})
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList());
        },
    }
};
// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));