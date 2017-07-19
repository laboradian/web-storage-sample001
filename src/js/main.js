/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
//import 'babel-polyfill'

//import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import PropTypes from 'prop-types'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

//-----------------------------------
// Action creators (Actionを返す)
//-----------------------------------

const UPDATE = 'UPDATE';
const updateAll = () => {
  return {
    type: UPDATE
  }
}

//-----------------------------------
// Reducer
//-----------------------------------

// SessionStorageとLocalStorageの内容のハッシュ化した文字列をstateとする
const appState = (() => {

  // SessionStorageとLocalStorageの内容のハッシュ化した文字列を生成する関数
  const createHashOfWebStorage = function() {
    let i;
    const sessData = [],
          localData = [];
    for (i=0; i < sessionStorage.length; i++) {
      sessData.push({
        key: sessionStorage.key(i),
        value: sessionStorage.getItem(sessionStorage.key(i))
      })
    }
    for (i=0; i < localStorage.length; i++) {
      localData.push({
        key: localStorage.key(i),
        value: localStorage.getItem(localStorage.key(i))
      })
    }
    return require("crypto")
      .createHash('sha512')
      .update(sessData.concat(localData).toString())
      .digest('hex');
  };

  return (state = '', action) => {
    switch (action.type) {
      case UPDATE:
        return createHashOfWebStorage();
      default:
        return state;
    }
  };

})();

//-----------------------------------
// Component
//-----------------------------------

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.keyInput1;
    this.keyInput2;
    this.textInput1;
    this.textInput2;
  }

  render() {

    let sessDataHtml = '';
    if (this.props.sessData) {
      sessDataHtml = (
        <ul>
          {this.props.sessData.map((data) => {
            return (
              <li key={data.key}>{"{"} key: {data.key}, value: {data.value} {"}"}
                <button type="button" className="btn btn-link"
                  onClick={() => {this.props.onClickToDeleteSession(data.key)}}>削除する</button>
                
              </li>
            )
          })}
        </ul>
      );
    }

    let localDataHtml = '';
    if (this.props.localData) {
      localDataHtml = (
        <ul>
          {this.props.localData.map((data) => {
            return (
              <li key={data.key}>{"{"} key: {data.key}, value: {data.value} {"}"}
                <button className="btn btn-link"
                  onClick={() => {this.props.onClickToDeleteLocal(data.key)}}>削除する</button>
              </li>
            )
          })}
        </ul>
      );
    }

    return (
      <div>
        <div className="panel panel-success">
          <div className="panel-heading">(1) sessionStorage</div>
          <div className="panel-body">
            <label>Key:</label>
            <input type="text"
                   ref={(input) => { this.keyInput1 = input; }} />
            <label>Value:</label>
            <input type="text"
                   ref={(input) => { this.textInput1 = input; }} />
            <button type="button"
              onClick={() => {this.props.onClickToStoreSession(this.keyInput1.value, this.textInput1.value)}}>保存する</button>
            <button type="button"
              onClick={() => {this.props.onClickToDeleteAllSession()}}>全て削除する</button>
            <output>
              <h5>現在保持しているデータ：</h5>
              {sessDataHtml}
            </output>
          </div>
        </div>

        <div className="panel panel-success">
          <div className="panel-heading">(2) localStorage</div>
          <div className="panel-body">
            <label>Key:</label>
            <input type="text"
                   ref={(input) => { this.keyInput2 = input; }} />
            <label>Value:</label>
            <input type="text"
                   ref={(input) => { this.textInput2 = input; }} />
            <button type="button"
              onClick={() => {this.props.onClickToStoreLocal(this.keyInput2.value, this.textInput2.value)}}>保存する</button>
            <button type="button"
              onClick={() => {this.props.onClickToDeleteAllLocal()}}>全て削除する</button>
            <output>
              <h5>現在保持しているデータ：</h5>
              {localDataHtml}
            </output>
          </div>
        </div>

      </div>
    );
  }
}

AppComponent.propTypes = {
  sessData: PropTypes.array,
  localData: PropTypes.array,
  onClickToStoreSession: PropTypes.func.isRequired,
  onClickToDeleteSession: PropTypes.func.isRequired,
  onClickToDeleteAllSession: PropTypes.func.isRequired,
  onClickToStoreLocal: PropTypes.func.isRequired,
  onClickToDeleteLocal: PropTypes.func.isRequired,
  onClickToDeleteAllLocal: PropTypes.func.isRequired
};

//-----------------------------------
// Container
//-----------------------------------

const AppContainer = (() => {

  const mapStateToProps = (/*state, ownProps*/) => {
    //console.log('state', state);
    //console.log('ownProps', ownProps);

    let i;
    const sessData = [];
    for (i=0; i < sessionStorage.length; i++) {
      sessData.push({
        key: sessionStorage.key(i),
        value: sessionStorage.getItem(sessionStorage.key(i))
      })
    }

    const localData = [];
    for (i=0; i < localStorage.length; i++) {
      localData.push({
        key: localStorage.key(i),
        value: localStorage.getItem(localStorage.key(i))
      })
    }

    //console.log('sessData', sessData);
    //console.log('localData', localData);

    return {
      sessData,
      localData
    };
  }
  
  const mapDispatchToProps = (dispatch) => {

    return {
      onClickToStoreSession(key, text) {
        sessionStorage.setItem(key, text);
        dispatch(updateAll());
      },
      onClickToDeleteSession(key) {
        console.log('key to delete', key);
        sessionStorage.removeItem(key);
        dispatch(updateAll());
      },
      onClickToDeleteAllSession() {
        sessionStorage.clear();
        dispatch(updateAll());
      },

      onClickToStoreLocal(key, text) {
        localStorage.setItem(key, text);
        dispatch(updateAll());
      },
      onClickToDeleteLocal(key) {
        localStorage.removeItem(key);
        dispatch(updateAll());
      },
      onClickToDeleteAllLocal() {
        localStorage.clear();
        dispatch(updateAll());
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent);

})();

//-----------------------------------
// Store
//-----------------------------------

const store = createStore(appState)

//-----------------------------------
// 画面に表示する
//-----------------------------------

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)

