import React, { Component, t } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styles from "./page.module.scss";
import loginIcon from 'assets/images/logo.png';
import defaultConfig from "defaultConfig";
import { saveUserInfo, saveLang } from 'redux/actions';
import { requestToLogin } from 'service/base';

import { Button, Input, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
const { Password } = Input;
const { productName } = defaultConfig;

class Login extends Component {
  state = {
    loading: false
  }
  formRef = React.createRef()
  changeLoading(status) {
    this.setState({
      "loading": status
    })
  }
  handleCopy() {
    message.success(t('common.copySuccess'));
  }
  render() {
    const { loading } = this.state;
    const { saveUserInfo, location } = this.props;

    return (
      <>
        <div className={`cf ac jc ${styles.login}`}>
          {/* <div className={styles.info}>
          <p className={`cf ac ${styles.logo}`}>
            <img alt="logo" src={logo} />
          </p>
          {introduce && <p className={styles.introduce}>{introduce}</p>}
        </div> */}
          <div className={styles.box}>
            <p className={`rf ac  jc ff-s ${styles['login-title']}`}>
              <img className={styles.logo} src={loginIcon} width="35" style={{ marginRight: "10px" }} alt="" />
              {t('login.loginTitle')}
            </p>
            <Form
              ref={this.formRef}
              className={styles.content}
              onFinish={async values => {
                // loading
                this.changeLoading(true);
                try {
                  const response = await requestToLogin(values);
                  if (response) {
                    /**
                     * 保存token
                     * 暂未找到组件外js文件内使用redux状态方法，token单独保存
                     */
                    localStorage.setItem(`${productName}-token`, response.token);
                    // 保存信息
                    saveUserInfo(response);
                    // 根据路由和来源页面跳转
                    // if (response.menuList && response.menuList.length > 0) {
                    message.success(t('login.loginSuccess'));
                    // ios系统不支持正则表达式零宽断言 new RegExp("(?<=\\?redirect=).*")
                    let reg = new RegExp("\\?redirect=(.*)");
                    let redirect = location.search.match(reg) ? decodeURIComponent(RegExp.$1) : "/";
                    setTimeout(() => {
                      // history.push(redirect);
                      //   history.push("/");
                      window.location.href = redirect;
                    }, 0)
                    // } else message.error(t('login.menuConfig'));
                  }
                } catch (err) {
                  // loading over
                  this.changeLoading(false);
                }
              }}
            >
              <FormItem
                name="username"
                rules={[{ required: true, message: t('common.enter', { m: t('login.account') }) }]}
              >
                <Input
                  size="large"
                  className={styles.input}
                  placeholder={t('common.enter', { m: t('login.account') })}
                  prefix={<UserOutlined />}
                />
              </FormItem>
              <FormItem
                name="password"
                rules={[{ required: true, message: t('common.enter', { m: t('login.password') }) }]}
              >
                <Password
                  size="large"
                  className={styles.input}
                  placeholder={t('common.enter', { m: t('login.password') })}
                  prefix={<LockOutlined />}
                />
              </FormItem>
              {/* <FormItem>
                <p className="cf afe">
                  <span className={`${styles.forget} button`} onClick={() => {
                    this.toReciveEmail();
                  }}>{t('login.forget')}</span>
                </p>
              </FormItem> */}
              <Button
                size="large"
                className={styles.button}
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                {t('login.login')}
              </Button>
            </Form>
          </div>
          {/* <p className={styles.forget}>忘记密码？</p> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    langList: state.langList,
    lang: state.lang
  }
}

export default connect(mapStateToProps, { saveUserInfo, saveLang })(withRouter(Login));
