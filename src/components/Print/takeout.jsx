import React, { useState, useEffect, t } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";

import "./table.css";
// import { requestRecordDetail } from "service/record";
// import { requestShopInfo } from "service/merchant";

import { Modal } from "antd";

const Print = (props) => {
    const { visible, orderId, onCancel, userInfo, customerInfo } = props;
    const [shopInfo, setShopInfo] = useState({});
    const [detail, setDetail] = useState({});
    const [detailSpu, setDetailSpu] = useState([]);
    const [spuCountTotal, setSpuCountTotal] = useState(0);
    const [spuPriceTotal, setSpuPriceTotal] = useState(0);

    useEffect(() => {
        if (orderId) {
            // // 获取订单菜品列表
            // requestRecordDetail({ orderId })
            //     .then(response => {
            //         setDetail(response);
            //         if (response.spuVos) {
            //             setDetailSpu(response.spuVos);
            //             // 计算数量总数和价格总数
            //             setSpuCountTotal(response.spuVos.reduce((total, spu) => {
            //                 return total + spu.spuCount
            //             }, 0))
            //             setSpuPriceTotal(response.spuVos.reduce((total, spu) => {
            //                 return total + spu.spuPrice
            //             }, 0))
            //         }
            //     })
            // // 获取商家信息
            // requestShopInfo({ shopId: userInfo.shopId })
            //     .then(response => {
            //         setShopInfo(response);
            //     })
        }
    }, [orderId])

    const toPrint = () => {
        let htmlDom = document.getElementById("print").innerHTML;
        let iframe = document.createElement('iframe');
        iframe.id = 'printf';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = "none";
        document.getElementById("print").appendChild(iframe);
        setTimeout(() => {
            iframe.contentDocument.write(htmlDom);
            iframe.contentDocument.close();
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }, 100)
    }
    const handleCancel = () => {
        onCancel();
    }
    const fontStyle = {
        fontSize: "12px",
        lineHeight: "20px",
        fontFamily: "STSongti-SC-Black, STSongti-SC",
        fontWeight: "bold",
        letterSpacing: "-1px",
        overflow: "hidden"
    }
    const spuLineStyle = {
        fontSize: "12px",
        fontFamily: "STSongti-SC-Regular, STSongti-SC",
        fontWeight: 400,
        color: "#111111",
        lineHeight: "17px"
    }
    const spuLine1Style = {
        fontSize: "12px",
        fontFamily: "serif",
        lineHeight: "20px",
        textAlign: "left",
        letterSpacing: "-1px"
    }
    const spuLine2Style = {
        fontSize: "12px",
        marginRight: "10px",
        textAlign: "right",
        fontFamily: "serif",
        letterSpacing: "-1px"
    }
    const spuLine3Style = {
        fontSize: "12px",
        textAlign: "right",
        fontFamily: "serif",
        letterSpacing: "-1px"
    }
    const welcomeStyle = {
        fontSize: "18px",
        fontFamily: "STSongti-SC-Black, STSongti-SC",
        fontWeight: 900,
        color: "#111111",
        lineHeight: "25px",
        textAlign: "center",
        marginTop: "10px"
    }
    return <Modal visible={visible} closable={false}
        width={300}
        onCancel={handleCancel}
        onOk={() => {
            handleCancel();
            toPrint();
            // viewToWord();
        }}
    >
        {/* <div id="print">
            <div id="print_content"></div>
        </div> */}
        <div id="print">
            <p style={{
                fontSize: "24px",
                textAlign: "center",
                // borderBottom: "1px dashed #000",
                lineHeight: "33px",
                fontWeight: "bold",
                padding: "0 0 6px 0",
                fontFamily: "STSongti-SC-Black, STSongti-SC",
                color: "#111111"
            }}>{shopInfo.shopName}</p>
            <p style={{
                fontSize: "14px",
                fontFamily: "STSongti-SC-Regular, STSongti-SC",
                fontWeight: "400",
                color: "#111111",
                lineHeight: "33px",
                textAlign: "center",
                padding: "0 0 14px 0",
                borderBottom: "4px double #000"
            }}>
                {t('ver_1_1.layouts.Print.takeCode')}
                <span style={{
                    fontSize: "24px",
                    fontFamily: "STSongti-SC-Black, STSongti-SC",
                    fontWeight: "900",
                    color: "#111111",
                    lineHeight: "33px",
                    verticalAlign: "middle"
                }}>{customerInfo.takeCode}</span>
            </p>
            <div style={{
                padding: "10px 0",
                borderBottom: "1px dashed #000"
            }}>
                {/* <p style={{ ...fontStyle }}>{t('layouts.Print.peopleCount')}<span style={{
                    float: "right"
                }}>{detail.peopleCount}</span></p> */}
                <p style={{ ...fontStyle }}>{t('layouts.Print.orderCode')}<span style={{
                    float: "right"
                }}>{detail.orderCode}</span></p>
                <p style={{ ...fontStyle }}>{t('layouts.Print.orderTime')}<span style={{
                    float: "right"
                }}>{dayjs(detail.createTime).format('YYYY-MM-DD HH:mm:ss')}</span></p>
            </div>
            <div style={{
                borderBottom: "1px dashed #000",
                marginBottom: "10px",
                padding: "10px 0"
            }}>
                <table style={{ width: "100%" }}>
                    <thead style={{
                        borderBottom: "1px dashed #000"
                    }}>
                        <tr>
                            <th style={{ ...spuLine1Style, ...spuLineStyle, fontWeight: "bold" }}>{t('layouts.Print.spuName')}</th>
                            <th style={{ ...spuLine2Style, ...spuLineStyle, fontWeight: "bold" }}>{t('layouts.Print.count')}</th>
                            <th style={{ ...spuLine3Style, ...spuLineStyle, fontWeight: "bold" }}>{t('layouts.Print.amount')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detailSpu.map((spu, index) => (
                                <tr key={index}>
                                    <th style={{ ...spuLine1Style, ...spuLineStyle }}>{spu.spuName}{spu.spuSizes && `(${spu.spuSizes})`}</th>
                                    <th style={{ ...spuLine2Style, ...spuLineStyle }}>{spu.spuCount}</th>
                                    <th style={{ ...spuLine3Style, ...spuLineStyle }}>{spu.spuPrice}</th>
                                </tr>
                            ))
                        }
                        <tr>
                            <th style={{ ...spuLine1Style, ...spuLineStyle }}>&nbsp;</th>
                            <th style={{ ...spuLine2Style, ...spuLineStyle }}>&nbsp;</th>
                            <th style={{ ...spuLine3Style, ...spuLineStyle }}>&nbsp;</th>
                        </tr>
                        <tr>
                            <th style={{ ...spuLine1Style, ...spuLineStyle }}>{t('layouts.Print.total')}</th>
                            <th style={{ ...spuLine2Style, ...spuLineStyle }}>{spuCountTotal}</th>
                            <th style={{ ...spuLine3Style, ...spuLineStyle }}>{spuPriceTotal}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{
                marginTop: "30px",
                borderBottom: "4px double #000"
            }}>
                <p style={fontStyle}>{t('ver_1_1.layouts.Print.fee')}<span style={{
                    float: "right"
                }}>{customerInfo.deliveryPrice}</span></p>
                <p style={fontStyle}>{t('ver_1_1.layouts.Print.total')}<span style={{
                    float: "right"
                }}>{customerInfo.orderPrice}</span></p>
                <p style={fontStyle}>{t('ver_1_1.layouts.Print.name')}<span style={{
                    float: "right"
                }}>{customerInfo.receiveName}</span></p>
                <p style={fontStyle}>{t('layouts.Print.area')}<span style={{
                    float: "right",
                    textAlign: "right",
                    maxWidth: "80%"
                }}>{customerInfo.receiveAddress}</span></p>
                <p style={fontStyle}>{t('layouts.Print.phone')}<span style={{
                    float: "right"
                }}>{customerInfo.receivePhone}</span></p>
            </div>
            <p style={welcomeStyle}>{t('layouts.Print.welcome')}</p>
        </div>
    </Modal>
}

const mapStateToProps = state => (
    {
        userInfo: state.userInfo
    }
)
export default connect(mapStateToProps, {})(Print);