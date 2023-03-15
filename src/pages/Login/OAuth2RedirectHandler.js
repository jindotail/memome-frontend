// 리다이렉트될 화면

import React from 'react';
import Loading from '../../components/utils/Loading';

const OAuth2RedirectHandler = (props) => {
    //const dispatch = useDispatch();

    // 인가코드
    let code = new URL(window.location.href).searchParams.get('code');

    // 백엔드에 인가코드 넘기기
    // React.useEffect(async () => {
    //     await dispatch(userActions.kakaoLogin(code));
    // }, []);

    console.log('code', code);

    return <Loading />;
};

export default OAuth2RedirectHandler;
