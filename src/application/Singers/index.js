import React from "react";
import Horizon from '../../baseUI/horizon-item';
import {categoryTypes} from '../../api/config.js'
function Singers(props) {
    return (
        <Horizon list={categoryTypes} title={"分类(默认热门):"}>
        </Horizon>
    )
}

export default React.memo(Singers);