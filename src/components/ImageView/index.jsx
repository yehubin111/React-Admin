import React, { t } from 'react';

import { Modal, Carousel, Button } from 'antd';

const ImageView = (props) => {
    const { visible, images, onCancel } = props;

    return (
        <Modal title={t('layouts.ImageView.imageView')} visible={visible} onCancel={onCancel} destroyOnClose footer={
            [
                <Button onClick={onCancel} key="close">{t('common.close')}</Button>
            ]
        }>
            <Carousel>
                {images.map((image, index) => (
                    <img src={image} key={index} alt="" />
                ))}
            </Carousel>
        </Modal>
    )
}

export default ImageView;