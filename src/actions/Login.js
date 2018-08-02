// src/actions/Ranking.js
import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';

const API_URL = 'http://localhost:8080/sharecoin-web/';
const APP_ID = 'x';

// リクエスト開始
const startRequest = categoryId => ({
  type: 'START_REQUEST',
  payload: { categoryId },
});
// レスポンス受信
const receiveData = (categoryId, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { categoryId, error, response },
});
// リクエスト完了
const finishRequest = categoryId => ({
  type: 'FINISH_REQUEST',
  payload: { categoryId },
});

// ランキングを取得する
export const fetchLogin = categoryId => {
  // redux-thunkを使った非同期処理
  return async dispatch => {
    dispatch(startRequest(categoryId));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });

    try {
      const responce = await fetch(`${API_URL}?${queryString}`);
      const data = await responce.json();
      console.log(data)
      dispatch(receiveData(categoryId, null, data));
    } catch (err) {
      console.log("errorlog start")
      console.log(err)
      dispatch(receiveData(categoryId, err));
    }
    dispatch(finishRequest(categoryId,));
  };
};